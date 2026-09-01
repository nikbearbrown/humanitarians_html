---
title: "Effective Strategies for Handling Missing Values: Imputing Categorical Data"
seoTitle: "Imputing Missing Categorical Data in Python"
description: "Learn to fill missing categorical values in a loan dataset using pandas fillna, plus backward filling and forward filling techniques compared side by side."
summary: "This video compares pandas techniques for filling missing categorical data, including fillna, backward filling, and forward filling on a loan dataset."
keywords: ["fillna missing categorical data pandas", "backward filling forward filling pandas", "impute categorical data python", "pandas fillna method bfill ffill", "loan dataset missing values example", "pandas isnull sum categorical columns", "dataset shape rows columns pandas", "clean categorical data pandas tutorial"]
generated: "article"
---

Numerical missing values can be filled with a mean or median, but categorical data needs a different approach entirely. This video works through several techniques for imputing missing categorical values in a loan dataset using pandas, comparing a simple fill against backward filling and forward filling.

## Loading and sizing up the data

The workflow starts by importing pandas and matplotlib, then loading the loan dataset with pandas' Excel-reading function. A head() call with a specified number of rows returns just that many rows for a quick look, and a shape check reveals the dataset contains 429 rows and 14 columns. From there, isnull().sum() shows how many null values exist in each column, revealing that fields like home expense, account time, and employ all carry some missing values.

## A first pass: filling with a fixed value

The simplest fix is the fillna() function, which fills every missing value in a column with whatever value you specify. Applied to a column like home expense, any originally empty (NaN) entry gets replaced with that fixed value. The video is upfront that this approach, filling randomly with one fixed value, is not necessarily a good way to handle missing data, since it does not reflect anything meaningful about the surrounding records.

## Better options: backward and forward filling

A more thoughtful approach uses backward filling, forward filling, or mode filling instead of an arbitrary constant. Before applying these, the info() function is used to review the dataset's data types, row counts, and memory usage, which helps confirm what still needs cleaning.

Backward filling works by taking a missing value and replacing it with the value from the next row. In the video's example, the home expense column has a missing value in its very first row; after backward filling, that gap is replaced with the value from the second row, in this case 140, since the fill pulls the next available value backward into the gap. Forward filling works in the opposite direction, carrying a value forward from a previous row into the following missing entry.

## Applying the fill methods

Both techniques are applied using the same fillna() function, but with the method argument set to specify direction, backward filling or forward filling, rather than passing a single static value. This lets the missing data get replaced with contextually relevant values drawn from adjacent rows in the dataset, rather than an arbitrary placeholder.

## Wrapping up the categorical cleaning process

By working through fillna with a fixed value, backward filling, and forward filling side by side, the video demonstrates that categorical data cleaning has more nuance than numerical imputation. Choosing between these methods depends on how the dataset is ordered and whether nearby rows are likely to carry genuinely similar values.

## Key takeaways

- fillna() with a single fixed value is the simplest way to fill missing categorical data, but it is not usually the most meaningful choice.
- Backward filling replaces a missing value with the next available value in the column; forward filling carries the previous value forward.
- isnull().sum() and shape are quick ways to size up how much missing data a dataset contains before choosing a strategy.
- info() confirms column data types and row counts, which helps decide which imputation approach fits a given column.
- The right imputation method depends on context: a constant, backward fill, forward fill, or mode fill can each be appropriate depending on the data.

## Who this is for

This video is useful for learners who have already handled numerical missing data and want to extend that skill to categorical columns. It is part of a Humanitarians AI series on missing value strategies that also covers scikit-learn's SimpleImputer and simply dropping missing rows or columns.
