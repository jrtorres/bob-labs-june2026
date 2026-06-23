# IBM Bob - BobShell
**Duration:** 15 minutes
**Objective:** Use Bob from the command line with interactive sessions, automation scripts, and output redirection

---

## Overview

This lab introduces **BobShell** — Bob's command-line interface. It is written for learners who may be new to terminal workflows.

### Learning Objectives

By the end of this lab, you will:

- ✅ Use BobShell for interactive and automated workflows
- ✅ Understand what a terminal-based Bob experience looks like
- ✅ Manage sessions to preserve context across work sessions
- ✅ Redirect output for use in scripts and CI/CD pipelines

### Prerequisites

Before starting, ensure you have:

- [ ] Bob installed and running
- [ ] Terminal window
- [ ] Completed the IBM Bob Fundamentals lab

---

## BobShell Fundamentals

### What is BobShell?

BobShell is Bob's command-line interface. It lets you use Bob from a terminal window instead of the main app.

BobShell is useful for:

- **Terminal workflows**: Chat with Bob directly from the command line
- **Automation scripts**: Integrate Bob into shell scripts
- **CI/CD pipelines**: Use Bob in build and deployment processes
- **Batch operations**: Process multiple files or tasks in sequence
- **Remote environments**: Use Bob on servers without a GUI

### Installation and Setup

**Verify BobShell Installation:**

If you have never used a terminal before, open the Terminal application on your computer (or within the Bob IDE) and type the commands exactly as shown below.

![](/images/bob_shellcheck.png)

```bash
# Check BobShell version
bob --version

# View available commands
bob --help
```

**Expected Output:**
```text
Bob CLI v2.x.x
Usage: bob [options] [command]
...
```

The exact version number may differ, but it should show a Bob CLI version and help text.

**If you see "command not found":**
- Follow the [BobShell installation guide](https://bob.ibm.com/docs/shell/getting-started/install-and-setup)
- Verify Bob is in your system PATH
- Restart your terminal after installation
- Ask your instructor for help before moving on

> 📌 **Full Documentation:** https://bob.ibm.com/docs/shell

---

## Interactive Mode

First, navigate to the sandbox directory for this lab. It should already be there but if not, create the directory. BobShell uses the folder where you launch it, so start inside your sandbox folder for this exercise.

If you are new to terminal commands, `cd` means "change directory."

```bash
cd sandbox
```

Then launch Bob in interactive mode:

![](/images/bob_shell.png)

```bash
# Start interactive session
bob
```

**Try these commands:**

```
# Ask for explanations
> Explain what a closure is in JavaScript

# Generate code
> Create a Python function to calculate fibonacci numbers

# Get help with errors
> Why would I get a "connection refused" error when connecting to a database?
```

**To exit:** Press `Ctrl+C` twice

If keyboard shortcuts are unfamiliar, ask your instructor to point out the `Ctrl` key. Press and hold `Ctrl`, then press `C`, and repeat once more.

**What's happening:**
- You are chatting with Bob in the terminal
- The session stays open until you exit
- Bob keeps the context of the conversation while the session is active

> 📌 **Learn More:** [Interactive Mode Documentation](https://bob.ibm.com/docs/shell/getting-started/start-bobshell-interactive)

---

## Non-Interactive Mode

Execute single commands for automation and scripting.

You type one Bob command, Bob answers, and the session ends right away.

**Create a test file first:**

If you have never created a file from the terminal, just copy and paste the block exactly as written.

```bash
# You should already be in the sandbox directory
cat > calculator.py << 'EOF'
def add(a, b):
    return a + b

def multiply(x, y):
    return x * y
EOF
```

**Now try non-interactive commands:**

```bash
# Explain code in a file
bob "Explain what calculator.py does"

# Try again with --hide-intermediary-output
bob "Explain what calculator.py does" --hide-intermediary-output

# Review code
bob "Review calculator.py and suggest improvements"

# Quick questions
bob "What is the difference between a list and a tuple in Python?"
```

**Key Flags:**
- `--hide-intermediary-output`: Clean output for file redirection
- `--chat-mode <mode>`: Specify which mode to use

Depending on your BobShell version, available flags may vary slightly. If a command-line option does not work, run `bob --help` to confirm the current syntax.

If the word "flag" is new to you, it means an extra option added to a command.

**What's happening:**
- Bob runs one command and exits
- Output is printed to the terminal
- This is useful for scripts and automation

> 📌 **Learn More:** [Non-Interactive Mode Documentation](https://bob.ibm.com/docs/shell/getting-started/start-bobshell-non-interactive)

---

## Session Management

Bob automatically saves your interactive sessions so you can resume them later.

A session is a saved conversation you can reopen.

```bash
# List available sessions
bob --list-sessions

# Resume the most recent session
bob --resume latest

# Resume a specific session by index
bob --resume 5

# Delete a session
bob --delete-session 3
```

**Example Workflow:**

```bash
# Start working on a feature
bob
> Analyze myapp.js for performance issues
# Bob identifies issues...
> Suggest optimizations for the database queries
# Exit session (Ctrl+C twice)

# Later, resume to continue
bob --resume latest
> Let's implement those database optimizations now
# Bob remembers the previous context
```

**When to use session resume:**
- Continue work after a break
- Keep context across sessions
- Return to earlier work

---

## Output Redirection Best Practices

When redirecting Bob's output to files, use these approaches for clean results.

If you are new to terminal syntax, the `>` symbol sends output into a file instead of showing it only on screen.

**Option 1: Use `--hide-intermediary-output` flag**
```bash
# Generate clean code files
bob "Create a sorting function in Python" --hide-intermediary-output > sort.py
```

**Option 2: Ask Bob to write the file directly**
```bash
# Bob writes the file itself
bob "Create a sorting function in Python and write it to sort.py"
```

**Without these approaches, output may include:**
- Bob's thinking process
- Tool usage messages
- Status updates
- Generated code mixed with the messages above

**With these approaches, you get:**
- Clean generated code
- Fewer intermediary messages
- Files that are easier to use right away

---

## BobShell in Automation

**Example: Code Review Script**

```bash
#!/bin/bash
# review-changes.sh - Review uncommitted changes

echo "Reviewing uncommitted changes..."
bob "Review uncommitted changes (git diff HEAD) and provide a summary" --hide-intermediary-output > review.md
echo "Review saved to review.md"
```

**Example: Batch File Processing**

```bash
#!/bin/bash
# analyze-files.sh - Analyze multiple files

for file in src/*.py; do
    echo "Analyzing $file..."
    bob "Analyze $file for potential bugs and security issues" --hide-intermediary-output > "reports/$(basename $file .py)-analysis.txt"
done
```

**Example: CI/CD Integration**

```bash
# In your CI/CD pipeline
bob "Review the code changes in this PR and check for: security issues, performance problems, and code quality" --hide-intermediary-output > pr-review.md
```

---

## BobShell Best Practices

1. **Be Specific in Requests**
   ```bash
   # Good
   bob "Create a React component for user authentication with email/password fields, validation, and error handling"
   
   # Less specific
   bob "Create a login form"
   ```

2. **Use Appropriate Output Formats**
   ```bash
   # JSON for programmatic processing
   bob "Analyze ./src and provide results in JSON format" --hide-intermediary-output > analysis.json
   
   # Markdown for documentation
   bob "Review ./src for code quality in markdown format" --hide-intermediary-output > review.md
   ```

3. **Leverage Git Integration**
   ```bash
   # Review changes in current branch
   bob "Review code changes between main and HEAD branches"
   
   # Review uncommitted changes
   bob "Review uncommitted changes (git diff HEAD)"
   ```

---

## Troubleshooting

### Step 1: Ask Bob for help

Before trying the manual steps below, ask Bob what might be wrong:

```text
I'm running into a BobShell issue in Lab 3. Can you help me troubleshoot it step by step?
```

### BobShell Command Not Found
- Verify installation: `which bob`
- Check PATH: `echo $PATH`
- Reinstall BobShell if needed
- Restart terminal after installation

### Session Resume Fails
- List sessions: `bob --list-sessions`
- Try specific session: `bob --resume <index>`
- Clear old sessions if needed
- Check session storage: `~/.bob/sessions/`

### Output Redirection Issues
- Use `--hide-intermediary-output` flag
- Or ask Bob to write file directly
- Check file permissions
- Verify output directory exists

---

## Key Takeaways

### BobShell
- ✅ Interactive mode for terminal conversations
- ✅ Non-interactive mode for automation
- ✅ Session management for context preservation
- ✅ Perfect for CI/CD and scripting

---

## Additional Resources

- [Bob Documentation](https://bob.ibm.com/docs/ide)
- [BobShell Documentation](https://bob.ibm.com/docs/shell)
- [Best Practices](https://bob.ibm.com/docs/ide/getting-started/best-practices)

---

**Lab Complete! 🎉**

Congratulations on completing the lab, you now have experience with:

- ✅ Use BobShell for interactive and automated workflows
- ✅ Understand what a terminal-based Bob experience looks like
- ✅ Manage sessions to preserve context across work sessions
- ✅ Redirect output for use in scripts and CI/CD pipelines

---

*Adapted from Client Engineering `bob-intro-labs`. Last Updated: June 2026*
