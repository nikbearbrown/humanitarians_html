---
title: "Ultimate Web Scraping with Crawlee.dev: JavaScript Framework Deep Dive | Humanitarians AI Fellows"
seoTitle: "Crawlee.dev Web Scraping Framework: Full Code Walkthrough"
description: "A hands-on look at Crawlee.dev, Apify's JavaScript scraping framework, with a working PlaywrightCrawler example and a comparison to Scrapy and Selenium."
summary: "A code-first tour of Crawlee.dev, the JavaScript web scraping framework from Apify, covering a working PlaywrightCrawler script, its use cases, and how it stacks up against Scrapy, Selenium, and BeautifulSoup."
keywords: ["crawlee dev web scraping tutorial", "playwrightcrawler code example", "crawlee vs scrapy selenium", "headless browser web scraping", "javascript web scraping framework", "apify crawlee tutorial", "queue based web crawler architecture", "anti-bot rate limiting scraping", "protonvpn web scraping ip ban", "puppeteer vs playwright crawler"]
generated: "article"
---

Most people trying to scrape a JavaScript-heavy website end up stitching together two or three tools: something for HTTP requests, something for headless browser control, and their own hand-rolled logic for retries, queues, and rate limits. Crawlee.dev, an open-source framework built by Apify, tries to fold all of that into one interface. This walkthrough covers what it actually does, reviews a real script that crawls a Wikipedia page, and lays out when Crawlee is the right tool versus when something simpler will do the job better.

## What Crawlee actually is

Crawlee supports three different crawler types under one interface: CheerioCrawler for fast, simple HTML parsing, PuppeteerCrawler, and PlaywrightCrawler for full headless browser automation. Because all three live inside the same framework, switching between a lightweight HTTP-based approach and a full browser-driven approach for JavaScript-heavy sites is mostly a matter of swapping which crawler class you import, rather than rewriting your scraping logic from scratch.

## Walking through a working PlaywrightCrawler script

The demonstration script imports PlaywrightCrawler from Crawlee along with Playwright itself, plus Chromium from Playwright. An `ensureBrowser` step checks whether Chromium is installed and installs it if needed, so the script can guarantee it has a working browser before crawling starts. From there, a configuration object sets the crawl parameters, including `maxRequestsPerCrawl`, which caps how many pages the crawler will visit (the example is set to crawl 50 pages by default, though it's dialed down to 10 for a faster demo run), and launch options like `headless`. With headless mode on, the crawl runs invisibly in the background; setting it to false pops open an actual browser window so you can watch pages load and get crawled in real time.

The core logic sits inside the request handler. For each page, it waits for the page to load fully, then extracts the title, metadata, description, paragraphs, and links, and saves that data to a dataset. Any links found on the page get pushed onto a queue, which the crawler keeps pulling from until it hits the request cap, here capped at 10 for the demo. A simple error handler logs anything that goes wrong during the crawl. Starting the crawler is a single command, running the script file with Node, and in the demo it visits Wikipedia's page on web scraping, following internal links, saving each page's title, URL, paragraphs, and links to a growing dataset, along with session statistics for the run.

One practical note that comes up before the demo starts: some websites enforce rate limits, and exceeding them can get your IP address banned outright, which creates real headaches. The suggestion is to run scraping traffic through a VPN, with the free tier of ProtonVPN mentioned as one option, specifically to avoid that risk.

## Where Crawlee shines

Crawlee's use cases span data collection, market research, academic studies, and training data for AI systems. It's also useful for SEO monitoring, tracking keyword rankings and competitor strategies, for e-commerce price tracking, and for lead generation and content aggregation, things like pulling in news, blog posts, and social media content at scale.

The advantages that stand out: built-in anti-bot handling that manages rate limits, retries, and CAPTCHA-solving; high scalability through its queue-based architecture, which supports running multiple crawlers against a shared backlog of URLs; full headless browser support for sites that require real JavaScript execution; flexible middleware for custom data processing logic; and solid documentation and community support backed by Apify.

## Where it falls short

No tool is a fit for every job. Crawlee has a steeper learning curve than simpler libraries, which can be a real barrier for beginners. It's also more resource-intensive, doing large-scale crawls comfortably requires decent CPU and RAM. And it's not the right choice when a site already offers a clean API, since hitting that API directly will almost always be more efficient and reliable than scraping rendered pages for the same data.

## Crawlee versus the alternatives

Compared to Scrapy, which handles static HTML well but struggles with JavaScript-rendered content, Crawlee's browser automation gives it a real edge on modern, JavaScript-heavy sites. Compared to Selenium, which is built primarily for testing, Crawlee is designed from the ground up for large-scale scraping. Compared to BeautifulSoup, which is excellent at parsing HTML but has no built-in automation or crawling logic of its own, Crawlee handles the entire pipeline: fetching, rendering, queueing, and extraction. That said, each of those tools still has its place: BeautifulSoup is faster and simpler for basic static HTML scraping, a site's own API beats scraping it entirely when one is available, and Selenium or Playwright directly still make sense when a task specifically requires interacting with a page's GUI.

## Key takeaways

- Crawlee.dev is an open-source JavaScript scraping framework from Apify that unifies CheerioCrawler, PuppeteerCrawler, and PlaywrightCrawler under one interface.
- The demo script uses PlaywrightCrawler with a request handler that extracts page title, metadata, paragraphs, and links, then queues discovered links for further crawling.
- `maxRequestsPerCrawl` caps how many pages a run will visit, and toggling `headless` lets you watch the crawl happen in a real browser window instead of running it invisibly.
- A VPN, ProtonVPN's free tier was suggested, helps avoid IP bans from sites that enforce rate limits.
- Crawlee's biggest strengths are anti-bot handling, queue-based scalability, and full headless browser support; its costs are a steeper learning curve and heavier resource use.
- When a target site has its own API, use the API. Scraping is the fallback, not the default.

## Who this is for

This tutorial was produced as part of the Humanitarians AI Fellows program and is aimed at both beginners and experienced developers who need to build large-scale data extraction pipelines. If you already know basic JavaScript and want a single framework that handles headless browsers, queues, and anti-bot protection without hand-building each piece yourself, this walkthrough gives you a working starting point.
