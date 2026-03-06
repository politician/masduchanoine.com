# AI Maintenance Playbook (safe mode)

This project is maintained by a beginner with AI support. The goal is to keep changes **small, explicit, and verifiable**.

## 1) Standard flow for every change

1. Create a PR (never push direct to `main`).
2. Keep the PR focused on one objective.
3. Fill all items in the PR template.
4. Make CI pass.
5. Merge only after review.

## 2) CI gates used in this repo

- `CI` workflow runs:
  - `npm run build`
  - `npm run validate`
  - `npm run check:links`
- `PR Guardrails` workflow enforces:
  - PR checklist completion
  - explicit override token for sensitive file edits

## 3) Sensitive files policy

Changes in these files are high-risk and need extra scrutiny:

- `.github/workflows/*`
- `package-lock.json`
- `astro.config.mjs`
- `tailwind.config.mjs`

If changed, the PR must explain why and include `[override-guardrails]` in the PR body.

## 4) Branch protection (set once in GitHub)

In repository settings → Branches → `main`:

- Require a pull request before merging
- Require status checks to pass before merging:
  - `quality` (from CI workflow)
  - `guardrails` (from PR Guardrails workflow)
- Require conversation resolution before merging
- Disable force pushes

## 5) Emergency rollback

If a bad change is merged:

1. Revert the merge commit in GitHub.
2. Wait for CI + deploy to finish.
3. Re-open a corrected PR with narrow scope.

## 6) Keep maintenance predictable

- Prefer content-only edits for routine updates.
- Batch technical upgrades in dedicated PRs.
- Never mix SEO/content updates with infra/workflow updates.
