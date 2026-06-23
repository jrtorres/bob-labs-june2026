# IBM Bob — Application Analysis
**Duration:** 45–60 minutes  
**Objective:** Use IBM Bob to analyze an existing sample application (a banking application codebase) to generate stakeholder-ready architecture documentation, discover security vulnerabilities, and apply secure code fixes.  
**Difficulty:** Intermediate

--- 

## Overview

In this lab you will work through two end-to-end scenarios using the **GFM Bank Core Banking System** demo application — a sample banking system built with Python and FastAPI. Each lab focuses on a different dimension of code quality and demonstrates how IBM Bob can act as an expert engineering partner.

- **Part 1** — Understand how the system works, generate architecture diagrams and comprehensive documentation, extract business requirements, and document system invariants.
- **Part 2** — Audit the data pipeline for security vulnerabilities, produce a compliance-ready security report, apply secure code fixes, and verify remediation.

### Lab Objectives

By the end of this workshop, you will:

- ✅ Use Ask mode to analyze complex banking codebases and uncover security issues
- ✅ Use Plan mode to generate architecture documentation and security audit reports
- ✅ Produce Mermaid architecture, ER, and sequence diagrams
- ✅ Extract functional requirements and business rules from code
- ✅ Identify and document system invariants and assumptions
- ✅ Generate compliance-ready documentation (ARCHITECTURE.md, SECURITY_AUDIT_REPORT.md)

### Prerequisites

Before starting, ensure you have:

- [ ] Bob installed and running
- [ ] Python 3.8+ installed (to inspect and optionally run the lab code)
- [ ] Familiarity with REST APIs and basic security concepts

---

## Part 1 — Application Architecture & Code Understanding

### Goal
Demonstrate how IBM Bob can:
- Understand complex banking system codebases
- Analyze API architecture and data flows
- Generate comprehensive engineering artifacts (diagrams, documentation)
- Reason about financial transaction logic and data integrity
- Produce architecture documentation suitable for stakeholders

### Lab Files

The following files are used in Part 1:

- `app/demo_api.py` — Core Banking FastAPI backend server
- `app/teller_client.py` — Teller CLI for customer-facing operations
- `app/backoffice_client.py` — Back-office CLI for administrative operations
- `app/corebank.db` — SQLite database with sample data
- `app/Dockerfile` — Container deployment configuration

---

### Step A — Understand the Code

1. Switch to **Ask Mode** before starting this step. Ask mode is optimised for deep code analysis and explanation. Lets use `Ask` mode to get a deeper understanding of the applicaiton:
   - API endpoints and authentication
   - Transaction processing logic
   - Role-based access control
   - Data integrity mechanisms
   - Business rules and constraints

This step shows that IBM Bob can perform a **deep technical read** of banking software, not just summarize files.

1. Enter the following prompt in Bob (do not submit the request yet):

```text
Can you describe what this application (only the source code in my app directory) is doing? In addition, can you show me the software architecture - a Mermaid diagram will be a good start.
```

1. [Optional] Before sending the prompt to Bob, use Bob's prompt enhancer ✨ to generate a more detailed request. It **may** look similar to the following, do not worry if it deviates a bit:

   ```text
   Analyze the source code located exclusively within the `app` directory of this repository. Do not reference, infer from, or include any files outside of the `app` directory in your analysis.

   Perform the following two tasks:

   **Task 1: Application Description**
   Provide a thorough written description of what the application does, covering:
   - The primary purpose and functionality of the application
   - Key features and capabilities
   - How the major components interact at a high level
   - Any notable patterns, frameworks, or libraries in use
   - Entry points and core execution flow

   **Task 2: Software Architecture Diagram**
   Generate a Mermaid diagram that accurately represents the software architecture of the application as found in the `app` directory. The diagram must include:
   - All major modules, components, classes, or services identified in the source code
   - The relationships and dependencies between components (e.g., calls, imports, inherits, emits)
   - Data flow directions where applicable
   - Clear labeling of each node and edge using names derived directly from the actual source code
   - Use an appropriate Mermaid diagram type (e.g., `graph TD`, `classDiagram`, `flowchart LR`) based on what best represents the architecture

   Ensure all findings are grounded strictly in the actual source code present in the `app` directory. Do not make assumptions about functionality that is not evidenced by the code.
   ```

1. Bob will provide you a description of the application, its purpose, and information about each of the source code files. 

### Step B — Generate Documentation

1. Switch to **Plan Mode** before starting this step. Plan mode is optimised for generating structured documentation and architecture artifacts. We will use it to generate formal architecture documentation for:
- Regulatory compliance and audits
- Onboarding new team members
- System integration planning
- Change management processes

1. Ask Bob to create an architecture document with the following prompt:

```
Based on your analysis of this application, create a comprehensive ARCHITECTURE.md document that includes:

1. **Executive Summary**: One-paragraph overview of the system
2. **System Architecture**: High-level Mermaid diagram showing all components
3. **Component Descriptions**: Detailed explanation of each module
4. **API Reference**: All endpoints with their purposes and access controls
5. **Data Model**: Entity-relationship diagram using Mermaid
6. **Transaction Flow**: Sequence diagram for key operations (transfer, balance inquiry)
7. **Security Model**: Authentication, authorization, and data protection
8. **Functional Requirements**: List of supported business operations
9. **Non-Functional Requirements**: Performance, reliability, and scalability considerations
10. **Assumptions and Constraints**: Technical and business limitations

Save this as ARCHITECTURE.md in the app directory.
```

1. Note that Bob should have enough context to create the architecture documentation for you. Bob may ask you to confirm its plan before writing the actual markdown file.

> **Note:** Bob will ask to switch to Agent mode to write the file, approve the request.

1. Feel free to review the `ARCHITECTURE.md` document. Bob was able to generate not just descriptions for the source code files, but a higher level system architecture, information about data model, APIs and requirements.

1. Although the architecture document already has a good amount of information, we can continue to use Bob to deepen our understanding of the application. 

1. Switch to the **Ask ❓** mode in Bob and lets have Bob document some of the functional requirements to improvove our understand system capabilities without reading code.

1. Prompt Bob with the following:

```
Extract and document all functional requirements from the codebase:

1. **Teller Operations**:
   - What can a teller do?
   - What information can they access?
   - What are the limitations?

2. **Back-Office Operations**:
   - What administrative functions are available?
   - What privileged operations require BACKOFFICE role?

3. **Business Rules**:
   - Overdraft limits and enforcement
   - Transfer validation rules
   - Fee reversal constraints

Format this as a structured requirements document with clear acceptance criteria.
```

1. Review the requirements Bob extracted from all the source code files.

1. Finally, lets also ask Bob to identify any invariants which helps us prevent bugs and guide future development.

1. Still in **Ask** mode, prompt Bob with:

```
Identify and document all system invariants and assumptions:

1. **Data Invariants**: Rules that must always hold true in the database
2. **Business Invariants**: Financial rules that cannot be violated
3. **Security Invariants**: Access control rules that must be enforced
4. **Technical Assumptions**: What the code assumes about its environment

For each invariant, explain:
- What the invariant is
- Where in the code it's enforced
- What could go wrong if violated
```

1. Now lets ask Bob to put this all together. Ask Bob to save all the requirements, assumptions and invariants into a new solution document markdown file:

```
Write these requirements, assumptions and invariants to a new solution documentation markdown file. Include any tables and diagrams that were already generated.
```

1. Bob will ask for approval to switch to **Agent** mode and write the file. Review the generated solution document, it will have all the requirements, business rules and assumptions Bob was able to find in the application. Combined with the Architecture document, Bob has given us a solid understanding of this application.

---

## Part 2 — Security Issue Discovery and Remediation

### Goal
Demonstrate how Bob can:
- Discover security vulnerabilities in code
- Categorize issues by severity and type (OWASP, CWE)
- Generate comprehensive security audit reports
- Propose secure code fixes
- Document remediation strategies for compliance

### Lab Files

We are going to use slightly different application source files for this security analysis security analysis:

- `app_insecure/data_pipeline.py` — Data engineering pipeline with intentional vulnerabilities
- `app_insecure/synthetic_generator.py` — Synthetic data generator with intentional vulnerabilities

> **Note:** These files contain **intentional security vulnerabilities** for educational purposes. The vulnerabilities include SQL injection, command injection, insecure deserialization, hardcoded credentials, and more.

### Workshop Flow

1. Discover security vulnerabilities in the codebase
2. Categorize and document each vulnerability
3. Generate a comprehensive security audit report
4. Apply secure code fixes
5. Verify remediation effectiveness

Each step builds on the previous one and mirrors how security audits are conducted in real enterprise environments.

---

### Step A — Discover Security Vulnerabilities

1. Start a `New task` in Bob.

1. Switch to **Ask Mode** before starting this step. Ask mode is optimised for thorough code analysis and vulnerability identification. We are going to start with a comprehensive vulnerability discovery. IBM Bob can analyze code to identify security issues that might be missed by traditional static analysis tools.

1. Prompt Bob with the following:

      ```text
      Analyze the code files in my application (only the source code in my app_insecure directory) for security vulnerabilities. Identify all security issues, categorize them by type (OWASP Top 10, CWE), and rank them by severity (Critical, High, Medium, Low).

      For each vulnerability found, provide:
      1. Location (file and line number)
      2. Vulnerability type and category
      3. Description of the security risk
      4. Potential attack scenario
      5. Severity rating with justification
      ```

1. Bob should flag a couple of expected findings

      **data_pipeline.py:**
      - Hardcoded credentials (CWE-798)
      - SQL Injection via string formatting (CWE-89)
      - Command injection via shell=True (CWE-78)
      - Insecure deserialization with pickle (CWE-502)
      - Disabled SSL verification (CWE-295)
      - Overly permissive file permissions (CWE-732)

      **synthetic_generator.py:**
      - Hardcoded JWT secret (CWE-798)
      - Insecure randomness for tokens (CWE-330)
      - Arbitrary code execution via eval/exec (CWE-94)
      - Weak password hashing with MD5 (CWE-328)
      - Secrets written to disk in plaintext (CWE-312)
      - Command injection (CWE-78)

1. Switch to **Plan Mode** before starting this step. Plan mode is optimised for producing structured, compliance-ready documentation. Like the security report we want to create next. 

1. Prompt Bob to create a security report:

      ```text
      Generate a comprehensive SECURITY_AUDIT_REPORT.md document that includes:

      1. **Executive Summary**
         - Overview of files analyzed
         - Total vulnerabilities found by severity
         - Overall risk assessment
         - Key recommendations

      2. **Vulnerability Inventory**
         For each vulnerability:
         - Unique ID (e.g., VULN-001)
         - File and line number
         - Vulnerability title
         - CWE/OWASP classification
         - Severity rating (Critical/High/Medium/Low)
         - CVSS score estimate (if applicable)
         - Detailed description
         - Proof of concept / attack scenario
         - Business impact
         - Remediation recommendation
         - Remediation effort estimate

      3. **Risk Matrix**
         - Visual representation of vulnerabilities by severity and likelihood

      4. **Remediation Roadmap**
         - Prioritized list of fixes
         - Suggested implementation order
         - Dependencies between fixes

      5. **Secure Coding Guidelines**
         - Best practices to prevent similar issues
         - Language-specific recommendations for Python

      Save this as SECURITY_AUDIT_REPORT.md in the current directory.
      ```

### Step B — Apply a security fix

1. While we could use Bob to create a plan to address all the security vulnerabiltiies that have been identified. For the purpose of this lab, we will showcase how Bob can help us address one of these issues. For now, we are going to fix the SQL Injection vulnerability.

1. Switch to **Agent Mode** for this step. Agent mode can read the vulnerable files, apply all fixes, and write the secure versions directly.

1. Ask Bob to fix the SQL Injection issue: 

      ```text
      Fix the SQL Injection security vulnerabilities in the codebase. For the fix:

      1. Apply the secure coding pattern
      2. Add comments explaining the security improvement
      3. Ensure the fix doesn't break existing functionality
      4. Follow Python security best practices
      ```

1. Bob will review and update the `data_pipeline.py` file and run some validation tests.

1. To validate, lets switch back to **Ask Mode** to review and verify the fixes Bob applied. Prompt Bob with:

      ```text
      Review the fixed code files and verify that:

      1. The SQL Injection vulnerabilities have been addressed
      2. No new security issues have been introduced
      3. The code still functions correctly
      4. Security best practices are followed

      Generate a REMEDIATION_VERIFICATION.md document that includes:
      - Checklist of all vulnerabilities and their fix status
      - Any remaining concerns or recommendations
      - Suggestions for additional security hardening
      - Recommendations for security testing (SAST, DAST, penetration testing)
      ```

1. You can go ahead an review the remediation report. You should see the single vulnerability was fixed but there other issues are still flagged.

---

## Congratulations! 🎉

You've successfully completed the lab! You've learned to:

**Part 1 — Architecture & Documentation**
- ✅ Perform a deep technical read of a complex banking codebase
- ✅ Generate Mermaid architecture, ER, and sequence diagrams
- ✅ Produce an enterprise-grade ARCHITECTURE.md document
- ✅ Analyze data pipelines and transaction flows
- ✅ Extract functional requirements and business rules from code
- ✅ Document critical system invariants and assumptions

**Part 2 — Security Audit & Remediation**
- ✅ Discover security vulnerabilities using IBM Bob
- ✅ Categorize issues using OWASP Top 10 and CWE standards
- ✅ Generate a compliance-ready SECURITY_AUDIT_REPORT.md
- ✅ Apply secure coding fixes across multiple vulnerability classes
- ✅ Verify remediation and produce a REMEDIATION_VERIFICATION.md
- ✅ Apply best practices to prevent future security issues

---

## Additional Resources

- Security Standards
  - [OWASP Top 10](https://owasp.org/Top10/)
  - [CWE Database](https://cwe.mitre.org/)
  - [NIST Secure Software Development Framework](https://csrc.nist.gov/Projects/ssdf)

- Python Security
  - [Python Security Best Practices](https://python.org/dev/security/)
  - [Python `secrets` Module](https://docs.python.org/3/library/secrets.html)
  - [FastAPI Security Documentation](https://fastapi.tiangolo.com/tutorial/security/)

---

*Adapted from Client Engineering EMEA Banking application lab. Last Updated: May 2026*