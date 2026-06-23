# IBM Bob - Building A Simple Application

## Overview

In this lab, you'll learn to use Bob's AI-powered features to build a complete full-stack todo application from scratch. You'll experience Bob's different modes, auto-approvals, literate coding, and more.

### Project Structure

```text
├── simple-app-development/           # Lab folder
│   ├── README.md                      # Lab 1 instructions
│   ├── starter/                       # Starting point files
│   │   └── .gitkeep
│   ├── solution/                      # Complete solution
│       ├── backend/
│       │   ├── app.py
│       │   ├── requirements.txt
│       │   ├── models.py
│       │   └── database.py
│       └── frontend/
│           ├── index.html
│           ├── styles.css
│           └── app.js
```

### What You'll Build

A full-stack todo application with the following technology stack:

```text
Frontend:          Backend:           Tools:
- HTML5            - Python 3.8+      - Bob AI
- CSS3             - Flask            
- JavaScript       - SQLite           
```

By the end of this lab, you will:

✅ Understand Bob's three modes (Plan, Agent, Ask)  
✅ Use auto-approvals for rapid development  
✅ Practice literate coding techniques  
✅ Build a complete full-stack application  

### Prerequisites

Before starting, ensure you have:

- [ ] Python 3.8+ installed
- [ ] uv installed
- [ ] Bob installed and running

### Lab Flow

```mermaid
sequenceDiagram
    participant User
    participant Bob
    participant Code
    
    User->>Bob: Plan todo app (Plan)
    Bob->>User: Project structure & API design
    User->>Bob: Create backend (Agent)
    Bob->>Code: Generate Flask app
    User->>Bob: Create frontend (Agent)
    Bob->>Code: Generate HTML/JS/CSS
    User->>Code: Test application
```

1. **Introduction & Setup**  
   - Overview of Bob modes
   - Project initialization
   - Directory structure creation

2. **Backend Development**  
   - Use Plan mode to plan API structure
   - Switch to Agent mode for implementation
   - Create Flask app with REST endpoints
   - Implement SQLite database models
   - Demonstrate auto-approvals for rapid iteration

3. **Frontend Development**  
   - Create HTML structure
   - Implement JavaScript for API interaction
   - Add CSS styling
   - Use literate coding to explain complex logic

4. **Testing & Verification**  
   - Run the application
   - Test CRUD operations
   - Verify functionality

---

## Part 1: Plan the application

1. **Switch to Plan Mode** and ask Bob:

    ```text
    I want to create a todo application in the todo-starter directory with a Python Flask backend and separate stand alone HTML frontend.
    Please help me plan:
    1. Project directory structure
    2. API endpoints needed (including health check endpoints, include proper error handling and JSON responses)
    3. Database schema
    4. Technology stack recommendations

    This is for a lab exercise showcasing Bob's ability to generate an application from scratch. Do not read any of the files in the repo before making this plan, only read the AGENTS.md file for instructions.
    ```

    Before providing a plan, Bob will ask clarifying questions to understand your requirements better. This is a key differentiator—Bob lets you drive the process while making helpful suggestions.

    Bob might ask:
    - "How complex should the application be?"
    - "Which database would you prefer (SQLite, PostgreSQL, MySQL)?"
    - "Do you need user authentication?"
    - "Should we include additional features like categories or priorities?"

1. For this lab, respond with basic requirements (Keep in mind the exact question Bob asks you will vary):

    ```text
    - Simple/basic complexity
    - SQLite database (with SQLAlchemy)
    - No user authentication
    - Basic CRUD operations only
    - Simple front end (html, css and javascript)
    ```

    ![](/images/bob_app_dev_lab_1.png)

    **Expected Response from Bob:** After your clarifications, Bob should provide:

    - Directory structure with backend/ and frontend/ folders
    - REST API endpoints (GET, POST, PUT, DELETE)
    - Database schema for todos (id, title, description, completed, created_at)
    - Recommendations for Flask, SQLite, CORS, etc.

1. Bob should provide a plan for the development process. Approve the request to save this plan (you can also approve Bob's request to save other planning artifacts).

1. Go ahead and open the plan (i.e. `todo-app-plan.md`) and review the different subtasks the agent is planning for the implementation.

---

## Step 2: Backend Development

1. Normally, we would give this whole implementation plan to Bob. For the purposes of this lab, we will break it up into a couple of sections so you can build and test as you go.

1. Start a new task and Switch Bob to `Agent` mode and prompt it with the following:

    ```text
    Follow the @labs/bob-lab-3-simple-app-development/todo-starter/todo-app-plan.md implement plan to build the project scaffolding and implement the backend sub-tasks for the todo app.
    ```

1. The Todo list generated by Bob should include just the sub-tasks specified. If it includes all the tasks in the plan, you will need to edit the Todo list by clicking on the `Edit` link and removing any task that is not the backend or API. 

    ![](/images/bob_app_dev_lab_2.png)

    ![](/images/bob_app_dev_lab_3.png)

    > Note: The implementation plan should have included a sub-task for creating the backend files and the REST API implementation, the names shown in the todo list will vary based on what was generated in your plan.

1. Go ahead and approve the task.

1. Bob should generate these files in the `backend/` directory, approve the file creation as Bob creates the required implementation files.

1. Feel free to turn on **Auto-approvals**, which will allow Bob to make multiple changes without asking for confirmation each time. To enable auto-approvals:
    1. Look for auto-approval settings in Bob
    2. Enable for this session
    3. Bob will now create multiple files rapidly

1. Bob will complete the implementation of the sub-tasks. 

1. [Optional] If your implementation plan did not include any automated testing, you can manually test the backend setup using a virtual environment. Run the following commands in your terminal. 

    ```bash
    # Navigate to backend directory
    cd todo-starter/backend

    # Create virtual environment
    uv venv

    # Activate virtual environment
    source .venv/bin/activate

    # Install dependencies
    uv pip install -r requirements.txt

    # Run the application
    python app.py
    ```

    ![](/images/bob_app_dev_lab_4.png)

    **Note:** Remember to activate the virtual environment every time you work on the project. You'll know it's activated when you see `(venv)` in your terminal prompt.

1. The server should start on port 5000. Open a webbrowser and go to: `http://localhost:5000/health`

1. Alternatively, you can ask Bob to do that for you. **Prompt for Bob:**

    ```text
    Run the backend application and test it with 1 sample curl command per each API endpoint.
    ```

**✅ Checkpoint**: If you receive an `Ok` response, the backend is running without errors.

---

## Step 3: Frontend Development

1. Now let's create the user interface using JavaScript. Still in `Agent` mode, prompt Bob with the following:

    ```text
    Follow the todo-app-plan.md implement plan to implement the frontend sub-tasks for the todo app with:
    - An HTML structure with a clean, modern design
    - Responsive CSS styling
    - Input fields for new todos along with description
    - List to display todos
    - Buttons for complete and delete actions
    - Responsive design for mobile and desktop
    ```

1. Bob will go ahead and start creating the front end implementation files.

1. Lets have Bob also explain itself through comments and clear structure. **Prompt  Bob:**

    ```text
    In app.js, use literate coding to explain:
    - How the API calls work
    - How error handling is implemented
    - The purpose of each function

    Add detailed comments that would help a beginner understand the code.
    ```

1. Bob should create the implementation following files in the `frontend/` directory. Feel free to compare them with the files in the `solution` directory.

1. Test the frontend, by opening the `frontend/index.html` in your browser.

**✅ Checkpoint**: Frontend loads and displays the UI.

---

## Step 4: Testing & Verification (5 minutes)

1. Let's make sure our implementation plan is complete and test the complete application end-to-end.

1. Again in `Agent` mode, **Prompt for Bob:**

    ```text
    Complete any outstanding tasks in the implementation plan for the todo application.
    ```

1. Next, lets test our application. If needed, start the Backend again from the terminal.

    ```bash
    # Navigate to backend directory
    cd backend

    # Activate virtual environment (if not already activated)
    source .venv/bin/activate

    # Run the application
    python app.py
    ```

1. Server should be running on `http://localhost:5000`

1. Open `frontend/index.html` in your browser.

1. Run the following tests:

    **Create a Todo:**
    1. Enter a title: "Learn Bob"
    2. Enter a description: "Complete all three labs"
    3. Click "Add Todo"
    4. ✅ Todo appears in the list

    **Mark as Complete:**
    1. Click the "Complete" button on a todo
    2. ✅ Todo shows as completed (strikethrough or checkmark)

    **Delete a Todo:**
    1. Click the "Delete" button on a todo
    2. ✅ Todo is removed from the list

    **Refresh Page:**
    1. Refresh the browser
    2. ✅ Todos persist (stored in database)

1. [Optional] Aside from manual testing, you can have Bob create test cases for you. **Prompt for Bob:**

        ```bash
        Create unit test cases for each of the api endpoints, and ensure at least 90% code coverage.
        ```

---

## Congratulations! 🎉

You've successfully completed the lab! You've learned to:

- ✅ Use Bob's Plan mode for planning
- ✅ Use Bob's Agent mode for implementation
- ✅ Enable and use auto-approvals
- ✅ Apply literate coding principles
- ✅ Build a complete full-stack application

### Key Takeaways

#### Bob's Modes

- **Plan**: Perfect for planning and design decisions
- **Code**: Best for implementation and file creation
- **Ask**: Great for learning and understanding

#### Auto-Approvals

- Speeds up development significantly
- Useful for creating multiple related files
- Always review the generated code

#### Literate Coding

- Makes code self-documenting
- Helps team members understand your code
- Useful for learning and teaching

> **💡 Behind the Scenes: Intelligent Resource Optimization**
> While you've been building this app, Bob has been automatically selecting the right AI model for each task—using powerful models for complex architecture decisions and lighter models for simple file operations. This [automatic model selection](../bob-differentiators.md#automatic-model-selection) optimizes both quality and cost without you having to think about it. You can save up to 60% on AI costs while maintaining excellent results!

## Next Steps

### Enhance Your App

Try these improvements:

1. Add todo categories or tags
2. Implement due dates
3. Add user authentication
4. Create a priority system
5. Add search and filter functionality
6. Integrate with GitHyb MCP to version control your application.

### Additional Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [JavaScript Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Bob Documentation](https://bob-docs-url)

---

*Adapted from Client Engineering `bob-intro-labs`. Last Updated: May 2026*
