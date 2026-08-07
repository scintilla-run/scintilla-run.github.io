# scintilla-run.github.io

Public Astro marketing site for Scintilla. This repository is intentionally
outside the deployable monorepo; its GitHub Actions build and test only.

GitHub Pages landing site for **Scintilla** — a BEAM-powered lambda runtime with
warm processes, twelve runtimes, durable workflows, weighted revisions and
aliases, and fail-closed invocation authentication.

The page is deliberately static: no browser JavaScript, analytics, private
runtime endpoints, or credentials. Its in-document policy refuses scripts,
connections, frames, forms, objects, and workers; GitHub Pages still owns the
HTTP response headers and deployment boundary.

Served at https://scintilla-run.github.io from the main branch root. See
[AGENTS.md](AGENTS.md) for repository rules.
