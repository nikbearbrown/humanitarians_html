---
title: "Host a Website for Free Using GitHub Pages | No Server, No Cost | Humanitarians AI"
seoTitle: "Host a Website Free with GitHub Pages Tutorial"
description: "A beginner-friendly walkthrough of deploying a static site with GitHub Pages, from enabling the feature in settings to getting a live github.io link."
summary: "This beginner tutorial shows how to turn a GitHub repository into a free, live website using GitHub Pages, with no server setup or hosting cost."
keywords: ["host website free github pages", "github pages static site tutorial", "deploy website no server cost", "github.io free hosting beginner", "enable github pages settings", "github pages custom domain setup", "static website html css js hosting", "github pages deployment branch main"]
generated: "article"
---

Putting a website online usually comes with two obstacles: finding somewhere to host it, and paying for that hosting every month. GitHub Pages removes both. If your project is already sitting in a GitHub repository, you can turn it into a live, free website in a few clicks, with no server to configure and no credit card required.

## What GitHub Pages actually does

GitHub Pages lets you host a website directly from a GitHub repository, for free. The catch, and it's an important one, is that it only serves static websites: files made of HTML, CSS, and JavaScript, with no backend server or database behind them. That makes it a strong fit for portfolios, resumes, documentation sites, and small demo projects, but not for anything that needs server-side logic or a live database connection. If your project fits that description, all you need is a GitHub repository containing your project files.

## Turning on Pages in your repository

Getting a site live starts in your repository's settings. Under the "Code and automation" section, there's a "Pages" option. Opening it presents a few choices to fill in. The first is the deployment source, which branch GitHub Pages should build from, typically the main branch. The second is largely automatic: once a branch is set, GitHub assigns a standard URL in the format of your GitHub username followed by .github.io, with your project name appended, so the pattern looks like username.github.io/project-name for any project you host this way.

## Kicking off the build

Sometimes selecting the branch alone doesn't immediately trigger a deployment. If that happens, switching the source to "none" and then back to the main branch is enough to kick off the build process. From there, GitHub handles the deployment automatically, and it typically finishes in under a minute. A checkmark next to the Pages settings confirms the build and deployment completed successfully, and once that appears, the live link is ready to visit.

## Confirming the live site

After the build finishes, going back to the Pages settings section shows the live link directly. Following that link, formatted as username.github.io/project-name, opens the working site. For a project like a fitness tracking web app used as the example in this walkthrough, that link is the exact standard format anyone hosting a static project this way should expect to see, regardless of what the project itself does.

## Key takeaways

- GitHub Pages hosts static websites, HTML, CSS, and JavaScript, for free directly from a GitHub repository.
- It cannot host sites that depend on a backend server or database.
- Enabling it takes place under Settings, then the Pages option in the Code and automation section, where you choose the deployment branch.
- The resulting URL follows a standard pattern: your GitHub username, followed by .github.io, followed by the project name.
- If a deployment doesn't trigger automatically, toggling the source off and back on will kick off the build.
- A custom domain can be connected afterward for a more professional-looking URL.

## Try it yourself

If you already have a portfolio, resume site, or small HTML/CSS/JS project sitting in a GitHub repository, this is one of the fastest ways to get it online without paying for hosting. This kind of beginner-friendly walkthrough is part of the technical tutorials that Humanitarians AI shares to help people build and deploy real projects, not just learn concepts in the abstract.
