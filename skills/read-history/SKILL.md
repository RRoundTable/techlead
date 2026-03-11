---
name: read-history
description: >
  Search and display Architecture Decision Records (ADRs) and Spec Records. Use when the user
  types /read-history, wants to look up past decisions or spec changes, asks "why did we choose X?",
  asks "how has this spec changed?", or needs to review architectural or spec history. Supports
  both ADR tags (adr/*) and spec tags (spec/*). Use /read-history spec to list spec records,
  /read-history adr to list ADRs, or /read-history without a namespace to list both.
---

# /read-history

Look up Architecture Decision Records and Spec Records stored as git commits with `adr/` and `spec/` tags.

## Usage

```
/read-history                  # List all records (ADRs + specs)
/read-history adr              # List all ADRs
/read-history spec             # List all spec records
/read-history 3                # Show ADR #3
/read-history spec 2           # Show spec record #2
/read-history database         # Search all records for "database"
```

## Determine Namespace

Parse the user's input to determine the namespace:
- `/read-history adr ...` or `/read-history <number>` (no namespace) → ADR namespace (`adr/*`)
- `/read-history spec ...` → Spec namespace (`spec/*`)
- `/read-history` (no args) → both namespaces
- `/read-history <keyword>` (no namespace, non-numeric) → search both namespaces

## List All

1. Run `git tag -l "<namespace>/*" | sort` for the relevant namespace(s).
2. For each tag, show a summary: `git log <tag> --format="%s | %ad" --date=short -1`.
3. If no tags found for the namespace:
   - ADR: "No ADRs yet. Use `/propose-architecture` to record your first decision."
   - Spec: "No spec records yet. Use `/propose-spec` to define your first feature specification."

## Show by Number

1. Find the tag matching `<namespace>/NNN-*` via `git tag -l "<namespace>/NNN-*"`.
2. Display the full commit message: `git log <tag> --format="%B" -1`.
3. If not found, list available tags in that namespace.

## Search by Keyword

1. For each tag in `git tag -l "<namespace>/*"`:
   - `git log $tag --format="%B" -1 | grep -i "keyword"`
2. Show matching records with context.
3. If no results: "No records mention '[term]'. Try a different keyword or `/read-history` to list all."
