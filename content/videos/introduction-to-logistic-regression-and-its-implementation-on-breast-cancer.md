---
title: "Introduction to Logistic Regression and its Implementation on Breast Cancer Dataset"
seoTitle: "Logistic Regression Explained on Breast Cancer Data"
description: "An introduction to logistic regression as a classification algorithm, covering the sigmoid function and maximum likelihood, with a breast cancer example."
summary: "Despite the name, logistic regression is a classification algorithm, not a regression one. This video explains why, then implements it on the UCI breast cancer dataset."
keywords: ["logistic regression explained classification", "sigmoid function decision boundary", "why not use linear regression classification", "maximum likelihood logistic regression", "logistic regression breast cancer dataset", "confusion matrix precision recall f1", "logistic regression missing values bare nuclei", "logistic regression scikit learn accuracy"]
generated: "article"
---
The name is misleading from the start: logistic regression sounds like a regression technique, but it's actually one of the most fundamental classification algorithms in machine learning. This video works through why that naming exists, how the algorithm actually functions, and applies it to the UCI breast cancer dataset.

## A classification algorithm with a regression name

Logistic regression is used when the dependent variable is categorical, most often in binary classification, where the goal is predicting which of two categories a data point belongs to rather than predicting a numerical value. Picture a patient with symptoms that could point to one of several conditions; the model predicts which condition it's most likely to be, a category, not a number. Unlike linear regression, logistic regression predicts the probability of an observation belonging to a particular class.

## The sigmoid function and decision boundary

Imagine two classes of points plotted on a graph, colored blue and red. The goal is to draw a decision boundary that separates them. Logistic regression achieves this by fitting a sigmoid function to the data, which maps any input to a value between 0 and 1, representing the probability of belonging to one class. The decision boundary sits at the point where that probability equals 0.5: points above it are classified into one class, points below into the other. Training the model means finding the coefficients that minimize the error between predicted probabilities and actual class labels, typically using an optimization method like gradient descent that iteratively adjusts the coefficients to reduce the loss.

## Why not just use linear regression

There are a couple of clear reasons linear regression fails for classification. First, if classes are numerically encoded, like 1 for influenza, 2 for malaria, and 3 for something else, the model implicitly assumes an order between the categories that doesn't actually exist. Second, fitting a straight line to binary classification data produces predictions that fall below 0 or above 1, which makes no sense for a probability. Logistic regression avoids both problems: its sigmoid-based equation always produces an S-shaped curve, so no matter the input value, the output is a sensible probability, and the decision boundary marks the clean cutoff for classification.

## Maximum likelihood estimation

To fit a logistic regression model, a method called maximum likelihood is used. The idea is to estimate the coefficients, beta 0 and beta 1, such that plugging them into the model's logistic function produces a value close to 1 for data points whose actual class is 1, and close to 0 for data points whose actual class is 0. This is what the underlying similarity to linear regression comes from, and why "regression" still appears in the name despite it being a classification method.

## Strengths, weaknesses, and implementation

Logistic regression's biggest strength is its simplicity and interpretability, which makes it a popular first choice for binary classification. Its weaknesses include assuming a linear relationship between the independent variables and the log odds of the outcome, and it performs poorly with highly imbalanced classes or strongly nonlinear relationships. The implementation uses the UCI breast cancer dataset. A quick check for missing values initially shows none, but the dataset's own documentation notes that it does contain missing values, and closer inspection reveals the bare nuclei column, stored as an object type, contains a "?" character standing in for 16 missing values. These are dropped, though filling them with the mean or median is also an option. After splitting into training and test sets and fitting the model with scikit-learn's LogisticRegression, setting a random state for reproducibility, the model reaches 96% accuracy. A confusion matrix and classification report round out the evaluation, reporting precision, the proportion of predicted malignant cases that are actually malignant, recall, the proportion of actual malignant cases correctly identified, and F1 score, the harmonic mean of the two.

## Key takeaways

- Logistic regression is a classification algorithm, used to predict categories, not continuous numerical values.
- It fits a sigmoid function, producing a probability between 0 and 1, with a decision boundary at 0.5.
- Linear regression fails for classification because it can produce probabilities below 0 or above 1, and numeric class encoding implies a false order.
- The model is fit using maximum likelihood estimation to find the coefficients that best separate the classes.
- Missing values can hide behind non-standard characters, like a "?" in an otherwise numerical column, so always inspect column contents directly.
- Evaluation should go beyond accuracy to include precision, recall, and F1 score, especially for imbalanced classes.

## Who this is for

This tutorial is well suited to anyone learning classification fundamentals in machine learning who wants both the conceptual reasoning behind logistic regression and a full, working example in scikit-learn.
