---
name: restructure-docs
description: >
  Migrate existing project documentation files into Techlead's canonical docs/ structure.
  Only trigger when the user explicitly asks to restructure, reorganize, migrate, or
  convert their existing documentation files into the canonical format. Trigger phrases:
  /restructure-docs, "migrate my docs", "restructure documentation", "convert docs to
  techlead format", "reorganize my docs folder", "classify and restructure my docs".
  The request must be about file-level reorganization of existing documents — moving,
  renaming, reformatting, or classifying documentation files. Do NOT trigger for writing
  new specs, defining feature behavior, checking alignment, setting up governance from
  scratch, committing code, scanning codebases, choosing technologies, implementing
  features, fixing bugs, or reading past decisions.
---

# /restructure-docs

Scan existing project documentation, classify content, and restructure into Techlead's canonical format. This is the brownfield migration path — use `/init-techlead` for greenfield setup.

## Usage

```
/restructure-docs
```

Also activates for "migrate my docs to techlead format", "restructure my documentation",
or "I have existing docs and want to use techlead".

## Step 1: Scan

Read all files in `docs/` (up to 2 levels deep) plus root-level docs (`README.md`, `CONTRIBUTING.md`, etc.). Sample the first 50 lines per file to understand content.

If `docs/` doesn't exist, check for root-level documentation files. If nothing found:
> No existing documentation found. Use `/init-techlead` to set up from scratch.

## Step 2: Classify

Map each file's content to one of these categories:

| Category | Signals |
|----------|---------|
| Goal | project purpose, mission, objectives, scope, non-goals |
| Roadmap | priorities, milestones, phases, TODOs, timelines |
| Spec | requirements, user stories, acceptance criteria, behaviors |
| Architecture | tech stack, system design, diagrams, API docs, DB schemas |
| Supplementary | getting started, contributing, tutorials, changelogs |

A file may contain content spanning multiple categories. In that case, note the primary category and which sections map elsewhere.

## Step 3: Present Migration Plan

Show a migration table and ask the user to confirm:

```
Migration Plan:
  Source                    → Target                    Category
  ─────────────────────────────────────────────────────────────────
  docs/project-overview.md  → docs/GOAL.md              Goal
  docs/phases.md            → docs/ROADMAP.md           Roadmap
  docs/requirements.md      → docs/SPEC.md              Spec
  docs/tech-stack.md        → docs/ARCHITECTURE.md      Architecture
  docs/getting-started.md   → docs/reference/           Supplementary
  README.md (§Architecture) → docs/ARCHITECTURE.md      Architecture

  Format decisions:
  - Spec: single file (2 capabilities detected)
  - Architecture: multi-file (5 layers detected → docs/architecture/)
```

**Threshold for multi-file:**
- **Specs**: 4+ capabilities or any single capability needs >30 lines of behaviors → use `docs/specs/`
- **Architecture**: 4+ layers or any single layer needs >50 lines → use `docs/architecture/`

Ask:
> Does this migration plan look right? Any files I should reclassify or skip?

## Step 4: Migrate

Extract content from source files and rewrite into the canonical structure. Apply format conversions:

| Source Format | Target Format |
|---------------|---------------|
| User stories ("As a user, I want...") | Given/When/Then behaviors |
| Phase 1/2/3 or Q1/Q2/Q3 | Now/Next/Later milestones |
| Tech descriptions, stack lists | Tech Stack table (Layer / Choice / Version) |
| Project purpose, mission statement | Goal + Success Criteria + Out of Scope |

**Preserve the user's terminology.** Don't rename their domain concepts — only restructure the format.

### Single-file spec (`docs/SPEC.md`)

Use the template from `templates/SPEC.md.template`. Add each detected capability with its behaviors and acceptance criteria.

### Multi-file specs (`docs/specs/`)

```
docs/specs/
├── README.md               # Capability index + invariants
├── <capability-slug>.md    # Per-capability spec
└── ...
```

`README.md` contains the capability index (list of capabilities with one-line summaries and links to per-capability files) and the `## Invariants` section. Each per-capability file contains the full capability spec (statement, behaviors, acceptance criteria).

### Architecture

Follow the same single/multi-file pattern already used by `analyze-architecture`.

## Step 5: Handle Supplementary

Move unmapped files to `docs/reference/`, preserving their original filenames. If `docs/reference/` doesn't exist, create it.

Files that are clearly obsolete or empty can be flagged:
> These files appear outdated or empty. Skip them? [list]

## Step 6: Confirm

Print a summary:

```
Restructured docs/:
  ✓ docs/GOAL.md             (from project-overview.md)
  ✓ docs/ROADMAP.md          (from phases.md)
  ✓ docs/SPEC.md             (from requirements.md — 3 capabilities)
  ✓ docs/ARCHITECTURE.md     (from tech-stack.md + README.md §Architecture)
  ✓ docs/reference/           (1 supplementary file moved)

Original files have been replaced. Use git to review changes.
Tip: Run /propose-spec to refine any capabilities that need more detail.
```

## Constraints

- Does NOT create ADRs, spec records, or git tags — this is a structural migration, not a governance action
- Does NOT delete source files without user confirmation
- Does NOT modify files outside `docs/` and root-level doc files
- If `docs/GOAL.md` already exists in canonical format, skip it (don't overwrite governance docs that are already correct)
- Preserves git history by modifying in place rather than delete+recreate where possible
