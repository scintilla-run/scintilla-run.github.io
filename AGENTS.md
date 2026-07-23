# Agent rules — scintilla-run.github.io

This repository is the standalone public marketing site for Scintilla.

- It is intentionally excluded from `scintilla-run-monorepo`; it is not a
  deployable Kubernetes application.
- GitHub Actions in this repository test and build only. Backend and cluster
  GitOps deployment belongs to the monorepo.
- Keep the generated `dist/` directory untracked.
- Do not place secrets or private runtime endpoints in browser assets.
- Preserve accessibility, reduced-motion behavior, and usable narrow layouts.
- History is append-only: never rebase, force-push, reset, or discard work.
