---
title: "80 Days to Stay"
seoTitle: "80 Days to Stay: Connecting Talent to Startups"
description: "A free platform project using public SEC data to connect visa holders facing layoffs with funded startups that can sponsor them but don't know it yet."
summary: "When mass layoffs put H1-B holders on a 60-day clock, most funded startups that could sponsor them don't even know the option exists. This project uses public SEC filings to close that gap."
keywords: ["h1b layoff 60 day deadline job search", "sec form d startup funding data", "visa sponsorship funded startups jobs", "international student visa job search", "80 days to stay humanitarians ai", "opt volunteer data engineering project", "hidden job market startups visa sponsorship", "h1b visa startup sponsor database"]
generated: "article"
---

Mass layoffs at major tech and finance companies create a specific, brutal deadline for one group of employees: internationals on an H1-B visa who lose their job get 60 days to find another one that pays roughly what they were making, in a job market where AI is already disrupting hiring across the board. 80 Days to Stay is a new Humanitarians AI initiative built in direct response to that problem, and it starts with a simple bet: the jobs these people need already exist, they're just hidden.

## The bridge Humanitarians AI already builds

Humanitarians AI's existing purpose is to serve as a bridge, letting people continue doing serious AI research and continue their education through volunteer work, up to a year, until they land a strong job. Without that bridge, someone would face a 90-day window to find work in a market where AI is disrupting hiring across the board. This new problem, the 60-day clock facing laid-off H1-B holders at large companies, is a variation on the same underlying issue, arriving through a different door.

## Where the 80 days comes from

Companies doing layoffs typically give a couple of weeks' notice, which is standard practice, and then the affected employee has 60 days after their last day to find qualifying work. Add those together and you get roughly 80 days total, which gives the project its name, with an intentional nod to Around the World in Eighty Days as well. The framing here is a kind of public, daily working log: what can actually get built, and shipped, in that same 80-day window, aimed at helping this specific group of people.

## The real problem: two groups that aren't connecting

The read on the underlying problem is specific. Large, well-known companies, the Microsofts and Goldman Sachses of the world, have entire teams that understand visa sponsorship and H1-B processes. But those companies make up a small slice of total US employment, maybe one to three percent of the economy, not the majority of available jobs. Meanwhile, AI has driven a wave of startup funding, with companies raising anywhere from one million to over a hundred million dollars and needing to hire aggressively. The problem is that a large share of these funded startups avoid hiring internationally not because they've decided against it, but because visa sponsorship is unfamiliar territory to them, and the actual requirement is mostly paperwork and straightforward compliance that low-cost services can handle on their behalf. Talented people need jobs. Funded startups need talent. The two sides simply aren't connecting, and there isn't an existing tool built specifically to surface this hidden market, as opposed to the many tools that just aggregate listings from companies like Microsoft or Tesla that are already well known.

## The plan: a searchable database of funded startups

The proposed fix is a free, searchable platform connecting funded startups with talent, including international talent, and giving those startups direct information about the visa process along with pointers to services that can handle the paperwork for them. It's explicitly designed to work for everyone, not just international candidates, while giving those candidates, whose presence already helps fund US universities, another real avenue beyond the small set of companies that already understand visa sponsorship.

## Day one: finding the data

Every version of this idea starts with the same question: where do you get reliable data on which startups actually have funding? The answer turned out to be public record. Any US company that raises money from investors, including angel investors, is required to file with the SEC, specifically a Form D filing, even as a private company. That filing discloses the company's name, address, and how much money it raised. Full public-offering disclosures aren't the target here; the funding data alone is enough to identify which companies plausibly have the resources to hire.

Because it's a government filing, companies have a strong incentive not to misstate it, and larger companies, the ones with a million dollars or more in funding, are especially unlikely to skip the filing given the compliance risk. The companies most likely to miss filing tend to be very small ones that simply aren't aware of the requirement, since they don't have a legal team flagging it for them, which is a reasonable trade-off for a project focused on startups with real hiring capacity.

## Why this beats existing data services

Commercial alternatives exist, but they're framed here as expensive relative to what they actually deliver, on the order of $99 a month for the ability to look up a handful of companies and export a small spreadsheet, or a paid LinkedIn Sales Navigator-style subscription. SEC Form D data, by contrast, is free, public, and comes directly from an investor-verified government filing rather than a scraped or inferred source. Getting it is mechanical: the SEC's website provides downloadable XML files that just need to be parsed into a more usable format like TSV or JSON.

## Where this goes from day two onward

Day one's task was straightforward: identify essentially every funded startup in America with a name, an address, and its principal people, using nothing but data the SEC already makes public. The plan from there is layered enhancement: converting the raw XML into structured formats, and eventually using AI to make inferences, for example about whether a company already hires internationally, based on signals like the composition of names on their team. That enrichment work is explicitly framed as a strong hands-on project for anyone interested in data science, since it's fundamentally about taking a raw dataset and progressively enhancing it into something genuinely useful.

## The build: free tools, zero budget

The technical stack is deliberately unglamorous and cost-free: Python, React, FastAPI, and PostgreSQL, all on free tiers, with a stated monthly budget of zero dollars. The project is being run directly as a nonprofit initiative, open to volunteers who want an OPT-eligible project with direct supervision, meeting with the project lead a couple of times a week.

## Key takeaways

- H1-B holders laid off from major companies face a 60-day window to find qualifying work, and with standard notice periods added in, that adds up to roughly 80 days total.
- Well-known big tech and finance companies represent only a small slice of total US employment, while a large wave of AI startup funding has created hiring demand these companies don't capture.
- Many funded startups avoid hiring international talent not by choice but because visa sponsorship is unfamiliar to them, even though the actual process is manageable paperwork and compliance.
- SEC Form D filings are free, public, government-verified data on which US companies have raised real investment funding, making them a strong foundation for identifying startups that can plausibly sponsor hires.
- The build uses an entirely free tech stack, Python, React, FastAPI, and PostgreSQL, with a $0 monthly budget, and is run as a direct, supervised nonprofit project open to OPT-eligible volunteers.

## Who this is for

This is for data engineers, full-stack developers, and researchers who want to work on a concrete, visible project with real stakes, no prior experience required beyond 5 to 10 hours a week and genuine commitment. It's also directly relevant to international students and H1-B holders trying to understand where the hidden opportunities in the current job market actually are. The project is run through Humanitarians AI with direct supervision for anyone treating it as an OPT project.
