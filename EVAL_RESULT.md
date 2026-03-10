# Evaluation Results

**Date:** 2026-03-10
**Model:** Claude Opus 4.6

---

## Summary

| Skill | Trigger Accuracy | Behavioral (with) | Behavioral (without) | Delta |
|-------|------------------|--------------------|----------------------|-------|
| **techlead-persona** | 19/20 (95%) | 11/11 (100%) | 8/11 (73%) | +27% |
| **check-alignment** | 20/20 (100%) | 9/9 (100%) | 2/9 (22%) | +78% |
| **verify-code-quality** | 20/20 (100%) | 12/12 (100%) | 12/12 (100%) | +0% |
| **architecture-researcher** | 20/20 (100%) | 8/8 (100%) | 8/8 (100%) | +0% |
| **Total** | **79/80 (99%)** | **40/40 (100%)** | **30/40 (75%)** | **+25%** |

---

## Trigger Evals

### techlead-persona — 19/20 (95%)

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

**Description change:** Replaced the generic "always-active persona" framing with specific trigger patterns: "whenever the user asks about code design trade-offs, whether something is over-engineered, if an abstraction is premature, whether to add extensibility or flexibility." Added explicit mention of error handling patterns, code structure questions, and a "when in doubt, consult it" directive.

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

**Analysis:** Perfect 100%. The description clearly distinguishes "code change requests" from "information queries." Claude consistently invokes the skill when the user asks to implement, build, or work on something, and correctly skips it for read-only or informational queries.

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

**Analysis:** Improved from 75% to 100% after rewriting the description. All 5 previously failing sub-check queries now trigger correctly. The key fix was explicitly framing specific violation scans as trigger patterns and adding the directive "even if the user asks about just one specific sub-check, this skill covers it."

**Description change:** Added explicit sub-check trigger patterns: "when the user asks to scan for or check specific code violations — such as TODO/FIXME/HACK markers, cross-feature imports, module coupling, undocumented dependencies missing ADRs, empty catch blocks." Added the closing directive about single sub-checks.

### architecture-researcher — 20/20 (100%)

| Result | Type | Query |
|--------|------|-------|
| PASS | trigger | Which database should I use for this project? |
| PASS | trigger | Compare Next.js vs Remix for our frontend |
| PASS | trigger | Should we use Redis or Memcached for caching? |
| PASS | trigger | Evaluate Prisma vs TypeORM vs Knex for database access |
| PASS | trigger | What are the trade-offs between REST and GraphQL for our API? |
| PASS | trigger | Help me decide between Socket.io and native WebSockets |
| PASS | trigger | Should I use a message queue? Compare RabbitMQ vs BullMQ |
| PASS | trigger | Research authentication approaches — JWT vs sessions vs OAuth |
| PASS | trigger | Is MongoDB a better fit than PostgreSQL for our task data? |
| PASS | trigger | Compare deployment options: Vercel vs Railway vs self-hosted |
| PASS | no-trigger | Fix the database connection bug in the task service |
| PASS | no-trigger | Commit my changes to the auth module |
| PASS | no-trigger | Implement the login endpoint with bcrypt password hashing |
| PASS | no-trigger | Refactor the task controller to use async/await |
| PASS | no-trigger | Write tests for the user registration flow |
| PASS | no-trigger | Check if my code follows the project's import rules |
| PASS | no-trigger | Is this task aligned with our current roadmap? |
| PASS | no-trigger | Add input validation to the task creation endpoint |
| PASS | no-trigger | Read the existing ADRs for this project |
| PASS | no-trigger | Help me debug why the JWT token verification fails |

**Analysis:** Perfect 100%. The description effectively distinguishes "compare/evaluate/choose technology" queries from implementation, debugging, and review queries. The phrase "compare A vs B" is a strong discriminator.

---

## Behavioral Evals

### techlead-persona

#### yagni-pushback — with_skill: 4/4 | without_skill: 4/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| yagni-cited | PASS — "This violates YAGNI directly" | PASS — "This is a textbook YAGNI violation" |
| pushback-given | PASS — "No. Don't build this." | PASS — "No. Do not build this." |
| simpler-alternative | PASS — Node.js built-in EventEmitter via composition | PASS — Node.js EventEmitter or simple callback |
| single-use-case-noted | PASS — "only the TaskService needs events" | PASS — "Only TaskService needs events right now" |

**Note:** Non-discriminating — Claude pushes back on premature abstraction even without the skill. This is a well-known anti-pattern that baseline Claude already handles well.

#### goal-first-check — with_skill: 3/3 | without_skill: 0/3

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| alignment-questioned | PASS — "Is this in your current goal or 'Now' milestone?" | FAIL — Proceeds with the task immediately |
| does-not-proceed-silently | PASS — "Stop." then explains scope creep risk | FAIL — "Sure, standardizing error responses is a good idea" |
| suggests-deferral | PASS — "File as a separate task for the Next milestone" | FAIL — Starts auditing endpoints and building a plan |

**Key finding:** This is the strongest discriminator for the persona skill. Without it, Claude eagerly helps with the side-task. With it, Claude immediately questions alignment and redirects to the current milestone. The persona's "Single Goal" philosophy creates behavior that baseline Claude does not exhibit.

#### fail-fast-enforcement — with_skill: 4/4 | without_skill: 4/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| todo-flagged | PASS — "VIOLATION 1: TODO in committed code" | PASS — Flags the TODO as an issue |
| silent-catch-flagged | PASS — "VIOLATION 2: Swallowed errors — security bug" | PASS — "Silent failure in the catch block" |
| fail-fast-cited | PASS — "This breaks Fail Fast" | PASS — "Fail-fast, deny-by-default is not optional" |
| immediate-fix-demanded | PASS — "REJECTED" with fixed version | PASS — "RECOMMENDED REWRITE" with fixed code |

**Note:** Non-discriminating — authentication bypass via empty catch is severe enough that baseline Claude always flags it. The with-skill response is more structured (numbered violations, explicit philosophy references) but the without-skill response is equally thorough.

### check-alignment

#### aligned-task — with_skill: 3/3 | without_skill: 2/3

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| proceeds-silently | PASS — Goes straight to implementation | FAIL — Opens with "Alignment Check:" section |
| implements-jwt | PASS — Full JWT middleware | PASS — Full JWT middleware with tests |
| no-blocking-message | PASS — No blocking | PASS — No blocking |

**Key finding:** The skill correctly teaches "don't announce alignment — just proceed." Without the skill, the agent explicitly announces alignment before implementing, which wastes the user's time on a passing check.

#### wrong-milestone — with_skill: 3/3 | without_skill: 0/3

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| wrong-milestone-identified | PASS — "This task is in the Next section, not Now" | FAIL — Implements full team workspace feature |
| current-priority-cited | PASS — "Current Now priority is User authentication (JWT)" | FAIL — No mention of current priority |
| asks-to-reprioritize | PASS — "Want to reprioritize?" | FAIL — Proceeds with full implementation |

**Key finding:** The strongest behavioral delta in the eval suite. Without the skill, Claude builds the entire team workspaces feature (teams table, membership, RBAC, routes) without questioning whether it should. With the skill, it stops in one sentence and asks to reprioritize.

#### off-goal — with_skill: 3/3 | without_skill: 0/3

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| blocks-request | PASS — "I will not write code for this request" | FAIL — Designs full blog system |
| cites-goal | PASS — References goal text verbatim | FAIL — No reference to project goal |
| clear-rejection | PASS — Clear rejection with remediation path | FAIL — "Want me to start implementing this?" |

**Key finding:** Without the skill, Claude enthusiastically designs a complete blog API (data models, endpoints, rich text, pagination, publishing workflow). With the skill, it refuses in 5 lines and cites the goal. This demonstrates the skill's core value: preventing scope creep.

### verify-code-quality

#### cross-feature-import — with_skill: 4/4 | without_skill: 4/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| cross-import-flagged | PASS — Flags both cross-feature imports | PASS — Flags both cross-feature imports |
| architecture-rule-cited | PASS — "Per ARCHITECTURE.md: features/A CANNOT import from features/B" | PASS — Quotes the import rule |
| fix-suggested | PASS — Move to core/ or inject via interface | PASS — Three options: interface, event-driven, DI |
| blocks-commit | PASS — "Do NOT commit this code" | PASS — "Do not commit this code as-is" |

**Note:** Non-discriminating — the ARCHITECTURE.md fixture explicitly states the import rule, and both agents read it. The with-skill response additionally flags YAGNI (billing not in goal) and missing ADR (Stripe dependency), catching violations the without-skill agent misses, though these weren't in the assertions.

#### todo-marker-detection — with_skill: 4/4 | without_skill: 4/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| fixme-flagged | PASS — "Found FIXME at file:5" | PASS — Flags FIXME marker |
| hack-flagged | PASS — "Found HACK at file:10" | PASS — Flags HACK marker |
| fail-fast-cited | PASS — "deferred problems don't ship" | PASS — References deferred problems |
| blocks-commit | PASS — "COMMIT BLOCKED" | PASS — "not ready to commit" |

**Note:** Non-discriminating — FIXME and HACK markers are universally recognized anti-patterns. The with-skill response uses a more structured format (philosophy-by-philosophy checks) and stops at the first violation category, while the without-skill response covers more issues (mass assignment, response envelope).

#### undocumented-dependency — with_skill: 4/4 | without_skill: 4/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| undocumented-dep-flagged | PASS — "no corresponding ADR" | PASS — "no ADR documenting this dependency" |
| adr-suggested | PASS — "Run /propose-architecture" | PASS — "run /propose-architecture" |
| yagni-questioned | PASS — "can likely be replaced with ~10-15 lines" | PASS — "YAGNI Violation — Standard Library Alternative" |
| simpler-alternative | PASS — Shows deepMerge utility | PASS — Shows deepMerge utility |

**Note:** Non-discriminating — the ARCHITECTURE.md and philosophy docs provide enough context for both agents. Both suggest the same fix (inline deepMerge, ~15 lines). The without-skill agent additionally references the philosophy.md passage that explicitly calls out lodash as an anti-pattern.

### architecture-researcher

#### trade-off-matrix — with_skill: 4/4 | without_skill: 4/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| matrix-built | PASS — 7-dimension matrix | PASS — 12-dimension matrix with star ratings |
| project-specific-reasoning | PASS — Ties to CRUD, auth, team ACL needs | PASS — Ties to relational data, team workspaces |
| yagni-risk-assessed | PASS — YAGNI Risk row per option | PASS — "YAGNI DOESN'T MEAN 'PICK THE SIMPLEST DATABASE'" |
| clear-recommendation | PASS — "Stick with PostgreSQL" | PASS — "Stick with PostgreSQL" |

**Note:** Non-discriminating — both agents produce comprehensive trade-off analyses. The with-skill response uses web research and cites sources. The without-skill response is more detailed (star ratings, weighted criteria, "When to Reconsider" section).

#### dependency-evaluation — with_skill: 4/4 | without_skill: 4/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| scale-evaluated | PASS — "200ms with ~50 users" analyzed in context | PASS — "200ms for 50 users is not a performance problem" |
| over-engineering-warned | PASS — "textbook over-engineering" | PASS — "speculative optimization" |
| simpler-option-considered | PASS — Query optimization → lru-cache → Redis | PASS — Query optimization → in-memory cache → Redis |
| threshold-suggested | PASS — "5,000-10,000 users" and multi-instance | PASS — Lists specific conditions for Redis |

**Note:** Non-discriminating — both agents correctly identify Redis as overkill and recommend the same progression. The with-skill response cites the philosophy.md passage that uses Redis as a cautionary example. Both suggest specific thresholds for when to revisit.

---

## Key Findings

### 1. check-alignment has the highest behavioral delta (+78%)
This skill prevents Claude from working on the wrong thing — a failure mode that baseline Claude consistently exhibits. Without it, Claude eagerly implements off-goal features (blog system) and wrong-milestone work (team workspaces) without questioning alignment. This is the highest-value skill in the plugin.

### 2. techlead-persona's value is in goal-first checking (+27%)
The YAGNI and Fail Fast assertions are non-discriminating — baseline Claude already handles obvious anti-patterns. The persona's unique contribution is the "goal-first check" behavior: questioning whether a side-task aligns with the current milestone before proceeding. This behavior only appears with the skill active.

### 3. verify-code-quality and architecture-researcher are non-discriminating (+0%)
Both skills produce 100% pass rates with and without the skill. This is because the fixture files (ARCHITECTURE.md, philosophy.md) provide sufficient context for baseline Claude to apply the same rules. The skills' value may be more in triggering at the right time (pre-commit, during /propose-architecture) rather than in the behavioral output itself.

### 4. Description rewrites dramatically improved trigger accuracy
After rewriting skill descriptions to explicitly list trigger patterns:
- **techlead-persona:** 55% → 95% (+40pp). Key: replaced "always-active persona" framing with specific trigger patterns (design trade-offs, over-engineering, abstraction decisions).
- **verify-code-quality:** 75% → 100% (+25pp). Key: added explicit sub-check patterns and "even if the user asks about just one specific sub-check" directive.
- **Overall trigger accuracy:** 82% → 99%.

### 5. Remaining edge case: generic implementation questions
The single remaining trigger failure ("What's the simplest way to implement this without over-engineering it?") reveals that Claude treats implementation-focused questions as direct tasks rather than philosophy consultations, even when "over-engineering" is mentioned. This is a reasonable boundary — the query is primarily about implementation, not design philosophy.

---

## Recommendations

1. **check-alignment:** No changes needed. Perfect trigger accuracy and highest behavioral value.
2. **architecture-researcher:** No changes needed. Perfect trigger accuracy, strong behavioral output.
3. **verify-code-quality:** Description improvement complete. Monitor for false positives from the broader trigger surface.
4. **techlead-persona:** Description improvement complete. The remaining failure is an acceptable edge case.
5. **Behavioral eval assertions:** Strengthen assertions for verify-code-quality and architecture-researcher to be more discriminating. Current assertions test whether the skill produces correct output, but both agents pass equally. Consider assertions that test skill-specific formatting, philosophy-by-philosophy structure, or stop-at-first-violation behavior.
