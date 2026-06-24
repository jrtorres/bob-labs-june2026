# IBM Bob - Fundamentals

**Duration:** ~30 minutes
**Objective:** Learn Bob's core workflows, modes, and interactive capabilities in a beginner-friendly way

**Prerequisites:**
- Bob application installed and running
- No prior Bob experience required
- Willingness to follow the steps slowly and try simple prompts

> 📌 **Bob Documentation:** https://bob.ibm.com/docs/ide

---

## Table of Contents
1. [Overview](#overview)
2. [Getting Started](#getting-started-with-bob)
3. [Understanding Modes](#understanding-bobs-modes)
4. [Approvals & Control](#approvals-and-safe-collaboration)
5. [Hands-On Practice](#hands-on-practice)
6. [Key Takeaways](#key-takeaways)
7. [Troubleshooting](#troubleshooting-tips)

---

## Overview

This lab introduces Bob's core capabilities through practical, hands-on exercises written for people who may be completely new to Bob and new to editor-based development tools. You'll learn what you are looking at on screen, how to interact with Bob step by step, and how to stay in control as Bob suggests or makes changes.

### Learning Objectives

By the end of this lab, you will:

- ✅ Navigate Bob's interface confidently
- ✅ Understand what each part of the Bob window does
- ✅ Understand and switch between Bob's modes
- ✅ Use the approval workflow for safe collaboration
- ✅ Use Bob for planning, coding, and learning

### Why Bob?

> **🎯 Bob Differentiator: Multi-Mode Intelligence**
> Unlike other AI assistants that use a one-size-fits-all approach, Bob provides specialized modes optimized for different tasks. Plan mode helps you design before coding, Code or Advanced mode implements your ideas, and Ask mode explains concepts. This separation ensures Bob gives you the right type of help at the right time.

---

## Getting Started with Bob

### The Bob Interface

Open the Bob application. Think of Bob as a workspace with a few main areas:
- a left sidebar for finding files,
- a main chat area for talking to Bob,
- and a file viewing area for reading and reviewing files.

  ![](/images/bob_interface.png)

**Key Components:**

1. **Mode Selector** (bottom left of chat panel)
   - Shows the mode Bob is currently using
   - Click it to switch modes
   - Modes change the kind of help Bob gives you

2. **Chat Panel** (right window of interface)
   - This is where you type messages to Bob
   - You will also see Bob's replies here
   - Tool activity indicators appear here when Bob reads or edits files

3. **File Explorer** (left sidebar)
   - Shows folders and files in your project
   - Click a file name to open it
   - If you have used file browsers before, this works the same way

4. **File Viewer** (middle panel)
   - Shows the contents of the file you opened
   - Also shows Bob's proposed changes before you approve them
   - Helps you compare what changed

5. **Settings** (gear icon)
   - Opens Bob configuration options
   - This is where settings such as models, approvals, and custom modes can be managed

> 📌 If any of these areas are hidden, check Bob's layout or panel visibility controls and turn the panels back on.

**Learn More:** [Chat Interface Features](https://bob.ibm.com/docs/ide/features/chat-interface)

---

## Your First Interaction

Let's start with a simple conversation to understand Bob's capabilities.

If you are new to chat-based tools, click once in the message box at the bottom of the chat panel. You should see a text cursor appear. Type your message, then press `Enter` or click the send button.

After Bob replies, pause and read the full response before typing again. Bob may ask for approval before taking actions. We cover that in a later section, but for this first interaction it is enough to allow the step if it matches what you asked for.

**Try this:**
```text
Hi Bob! I'm new here. Can you tell me 3 things you can help me with?
```

**Then ask:**
```text
What mode are you in right now, and what does that mean?
```

**What's Happening:**
- Bob responds conversationally to help you understand its capabilities
- Bob explains the current mode and its purpose
- You are practicing the basic rhythm of using Bob: type a request, read the response, then ask a follow-up question

**💡 Tip:** If you do not know what to ask next, that is normal. You can always say things like `I am new to this—what should I do next?` or `Explain that more simply.`

---

## Approvals and Safe Collaboration

Approvals are Bob's safety mechanism. Even if you are brand new to tools like this, you stay in control of changes to your files.

### How Approvals Work

When Bob wants to make changes, it:
1. Shows you exactly what it plans to do
2. Displays a preview of the changes
3. Waits for your approval before proceeding
4. Only makes changes after you confirm

This means you do not need to worry about Bob silently changing files in the background during this lab.

### Best Practices for Approvals

**Before approving, always:**
1. ✅ Read the preview carefully
2. ✅ Check which file will be modified
3. ✅ Verify the changes match your request
4. ✅ Look for unintended side effects

**Red flags to watch for:**
- Changes to files you didn't mention
- Deletions of important code
- Modifications that seem too broad
- Anything that doesn't match your intent

### Set Up the Workshop Sandbox

> 📁 **Sandbox convention:** Throughout this lab every scratch file you create with Bob will live under `labs/sandbox/` so the workshop repo stays tidy. You can delete this directory as the final step of the lab.

Before practicing approvals, ask Bob to create the sandbox directory. **In Code mode:**

If you are not sure whether you are in Code mode, check the mode selector before sending the prompt.

```text
Create an empty directory at labs/sandbox/
```

Approve the action when Bob prompts. All subsequent file-creation exercises in this lab (and the BobShell exercises in Lab 2) will write into this directory.

### Approval Exercise

Now let's practice the approval workflow with an actual file.

**Step 1: Simple File Creation**
In Code mode, ask Bob:
```text
Create a file at labs/sandbox/hello.txt with the text "Hello from Bob"
```

**Watch for:**
- Which action Bob proposes to take
- When the approval prompt appears
- What the preview shows
- The file path and content

**Step 2: Review and Approve**
- Read the preview slowly
- Verify the filename is correct
- Check the content matches your request
- If everything looks right, click "Approve"
- If something looks wrong or confusing, click "Reject" and ask Bob to try again with a clearer instruction

### Understanding Auto-Approvals

**Auto-approvals** allow Bob to make multiple changes without asking each time. This is useful for:
- Creating multiple related files
- Making consistent changes across files
- Batch operations

**⚠️ Important Safety Notes:**
- Only enable auto-approvals when you trust the operation
- Review all changes after Bob completes them
- You can always undo changes using version control
- Start with manual approvals until you're comfortable

**To enable auto-approvals:**
1. Look for approval or permission settings in Bob's interface
2. Enable the options you want for the current session
3. Bob will be able to complete repeated actions more quickly
4. Review the results when complete

> 📌 **Learn More:** [Managing approvals](https://bob.ibm.com/docs/ide/features/auto-approving-actions)

---

## Understanding Bob's Modes

Bob has specialized modes, each optimized for different types of work:

> **🎯 Bob Differentiator: Customizable Modes
>
> Bob's mode system is a key differentiator. The three built-in modes are just the beginning—you can create custom modes tailored to your team's specific workflows (code review, documentation, architecture design, DevOps, etc.). This extensibility makes Bob uniquely adaptable to your organization's needs.

You will see three core modes to start and you can add custom modes as you go forward! 

### The Three Core Modes

#### 📋 Plan Mode
**When to use:** Planning, designing, strategizing before implementation

**Perfect for:**
- Designing system architecture
- Planning API endpoints
- Creating database schemas
- Breaking down complex features
- Making technical decisions
- Outlining project structure

**Example prompts:**
```text
Help me design a REST API for a user management system
```

```text
Plan the database schema for an e-commerce application
```

```text
What's the best architecture for a microservices-based system?
```

#### 🤖 Code Mode
**When to use:** Writing, modifying, or refactoring code

**Perfect for:**
- Implementing features
- Creating new files
- Modifying existing code
- Fixing bugs
- Refactoring code
- Adding tests

**Example prompts:**
```text
Create a user authentication module in Python
```
```text
Add error handling to the payment processing function
```
```text
Refactor this code to use async/await
```

#### ❓ Ask Mode
**When to use:** Learning, understanding, getting explanations

**Perfect for:**
- Understanding code concepts
- Getting documentation
- Explaining errors
- Learning best practices
- Comparing technologies
- Clarifying requirements

**Example prompts:**
```text
Explain how JWT authentication works
```
```text
What's the difference between REST and GraphQL?
```
```text
Why is this code throwing a NullPointerException?
```

### Switching Between Modes

**To switch modes:**
1. Look for the mode selector near the lower-left area of the Bob window
2. Click it once to open the list of available modes
3. Read the mode names in the menu
4. Select the mode you need
5. Bob adapts its behavior immediately

If you are unsure which mode to pick, start with Ask mode when you want an explanation, Plan mode when you want help thinking through a task, and Code or Advanced mode when you want Bob to create or change files.

A good beginner habit is to say out loud what you want before choosing the mode:
- `I want an explanation` → Ask mode
- `I want help thinking this through` → Plan mode
- `I want Bob to make or change something` → Code mode

### Mode Practice Exercise

Let's practice switching modes and seeing how Bob's responses differ:

**Step 1: Plan Mode**
Switch to Plan mode and ask:
```text
Help me plan a task management application. What features should I include and how should I structure it?
```

**What to observe:**
- Bob asks clarifying questions about your requirements
- Bob provides architectural guidance
- Bob suggests features and structure without writing code

**Step 2: Ask Mode**
Switch to Ask mode and ask:
```text
What are the key differences between SQL and NoSQL databases, and when should I use each?
```

**What to observe:**
- Bob provides educational explanations
- Bob compares and contrasts concepts
- Bob helps you understand, not just implement

**Step 3: Code Mode**
Switch to Code mode and ask:
```text
Create and validate a simple Python function that validates email addresses using regex
```

**What to observe:**
- Bob writes actual code
- Bob creates files or modifies existing ones
- Bob focuses on implementation

You can check out the contents of the Modes in the Mode tab of Settings. You can also edit your modes here.

![](/images/bob_mode_edit.png)

> 📌 **Learn More:** [Bob Modes Documentation](https://bob.ibm.com/docs/ide/features/modes)

---

## Hands-On Practice

Now let's put everything together with practical exercises. These work with any programming language or framework, and you do not need to be an expert programmer to complete them.

### Exercise 1: Planning a Feature

**Switch to Plan Mode** and try this:

```text
I want to add a user profile feature to my application. Help me plan:
1. What data should I store?
2. What API endpoints do I need?
3. How should I structure the code?
```

**Bob's Interactive Approach:**
- Bob will ask clarifying questions about your requirements
- Bob helps you think through the design
- Bob provides suggestions while letting you drive decisions

**Respond with your preferences:**
- Answer Bob's questions based on your needs
- Ask follow-up questions if anything is unclear
- Iterate until you have a clear plan

### Exercise 2: Creating Files

**Switch to Code Mode** for these quick exercises:

Move through these one at a time. Wait for Bob to finish each step before starting the next one.

**Step 1: Create a configuration file**
```text
Create labs/sandbox/config.json with basic application settings:
- app name
- version
- environment (development)
Keep it simple.
```

**Step 2: Create a utility function**
```text
Create a utils file inside labs/sandbox/ (in [your preferred language]) with a function that formats dates.
Keep it minimal and well-commented.
```

**Step 3: Connect related files**
```text
Create a main file inside labs/sandbox/ that imports and uses the utility function from the utils file in the same directory.
```

### Exercise 3: Understanding Code

**Switch to Ask Mode** and try:

If Bob uses words you do not recognize, ask a follow-up like `Explain that in simpler language` or `What does that term mean?`

```text
Explain what each file in labs/sandbox/ does in simple terms:
- config.json
- utils file
- main file
```

### Exercise 4: Making Improvements

**Back to Code Mode:**

This step helps you practice going back and forth between understanding something and improving it.

```text
Add error handling to the date formatting function in labs/sandbox/utils.
Include a comment explaining why error handling is important here.
```

**What You've Practiced:**
- ✅ Planning before implementing
- ✅ Creating files with Bob
- ✅ Understanding your code
- ✅ Making improvements iteratively

---

## Key Takeaways

### Bob's Modes
- **Plan Mode**: Design and strategize before coding
- **Code Mode**: Implement features and make changes
- **Ask Mode**: Learn and understand concepts
- **Custom Modes**: Create specialized modes for your workflows ([Learn more](../resources/bob-differentiators.md#customizable-modes))

### Working with Bob
- Bob shows what it will do before taking action
- You stay in control through approvals
- Switch modes based on your current task
- Ask clarifying questions when needed
- Iterate and refine your requests

### Best Practices
- Plan before implementing (use Plan mode first)
- Review all changes before approving
- Start with specific, focused requests
- Use the right mode for each task
- Ask Bob to explain when you're unsure

---

## Troubleshooting Tips

### Step 1: Ask Bob for help

Before trying anything else, ask Bob what might be wrong. Often Bob can help you identify the issue, suggest the next step, or explain what to check.

Try prompts like:

```text
I'm running into an issue with this lab. Can you help me figure out what to check next?
```

```text
Something did not work as expected. Can you help me troubleshoot it step by step?
```

### Bob is doing too much

**Solution:** Be more specific and narrow in your requests

```text
❌ "Build a complete application"
✅ "Create just the user model file for now"
```

### The generated code is too complex

**Solution:** Ask Bob to simplify

```text
Please simplify this to beginner-friendly code with minimal features
```

### I'm not sure which mode to use

**Quick reference:**
- Planning/designing → **Plan mode**
- Creating/editing code → **Code mode**
- Learning/understanding → **Ask mode**

### I don't understand the code

**Solution:** Switch to Ask mode and request an explanation

```text
Explain this code line by line in plain English
```

### Bob isn't giving me what I want

**Solution:** Provide more context and be specific

```text
❌ "Fix this"
✅ "Fix the null pointer exception on line 45 in UserService.java by adding a null check"
```

---

## What You've Learned

✅ How to navigate Bob's interface  
✅ How to switch between modes effectively  
✅ How approvals keep you in control  
✅ How to plan before implementing  
✅ How to create and modify files safely  
✅ How to use Bob for learning and understanding  

---

## Next Steps

Now that you understand Bob's fundamentals, you're ready to:
- Apply Bob to your actual projects
- Explore advanced features in Lab 2
- Continue building confidence with the interface and approvals
- Integrate Bob into your development process over time

---

## Additional Resources

- [Bob Documentation](https://bob.ibm.com/docs/ide)
- [Bob Modes Guide](https://bob.ibm.com/docs/ide/features/modes)
- [Chat Interface Features](https://bob.ibm.com/docs/ide/features/chat-interface)
- [Auto-Approval Settings](https://bob.ibm.com/docs/ide/features/auto-approving-actions)

---

**Lab Complete! 🎉**

You've mastered Bob's fundamentals through practical, hands-on exercises. You're now ready to apply these skills to any development project and explore Bob's advanced capabilities.