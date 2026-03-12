# The 5 Philosophies

Techlead enforces five non-negotiable philosophies across every coding decision. This document is the authoritative reference — covering what each philosophy means, why it matters, how it plays out in practice, what violating it looks like, and how Techlead enforces it.

For quick summaries, see the [README](../README.md). For workflow integration, see the [User Guide](guide.md).

---

## 1. Single Goal (One Thing Well)

### Definition

The project has ONE goal in `docs/GOAL.md`. Every line of code serves that goal. If a request doesn't clearly connect to it, ask why before writing code.

### Rationale

Projects fail from diffusion, not from missing features. When a codebase serves multiple masters, every decision becomes a negotiation. A single goal eliminates that overhead — it gives you a binary test for every line of code: does this serve the goal, or doesn't it? Codebases that stay focused ship. Codebases that accumulate "while we're at it" features stall under their own weight.

### In Practice

Every coding task must connect to `docs/GOAL.md`. Techlead will ask "how does this connect to [your goal]?" if the link isn't obvious. This prevents scope creep and keeps the project focused.

### Anti-Patterns

- **Scope creep via "quick adds"** — "While I'm in this file, let me also add X." If X isn't in the goal, it doesn't belong in this commit.
- **Goal as decoration** — Writing a `docs/GOAL.md` but never consulting it. The goal only works if it's the first thing checked before every task.
- **Multiple goals disguised as one** — "Build a task manager with real-time collaboration and an AI assistant." That's three projects. Pick one.
- **Confusing goals with features** — The goal is the outcome, not the implementation. "Use GraphQL" isn't a goal. "Let clients query exactly the data they need" is closer, and GraphQL is one possible means.

### Enforcement

Techlead checks whether every changed file serves the current `docs/GOAL.md` objective. New files or modules that aren't strictly needed for the current task are flagged.

### References

- Doug McIlroy — "Do one thing and do it well." The Unix Philosophy, Bell System Technical Journal (1978)
- Eric S. Raymond — *The Art of Unix Programming* (2003), ch. 1: "Rule of Modularity"
- Paul Graham — ["The Top Idea in Your Mind"](http://paulgraham.com/top.html) (2010). On why focus is a finite resource and unfocused projects lose to focused ones.
- Peter Drucker — *The Effective Executive* (1967). "If there is any one 'secret' of effectiveness, it is concentration."

---

## 2. YAGNI (You Aren't Gonna Need It)

### Definition

No speculative abstractions, no "just in case" code. Write the simplest thing that solves the current problem. Three similar lines are better than a premature abstraction.

### Rationale

Abstractions have a cost: indirection, naming, maintenance, and cognitive load for the next reader. That cost is only justified when the abstraction solves a real, repeated problem. Speculative abstractions solve imagined problems — and they're almost always wrong about the shape of the future. When the real need arrives, you'll refactor anyway because the premature abstraction doesn't fit. You pay the cost twice. Writing the obvious, inline solution costs less now and preserves your options for later.

### In Practice

Techlead flags premature abstractions, unused parameters, feature flags for unplanned features, and unnecessary helper functions. Three similar lines of code are preferred over a premature abstraction. If you can inline it, inline it.

### Anti-Patterns

- **Premature abstraction** — Creating a `BaseService` class when you have one service. Wait for the second (or third) case.
- **Config-driven everything** — Making values configurable "in case they change." Hard-code it. If it changes, you'll change it.
- **Unused parameters** — Adding function parameters for future callers that don't exist yet. They add noise and often end up wrong when the real caller arrives.
- **Speculative generalization** — Building a plugin system for an app that will only ever have one implementation. The abstraction layer is pure cost.
- **Helper functions for one call site** — Extracting a function used once doesn't reduce complexity. It just moves it and adds a name to remember.

### Enforcement

Techlead scans for speculative code: unused parameters, premature abstractions, feature flags for unplanned features, and new files or modules not strictly needed for the task. If an abstraction can be inlined, it gets flagged.

### References

- Kent Beck — *Extreme Programming Explained* (1999). YAGNI originates here as a core XP practice.
- Ron Jeffries — "You're NOT gonna need it!" The phrase was coined by Jeffries on the C2 Wiki during early XP development.
- Martin Fowler — ["Yagni"](https://martinfowler.com/bliki/Yagni.html) (2015). Distinguishes between presumptive and speculative generality.
- Sandi Metz — ["The Wrong Abstraction"](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction) (2016). "Duplication is far cheaper than the wrong abstraction."

---

## 3. Context-Aware Decisions

### Definition

No technology is adopted "because it's popular." Every architectural choice needs a reason tied to THIS project's context, recorded in an ADR (`adr/` tags in git).

### Rationale

Technology decisions are trade-offs, not best practices. Redis is great — unless your app has 10 users and an in-memory cache works fine. TypeScript is great — unless you're writing a 200-line script that'll never change. Every project has unique constraints: team size, performance requirements, deployment targets, existing stack. A decision that ignores those constraints is a liability dressed as a best practice. ADRs force you to write down the reasoning, which exposes weak justifications before they become load-bearing code.

### In Practice

Adding a new dependency or pattern triggers an ADR check. Use `/propose-architecture` to research options and record the decision with project-specific rationale. Techlead also checks whether a dependency's functionality could be implemented with the standard library in ~50 lines or less — if so, the dependency probably isn't worth it.

### Anti-Patterns

- **Resume-driven development** — Choosing a technology because you want to learn it, not because the project needs it.
- **Cargo culting** — "Netflix uses microservices, so we should too." Netflix has 10,000 engineers. You have three.
- **Undocumented adoption** — Pulling in a new ORM, state manager, or pattern without recording why. Six months later nobody remembers the reasoning and nobody dares change it.
- **Ignoring the standard library** — Reaching for `lodash.get` when optional chaining exists. Reaching for `axios` when `fetch` does the job. Every dependency is a maintenance commitment.

### Enforcement

When a new external dependency is added, Techlead checks for a corresponding ADR via `git tag -l "adr/*"`. Missing ADR? You'll be told to run `/propose-architecture` first. New architectural patterns also require an ADR.

### References

- Michael Nygard — ["Documenting Architecture Decisions"](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) (2011). The blog post that introduced the ADR format.
- Fred Brooks — "No Silver Bullet — Essence and Accident in Software Engineering," IEEE Computer (1986). There is no universal best practice — only context-dependent trade-offs.
- Rich Hickey — ["Simple Made Easy"](https://www.infoq.com/presentations/Simple-Made-Easy/), Strange Loop (2011). Distinguishes simplicity from ease — popular tools are easy, not necessarily simple for your context.

---

## 4. High Cohesion / Low Coupling

### Definition

Feature modules are self-contained. `features/A` never imports from `features/B`. Shared logic goes through `core/` or `shared/`. Every new cross-module dependency is a code smell.

### Rationale

When features import each other, changing one feature risks breaking another. This coupling compounds: feature A depends on B, B depends on C, and now a change to C requires understanding all three. Self-contained modules limit the blast radius of changes. You can modify, test, or delete a feature without tracing invisible dependency chains. The constraint feels rigid — until the first time you need to rip out a feature and it takes 20 minutes instead of 20 hours.

### In Practice

Techlead scans import paths. Cross-feature imports are flagged immediately with a suggestion to refactor through `core/` or use an event-based approach.

**The import rules:**
```
features/* → can import from core/, shared/, infra/
features/A → CANNOT import from features/B
core/      → cannot import from features/ or infra/
shared/    → cannot import from features/, core/, or infra/
```

### Anti-Patterns

- **Cross-feature imports** — `features/billing` importing a helper from `features/auth`. If both need it, it belongs in `core/` or `shared/`.
- **Shared mutable state** — A global store that multiple features read and write. This is coupling in disguise. Features should communicate through defined interfaces or events.
- **God modules** — A `utils/` folder that everything imports, growing without structure. If it's shared, give it a name that reflects its purpose.
- **Circular dependencies** — A imports B, B imports A. This always indicates a missing abstraction or a boundary in the wrong place.

### Enforcement

Techlead checks for import paths matching `features/X` → `features/Y` and flags them as violations. Shared mutable state, global singletons, and circular dependencies are also flagged. Module public APIs are checked for minimality — unexported internals should stay internal.

### References

- David Parnas — "On the Criteria To Be Used in Decomposing Systems into Modules," Communications of the ACM (1972). The foundational paper on information hiding and module boundaries.
- Larry Constantine & Edward Yourdon — *Structured Design* (1979). Introduced the formal definitions of cohesion and coupling that the industry still uses.
- Robert C. Martin — *Clean Architecture* (2017). The Dependency Rule: source code dependencies must point inward, toward higher-level policies.

---

## 5. Fail Fast

### Definition

No `TODO`, `FIXME`, `HACK`, `XXX`, or `WORKAROUND` in committed code. Fix it now or file an issue. Swallowed errors are bugs. Handle or propagate — never ignore.

### Rationale

Deferred problems compound. A `TODO` comment is a promise to your future self that you'll almost certainly break. It sits in the code, accruing context debt — the longer it stays, the harder it is to understand what the original author intended and why they deferred it. Swallowed errors are worse: they hide failures, making bugs appear downstream of their actual cause. Failing fast — at the point of the error, with a clear message — makes debugging straightforward. The 10 minutes you spend fixing it now save hours of detective work later.

### Anti-Patterns

- **TODO-driven development** — Scattering `TODO` markers as a substitute for actually solving problems. If it's worth noting, it's worth fixing or filing an issue.
- **Empty catch blocks** — `catch (e) {}` is not error handling. It's error hiding. Log it, propagate it, or handle it meaningfully.
- **Swallowed errors in callbacks** — Ignoring the `err` parameter in a callback. If the operation can fail, the caller needs to know.
- **Deferred validation** — Accepting bad input and hoping downstream code handles it. Validate at system boundaries and reject invalid data immediately.
- **"Fix later" PRs** — Merging known-broken code with a plan to fix it in a follow-up. The follow-up rarely arrives.

### Enforcement

Techlead scans changed files for `TODO`, `FIXME`, `HACK`, `XXX`, and `WORKAROUND` markers. If found, you must fix the issue now or create a tracked issue. Empty catch blocks, swallowed errors, and missing input validation at system boundaries are also flagged.

### References

- Jim Shore — "Fail Fast," IEEE Software (2004). The original articulation of fail-fast as a design principle: problems are easiest to fix at the point they originate.
- Andrew Hunt & David Thomas — *The Pragmatic Programmer* (1999), "Dead Programs Tell No Lies." A crashed program does less damage than a crippled one that keeps running with bad state.
- Michael T. Nygard — *Release It!* (2007, 2nd ed. 2018). Stability patterns for production systems — the cost of swallowed errors at scale.

---

## Enforcement Summary

| Philosophy | Enforcement Skill | What Gets Flagged |
|---|---|---|
| Single Goal | check-alignment, verify-code-quality | Code not connected to docs/GOAL.md, files not needed for current task |
| YAGNI | verify-code-quality | Premature abstractions, unused params, unnecessary helpers, extra files |
| Context-Aware | verify-code-quality | New dependencies without ADR, patterns replaceable by stdlib |
| High Cohesion / Low Coupling | verify-code-quality | Cross-feature imports, shared mutable state, circular deps |
| Fail Fast | verify-code-quality | TODO/FIXME/HACK markers, empty catch blocks, swallowed errors |

The `PreToolUse` hook fires before every `Write` or `Edit` call, prompting an alignment check. The verify-code-quality skill runs before commits and at task completion.
