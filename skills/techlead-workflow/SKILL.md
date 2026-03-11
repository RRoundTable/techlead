---
name: techlead-workflow
description: Internal routing table for techlead skills. Injected at session start via SessionStart hook. Not registered in plugin.json.
---

# Techlead Workflow

Techlead enforces project discipline through a document hierarchy and skill routing.

## Document Hierarchy

```
GOAL.md → ROADMAP.md → SPEC.md → ARCHITECTURE.md
```

- **GOAL.md** — single project goal, the root constraint
- **ROADMAP.md** — milestones (Now / Next / Later), scoped to GOAL.md
- **SPEC.md** — feature behaviors as Given/When/Then, scoped to ROADMAP.md
- **ARCHITECTURE.md** — system structure and ADRs, implements SPEC.md

## Skill Routing

### Automatic (trigger without user asking)

| Condition | Skill |
|-----------|-------|
| Code design trade-offs, over-engineering, YAGNI, pragmatic dev questions; project has GOAL.md/ROADMAP.md/ARCHITECTURE.md | `techlead-persona` |
| Before any code write/edit; implementing features, fixing bugs, refactoring | `check-alignment` |
| Committing, pushing, finalizing code; TODO/FIXME, cross-feature imports, coupling | `verify-code-quality` |

### User-invoked (explicit request or /command)

| Condition | Skill |
|-----------|-------|
| `/init-techlead`, set up project governance, GOAL.md missing | `init-techlead` |
| `/propose-architecture`, choose between technologies, "which X should I use?", compare A vs B | `propose-architecture` |
| `/propose-spec`, define feature behavior, acceptance criteria, "how should X behave?" | `propose-spec` |
| `/read-history`, look up past decisions, "why did we choose X?" | `read-history` |
| Scan existing codebase to produce ARCHITECTURE.md, reverse-engineer project structure | `analyze-architecture` |

## Key Principles

1. **Single Goal** — every task must trace back to GOAL.md
2. **YAGNI** — don't build what isn't needed now
3. **Context-Aware** — read the docs before deciding
4. **High Cohesion / Low Coupling** — features own their code
5. **Fail Fast** — surface errors immediately, no silent swallowing
