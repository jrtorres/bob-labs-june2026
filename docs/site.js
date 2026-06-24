/**
 * site.js — IBM Bob Workshop GitHub Pages
 *
 * Responsibilities:
 *  - Load nav.json and build side nav + Resources dropdown
 *  - Hash-based SPA routing
 *  - Fetch markdown, apply render-time transforms, render to HTML
 *  - Inject copy-to-clipboard buttons on every code block
 *  - Render Mermaid diagrams
 *  - Light / dark theme toggle (persisted to localStorage)
 *  - Mobile nav toggle
 */

'use strict';

// ─── Constants ───────────────────────────────────────────────────────────────

const HLJS_DARK  = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css';
const HLJS_LIGHT = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
const SITE_TITLE = 'IBM Bob Workshop';

// ─── State ────────────────────────────────────────────────────────────────────

let navData = null;       // parsed nav.json
let pathToId = {};        // map: markdown path fragment → nav item id
let currentId = null;     // currently active item id
let RAW_BASE  = '';       // https://raw.githubusercontent.com/{owner}/{repo}/{branch}/

// ─── DOM refs (set after DOMContentLoaded) ────────────────────────────────────

let elSideNav, elContent, elResourcesMenu, elResourcesDropdown,
    elResourcesBtn, elThemeToggle, elThemeIcon, elHljsTheme,
    elNavToggle, elNavOverlay, elLoadingState, elHeaderLinks;

// ─── Initialisation ───────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', async () => {
  elSideNav          = document.getElementById('side-nav');
  elContent          = document.getElementById('content');
  elResourcesMenu    = document.getElementById('resources-menu');
  elResourcesDropdown= document.getElementById('resources-dropdown');
  elResourcesBtn     = document.getElementById('resources-btn');
  elThemeToggle      = document.getElementById('theme-toggle');
  elThemeIcon        = document.getElementById('theme-icon');
  elHljsTheme        = document.getElementById('hljs-theme');
  elNavToggle        = document.getElementById('nav-toggle');
  elNavOverlay       = document.getElementById('nav-overlay');
  elLoadingState     = document.getElementById('loading-state');
  elHeaderLinks      = document.getElementById('header-links');

  // Apply persisted theme before rendering anything
  applyTheme(localStorage.getItem('theme') || 'dark', false);

  // Init mermaid (will be re-configured on theme change)
  initMermaid(document.body.dataset.theme);

  // Load navigation manifest
  try {
    const res = await fetch('nav.json');
    navData = await res.json();
    // Compute raw content base URL from nav.json repo metadata
    const { owner, repo, branch } = navData.repo;
    RAW_BASE = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/`;
    buildPathMap();
    buildSideNav();
    buildResourcesMenu();
    buildHeaderLinks();
  } catch (err) {
    console.error('Failed to load nav.json:', err);
  }

  // Wire up events
  elThemeToggle.addEventListener('click', onThemeToggle);
  elResourcesBtn.addEventListener('click', onResourcesBtnClick);
  elNavToggle.addEventListener('click', onNavToggle);
  elNavOverlay.addEventListener('click', closeNav);

  // Lightbox close: button, backdrop click, Escape key
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeLightbox(); // click outside image
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // Close Resources dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!elResourcesDropdown.contains(e.target)) {
      setResourcesOpen(false);
    }
  });

  // Hash-based routing — must be registered BEFORE the initial route call
  window.addEventListener('hashchange', onHashChange);
  // Initial route fires AFTER navData is loaded so findItem() can resolve
  onHashChange();
});

// ─── Path → ID map ────────────────────────────────────────────────────────────

/**
 * Build a map from every meaningful path fragment to its nav item id.
 * e.g. "labs/bob-lab-1-fundamentals.md" → "lab-1"
 *      "bob-lab-1-fundamentals.md"       → "lab-1"  (filename only)
 */
function buildPathMap() {
  const allItems = getAllItems();
  allItems.forEach(({ id, path }) => {
    // Full path
    pathToId[path] = id;
    // Filename only (e.g. "bob-lab-1-fundamentals.md")
    const filename = path.split('/').pop();
    pathToId[filename] = id;
    // Path without leading segment (e.g. "bob-lab-2-modes-skills/bob-lab-2-modes-skills.md")
    const parts = path.split('/');
    if (parts.length > 1) {
      pathToId[parts.slice(1).join('/')] = id;
    }
  });
}

function getAllItems() {
  if (!navData) return [];
  const items = [];
  (navData.top    || []).forEach(i => items.push(i));
  (navData.header || []).forEach(i => items.push(i));
  navData.groups.forEach(g => g.items.forEach(i => items.push(i)));
  navData.resources.forEach(r => items.push(r));
  return items;
}

function findItem(id) {
  return getAllItems().find(i => i.id === id) || null;
}

// ─── Side nav builder ─────────────────────────────────────────────────────────

function buildSideNav() {
  if (!navData) return;
  let html = '<ul class="side-nav__list" role="list">';

  // Top-level items rendered without a group label
  (navData.top || []).forEach(item => {
    html += `<li class="side-nav__item" id="nav-item-${item.id}">
      <a class="side-nav__link" href="#${item.id}" data-id="${item.id}">
        ${escHtml(item.label)}
      </a>
    </li>`;
  });

  // Grouped items
  navData.groups.forEach(group => {
    html += `<li class="side-nav__group">
      <p class="side-nav__group-label">${escHtml(group.label)}</p>
      <ul role="list">`;
    group.items.forEach(item => {
      html += `<li class="side-nav__item" id="nav-item-${item.id}">
        <a class="side-nav__link" href="#${item.id}" data-id="${item.id}">
          ${escHtml(item.label)}
        </a>
      </li>`;
    });
    html += '</ul></li>';
  });

  html += '</ul>';
  elSideNav.innerHTML = html;

  // Delegate clicks so the whole link area navigates
  elSideNav.addEventListener('click', (e) => {
    const link = e.target.closest('[data-id]');
    if (link) {
      e.preventDefault();
      const id = link.dataset.id;
      window.location.hash = '#' + id;
      closeNav(); // close mobile nav
    }
  });
}

// ─── Resources dropdown builder ───────────────────────────────────────────────

function buildResourcesMenu() {
  if (!navData) return;
  let html = '';
  navData.resources.forEach(item => {
    html += `<li role="menuitem">
      <a class="dropdown-item" href="#${item.id}" data-id="${item.id}">
        ${escHtml(item.label)}
      </a>
    </li>`;
  });
  elResourcesMenu.innerHTML = html;

  elResourcesMenu.addEventListener('click', (e) => {
    const link = e.target.closest('[data-id]');
    if (link) {
      e.preventDefault();
      const id = link.dataset.id;
      setResourcesOpen(false);
      window.location.hash = '#' + id;
    }
  });
}

// ─── Header links builder ─────────────────────────────────────────────────────

function buildHeaderLinks() {
  if (!navData || !elHeaderLinks) return;
  let html = '';
  (navData.header || []).forEach(item => {
    html += `<a class="header-action-btn" href="#${item.id}" data-id="${item.id}">
      ${escHtml(item.label)}
    </a>`;
  });
  elHeaderLinks.innerHTML = html;

  elHeaderLinks.addEventListener('click', (e) => {
    const link = e.target.closest('[data-id]');
    if (link) {
      e.preventDefault();
      window.location.hash = '#' + link.dataset.id;
    }
  });
}

// ─── Routing ──────────────────────────────────────────────────────────────────

function onHashChange() {
  const raw  = window.location.hash.slice(1); // strip '#'
  const id   = raw || 'home';
  navigateTo(id);
}

async function navigateTo(id) {
  const item = findItem(id);
  if (!item) {
    // Unknown id — fall back to home
    if (id !== 'home') {
      window.location.hash = '#home';
    }
    return;
  }

  // Don't re-render the same page
  if (id === currentId) return;
  currentId = id;

  setActiveNavItem(id);
  showLoading();

  try {
    const mdPath  = RAW_BASE + item.path;
    const res     = await fetch(mdPath);
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${mdPath}`);
    const rawMd   = await res.text();
    const html    = renderMarkdown(rawMd, item.path);
    injectContent(html, item);
  } catch (err) {
    injectError(err, item);
  }

  document.title = (item.label ? item.label + ' | ' : '') + SITE_TITLE;
}

// ─── Markdown rendering pipeline ─────────────────────────────────────────────

function renderMarkdown(rawMd, sourcePath) {
  // 1. Pre-process: extract mermaid fences before marked sees them
  const { md, mermaidBlocks } = extractMermaid(rawMd);

  // 2. Convert markdown → HTML
  let html = marked.parse(md, {
    gfm: true,
    breaks: false,
  });

  // 3. Restore mermaid blocks
  html = restoreMermaid(html, mermaidBlocks);

  // 4. Render-time fixes
  html = fixImagePaths(html);
  html = fixInternalLinks(html, sourcePath);

  return html;
}

/**
 * Replace ```mermaid ... ``` fences with a placeholder before marked.parse()
 * so marked doesn't try to syntax-highlight them.
 */
function extractMermaid(md) {
  const mermaidBlocks = [];
  const result = md.replace(/```mermaid\n([\s\S]*?)```/g, (_, code) => {
    const idx = mermaidBlocks.length;
    mermaidBlocks.push(code.trim());
    return `MERMAID_PLACEHOLDER_${idx}`;
  });
  return { md: result, mermaidBlocks };
}

function restoreMermaid(html, mermaidBlocks) {
  return html.replace(/MERMAID_PLACEHOLDER_(\d+)/g, (_, idx) => {
    const code = mermaidBlocks[parseInt(idx, 10)];
    return `<div class="mermaid-wrapper"><div class="mermaid">${escHtml(code)}</div></div>`;
  });
}

/**
 * Rewrite /images/... and images/... src attributes to the raw GitHub URL.
 */
function fixImagePaths(html) {
  const imgBase = RAW_BASE + 'images/';
  // Absolute: src="/images/
  html = html.replace(/src="\/images\//g, `src="${imgBase}`);
  // Relative bare: src="images/
  html = html.replace(/src="images\//g, `src="${imgBase}`);
  return html;
}

/**
 * Rewrite .md internal links to #item-id hash links.
 * Builds the rewrite map from pathToId at call time.
 */
function fixInternalLinks(html, sourcePath) {
  // Match href="...something.md" or href="./something.md"
  return html.replace(/href="([^"]*\.md[^"]*)"/g, (match, href) => {
    // Strip leading ./ and ../
    const cleaned = href.replace(/^\.\//, '').replace(/^\.\.\//, '');

    // Try full cleaned path
    if (pathToId[cleaned]) return `href="#${pathToId[cleaned]}"`;

    // Try just the filename
    const filename = cleaned.split('/').pop().split('#')[0];
    if (pathToId[filename]) return `href="#${pathToId[filename]}"`;

    // Try path from source file's directory
    const sourceDir  = sourcePath.split('/').slice(0, -1).join('/');
    const resolved   = sourceDir ? `${sourceDir}/${cleaned}` : cleaned;
    if (pathToId[resolved]) return `href="#${pathToId[resolved]}"`;

    // Leave unchanged (external or unrecognised)
    return match;
  });
}

// ─── DOM injection ────────────────────────────────────────────────────────────

async function injectContent(html, item) {
  const wrapper = document.createElement('div');
  wrapper.className = 'markdown-content';
  wrapper.innerHTML = html;

  // Add language badges to code blocks (read the class from <code>)
  wrapper.querySelectorAll('pre > code[class*="language-"]').forEach(code => {
    const match = code.className.match(/language-(\S+)/);
    if (match && match[1] !== 'undefined') {
      const badge = document.createElement('span');
      badge.className = 'code-lang-badge';
      badge.textContent = match[1];
      code.parentElement.insertBefore(badge, code);
    }
  });

  // Inject copy buttons on every <pre>
  wrapper.querySelectorAll('pre').forEach(pre => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.setAttribute('aria-label', 'Copy code');
    btn.innerHTML = '⎘';
    btn.addEventListener('click', async () => {
      const code = pre.querySelector('code');
      const text = code ? code.innerText : pre.innerText;
      try {
        await navigator.clipboard.writeText(text);
        btn.innerHTML = '✓';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = '⎘';
          btn.classList.remove('copied');
        }, 2000);
      } catch (e) {
        btn.innerHTML = '✗';
        setTimeout(() => { btn.innerHTML = '⎘'; }, 1500);
      }
    });
    pre.appendChild(btn);
  });

  // Lightbox — click any image to expand it
  wrapper.querySelectorAll('img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });

  elContent.innerHTML = '';
  elContent.appendChild(wrapper);

  // Syntax highlighting
  if (typeof hljs !== 'undefined') {
    elContent.querySelectorAll('pre code').forEach(block => {
      hljs.highlightElement(block);
    });
  }

  // Mermaid diagrams — render then attach lightbox click on each wrapper
  const mermaidEls = elContent.querySelectorAll('.mermaid');
  if (mermaidEls.length > 0 && typeof mermaid !== 'undefined') {
    try {
      await mermaid.run({ nodes: Array.from(mermaidEls) });
      // After render, each .mermaid div contains an <svg> — make wrappers clickable
      elContent.querySelectorAll('.mermaid-wrapper').forEach(wrapper => {
        wrapper.style.cursor = 'zoom-in';
        wrapper.addEventListener('click', () => {
          const svg = wrapper.querySelector('svg');
          if (!svg) return;
          // Serialize SVG → blob URL so the lightbox <img> can display it
          const svgData = new XMLSerializer().serializeToString(svg);
          const blob = new Blob([svgData], { type: 'image/svg+xml' });
          const url  = URL.createObjectURL(blob);
          openLightbox(url, 'Diagram');
        });
      });
    } catch (e) {
      console.warn('Mermaid render error:', e);
    }
  }

  // Scroll content to top
  elContent.scrollTop = 0;
}

function injectError(err, item) {
  elContent.innerHTML = `
    <div class="markdown-content">
      <div class="error-state">
        <h2>Unable to load content</h2>
        <p>Could not load <strong>${escHtml(item.label)}</strong>.</p>
        <p class="error-detail">${escHtml(err.message)}</p>
        <p>If running locally, make sure to serve from the repo root:<br>
        <code>npx serve .</code> then open <code>http://localhost:3000/docs/</code></p>
      </div>
    </div>`;
  elContent.scrollTop = 0;
}

function showLoading() {
  elContent.innerHTML = `
    <div class="loading">
      <div class="skeleton skeleton-h1"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text short"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-block"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text short"></div>
    </div>`;
}

// ─── Active nav state ─────────────────────────────────────────────────────────

function setActiveNavItem(id) {
  // Clear previous
  elSideNav.querySelectorAll('.side-nav__item--active').forEach(el => {
    el.classList.remove('side-nav__item--active');
  });
  elResourcesMenu.querySelectorAll('.dropdown-item--active').forEach(el => {
    el.classList.remove('dropdown-item--active');
  });

  // Set new active in side nav
  const navItem = document.getElementById('nav-item-' + id);
  if (navItem) {
    navItem.classList.add('side-nav__item--active');
    // Ensure it's visible
    navItem.scrollIntoView({ block: 'nearest' });
  }

  // Set active in resources dropdown if applicable
  const dropdownLink = elResourcesMenu.querySelector(`[data-id="${id}"]`);
  if (dropdownLink) {
    dropdownLink.classList.add('dropdown-item--active');
  }
}

// ─── Resources dropdown ───────────────────────────────────────────────────────

function onResourcesBtnClick(e) {
  e.stopPropagation();
  const isOpen = elResourcesDropdown.classList.contains('open');
  setResourcesOpen(!isOpen);
}

function setResourcesOpen(open) {
  elResourcesDropdown.classList.toggle('open', open);
  elResourcesBtn.setAttribute('aria-expanded', String(open));
}

// ─── Theme toggle ─────────────────────────────────────────────────────────────

function onThemeToggle() {
  const current = document.body.dataset.theme || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark', true);
}

function applyTheme(theme, save) {
  document.body.dataset.theme = theme;

  // Update icon
  if (elThemeIcon) elThemeIcon.textContent = theme === 'dark' ? '☀' : '☾';

  // Swap highlight.js CSS
  if (elHljsTheme) {
    elHljsTheme.href = theme === 'dark' ? HLJS_DARK : HLJS_LIGHT;
  }

  // Re-init mermaid with matching theme
  initMermaid(theme);

  if (save) localStorage.setItem('theme', theme);
}

function initMermaid(theme) {
  if (typeof mermaid === 'undefined') return;
  mermaid.initialize({
    startOnLoad: false,
    theme: theme === 'dark' ? 'dark' : 'default',
    securityLevel: 'loose',
  });
}

// ─── Mobile nav toggle ────────────────────────────────────────────────────────

function onNavToggle() {
  const isOpen = document.body.classList.contains('nav-open');
  if (isOpen) {
    closeNav();
  } else {
    document.body.classList.add('nav-open');
    elNavToggle.setAttribute('aria-expanded', 'true');
    elNavOverlay.removeAttribute('aria-hidden');
  }
}

function closeNav() {
  document.body.classList.remove('nav-open');
  elNavToggle.setAttribute('aria-expanded', 'false');
  elNavOverlay.setAttribute('aria-hidden', 'true');
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function openLightbox(src, alt) {
  const lb = document.getElementById('lightbox');
  lb.querySelector('#lightbox-img').src = src;
  lb.querySelector('#lightbox-img').alt = alt || '';
  lb.removeAttribute('aria-hidden');
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb  = document.getElementById('lightbox');
  const img = lb.querySelector('#lightbox-img');
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  // Revoke any blob URL and clear src after transition
  setTimeout(() => {
    if (img.src.startsWith('blob:')) URL.revokeObjectURL(img.src);
    img.src = '';
  }, 250);
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
