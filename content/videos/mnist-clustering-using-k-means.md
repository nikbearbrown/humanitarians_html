---
title: "MNIST Clustering using K-Means"
seoTitle: "MNIST Clustering with K-Means from Scratch"
description: "A hands-on guide to clustering handwritten MNIST digits with K-Means, covering the elbow method, centroid initialization, and a from-scratch implementation."
summary: "This video builds K-Means clustering from scratch on the MNIST digit dataset, covering centroid initialization, the elbow method, and achieved accuracy."
keywords: ["k-means clustering mnist tutorial", "k-means from scratch python", "elbow method optimal k value", "unsupervised clustering handwritten digits", "k-means centroid initialization explained", "within cluster sum of squares wcss", "k-means clustering accuracy mnist", "k-means vs t-sne visualization"]
generated: "article"
---

Clustering handwritten digits without ever telling the algorithm what a "3" or a "7" looks like sounds difficult, but it is exactly what K-Means clustering is built to do. This video works through K-Means from first principles and then applies it to the MNIST dataset of handwritten digit images, building the algorithm from scratch rather than relying entirely on a library implementation.

## What K-Means clustering is

K-Means is a popular, widely used clustering algorithm in machine learning and data mining. It is unsupervised, meaning it does not need labeled data for training. Instead, it partitions a set of data into K clusters based on the features or attributes of the data points themselves.

## How the algorithm works

The mechanics start with choosing a value for K, the number of clusters you want in the final result. The algorithm then initializes by selecting K initial cluster centroids, often randomly. Every data point is then assigned to the nearest centroid based on distance, and once all points are assigned, new centroids are calculated as the center of each resulting cluster. This process of assigning points and updating centroids repeats until the clusters stop changing significantly, or until a specified number of iterations is reached. Throughout this process, the algorithm aims to minimize the variance within each cluster while keeping the clusters as distinct from each other as possible. K-Means shows up in applications like customer segmentation, image compression, document clustering, and anomaly detection.

## Choosing the right value of K

Picking K is often the trickiest part of using K-Means. If you already have domain knowledge, you can set K directly, and for MNIST that is straightforward: since the dataset contains digits 0 through 9, K is set to 10. Other approaches include cross-validation or the elbow method, a widely used technique for finding an appropriate K value.

## The elbow method explained

The elbow method works by plotting the within-cluster sum of squares (WCSS) against the number of clusters and identifying the point where the rate of decrease in WCSS slows down noticeably, forming a visible "elbow" in the plot. That point is typically treated as the optimal K value. The process involves choosing a range of possible K values based on domain knowledge or intuition about the dataset, running K-Means for each value in that range, and calculating WCSS for each result before plotting them together.

It is worth noting that the elbow method is a heuristic and does not always produce a clean, obvious elbow, particularly with large or complex datasets. When that happens, other methods can be used, and running multiple trials with different initializations can help confirm the robustness of the chosen K.

## Implementing K-Means on MNIST

For the implementation, the MNIST dataset is loaded from a tensor library, the training data is reshaped, and the images are visualized to get a sense of what the digit images actually look like. Before running K-Means, dimensionality reduction is applied to the data. K centroids are initialized, clusters are assigned based on those centroids, and centroids are updated iteratively, with a maximum of 100 iterations defined for the run. To check whether the clustering is working, a "matched cluster label" check compares whether each data point landed in the cluster corresponding to its actual digit.

With K set to 10, matching MNIST's 10 digit classes, the resulting accuracy came out to around 77.9%. The video notes there are ways to improve on that accuracy, which could be explored in future work. The final results are visualized with each cluster shown in a different color, with the centroid of each cluster marked separately.

## Key takeaways

- K-Means is an unsupervised algorithm that partitions data into K clusters without needing labeled training data.
- The algorithm alternates between assigning points to the nearest centroid and updating centroids until the clusters stabilize.
- Domain knowledge can set K directly; for MNIST, K equals 10 to match the digit classes 0 through 9.
- The elbow method finds an optimal K by plotting WCSS against cluster count and locating where the decrease slows down.
- The from-scratch K-Means implementation on MNIST achieved roughly 77.9% clustering accuracy, with room for improvement.

## Who this is for

This video is useful for anyone learning unsupervised clustering fundamentals or wanting to see K-Means implemented from scratch rather than as a black-box library call. It is part of a Humanitarians AI series that also covers PCA and t-SNE dimensionality reduction on the same MNIST dataset.
