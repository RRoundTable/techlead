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

### 1. Scope the Decision

Identify:
- Decision category (database, framework, pattern, library, infra, etc.)
- Non-negotiable constraints from the project context
- How existing ADRs narrow the options

### 2. Analyze the Codebase

- Scan for relevant patterns, dependencies, and conventions already in use
- Note the project's scale and maturity — don't recommend enterprise tooling for a prototype

### 3. Research Options

Use web search to find:
- Current best practices for this category
- Benchmarks (performance, bundle size, maintenance burden)
- Known pain points and migration stories
- Community health (last release, open issues, bus factor)

### 4. Build Trade-off Matrix

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

### 5. Recommend

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
