# Bob Labs

A structured, hands-on introduction to IBM Bob — from first contact through customization and full-stack development.

---

## Overview

These labs guide you through Bob's core capabilities in a logical progression. Each lab is self-contained, but they are designed to be completed in order: start with the fundamentals, then extend Bob with custom modes and skills, and finally put everything together by building a real application.

### What You'll Experience

**Get to Know Bob** (Lab 1)
- Navigate Bob's interface and understand its modes
- Use the approval workflow for safe, controlled collaboration
- Practice planning, coding, and learning with Bob

**Extend and Personalize Bob** (Lab 2)
- Create custom modes that encode your team's workflows
- Build reusable skills and slash commands
- Tailor Bob's behaviour to specific tasks

**Build Something Real** (Lab 3)
- Use Bob's Plan, Code, Advanced, and Ask modes together
- Build a complete full-stack application from scratch

### Lab Summary

| Lab | Title | Duration | Difficulty | Key Technologies | Best For |
|-----|-------|----------|------------|------------------|----------|
| 1 | Bob Fundamentals | ~20 min | Beginner | Bob IDE | Anyone new to Bob |
| 2 | Modes & Skills | ~15 min | Beginner | YAML, Bob modes, skills | Teams wanting custom workflows |
| 3 | Building a Simple Application | ~40 min | Intermediate | Python, Flask, JavaScript | Learning full-stack with Bob |

#### Recommended Learning Path

**New to Bob?**
- Start with Lab 1 (Bob Fundamentals) to get comfortable with the interface and modes
- Move to Lab 2 (Modes & Skills) to learn how to customize Bob for your workflow
- Finish with Lab 3 (Building a Simple Application) to see everything come together
---

## Labs

### 1. Bob Fundamentals

**Duration**: ~20 minutes
**Difficulty**: Beginner

#### What You'll Learn

- Navigate Bob's interface confidently
- Understand what each part of the Bob window does
- Understand and switch between Bob's modes
- Use the approval workflow for safe collaboration
- Use Bob for planning, coding, and learning

#### Prerequisites

- [ ] Bob installed and running
- [ ] No prior Bob experience required

#### Get Started

📖 **[Start Lab 1: Bob Fundamentals →](./bob-lab-1-fundamentals.md)**

---

### 2. Modes & Skills

**Duration**: ~15 minutes
**Difficulty**: Beginner

#### What You'll Learn

- Understand what custom modes are and how to create them
- Create and manage a project-scoped custom mode
- Create a skill that Bob activates automatically
- Create a slash command for on-demand prompts
- Know when to use a skill versus a slash command

#### Prerequisites

- [ ] Completed Lab 1: Bob Fundamentals
- [ ] Bob installed and running

#### Get Started

📖 **[Start Lab 2: Modes & Skills →](./bob-lab-2-modes-skills/bob-lab-2-modes-skills.md)**

---

### 3. Building a Simple Application

**Duration**: ~40 minutes
**Difficulty**: Intermediate

#### What You'll Learn

- Use Bob's Plan, Code, Advanced, and Ask modes together on a real project
- Enable auto-approvals for rapid development
- Practice literate coding techniques
- Build a complete full-stack application from scratch

#### Key Features

Build a full-stack todo application:

- **Backend** — Python Flask REST API with SQLite database
- **Frontend** — HTML5, CSS3, and vanilla JavaScript
- **CRUD Operations** — Create, read, update, delete todos
- **Persistent Storage** — SQLite database for data persistence

#### Prerequisites

- [ ] Python 3.8+ installed
- [ ] uv installed
- [ ] Bob installed and running

#### Get Started

📖 **[Start Lab 3: Building a Simple Application →](./bob-lab-3-simple-app-development/README.md)**

---

## Additional Labs

Additional labs are available in the [`extra-labs/`](../extra-labs) directory. These cover more advanced and specialized scenarios:

- **application-analysis** — Analyze an existing codebase with Bob
- **bob-mcp** — Extend Bob with a custom MCP server
- **bob-shell** — Use Bob's shell integration
- **python-to-javascript** — Translate a Python project to JavaScript with Bob

---

*Last Updated: May 2026*
