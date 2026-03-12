---
name: check-alignment
description: >
  Verifies task alignment with docs/GOAL.md, docs/ROADMAP.md, and docs/SPEC.md before any code change. Use this
  skill automatically before writing or editing code, when the user asks to implement a feature,
  fix a bug, refactor code, or do any coding work. Also trigger when the user asks "should I
  work on X?" or discusses priorities. If the project has docs/GOAL.md or docs/ROADMAP.md, this check
  must happen before code touches disk. Also checks docs/SPEC.md conformance if it exists.
---

# Check Alignment

Verify that the current task aligns with the project's goal and active roadmap before writing code.

## When This Runs

Before any code is written or modified. This is a gate — code does not get written until
alignment is confirmed.

## Procedure

### 1. Read Project Documents

Read `docs/GOAL.md` and `docs/ROADMAP.md`. For specs, use `docs/specs/README.md` if it exists, else `docs/SPEC.md`.

- If `docs/GOAL.md` is missing: stop and say "No docs/GOAL.md found. Run `/init-techlead` to set up
  your project documents first."
- If `docs/ROADMAP.md` is missing: stop and say "No docs/ROADMAP.md found. Run `/init-techlead` to
  set up your project documents first."
- If neither `docs/specs/README.md` nor `docs/SPEC.md` exists: that's fine — it's optional. Proceed without it.

### 2. Check Alignment

Ask yourself two questions:
- Does this request directly contribute to the primary goal in docs/GOAL.md?
- Is this request part of a **"Now"** item in docs/ROADMAP.md?

### 2b. Check Spec Conformance (if docs/SPEC.md exists)

If `docs/SPEC.md` exists and the task relates to a specified capability:
- Does the proposed code change align with the specified behaviors in docs/SPEC.md?
- If the code would contradict a specified behavior, flag it:
  > This change would diverge from docs/SPEC.md: **[capability]** specifies "[behavior]".
  > Should we update the spec first, or adjust the implementation?
- This is advisory, not a hard block — the user may have a valid reason to diverge.

**Both true → proceed silently.** Don't announce that alignment passed — just do the work.

**Goal-aligned but wrong milestone →** stop and ask:
> This task is in the **[Next/Later]** section of docs/ROADMAP.md, not **Now**.
> Want to reprioritize it to Now before I proceed?

**Not goal-aligned →** stop and ask:
> I can't connect this to the project goal: **[goal text]**.
> Can you explain how it fits, or should we update docs/GOAL.md?

### 3. Resolve

- If the user confirms alignment or explains the connection: proceed.
- If the user wants to reprioritize: update docs/ROADMAP.md first, then proceed.
- If alignment can't be established: do not write code. Suggest what to do instead.

## Important

When alignment passes, don't waste the user's time announcing it. Just proceed with the task.
The value of this check is in catching misalignment, not in reporting success.
