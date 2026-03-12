---
name: analyze-architecture
description: >
  Trigger when scanning an existing codebase to produce architecture documentation — reverse-engineering
  project structure, generating docs/ARCHITECTURE.md from source code, creating system diagrams, or mapping out
  services and components. Also trigger for "document this project's architecture", "what is the architecture
  of this codebase?", or "map out the services in this project". NEVER trigger for: code quality reviews,
  commit checks, defining feature specs, setting up project governance, choosing between technologies,
  implementing features, fixing bugs, or reading past decisions.
---

# Analyze Architecture

Scan an existing codebase and generate comprehensive architecture documentation with mermaid diagrams, layer-specific sections, and actual directory structure.

## Step 1: Scan Codebase

Read broadly to understand what exists:

- **Package files** — `package.json`, `pyproject.toml`, `go.mod`, `Cargo.toml`, `pom.xml`, `build.gradle`, `Gemfile`, `requirements.txt`, etc.
- **Config files** — `tsconfig.json`, `.eslintrc`, `babel.config`, `webpack.config`, `vite.config`, etc.
- **Docker / CI** — `Dockerfile`, `docker-compose.yml`, `.github/workflows/`, `Jenkinsfile`, `.gitlab-ci.yml`
- **Directory structure** — run `ls` and explore `src/`, `lib/`, `app/`, `cmd/`, `internal/`, `packages/`
- **Entry points** — `src/index.*`, `src/main.*`, `app.*`, `cmd/main.*`
- **Route / model files** — anything defining API routes, database models, or schemas
- **Infra configs** — Terraform, CloudFormation, Pulumi, Kubernetes manifests, serverless configs
- **Existing docs** — `README.md`, `docs/ARCHITECTURE.md`, `docs/`, `ADR/`

Do NOT read every file. Sample representative files from each directory to understand patterns.

## Step 2: Identify Project Type & Layers

Classify the project as one of:
- Web API / SPA / CLI / library / data pipeline / monorepo / mobile / desktop / other

List only layers that **actually exist** in the codebase:
- API (routes, controllers, middleware)
- Data (database, models, migrations, ORM)
- Frontend (UI framework, components, state management)
- Infrastructure (deployment, CI/CD, Docker, cloud)
- Auth (authentication, authorization)
- Messaging (queues, events, pub/sub)
- Core/domain (business logic)
- Shared/utils (cross-cutting concerns)

Do NOT invent layers that don't exist. If the project is a simple CLI with one entry point, it has one layer.

## Step 3: Decide Document Structure

Choose based on complexity:

- **Single `docs/ARCHITECTURE.md`** — when ≤3 layers or total content would be <200 lines
- **Multi-file `architecture/` directory** — when 4+ layers or any single layer needs >50 lines of documentation

Multi-file structure:
```
docs/architecture/
├── README.md           # System overview, tech stack, directory structure, layer index, import rules, constraints
├── api.md              # Routes, controllers, middleware
├── data.md             # DB schema, models, migrations
├── infrastructure.md   # Deployment, CI/CD, Docker, cloud
├── frontend.md         # UI framework, components, state management
├── <layer>.md          # Any other project-specific layer
```

Filenames adapt to the project's own terminology. Only create files for layers that exist.

## Step 4: Decide Which Mermaid Diagrams Fit

Always include:
- **System overview flowchart** — high-level component/service relationships

Conditionally include:
- **Sequence diagrams** — when there are complex multi-step flows (auth, payment, etc.)
- **ER diagrams** — when there are 3+ database tables/models
- **Deployment diagrams** — when there are multiple services, containers, or cloud resources
- **Component diagrams** — when there are 3+ distinct services or packages

Don't force diagrams that add no value. A CLI tool needs a flowchart, not an ER diagram.

## Step 5: Generate Documentation

Fill all sections from **actual codebase findings**:

### For README.md (or single docs/ARCHITECTURE.md):

1. **System Overview** — mermaid flowchart showing components and their relationships
2. **Tech Stack** — table with Layer / Choice / Version columns, sourced from package files
3. **Directory Structure** — actual `tree` output or equivalent, annotated with what each directory contains
4. **Layer Index** — links to layer-specific docs (multi-file only)
5. **Module Structure** — how code is organized, actual import patterns
6. **Import Rules** — observed conventions (if any), or recommendations based on current structure
7. **Key Patterns** — recurring patterns found in the code (middleware chains, repository pattern, etc.)
8. **Constraints** — hard limits observed (env requirements, platform constraints, etc.)

### For layer-specific files:

Document what's actually there — routes with their handlers, models with their fields, infra with its topology. Use the project's own terminology and naming.

### Writing guidelines:

- **Descriptive, not prescriptive** — document what IS, not what SHOULD BE
- **Use the project's own terminology** — if they call it "handlers" not "controllers", use "handlers"
- **Note code smells objectively** — "Module A imports directly from Module B's internals" is objective. "This code is terrible" is not.
- **Include file paths** — reference actual files so readers can find what's described
- **Keep it current** — only document what exists in the code right now

## Step 6: Present and Iterate

After generating the documentation:

1. Show a summary of findings:
   - Project type identified
   - Layers found
   - Document structure chosen (single vs multi-file)
   - Diagrams included
   - Any notable code smells or architectural observations

2. Ask the user:
   > I've generated architecture docs based on the codebase scan. Does this accurately capture the system? Any corrections, missing components, or terminology changes?

3. Iterate on feedback before finalizing.

## Constraints

- Does NOT create ADRs or modify other governance docs (docs/GOAL.md, docs/ROADMAP.md, docs/SPEC.md)
- Only produces architecture documentation
- Does not recommend changes — that's `/propose-architecture`'s job
- If `docs/ARCHITECTURE.md` already exists, ask before overwriting
