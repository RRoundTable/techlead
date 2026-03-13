# Architecture

## Tech Stack
- Runtime: Node.js 20
- Framework: Express 4.x
- Database: PostgreSQL 16
- ORM: Prisma 5.x
- Auth: JWT (jsonwebtoken)

## Layers
- `src/routes/` — HTTP route handlers
- `src/services/` — Business logic
- `src/models/` — Prisma schema and database access

## Constraints
- No external caching layer — database handles all persistence
- Stateless API — no server-side sessions
