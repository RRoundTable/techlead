#!/usr/bin/env bash
# Session start hook: inject techlead-workflow skill as trigger guidance
set -euo pipefail

# Determine plugin root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
PLUGIN_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

_skill_file="${PLUGIN_ROOT}/skills/techlead-workflow/SKILL.md"

if [[ ! -f "$_skill_file" ]]; then
    echo "techlead session-start: skill file not found: $_skill_file" >&2
    exit 1
fi

_skill_content=$(cat "$_skill_file")

context="MANDATORY: You MUST follow the Techlead workflow below. These are binding rules, not suggestions.

SKILL ENFORCEMENT — you MUST invoke these skills automatically:
- check-alignment: BEFORE any code write or edit. Do not write code until alignment is verified.
- verify-code-quality: BEFORE committing, pushing, or finalizing code. Do not commit until quality passes.
- techlead-workflow: For code design trade-offs, YAGNI questions, pragmatic dev decisions.

USER-INVOKED skills (only when user explicitly requests):
- init-techlead: When docs/GOAL.md is missing or user runs /init-techlead
- propose-architecture: When user asks to compare technologies or runs /propose-architecture
- propose-spec: When user asks to define feature behavior or runs /propose-spec
- read-history: When user asks about past decisions or runs /read-history
- analyze-architecture: When user asks to scan/reverse-engineer project structure
- restructure-docs: When user asks to migrate docs or runs /restructure-docs

Full workflow guide follows:

${_skill_content}"

cat <<EOF
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": $(jq -n --arg s "$context" '$s')
  }
}
EOF

exit 0
