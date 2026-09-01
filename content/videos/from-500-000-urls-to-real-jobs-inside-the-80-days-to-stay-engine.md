---
title: "From 500,000 URLs to Real Jobs: Inside the 80 Days to Stay Engine"
seoTitle: "80 Days to Stay: Turning 500,000 URLs Into Job Leads"
description: "A behind-the-scenes look at the bot scraping 500,000 company pages to build a job-lead database for the 80 Days to Stay engine, one site at a time."
summary: "An update on the scraper chewing through 500,000 pages overnight, sorting duds from real job leads, and the plan to narrow that pool to 5,000 high-quality companies."
keywords: ["80 days to stay job search tool", "web scraping for job leads", "finding jobs after opt f1 deadline", "automated job lead database", "scraping company career pages", "resume matching job search tool", "500000 urls job scraper", "job search automation for international students"]
generated: "article"
---

Overnight, a bot ran through roughly 50 sites at a time, in parallel, pulling whatever it could find. By morning it had chewed through a huge slice of an initial pool of about 500,000 pages, and the job now is figuring out what's actually usable in that pile. Some of what came back is dead weight. Some of it is exactly what the project needs.

This is an inside look at the 80 Days to Stay engine, the system behind a job search tool built to turn a mass of scraped web pages into a short list of real opportunities people can actually apply to.

## Sorting the duds from the gold

The first pass through the results is basic triage. Some sites return a single page with nothing useful on it, maybe because the content sits behind a login, maybe for reasons that aren't obvious from the outside. Those get marked for a retry later or set aside entirely as not worth pursuing. The next site checked in this pass looks completely different: a real company, clearly identifiable, in this case an insurance company, with a solid about page, detailed company information, and multiple career-related pages, careers one, careers two, a jobs page, specific listings. That's the kind of result the whole pipeline exists to find, a site with enough structure and detail to extract something genuinely useful.

## Narrowing 500,000 down to 5,000

The plan is to take that initial pool, roughly 500,000 pages, and narrow it down to around 5,000 high-quality leads. That narrowing isn't random filtering; it means annotating what each company actually offers, what kinds of roles they're posting, including whether a listing labeled "senior" is genuinely senior or just labeled that way, and then pushing all of that structured information into a database. One example found in this pass was a listing for a senior security role. Whether that role is actually out of reach for an entry-level candidate depends on the specific skills required, not just the seniority label attached to the title, which is exactly the kind of nuance that makes manual annotation worth doing instead of relying on the label alone.

## Speed now, precision later

The immediate goal is deliberately narrow: get usable lists into people's hands within the next couple of days, not wait for a perfect system. That means taking one pass through everything, getting the initial 500,000 down to a workable 5,000, and shipping that list so people can start applying. The plan is to come back afterward and clean up everything the first pass couldn't get, at a slower, more careful pace.

## The longer-term tool: upload a resume, get matched

Past the immediate list, there's a bigger tool being planned. The idea is an intelligent search: someone uploads their resume, and the system scans everything collected in this process to match them against likely opportunities automatically. That's a bigger build, estimated at around a month to get to something sophisticated, which is why it's being treated as the next phase rather than this week's deliverable.

## Why build this at all

The reasoning behind the whole project is stated plainly: a tool like this should already exist. Job seekers, and especially those working against a tight timeline, shouldn't have to manually comb through hundreds of company websites looking for real, current openings. Since that tool doesn't exist yet, the 80 Days to Stay engine is being built to fill that gap directly, starting with brute-force scraping and moving toward something closer to automated matching.

## Key takeaways

- The scraping bot runs roughly 50 sites in parallel and has pulled data from a pool of about 500,000 URLs.
- Results get sorted quickly: sites needing a login or offering nothing useful are set aside, while sites with clear about pages and multiple job listings are flagged as high-value.
- The plan is to narrow 500,000 pages down to about 5,000 annotated, high-quality leads, tracking what roles each company posts and their actual skill requirements.
- The near-term goal is getting a usable list into people's hands within days; deeper cleanup and refinement come afterward at a slower pace.
- A longer-term tool is planned that lets someone upload a resume and get automatically matched against the collected database, expected to take about a month to build.

## Who this is for

This project update is for anyone following the 80 Days to Stay engine, a Humanitarians AI initiative built to help people find real job leads quickly by turning a massive scrape of company websites into a usable, annotated database rather than making job seekers search company by company on their own.
