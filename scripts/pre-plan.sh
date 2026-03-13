#!/usr/bin/env bash
# PreToolUse hook for EnterPlanMode: inject techlead-workflow skill before planning
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
PLUGIN_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

_skill_file="${PLUGIN_ROOT}/skills/techlead-workflow/SKILL.md"

if [[ ! -f "$_skill_file" ]]; then
    echo "techlead pre-plan: skill file not found: $_skill_file" >&2
    exit 1
fi

cat "$_skill_file"

exit 0
