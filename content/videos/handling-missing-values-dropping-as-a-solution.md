---
title: "Handling Missing Values: Dropping as a Solution"
seoTitle: "Dropping Missing Values in a Dataset (Python)"
description: "Learn when to drop rows or columns with missing data, visualize gaps with a seaborn heatmap, and clean a loan dataset in Google Colab step by step."
summary: "This video shows how to visualize missing data with a seaborn heatmap and decide whether to drop rows or columns to clean a loan dataset in Python."
keywords: ["drop missing values pandas tutorial", "dropna column vs row pandas", "seaborn heatmap missing data visualization", "google colab data cleaning example", "loan dataset missing values python", "pandas isnull sum heatmap", "drop column inplace true pandas", "when to drop missing data"]
generated: "article"
---

Not every missing value needs to be filled in. Sometimes the simplest and most defensible move is to drop the row or column entirely, and this video walks through exactly when and how to do that using a loan dataset in Google Colab.

## Setting up and loading the data

The workflow starts in Google Colab, or alternatively Jupyter Notebook, importing pandas and matplotlib before loading the dataset with pandas' Excel-reading function. A head(4) call returns just the first four rows for a quick look, revealing columns like age, time, status, and telephone, a mix of numerical and categorical data, with both null and non-null values present throughout.

## Counting the missing values

Running isnull().sum() shows exactly how many missing values sit in each column. In this dataset, a column like "time employ" shows two missing values, while "home expense" shows four, and so on for the rest of the columns. That count alone helps decide which columns are even worth keeping.

## Visualizing the gaps

To get a clearer picture of where the missing data actually sits, the video uses the seaborn library to build a heatmap: sns.heatmap(dataset.isnull()) followed by plt.show(). With 425 rows in the dataset, the heatmap renders every column as a strip, showing non-null data in black and null values in a light cream color. This visual makes it immediately obvious which columns are riddled with gaps and which are mostly complete.

## Deciding what to drop

Whether to drop by column or by row depends entirely on the dataset and what matters more for the analysis: preserving rows or preserving columns. In this example, the home expense column stands out as having more null values than the others, making it a reasonable candidate to drop entirely.

## Dropping a column

Dropping the column uses drop with the column name specified, home expense in this case, along with inplace=True, which updates the existing dataset directly rather than creating a separate copy. Checking the dataset afterward confirms that the home expense column no longer appears at all.

## Dropping rows instead

For rows where too many null values are present, the alternative is dropna applied at the row level. After dropping those rows, the resulting dataset, checked again with the heatmap visualization, shows no null values remaining anywhere in the graph, confirming the cleaning was successful.

## Key takeaways

- Dropping missing data is a valid strategy alongside imputation, particularly when a column or row has too many gaps to fill reliably.
- A seaborn heatmap of isnull() values gives a fast visual read on where missing data concentrates across a dataset.
- Dropping a column uses drop(columns=...) with inplace=True to update the dataset directly.
- Dropping rows uses dropna(), removing records where too much data is missing.
- The choice between dropping by row or by column depends on which dimension of the data matters more for the analysis at hand.

## Who this is for

This video is a practical starting point for anyone learning basic data cleaning workflows in pandas. It rounds out a Humanitarians AI series on missing value strategies that also covers scikit-learn's SimpleImputer and categorical imputation with fillna, backward filling, and forward filling.
