---
title: "Reddit/Twitter Posts Classifications using KNN (K Nearest Neighbors)"
seoTitle: "Classifying Reddit/Twitter Posts with KNN"
description: "See how K Nearest Neighbors is implemented from scratch to classify depressed versus non-depressed Reddit and Twitter posts, with an 85% accuracy result."
summary: "This video builds a K Nearest Neighbors classifier from scratch to detect depressed versus non-depressed posts across Reddit and Twitter datasets."
keywords: ["knn text classification from scratch", "k nearest neighbors reddit twitter dataset", "depressed post detection nlp", "knn classifier python implementation", "tf-idf vectorizer text classification", "knn vs logistic regression accuracy", "lazy learning algorithm explained", "knn hyperparameter tuning k value"]
generated: "article"
---

Can a simple distance-based algorithm tell the difference between a depressed and a non-depressed social media post? This video continues a series of experiments on classifying Reddit and Twitter posts, this time implementing K Nearest Neighbors, or KNN, entirely from scratch to see how it stacks up against the logistic regression and Naive Bayes approaches covered previously.

## What makes KNN different

KNN is a supervised machine learning algorithm that can handle both classification and regression tasks, with target values that can be categorical or numerical. What sets it apart is that it is nonparametric and a lazy learner: it makes no assumptions about the underlying data distribution, and it does not build a model during training. Instead, it simply memorizes the training dataset and makes predictions only when asked.

## How a prediction actually gets made

Given a new, unclassified data point, KNN looks at the K nearest existing data points, based on a distance metric, and uses their labels to make a decision. For classification, it takes the majority class among those K neighbors. For regression tasks, it assigns the average of the K nearest values instead. The distance is usually measured with Euclidean distance, though other metrics like Manhattan distance can also be used. The two main parameters that shape the algorithm's behavior are K, the number of neighbors considered, and the choice of distance metric.

Because KNN's decision boundary can be complex and nonlinear, it adapts well to a wide range of data shapes. Its main advantage is simplicity: there is no training phase, and it can adapt readily to changes in the dataset. The tradeoff is that it is computationally expensive for large datasets and sensitive to irrelevant features, since its predictions can be skewed by the scale of the features used.

## Building KNN from scratch

Unlike the earlier projects in this series, this implementation builds KNN from scratch rather than relying on a library. The process starts with the same combined dataset used in earlier videos, drawing from the Reddit combined dataset, the Twitter full dataset, and the Twitter non-advertisement dataset. Irrelevant columns are dropped, the three datasets are merged, null values are removed, and the text is cleaned before being split into training and test sets and transformed using a TF-IDF vectorizer.

The custom KNN classifier is initialized with a default number of neighbors set to three. Its fit method stores the training features and labels directly in the class instance, since there is no actual training computation to perform. The predict method then calculates the distance between each input data point and all training data points, converting the training data to a dense array where needed, identifies the K nearest neighbors, retrieves their labels, and predicts the class by majority vote among those neighbors.

## The result

For the final run, K was set to five. After fitting the model and generating predictions, the resulting accuracy came out to 85%, somewhat lower than the other two models tested in this series. The video notes that fine-tuning the K hyperparameter, or using a built-in library method, might push that accuracy higher.

## Key takeaways

- KNN is a nonparametric, lazy-learning algorithm that memorizes training data instead of building a model upfront.
- Predictions are made by majority vote (classification) or averaging (regression) among the K nearest neighbors, typically using Euclidean distance.
- The from-scratch implementation reused the combined Reddit and Twitter dataset from earlier videos in the series, cleaned and vectorized with TF-IDF.
- With K set to five, the custom KNN classifier reached 85% accuracy on the depressed-post classification task.
- KNN is simple and training-free but computationally expensive on large datasets and sensitive to irrelevant or unscaled features.

## Who this is for

This video is a good fit for learners who want to see a classic machine learning algorithm implemented line by line rather than imported from a library. It is part of a Humanitarians AI series comparing multiple classification approaches, including logistic regression and Naive Bayes, on the same social media dataset.
