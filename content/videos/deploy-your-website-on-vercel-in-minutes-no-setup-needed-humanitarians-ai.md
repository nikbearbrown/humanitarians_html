---
title: "Deploy Your Website on Vercel in Minutes | No Setup Needed | Humanitarians AI"
seoTitle: "Deploy Your Website on Vercel in Minutes"
description: "A step-by-step walkthrough shows how to connect a GitHub repository to Vercel and get a live website URL in under a minute, with no server setup."
summary: "This walkthrough deploys a real GitHub project to Vercel from start to finish, showing how a repository turns into a live, shareable URL in about 30 seconds."
keywords: ["deploy website on vercel", "vercel deployment tutorial", "connect github to vercel", "deploy react app vercel", "vercel custom domain setup", "vercel free hosting tutorial", "how to host website vercel", "vercel import github repository"]
generated: "article"
---

Getting a website online used to mean configuring a server, or at least fighting with hosting settings until something worked. This walkthrough shows the alternative: connecting a GitHub repository to Vercel and watching a project go from source code to a live, shareable URL in about 30 seconds, with no server configuration at all.

## Connecting GitHub to Vercel

The process starts at vercel.com, where an existing account already has several projects listed. To add a new one, the workflow is a single black "Add New" button followed by "Project." From there, since the source lives on GitHub, the demonstration imports a fitness tracking web application directly from a connected GitHub account. If your GitHub isn't already linked to Vercel, the platform walks you through an authorization step first, asking you to grant Vercel access to your repositories before you can import anything from them.

## Configuring the project before deploying

Once the fitness tracker repository is selected, Vercel asks for a project name, which can be anything you choose, in this case "fitness activity tracker." It then asks you to confirm the framework. Vercel supports a long list of frameworks in its dropdown, including React and Next.js, but for a plain JavaScript project without a specific framework, "Other" works as the catch-all option. The setup screen also exposes the root directory setting, which matters most for full-stack projects: if your frontend code lives in a subfolder separate from your backend, this is where you point Vercel at the right source folder. Environment variables, for API keys or other configuration values, can be added at this same step, though the demo project didn't need any.

## From click to live URL

With the project name, framework, and root directory set, deployment is a single click on the "Deploy" button. The result is a live, production URL, and it happens fast, roughly 30 seconds from click to a working site. Back on the dashboard, the deployed project shows up under its chosen name with its live URL attached, following the pattern of project-name.vercel.app. Clicking into the deployments view confirms the build is live and currently in production.

## Customizing your domain

Vercel doesn't stop at the free subdomain. From the deployment view, you can assign a custom domain to the project or purchase one directly through the Vercel dashboard, which matters once a portfolio site or side project is ready to move off the default .vercel.app address and onto something more permanent.

## Key takeaways

- Vercel deployment starts by connecting a GitHub repository, authorizing access if it isn't already linked, and importing the specific project you want to host.
- Project setup involves naming the project, selecting a framework (or "Other" if none apply), and setting the root directory for full-stack projects.
- Environment variables for API keys or configuration can be added directly during setup.
- A single click on "Deploy" produces a live production URL in about 30 seconds, with no server configuration required.
- Custom domains can be connected or purchased directly from the Vercel dashboard after deployment.

## Try it yourself

If you have a project sitting in a GitHub repository and no live URL yet, this is a workflow you can repeat in one sitting: connect the repo, confirm the framework and root directory, and deploy. It's a practical entry point for students, designers, and developers who want a portfolio, side project, or hackathon build online fast, and it pairs well with other build-and-ship tutorials from Humanitarians AI.
