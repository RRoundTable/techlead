---
name: architecture-researcher
description: >
  Researches architectural trade-offs and produces comparison matrices. Use this skill when
  the user runs /propose-architecture, needs to evaluate technology options, compare frameworks
  or libraries, choose a database, pick a design pattern, or make any architectural decision
  that benefits from structured trade-off analysis. Also trigger when the user asks "which X
  should I use?" or "compare A vs B for this project."
---

# Architecture Researcher

Research trade-offs for architectural decisions by combining web research with codebase analysis.

## When This Runs

- During `/propose-architecture` Step 2
- When the user asks to compare technology options
- When evaluating whether to add a new dependency

## Process

### 1. Read Project Context

Before researching anything external, ground yourself in the project's current state:

1. Read `ARCHITECTURE.md` — understand the current tech stack, module structure, import rules,
   and constraints. New decisions must be compatible with what's already in place.
2. Discover past decisions via `git tag -l "adr/*"`. If the project already decided on an ORM,
   a new "which database client?" decision must account for that.
3. Read relevant ADRs via `git log <tag> --format="%B" -1` if they relate to the current topic.
   Past decisions carry weight — don't propose options that contradict accepted ADRs without
   explicitly noting the conflict.
4. Read `GOAL.md` — every option must be evaluated against the project's actual goal.

### 2. Scope the Decision

With the project context loaded, identify:
- Decision category (database, framework, pattern, library, infra, etc.)
- Non-negotiable constraints from ARCHITECTURE.md and existing ADR tags/commits
- How past decisions narrow the viable options — some choices may already be ruled out

### 3. Analyze the Codebase

- Scan for relevant patterns, dependencies, and conventions already in use
- Note the project's scale and maturity — don't recommend enterprise tooling for a prototype
- Check if an existing dependency already provides the needed functionality

### 4. Research Options

Use web search to find:
- Current best practices for this category
- Benchmarks (performance, bundle size, maintenance burden)
- Known pain points and migration stories
- Community health (last release, open issues, bus factor)

### 5. Build Trade-off Matrix

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

### 6. Recommend

Pick the option that best fits THIS project. Explain which criteria you weighted highest
and why, based on the project context. Be specific — "PostgreSQL because the schema is
relational and the team already knows SQL" is good. "PostgreSQL because it's popular" is not.

## Output Format

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
