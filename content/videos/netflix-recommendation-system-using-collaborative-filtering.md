---
title: "Netflix Recommendation System using Collaborative Filtering"
seoTitle: "Netflix Recommendation System with Collaborative Filtering"
description: "A walkthrough of building a Netflix-style movie recommender using collaborative filtering, cosine similarity, and a user-item ratings matrix in Python."
summary: "A step-by-step build of a Netflix-style recommendation system, using a user-item matrix and cosine similarity to predict which movies a user hasn't seen yet."
keywords: ["netflix recommendation system tutorial", "collaborative filtering python", "user item matrix recommendation", "cosine similarity movie recommender", "how netflix recommendations work", "recommendation system from scratch", "movie rating dataset collaborative filtering", "k nearest neighbors recommendation", "predict movie ratings python"]
generated: "article"
---

Every time Netflix or Spotify suggests something you end up watching or listening to, there is a specific mechanism behind that guess, and it is not magic. It is a pattern-matching technique called collaborative filtering, and it works by finding people whose tastes look like yours and borrowing from what they liked that you haven't tried yet.

## What collaborative filtering actually assumes

The core idea is easiest to see with a small example. Say there are two users and two movies, and both users have watched and rated both movies. If a third movie exists that only one of those users has watched, and the two users have historically shown similar taste, it makes sense to recommend that third movie to the user who hasn't seen it yet. That is the entire logic of collaborative filtering in one sentence: it relies on the preferences and similarities between users, and it recommends based on the patterns those similarities reveal, not on any description of the movie itself.

## The two datasets behind the system

Building a real version of this system starts with two datasets. A movie dataset holds the movie ID, the movie name, and its release year. A ratings dataset holds the user ID, the rating that user gave, and which movie ID that rating belongs to. Before doing anything else, it's worth checking for missing values, though in this case the data was already clean, which meant the build could move straight to structuring it.

## Building the user-item matrix

The first real construction step is generating a user-item matrix. Picture a table where each row is a user and each column is a movie. If a user watched and rated a given movie, that rating fills the corresponding cell. If they never watched it, the cell is empty, and those empty cells get filled with zero as a placeholder. With three users and four movies as an example, one user might have rated movies one and two but never watched movie three or four. A second user might have rated movies one and two while skipping three and four. A third might have skipped movie one but rated two and three. The resulting matrix, rows of users against columns of movies, is the foundation everything else in the system is built on.

## Measuring similarity between users

Once the matrix exists, the next step is calculating how similar users are to one another. This build uses cosine similarity, though other options exist, including Pearson correlation or Euclidean distance, and each comes with its own tradeoffs. After computing similarity across all users, the system narrows down to the top ten nearest neighbors for every user, meaning the ten other users whose rating patterns most closely match theirs. Those neighbor sets become the basis for everything predicted next.

## Predicting the ratings that don't exist yet

This is the step that turns similarity data into actual recommendations. The system iterates over every user and every movie, looking specifically for cells where the value is zero, meaning the user never rated that movie. For each of those empty cells, it uses the similarity matrix to calculate a predicted rating and assigns that predicted value back into the cell. In effect, the system is asking: given how this user's ten most similar neighbors rated this movie, what would this user probably have rated it?

## Turning predictions into a recommendation list

With predicted ratings filled in across the matrix, the final step is straightforward. For a given user, the system pulls their predicted values for every movie they haven't already watched or rated, and selects the highest-scoring ones as recommendations. Applied to a specific user in the dataset, this produces a concrete, ranked list of movies that user is statistically likely to enjoy based on people who rate movies the way they do.

## Key takeaways

- Collaborative filtering recommends items based on similarities between users' rating patterns, not on descriptions of the items themselves.
- A user-item matrix, users as rows and movies as columns with ratings as values, is the structural foundation of the system.
- Missing ratings are filled with zero as a placeholder before similarity is calculated.
- Cosine similarity is used here to measure how alike two users' tastes are, though Pearson correlation and Euclidean distance are viable alternatives.
- Predicted ratings are generated only for the zero cells, using the ratings of a user's top ten most similar neighbors.
- Final recommendations are the highest predicted-rating movies a user hasn't already watched.

## Who this is for

This is for anyone learning how recommendation systems work under the hood, students building a first machine learning project with real movie rating data, and developers who want a concrete, step-by-step example of collaborative filtering rather than a black-box explanation.
