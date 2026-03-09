---
name: propose-architecture
description: >
  4-step workflow for making architectural decisions with trade-off analysis. Use when the user
  types /propose-architecture, needs to choose between technologies, wants to add a new dependency,
  or faces any architectural question that deserves structured analysis and an ADR.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Agent, WebSearch, WebFetch
---

# /propose-architecture

A structured workflow for architectural decisions: gather context, research options, propose
a recommendation, and record the decision in an ADR.

## Usage

```
/propose-architecture <topic>
```

Example: `/propose-architecture "Database selection for user data"`

## Step 1: Gather Context

1. Read `GOAL.md`, `ARCHITECTURE.md`, and `docs/adr/000-index.md`.
2. Scan existing ADRs for related decisions.
3. Briefly summarize the relevant context to the user — keep it to 3-5 lines max.

## Step 2: Research Trade-offs

Use the `architecture-researcher` skill to analyze options:
- Consider the topic, project context, tech stack constraints, and related ADR summaries.
- Research options and build a trade-off matrix.

Present the matrix to the user.

## Step 3: Propose Decision

Recommend **one option** as the best fit for THIS project. Not the best in general — the best
given the specific goal, constraints, and current state.

Be explicit about what trade-offs are being accepted. Then ask:
> Do you accept this recommendation, want to discuss further, or prefer a different option?

## Step 4: Record ADR

Once approved:

1. Read `docs/adr/000-index.md` to determine the next ADR number.
2. Create `docs/adr/NNN-[slug].md` from `templates/adr-template.md`.
   Fill in: Status (Accepted), Context, Options Considered, Decision, Consequences.
3. Add a row to `docs/adr/000-index.md`.
4. If the decision affects `ARCHITECTURE.md` (new stack entry, new pattern, new constraint),
   update it.

## After Implementation

When the decision is implemented in code:
1. Update the ADR status from "Accepted" to "Implemented".
2. Update `ARCHITECTURE.md` if needed.
