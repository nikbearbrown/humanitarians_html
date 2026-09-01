---
title: "Choosing the Best Algorithm: Decision Trees vs. Random Forest"
seoTitle: "Decision Trees vs Random Forest: Which to Choose"
description: "Compare decision trees and random forest for loan approval prediction, covering information gain, gini index, one-hot encoding, and accuracy results."
summary: "This video compares decision trees and random forest on a loan approval dataset, covering attribute selection, encoding, and accuracy for each model."
keywords: ["decision tree vs random forest comparison", "loan prediction decision tree python", "information gain gini index splitting", "attribute selection measure decision tree", "one hot encoding categorical features", "decision tree classifier entropy", "random forest accuracy precision recall", "loan approval machine learning model"]
generated: "article"
---

Choosing between a decision tree and a random forest is not just a matter of picking the "better" algorithm, it depends on what tradeoffs a project can afford between interpretability and predictive power. This video works through both models side by side using a real loan prediction dataset, showing how each one splits data, how they're evaluated, and how their accuracy compares.

## The problem: predicting loan approval

The example used throughout is a loan dataset, chosen because loan prediction is a common real-world problem for retail financial institutions. Getting it right matters for more than convenience: it increases customer satisfaction and reduces operational cost, but only if the underlying model is robust enough to accurately predict which loan applications should be approved and which should be rejected, minimizing the risk of default.

## How decision trees split the data

The core idea behind a decision tree is selecting the best attribute using an attribute selection measure, or ASM, to split the data into decision nodes that break it into smaller subsets. This process repeats recursively for each child node until a stopping condition is met, such as all remaining records belonging to the same class, no remaining attributes to split on, or no more instances left to divide.

## Defining the variables

The dataset separates variables into a target variable and independent variables. Here, loan status serves as the dependent (target) variable, while attributes like gender, marital status, dependents, education, and applicant income serve as independent variables. Loan status itself has two possible outcomes: reject, meaning the loan was denied, and accept, meaning the loan was approved.

## The modeling workflow

The overall approach follows a standard sequence: split the data into training and test sets, select the best attribute using an ASM such as information gain, gini index, or gain ratio, break the dataset into smaller subsets based on that attribute, and then evaluate each resulting model on accuracy, precision, and recall.

## Technical implementation

On the technical side, categorical fields are first converted into numerical form using one-hot encoding, since machine learning models need numerical input. After splitting the data into training and testing sets, a decision tree classifier is built. One version uses entropy to perform the split, since that is the metric that measures information gain, while the default configuration of the decision tree classifier function uses gini impurity to perform splits instead. Both versions are built and evaluated so their results can be compared directly.

## Comparing the results

Once both models are trained, their performance is measured using accuracy, along with precision, recall, and F1 score. In this run, the random forest model achieved 79% accuracy, while the decision tree came in slightly higher at 80% accuracy. The video presents this comparison as a graphical representation, noting that a full practical walkthrough of both models follows in the demonstration.

## Key takeaways

- Decision trees split data by selecting the best attribute at each node using measures like information gain or gini index.
- The loan status target variable is binary: accept or reject, based on independent variables like income, education, and marital status.
- Categorical features are converted to numerical form with one-hot encoding before model training.
- Entropy-based and gini-based decision tree classifiers were both tested and compared against a random forest model.
- In this run, the decision tree reached about 80% accuracy, slightly ahead of the random forest's 79%.

## Who this is for

This video is a solid starting point for learners comparing tree-based classification algorithms on a practical dataset. It fits into Humanitarians AI's broader set of applied machine learning walkthroughs for anyone building intuition around model selection and evaluation.
