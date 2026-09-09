---
title: "Darshil Explains: Building a Tag-Based CI/CD Pipeline on Google Cloud"
seoTitle: "Tag-based CI/CD pipeline to GCP Cloud Run"
description: "Darshil walks through building a tag-based CI/CD pipeline that deploys a React frontend to Cloud Run using shared Workload Identity Federation."
summary: "Darshil builds a tag-based CI/CD pipeline for a doctor-facing sepsis diagnosis frontend, reusing an existing Workload Identity Federation pool and shipping a two-stage Docker container to Cloud Run only when a git tag is pushed."
keywords: ["how to set up tag based ci cd on google cloud", "reuse workload identity federation across repos", "two stage dockerfile node and nginx react app", "deploy react vite app to gcp cloud run", "github actions workload identity federation setup", "why deploy on git tag instead of every commit", "cloud run iam binding for public access", "vite build arguments baked into bundle"]
generated: "article"
---

Darshil walks through what had to exist before a code push could turn into a running service for Medas, the frontend of an AI-assisted sepsis diagnosis tool doctors use to review output. The video covers the GCP trust chain, the application itself, and the tag-based pipeline that ties the two together.

## Setting up a place for the built image to live

The first step is creating a dedicated Artifact Registry repository for the frontend, in the same GCP project and region the backend already uses. There is no need to duplicate infrastructure that already exists elsewhere in the project; the frontend just needs its own registry entry within it.

## Reusing an existing identity path instead of building a new one

Rather than standing up a second Workload Identity Federation pool for the frontend, Darshil reuses the one the backend already has. The existing GitHub provider inside that pool currently trusts only the backend's repository, so its attribute condition gets widened to also accept the frontend repo. That lets both repositories authenticate through the same door. Recognition alone is not enough, though: the shared GitHub Actions service account still has to explicitly agree to be impersonated by the new repository, with a role binding scoped to exactly that repo.

## Configuring GitHub secrets and variables

On the GitHub side, a new environment named "dev" holds two secrets and seven variables. Neither secret is a long-lived credential; they are just the provider path and the service account email needed to request a token. The variables assemble the image tag and point the deployment at the correct project, region, and service.

## What the app itself looks like

Before getting into the pipeline, Darshil covers what it actually ships: a Vite and React frontend for doctors reviewing AI-assisted sepsis diagnosis output. The app gates access, no token, no diagnostic view. The doctor-facing pieces live under components: diagnosis editing, sepsis panels and an output table, a dialogue thread, and a microphone button for voice input.

## Deciding when a deploy should actually happen

With the trust chain and the app both ready, nothing yet tied a code change to a running service; every deploy had been a manual build on someone's machine. The design decision here is a tag-based CI/CD pipeline: pushing a tag triggers a build, push, and deploy, rather than triggering on every commit. Only a tag like `dev`, `stage-v`, a bare `v`, or a push to master triggers a build. Tagging is treated as the moment someone decides a given commit is promotable, not the moment it was written.

## Building a lean two-stage container

The container build has two stages. A Node stage builds the Vite app, with the API URL and version baked in as build arguments, because Vite inlines these values into the bundle at build time rather than reading them at container runtime. A clean Nginx image then serves only the built dist folder; none of the Node toolchain ships in the final image. The workflow authenticates using the identity set up earlier, builds the image with the variables from the dev environment, pushes it to the Artifact Registry repository, and deploys it as a new Cloud Run revision using the same service account throughout.

## The IAM step outside the workflow file

One step lives outside the workflow file itself: some org policies block public access even when "allow unauthenticated" is set on the service. The Cloud Run service needed an explicit IAM binding granting access to all users before doctors could actually reach it.

## Key takeaways

- Reuse an existing Workload Identity Federation pool for a new repository by widening the provider's attribute condition, rather than standing up a second identity path.
- A shared service account still needs an explicit role binding scoped to the new repository before it can be impersonated.
- Deploying only on git tags, not every commit, makes tagging the explicit signal that a commit is promotable.
- Vite bakes build-time variables like API URL and version directly into the bundle, so they must be passed as Docker build arguments, not runtime environment variables.
- A two-stage Docker build (Node to build, Nginx to serve) ships only static files in the final image, with no Node toolchain included.
- Public access on Cloud Run can require an explicit IAM binding even with "allow unauthenticated" set, depending on org policy.

## Who this is for

Developers setting up or extending a GCP-based CI/CD pipeline, especially teams with an existing backend deployment who want to add a frontend repository without duplicating the identity and trust infrastructure.
