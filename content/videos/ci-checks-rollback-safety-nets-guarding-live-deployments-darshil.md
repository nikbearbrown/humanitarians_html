---
title: "CI Checks & Rollback Safety Nets: Guarding Live Deployments | Darshil"
seoTitle: "CI Checks and Manual Rollback for Live Deploys"
description: "Darshil explains why automated CI checks can only warn on a pull request, and how a separate manual rollback workflow actually protects live services."
summary: "Darshil walks through two GitHub Actions workflows guarding a live medical diagnosis app: an automatic CI check that can only warn, and a manual, double-guarded rollback that switches Cloud Run traffic back to a known-good image."
keywords: ["how to set up ci checks for github pull requests", "why cant ci block a pull request merge", "manual rollback workflow for cloud run deployments", "github free tier branch protection limitations", "how to roll back a bad deployment without rebuilding", "vitest and eslint in a github actions pipeline", "artifact registry image tag validation before deploy", "ci pipeline passes but deployment still breaks production"]
generated: "article"
---

Darshil walks through two GitHub Actions workflows built to guard a live medical diagnosis application: one that checks every pull request automatically, and one that undoes a bad deployment on command. The video is a plain account of what each workflow actually catches, and just as importantly, where each one's authority stops.

## What the CI pipeline actually runs

The CI workflow fires automatically whenever a pull request is opened or updated against dev, stage, or master, no push trigger, no manual button, nothing for a person to remember. It runs four steps in order: check out the PR's exact code, install Node 20, run a locked `npm ci` install, then lint. Lint is set to continue-on-error on purpose, since a style warning should not block the pipeline the way a real failure should. The last two steps are stricter: run the Vitest suite covering the diagnosis-merging logic and token storage, and build the same Vite build that produces the real bundle, which is not continue-on-error, a failing test or a failing build fails the whole job.

## The limit of a red X

Darshil is direct about what CI cannot do: it can show a red X on a pull request, but it cannot stop the merge button from being clicked. Real enforcement needs GitHub's paid branch-protection feature, and the org's free plan only allows that on public repos, not an option here, since the codebase touches patient diagnosis logic. He demonstrates this directly on PR-2: a test assertion is deliberately changed to something obviously wrong. Checkout, node install, and lint all pass; the test step fails at about 20 seconds; a red X lands on the PR. The merge button stays clickable. It is a warning, not a block.

## The rollback pipeline: a deliberate, manual decision

Because CI catches a bug before merge but does nothing once something bad is already live, a second workflow handles rollback: switching a running environment back to a version that already worked, without rebuilding anything. Unlike CI's automatic PR trigger, or the deploy workflow's automatic tag trigger, rollback only runs when someone deliberately clicks a button and supplies two inputs, which environment, and the exact version tag to restore. That friction is intentional; a rollback is a decision, never an accident.

## Two guards before anything happens

Before touching the running environment, the workflow checks that the version tag actually matches the chosen environment: dev only accepts dev tags, stage only accepts stage tags, master only accepts bare version tags. Pick dev but type a stage tag by mistake, and it stops immediately with a clear error instead of rolling back the wrong environment. The second guard looks up the exact image tag in Artifact Registry before deploying anything, a typo like `dev0.01` instead of `dev-0.0.1` fails here, loudly, rather than partway through an actual deployment to a live service. Only after both guards pass does it run the same `gcloud run deploy` command the deploy workflow uses, pointed at the old image instead of a freshly built one, which is why it finishes much faster than a real deploy.

## Key takeaways

- CI runs automatically on every pull request but can only warn, the free-tier plan cannot block a merge on a private repo.
- The CI pipeline's steps, in order: checkout, Node install, lint (continue-on-error), Vitest, Vite build (both blocking).
- Rollback only runs when a person deliberately triggers it with an environment and a version tag.
- Guard one checks the tag matches the environment; guard two checks the exact image exists in Artifact Registry.
- Rollback repoints Cloud Run traffic to an existing image rather than rebuilding, which is why it is fast.

## Who this is for

Engineers maintaining a live service on a limited GitHub plan who need to understand exactly what automated checks protect against, and why a separate, deliberately manual rollback path is what actually recovers from a bad deploy.
