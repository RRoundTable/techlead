---
name: read-history
description: >
  Search and display Architecture Decision Records (ADRs). Use when the user types /read-history,
  wants to look up past decisions, asks "why did we choose X?", or needs to review architectural
  history before making a new decision.
allowed-tools: Read, Glob, Grep
---

# /read-history

Look up Architecture Decision Records.

## Usage

```
/read-history                  # List all ADRs
/read-history 3                # Show ADR #3
/read-history database         # Search ADRs for "database"
```

## List All

1. Read `docs/adr/000-index.md`.
2. Show the table.
3. If empty: "No ADRs yet. Use `/propose-architecture` to record your first decision."

## Show by Number

1. Find the file matching `docs/adr/NNN-*.md` for the given number.
2. Display it.
3. If not found, list available ADR numbers.

## Search by Keyword

1. Grep through all `docs/adr/*.md` files for the search term.
2. Show matching ADRs with context around the matches.
3. If no results: "No ADRs mention '[term]'. Try a different keyword or `/read-history` to list all."
