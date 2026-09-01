---
title: "Building a Weather App with React & Axios | React Basics Series Part 3\""
seoTitle: "Build a Weather App with React and Axios Tutorial"
description: "A step-by-step React tutorial building a working weather app with Axios and the OpenWeatherMap API, covering state, async requests, and rendering."
summary: "Part 3 of the React Basics series builds a functioning weather app that fetches live data from the OpenWeatherMap API using Axios and React state."
keywords: ["react weather app tutorial", "axios openweathermap api", "react usestate api request", "openweathermap api react example", "axios vs fetch api react", "react conditional rendering weather", "react api key env file", "react basics series axios"]
generated: "article"
---
Fetching data from an external API is one of the first real hurdles beginners hit in React, because it means combining state management, asynchronous requests, and conditional rendering all at once. This third installment of the React Basics series tackles that hurdle head-on by building a working weather app from scratch, one that searches for a city and displays its current conditions.

## Setting up the data source

Before writing any React code, the video walks through OpenWeatherMap.org, the free API used to power the app. After creating an account, the API section shows a range of available endpoints, including current weather, four-day forecasts, and sixteen-day forecasts. The demo uses a dedicated API key created specifically for this project, named "weather app," rather than the default key, and the presenter is careful to note that the key gets disabled after recording.

## Why Axios instead of fetch

For making the actual HTTP request, the tutorial chooses Axios over the native fetch API. The reasoning covers several practical advantages: Axios handles JSON data transformation automatically, has simpler syntax for error handling, supports canceling requests after they've been made, and is widely supported across browsers. For a project centered on fetching and cleaning external data, those conveniences make Axios the more efficient choice.

## Scaffolding the React project

The app starts from a fresh project created with `npx create-react-app weather-app`, followed by installing Axios with `npm install axios`. After clearing out the boilerplate code, the build begins with two pieces of state: `query`, which tracks what the user types into the search input, and `weather`, which holds the JSON response returned by the API once a search completes. The input field is wired up so that every keystroke updates the query state through an `onChange` handler, and pressing Enter, detected as `event.key === "Enter"` in an `onKeyDown` handler, triggers the search.

## Writing the search function

The search function itself is asynchronous, since it needs to wait on a network response. It calls `axios.get()` against a base URL for the OpenWeatherMap current-weather endpoint, passing three parameters pulled directly from the API documentation: `q` for the city name typed into the input, `units` set to metric, and `appid` for the API key. Once the response comes back, the function calls `setWeather()` with the response data and resets the query field to an empty string, clearing the input so the user can immediately search for another city. The whole request is wrapped in a try/catch block, which the video calls out as good practice for handling any errors the API call might throw.

One point raised explicitly during the build: API keys should never be hardcoded into application source files. The right approach is storing them in a `.env` file and accessing them through `process.env`, so they stay out of the codebase and can be hidden properly in production. The video shows the key directly in the code only for demonstration purposes.

## Rendering the response

To figure out what to display, the tutorial checks the actual JSON structure returned by the OpenWeatherMap API, which includes coordinates, weather conditions, main temperature data, visibility, wind, rain, snow, and the country and name of the city. Rather than rendering everything, the app keeps things simple and displays just the city name, the country, and the temperature, using `sys.name` and `sys.country` for location details and `Math.round()` on the main temperature value to display a clean, rounded number in Celsius. A conditional check on `weather.main` ensures the app only tries to render weather data once it actually exists, avoiding errors before the first search completes.

## Seeing it work

Testing the app with a search for "Boston" confirms it: the city and country render correctly, the temperature rounds to a clean integer, and the description, cloudy in this case, matches the weather outside the window at the time of recording. The video closes by noting how far this basic version could be extended, from adding CSS styling to make the display more visually appealing to pulling in a city photo or theming the interface based on current conditions, since OpenWeatherMap exposes far more data than the app currently uses.

## Key takeaways

- Axios is chosen over the native fetch API for its automatic JSON handling, simpler error handling, and request cancellation support.
- The app manages two pieces of state: a `query` string for the search input and a `weather` object for the API response.
- Search is triggered on Enter key press and calls the OpenWeatherMap current-weather endpoint with city, units, and API key parameters.
- The query field is cleared after each search, and try/catch handles request errors.
- API keys belong in a `.env` file and should never be committed directly into application code.
- Conditional rendering, checking that `weather.main` exists, prevents the app from breaking before the first search returns data.

## Who this is for

This tutorial is built for beginners who have already worked through the earlier videos in the React Basics series and are ready to connect a React app to a real, external API. It's a practical next step for anyone learning state management and asynchronous data fetching in React through a small, complete project rather than isolated code snippets.
