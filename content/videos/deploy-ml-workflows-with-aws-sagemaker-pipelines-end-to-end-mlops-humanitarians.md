---
title: "Deploy ML Workflows with AWS SageMaker Pipelines (End-to-End MLOps) | Humanitarians AI"
seoTitle: "AWS SageMaker Pipelines: End-to-End MLOps Tutorial"
description: "A walkthrough of building an automated AWS SageMaker pipeline covering preprocessing, HuggingFace training, and model registry with an approval gate."
summary: "Turning manual notebook workflows into an automated, three-step SageMaker pipeline that preprocesses, trains, and registers models with full tracking."
keywords: ["aws sagemaker pipelines tutorial", "end to end mlops on aws", "sagemaker scriptprocessor preprocessing", "huggingface estimator sagemaker training", "sagemaker model registry approval gate", "automate ml pipeline aws", "sagemaker studio pipeline execution", "infrastructure as code ml pipeline"]
generated: "article"
---

Manually running training scripts, shuffling data between S3 buckets by hand, and trying to remember which model version had which metrics is a workflow that breaks down the moment a team scales past a single researcher's laptop. AWS SageMaker Pipelines exists to replace that manual coordination with something automated, versioned, and reproducible.

## What a SageMaker pipeline actually is

Think of a SageMaker pipeline as a directed acyclic graph, a DAG, where each step in an ML workflow is a node. SageMaker automatically handles the execution order, the data flow between steps, and the dependencies connecting them. A pipeline built this way has three main steps: preprocess data, train the model, and register the model. SageMaker handles all the compute provisioning and data passing between those steps and tracks everything along the way, which removes the need for manual coordination between stages.

## Step one: preprocessing with ScriptProcessor

The pipeline's first step uses a ScriptProcessor, which runs a preprocessing script on a managed compute instance. The processing inputs pull raw train, test, and validation Parquet files from S3. The processor runs the script, and the processing outputs automatically save the processed data back to S3, into a dedicated data folder. Critically, nothing here is hard-coded. Everything comes from a pipeline config file, so changing datasets or instance types is as simple as updating that one config file rather than editing the pipeline logic itself. That's infrastructure as code applied directly to an ML workflow.

## Step two: training with a HuggingFace estimator

The training step uses SageMaker's HuggingFace estimator, which comes preconfigured with PyTorch and Transformers already set up. This step references `step_preprocess.properties` to dynamically pull in the outputs from the previous preprocessing step, which creates an explicit dependency chain: SageMaker knows training can't start until preprocessing finishes, and if preprocessing fails, the whole pipeline stops rather than continuing on bad or missing data. That dependency chain prevents wasted compute and partial runs. The estimator automatically provisions a GPU instance, a G4 instance in this setup, runs the training, and saves the resulting model artifacts to an S3 bucket, all logged and tracked automatically.

## Step three: model registration and governance

The final step, model registration, is where production readiness actually gets enforced. This step uses `RegisterModel` to push the trained model into SageMaker's Model Registry, and a few specific things happen here that matter for production ML. First, model metrics get automatically attached, so every registered model carries its own performance data, F1 score, precision, recall, permanently linked to that version. Second, the approval status is set to "pending manual approval" by default, which functions as a governance gate: before a model can be deployed, someone has to review those metrics and explicitly approve it. Third, the registration specifies which instance type the model is allowed to run on for inference, which prevents someone from accidentally deploying a model on an instance that's too small or unnecessarily expensive. Together, this metadata turns the Model Registry into a single source of truth for model versions, performance history, and deployment history.

## Running the pipeline

The three steps get packed into a single pipeline object. Calling `pipeline.upsert` creates or updates the pipeline definition within the AWS account, and `pipeline.start` kicks off an actual execution. This whole process is serverless: SageMaker handles scaling, retries, and logging without additional setup. Inside SageMaker Studio, you can see all three steps along with their status and execution time, and click into any individual step to view its logs, inputs, outputs, and metrics directly. The trained model shows up sitting in the Model Registry with all of its attached metadata.

## Why this pattern generalizes

This same three-step pattern, preprocess, train, register, works for essentially any ML use case: computer vision, NLP, time series forecasting, or anything else that fits the same shape. The specific scripts and estimators change; the DAG structure, the config-driven setup, and the governance gate at registration stay the same.

## Key takeaways

- A SageMaker pipeline is a DAG where each ML workflow step is a node, with SageMaker automatically managing execution order, data flow, and dependencies.
- The preprocessing step uses a ScriptProcessor pulling raw data from S3, with everything driven by a config file instead of hard-coded values.
- The training step uses a HuggingFace estimator preconfigured with PyTorch and Transformers, and depends explicitly on the preprocessing step completing successfully.
- Model registration attaches performance metrics, sets a pending manual approval status as a governance gate, and restricts which instance types the model can run on.
- `pipeline.upsert` creates or updates the pipeline definition, and `pipeline.start` kicks off a fully serverless execution with automatic scaling, retries, and logging.

## Who this is for

This tutorial is for ML engineers, data scientists, and MLOps practitioners looking to move from manual notebook experimentation to a reproducible, automated production pipeline. It's part of Humanitarians AI's applied machine learning tutorial series.
