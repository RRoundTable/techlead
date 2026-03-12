---
name: verify-code-quality
description: >
  Trigger when committing, pushing, merging, finalizing code, or reviewing code quality.
  Also trigger for specific violations: TODO/FIXME/HACK, cross-feature imports, coupling,
  undocumented deps, spec drift, empty catch blocks — even a single sub-check of these.
---

# Verify Code Quality

Review code against the 5 Techlead philosophies before it ships.

## When This Runs

- Before committing code
- When a coding task is wrapping up
- When explicitly asked to review code quality

## Checks

Before running checks, locate architecture docs: use `docs/architecture/README.md` if it exists, else `docs/ARCHITECTURE.md`. All references below apply equally.

Run through each category. Stop at the first violation — don't pile up a laundry list.
Fix the most important issue first, then re-check.

### Single Goal + YAGNI
- Does every changed file serve the current docs/GOAL.md objective?
- Any speculative code? Unused parameters, premature abstractions, feature flags for
  unplanned features → flag it.
- Any new file or module that isn't strictly needed for this task → flag it.
- Can an abstraction be inlined? Three similar lines beat a premature helper function.

### Context-Aware Decisions
- New external dependency added? Check for a corresponding ADR via `git tag -l "adr/*"`.
  If missing, tell the user to run `/propose-architecture` first
  (recorded as git commits with `adr/` tags).
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

### Spec Conformance
- If `docs/SPEC.md` exists, check: does this code implement behavior not described in docs/SPEC.md?
  If so, flag as potential spec drift:
  > **Spec drift**: `[file]:[line]` implements behavior not in docs/SPEC.md.
  > Either add the behavior to the spec via `/propose-spec` or remove the code.
- Does this code contradict any specified behaviors or invariants in docs/SPEC.md?
  If so, flag the contradiction.
- This check is advisory — docs/SPEC.md is optional and the user may choose to proceed.

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
