# Architecture

## Tech Stack
- **Runtime:** Node.js 20 + Express 4
- **Database:** PostgreSQL 15 (via pg driver)
- **Auth:** JWT (jsonwebtoken)
- **Testing:** Jest + Supertest

## Module Structure
```
src/
  features/
    auth/       # JWT auth (login, register, refresh)
    tasks/      # Task CRUD
    teams/      # Team membership + roles
  core/
    db.js       # pg pool, query helpers
    errors.js   # AppError class
  app.js        # Express setup, middleware
```

## Import Rules
- `features/A` must not import from `features/B`
- Shared logic goes through `core/`

## Constraints
- No ORM — raw SQL only (team decision: keep queries explicit and auditable)
- No external message queue yet — all operations are synchronous
- Single-process deployment; no distributed state
