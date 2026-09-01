---
title: "Understanding Model Performance: Beyond Accuracy to F1 Score"
seoTitle: "Beyond Accuracy: Precision, Recall, F1 Score Explained"
description: "Why a 90% accurate model can be worse than an 84% accurate one, and how confusion matrices, precision, recall, and F1 score reveal the difference."
summary: "A walkthrough of why accuracy alone can mislead on imbalanced datasets, and how precision, recall, and F1 score give a truer picture of model performance."
keywords: ["accuracy vs f1 score", "imbalanced dataset classification", "confusion matrix precision recall", "weighted f1 score explained", "binary classifier dog cat example", "precision recall imbalanced data", "why accuracy is misleading", "f1 score machine learning tutorial"]
generated: "article"
---
A classification model that reports 90% accuracy sounds better than one that reports 84%. But what if the higher number is hiding a model that has essentially memorized one answer and repeats it every time? This video works through exactly that trap, using a simple binary classifier built to tell dog images from cat images, and shows why accuracy by itself can point you toward the wrong model.

## What accuracy actually measures

Classification is the task of sorting input data into predefined categories, whether that means labeling an image as a dog or a cat, running sentiment analysis on text, flagging tumor cells in medical imaging, or identifying sounds in an environment. Accuracy is the simplest way to score this kind of model: it is just the number of correct predictions divided by the total number of predictions. If a model gets 90 out of 100 images right, its accuracy is 90%. The problem is that this single number says nothing about what the underlying dataset looked like or how the errors were distributed.

## Where accuracy breaks down

The video sets up two models, XYZ and ABC, trained on a dataset of 90 dog images and 10 cat images. XYZ reaches 90% accuracy, but it does so by labeling every single image as a dog, no matter what is actually in the picture. Because 90% of the dataset is dogs, that lazy strategy alone produces a 90% accuracy score. ABC, by contrast, actually attempts to distinguish dogs from cats and lands at 84% accuracy, correctly identifying both dog and cat images most of the time, with 16 total misclassifications. Despite the lower headline number, ABC is doing real work that XYZ is not. This kind of skewed data, where one class vastly outnumbers another, is called an imbalanced dataset, and it shows up in serious contexts too, such as detecting cancerous cells, where non-cancerous samples vastly outnumber cancerous ones in most datasets.

## Reading a confusion matrix

To see the difference between the two models clearly, the video introduces the confusion matrix, which breaks predictions into four buckets: true positive (a dog correctly predicted as a dog), false negative (a dog predicted as a cat), false positive (a cat predicted as a dog), and true negative (a cat correctly predicted as a cat). For ABC, the confusion matrix shows 77 dog images and 7 cat images correctly identified, with a handful of mistakes in each direction. For XYZ, the matrix tells a starker story: 90 dog images correctly labeled, but zero cat images correctly labeled, because the model never predicts "cat" at all. The confusion matrix makes visible what the single accuracy number conceals.

## Precision, recall, and F1 score

From the confusion matrix, the video moves to precision and recall, two metrics that evaluate performance per label instead of averaging everything into one score. Precision asks: of all the images the model predicted as dog, how many were actually dogs? Recall asks: of all the images that were actually dogs, how many did the model correctly identify? Both metrics range from zero to one, with one representing a perfect result. When applied to the cat label, XYZ's precision and recall both come out to zero, since it never predicts cat correctly, while ABC shows real, if imperfect, precision and recall for both labels.

F1 score combines precision and recall into a single number using their harmonic mean, giving a more balanced sense of how a model performs on a given label. In the video's example, ABC's F1 score comes out to roughly 0.84 and XYZ's to about 0.9, which on the surface still favors XYZ. But because the dataset is imbalanced toward dog images, the weighted F1 score, which accounts for how much each class contributes to the overall dataset, is the more honest comparison. There, ABC scores around 0.861 against XYZ's roughly 0.852, confirming that ABC is the stronger model once the imbalance is taken into account.

## Key takeaways

- Accuracy alone can be misleading, especially on imbalanced datasets where one class dominates.
- A model can reach high accuracy simply by always predicting the majority class, without learning anything useful.
- Confusion matrices break predictions into true positives, false positives, true negatives, and false negatives for a clearer view of performance.
- Precision and recall evaluate a model's performance per label rather than as one blended number.
- F1 score is the harmonic mean of precision and recall, and the weighted F1 score adjusts for class imbalance.
- Choosing the right metric matters most in high-stakes applications, such as medical diagnosis, where missing a rare positive case has serious consequences.

## Try it yourself

The code used in this walkthrough, including the confusion matrix visualizations and metric calculations, is available on GitHub for anyone who wants to reproduce the comparison between the two models. This kind of evaluation work sits at the core of Humanitarians AI's applied data science projects, and it is a useful exercise for anyone training classifiers on real-world data where classes are rarely perfectly balanced.
