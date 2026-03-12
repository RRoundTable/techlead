# Techlead User Guide

## Getting Started

### 1. Install the Plugin

```bash
claude plugin add /path/to/techlead
```

### 2. Initialize Your Project

Navigate to your project and run:

```
/init-techlead
```

You'll be asked five questions in a single prompt:

1. **Project goal** — One sentence describing what you're building
2. **Success criteria** — 2-3 measurable outcomes that define "done"
3. **Out of scope** — What this project explicitly won't do
4. **Current priorities** — 1-3 items to work on right now
5. **Tech stack** — Language, framework, database, testing tool

Techlead generates `docs/GOAL.md`, `docs/ROADMAP.md`, `docs/SPEC.md`, `docs/ARCHITECTURE.md`, and updates `CLAUDE.md`.

### 3. Start Coding

That's it. Techlead is now active. It will:

- Check alignment with your goal before writing code
- Verify code quality before commits
- Flag cross-feature imports, undocumented dependencies, and deferred problems

---

## Daily Workflow

### Writing Code

When you ask Claude to write or modify code, Techlead automatically:

1. Reads `docs/GOAL.md` and `docs/ROADMAP.md`
2. Checks if the request aligns with the goal
3. Checks if the request is in the "Now" milestone
4. If aligned — proceeds silently (no announcement)
5. If misaligned — stops and asks you to clarify or reprioritize

### Defining Feature Specs

Before building a feature, define what it should do from the user's perspective:

```
/propose-spec "User authentication"
```

This runs a 3-step workflow:
1. **Context** — Reads your goal, roadmap, and existing specs
2. **Define Behaviors** — Writes Given/When/Then outcomes, acceptance criteria, and invariants
3. **Record** — Creates a git-based spec record (branch, commit, tag) and updates docs/SPEC.md

Specs describe **what a user can observe**, not implementation details:

**Good:** "Given an expired token, when it is used, then the user is prompted to re-authenticate"
**Bad:** "The /api/auth/refresh endpoint returns 401"

Spec records are stored as git commit messages on `spec/` branches, tagged for permanent discovery. Use `/read-history spec` to browse them.

### Making Architectural Decisions

When you need to choose a technology, pattern, or approach:

```
/propose-architecture "Which ORM to use"
```

This runs a 4-step workflow:
1. **Context** — Reads your goal, architecture, and existing ADR tags
2. **Research** — Searches for options and benchmarks
3. **Proposal** — Recommends one option with project-specific reasoning
4. **Record** — Creates a git-based ADR (branch, commit, tag) and updates architecture docs

ADRs are stored as git commit messages on dedicated `adr/` branches, tagged for permanent discovery. No ADR files — no file bloat.

### Reviewing Past Decisions

```
/read-history              # See all records (ADRs + specs)
/read-history adr          # List all ADRs
/read-history spec         # List all spec records
/read-history auth         # Search all records for "authentication"
/read-history 2            # Read ADR #2 in detail
/read-history spec 1       # Read spec record #1 in detail
```

Behind the scenes, `/read-history` uses `git tag -l "adr/*"` and `git tag -l "spec/*"` to discover records and `git log <tag> --format="%B" -1` to read them.

### Before Committing

Techlead runs a quality check against all 5 philosophies:

- Goal alignment and YAGNI violations
- Undocumented dependencies or patterns
- Cross-feature imports
- `TODO`/`FIXME`/`HACK` markers
- Unnecessary complexity

If violations are found, you'll get a specific report with file, line, and a suggested fix.

---

## Managing Your Documents

### Updating docs/GOAL.md

The goal should rarely change. If it does, update it directly — but consider whether you're pivoting the project or just refining scope.

### Updating docs/ROADMAP.md

Move items between sections as priorities shift:

- **Now** — Currently active work (keep this small: 1-3 items)
- **Next** — Planned after Now is complete
- **Later** — Ideas with no commitment

When you finish a Now item, check the box and promote something from Next.

### Updating docs/SPEC.md

This file evolves through `/propose-spec`. Each capability is defined as user-observable behaviors with Given/When/Then format, acceptance criteria, and invariants. docs/SPEC.md captures WHAT the system should do — it's the behavioral contract.

You can edit docs/SPEC.md directly for minor adjustments, but use `/propose-spec` for new capabilities or significant changes so they're recorded as spec records.

### Updating docs/ARCHITECTURE.md

This file evolves through ADRs. When `/propose-architecture` records a decision, it automatically updates the relevant sections. You can also edit it directly for minor adjustments.

---

## The 5 Philosophies in Practice

> For full definitions, rationale, and anti-patterns, see [The 5 Philosophies](philosophy.md).

### Single Goal

**What it means:** Every coding task must connect to `docs/GOAL.md`. If you can't draw a line from the task to the goal, either the task is wrong or the goal needs updating.

**In practice:** Techlead will ask "how does this connect to [your goal]?" if the link isn't obvious. This prevents scope creep and keeps the project focused.

### YAGNI

**What it means:** Don't build for hypothetical future needs. The simplest code that solves today's problem is the right code.

**In practice:** Techlead flags premature abstractions, unused parameters, feature flags for unplanned features, and unnecessary helper functions. Three similar lines of code are preferred over a premature abstraction.

### Context-Aware Decisions

**What it means:** No technology is adopted "because it's popular." Every choice needs a reason tied to THIS project.

**In practice:** Adding a new dependency or pattern? Techlead will ask for an ADR. Use `/propose-architecture` to research options and record the decision with its rationale.

### High Cohesion / Low Coupling

**What it means:** Feature modules are self-contained. `features/A` never imports from `features/B`.

**In practice:** Techlead scans import paths. Cross-feature imports are flagged immediately with a suggestion to refactor through `core/` or use an event-based approach.

**The import rules:**
```
features/* → can import from core/, shared/, infra/
features/A → CANNOT import from features/B
core/      → cannot import from features/ or infra/
shared/    → cannot import from features/, core/, or infra/
```

### Fail Fast

**What it means:** Don't defer problems. `TODO` comments rot. Swallowed errors become mysterious production bugs.

**In practice:** Techlead scans for `TODO`, `FIXME`, `HACK`, `XXX`, and `WORKAROUND` markers. If found, you must fix the issue now or create a tracked issue. Empty catch blocks and swallowed errors are also flagged.

---

## Customization

### Adapting the Module Structure

The default module structure (`core/`, `features/`, `infra/`, `shared/`) is a starting point. Edit `docs/ARCHITECTURE.md` to match your project's actual structure. The import rules are the important part — the directory names are flexible.

### Relaxing Rules

If a philosophy doesn't fit your project, you can:

1. Edit `CLAUDE.md` to note exceptions
2. Waive specific violations when Techlead flags them (it will ask)
3. Modify the skill files directly for permanent changes

### Adding Constraints

Add project-specific constraints to the "Constraints" section of `docs/ARCHITECTURE.md`. These are enforced alongside the 5 philosophies.
