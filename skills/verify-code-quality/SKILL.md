---
name: verify-code-quality
description: >
  Checks code against Techlead's 5 core philosophies before committing or completing a task.
  Trigger this skill when the user asks to commit, when a coding task is finishing up, when
  reviewing code, or when the user asks about code quality. Also activate when you notice
  potential violations like cross-feature imports, TODO markers, unnecessary abstractions,
  or undocumented dependencies in the code being written.
---

# Verify Code Quality

Review code against the 5 Techlead philosophies before it ships.

## When This Runs

- Before committing code
- When a coding task is wrapping up
- When explicitly asked to review code quality

## Checks

Run through each category. Stop at the first violation — don't pile up a laundry list.
Fix the most important issue first, then re-check.

### Single Goal + YAGNI
- Does every changed file serve the current GOAL.md objective?
- Any speculative code? Unused parameters, premature abstractions, feature flags for
  unplanned features → flag it.
- Any new file or module that isn't strictly needed for this task → flag it.
- Can an abstraction be inlined? Three similar lines beat a premature helper function.

### Context-Aware Decisions
- New external dependency added? Check for a corresponding ADR in `docs/adr/`.
  If missing, tell the user to run `/propose-architecture` first.
- Could this dependency's functionality be implemented with the standard library
  in ~50 lines or less? If so, flag it — the dependency probably isn't worth it.
- New architectural pattern introduced? It needs an ADR.

### High Cohesion / Low Coupling
- Any import path matching `features/X` → `features/Y`? This is a violation.
  Suggest refactoring through `core/` or an event-based approach.
- New shared mutable state, global singletons, or circular dependencies → flag it.
- Is the module's public API minimal? Unexported internals should stay internal.

### Fail Fast
- Scan changed files for these markers: `TODO`, `FIXME`, `HACK`, `XXX`, `WORKAROUND`.
  If found:
  > Found `[MARKER]` at `[file]:[line]`. Fix it now or create a tracked issue —
  > deferred problems don't ship.
- Empty catch blocks or swallowed errors → flag it.
- Missing input validation at system boundaries (user input, API responses) → flag it.

### Complexity Cross-Check
- Does the diff touch more than 3 files for a simple task? Something might be wrong.
- Can you explain the implementation in one sentence? If not, it may be over-engineered.

## Output

**All clear:**
> Code quality check passed.

**Violation found:**
> **[Philosophy Name] violation**
> `[file]:[line]` — [what's wrong]
> Fix: [concrete suggestion]

Don't proceed with commit until violations are resolved or the user explicitly waives them.
