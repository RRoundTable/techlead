# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Techlead is a Claude Code plugin that enforces project discipline through 5 core philosophies: Single Goal, YAGNI, Context-Aware Decisions, High Cohesion/Low Coupling, and Fail Fast. It has no runtime code — the entire plugin is markdown files (skills, commands, templates) interpreted by Claude Code.

## Dev Workflow

Test the plugin locally:
```bash
claude --plugin-dir /path/to/techlead    # one-off session
claude plugin add /path/to/techlead      # persistent install
```

Run evals after changing a skill description:
```bash
/eval-trigger <skill-name>     # verify trigger accuracy
/eval-behavior <skill-name>    # verify behavioral correctness
```

## Repository Structure

```
skills/           # All skills (SKILL.md + evals/)
.claude/commands/ # Developer-only commands (eval runners)
templates/        # Templates for GOAL.md, ROADMAP.md, SPEC.md, ARCHITECTURE.md, CLAUDE.md, ADRs, spec records
hooks/            # hooks.json — PreToolUse hook for alignment checks
docs/             # philosophy.md (5 philosophies reference), guide.md (user guide)
evals/            # Behavioral eval output (transcripts, grading)
autology/         # Separate plugin (git submodule) — knowledge management system
```

## Architecture

**Plugin manifest:** `.claude-plugin/plugin.json` registers skills and hooks with the Claude Code plugin system. `.claude-plugin/marketplace.json` is the marketplace listing metadata.

**Skills** (`skills/<name>/SKILL.md`) have YAML frontmatter with `name` and `description`. The description is what Claude sees to decide whether to invoke the skill — it is the single most important text for trigger accuracy. Each skill has `evals/trigger_evals.json` and `evals/evals.json` for testing.

| Skill | Purpose |
|-------|---------|
| `techlead-persona` | Core persona — pragmatic tone, 5 philosophies |
| `check-alignment` | Gate before code changes — verifies GOAL.md/ROADMAP.md/SPEC.md alignment |
| `verify-code-quality` | Pre-commit check against all 5 philosophies + spec conformance |
| `init-techlead` | Bootstrap GOAL.md, ROADMAP.md, SPEC.md, ARCHITECTURE.md, CLAUDE.md |
| `propose-architecture` | Architectural decisions: research, trade-off matrix, recommendation, ADR |
| `propose-spec` | Define/update feature specs as user-observable behaviors with Given/When/Then |
| `read-history` | Search and display ADRs and spec records from git tags |

**Hook** (`hooks/hooks.json`): A `PreToolUse` hook on `Write|Edit` that prompts Claude to verify GOAL.md/ROADMAP.md/SPEC.md alignment before code changes.

**ADRs** are stored as git commits on `adr/` branches, tagged with `adr/NNN-slug`. No ADR files exist — discovery is via `git tag -l "adr/*"` and reading via `git log <tag> --format="%B" -1`.

**Spec records** are stored as git commits on `spec/` branches, tagged with `spec/NNN-slug`. Same pattern as ADRs but for behavioral spec changes. Discovery via `git tag -l "spec/*"`.

## Eval System

Two eval types, both run via `.claude/commands/`:

- **Trigger evals** (`/eval-trigger <skill>`): Tests whether the skill description causes Claude to invoke it. Uses `claude -p` subprocesses with a stub plugin dir containing only the target skill. Queries are in `skills/<name>/evals/trigger_evals.json` with `should_trigger` labels.

- **Behavioral evals** (`/eval-behavior <skill>`): Runs paired agents (with-skill vs without-skill) in isolated worktrees, grades against assertions. Cases are in `skills/<name>/evals/evals.json`. Output goes to `evals/<skill>/<case>/`.

Key eval details:
- Trigger evals must unset `CLAUDECODE`, `ANTHROPIC_API_KEY`, `CLAUDE_CODE_SSE_PORT` to avoid deadlocks and billing errors
- Trigger evals use `--setting-sources ''` to isolate from global plugin settings
- Behavioral evals use `isolation: "worktree"` and require relative paths to avoid contaminating the real repo
- `evals/` is gitignored — eval output is ephemeral and regenerated on each run

## Current Eval Results

99% trigger accuracy across all skills. 100% behavioral pass rate with-skill vs 11% without-skill. See `EVAL_RESULT.md` for full breakdown.

## Working on Skills

When modifying a skill description, the primary constraint is trigger accuracy — the description must cause Claude to invoke the skill for the right queries and not for unrelated ones. After changing a description, run `/eval-trigger <skill>` to verify. Key lessons from past iterations:
- Explicitly list trigger patterns rather than using vague "always-active" framing
- Add "even if the user asks about just one specific sub-check" type directives for skills with multiple sub-behaviors
- Testing absence ("does NOT approve") is more discriminating than testing presence in behavioral evals

## The docs/ Directory

`docs/GOAL.md`, `docs/ROADMAP.md`, `docs/SPEC.md`, and `docs/ARCHITECTURE.md` are **example/fixture files** for this plugin's own development context (a hypothetical task management API). They are not the plugin's own governance docs. The `templates/` directory contains the actual templates used by `/init-techlead` to generate these files in user projects.
