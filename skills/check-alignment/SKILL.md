---
name: check-alignment
description: >
  Verifies task alignment with GOAL.md and ROADMAP.md before any code change. Use this skill
  automatically before writing or editing code, when the user asks to implement a feature,
  fix a bug, refactor code, or do any coding work. Also trigger when the user asks "should I
  work on X?" or discusses priorities. If the project has GOAL.md or ROADMAP.md, this check
  must happen before code touches disk.
---

# Check Alignment

Verify that the current task aligns with the project's goal and active roadmap before writing code.

## When This Runs

Before any code is written or modified. This is a gate — code does not get written until
alignment is confirmed.

## Procedure

### 1. Read Project Documents

Read `GOAL.md` and `ROADMAP.md` from the project root.

- If `GOAL.md` is missing: stop and say "No GOAL.md found. Run `/init-techlead` to set up
  your project documents first."
- If `ROADMAP.md` is missing: stop and say "No ROADMAP.md found. Run `/init-techlead` to
  set up your project documents first."

### 2. Check Alignment

Ask yourself two questions:
- Does this request directly contribute to the primary goal in GOAL.md?
- Is this request part of a **"Now"** item in ROADMAP.md?

**Both true → proceed silently.** Don't announce that alignment passed — just do the work.

**Goal-aligned but wrong milestone →** stop and ask:
> This task is in the **[Next/Later]** section of ROADMAP.md, not **Now**.
> Want to reprioritize it to Now before I proceed?

**Not goal-aligned →** stop and ask:
> I can't connect this to the project goal: **[goal text]**.
> Can you explain how it fits, or should we update GOAL.md?

### 3. Resolve

- If the user confirms alignment or explains the connection: proceed.
- If the user wants to reprioritize: update ROADMAP.md first, then proceed.
- If alignment can't be established: do not write code. Suggest what to do instead.

## Important

When alignment passes, don't waste the user's time announcing it. Just proceed with the task.
The value of this check is in catching misalignment, not in reporting success.
