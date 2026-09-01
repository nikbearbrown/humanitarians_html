---
title: "Introduction to KNN and its Implementation on Iris Dataset by Kedar Ghule"
seoTitle: "K-Nearest Neighbors Explained on the Iris Dataset"
description: "An introduction to the K-Nearest Neighbors algorithm, how the K value affects performance, and a full implementation on the Iris dataset."
summary: "KNN classifies a point by majority vote among its closest neighbors. This video explains how it works, how to choose K, and implements it on the Iris dataset."
keywords: ["knn algorithm explained iris dataset", "how to choose k value knn", "k nearest neighbors majority vote", "elbow method knn error rate", "knn euclidean vs manhattan distance", "curse of dimensionality knn", "kneighborsclassifier sklearn implementation", "knn confusion matrix classification report"]
generated: "article"
---
Some machine learning algorithms work by building a mathematical model of the data. K-Nearest Neighbors takes a much more direct approach: it classifies a new point simply by looking at what's closest to it. This video introduces the algorithm and walks through a full implementation on the Iris dataset.

## What KNN is

KNN, short for K-Nearest Neighbors, is a widely used supervised machine learning algorithm for classification. The core idea is straightforward: it determines the class of a data point by looking at how many points of a particular class are closest to it, then makes an educated guess based on that. Since it learns from labeled training data, it belongs to the family of supervised learning algorithms.

## How the algorithm works

Given a new data point, KNN calculates the distance from that point to all its neighbors using a distance metric, typically Euclidean distance, though Manhattan distance is another option. It then selects the K nearest neighbors and, for classification tasks, takes a majority vote among them to decide the new point's class. If most of a point's nearest neighbors belong to one class, the new point is classified into that class. The choice of K matters a great deal: a small K value produces a more flexible decision boundary, which risks overfitting, while a larger K value simplifies the model.

## Strengths and weaknesses

KNN's biggest strength is its simplicity: it's easy to understand and implement, and as a non-parametric algorithm, it doesn't assume anything about the underlying distribution of the data. Its weaknesses are just as notable. It can be computationally expensive on large datasets, since it requires calculating distances between the new point and every existing point. It's also known to suffer from the curse of dimensionality, and it's sensitive to both the choice of distance metric and the value of K, where a poor choice can lead to inaccurate predictions. Despite these limitations, KNN remains a valuable tool, particularly for small to medium-sized datasets where interpretability matters.

## Implementing KNN on the Iris dataset

The implementation starts by loading the Iris dataset from scikit-learn's datasets module and reviewing its characteristics with a describe method. Checking for missing values and non-numerical types shows the Iris dataset is clean on both counts. A quick group-by on the class column confirms the dataset is well balanced, with 50 data points in each class. Scikit-learn's KNeighborsClassifier is imported from the neighbors module, and the first implementation sets the K value to 1 by passing `n_neighbors=1`. By default, KNeighborsClassifier uses Minkowski distance with a p value of 2, which is mathematically equivalent to Euclidean distance; setting p to 1 instead gives Manhattan distance. After fitting the model, its accuracy is checked with the `.score()` method, alongside a confusion matrix and classification report.

## Finding a better K with the elbow method

Choosing K by guesswork isn't reliable, so the video uses the elbow method: testing K values from 1 to 10 and tracking the error rate for each. The error rate drops at K equal to 9, so the model is refit with that value. The result is a meaningful accuracy improvement, from roughly 0.95 with K equal to 1 up to roughly 0.96 with K equal to 9. The important caveat is that the optimal K is the one where the error rate is low, not zero; a K value that drives error to zero is usually a sign of overfitting rather than genuinely better performance.

## Key takeaways

- KNN classifies a new point by majority vote among its K nearest neighbors, based on a distance metric like Euclidean or Manhattan.
- The K value controls the bias-variance tradeoff: small K risks overfitting, large K risks oversimplifying.
- KNN is computationally expensive on large datasets since it computes distances to every existing point.
- Scikit-learn's KNeighborsClassifier defaults to Minkowski distance with p=2, equivalent to Euclidean distance.
- The elbow method, testing a range of K values and tracking error rate, helps find a K that avoids both underfitting and overfitting.

## Who this is for

This video is a solid starting point for anyone learning classification algorithms in machine learning who wants a clear explanation of KNN alongside a hands-on implementation using scikit-learn.
