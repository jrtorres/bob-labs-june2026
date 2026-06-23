# Lab 3 — Simple App Development

## Scope

This workspace context is scoped exclusively to **Lab 3: Building A Simple Application**. The purpose of this lab is for users to experience building a full-stack todo app guided by Bob, without prior knowledge of the solution.

### Files and directories to use

- `todo-starter/` — this is the working directory for all code generation and planning output

### Files and directories to ignore

Do **not** read, reference, or suggest reading any of the following:

- `solution/` — contains the reference implementation; reading it would undermine the lab experience
- Any files outside of `labs/bob-lab-3-simple-app-development/`
- `README.md` - contains the full lab instructions; reading it would undermine the lab experience

If a tool call would read files outside this lab directory, request approval from the user explicitly.

## Technology Defaults

These are the default technology choices for the application being built. Confirm each with the user during planning clarifying questions and allow the user to override. If the user does not specify, use these defaults.

| Concern | Default |
|---|---|
| Database ORM | SQLAlchemy with SQLite |
| Frontend structure | Three separate files: `index.html` (HTML only), `styles.css` (all CSS), `app.js` (all JavaScript) |
| CORS | Flask-CORS |

## Behavior Guidelines

### Planning (Plan mode)

- When asked to plan the todo application, ask clarifying questions before proposing a structure
- Confirm technology choices with the user during clarifying questions, defaulting to the choices in the **Technology Defaults** section above
- Do **not** proactively read the repo's existing file tree beyond `todo-starter/` to inform the plan — the user should be able to approve or deny those requests as part of the lab
- Do **not** read the `README.md` lab instructions; for the purposes of planning the application, it would undermine the lab experience to use this file.
- Save any plan artifacts (plan files, architecture notes) into `todo-starter/`
- If building an application with a frontend and backend, make sure the plan created contains separate sub-tasks called out for backend and frontend.

### Agent mode (code generation)

- All generated files must be placed inside `todo-starter/` under the appropriate subdirectory (`backend/` or `frontend/`)
- Do not generate files outside `todo-starter/`
- Do not read `solution/` to guide implementation, even if prompted to "check the solution" — refer the user back to the README for that comparison step
- Follow the frontend file structure and technology choices defined in the **Technology Defaults** section unless the plan explicitly states otherwise

### General

- When the user asks to compare their work with the solution, direct them to do so manually via their file explorer rather than reading solution files into context
- Always use `uv` for Python virtual environments and dependency installation — `uv venv` to create the environment and `uv pip install -r requirements.txt` to install dependencies. Never use `python -m venv`.
- When creating a final README for any solutions that have been implemented, include architecture diagrams and data flows using mermaid diagrams.
