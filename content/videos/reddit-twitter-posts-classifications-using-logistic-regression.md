---
title: "Reddit/Twitter Posts Classifications using Logistic Regression"
seoTitle: "Classifying Reddit/Twitter Posts with Logistic Regression"
description: "A walkthrough of using logistic regression, TF-IDF, and text cleaning to classify depressed versus non-depressed Reddit and Twitter posts at 95% accuracy."
summary: "This video builds a logistic regression classifier for depressed versus non-depressed Reddit and Twitter posts, reaching around 95 percent accuracy."
keywords: ["logistic regression text classification tutorial", "depressed post classification reddit twitter", "sigmoid function binary classification", "tfidfvectorizer text preprocessing", "logistic regression l2 regularization", "social media mental health classification", "reddit twitter dataset nlp project", "binary classification accuracy python"]
generated: "article"
---

Social media posts carry more signal about a person's mental state than most people realize, and machine learning offers one way to systematically detect it. This video works through a project that classifies Reddit and Twitter posts as depressed or non-depressed using logistic regression, walking through both the underlying math and the full implementation pipeline.

## The logistic regression foundation

Logistic regression is a statistical method used for binary classification, meaning it works when the predicted classes are binary, either yes or no, or zero or one. Rather than outputting a direct value, it predicts the probability that an instance belongs to one of the two classes. That probability comes from the sigmoid function, sigma of z equals 1 over 1 plus e to the negative z, where z is a weighted combination of the input features: z equals b plus x1w1 plus x2w2 and so on through xnwn, where the x values are the input features, the w values are their respective weights, and b is the bias term.

## Defining the classification task

Post classification, in this context, means categorizing or labeling content, and here the goal is to sort posts into depressed or non-depressed categories. The data comes from posts made on Reddit and Twitter.

## Building the dataset

The project draws from three separate datasets: a Reddit dataset, a Twitter dataset, and a Twitter non-advertisement dataset. Each has a different structure. The Reddit dataset includes a title, body, and classification label. The Twitter dataset includes text, hashtags, and labels. The Twitter non-advertisement dataset includes only text and a label. These three dataframes are merged by dropping the columns they don't have in common and joining what remains into a single combined dataset. Null values are then checked for and dropped.

## Cleaning and preparing the text

Text preprocessing follows a standard pipeline: converting all characters to lowercase, removing punctuation, tokenizing the text, removing English stop words, filtering the tokens, and finally joining everything back together into a new "clean text" column. For model training, the combined dataset is split into training and test sets using an 80/20 ratio, with a split index marking where the training data ends and the test data begins.

## Vectorizing and training the model

After the train/test split, the text is transformed using a TF-IDF vectorizer, a numerical statistic that reflects how important a word is to a document relative to the collection of documents it belongs to. Logistic regression is then applied to the vectorized data, with L2 regularization used to improve the model's performance and reduce overfitting. After fitting the model, predictions are generated and evaluated for accuracy.

## The result

The final model reached an accuracy of around 95%, notably higher than the K Nearest Neighbors approach covered later in the same project series, suggesting logistic regression handled this particular text classification task especially well.

## Key takeaways

- Logistic regression predicts the probability of binary class membership using the sigmoid function rather than a direct label.
- The project combines three separate Reddit and Twitter datasets, standardizing their differing columns before merging.
- Text preprocessing includes lowercasing, punctuation removal, tokenization, and stop word filtering before vectorization.
- TF-IDF vectorization converts cleaned text into numerical features suitable for the model.
- L2-regularized logistic regression achieved approximately 95% accuracy on the depressed-post classification task.

## Who this is for

This video suits learners who want a clear, math-grounded introduction to binary text classification. It is part of a Humanitarians AI series that compares logistic regression against K Nearest Neighbors on the same depressed-post detection task, useful for anyone weighing which algorithm fits a given text classification problem.
