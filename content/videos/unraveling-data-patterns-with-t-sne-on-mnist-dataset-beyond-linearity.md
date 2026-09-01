---
title: "Unraveling Data Patterns with t-SNE on MNIST Dataset Beyond Linearity"
seoTitle: "t-SNE on MNIST Dataset: Beyond Linear Reduction"
description: "Learn how t-SNE differs from PCA for dimensionality reduction, how perplexity and learning rate affect results, and how to implement it on MNIST digits."
summary: "This walkthrough explains how t-SNE captures nonlinear relationships in high-dimensional data and shows a hands-on implementation on the MNIST digit dataset."
keywords: ["t-sne dimensionality reduction tutorial", "t-sne vs pca nonlinear data", "t-sne mnist dataset python", "t-sne perplexity learning rate parameters", "stochastic neighbor embedding explained", "t-sne implementation scikit-learn", "t-sne kl divergence joint probabilities", "visualizing high dimensional data t-sne"]
generated: "article"
---

Some datasets simply do not compress well into a straight line. When the relationships between data points are complex and nonlinear, a linear method like PCA can miss the underlying structure entirely. This video picks up where an earlier PCA discussion left off and introduces t-SNE, a dimensionality reduction technique built specifically to handle that kind of complexity, then walks through implementing it on the MNIST handwritten digit dataset.

## Why t-SNE goes beyond linear methods

t-SNE stands for t-distributed stochastic neighbor embedding. Like PCA, it is a dimensionality reduction method used for visualizing high-dimensional data, but the two approaches work very differently. PCA focuses on linear transformations, while t-SNE aims to capture more complex, nonlinear relationships between data points. That makes it particularly useful for datasets with intricate internal structure, where flattening the data along straight axes would lose important patterns.

## How t-SNE actually works

The core mechanism starts by converting pairwise similarities between data points into joint probabilities, which represent how likely two points are to be neighbors once the data is mapped into a lower-dimensional space. From there, t-SNE minimizes the divergence, specifically the KL divergence, between the joint probabilities of the low-dimensional embedding and the original high-dimensional data. In simpler terms, it tries to preserve the relationships between points as closely as possible when squeezing the data down into fewer dimensions.

One important technical detail: t-SNE has a non-convex cost function, unlike PCA. That means different initializations can lead to different results, and it is why it is often recommended to run a linear method like PCA first to reduce dimensions before applying t-SNE on top of it.

## The parameters that shape the result

Getting useful output from t-SNE means understanding a handful of key hyperparameters. Perplexity determines the number of nearest neighbors considered during optimization. Early exaggeration controls the spacing between natural clusters in the embedded space. The learning rate balances the tradeoff between preserving local structure and preserving global structure. And the maximum number of iterations limits how long the optimization process runs. Each of these affects how tight or spread out the resulting clusters appear.

## Implementing t-SNE on MNIST

The hands-on portion loads the MNIST dataset from scikit-learn's datasets module, standardizes the input, and transforms it into scalar form. From there, the t-SNE model is created with two components, a perplexity of 30, a learning rate of 100, and a maximum of 1,000 iterations. After fitting the data, the results are visualized, with each of the 10 digit classes (0 through 9) represented by its own color in the final plot.

## Where t-SNE is expensive and where it shines

t-SNE is computationally expensive, so the data should be pre-processed and the parameters, perplexity, number of iterations, and learning rate among them, chosen carefully before running it. Despite the cost, it is valuable for complex data structures. One example mentioned is applying t-SNE to movie transcripts to uncover hidden thematic clusters or patterns of interaction between characters, illustrating that its usefulness extends well beyond image datasets like MNIST.

## Key takeaways

- t-SNE captures nonlinear relationships between data points, unlike PCA's linear transformations.
- It works by converting pairwise similarities into joint probabilities and minimizing KL divergence between high- and low-dimensional representations.
- Its cost function is non-convex, so results can vary by initialization, and running PCA first is a common practice.
- Key hyperparameters include perplexity, early exaggeration, learning rate, and maximum iterations.
- On MNIST, t-SNE with two components clearly separates the 10 digit classes by color in the resulting visualization.
- t-SNE can be applied well beyond images, including uncovering thematic clusters in text like movie transcripts.

## Who this is for

This video suits learners who already have a basic grasp of PCA and want to understand when a nonlinear dimensionality reduction technique is the better tool. It is part of a broader Humanitarians AI series working through dimensionality reduction and clustering methods on the MNIST dataset.
