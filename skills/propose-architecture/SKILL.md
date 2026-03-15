---
name: propose-architecture
description: >
  Trigger when facing any design decision that would affect docs/ARCHITECTURE.md:
  choosing between technologies or adding dependencies; API design decisions
  (endpoint structure, versioning, request/response shape); data model design
  (schema structure, relationships, normalization vs denormalization); module or
  directory structure decisions ("where should this code go?", "how should I
  organize this?"); integration patterns (how services or modules communicate);
  design pattern choices (repository pattern, service layer, middleware, etc.);
  adding a new service, layer, or module; introducing a new architectural pattern
  (event-driven, CQRS, microservices, etc.); or restructuring existing architecture.
  Also trigger for "which X should I use?", "compare A vs B", or any technology
  or design trade-off question.
---

# /propose-architecture

A structured workflow for architectural decisions: gather context, research options, propose
a recommendation, and record the decision as a git-based ADR.

## Usage

```
/propose-architecture <topic>
```

Example: `/propose-architecture "Database selection for user data"`

Also activates automatically for casual questions like "Which database should I use?" or
"Compare Next.js vs Remix for our frontend".

## Step 1: Gather Context

Before researching anything external, ground yourself in the project's current state:

1. Read `docs/GOAL.md` — every option must be evaluated against the project's actual goal.
   If the topic involves something listed in docs/GOAL.md's "Out of Scope", **flag the conflict
   to the user before proceeding**. The user may need to update the goal first.
2. Read `docs/architecture/README.md` if it exists, else `docs/ARCHITECTURE.md` — understand the current
   tech stack, module structure, import rules, and constraints. New decisions must be compatible
   with what's already in place. If the architecture docs or an existing ADR **already covers
   this exact decision**, note the existing choice. Do not treat it as a fresh decision —
   evaluate whether there is sufficient justification to revisit it.
3. List ADR tags (`git tag -l "adr/*"`); read relevant ones via `git log <tag> --format="%B" -1`.
   Past decisions carry weight — don't propose options that contradict accepted ADRs without
   explicitly noting the conflict.
4. Briefly summarize the relevant context to the user — keep it to 3-5 lines max.

## Step 2: Research Trade-offs

### Scope the Decision

With the project context loaded, identify:
- Decision category (database, framework, pattern, library, infra, etc.)
- Non-negotiable constraints from docs/ARCHITECTURE.md and existing ADR tags/commits
- How past decisions narrow the viable options — some choices may already be ruled out

### Analyze the Codebase

- Scan for relevant patterns, dependencies, and conventions already in use
- Note the project's scale and maturity — don't recommend enterprise tooling for a prototype
- Check if an existing dependency already provides the needed functionality

### Research Options

Use web search to find:
- Current best practices for this category
- Benchmarks (performance, bundle size, maintenance burden)
- Known pain points and migration stories
- Community health (last release, open issues, bus factor)

### Build Trade-off Matrix

Compare 2-4 viable options:

| Criteria | Option A | Option B | Option C |
|----------|----------|----------|----------|
| Goal alignment | High/Med/Low | ... | ... |
| Learning curve | ... | ... | ... |
| Performance | ... | ... | ... |
| Maintenance burden | ... | ... | ... |
| Community health | ... | ... | ... |
| Migration cost | ... | ... | ... |
| YAGNI risk | ... | ... | ... |

**YAGNI risk** is important — flag options that are over-powered for the current needs.

Present the matrix to the user.

## Step 3: Propose Decision

Recommend **exactly one option** as the best fit for THIS project. Not the best in general — the best
given the specific goal, constraints, and current state. You must commit to a single recommendation.
Do not hedge with "it depends" or present multiple options as equally valid — if the best choice
is context-dependent, state what context tips the scale and then pick the one that applies here.

Explain which criteria you weighted highest and why, based on the project context. Be specific —
"PostgreSQL because the schema is relational and the team already knows SQL" is good.
"PostgreSQL because it's popular" is not.

Be explicit about what trade-offs are being accepted. Then ask:
> Do you accept this recommendation, want to discuss further, or prefer a different option?

### Output Format

```markdown
## Research: [TOPIC]

### Context
[2-3 sentence recap]

### Trade-off Matrix
[the table]

### Recommendation
[Option] because: [reasoning tied to project context]

### Sources
- [source 1]
- [source 2]
```

## Step 4: Full Cycle Plan

Once approved — skip this step for casual questions (quick comparisons, "which would you pick?"
queries, or questions where the user doesn't mention formal decisions, ADRs, or recording):

Present a full cycle plan that covers the entire workflow from decision to implementation:

```markdown
## Full Cycle Plan: [TOPIC]

### Decision
ADR-NNN: [title] — [one-line summary of the chosen option and why]

### Branch
`adr/NNN-slug`

### Steps
1. Update docs/ARCHITECTURE.md — [what to add/change in Tech Stack, Key Patterns, or Constraints]
2. [Implementation step — e.g., Install dependency, create module, add configuration]
3. [Implementation step — e.g., Write feature code]
4. [Implementation step — e.g., Add tests]
5. ...

### Acceptance
- [ ] [How to verify the decision is correctly implemented]
- [ ] docs/ARCHITECTURE.md reflects the new decision
```

Ask:
> Ready to implement? Run `/plan` to execute this with a clean context.

### Branch Workflow

The `adr/NNN-slug` branch contains **both** the decision documentation and implementation code:

1. Determine next ADR number: count existing tags via `git tag -l "adr/*"`.
2. Derive slug from title (lowercase, hyphens).
3. Save current branch: `starting_branch=$(git branch --show-current)`
4. `git checkout -b adr/NNN-slug`
5. Update architecture docs if the decision affects Tech Stack, Key Patterns, or Constraints
   (use `docs/architecture/README.md` if it exists, else `docs/ARCHITECTURE.md`).
6. `git add` the updated architecture file.
7. `git commit` with ADR template as message (read `templates/adr-template.md` for format).
8. Implement the decision: code changes, tests, configuration — commit as needed on the same branch.
9. `git checkout $starting_branch`
10. `git merge --no-ff adr/NNN-slug -m "Merge ADR-NNN: Title"`
11. `git tag adr/NNN-slug adr/NNN-slug` — tag the branch tip for permanent discovery.
12. `git branch -d adr/NNN-slug` — delete the branch (tag preserves it).

The tag captures everything: the decision record (first commit message) and the implementation (subsequent commits).
