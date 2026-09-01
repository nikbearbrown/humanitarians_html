---
title: "Reddit/Twitter Posts Classifications using Multinomial Naïve Bayes"
seoTitle: "Classify Reddit and Twitter Posts with Naive Bayes"
description: "A walkthrough of using Multinomial Naive Bayes with TF-IDF and Laplace smoothing to classify Reddit and Twitter posts, with cross-validation results."
summary: "Building on a prior logistic regression model, this walkthrough applies Multinomial Naive Bayes and Bayes theorem to classify depressed versus not-depressed posts from Reddit and Twitter data."
keywords: ["multinomial naive bayes text classification", "bayes theorem for classification", "tfidf vectorizer python example", "laplace smoothing naive bayes", "cross validation naive bayes model", "classify depressed social media posts", "reddit twitter dataset classification", "naive bayes alpha parameter tuning"]
generated: "article"
---

Classifying text by probability sounds abstract until you actually watch the numbers move: a model that assigns an 86% accuracy on a single test split, then jumps to 95% once cross-validation smooths out the noise. This walkthrough builds a Multinomial Naive Bayes classifier for Reddit and Twitter posts, picking up from an earlier video that tackled the same classification problem with logistic regression instead.

## Bayes theorem, the starting point

Multinomial Naive Bayes rests on Bayes theorem: for two classes A and B, the probability of A given B can be worked out from the probability of B given A, multiplied by the probability of A, divided by the probability of B. The "naive" part of the name refers to an assumption baked into the whole method, that every feature in the data is independent of every other feature. That assumption is rarely exactly true for real text, but it makes the math tractable and, as the results here show, still produces a workable classifier.

## Modeling word frequencies with a multinomial distribution

For text classification specifically, the features are usually word frequencies or term counts rather than continuous values. The multinomial distribution models the likelihood of seeing a particular set of word frequencies given a class, expressed as the probability of a set of features given a class, built up as a product over each word's individual count. Because this involves probabilities in a denominator, there's a real risk of hitting a zero probability whenever a word in a new document never appeared in the training data for a given class. Laplace smoothing solves that by adding a small constant to every count, which guarantees no probability ever collapses to exactly zero.

## Prior probability and making a prediction

Alongside the likelihood of the features, the model also needs a prior probability for each class, representing the baseline belief that a document belongs to that class before looking at any of its features at all. To classify a new document, the model picks the class that maximizes the product of the prior probability and the likelihood of the observed features under that class, an argmax over classes. In summary, the process is: calculate the prior probability for each class, calculate the likelihood of the features under each class using the multinomial distribution with Laplace smoothing, multiply the prior by the likelihood for each class, and pick whichever class comes out highest.

## Building the dataset

The implementation combines three separate sources: a Reddit dataset, a Twitter dataset, and a second Twitter dataset. Text is pulled from each, null values are dropped, and the three are combined into a single pandas DataFrame. After another pass to check for and drop remaining null values, the text is cleaned before the dataset is split into training and test sets, the same general pipeline used in the earlier logistic regression video for this same depressed versus not-depressed classification task.

## Vectorizing with TF-IDF and training the model

The cleaned text is vectorized using a TF-IDF vectorizer, which converts words into weighted numerical features rather than raw counts. The Multinomial Naive Bayes model is then trained using an alpha value of 2.1, the smoothing parameter that controls how much weight gets added to unseen word counts. With the model trained, predictions are generated for the test features.

## Results: a single split versus cross-validation

On the held-out test set, the model reaches 86% accuracy, described as okay but not really better than what the logistic regression approach achieved earlier in the series. That comparison is left as an honest, unresolved point rather than a claim that Naive Bayes wins outright. The more interesting number comes from 10-fold cross-validation, which trains and tests the model across ten different splits of the data and averages the results: a mean accuracy of 95%. That gap between the single-split accuracy and the cross-validated accuracy is a useful reminder that a single train/test split can understate or overstate how a model actually performs, and that cross-validation gives a more reliable read on real performance.

## Key takeaways

- Multinomial Naive Bayes classifies text using Bayes theorem combined with a multinomial distribution over word frequencies.
- The "naive" assumption is that all features (words) are independent of each other, which simplifies the math even though it's not strictly true of language.
- Laplace smoothing prevents zero probabilities for words that don't appear in a class's training data.
- The dataset combines Reddit and two Twitter sources, cleaned and vectorized with TF-IDF before training.
- With alpha set to 2.1, the model scored 86% accuracy on a single test split but 95% mean accuracy under 10-fold cross-validation.
- Cross-validation gave a meaningfully different, and more trustworthy, read on model performance than the single-split number.

## Who this is for

This is a hands-on machine learning walkthrough for anyone building text classifiers, particularly students following along with the earlier logistic regression video on the same Reddit and Twitter dataset. It's a useful comparison point for understanding when a simpler probabilistic model like Naive Bayes can hold its own against other classification approaches.
