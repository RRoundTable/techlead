---
name: techlead-workflow
description: Internal routing table for techlead skills. Injected at session start via SessionStart hook. Not registered in plugin.json.
---

# Techlead Workflow

Techlead enforces project discipline through a document hierarchy and skill routing.

## Document Hierarchy

```
docs/GOAL.md → docs/ROADMAP.md → docs/SPEC.md → docs/ARCHITECTURE.md
```

- **docs/GOAL.md** — single project goal, the root constraint
- **docs/ROADMAP.md** — milestones (Now / Next / Later), scoped to GOAL.md
- **docs/SPEC.md** — feature behaviors as Given/When/Then, scoped to ROADMAP.md
- **docs/ARCHITECTURE.md** — system structure and ADRs, implements SPEC.md

### Canonical docs/ Structure

Spec and architecture support both single-file and multi-file formats:

```
docs/
├── GOAL.md
├── ROADMAP.md
│
├── SPEC.md                     — single file (few capabilities), OR:
├── specs/                      — multi-file (4+ capabilities or any >30 lines)
│   ├── README.md               # Capability index + invariants
│   ├── user-authentication.md  # Per-capability spec
│   └── task-management.md
│
├── ARCHITECTURE.md             — single file (≤3 layers), OR:
├── architecture/               — multi-file (4+ layers, already supported)
│   ├── README.md
│   └── api.md
│
└── reference/                  — supplementary docs (preserved during migration)
```

**Resolution order:** Use `docs/specs/README.md` if it exists, else `docs/SPEC.md`. Same for architecture: `docs/architecture/README.md` else `docs/ARCHITECTURE.md`.

## Skill Routing

### Automatic (trigger without user asking)

| Condition | Skill |
|-----------|-------|
| Code design trade-offs, over-engineering, YAGNI, pragmatic dev questions; project has docs/GOAL.md/docs/ROADMAP.md/docs/ARCHITECTURE.md | `techlead-persona` |
| Before any code write/edit; implementing features, fixing bugs, refactoring | `check-alignment` |
| Committing, pushing, finalizing code; TODO/FIXME, cross-feature imports, coupling | `verify-code-quality` |

### User-invoked (explicit request or /command)

| Condition | Skill |
|-----------|-------|
| `/init-techlead`, set up project governance, docs/GOAL.md missing | `init-techlead` |
| `/propose-architecture`, choose between technologies, "which X should I use?", compare A vs B | `propose-architecture` |
| `/propose-spec`, define feature behavior, acceptance criteria, "how should X behave?" | `propose-spec` |
| `/read-history`, look up past decisions, "why did we choose X?" | `read-history` |
| Scan existing codebase to produce docs/ARCHITECTURE.md, reverse-engineer project structure | `analyze-architecture` |
| `/restructure-docs`, migrate existing docs to canonical format, brownfield project docs | `restructure-docs` |

## Key Principles

1. **Single Goal** — every task must trace back to docs/GOAL.md
2. **YAGNI** — don't build what isn't needed now
3. **Context-Aware** — read the docs before deciding
4. **High Cohesion / Low Coupling** — features own their code
5. **Fail Fast** — surface errors immediately, no silent swallowing
