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
a recommendation, and record the decision as a git-based ADR.

## Usage

```
/propose-architecture <topic>
```

Example: `/propose-architecture "Database selection for user data"`

## Step 1: Gather Context

1. Read `GOAL.md` and `ARCHITECTURE.md`.
2. List ADR tags (`git tag -l "adr/*"`); read relevant ones via `git log <tag> --format="%B" -1`.
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

1. Determine next ADR number: count existing tags via `git tag -l "adr/*"`.
2. Derive slug from title (lowercase, hyphens).
3. Save current branch: `starting_branch=$(git branch --show-current)`
4. `git checkout -b adr/NNN-slug`
5. Update `ARCHITECTURE.md` if the decision affects Tech Stack, Key Patterns, or Constraints.
6. `git add ARCHITECTURE.md` (or use `git commit --allow-empty` if no ARCHITECTURE.md changes).
7. `git commit` with ADR template as message (read `templates/adr-template.md` for format).
8. `git checkout $starting_branch`
9. `git merge --no-ff adr/NNN-slug -m "Merge ADR-NNN: Title"`
10. `git tag adr/NNN-slug adr/NNN-slug` — tag the branch tip for permanent discovery.
11. `git branch -d adr/NNN-slug` — delete the branch (tag preserves it).

## After Implementation

When the decision is implemented in code:
1. Update `ARCHITECTURE.md` if needed.
