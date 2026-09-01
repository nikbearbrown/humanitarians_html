---
title: "Exploring Data Missing Values: Identification and Solutions"
seoTitle: "Find Missing Values in Pandas: A Step-by-Step Guide"
description: "A hands-on walkthrough of finding, counting, and visualizing missing values in a pandas dataset, from isnull checks to a heatmap of null values by column."
summary: "Using a loan dataset in Google Colab, this walkthrough shows how to detect, count, and visualize missing values in pandas before deciding how to handle them."
keywords: ["pandas isnull sum missing values", "how to find missing values pandas", "pandas read_excel dataset tutorial", "missing data heatmap python", "pandas dataset shape null percentage", "google colab data cleaning tutorial", "identify null values python pandas", "missing values visualization heatmap", "data cleaning missing values percentage"]
generated: "article"
---

Before you can fix missing data, you have to actually see it, not just know in the abstract that some cells are empty, but know exactly which columns, how many rows, and what percentage of your dataset is affected. This walkthrough works through that process step by step in Google Colab, using a loan dataset as the working example.

## Loading the data and getting oriented

The process starts with the basic tooling: importing pandas, seaborn, and matplotlib, then loading the dataset with pandas' Excel reader function. The example dataset here is a loan dataset with columns like age, time employed, status, telephone, account, and home expense, mixing categorical and numerical data. Before diagnosing missing values, it helps to get oriented: calling the head function to preview the first several rows, and checking the dataset's shape to see the total number of rows and columns you're working with. This particular dataset runs several hundred rows, so a 10-row preview is just a sanity check, not the full picture.

## Detecting missing values

The core tool for spotting missing data is the isnull function, which returns the dataset in the same shape but with every cell replaced by True or False, where True means a null value is present at that position. That's useful for a small preview but unwieldy at full scale, which is why the next step chains a sum function onto it. Calling sum on the output of isnull gives you a per-column count of missing values, so you can see at a glance that, for example, time employed has two nulls, account has one, and home expense has four.

## Converting counts to percentages

Raw counts are hard to interpret without context, especially across columns with very different amounts of data. The fix is to convert those counts into percentages, dividing the null count by the dataset's shape and multiplying by 100. Once that conversion is applied, every column's missing-value count reads as a percentage of that column's total, which makes it much easier to judge severity: a column missing 2% of its values is a very different problem than one missing 40%.

## Getting the overall picture

Beyond per-column detail, it's worth checking the missing-value rate for the entire dataset at once. Summing the null counts across the whole dataset and dividing by the total number of cells, rows multiplied by columns, gives you a single overall percentage of missing data. In this walkthrough's example, that comes out to a specific overall null percentage across the whole loan dataset. The same approach in reverse, using a notnull function, tells you how much of your data is actually complete.

## Visualizing missing values with a heatmap

Numbers are precise, but a heatmap makes patterns of missingness visible at a glance. Plotting a heatmap with rows on the horizontal axis and columns on the vertical axis, the dark portions of the graph indicate non-null values, while the lighter lines mark where nulls occur. That visual pattern can reveal things a table of percentages can't, like whether missing values cluster in specific rows or spread evenly across the dataset, which matters when you're deciding whether to drop rows, drop columns, or impute values.

## Key takeaways

- Use pandas' Excel reader to load your dataset, then check head and shape to understand its size and structure before diagnosing problems.
- The isnull function flags every missing cell as True; chaining sum onto it gives you a missing-value count per column.
- Convert raw null counts to percentages by dividing by the dataset's shape, which makes severity easier to compare across columns.
- Divide total null count by total cell count (rows times columns) to get one overall missing-data percentage for the dataset.
- A heatmap of null values, built with the same libraries you already imported, turns a table of numbers into a visual pattern you can scan quickly.

## Who this is for

This is a practical starting point for anyone doing data cleaning in pandas, whether you're a beginner working through your first dataset or someone who wants a quick refresher on the standard missing-value diagnostic workflow before moving on to imputation or deletion strategies.
