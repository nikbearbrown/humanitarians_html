---
title: "2 Working with APIs with HAILogo"
seoTitle: "Connect n8n to APIs (Twitter/X Example)"
description: "A step-by-step walkthrough of authenticating an n8n workflow with the X (Twitter) developer API using OAuth2, then pulling real data with an HTTP request node."
summary: "This tutorial connects n8n to real-world data sources through APIs, walking through X (Twitter) developer credentials, OAuth2 setup, and a working HTTP request workflow."
keywords: ["connect n8n to twitter api", "n8n oauth2 credential setup", "n8n http request node tutorial", "x developer portal api key", "n8n workflow api authentication", "n8n merge node multiple apis", "madison framework n8n tutorial", "n8n api data collection workflow"]
generated: "article"
---

An automation workflow is only as useful as the real-world data flowing into it, and for most projects that means connecting to an API. This tutorial, part of the Madison framework series, walks through exactly how to do that in n8n: authenticating with an external API and pulling live data into a workflow you build yourself.

## Choosing the right APIs for your project

Before touching any code or credentials, the video makes the case for picking APIs deliberately rather than defaulting to whatever's easiest. The recommendation is to use at least two to three data sources relevant to your specific problem. For a brand analysis project, that might mean the YouTube Data API, the Twitter/X API, or web scraping tools. For market research, product review APIs, Google Trends, or price comparison sites fit better. For a customer service project, support ticket databases or FAQ scraping make more sense. The underlying principle is the same across all of them: pick sources that provide data directly relevant to the problem you're actually trying to solve, not just whatever API happens to have good documentation.

## Getting credentials from the X developer portal

Most APIs require authentication, and the video demonstrates the process using the X (Twitter) API as a concrete example, noting that the steps are similar for most other services. The starting point is developer.x.com, where you sign up and create a developer account. Once inside, a default project already exists. From there, you go to Settings, scroll to the user authentication setup section, and click Setup if it hasn't been configured yet. The required changes are: app permissions set to read and write, and app type set to web app. For the app info, the callback URI needs to point back to your local n8n instance, since that's where the OAuth exchange will actually land. After entering the same callback URI for both OAuth 2 and OAuth 1 and saving, X generates a client ID and secret key, which also appear again under the Keys and Tokens section.

One security point the video calls out directly: never share your API keys or commit them to public repositories.

## Wiring the credentials into n8n

Back in a local n8n instance, adding the credential is a matter of clicking the plus icon, selecting Credential, and searching for X. The recommended, tried-and-tested method is OAuth2 API. After pasting in the client ID and secret key from the developer portal and clicking "connect my account," n8n prompts you to authorize the app. Once authorized, a new credential appears in the list, ready to be used inside any workflow.

## Building a workflow that pulls real data

With credentials in place, the tutorial builds an actual workflow from scratch: a new workflow named "API collection," starting with a manual trigger node, followed by an HTTP Request node. The HTTP Request node is configured with the method set to GET and an endpoint URL, in this case a request to the X API for public profile information about a specific account (OpenAI is used as the example). That endpoint returns structured JSON data about the user, including their user ID, name, username, and profile description. For authentication, the node is set to "predefined," with the credential type set to the OAuth2 credential configured earlier. Running the node confirms the connection works, returning output in both JSON and table format.

For larger datasets, like collections of tweets or reviews, the video notes you'd typically follow up with a JSON Parse node and save the result using a Write Binary File node, though that step isn't needed for a small single-profile lookup like the one demonstrated.

## Combining multiple data sources

Since a useful project needs at least two to three data sources, the video closes by covering two ways to combine APIs in a single workflow. The first is running parallel branches directly off the trigger node, adding a second HTTP Request node alongside the first so both calls fire independently. The second is sequential: using the result of one API call to inform the next, for example getting a list of products from one API and then looping through those products to pull detailed reviews from another. A Merge node is used to combine data from multiple sources into a single dataset before saving it.

## Key takeaways

- Choose two to three APIs that are directly relevant to your specific project problem, rather than defaulting to convenient sources.
- Get credentials from the provider's developer portal (developer.x.com for X), setting app permissions to read and write and app type to web app.
- Never share API keys or commit them to public repositories.
- In n8n, add credentials via the plus icon, searching for the service, and using the OAuth2 API method.
- Build a workflow with a manual trigger and an HTTP Request node, set to GET, using the predefined OAuth2 credential for authentication.
- Combine multiple APIs either with parallel branches off the trigger or sequentially, feeding one API's output into the next, then use a Merge node to unify the data.
- Aim for at least 50 to 100 records of collected data, and document your data sources.

## Try it yourself

If you're building your own n8n project, start by picking two to three APIs relevant to your specific problem, generate credentials from each provider's developer portal, and wire them into n8n using the OAuth2 credential method shown here. The next video in this series covers cleaning and structuring the collected data and handling errors that come up during collection.
