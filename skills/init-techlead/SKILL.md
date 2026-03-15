---
name: init-techlead
description: >
  Bootstrap a project with Techlead's document hierarchy. Use when the user types /init-techlead,
  wants to set up project governance, or when docs/GOAL.md is missing and needs to be created.
---

# /init-techlead

Set up the Techlead document hierarchy for a project.

## Step 1: Check Existing State

Check if any of these files already exist: `docs/GOAL.md`, `docs/ROADMAP.md`, `docs/SPEC.md`, `docs/ARCHITECTURE.md`, `CLAUDE.md`.

If any exist, ask once: "Some Techlead documents already exist ([list them]). Overwrite or skip existing?"

## Step 1c: Detect Non-Standard docs/

If `docs/` exists but contains files that don't match the Techlead canonical structure (`GOAL.md`, `ROADMAP.md`, `SPEC.md`, `ARCHITECTURE.md`), suggest migration:

> Found existing docs that don't match Techlead's structure. Run `/restructure-docs` to migrate them to the canonical format before continuing setup.

If the user chooses to continue without restructuring, proceed normally (overwrite/skip as chosen in Step 1).

## Step 1b: Detect Existing Source Code

Check if the project already has source code (e.g., `src/`, `lib/`, `app/`, `package.json`, `pyproject.toml`, `go.mod`, or similar). Note whether code exists — this affects Step 3 and Step 4.

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

1. **docs/GOAL.md** — Fill the template from `templates/GOAL.md.template` with the user's goal,
   success criteria, and out-of-scope items.

2. **docs/ROADMAP.md** — Fill from `templates/ROADMAP.md.template`. Put the user's priorities
   in "Now". Leave "Next" and "Later" with placeholder items.

3. **docs/SPEC.md** — If source code was detected in Step 1b, scan the codebase to generate
   initial specs. Otherwise, create from `templates/SPEC.md.template` (empty).

   **Step 3b: Generate Specs from Source Code** (only when code exists)

   a. **Scan for capabilities** — Read route handlers, CLI commands, UI components, model files,
      exported functions. Identify user-facing capabilities (not internal helpers).

   b. **Derive Given/When/Then behaviors** — For each capability, write behavioral specs describing
      user-observable outcomes. Use outcome language: what the user sees/gets, NOT implementation
      details. Anti-patterns to avoid: API paths, HTTP methods, status codes, function names, DB schemas.

   c. **Choose format** — If 4+ capabilities or any single capability needs >30 lines of behaviors,
      use multi-file `docs/specs/` directory with `README.md` index + per-capability files.
      Otherwise use single `docs/SPEC.md`.

   d. **Present for confirmation** — Show the derived capabilities list and ask:
      > I found these capabilities in the codebase: [list]. I'll generate behavioral specs for each.
      > Any to add, remove, or rename before I proceed?

   e. **Generate** — Write spec files using the project's own terminology. Combine with any context
      from Step 2 interview answers (e.g., if user mentioned features, incorporate those).

4. **docs/ARCHITECTURE.md** — Fill from `templates/ARCHITECTURE.md.template` with the tech stack.
   Fill the System Overview with a simple placeholder diagram. Fill the Directory Structure
   from the actual project tree if code exists, or leave the template placeholder if greenfield.
   Keep the default module structure and import rules.

5. **CLAUDE.md** — If it exists, append the content from `templates/CLAUDE.md.template`.
   If not, create it from the template.

## Step 4: Confirm

Print:

```
Techlead initialized:
  ✓ docs/GOAL.md
  ✓ docs/ROADMAP.md
  ✓ docs/SPEC.md
  ✓ docs/ARCHITECTURE.md
  ✓ CLAUDE.md

ADRs are stored as git commits with adr/ tags.
Spec records are stored as git commits with spec/ tags.
Use /propose-architecture for architectural and design decisions (tech choices, API design, data models, module structure).
Use /propose-spec to define feature specifications.

Start coding — alignment checks are now active.
```

When specs were generated from source code in Step 3b, replace the `docs/SPEC.md` line with:
- `✓ docs/SPEC.md (generated from codebase — N capabilities)` for single-file format, or
- `✓ docs/specs/ (generated from codebase — N capabilities)` for multi-file format

If source code was detected in Step 1b, also print:

```
Tip: Run /analyze-architecture for detailed architecture docs. Use /propose-spec to add or refine feature specifications.
```
