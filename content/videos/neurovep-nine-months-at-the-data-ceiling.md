---
title: "NeuroVEP: Nine Months at the Data Ceiling"
seoTitle: "NeuroVEP: Leave-One-Subject-Out EEG Validation"
description: "Vighnesh Sairaman reports nine months of NeuroVEP results, showing a 17-subject data ceiling and why leave-one-subject-out validation matters in EEG."
summary: "Vighnesh Sairaman reports nine months of NeuroVEP research finding that a 2,578-parameter model beat a 58,000-parameter one, and that the real limit was the 17-subject cohort, not model capacity."
keywords: ["leave one subject out validation eeg", "neurovep multifocal visual evoked potential", "subject leakage cross validation", "eegnet visual field defect detection", "eeg subject identity data leakage", "claude audit cross validation splits", "small model beats large model eeg", "clinical screening sensitivity specificity eeg"]
generated: "article"
---

Nine months, ten model architectures, and one 17-subject dataset produced a result that most projects would call a failure: a performance plateau that no amount of added capacity could break through. Vighnesh Sairaman's report on the NeuroVEP project treats that plateau as the most useful thing the work produced, and walks through exactly how he proved what was actually causing it.

## The core question and the method

NeuroVEP asks whether a neural network can read a multifocal visual evoked potential, a signal captured over EEG, and distinguish a real visual field defect from a healthy eye. The multifocal VEP drives 60 screen sectors independently and reads the resulting cortical response. To label defects without putting any subject at risk, 25% of sectors are blacked out per eye during data collection. Each classification example gives the model two eyes, 10 EEG channels, and 600 milliseconds of signal sampled at 1 kilohertz, roughly 1,000 paired samples across the 17-subject cohort.

## Why leave-one-subject-out validation is non-negotiable

The methodological center of this report is a validation choice: leave-one-subject-out (LOSO), used from the very start rather than a standard random split. With 17 subjects, that means 17 folds, each one holding out a different subject entirely. LOSO is expensive to run and it produces worse numbers than a random split would, and that gap is the entire point. EEG signals carry strong subject identity. A random split lets a model quietly learn to recognize which person it is looking at rather than learning the pathology it is supposed to detect, which inflates performance in a way that will not hold up outside the training cohort.

## A 2,578-parameter model beat a 58,000-parameter one

The model progression bears this out directly. Under LOSO, left-eye accuracy moved from a dual-eye convolutional baseline at 72.3%, to per-eye heads at 74.9%, dropped to 69.4% with full data augmentation, recovered to 72.8% with a filter bank CSP-plus-LDA approach, climbed to 77.3% with a TCNet architecture, and peaked at 80.1% with EEGNet, the best-performing model in the project, using only 2,578 parameters. The shape of that progression is the finding: a 58,000-parameter model with full augmentation lost to a model roughly 22 times smaller once that smaller model had the right inductive bias. When scaling a model stops moving the metric, the model has stopped being the bottleneck.

## Catching subject leakage before publishing the result

The report includes a genuine correction made during its own review process. One notebook had split the data at the sector level, which allowed the same subject to appear in both the augmentation pool and the validation pool. Every headline number produced under that split was inflated. Once caught, the split was corrected to a strict subject-level separation, and the results were reported downward to their honest values: 61.4% sensitivity and 80.6% specificity. A telling secondary signal confirmed the diagnosis: training accuracy sat above 95% while validation plateaued near 70%, a gap too large to be ordinary overfitting. The model was memorizing which subject it was looking at, not learning what the underlying signal meant.

## Ruling out explanations one at a time

With capacity, regularization, and augmentation all tested and ruled out as explanations for the plateau, what remained was inter-subject variability at a cohort size of 17. The report's prediction is that the performance ceiling lifts once the cohort grows past roughly 50 subjects. A mid-project interruption is also part of the record: the development machine failed and was reformatted in June, and the drive had been formatted in a way that stripped file names and timestamps. A semantic triage pass processed 151,927 files in 124 seconds with zero errors, rebuilding and validating 37 notebooks and classifying 499 figures.

## What comes next

The immediate next step is completing a stacked meta-learner that combines complementary base models: a convolutional network carrying sensitivity and a random forest carrying specificity. Beyond that, the report names a gap it has not yet closed: a clinical decision threshold analysis, since 61% sensitivity on a screening instrument for irreversible blindness carries consequences that have not yet been written down. The report also offers a concrete, reusable technique: ask Claude Code to audit a cross-validation split for subject leakage by passing it fold indices and subject labels. It returns every fold where a subject appears on both sides, and the same check should be extended to the augmentation pool specifically, which is where the leakage in this project hid.

## Key takeaways

- NeuroVEP uses leave-one-subject-out validation from the start because EEG signals carry strong subject identity that a random split would let a model exploit.
- An EEGNet model with 2,578 parameters outperformed a 58,000-parameter model, showing that added capacity was not the bottleneck.
- A sector-level data split accidentally leaked subject identity between the augmentation and validation pools, inflating early results.
- The corrected, honest results are 61.4% sensitivity and 80.6% specificity.
- The 17-subject cohort size, not model architecture, is identified as the true ceiling on performance.
- Claude can be used to audit cross-validation fold indices and subject labels for leakage before you trust a reported number.

## Who this is for

This report is aimed at anyone doing EEG-based machine learning, medical AI, or small-cohort clinical research within Humanitarians AI Fellows projects, particularly researchers who need a concrete method for validating that their cross-validation splits are not leaking subject identity into supposedly held-out data.
