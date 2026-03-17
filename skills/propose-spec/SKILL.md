---
name: propose-spec
description: >
  Trigger when defining, updating, or removing feature behavior in docs/SPEC.md:
  writing acceptance criteria, adding/changing/removing behaviors, planning capabilities
  before implementation, or discussing what a feature should do from the user's perspective.
  Trigger phrases include: "what should this feature do?", "how should X behave?",
  "update the spec for X", "add a behavior for Y", "remove the Z capability",
  "change the acceptance criteria", "define the spec", "what are the edge cases for X?".
  Specs describe outcomes, not implementation — if the user describes behavior in terms of
  API endpoints or database schemas, this skill reframes as user-observable outcomes.
  NOT for architecture decisions, implementation tasks, code changes, or reading history.
---

# /propose-spec

A structured workflow for defining feature specifications as user-observable behaviors:
gather context, define behaviors as outcomes, and record the spec change.

## Usage

```
/propose-spec <capability>
```

Example: `/propose-spec "User authentication"` or `/propose-spec "Team workspace invitations"`

Also activates automatically for questions like "What should this feature do?",
"How should login behave?", or "Define acceptance criteria for task deletion."

## Scope: Documentation Only

This skill edits **only** `docs/GOAL.md`, `docs/ROADMAP.md`, `docs/SPEC.md` (or `docs/specs/`).
It must **never** create or modify source code, tests, configuration files, or any file outside `docs/`.
If the user asks for implementation alongside the spec, defer implementation to a separate step after the spec is recorded.

## Core Principle: Outcomes, Not Outputs

Specs describe **what a user can observe**, not how the system implements it.

**Good:** "Given an expired token, when it is used, then the user is prompted to re-authenticate"
**Bad:** "The /api/auth/refresh endpoint returns 401 with a JSON body containing error code TOKEN_EXPIRED"

If the user provides implementation-level details, reframe them as observable behaviors.
Ask: "What does the user see/experience?" not "What does the API return?"

### Anti-patterns to Reject

Do NOT include in specs:
- API paths, HTTP methods, or status codes
- Function names, class names, or module structure
- Database schemas, column names, or query patterns
- Internal data flow or service-to-service calls

These belong in docs/ARCHITECTURE.md, not docs/SPEC.md.

## Step 1: Gather Context

Before defining behaviors, ground yourself in the project's current state:

1. Read `docs/GOAL.md` — the capability must serve the project goal.
   If the capability is listed in docs/GOAL.md's "Out of Scope", **flag the conflict
   to the user before proceeding**. The user may need to update the goal first.
2. Read `docs/ROADMAP.md` — note which milestone this capability falls under.
   This is informational (specs can be written ahead of implementation), but mention it.
3. Locate spec docs: check `docs/specs/README.md` first — if it exists, the project uses **multi-file specs** (`docs/specs/`). Otherwise, use `docs/SPEC.md`.
   - **Single-file** (`docs/SPEC.md`): read it directly.
   - **Multi-file** (`docs/specs/`): read `README.md` for the capability index and invariants, then read the per-capability file if updating an existing capability.
   - Is this a new capability or an update to an existing one? If updating, load the existing behaviors and acceptance criteria.
   - **How to decide:** If the user says "update X to add Y" or the new behavior extends an existing capability's scope (e.g., adding archiving to CRUD), it's an **update** — modify the existing section. Only create a new capability section when the behavior is genuinely independent (different actor, different resource, no shared invariants).
4. List spec tags (`git tag -l "spec/*"`); read relevant ones via `git log <tag> --format="%B" -1`.
   Past spec changes carry context — understand the evolution before making changes.
5. Briefly summarize the relevant context to the user — keep it to 3-5 lines max.

## Step 2: Define Behaviors

Work with the user to write the capability specification:

### 2a. Capability Statement

Write a one-sentence summary of what the user can do:
> "A user can [verb] [outcome]."

### 2b. Given/When/Then Behaviors

For each key scenario, write a behavior:
> Given [precondition], when [action], then [observable outcome]

Cover:
- **Happy path** — the main success scenario
- **Edge cases** — boundary conditions, empty states
- **Error cases** — what happens when things go wrong (from the user's perspective)

**Explicitly reject implementation language.** If you catch yourself writing HTTP status codes,
function names, or database operations, reframe as user-observable outcomes.

### 2c. Acceptance Criteria

Derive checkable criteria from the behaviors. Each criterion should be:
- Observable without reading code
- Testable by a person using the system
- Binary (done or not done)

### 2d. Invariants

Identify any system-wide rules this capability introduces or affects:
- Security boundaries (who can never do what)
- Data integrity rules (what must always be true)
- Cross-capability constraints (if X then always Y)

Present the complete spec to the user:

```markdown
### [Capability Name]
[One-sentence capability statement]

**Behaviors:**
- Given ..., when ..., then ...

**Acceptance criteria:**
- [ ] ...

**Invariants** (if any):
- ...
```

Ask:
> Does this capture the intended behavior? Want to adjust any behaviors or add edge cases?

## Step 3: Enter Plan Mode

Once approved — skip this step for casual questions (quick behavioral questions, "what should X do?"
queries, or questions where the user doesn't mention formal records, spec tags, or recording):

Enter plan mode (via `EnterPlanMode` tool) and build the full cycle plan there.
The plan must be **self-contained** — when `/plan` starts, it has no memory of the prior
conversation. Include everything needed to execute the entire workflow:

```markdown
## Full Cycle Plan: [Capability Name]

### Context
[Paste the context summary from Step 1 — project goal, roadmap milestone, current spec state,
relevant spec tags. This is critical: /plan has no prior context.]

### Spec
SPEC-NNN: [capability] — [one-sentence capability statement]

**Behaviors:**
[Paste the complete Given/When/Then behaviors from Step 2]

**Acceptance criteria:**
[Paste from Step 2]

**Invariants** (if any):
[Paste from Step 2]

### Architecture Decisions Needed
- [If any new technology decisions are needed, list them here — each requires `/propose-architecture`]
- None — uses existing stack [if no new decisions needed]

### Branch
`spec/NNN-slug` — holds the spec documentation commit.

### Steps
1. `git checkout -b spec/NNN-slug`
2. Update docs/SPEC.md (or docs/specs/) — add capability section with behaviors and acceptance criteria
3. `git add` the updated spec file(s)
4. `git commit` with spec record template message (read `templates/spec-record-template.md` for format)
5. `git checkout <starting-branch> && git merge --no-ff spec/NNN-slug -m "Merge SPEC-NNN: Title"`
6. `git tag spec/NNN-slug spec/NNN-slug && git branch -d spec/NNN-slug`

### Acceptance Criteria
- [ ] [From the spec — each criterion maps to a testable behavior]
- [ ] docs/SPEC.md reflects the new capability
- [ ] Spec tag `spec/NNN-slug` exists and is discoverable via `git tag -l "spec/*"`
```

If the plan includes architecture decisions, those should be resolved via `/propose-architecture`
before implementation begins.

### Branch Workflow

The `spec/NNN-slug` branch contains the spec documentation commit:

1. Determine next spec number: count existing tags via `git tag -l "spec/*"`.
2. Derive slug from capability name (lowercase, hyphens).
3. Save current branch: `starting_branch=$(git branch --show-current)`
4. `git checkout -b spec/NNN-slug`
5. Update spec docs based on current format:

   **Single-file** (`docs/SPEC.md`):
   - If new capability: add the capability section under `## Capabilities`
   - If updating: modify the existing capability section
   - If new invariants: add under `## Invariants`

   **Multi-file** (`docs/specs/`):
   - If new capability: create `docs/specs/<capability-slug>.md` with the capability section, and add an entry to the index in `docs/specs/README.md`
   - If updating: modify the existing per-capability file `docs/specs/<capability-slug>.md`
   - If new invariants: add under `## Invariants` in `docs/specs/README.md`

   **Threshold for switching to multi-file**: If the project uses single-file and now has 4+ capabilities or any single capability needs >30 lines of behaviors, suggest converting to `docs/specs/` format. Do not convert automatically — ask the user first.

6. `git add docs/SPEC.md` or `git add docs/specs/`
7. `git commit` with spec record template as message (read `templates/spec-record-template.md` for format).
   Set `Change type` to `added`, `changed`, or `removed` as appropriate.
8. `git checkout $starting_branch`
9. `git merge --no-ff spec/NNN-slug -m "Merge SPEC-NNN: Title"`
10. `git tag spec/NNN-slug spec/NNN-slug` — tag the branch tip for permanent discovery.
11. `git branch -d spec/NNN-slug` — delete the branch (tag preserves it).

The tag captures the spec record commit.

## Step 4: Propose Architecture

After the spec is recorded (or after the plan is created), ask the user:

> The spec is recorded. Would you like to run `/propose-architecture` to define how this capability should be implemented?

If the plan listed architecture decisions needed, emphasize this:

> This spec requires architecture decisions (listed above). Want to run `/propose-architecture` to resolve them?

Do not run `/propose-architecture` automatically — always ask first.
