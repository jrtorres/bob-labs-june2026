# IBM Bob - Modes & Skills

**Duration:** 15 minutes
**Objective:** Create custom modes, skills, and slash commands to tailor Bob to your specific workflows

**Prerequisites:**
- Completed Lab 1: Bob Fundamentals
- Bob application running

> 📌 **Documentation:** [Bob IDE](https://bob.ibm.com/docs/ide) | [Custom Modes](https://bob.ibm.com/docs/ide/configuration/custom-modes) | [Skills](https://bob.ibm.com/docs/ide/features/skills) | [Slash Commands](https://bob.ibm.com/docs/ide/features/slash-commands)

---

## Table of Contents
1. [Overview](#overview)
2. [Custom Modes](#custom-modes)
3. [Creating Custom Modes](#creating-custom-modes)
4. [Managing Custom Modes](#managing-custom-modes)
5. [Hands-On: Experience a Custom Mode](#hands-on-experience-a-custom-mode)
6. [Creating Custom Skills and Slash Commands](#creating-custom-skills-and-slash-commands)
7. [Creating a Skill](#creating-a-skill)
8. [Creating Slash Commands](#creating-slash-commands)
9. [Troubleshooting](#troubleshooting)
10. [Key Takeaways](#key-takeaways)

---

## Overview

This lab introduces two ways to extend and personalize Bob: **Custom Modes** and **Skills/Slash Commands**. Custom modes configure Bob for specific workflows, while skills and slash commands give you reusable instructions you can activate on demand.

### Learning Objectives

By the end of this lab, you will:

- ✅ Understand what custom modes are and how to create them
- ✅ Create and manage a project-scoped custom mode
- ✅ Create a skill that Bob activates automatically
- ✅ Create a slash command for on-demand prompts
- ✅ Know when to use a skill versus a slash command

---

## Custom Modes

### What Are Custom Modes?

Custom modes configure Bob for specific workflows and tasks.

A custom mode is a reusable setup for a specific kind of work.

They define:
- Specialized behavior and focus
- Available tools and capabilities
- Pre-defined prompts and templates
- When to use the mode

![](/images/bob_modes.png)

![](/images/bob_mode_edit.png)

### Creating Custom Modes

Custom modes live in `.bob/custom_modes.yaml` (project-scoped) or `~/.bob/custom_modes.yaml` (global). The file uses `customModes:` and each entry is one mode.

If file paths like this are new to you:
- `.bob/...` means a hidden folder inside your current project
- `~/.bob/...` means a hidden Bob folder in your user home directory

**Basic Mode Structure:**

```yaml
customModes:
  - slug: my-custom-mode
    name: My Custom Mode
    roleDefinition: |
      You are a specialized assistant for [specific task]. Focus on [key areas].
    whenToUse: |
      Use this mode when [specific scenarios].
    groups:
      - read
      - edit
      - command
```

Valid `groups` values: `read`, `edit`, `command`, `browser`, `mcp`. (`command` is what gives the mode permission to run shell commands — there is no `execute` group.)


#### Managing Custom Modes

**To add or update a custom mode:**
1. Open the custom modes configuration location for your project or user profile
2. Edit `customModes:` in `.bob/custom_modes.yaml` or `~/.bob/custom_modes.yaml`
3. Save the file

> 📌 **Learn More:** [Custom Modes Documentation](https://bob.ibm.com/docs/ide/configuration/custom-modes)

#### Example Custom Modes

There are a couple of **illustrative examples** of what a custom mode might look like in the `custom-modes` directory. They are not built-in Bob modes and the tool names listed are fictional. Your actual tools depend on what MCP servers are configured for your project. Feel free to explore the two example modes.


### Hands-On: Experience a Custom Mode

In this exercise you will install the Architecture Design mode and use the same prompt twice — once without the mode and once with it — so you can directly observe what a custom mode changes about Bob's behavior.

#### Ask Bob without any custom mode

1. Make sure you are in the default **Plan** mode. Start a new task and send this prompt:

    ```text
    Design a service that provides real-time account balance lookups for a retail bank.
    ```

1. Bob will ask you a few clarifying questions. For the purposes of this experiment, answer the question as you see fit. Once Bob has enough information, it will create the plan for the new service.

1. Take a moment to note the shape of the response: how it is structured, what topics it covers, and what it leaves out.

    ![](/images/bob_mode_lab_arch1.png)

#### Use a Custom Architecture Design mode

1. Open the `.bob/custom_modes.yaml` file from your project (create the file if it does not exist), then add the following text:

    ```yaml
    customModes:
      - slug: fsm-architecture-design
        name: 🏗️ FSM Architecture Design
        description: System architecture design, technical decision-making, and high-level planning
        roleDefinition: |
          You are a senior software architect with expertise in system design, scalability,
          and technical decision-making. You have deep experience designing systems for
          regulated industries such as financial services, where data consistency, audit
          trails, and compliance requirements are non-negotiable. Your role is to:

          1. Design scalable and maintainable system architectures
          2. Evaluate technology choices and trade-offs
          3. Create architectural diagrams and documentation
          4. Identify potential bottlenecks and failure points
          5. Recommend best practices for distributed systems
          6. Consider security, performance, compliance, and operational aspects — always
            calling out audit logging, encryption at rest/in transit, and regulatory
            constraints where relevant

          Provide well-reasoned architectural decisions with clear justifications.
          Always name at least one alternative approach and explain why the primary
          recommendation is preferred.
        whenToUse: |
          Use this mode for system architecture design, technical decision-making,
          and high-level planning.
        groups:
          - read
          - edit
        customInstructions: |
          Focus areas: scalability, reliability, security, maintainability, performance, cost-optimization.

          Before producing any architecture output, assess whether the request provides enough
          context to make well-reasoned decisions. If ANY of the following are unclear, ask them
          as a short numbered list BEFORE proceeding — do not guess or assume defaults:
            - Expected scale (users, requests per second, data volume)
            - Deployment target (cloud provider/region, on-premises, hybrid)
            - Existing constraints (tech stack, compliance requirements such as PCI-DSS or SOX, SLA targets)
            - Integration points (upstream/downstream systems the service must connect to)

          Only ask questions that are genuinely missing and would change the architecture. Do not ask
          more than 4 questions. If the request already answers these points, proceed directly to output.

          Once you have enough context (either from the original request or the user's answers), every
          system design response MUST follow this structure exactly:
          1. Architecture Diagram — a Mermaid diagram showing the key components and their interactions
          2. Component Breakdown — a short description of each component and its responsibility
          3. Key Design Decisions — the primary approach chosen, with at least one named alternative
            and a justification for the choice
          4. Non-Functional Requirements — explicitly address: consistency guarantees, latency targets,
            security controls (auth, encryption, audit logging), and any compliance considerations
          5. Deployment Strategy — deployment topology, environment notes, and scaling approach

          When producing diagrams, always use Mermaid format so they can be committed alongside the
          code. Do not omit the diagram even for simple services.
    ```

1. Save the file. The mode will appear in Bob's mode selector immediately — no restart required.

1. Open the mode selector in Bob and switch to the  **🏗️ FSM Architecture Design** mode.

1. Start a **new** Bob conversation (mode changes take effect in new conversations) and send the exact same prompt:

    ```text
    Design a service that provides real-time account balance lookups for a retail bank.
    ```

1. Answer any clarifying questions from Bob.

    ![](/images/bob_mode_lab_arch2.png)

1. Then review / compare the output using this custom mode versus the out of the box mode. Look for these specific differences:

    | What to look for | Plan mode (no custom mode) | 🏗️ FSM Architecture Design |
    |---|---|---|
    | **Clarifying questions** | Asks broad planning questions | Asks only architecture-relevant questions (scale, deployment target, constraints, integrations) |
    | **Structure** | Prose plan with tasks/phases | Five fixed sections every time |
    | **Diagram** | Absent or a simple list | Mermaid architecture diagram always present |
    | **Design decisions** | One approach described | Primary approach + named alternative with justification |
    | **Security & compliance** | Mentioned if you bring it up | Explicit: auth, encryption, audit logging, regulatory notes — always |
    | **Deployment** | Rarely addressed | Dedicated deployment strategy section |


> 💡 **What this shows:** The mode did not change the underlying model — it changed Bob's *persona*, *focus*, *clarifying instincts*, and *output contract*. The architecture mode asks different questions than Plan mode does, and structures its output differently regardless of what you ask.

---

## Custom Skills and Slash Commands

### What Are Skills and Slash Commands?

**Skills** and **Slash Commands** provide reusable instructions for Bob:

- **Skills**: Reusable instruction sets that Bob activates when your request matches the skill's description
- **Slash Commands**: Prompts that you explicitly run by typing `/command-name` in chat
- **Both**: Can be stored in the project and shared with your team through version control

> **Important:** Skills are available only in modes that support skills.

### Skills vs. Slash Commands

| | Skills | Slash Commands |
|---|---|---|
| **Best for** | Teaching Bob a repeatable workflow or specialized task | Quickly running a known prompt |
| **How it starts** | Bob selects a relevant skill from your request | You type the command in chat |
| **Project location** | `.bob/skills/<skill-name>/SKILL.md` | `.bob/commands/<command-name>.md` |
| **Required format** | YAML front matter with `name` and `description`, followed by instructions | Markdown instructions; front matter is optional |
| **Extra files** | Can include templates, checklists, scripts, and reference files | Usually kept as one focused Markdown file |

**Simple rule:** Use a **skill** when Bob should recognize when a workflow applies. Use a **slash command** when the user should choose exactly when to run it.

![](/images/bob_skills.png)

![](/images/bob_skills_details.png)

> 📌 **Official Documentation:** [Skills](https://bob.ibm.com/docs/ide/features/skills) | [Slash Commands](https://bob.ibm.com/docs/ide/features/slash-commands)

### Creating a Skill

In this exercise, you will create a small skill that explains code in beginner-friendly language. You will test it against [`app/loan_calculator.py`](app/loan_calculator.py), a simple financial services script included in this lab.

1. Switch to `Agent` mode in bob.

1. Create this project folder and file:

    ```text
    .bob/
    └── skills/
        └── explain-code/
            └── SKILL.md
    ```

1. Add the following to `.bob/skills/explain-code/SKILL.md`:

    ```markdown
    ---
    name: explain-code
    description: Explain code in simple, beginner-friendly terms
    ---

    When explaining code:
    1. Summarize what the code does in one or two sentences.
    2. Explain each function — what it takes as input, what it returns, and why it exists.
    3. Call out any financial or domain-specific concepts (e.g. amortization, interest rate) and define them in plain language.
    4. Keep the response concise and avoid jargon.
    ```

    >Note: The `name` is shown in Bob, while the `description` helps Bob decide when the skill is relevant. Everything after the second `---` contains the instructions.

1. Test the skill in a new Bob conversation, prompt Bob with the following:

    ```text
    Explain app/loan_calculator.py in simple terms for a beginner.
    ```

1. When Bob asks to activate the skill, approve it. Confirm that the response includes a short summary, explains each function, and defines financial terms like *amortization* in plain language.

    ![](/images/bob_mode_lab_skill1.png)

> **Note:** Bob loads a skill once per conversation. Start a new conversation if you change the skill and want to test the updated instructions.

---

## Creating Slash Commands

In this exercise, you will create a command that summarizes any file you name.

1. Create this project folder and file:

    ```text
    .bob/
    └── skills/
        └── summarize-file/
            └── SKILL.md
    ```

1. Add the following to `.bob/skills/summarize-file/SKILL.md`:

    ```markdown
    ---
    description: Summarize a file in the current project
    argument-hint: <file-path>
    metadata:
        user-invocable: true
        disable-model-invocation: true
    ---

    Read $1 and provide:
    - A one-sentence summary of its purpose
    - A short list of its main parts
    - One useful observation

    Keep the response concise. Do not change the file.
    ```

    The optional `description` appears in the command menu. The `argument-hint` shows what to enter, and `$1` represents the first argument supplied to the command.

1. The difference with the prior usage of Skills is we are allowing this `command` to be directly called by an end-user and disabling it from the Skills available to the LLMs.

1. Run the command in Bob chat:

    ```text
    /summarize-file app/loan_calculator.py
    ```

    You can also type `/` and begin typing `summarize` to find the command through autocomplete.

1. Check the result:

    - Bob summarized `app/loan_calculator.py`
    - The response contained the three requested parts
    - The file was not modified

---

## Troubleshooting

### Step 1: Ask Bob for help

Before trying the manual steps below, ask Bob what might be wrong:

```text
I'm running into an issue in this lab. Can you help me troubleshoot it step by step?
```

### Custom Mode Not Working
- Verify the mode file is valid YAML
- Check mode is enabled in Bob Settings
- Restart Bob after importing
- Review mode configuration for errors

### Skill Not Activating
- Verify the skill file has correct YAML front matter with `name` and `description`
- Confirm you are in a mode that supports skills
- Start a new conversation — Bob loads skills once per conversation
- Check the skill file is at `.bob/skills/<skill-name>/SKILL.md`

### Slash Command Not Appearing
- Verify the command file is at `.bob/commands/<command-name>.md`
- Type `/` and wait for the autocomplete menu
- Reload Bob if the command was added while Bob was already open

---

## Key Takeaways

### Custom Modes
- ✅ Tailor Bob to specific workflows
- ✅ Create team-specific modes
- ✅ Share modes across your organization
- ✅ Combine with MCP for powerful integrations

### Skills & Slash Commands
- ✅ Skills let Bob recognize when a repeatable workflow applies
- ✅ Slash commands give you explicit on-demand prompts
- ✅ Both can be version-controlled and shared with your team
- ✅ Store in `.bob/skills/` or `.bob/commands/` at the project root

---

## Additional Resources

- [Bob Documentation](https://bob.ibm.com/docs/ide)
- [Custom Modes Guide](https://bob.ibm.com/docs/ide/configuration/custom-modes)
- [Skills Documentation](https://bob.ibm.com/docs/ide/features/skills)
- [Slash Commands Documentation](https://bob.ibm.com/docs/ide/features/slash-commands)
- [Best Practices](https://bob.ibm.com/docs/ide/getting-started/best-practices)

---

**Lab Complete! 🎉**

You've mastered Bob's Modes and SKills features and are ready to integrate Bob into your development workflows, automation pipelines, and team processes. These capabilities make Bob a powerful tool for any development environment.
