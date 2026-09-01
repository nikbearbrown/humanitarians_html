---
title: "HAI Project Manager explains: How to Upload Files to GitHub with No Code"
seoTitle: "Upload Files to GitHub with No Code: Full Guide"
description: "A step-by-step guide to uploading files to GitHub through the browser only, with no terminal or Git commands, including branches and pull requests."
summary: "Sanjana walks through uploading project files to GitHub entirely in the browser, from creating a private branch to opening a pull request, no terminal required."
keywords: ["upload files to github no code", "github drag and drop upload browser", "create branch github browser only", "github pull request no terminal", "github file size limit 25mb", "github vs google drive for video", "how to create pull request github", "github upload without git command line"]
generated: "article"
---

Git and the command line can feel like a wall between you and a simple task: getting your files into a shared project. This walkthrough skips that wall entirely. Everything happens in the browser, with no terminal and no Git commands, and it covers the whole path from creating your own branch to submitting a pull request for review.

## The golden rule: GitHub for text, Drive for video

Before touching any buttons, there's one rule to internalize: GitHub is for text and documents, a beat sheet, a script, a README, while Google Drive is for video and large media files. The dividing line isn't really about file type, though; it's about size. If a file is text and under 25 megabytes, it goes to GitHub. If it's a video or otherwise large, it goes to Drive. This matters even for text files: a 30-megabyte README is still text, but because it's over the 25-megabyte line, it goes to Drive and gets linked from GitHub instead. Size beats type, every time you're unsure.

## Step 1: creating your own branch

The first step is making a private branch to work in, rather than editing the shared main branch directly. That means clicking the button showing the current branch (typically labeled "main"), typing your name, and choosing to create a new branch from main. This gives you your own working copy of the project without any risk of stepping on someone else's changes.

## Steps 2 and 3: finding the right folder and starting the upload

Once on your own branch, the next move is opening the folder where your work belongs, in this case, the Fellows folder. From there, clicking "Add file" at the top opens the option to upload files, which brings up a page with a large dashed box for dropping files into.

## Steps 4 and 5: drag-and-drop in the browser

This is where your local file explorer comes in, Windows Explorer or Finder on a Mac. The key detail here is not opening your folder before dragging it; you want to see the folder itself sitting in its parent directory, then drag the whole folder onto the browser and drop it into the dashed box. GitHub will list every file inside the folder and keep the folder's name on the front of each file as it uploads. The advice is to wait for all files to finish uploading before moving on.

## Step 6: committing and opening a pull request

With the upload complete, scrolling down to "Commit changes" lets you add a short, clear commit message describing what you added, with "commit directly to your branch" selected. Clicking the green "Commit changes" button finalizes it on your branch, but since you're working on your own branch, your files aren't in main yet. That requires opening a pull request: set the base to main, compare it to your branch, and click "Create pull request." From there, a maintainer reviews it and merges it in.

There are two gotchas worth knowing before you start: GitHub caps uploads at 25 megabytes per file and 100 files at a time, and for drag-and-drop specifically, Chrome or Edge work reliably while Firefox and Safari can struggle.

## Handling big files with a Google Drive link

For anything too large for GitHub, the video and large-file side of the golden rule takes over. Upload your final videos, both the wide version and the vertical version, to the shared Drive folder, then share the file and copy the link so anyone with it can view it. Back in GitHub, paste that Drive link into your README so the video is easy to find directly from the repository, then commit that change too.

## Key takeaways

- The core rule is "size beats type": text and documents under 25MB go to GitHub, video and anything over that size goes to Google Drive with a link back in the README.
- Always work in your own branch rather than editing main directly, which keeps your changes isolated until they're reviewed.
- When dragging a folder into GitHub's upload box, drag the folder itself from its parent directory rather than opening it first.
- GitHub enforces hard limits of 25MB per file and 100 files per upload batch, and Chrome or Edge are the more reliable browsers for drag-and-drop uploads.
- A pull request, not a direct commit to main, is what gets your branch's changes reviewed and merged by a maintainer.

## Try it yourself

This tutorial comes from the Humanitarians AI Fellows program, aimed at fellows who need to contribute files to a shared project without learning Git from scratch. If you're on a similar project, try the same steps: copy your README template, swap in your own name, paste your Drive link for any large video files, and commit.
