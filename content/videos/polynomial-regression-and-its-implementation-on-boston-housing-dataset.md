---
title: "Polynomial Regression and its Implementation on Boston Housing Dataset"
seoTitle: "Polynomial Regression on the Boston Housing Dataset"
description: "A tutorial on polynomial regression, how it extends linear regression to capture curves, implemented step by step on the Boston Housing dataset."
summary: "This tutorial explains polynomial regression as an extension of linear regression, then implements it on the Boston Housing dataset, comparing R2 and RMSE scores."
keywords: ["polynomial regression tutorial python", "polynomial regression boston housing dataset", "linear vs polynomial regression comparison", "sklearn polynomial features implementation", "choosing degree of polynomial regression", "overfitting underfitting polynomial regression", "r2 score rmse regression comparison", "polynomial regression scikit learn", "cross validation choosing polynomial degree", "nonlinear relationship regression modeling"]
generated: "article"
---

A straight regression line only works when the underlying relationship in the data is actually straight, and real-world data rarely cooperates. This tutorial walks through polynomial regression, the technique for modeling curved relationships between variables, explains how it extends ordinary linear regression, and then implements it step by step on the Boston Housing dataset to compare results directly against a plain linear model.

## What polynomial regression is

Polynomial regression models the relationship between an independent variable X and a dependent variable Y as an Nth-degree polynomial rather than a straight line. Linear regression assumes linearity, which is almost always an approximation and sometimes a poor one. When data follows a curved pattern rather than a straight one, a linear regression line will visibly fail to represent it well, while a polynomial regression line can bend to follow the actual shape of the data by introducing curvature into the model.

## Choosing the right degree

The central design decision in polynomial regression is choosing the degree of the polynomial, and it's a real tradeoff. A lower-degree polynomial risks underfitting, failing to capture the real complexity in the data. A higher-degree polynomial risks overfitting, capturing noise in the training data rather than the genuine underlying pattern. Cross-validation is the recommended way to find the right balance, since it evaluates a model's performance on data it hasn't seen, rather than just how well it fits the training set.

## Why it's still called "linear" regression

One point that trips people up: even though the resulting regression line curves, polynomial regression is still referred to as polynomial linear regression. That's because "linearity" here refers to the coefficients, not to the X variable. The real question is whether the function can be expressed as a linear combination of its coefficients. Since the coefficients are the unknowns being solved for, and the model fits them the same way linear regression does, the underlying math stays linear even though the resulting curve is not.

## Implementing it on the Boston Housing dataset

The practical demonstration uses the Boston Housing dataset, loaded through scikit-learn, to predict house prices, a continuous variable, which makes this a regression problem. Before modeling, the tutorial explores relationships in the data with a Seaborn pair plot, which shows that the target column (median value) is strongly correlated with the LSTAT and RM columns, and that both of those relationships have a slight nonlinear curve rather than being perfectly straight.

The comparison starts with a plain linear regression using scikit-learn's LinearRegression, which produces an R2 score of 0.54 and a root mean squared error of 5.78, calculated using scikit-learn's mean squared error function and taking its square root. Because the LSTAT relationship showed nonlinear curvature, the tutorial then applies polynomial regression: first creating a matrix of features raised to different powers using scikit-learn's PolynomialFeatures, using a degree of two, and then feeding those extended features into the same linear regression model. The polynomial version raises the R2 score by about 8 percentage points, a meaningful jump, and drops the RMSE to 5.23, a decrease of roughly 0.5. Both metrics point the same direction: the polynomial model fits the actual data better than the plain linear model did.

## Key takeaways

- Polynomial regression models the relationship between X and Y as an Nth-degree polynomial, letting the regression line curve instead of forcing a straight line onto curved data.
- Choosing the polynomial's degree involves a tradeoff between underfitting (too low a degree) and overfitting (too high a degree); cross-validation helps find the right balance.
- Polynomial regression is still called "linear" because the model is linear in its coefficients, not in the X variable itself.
- On the Boston Housing dataset, plain linear regression scored an R2 of 0.54 and an RMSE of 5.78.
- Adding polynomial features of degree two raised the R2 score by about 8 percentage points and reduced the RMSE to 5.23, confirming the nonlinear relationship visible in the pair plot.

## Who this is for

This tutorial is built for anyone learning regression techniques in Python, whether just starting with scikit-learn or already comfortable with linear regression and looking to extend that toolkit to nonlinear relationships. It walks through both the conceptual reasoning and the actual code, using NumPy, pandas, and scikit-learn, making it a solid reference for students and practitioners working through a real dataset rather than a toy example.
