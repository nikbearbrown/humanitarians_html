---
title: "Data Cleaning Tutorials by Ankita Sharma"
seoTitle: "Data Cleaning in Machine Learning Explained"
description: "A walkthrough of data cleaning for machine learning, covering missing values, outliers, transformation, scaling, and inconsistent categorical data."
summary: "Before any model can learn from data, that data has to be cleaned. This video breaks down the core steps of data cleaning using a loan dataset as a working example."
keywords: ["data cleaning in machine learning", "handling missing values dataset", "detect outliers z score", "standardization vs normalization ml", "one hot encoding vs label encoding", "data cleaning loan dataset", "log transformation outliers", "cleaning categorical data inconsistencies", "data preprocessing steps ml"]
generated: "article"
---
Every machine learning model is only as good as the data it learns from, and raw data is almost never ready to use. Numbers are missing, categories are spelled inconsistently, and a handful of extreme values can throw off an entire model. Before any algorithm gets applied, that data has to be cleaned, and this video walks through exactly what that process looks like using a real loan dataset as a working example.

## Numerical versus categorical data

The starting point for any cleaning process is understanding what kind of values you're working with. Numerical values are those expressed as numbers, like weight or height, where arithmetic operations make sense. Categorical values represent groups or categories instead, like loan status or employment type. This distinction matters because the techniques used to clean and transform a column depend entirely on which type it is.

## Handling missing values

Missing data is one of the first problems a dataset throws at you. There are a few standard ways to deal with it. You can replace a missing value with a statistical measure such as the mean, median, or mode of that column. You can remove rows or columns with missing values, which works fine if the amount of missing data is small and insignificant, but risks losing useful information if it's not. A more advanced option is using machine learning algorithms to predict what the missing values likely were, based on the other features in the dataset.

## Detecting and handling outliers

Outliers are extreme values that can distort a model's understanding of the data. They can be detected in numerical columns using statistical methods like the Z-score, or visually through techniques like box plots. Once identified, outliers can sometimes be removed if they're the result of errors or genuine anomalies. In other cases, rather than deleting them, it's better to transform the data using methods like scaling or log transformation, which reduces the outsized impact those extreme values have on the model.

## Data transformation and scaling

Once missing values and outliers are addressed, the data usually needs to be transformed and scaled so that features are comparable to one another. Standardization means adjusting numerical values so they have a mean of zero and a standard deviation of one. Normalization scales numerical features into a fixed range, typically between 0 and 1. Log transformation applies a logarithmic function to smooth out inconsistent data distributions. For categorical variables, encoding techniques such as one-hot encoding and label encoding convert category labels into numerical values that a model can actually use.

## Handling inconsistent data

Categorical columns often contain inconsistencies: misspellings, variations in capitalization, or different ways of writing the same category. Cleaning this up starts with identifying where those inconsistencies exist, then standardizing the data by correcting errors, converting entries to a consistent format, or grouping similar categories together. The goal is to make sure the same real-world category is always represented the same way across every record in the dataset.

## Key takeaways

- Data cleaning directly affects the performance and accuracy of any model trained on that data.
- Missing values can be handled by imputing a statistical measure, dropping insignificant rows or columns, or predicting them with a model.
- Outliers should be detected with methods like Z-score or box plots, then either removed or reduced in impact through scaling or log transformation.
- Standardization, normalization, and log transformation prepare numerical features for modeling, while one-hot and label encoding handle categorical features.
- Inconsistent categorical data needs to be standardized so the same category is represented the same way throughout the dataset.

## Who this is for

This video is for anyone starting out in data analysis or machine learning who needs a clear, practical grounding in what data cleaning actually involves before moving on to modeling. It's a solid foundation for learners exploring the data science content from Humanitarians AI, especially those about to work with real, messy datasets for the first time.
