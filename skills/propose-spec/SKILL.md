---
name: propose-spec
description: >
  Workflow for defining or updating feature specifications as user-observable behaviors.
  Use when the user types /propose-spec, wants to define what a feature should do, needs to
  write acceptance criteria, or is planning a new capability before implementation. Also trigger
  when the user asks "what should this feature do?", "how should X behave?", "define
  acceptance criteria for Y", or "what are the expected behaviors for Z?". Do NOT trigger for
  architecture/technology questions (use propose-architecture) or implementation tasks (use
  check-alignment).
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

These belong in ARCHITECTURE.md, not SPEC.md.

## Step 1: Gather Context

Before defining behaviors, ground yourself in the project's current state:

1. Read `GOAL.md` — the capability must serve the project goal.
   If the capability is listed in GOAL.md's "Out of Scope", **flag the conflict
   to the user before proceeding**. The user may need to update the goal first.
2. Read `ROADMAP.md` — note which milestone this capability falls under.
   This is informational (specs can be written ahead of implementation), but mention it.
3. Read `SPEC.md` if it exists — is this a new capability or an update to an existing one?
   If updating, load the existing behaviors and acceptance criteria.
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

## Step 3: Record

Once approved:

1. Determine next spec number: count existing tags via `git tag -l "spec/*"`.
2. Derive slug from capability name (lowercase, hyphens).
3. Save current branch: `starting_branch=$(git branch --show-current)`
4. `git checkout -b spec/NNN-slug`
5. Update `SPEC.md`:
   - If new capability: add the capability section under `## Capabilities`
   - If updating: modify the existing capability section
   - If new invariants: add under `## Invariants`
6. `git add SPEC.md`
7. `git commit` with spec record template as message (read `templates/spec-record-template.md` for format).
   Set `Change type` to `added`, `changed`, or `removed` as appropriate.
8. `git checkout $starting_branch`
9. `git merge --no-ff spec/NNN-slug -m "Merge SPEC-NNN: Title"`
10. `git tag spec/NNN-slug spec/NNN-slug` — tag the branch tip for permanent discovery.
11. `git branch -d spec/NNN-slug` — delete the branch (tag preserves it).

## After Spec is Defined

When the capability is ready to implement:
1. Ensure the capability is in ROADMAP.md's "Now" section.
2. Use the acceptance criteria as a checklist during implementation.
3. Run `/propose-architecture` if the capability requires new technology decisions.
