---
title: "How to Easily Import Projects to GitHub - Professor Bear's Quick Tutorial | Humanitarians AI"
seoTitle: "Import a GitHub Project the Easy Way | Quick Guide"
description: "Professor Bear demonstrates GitHub's import tool for copying a repository, like the Humanitarians AI website, to your own account without forking."
summary: "Instead of forking a repository or downloading and re-uploading hundreds of files, GitHub's import tool at github.com/new/import copies a full project to your own account in one step."
keywords: ["github new import tool", "copy github repository without forking", "import project to github tutorial", "github fork vs import difference", "humanitarians ai github volunteer setup", "clone repository to own github account", "github import repository url", "vercel github repository mapping"]
generated: "article"
---

New volunteers at a nonprofit tech project usually need to do the same first thing before they can safely experiment: get their own copy of the codebase without touching the original. Professor Bear's quick tutorial walks through the fastest way to do that on GitHub, using the organization's own website repository as the example.

## Why not just fork it

The natural instinct when you want your own copy of a repository is to hit the fork button. Professor Bear is explicit about why that's the wrong move here: forking keeps the new copy connected to the original repository, which isn't what you want if the goal is to experiment freely on your own version. For a volunteer or fellow who wants to play with a project, whether it's the Humanitarians AI website itself or a new nonprofit site being built through the organization, a real, disconnected copy is the safer starting point. The example used throughout is the Humanitarians AI website, which is built in React and hosted on Vercel.

## The problem with downloading and re-uploading

Copying a project by hand, downloading every file and re-uploading it to a new repository, is described as a real pain once a project has hundreds or even thousands of files, which is the case for a full website codebase. That approach is technically possible through the command line too, but it's slow and easy to get wrong for anyone who isn't already comfortable with git. The tutorial's whole point is to skip that manual process entirely.

## Using GitHub's import tool

The actual method is GitHub's built-in import tool, reachable directly at github.com/new/import. The process has a few clear steps. First, you give the new repository a name, in this example keeping the same name as the source project, just landing on a different account (in the demo, moving from Professor Bear's personal GitHub to the Humanitarians AI GitHub). Next, you go to the source repository's code page and copy its URL, the same URL you'd use if you were cloning it via the command line. That URL gets pasted into the import tool's source field. Assuming you're already signed in with your GitHub credentials, the import then runs on its own.

## How long it takes

Import time scales with the size of the repository. A project the size of the Humanitarians AI website in the demo is estimated to take a minute or two, though the actual run in the video ran a bit longer than expected, plausibly due to a slow connection. For a much larger repository, the same import could take hours. Once it finishes, the new copy looks identical to the original, just living under a different account, in this case the Humanitarians AI GitHub instead of Professor Bear's own.

## Connecting the copy to Vercel

For anyone building a site the way Humanitarians AI does, using Vercel, there's one more step after the import finishes: go to Vercel, create a new project there, and map that project to the newly imported GitHub repository. That connection is what lets the hosting platform actually build and serve the copied site, rather than the GitHub copy sitting there as static code with nothing running it.

## Key takeaways

- Use GitHub's import tool, at github.com/new/import, to copy an existing repository to your own account rather than downloading and re-uploading files by hand.
- Importing is different from forking: an import creates a fully independent copy, while a fork stays connected to the original repository.
- The process only needs a new repository name and the source repository's URL, the same URL used for a command-line clone.
- Import time depends on repository size, from a couple of minutes for a modest project to potentially hours for a very large one.
- After importing a site's codebase, you still need to create a new project on the hosting platform (Verso, in this example) and map it to the imported repository to actually run it.

## Who this is for

This tutorial is aimed squarely at new Humanitarians AI volunteers and fellows who need their own working copy of a project, whether that's the organization's main website or a site being built for another nonprofit through the organization, before contributing changes back to the original. It assumes no deep git command-line experience.
