---
name: init-techlead
description: >
  Bootstrap a project with Techlead's document hierarchy. Use when the user types /init-techlead,
  wants to set up project governance, or when GOAL.md is missing and needs to be created.
allowed-tools: Read, Write, Edit, Glob, Bash
---

# /init-techlead

Set up the Techlead document hierarchy for a project.

## Step 1: Check Existing State

Check if any of these files already exist: `GOAL.md`, `ROADMAP.md`, `ARCHITECTURE.md`, `CLAUDE.md`.

If any exist, ask once: "Some Techlead documents already exist ([list them]). Overwrite or skip existing?"

## Step 2: Interview the User (Single Prompt)

Ask all of these in one message to minimize back-and-forth:

> To set up Techlead, I need a few things:
>
> 1. **Project goal** — What is the single primary goal of this project?
> 2. **Success criteria** — How do you know when it's done? (2-3 measurable criteria)
> 3. **Out of scope** — What should this project explicitly NOT do?
> 4. **Current priorities** — What 1-3 items should you work on right now?
> 5. **Tech stack** — Language, framework, database, and testing tool?

## Step 3: Generate Files

After the user responds, create all files at once:

1. **GOAL.md** — Fill the template from `templates/GOAL.md.template` with the user's goal,
   success criteria, and out-of-scope items.

2. **ROADMAP.md** — Fill from `templates/ROADMAP.md.template`. Put the user's priorities
   in "Now". Leave "Next" and "Later" with placeholder items.

3. **ARCHITECTURE.md** — Fill from `templates/ARCHITECTURE.md.template` with the tech stack.
   Keep the default module structure and import rules.

4. **docs/adr/** directory — Create it.

5. **docs/adr/000-index.md** — Copy from `templates/adr-index-template.md`.

6. **CLAUDE.md** — If it exists, append the content from `templates/CLAUDE.md.template`.
   If not, create it from the template.

## Step 4: Confirm

Print:

```
Techlead initialized:
  ✓ GOAL.md
  ✓ ROADMAP.md
  ✓ ARCHITECTURE.md
  ✓ docs/adr/000-index.md
  ✓ CLAUDE.md

Start coding — alignment checks are now active.
Use /propose-architecture for architectural decisions.
```
