# Techlead

A Claude Code plugin that acts as a strict, pragmatic senior developer — enforcing project discipline through 5 core philosophies.

## What It Does

Techlead automatically checks your work against five principles:

1. **Single Goal** — Every project has one goal (`GOAL.md`). Code that doesn't serve it gets questioned.
2. **YAGNI** — No speculative abstractions. Write the simplest thing that works.
3. **Context-Aware Decisions** — Every architectural choice is recorded in an ADR with project-specific reasoning.
4. **High Cohesion / Low Coupling** — Feature modules don't import each other. Cross-cutting logic goes through `core/`.
5. **Fail Fast** — No `TODO`/`FIXME`/`HACK` in committed code. Errors are handled, not swallowed.

## Installation

```bash
claude plugin add /path/to/techlead
```

Or use the plugin directory flag:

```bash
claude --plugin-dir /path/to/techlead
```

## Quick Start

After installing, run the init command in any project:

```
/init-techlead
```

This creates:

```
your-project/
├── GOAL.md              # Single project goal + success criteria
├── ROADMAP.md           # Now / Next / Later milestones
├── ARCHITECTURE.md      # Tech stack, module structure, import rules
├── CLAUDE.md            # Updated with Techlead rules
└── docs/
    └── adr/
        └── 000-index.md # ADR index table
```

From that point on, Techlead is active. It checks alignment before code changes and verifies quality before commits.

## Commands

### `/init-techlead`

Bootstrap a project with Techlead's document hierarchy. Asks for your goal, priorities, and tech stack in a single prompt, then generates all project documents.

### `/propose-architecture <topic>`

Structured workflow for architectural decisions:

1. Gathers project context (goal, stack, existing ADRs)
2. Researches trade-offs via the architecture-researcher agent
3. Recommends one option with rationale specific to your project
4. Records the decision as an ADR

```
/propose-architecture "State management approach"
```

### `/read-history [number|keyword]`

Search and display Architecture Decision Records.

```
/read-history              # List all ADRs
/read-history 3            # Show ADR #3
/read-history database     # Search ADRs for "database"
```

## How It Works

### Skills (automatic)

| Skill | When | What |
|-------|------|------|
| **techlead-persona** | Always active | Sets the pragmatic senior developer tone and philosophy |
| **check-alignment** | Before writing/editing code | Verifies the task matches GOAL.md and is in ROADMAP.md's "Now" section |
| **verify-code-quality** | Before commits | Checks code against all 5 philosophies |

### Hooks

A `PreToolUse` hook fires before every `Write` or `Edit` tool call, prompting Claude to verify alignment with GOAL.md and ROADMAP.md before making changes.

### Agent

The **architecture-researcher** agent is used by `/propose-architecture` to perform web research and codebase analysis, producing a trade-off matrix for architectural decisions.

## Document Hierarchy

Techlead uses a layered document system, read in priority order:

```
GOAL.md          →  What we're building and what's out of scope
ROADMAP.md       →  What to work on now vs. later
ARCHITECTURE.md  →  How the system is structured
docs/adr/        →  Why specific decisions were made
```

The key rule: **only items in ROADMAP.md's "Now" section get worked on.** Everything else waits.

## Project Structure

```
techlead/
├── .claude-plugin/
│   └── plugin.json                  # Plugin metadata
├── skills/
│   ├── techlead-persona/SKILL.md    # Core persona + philosophies
│   ├── check-alignment/SKILL.md     # Goal/roadmap alignment gate
│   └── verify-code-quality/SKILL.md # Code quality verification
├── commands/
│   ├── init-techlead.md             # Project bootstrapping
│   ├── propose-architecture.md      # Architectural decision workflow
│   └── read-history.md              # ADR lookup
├── agents/
│   └── architecture-researcher.md   # Trade-off research agent
├── hooks/
│   └── hooks.json                   # Pre-write alignment check
└── templates/
    ├── CLAUDE.md.template
    ├── GOAL.md.template
    ├── ROADMAP.md.template
    ├── ARCHITECTURE.md.template
    ├── adr-template.md
    └── adr-index-template.md
```

## License

MIT
