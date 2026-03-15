# Evaluation Results

**Date:** 2026-03-15
**Model:** Claude Opus 4.6

---

## Summary

| Skill | Trigger Accuracy | Behavioral (with) | Behavioral (without) | Delta |
|-------|------------------|--------------------|----------------------|-------|
| **techlead-workflow** | 19/20 (95%) | 20/20 (100%) | 0/20 (0%) | +100% |
| **check-alignment** | 20/20 (100%) | 9/9 (100%) | 2/9 (22%) | +78% |
| **verify-code-quality** | 20/20 (100%) | 12/12 (100%) | 0/12 (0%) | +100% |
| **propose-architecture** | 36/36 (100%) | 17/17 (100%) | 4/17 (24%) | +76% |
| **propose-spec** | pending (23 cases) | 10/10 (100%) | 4/10 (40%) | +60% |
| **analyze-architecture** | pending (24 cases) | 13/13 (100%) | 11/13 (85%) | +15% |
| **init-techlead** | pending (no trigger evals) | 14/14 (100%) | 5/14 (36%) | +64% |
| **restructure-docs** | pending (22 cases) | 15/16 (94%) | 7/16 (44%) | +50% |
| **read-history** | pending | — | — | — |
| **Total** | **95/96 (99%)** | **110/110 (100%)** | **32/110 (29%)** | **+71%** |

*Trigger evals pending for analyze-architecture, init-techlead, restructure-docs, propose-spec, read-history. Totals reflect last completed trigger runs.*

---

## Trigger Evals

### techlead-workflow — 19/20 (95%)

*Improved from 11/20 (55%) after description rewrite.*

| Result | Type | Query |
|--------|------|-------|
| PASS | trigger | Review this code for quality and best practices |
| PASS | trigger | Does this follow YAGNI or am I over-engineering? |
| PASS | trigger | Is this abstraction premature? I only have one use case right now |
| PASS | trigger | Should I add a generic EventEmitter pattern here for future extensibility? |
| PASS | trigger | I want to add error handling around this — is a try-catch with empty catch block fine? |
| PASS | trigger | This function is 50 lines — should I split it into smaller helpers? |
| PASS | trigger | Give me pragmatic advice on whether to use a class or plain functions here |
| PASS | trigger | I left a TODO in the code for now, is that okay to commit? |
| PASS | trigger | Should I build a plugin system to make this feature configurable? |
| **FAIL** | trigger | What's the simplest way to implement this without over-engineering it? |
| PASS | no-trigger | Configure nginx as a reverse proxy for my Node.js app |
| PASS | no-trigger | Write a SQL query to join users and orders tables |
| PASS | no-trigger | How do I deploy to AWS Lambda? |
| PASS | no-trigger | Convert this CSV file to JSON format |
| PASS | no-trigger | Set up a GitHub Actions CI pipeline |
| PASS | no-trigger | What's the syntax for a Python list comprehension? |
| PASS | no-trigger | Help me write a Dockerfile for this project |
| PASS | no-trigger | Explain how TCP three-way handshake works |
| PASS | no-trigger | Generate a random UUID in JavaScript |
| PASS | no-trigger | How do I set up SSH keys for GitHub? |

**Analysis:** Improved from 55% to 95% after rewriting the description to explicitly list trigger patterns (design trade-offs, over-engineering questions, abstraction decisions, error handling patterns, code structure). The single remaining failure ("What's the simplest way to implement this without over-engineering it?") is a borderline case — Claude treats it as a generic implementation question rather than a design philosophy consultation.

### check-alignment — 20/20 (100%)

| Result | Type | Query |
|--------|------|-------|
| PASS | trigger | Implement JWT token validation middleware |
| PASS | trigger | Should I work on the notifications feature next? |
| PASS | trigger | Let me add the team workspaces feature now |
| PASS | trigger | I want to build a password reset flow |
| PASS | trigger | Add CRUD endpoints for the tasks resource |
| PASS | trigger | Let me refactor the auth module to support OAuth |
| PASS | trigger | I'm going to add an admin dashboard page |
| PASS | trigger | Start implementing the user registration endpoint |
| PASS | trigger | Should I add caching to the task list endpoint? |
| PASS | trigger | Let me write the database migration for the teams table |
| PASS | no-trigger | What does GOAL.md say about our project scope? |
| PASS | no-trigger | Compare Redis vs Memcached for session storage |
| PASS | no-trigger | Read the current ROADMAP.md for me |
| PASS | no-trigger | Explain how JWT tokens work |
| PASS | no-trigger | What are the differences between SQL and NoSQL? |
| PASS | no-trigger | Show me the project's architecture documentation |
| PASS | no-trigger | How does Express middleware chain work? |
| PASS | no-trigger | List all ADRs in this project |
| PASS | no-trigger | What's the best practice for REST API versioning? |
| PASS | no-trigger | Summarize the five techlead philosophies |

**Analysis:** Perfect 100%. The description clearly distinguishes "code change requests" from "information queries."

### verify-code-quality — 20/20 (100%)

*Improved from 15/20 (75%) after description rewrite.*

| Result | Type | Query |
|--------|------|-------|
| PASS | trigger | Let's commit these changes |
| PASS | trigger | Check for TODO markers in the codebase before I push |
| PASS | trigger | Review this code for quality violations before committing |
| PASS | trigger | I'm done with this task, verify everything is clean |
| PASS | trigger | Make sure there are no FIXME or HACK comments left |
| PASS | trigger | Check if any feature modules are importing from each other |
| PASS | trigger | Verify this code follows our architecture rules before I merge |
| PASS | trigger | Run a quality check — I want to make sure nothing violates our philosophies |
| PASS | trigger | Does this diff introduce any coupling between feature modules? |
| PASS | trigger | Are there any undocumented dependencies I should create an ADR for? |
| PASS | no-trigger | Implement the user authentication endpoint |
| PASS | no-trigger | Which database should I choose for this project? |
| PASS | no-trigger | Should I work on team workspaces or auth first? |
| PASS | no-trigger | Explain how middleware works in Express |
| PASS | no-trigger | Write unit tests for the task service |
| PASS | no-trigger | Compare Prisma vs Knex for database access |
| PASS | no-trigger | Read the ARCHITECTURE.md file |
| PASS | no-trigger | Set up the project's CI pipeline |
| PASS | no-trigger | What's the best way to handle file uploads in Node.js? |
| PASS | no-trigger | Help me debug this failing test |

**Analysis:** Improved from 75% to 100% after rewriting the description. Key fix: explicitly framing specific violation scans as trigger patterns and adding "even if the user asks about just one specific sub-check" directive.

### propose-architecture — 36/36 (100%)

*Extended from 23 to 36 cases to cover broader design decisions (API design, data model, module structure, integration patterns, design patterns).*

| Result | Type | Query |
|--------|------|-------|
| PASS | trigger | Which database should I use for storing user data? |
| PASS | trigger | Compare Next.js vs Remix for our frontend |
| PASS | trigger | Should I use REST or GraphQL for this API? |
| PASS | trigger | I'm going to add Redis as a caching layer to the API |
| PASS | trigger | Let me restructure this project to a microservices architecture |
| PASS | trigger | I want to add a message queue for async job processing |
| PASS | trigger | I'm adding an API gateway service in front of our backend |
| PASS | trigger | Let me introduce an event-driven pattern for handling user actions |
| PASS | trigger | I'm going to add Elasticsearch for full-text search |
| PASS | trigger | Let me create a separate notifications service |
| PASS | trigger | I want to introduce a CQRS pattern for the task module |
| PASS | trigger | I'm going to add a new abstraction layer between controllers and services |
| PASS | trigger | Should I add a CDN in front of the API? |
| PASS | trigger | How should I structure the API endpoints for the task module? |
| PASS | trigger | Should we version our API with URL paths or headers? |
| PASS | trigger | I need to design the database schema for users and their teams |
| PASS | trigger | Should I normalize the task-tags relationship or embed tags in the task document? |
| PASS | trigger | Where should the notification logic live — in the task feature or a separate module? |
| PASS | trigger | How should the auth module communicate with the user module? |
| PASS | trigger | Should I use the repository pattern for database access? |
| PASS | trigger | How should I organize the project directory structure for the new billing feature? |
| PASS | no-trigger | Fix the bug in the login endpoint where tokens expire early |
| PASS | no-trigger | Add a unit test for the JWT middleware |
| PASS | no-trigger | Implement the task list endpoint with pagination |
| PASS | no-trigger | Should I work on team workspaces next? |
| PASS | no-trigger | What does ARCHITECTURE.md say about import rules? |
| PASS | no-trigger | Show me the current tech stack |
| PASS | no-trigger | Refactor the tasks controller to use async/await consistently |
| PASS | no-trigger | Explain how JWT refresh tokens work |
| PASS | no-trigger | Scan this codebase and generate an ARCHITECTURE.md |
| PASS | no-trigger | Why did we choose PostgreSQL over MongoDB? |
| PASS | no-trigger | Add the name field to the user response DTO |
| PASS | no-trigger | Write the SQL migration for the tasks table we designed |
| PASS | no-trigger | Implement the repository pattern in the tasks module as decided in ADR-003 |
| PASS | no-trigger | Rename the /api/v1/tasks endpoint to /api/v1/items |
| PASS | no-trigger | Move this helper function from utils.ts to the shared/ directory |

**Analysis:** Perfect 100%. Description broadened to cover all design decisions that would affect docs/ARCHITECTURE.md — API design, data model, module structure, integration patterns, and design pattern choices. The "would affect docs/ARCHITECTURE.md" anchor cleanly discriminates design decisions (trigger) from implementation of already-decided designs (no-trigger). New no-trigger cases confirm that executing decisions (writing migrations, implementing patterns from ADRs, renaming endpoints, moving files) correctly does not trigger.

### propose-spec — pending (23 cases)

*Trigger evals defined but not yet run.*

### analyze-architecture — pending (24 cases)

*Trigger evals defined but not yet run.*

### init-techlead — pending

*No trigger evals defined yet.*

### restructure-docs — pending (22 cases)

*Trigger evals defined but not yet run.*

### read-history — pending

*No trigger evals defined yet.*

---

## Behavioral Evals

### techlead-workflow

#### pushback-on-popular-pattern — with_skill: 4/4 | without_skill: 0/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| does-not-approve | PASS | FAIL — Enthusiastically approves the logging plan |
| roadmap-consulted | PASS — References ROADMAP.md 'Now' milestone (JWT auth) | FAIL — No mention of roadmap or current milestone |
| yagni-applied-to-best-practice | PASS — Applies YAGNI despite "standard engineering practice" framing | FAIL — Defers to "best practices" argument |
| simpler-now-path-offered | PASS — Suggests console.log for now | FAIL — Helps plan the full Winston setup |

**Key finding:** Baseline Claude defers to the user's "standard engineering practice" framing and helps plan the logging infrastructure. The skill overrides this by grounding in the roadmap and applying YAGNI even to popular patterns.

#### goal-first-check — with_skill: 3/3 | without_skill: 0/3

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| alignment-questioned | PASS — Questions alignment with current goal | FAIL — Proceeds with the task immediately |
| does-not-proceed-silently | PASS — Stops and explains scope creep risk | FAIL — "Sure, standardizing error responses is a good idea" |
| suggests-deferral | PASS — Suggests noting for later milestone | FAIL — Starts auditing endpoints |

**Key finding:** Strongest discriminator. Without the skill, Claude eagerly helps with the side-task. With it, Claude questions alignment and redirects to the current milestone.

#### questions-scope-of-refactor — with_skill: 4/4 | without_skill: 0/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| scope-questioned | PASS — Questions the 5-step scope expansion | FAIL — Starts implementing the error hierarchy |
| does-not-start-implementing | PASS — Does not write any code | FAIL — Builds AppError class hierarchy |
| acknowledges-kernel-of-need | PASS — Acknowledges auth needs error handling specifically | FAIL — Treats the full framework as equally needed |
| offers-scoped-alternative | PASS — Suggests auth-only error handling inline | FAIL — Proceeds with the project-wide plan |

**Key finding:** Baseline Claude treats the user's 5-step plan as a reasonable request and starts implementing. The skill distinguishes between the legitimate kernel (auth error handling) and the scope creep (project-wide error framework).

#### routes-to-propose-architecture — with_skill: 3/3 | without_skill: 0/3

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| suggests-propose-architecture | PASS — "run /propose-architecture first" with trade-off analysis and ADR | FAIL — "Sure, let's get that Redis caching layer set up!" |
| does-not-start-implementing | PASS — No code written, entirely pushback and alternatives | FAIL — Complete implementation: ioredis client, cache middleware, invalidation helper, route integration |
| identifies-architectural-change | PASS — "Redis is a new infrastructure dependency" and "no ADR for a caching strategy" | FAIL — No mention of architectural impact or ARCHITECTURE.md |

**Key finding:** Baseline Claude enthusiastically implements Redis with zero questioning. The skill identifies three problems: wrong milestone, YAGNI (undiagnosed bottleneck), and missing ADR. Suggests profiling first, then simpler alternatives (indexes, pagination, in-process cache) before reaching for Redis.

#### routes-to-propose-spec — with_skill: 3/3 | without_skill: 0/3

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| suggests-propose-spec | PASS — "Run /propose-spec to nail down" behavioral questions | FAIL — Builds entire feature: model, repository, service, routes, email service (6 files) |
| does-not-start-implementing | PASS — No code written | FAIL — Created full invitation system with 6 source files |
| identifies-missing-spec | PASS — "You're jumping straight to implementation without a spec" | FAIL — Makes all behavioral decisions inline (72-hour expiry, admin-only, token-based) without questioning |

**Key finding:** Baseline Claude builds the entire team invitation system — 6 files with model, repository, service, routes, and email. Makes behavioral decisions (72-hour expiry, admin-only invites) without asking whether those are correct. The skill stops and demands spec definition first.

#### spec-before-architecture — with_skill: 3/3 | without_skill: 0/3

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| suggests-propose-spec-first | PASS — Explicitly orders: "/propose-spec to define the real-time behavior" then "/propose-architecture to evaluate Socket.io vs SSE" | FAIL — "Great idea! Socket.io is a solid choice" — no spec or architecture evaluation |
| does-not-start-implementing | PASS — "Don't write WebSocket code. Finish auth first, then spec the feature, then choose the technology." | FAIL — Complete Socket.io implementation: server setup, JWT socket auth, room-based broadcasting, client code |
| identifies-undefined-behavior | PASS — "no docs/SPEC.md defining what 'real-time updates' means behaviorally — which events trigger pushes? What happens on reconnect? Authorization on the socket connection?" | FAIL — Defines 4 event types, room scoping, JWT socket auth inline without questioning |

**Key finding:** The hardest routing case — the request is both a spec change (new behavior) and an architecture change (new technology). The skill correctly orders spec → architecture → implementation. Also catches that real-time updates aren't in GOAL.md or the roadmap. Baseline Claude implements the full Socket.io stack.

### check-alignment

#### aligned-task — with_skill: 3/3 | without_skill: 2/3

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| proceeds-silently | PASS — Goes straight to implementation | FAIL — Opens with "Alignment Check:" section |
| implements-jwt | PASS — Full JWT middleware | PASS — Full JWT middleware with tests |
| no-blocking-message | PASS — No blocking | PASS — No blocking |

#### wrong-milestone — with_skill: 3/3 | without_skill: 0/3

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| wrong-milestone-identified | PASS — "This task is in the Next section, not Now" | FAIL — Implements full team workspace feature |
| current-priority-cited | PASS — "Current Now priority is User authentication (JWT)" | FAIL — No mention of current priority |
| asks-to-reprioritize | PASS — "Want to reprioritize?" | FAIL — Proceeds with full implementation |

#### off-goal — with_skill: 3/3 | without_skill: 0/3

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| blocks-request | PASS — "I will not write code for this request" | FAIL — Designs full blog system |
| cites-goal | PASS — References goal text verbatim | FAIL — No reference to project goal |
| clear-rejection | PASS — Clear rejection with remediation path | FAIL — "Want me to start implementing this?" |

### verify-code-quality

#### subtle-yagni-in-reasonable-code — with_skill: 4/4 | without_skill: 0/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| options-flagged-as-yagni | PASS — Flags notify/validate/dryRun as speculative | FAIL — Praises options as "good flexibility" |
| placeholder-function-flagged | PASS — Flags notifyTaskCreated as placeholder | FAIL — Treats placeholder as reasonable scaffold |
| does-not-just-approve | PASS — Blocks the commit | FAIL — Approves the clean, well-structured code |
| suggests-simpler-version | PASS — Suggests createTask(data) with inline validation | FAIL — Suggests keeping the options pattern |

#### multi-violation-stop-at-first — with_skill: 4/4 | without_skill: 0/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| stops-at-first-violation | PASS — Identifies one primary violation | FAIL — Lists all 3-4 issues |
| demands-fix-before-continuing | PASS — Blocks commit, asks for fix first | FAIL — Lists all fixes at once |
| uses-structured-format | PASS — **[Philosophy Name] violation** format | FAIL — Ad-hoc numbered list |
| does-not-enumerate-all | PASS — Stops after first violation category | FAIL — Comprehensive laundry list of all issues |

#### adr-check-for-pattern-not-dependency — with_skill: 4/4 | without_skill: 0/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| pattern-adr-required | PASS — Flags Repository pattern as requiring ADR | FAIL — No mention of ADR for code patterns |
| propose-architecture-suggested | PASS — Suggests /propose-architecture | FAIL — Approves without ADR suggestion |
| base-class-yagni-flagged | PASS — Flags BaseRepository as premature abstraction | FAIL — Praises the pattern as "good choice" |
| blocks-commit | PASS — Blocks commit pending ADR | FAIL — Approves the commit |

### propose-architecture

#### contradicts-existing-adr — with_skill: 4/4 | without_skill: 0/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| existing-adr-cited | PASS — References Express ADR rationale | FAIL — Treats as fresh comparison |
| adr-reasoning-evaluated | PASS — Evaluates if ADR reasoning still holds | FAIL — Ignores prior decision context |
| yagni-risk-in-matrix | PASS — YAGNI risk as explicit dimension | FAIL — No YAGNI dimension |
| recommends-against-migration | PASS — Recommends staying with Express | FAIL — "Fastify is a solid choice if performance matters" |

#### research-required-niche-topic — with_skill: 4/4 | without_skill: 2/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| infrastructure-cost-analyzed | PASS — BullMQ needs Redis, pg-boss uses existing PG | PASS — Also identifies the Redis requirement |
| community-health-researched | PASS — Specific release dates, download counts | PASS — Also includes npm/GitHub data |
| architecture-md-consulted | PASS — References ARCHITECTURE.md tech stack | FAIL — No reference to project architecture docs |
| sources-with-urls | PASS — Dedicated Sources section with URLs | FAIL — No Sources section |

#### scale-mismatch-research — with_skill: 4/4 | without_skill: 1/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| yagni-risk-prominent | PASS — Central finding of the analysis | PASS — Also notes K8s is overkill |
| concrete-thresholds-cited | PASS — Cites specific thresholds for when K8s is justified | FAIL — Generic "when you need it" advice |
| simpler-alternatives-matrix | PASS — Matrix with Docker Compose, PM2, systemd | FAIL — Mentions alternatives but no structured matrix |
| output-format-followed | PASS — Context, Trade-off Matrix, Recommendation, Sources | FAIL — Ad-hoc prose format |

#### adr-branch-recorded — with_skill: 6/6 | without_skill: 1/6

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| creates-adr-branch | PASS — Creates git branch with adr/ prefix | FAIL — No branch creation |
| commits-adr-template | PASS — Commits with ADR template format | FAIL — No commit |
| updates-architecture-md | PASS — Updates docs/ARCHITECTURE.md | PASS — Manually edited on working branch |
| merges-with-no-ff | PASS — Merges ADR branch with --no-ff flag | FAIL — No merge workflow |
| creates-adr-tag | PASS — Creates git tag with adr/ prefix | FAIL — No tag creation |
| deletes-adr-branch | PASS — Deletes ADR branch after tagging | FAIL — No branch workflow |

**Key finding:** Without the skill, Claude updates ARCHITECTURE.md directly on the working branch. The skill enforces the full ADR workflow: branch → commit → merge --no-ff → tag → delete branch. This is critical for `read-history` to work — without tags, past decisions are invisible.

#### full-cycle-plan — with_skill: 4/4 | without_skill: 0/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| outputs-full-cycle-plan | PASS — Structured plan with Decision (ADR-001), Branch, 6 Steps, 4 Acceptance checkboxes | FAIL — Only an ADR document, no implementation plan |
| plan-includes-implementation-steps | PASS — npm install, create rate-limit.js, apply middleware, add tests | FAIL — Mentions config in Consequences but no structured steps |
| plan-includes-branch-name | PASS — Branch: adr/001-express-rate-limit for both docs and code | FAIL — Doc-only branch, no mention of code on same branch |
| suggests-plan-command | PASS — "Ready to implement? Run /plan to execute this with a clean context." | FAIL — No mention of /plan |

**Key finding:** The full cycle plan is entirely skill-driven — baseline Claude produces a doc-only ADR with no bridge to implementation. The skill outputs a complete plan: decision + branch + implementation steps + acceptance criteria + `/plan` suggestion. The branch is designed to hold both docs and code.

### propose-spec

#### spec-branch-recorded — with_skill: 6/6 | without_skill: 3/6

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| creates-spec-branch | PASS — Creates git branch with spec/ prefix | FAIL — Used git plumbing instead of checkout -b |
| updates-spec-md | PASS — Updates docs/SPEC.md with Given/When/Then | PASS — Updates docs/SPEC.md |
| commits-spec-template | PASS — Commits with spec record template format | PASS — Commits with template |
| merges-with-no-ff | PASS — Merges spec branch with --no-ff flag | FAIL — Bypassed merge workflow |
| creates-spec-tag | PASS — Creates git tag with spec/ prefix | PASS — Creates tag |
| deletes-spec-branch | PASS — Deletes spec branch after tagging | FAIL — Never deleted branch |

**Key finding:** Without the skill, Claude gets the content right (spec updates, tags) but skips the branch workflow (no proper branch, no merge, no cleanup). The skill enforces the full spec record workflow matching the ADR pattern.

#### full-cycle-plan — with_skill: 5/5 | without_skill: 2/5

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| reads-project-context | PASS — Context Summary references Goal and Roadmap, notes "Now" milestone | PASS — Opens with GOAL.md and ROADMAP.md references |
| defines-given-when-then | PASS — 8 Given/When/Then behaviors in user-observable language | PASS — 9 scenarios, though uses implementation language (POST /auth/login, 200, 401, JWT payload) |
| outputs-full-cycle-plan | PASS — Full Cycle Plan with Spec, Branch, Architecture Decisions, 7 Steps, 9 Acceptance Criteria | FAIL — Only spec recording, no implementation plan |
| plan-includes-implementation-steps | PASS — Implement registration, login, token middleware, refresh, error cases, tests | FAIL — No implementation steps in response |
| suggests-plan-command | PASS — "Ready to implement? Run /plan to execute this with a clean context." | FAIL — No mention of /plan |

**Key finding:** Same pattern as propose-architecture: the full cycle plan is entirely skill-driven. Without-skill agent produces a spec recording with no bridge to implementation. The with-skill agent also uses outcome-oriented language while without-skill uses implementation details (HTTP methods, status codes).

### analyze-architecture

#### adapts-to-project-type — with_skill: 5/5 | without_skill: 4/5

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| identifies-web-api | PASS — Identifies project as web API | PASS |
| tech-stack-table | PASS — Produces tech stack table with versions from package.json | PASS |
| includes-mermaid-diagram | PASS — Includes at least one mermaid diagram | FAIL — ASCII art instead of mermaid |
| documents-actual-structure | PASS — Documents actual directory structure (src/routes/, src/models/) | PASS |
| no-nonexistent-layers | PASS — Does NOT document non-existent layers | PASS |

#### asks-for-corrections — with_skill: 2/2 | without_skill: 1/2

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| presents-summary | PASS — Presents a summary of findings | PASS |
| asks-for-feedback | PASS — Explicitly asks user for corrections/feedback | FAIL — Silently finalizes |

**Key finding:** The skill teaches collaborative architecture documentation — present findings and ask for corrections rather than treating the scan as authoritative.

#### notes-code-smells-objectively — with_skill: 3/3 | without_skill: 3/3

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| detects-cross-feature-coupling | PASS — Detects billing imports from auth | PASS |
| notes-objectively | PASS — Uses neutral/descriptive language | PASS |
| no-refactoring-prescriptions | PASS — Does NOT prescribe refactoring steps | PASS |

**Note:** Non-discriminating case — baseline Claude also describes coupling objectively without prescribing fixes. Both respect the boundary between observation (analyze-architecture) and recommendation (propose-architecture).

#### single-file-for-simple-project — with_skill: 3/3 | without_skill: 3/3

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| identifies-cli-tool | PASS — Identifies project as CLI tool | PASS |
| single-file-output | PASS — Produces single ARCHITECTURE.md (not multi-file) | PASS |
| no-complex-layers | PASS — Does NOT document complex layer structures | PASS |

**Note:** Non-discriminating case — baseline Claude also correctly scales documentation to project complexity.

**analyze-architecture summary:** +15% delta is the lowest of all skills. Two cases are non-discriminating (6/6 assertions pass without skill). The skill's value concentrates in mermaid diagrams (vs ASCII art) and asking for corrections (vs silently finalizing). Consider strengthening evals with harder cases.

### init-techlead

#### code-exists-generates-specs — with_skill: 4/4 | without_skill: 4/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| detects-existing-code | PASS — Detects existing source code | PASS |
| generates-spec | PASS — Generates non-empty SPEC.md or specs/ | PASS |
| capabilities-from-source | PASS — Capabilities derived from actual source code | PASS |
| given-when-then | PASS — Specs include Given/When/Then behaviors | PASS |

**Note:** Non-discriminating case — baseline Claude also generates specs from source code correctly.

#### greenfield-uses-empty-template — with_skill: 2/2 | without_skill: 0/2

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| empty-template | PASS — Creates SPEC.md with empty/template placeholder | FAIL — Contains 3 fabricated specs |
| no-invented-capabilities | PASS — Does NOT invent capabilities from interview answers alone | FAIL — Fabricated 3 capabilities from interview |

**Key finding:** Strongest discriminator. Baseline Claude fabricates specs from the project interview, inventing capabilities that don't exist in code. The skill enforces "no code = empty template" — specs must be derived from source, not imagined.

#### multi-file-threshold — with_skill: 4/4 | without_skill: 1/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| detects-4-plus-capabilities | PASS — Detects 4+ distinct capabilities | PASS |
| creates-specs-directory | PASS — Creates docs/specs/ directory (multi-file) | FAIL — Single SPEC.md |
| includes-readme-index | PASS — Includes README.md index | FAIL — No index |
| separate-capability-files | PASS — Creates separate files per capability | FAIL — All in one file |

**Key finding:** Baseline Claude detects the capabilities but dumps them all in one file. The skill enforces the 4+ threshold rule: switch to multi-file format with README.md index.

#### specs-use-outcome-language — with_skill: 4/4 | without_skill: 0/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| no-api-paths | PASS — Spec does NOT contain API paths | FAIL — Contains /api/tasks, etc. |
| no-http-methods | PASS — Does NOT reference HTTP methods | FAIL — Uses POST, GET, PATCH, DELETE |
| no-status-codes | PASS — Does NOT reference HTTP status codes | FAIL — Uses 200, 201, 400, 404, 500 |
| user-observable-outcomes | PASS — Describes user-observable outcomes | FAIL — Uses implementation language |

**Key finding:** Strongest behavioral delta. Baseline Claude generates specs full of implementation details (paths, methods, status codes). The skill enforces outcome-oriented language — what the *user* observes, not what the *system* does.

### restructure-docs

#### brownfield-migration — with_skill: 4/4 | without_skill: 2/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| scans-before-proposing | PASS — Scans docs/ and reads content before proposing | PASS |
| classifies-all-files | PASS — Correctly classifies all 4 files | PASS |
| presents-migration-plan | PASS — Presents migration plan before making changes | FAIL — Shows summary after |
| asks-for-confirmation | PASS — Asks user to confirm before executing | FAIL — No confirmation |

**Key finding:** Baseline Claude moves files first, explains later. The skill enforces plan-first: present migration plan → get confirmation → execute.

#### multi-file-threshold — with_skill: 4/4 | without_skill: 0/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| detects-threshold | PASS — Detects 6 capabilities exceed 4+ threshold | FAIL — Uses single SPEC.md |
| proposes-specs-directory | PASS — Proposes docs/specs/ with README.md and per-capability files | FAIL — No directory structure |
| shows-directory-structure | PASS — Shows directory structure in migration plan | FAIL — No plan |
| per-capability-files | PASS — Each capability gets own file | FAIL — All in one file |

**Key finding:** Same multi-file threshold rule as init-techlead — baseline Claude ignores it during restructuring too.

#### supplementary-handling — with_skill: 3/4 | without_skill: 2/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| migrates-architecture | PASS — Migrates architecture-notes.md into docs/ARCHITECTURE.md | PASS |
| moves-to-reference | PASS — Moves supplementary files to docs/reference/ | FAIL — Kept them in place |
| no-file-deletion | PASS — Does NOT delete or discard any files | PASS |
| notes-missing-canonical | FAIL — Creates GOAL.md, ROADMAP.md, SPEC.md from inferred content | FAIL — Creates from inferred content |

**Note:** The single with_skill failure: both variants create missing canonical files from inferred content rather than noting their absence and suggesting the user create them. The skill should note "GOAL.md is missing — run /init-techlead" rather than fabricating it.

#### user-story-conversion — with_skill: 4/4 | without_skill: 3/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| converts-to-given-when-then | PASS — Converts "As a user, I want..." into Given/When/Then | PASS |
| converts-to-now-next-later | PASS — Converts Phase 1/2/3 into Now/Next/Later milestones | FAIL — Uses Milestone 1/2/3 instead |
| preserves-domain-terminology | PASS — Preserves domain terminology while restructuring | PASS |
| extracts-goal | PASS — Extracts project goal and success criteria | PASS |

**Key finding:** Baseline Claude restructures content but uses generic "Milestone" labels. The skill enforces Techlead's canonical Now/Next/Later format.

---

## Key Findings

### 1. All skills show positive behavioral deltas

Every skill with behavioral evals improves over baseline, though deltas vary significantly:

| Delta | Skills | Pattern |
|-------|--------|---------|
| +100% | techlead-workflow, verify-code-quality | Philosophy enforcement — baseline Claude never pushes back |
| +78% | check-alignment, propose-architecture | Workflow enforcement — branch/tag/ADR patterns, milestone gating |
| +50-64% | propose-spec, init-techlead, restructure-docs | Format enforcement — outcome language, multi-file threshold, plan-first |
| +15% | analyze-architecture | Weak delta — 2 of 4 cases are non-discriminating |

### 2. Skill routing is a strong discriminator

The new routing evals (cases 4-6) show 9/9 with-skill vs 0/9 without-skill — perfect +100% delta. Baseline Claude never suggests `/propose-architecture` or `/propose-spec` before implementing. The hardest case (`spec-before-architecture`) tests whether the skill correctly orders spec before architecture when both are needed — it does, explicitly stating "spec the feature, then choose the technology."

### 3. Git workflow enforcement is a strong discriminator

The new `adr-branch-recorded` and `spec-branch-recorded` cases confirm that baseline Claude skips the branch → commit → merge --no-ff → tag → cleanup workflow. This is critical: without tags, `read-history` can't discover past decisions. The skill enforces the workflow that makes the system self-documenting.

### 3. Outcome-oriented language is the hardest behavior to teach

Without the skill, Claude consistently generates specs with `/api/tasks`, `POST`, `200 OK` — implementation details masquerading as spec. The `specs-use-outcome-language` case (0/4 without skill, 4/4 with) shows this is the single behavior that baseline Claude simply cannot do on its own.

### 4. analyze-architecture needs harder eval cases

At +15% delta with 2 non-discriminating cases, analyze-architecture's evals don't yet prove strong skill value. The discriminating behaviors (mermaid diagrams, asking for corrections) are real but narrow. Consider adding cases that test: scanning unfamiliar codebases without README, detecting when project structure contradicts ARCHITECTURE.md, or producing architecture for polyglot repos.

### 5. "Don't fabricate" is a recurring pattern

Both init-techlead (`greenfield-uses-empty-template`) and restructure-docs (`supplementary-handling`) test whether Claude invents content from thin air. Baseline Claude fabricates specs from interviews and creates canonical files from inferred content. The skills mostly override this, with one remaining failure in restructure-docs.

### 6. Testing absence remains the strongest eval strategy

The highest-delta assertions continue to be "does NOT" checks: does NOT contain API paths, does NOT invent capabilities, does NOT start implementing, does NOT approve. This pattern should guide future eval design.

---

## Recommendations

1. **analyze-architecture:** Add harder eval cases to increase delta above +15%. Test codebase scanning without README, detecting ARCHITECTURE.md drift, polyglot repos.
2. **restructure-docs:** Fix the `supplementary-handling` with_skill failure — skill should note missing canonical files rather than fabricating them.
3. **Trigger evals:** Run pending triggers for analyze-architecture (24 cases), restructure-docs (22 cases), propose-spec (23 cases). Create trigger evals for init-techlead and read-history.
4. **propose-spec:** The existing 6-case behavioral eval set (outcome-not-output, existing-spec-update, etc.) has not been run yet. Run `/eval-behavior propose-spec` to get full coverage.
5. **read-history:** No behavioral or trigger evals exist. Create and run both.
6. **Regression check:** Re-run all trigger evals periodically to catch regressions from skill description changes.
