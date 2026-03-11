---
name: read-history
description: >
  Search and display Architecture Decision Records (ADRs). Use when the user types /read-history,
  wants to look up past decisions, asks "why did we choose X?", or needs to review architectural
  history before making a new decision.
---

# /read-history

Look up Architecture Decision Records stored as git commits with `adr/` tags.

## Usage

```
/read-history                  # List all ADRs
/read-history 3                # Show ADR #3
/read-history database         # Search ADRs for "database"
```

## List All

1. Run `git tag -l "adr/*" | sort`.
2. For each tag, show a summary: `git log <tag> --format="%s | %ad" --date=short -1`.
3. If no tags found: "No ADRs yet. Use `/propose-architecture` to record your first decision."

## Show by Number

1. Find the tag matching `adr/NNN-*` via `git tag -l "adr/NNN-*"`.
2. Display the full commit message: `git log <tag> --format="%B" -1`.
3. If not found, list available ADR tags.

## Search by Keyword

1. For each tag in `git tag -l "adr/*"`:
   - `git log $tag --format="%B" -1 | grep -i "keyword"`
2. Show matching ADRs with context.
3. If no results: "No ADRs mention '[term]'. Try a different keyword or `/read-history` to list all."
