---
title: "Build a Biomedical NER System with BioBERT + LoRA (Step-by-Step) | Humanitarians AI"
seoTitle: "Build a Biomedical NER System with BioBERT + LoRA"
description: "Learn to fine-tune BioBERT with LoRA adapters on the BC5CDR dataset to extract chemical and disease entities from clinical text."
summary: "A step-by-step walkthrough of fine-tuning BioBERT with LoRA adapters on BC5CDR, from label alignment to a working pipeline that extracts chemical and disease entities from clinical text."
keywords: ["biobert lora fine-tuning tutorial", "biomedical named entity recognition system", "bc5cdr dataset ner training", "lora adapters for bert models", "peft library fine-tuning biobert", "huggingface trainer biomedical nlp", "chemical disease entity extraction", "token label alignment subword tokenization", "clinical text entity extraction pipeline", "seqeval precision recall f1 score", "fine-tune biobert step by step"]
generated: "article"
---

Fine-tuning a full biomedical language model to recognize chemicals and diseases inside clinical notes is normally expensive: updating every parameter in a BERT-scale model takes GPU memory and training time most labs would rather spend elsewhere. This walkthrough shows a lighter path, fine-tuning BioBERT for named entity recognition using LoRA adapters, so the bulk of the pretrained model stays frozen while only a small set of new parameters learns the biomedical task.

The target is a working pipeline: start with raw clinical-style text, run it through the fine-tuned model, and get back a clean table of the chemicals and diseases the model found, ready to feed into research or safety-monitoring work.

## The BC5CDR dataset and the BIO tagging scheme

The pipeline starts with the BC5CDR dataset, a widely used benchmark for biomedical entity recognition. Its sentences are annotated with two entity types: chemicals and diseases. Rather than a simple yes-or-no label, each token gets tagged using the BIO scheme, beginning of a chemical, inside a chemical, beginning of a disease, inside a disease, or outside any entity, which gives five labels in total and lets the model mark entities that span multiple words.

That labeling has to survive tokenization, and this is where things get tricky. When BioBERT's tokenizer processes a word, it can split it into multiple subword tokens, but the original data only has one label per word. To keep the labels correct, the first subword keeps the original label and the remaining subwords get the matching inside-entity tag. Getting this alignment right is what separates a model that learns real entity boundaries from one that learns noise.

## Fine-tuning BioBERT efficiently with LoRA

Rather than retraining every weight in BioBERT, the pipeline adds LoRA adapters from the PEFT library. LoRA inserts small trainable layers into the model while keeping most of the pretrained weights frozen, which lets the model adapt to the chemical and disease task without the memory and time cost of full fine-tuning, and without giving up much accuracy.

## Training and evaluating the model

Training runs through the Hugging Face Trainer API for five epochs with a batch size of 16, and evaluation uses the seqeval library to compute precision, recall, F1 score, and accuracy at each stage. Watching these metrics climb epoch over epoch is the signal that the model is actually learning to tell chemicals and diseases apart, not just memorizing training examples.

## From tokens to structured clinical insight

Once training finishes, both the tokenizer and the LoRA adapter get saved separately from the base model. That separation matters: instead of retraining the whole system every time, you can reload BioBERT, attach the saved adapter, and start making predictions right away, which is useful for sharing the trained model with collaborators or moving it into production.

Running the model on new clinical text produces token-level labels, but because of subword splitting, a post-processing step is needed to merge those subwords back into complete words before the entities mean anything. Once entities are merged, they get organized into a table with columns for the input text, the chemicals found, and the diseases found, turning unstructured, messy clinical notes into clean, structured data that downstream tools can actually use.

## Key takeaways

- The BC5CDR dataset uses BIO tagging across five labels to mark chemical and disease entities, including multi-word spans.
- Subword tokenization breaks single words into multiple tokens, so labels must be realigned: the first subword keeps the label, later subwords get the inside-entity tag.
- LoRA adapters from the PEFT library let you fine-tune BioBERT by training a small set of new parameters instead of the entire model, cutting memory and training time.
- The Hugging Face Trainer API, run for five epochs with a batch size of 16, is evaluated with the seqeval library for precision, recall, F1, and accuracy.
- Saving the tokenizer and LoRA adapter separately from the base model means you can reload and reuse the fine-tuned system without retraining it.
- A post-processing step that merges subwords back into full words turns raw token predictions into a clean table of chemicals and diseases.

## Who this is for

This walkthrough is for anyone building biomedical NLP tools on a budget: researchers extracting structured data from clinical notes, teams working on drug safety monitoring, or developers exploring efficient fine-tuning techniques like LoRA before committing to full model training. It's part of the applied AI tutorials Humanitarians AI publishes for people learning by building real pipelines rather than reading theory.
