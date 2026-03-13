# Evaluation Results

**Date:** 2026-03-11
**Model:** Claude Opus 4.6

---

## Summary

| Skill | Trigger Accuracy | Behavioral (with) | Behavioral (without) | Delta |
|-------|------------------|--------------------|----------------------|-------|
| **techlead-workflow** | 19/20 (95%) | 11/11 (100%) | 0/11 (0%) | +100% |
| **check-alignment** | 20/20 (100%) | 9/9 (100%) | 2/9 (22%) | +78% |
| **verify-code-quality** | 20/20 (100%) | 12/12 (100%) | 0/12 (0%) | +100% |
| **propose-architecture** | 20/20 (100%) | 12/12 (100%) | 3/12 (25%) | +75% |
| **propose-spec** | pending (24 cases) | pending (30 assertions) | pending | pending |
| **read-history** | pending | — | — | — |
| **Total** | **79/80 (99%)** | **44/44 (100%)** | **5/44 (11%)** | **+89%** |

*propose-spec and read-history evals pending first run. Totals reflect last completed run.*

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

### propose-architecture — 20/20 (100%)

*Previously named architecture-researcher.*

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

### propose-spec — pending (24 cases: 12 trigger + 12 no-trigger)

*Evals not yet run. Trigger eval set includes:*

**Hard boundary true cases (should trigger):**
- Explicit command: `/propose-spec "User authentication"`
- Behavioral questions: "What should the login feature do?", "How should team invitations behave?"
- Acceptance criteria: "Define acceptance criteria for task deletion"
- Pre-implementation planning: "Before I start coding the invite system, let me define the requirements"
- Spec update: "The auth spec is missing the forgot-password flow. Let's add that capability."

**Hard boundary false cases (should NOT trigger):**
- Architecture questions: "Which database should I use?", "Compare Redis vs Memcached" → propose-architecture
- Implementation details disguised as spec: "What HTTP status code should login return on failure?"
- Reading existing spec: "Show me the current authentication spec in SPEC.md" → file read
- Testing, not defining: "Write integration tests for the authentication flow"
- Architecture disguised as behavior: "How should the database handle concurrent writes?" → propose-architecture

### read-history — pending

*Description updated to support dual namespace (adr/* + spec/*). Trigger evals not yet created.*

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

#### subtle-yagni-in-reasonable-code — with_skill: 4/4 | without_skill: 0/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| options-flagged-as-yagni | PASS — Flags notify/validate/dryRun as speculative | FAIL — Praises options as "good flexibility" |
| placeholder-function-flagged | PASS — Flags notifyTaskCreated as placeholder | FAIL — Treats placeholder as reasonable scaffold |
| does-not-just-approve | PASS — Blocks the commit | FAIL — Approves the clean, well-structured code |
| suggests-simpler-version | PASS — Suggests createTask(data) with inline validation | FAIL — Suggests keeping the options pattern |

**Key finding:** Baseline Claude praises speculative options as "good flexibility" and approves the commit. The skill correctly identifies YAGNI violations in code that *looks* clean.

#### multi-violation-stop-at-first — with_skill: 4/4 | without_skill: 0/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| stops-at-first-violation | PASS — Identifies one primary violation | FAIL — Lists all 3-4 issues |
| demands-fix-before-continuing | PASS — Blocks commit, asks for fix first | FAIL — Lists all fixes at once |
| uses-structured-format | PASS — **[Philosophy Name] violation** format | FAIL — Ad-hoc numbered list |
| does-not-enumerate-all | PASS — Stops after first violation category | FAIL — Comprehensive laundry list of all issues |

**Key finding:** Baseline Claude produces a comprehensive list of all issues. The skill enforces the stop-at-first-violation workflow — fix one, re-check, repeat.

#### adr-check-for-pattern-not-dependency — with_skill: 4/4 | without_skill: 0/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| pattern-adr-required | PASS — Flags Repository pattern as requiring ADR | FAIL — No mention of ADR for code patterns |
| propose-architecture-suggested | PASS — Suggests /propose-architecture | FAIL — Approves without ADR suggestion |
| base-class-yagni-flagged | PASS — Flags BaseRepository as premature abstraction | FAIL — Praises the pattern as "good choice" |
| blocks-commit | PASS — Blocks commit pending ADR | FAIL — Approves the commit |

**Key finding:** Baseline Claude sees "no new npm packages" and approves. The skill recognizes that new architectural *patterns* (not just dependencies) require ADRs.

### propose-spec — pending (6 cases, 30 assertions)

*Evals not yet run. Behavioral eval set tests 6 discriminating behaviors:*

| Case | Tests | Key assertion |
|------|-------|---------------|
| `outcome-not-output` | User provides API paths, HTTP methods, DB schema — skill must reframe as user-observable outcomes | Spec does NOT include /api/... paths, POST/GET/PUT, status codes, or table names |
| `existing-spec-update` | Auth spec exists, user wants to add OAuth — skill must treat as update | Reads SPEC.md first; preserves existing behaviors; uses change type 'changed' not 'added' |
| `out-of-scope-flagged` | User requests analytics spec (out of scope in GOAL.md) with "really valuable" argument | Does NOT write behaviors before addressing scope conflict; not swayed by value argument |
| `invariant-detection` | Team workspaces with roles — skill must identify cross-cutting invariants | Identifies access control invariant; invariants listed separately from Given/When/Then behaviors |
| `happy-path-not-enough` | User gives only sunny-day scenario, says "that's basically it" | Does NOT accept happy path as complete; proposes error and edge case scenarios |
| `spec-architecture-boundary` | User mixes Elasticsearch, class names, table names into spec request | Spec does NOT include technology choices; explicitly redirects architecture concerns to /propose-architecture |

*Expected: high behavioral delta. Without the skill, baseline Claude accepts implementation details as valid spec content, skips GOAL.md scope checks, and doesn't enforce Given/When/Then format.*

### propose-architecture

*Previously named architecture-researcher.*

#### contradicts-existing-adr — with_skill: 4/4 | without_skill: 0/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| existing-adr-cited | PASS — References Express ADR rationale | FAIL — Treats as fresh comparison |
| adr-reasoning-evaluated | PASS — Evaluates if ADR reasoning still holds | FAIL — Ignores prior decision context |
| yagni-risk-in-matrix | PASS — YAGNI risk as explicit dimension | FAIL — No YAGNI dimension |
| recommends-against-migration | PASS — Recommends staying with Express | FAIL — "Fastify is a solid choice if performance matters" |

**Key finding:** Baseline Claude treats every technology question as a fresh decision. The skill grounds analysis in existing ADRs and evaluates whether prior reasoning still holds.

#### research-required-niche-topic — with_skill: 4/4 | without_skill: 2/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| infrastructure-cost-analyzed | PASS — BullMQ needs Redis, pg-boss uses existing PG | PASS — Also identifies the Redis requirement |
| community-health-researched | PASS — Specific release dates, download counts | PASS — Also includes npm/GitHub data |
| architecture-md-consulted | PASS — References ARCHITECTURE.md tech stack | FAIL — No reference to project architecture docs |
| sources-with-urls | PASS — Dedicated Sources section with URLs | FAIL — No Sources section |

**Note:** Both identify infrastructure costs (obvious from the prompt). The skill differentiates by consulting ARCHITECTURE.md as a constraint and including a Sources section with URLs.

#### scale-mismatch-research — with_skill: 4/4 | without_skill: 1/4

| Assertion | with_skill | without_skill |
|-----------|------------|---------------|
| yagni-risk-prominent | PASS — Central finding of the analysis | PASS — Also notes K8s is overkill |
| concrete-thresholds-cited | PASS — Cites specific thresholds for when K8s is justified | FAIL — Generic "when you need it" advice |
| simpler-alternatives-matrix | PASS — Matrix with Docker Compose, PM2, systemd | FAIL — Mentions alternatives but no structured matrix |
| output-format-followed | PASS — Context, Trade-off Matrix, Recommendation, Sources | FAIL — Ad-hoc prose format |

**Note:** Both recognize K8s is overkill (obvious at this scale). The skill differentiates through structured output format, concrete thresholds, and a proper trade-off matrix.

---

## Key Findings

### 1. All skills now have strong behavioral deltas
After redesigning evals to test behavioral gaps rather than obvious anti-patterns, every skill shows significant discrimination:
- **techlead-workflow:** +27% → +100%. New evals test pushback on "best practices" and scope creep questioning.
- **verify-code-quality:** +0% → +100%. New evals test subtle YAGNI in clean code, stop-at-first-violation workflow, and ADR for patterns.
- **architecture-researcher:** +0% → +75%. New evals test ADR awareness, structured output format, and web research.
- **check-alignment:** +78% (unchanged). Already well-designed.

### 2. Testing absence is more discriminating than testing presence
The most effective assertions test what the skill *prevents*: "does NOT approve", "does NOT enumerate all", "does NOT start implementing." Baseline Claude's default is to be helpful and say yes — skills that override this create the largest behavioral gaps. The propose-spec eval set follows this pattern: "does NOT include API paths", "does NOT write behaviors before addressing scope conflict", "does NOT accept happy path as complete."

### 3. Subtle violations beat obvious anti-patterns
Previous evals used FIXME markers, cross-feature imports, and premature EventEmitter — patterns baseline Claude already catches. The redesigned evals use code that *looks good* (clean options object, well-structured Repository pattern, popular logging setup) but violates skill-specific principles. This is where skill value emerges.

### 4. Skill-specific workflows are strong discriminators
Stop-at-first-violation (verify-code-quality), ADR consultation (architecture-researcher), and roadmap grounding (techlead-workflow) are behaviors that don't emerge from baseline Claude. These workflow-level behaviors are the skills' core contribution.

### 5. Description rewrites dramatically improved trigger accuracy
After rewriting skill descriptions to explicitly list trigger patterns:
- **techlead-workflow:** 55% → 95% (+40pp). Key: replaced "always-active persona" framing with specific trigger patterns (design trade-offs, over-engineering, abstraction decisions).
- **verify-code-quality:** 75% → 100% (+25pp). Key: added explicit sub-check patterns and "even if the user asks about just one specific sub-check" directive.
- **Overall trigger accuracy:** 82% → 99%.

### 6. Remaining edge case: generic implementation questions
The single remaining trigger failure ("What's the simplest way to implement this without over-engineering it?") reveals that Claude treats implementation-focused questions as direct tasks rather than philosophy consultations, even when "over-engineering" is mentioned. This is a reasonable boundary — the query is primarily about implementation, not design philosophy.

---

## Recommendations

1. **All skills:** Behavioral evals are now well-calibrated. Maintain current eval set as regression tests.
2. **propose-architecture:** 3 non-discriminating assertions could be strengthened by removing hints from prompts (e.g., not stating the tech stack, using subtler scale mismatches). Low priority at +75% delta.
3. **Trigger evals:** No changes needed for existing skills. 99% accuracy across all skills.
4. **propose-spec:** Run `/eval-trigger propose-spec` and `/eval-behavior propose-spec` to establish baseline. Target: 90%+ trigger accuracy, 100% behavioral pass rate with-skill.
5. **read-history:** Run `/eval-trigger read-history` after creating trigger evals for the updated dual-namespace description.
6. **Regression check:** Re-run `/eval-trigger` on check-alignment, verify-code-quality, and read-history to verify no regression from description changes that added SPEC.md references.
7. **Next step:** Run evals periodically to detect regressions as skill prompts evolve.
