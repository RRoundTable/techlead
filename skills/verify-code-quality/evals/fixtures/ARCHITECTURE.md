# Architecture

## Tech Stack
| Layer | Choice | ADR |
|-------|--------|-----|
| Language | Node.js | — |
| Framework | Express | — |
| Database | PostgreSQL | — |
| Testing | Jest | — |

## Module Structure
```
src/
├── core/          # Domain logic, no external dependencies
├── features/      # Feature modules (isolated — no cross-imports)
├── infra/         # External service adapters
└── shared/        # Truly shared utilities
```

## Import Rules
- features/* → can import from core/, shared/, infra/
- features/A → CANNOT import from features/B
- core/ → cannot import from features/ or infra/
- shared/ → cannot import from features/, core/, or infra/

## Key Patterns
(None yet — patterns are added via `/propose-architecture`)

## Constraints
- All API responses follow consistent JSON envelope format
