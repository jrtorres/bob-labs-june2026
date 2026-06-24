# IBM Bob - MCP (Model Context Protocol)
**Duration:** 15 minutes
**Objective:** Understand how MCP extends Bob's capabilities — what it is, how it works, and how it is configured

> **Note:** This is a **conceptual lab**. You will not build or configure an MCP server yourself. The goal is to understand MCP well enough to use pre-configured servers and explain the concept to others.

---

## Overview

This lab introduces the **Model Context Protocol (MCP)** — the mechanism Bob uses to connect to external tools and services. You will **not** build or configure an MCP server in this lab; the focus is on understanding how MCP works so you can use pre-configured integrations confidently.

### Learning Objectives

By the end of this lab, you will:

- ✅ Understand what MCP is and why it exists
- ✅ Know the three MCP component types (Tools, Resources, Prompts)
- ✅ Know where MCP servers are configured and what the config looks like
- ✅ Understand how to use MCP tools in a mode that has MCP access

### Prerequisites

Before starting, ensure you have:

- [ ] Bob installed and running
- [ ] Completed the IBM Bob Fundamentals lab

---

## What is MCP?

**Model Context Protocol (MCP)** is an open protocol that lets Bob connect to outside tools and services in a structured way. It enables Bob to:

- Access external data sources
- Execute custom tools and functions
- Integrate with third-party services
- Extend capabilities beyond built-in features

### MCP Architecture

```
┌─────────────┐         MCP Protocol       ┌─────────────┐
│             │◄──────────────────────────►│             │
│  Bob Client │    JSON-RPC over stdio     │ MCP Server  │
│             │    or HTTP/WebSocket       │             │
└─────────────┘                            └─────────────┘
       │                                          │
       │                                          │
       ▼                                          ▼
  User Requests                            External Services
  - Ask questions                          - JIRA API
  - Execute tasks                          - Databases
  - Get information                        - Deployment tools
                                          - Custom APIs
```

### MCP Components

**1. Tools**: Functions Bob can call
```json
{
  "name": "create_ticket",
  "description": "Create a new issue ticket",
  "parameters": {
    "title": "string",
    "description": "string",
    "priority": "string"
  }
}
```

**2. Resources**: Data Bob can access
```json
{
  "uri": "docs://api-reference",
  "name": "API Documentation",
  "mimeType": "text/markdown"
}
```

**3. Prompts**: Pre-defined templates
```json
{
  "name": "code_review",
  "description": "Perform code review",
  "template": "Review this code for: {criteria}"
}
```

### MCP Server Lifecycle

```
1. Initialize → 2. Register Tools → 3. Handle Requests → 4. Cleanup
     │                  │                    │               │
     ▼                  ▼                    ▼               ▼
  Setup            Define tools        Execute tools    Close connections
  connections      and resources       return results   cleanup resources
```

---

## Using MCP Servers

> **For reference only — you do not need to follow these steps during this lab. MCP servers for this workshop are already set up for you.**

**How an MCP server is added:**

1. Open Bob Settings (gear icon) → MCP
2. Choose Global or Project MCP configuration
    - Global MCPs: `~/.bob/mcp.json`
    - Project MCPs: `.bob/mcp.json` in project root
3. Edit the JSON configuration

```json
{
  "mcpServers": {
    "my-custom-server": {
      "command": "node",
      "args": ["server.js"],
      "cwd": "/path/to/server"
    }
  }
}
```

### Using MCP Tools

**Important:** MCP tools are available only in modes that have MCP access.

That usually means a mode specifically configured with the `mcp` permission group.

```text
# In a mode with MCP access
Create a ticket for the bug we just found

# Bob uses the MCP server's create_ticket tool
Deploy the latest changes to staging

# Bob uses the MCP server's deploy tool
```

---

## Key Takeaways

### MCP (Model Context Protocol)
- ✅ Extends Bob with external tools
- ✅ Connects to internal APIs and services
- ✅ Works in modes that include MCP access
- ✅ Enables enterprise integrations

---

## Additional Resources

- [Bob Documentation](https://bob.ibm.com/docs/ide)
- [MCP Documentation](https://bob.ibm.com/docs/ide/configuration/mcp/understanding-mcp)
- [Best Practices](https://bob.ibm.com/docs/ide/getting-started/best-practices)

---

**Lab Complete! 🎉**

Continue to one of the MCP server labs if you want to learn how to implement and incorporate an MCP server.

---

*Adapted from Client Engineering `bob-intro-labs`. Last Updated: June 2026*
