---
title: "Handling Missing Values in Machine Learning"
seoTitle: "Handling Missing Values in Machine Learning"
description: "A guide to why data goes missing and how to handle it, covering deletion, mean and median imputation, KNN imputation, and forward and backward fill."
summary: "Missing data shows up in almost every real dataset. This video breaks down why it happens and walks through the main techniques for handling it without introducing data leakage."
keywords: ["handling missing values machine learning", "missing not at random vs missing at random", "mean median imputation data leakage", "knn imputer scikit learn", "regression imputation missing data", "forward fill backward fill time series", "horse colic dataset missing values", "isna sum pandas missing values"]
generated: "article"
---
Real datasets are rarely complete. Values go missing because of data corruption, human error during entry, or simply because the information was never collected in the first place. Ignoring the gaps is always an option, but handling them properly is a crucial part of data preprocessing, and this video walks through why data goes missing and how to deal with it using the horse colic dataset from the UCI repository as an example.

## Why data goes missing

Not all missing data is missing for the same reason, and understanding why matters for choosing the right fix. Data can be missing completely at random, missing at random, or missing not at random. The last category is often tied to bias: someone might be uncomfortable sharing their salary, for instance, which means that particular gap isn't random at all but reflects something about the person providing the data.

## Checking how much data is missing

Before deciding how to handle gaps, it helps to see how many there are. Running `.isna().sum()` on a dataset shows the count of missing values per column. In the horse colic example, the surgery column has just one missing value, age has none, abdominal distention has 56, and nasogastric reflux pH has 247. That range matters: dropping a column with one missing value costs almost nothing, but dropping one with 247 missing values would throw away a large chunk of the dataset.

## Splitting data before filling it in

One detail that's easy to overlook is sequencing: missing values should be handled only after splitting the data into training and test sets, using statistics from the training set alone. Filling gaps with a mean calculated across the full dataset, test set included, causes data leakage, since information from the test set ends up influencing values in the training set.

## Deletion and mean or median imputation

The simplest approach is to drop any rows or columns that contain missing values. This works fine when there are only a few gaps relative to the size of the dataset, but it risks significant information loss otherwise. Mean or median imputation fills missing values with the mean or median of that column instead. It's easy to implement with tools like scikit-learn's SimpleImputer, but it can still cause data leakage if not handled carefully, doesn't account for the covariance between features, and is a poor fit for time series data, where it effectively introduces look-ahead bias.

## KNN and regression imputation

A more sophisticated option is KNN imputation, which fills a missing value using the average of its nearest neighbors, implemented through scikit-learn's KNNImputer. Multiple research papers support this as an effective approach, though it's computationally expensive and sensitive to outliers. Regression imputation goes further still: after checking for correlation between the missing variable and other variables, scikit-learn's IterativeImputer with a linear regression estimator can predict missing values directly, effectively turning the missing-data problem into a regression task.

## Categorical data and time series

For categorical columns, a common approach is filling missing values with the most frequently occurring label, though this again carries some risk of data leakage and isn't always optimal. Time series data calls for its own techniques: forward fill replaces a missing value with the last observed value before it, while backward fill replaces it with the next observed value after it.

## Key takeaways

- Understanding why data is missing, whether at random, completely at random, or not at random, informs how it should be handled.
- Always split data into training and test sets before imputing, and fit any imputation strategy on the training data only.
- Dropping rows or columns is only advisable when the amount of missing data is small.
- Mean and median imputation is simple but can leak data and ignores relationships between features.
- KNN and regression imputation offer more accurate results at the cost of more computation.
- Time series data should use forward fill or backward fill rather than mean-based imputation.

## Who this is for

This tutorial is aimed at anyone building machine learning models in Python who needs a practical, technique-by-technique guide to cleaning up incomplete data before training.
