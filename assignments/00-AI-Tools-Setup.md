# Assignment 00: AI Tools Setup

- **Format:** Setup checklist
- **Estimated time:** 45-75 minutes
- **Submitting:** Submit your completed setup notes where instructed by your instructional team.

## Goal

Install and verify the AI-assisted development tools used during the bootcamp. This assignment is about getting your machine ready, not building a project.

## Objectives

You will:

- Confirm your terminal, editor, Node, npm, and Git are working.
- Install or open Warp.
- Install or open Cursor.
- Install and authenticate Claude Code.
- Install and authenticate Codex.
- Learn where each tool fits in your development workflow.
- Create a short setup note with versions, screenshots, and blockers.

## Required Tools

Use the official install pages for your operating system:

- [Warp install docs](https://docs.warp.dev/getting-started/quickstart/installation-and-setup)
- [Cursor install docs](https://docs.cursor.com/en/get-started/installation)
- [Claude Code docs](https://code.claude.com/docs)
- [Codex CLI getting started](https://help.openai.com/en/articles/11096431-openai-codex-cli-getting-started)
- [Node.js downloads](https://nodejs.org/en/download)

Your instructional team may provide cohort-specific login instructions. Use those instructions if they differ from the public docs.

## Setup Checklist

### Part 1: Baseline Developer Tools

- [ ] Open your terminal.
- [ ] Confirm Git works:

```bash
git --version
```

- [ ] Confirm Node works:

```bash
node -v
```

- [ ] Confirm npm works:

```bash
npm -v
```

- [ ] Confirm your global Git name and email:

```bash
git config --global user.name
git config --global user.email
```

### Part 2: Warp

- [ ] Install Warp or confirm it is already installed.
- [ ] Open Warp.
- [ ] Run:

```bash
pwd
git --version
node -v
```

- [ ] Optional: sign in if your instructional team asks you to use Warp account features.
- [ ] Create one note about something you like or dislike compared with your previous terminal.

### Part 3: Cursor

- [ ] Install Cursor or confirm it is already installed.
- [ ] Open this cohort repository in Cursor.
- [ ] Sign in if needed for AI features.
- [ ] Import VS Code settings if you want them.
- [ ] Open the integrated terminal.
- [ ] Run:

```bash
pwd
git status
```

- [ ] Verify you can open the Command Palette.
- [ ] Verify Cursor chat or agent features are available.

### Part 4: Claude Code

- [ ] Install Claude Code using the official docs or the command your instructional team provides.
- [ ] Verify the install:

```bash
claude --version
```

- [ ] Authenticate with your approved account.
- [ ] From a practice project folder, run Claude Code.
- [ ] Ask it:

```text
Explain what files are in this project. Do not edit anything.
```

- [ ] Confirm you understand when the tool is asking for permission.

### Part 5: Codex

- [ ] Install Codex using the official docs or the command your instructional team provides.
- [ ] Verify the install:

```bash
codex --version
```

- [ ] Authenticate with your approved OpenAI or ChatGPT account.
- [ ] From a practice project folder, run Codex in its safest/default mode.
- [ ] Ask it:

```text
Review this project structure and summarize what it contains. Do not edit anything.
```

- [ ] Confirm you understand the approval mode before allowing edits or commands.

## Setup Notes to Submit

Create a file named `ai-tools-setup.md` in your personal bootcamp notes folder. Include:

- [ ] Your operating system.
- [ ] `git --version` output.
- [ ] `node -v` output.
- [ ] `npm -v` output.
- [ ] Whether Warp opens successfully.
- [ ] Whether Cursor opens the cohort repo successfully.
- [ ] `claude --version` output or a note explaining the blocker.
- [ ] `codex --version` output or a note explaining the blocker.
- [ ] One screenshot showing Cursor open.
- [ ] One screenshot showing Warp or your terminal open.
- [ ] One question you still have about using AI tools responsibly.

Do not include API keys, tokens, passwords, or screenshots that reveal secrets.

## Common Gotchas

- If `node` or `npm` is missing, install the current LTS version of Node.js.
- If a command works in one terminal but not another, check your shell `PATH`.
- If npm global installs fail with permissions errors, ask for help before using `sudo`.
- If an AI tool asks to edit files or run commands, read the request before approving.
- If an AI tool gives install instructions that differ from official docs, verify with the official docs.
- If you paste terminal output into AI chat, scan it for secrets first.

## Industry Standards

- Keep tools updated.
- Use official docs for installs.
- Use Git before letting an agent make large edits.
- Start AI agents in the project folder you actually want them to inspect.
- Prefer read-only exploration before edit mode.
- Review diffs before accepting changes.
- Never share secrets with AI tools.

## Finished Checklist

Before submitting, verify:

- [ ] You can open the cohort repo in Cursor.
- [ ] You can run commands in Warp or your terminal.
- [ ] You can run `git`, `node`, and `npm`.
- [ ] You can open Claude Code or have documented your blocker.
- [ ] You can open Codex or have documented your blocker.
- [ ] Your setup notes do not contain secrets.
