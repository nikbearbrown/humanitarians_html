---
title: "Agricultural Policy Recommendation System Overview"
seoTitle: "Agricultural Policy Recommendation System with LLMs"
description: "An overview of a decision support tool that forecasts crop yield from remote sensing and market data, then uses fine-tuned LLM chains to draft policy reports."
summary: "This project combines remote sensing, statistical, and news data with surrogate yield models and fine-tuned LLM chains to generate agricultural policy recommendations for wheat."
keywords: ["agricultural policy recommendation system", "crop yield prediction remote sensing", "wheat yield forecasting ndvi soil moisture", "langchain llm chains policy report", "gpt 3.5 turbo fine tuning agriculture", "xgboost yield prediction pca", "vision transformer soil moisture ndvi", "streamlit agricultural decision support tool"]
generated: "article"
---
Agricultural policy has traditionally leaned on historical trends and manual analysis, which struggles to keep pace with real-time shifts in weather, soil conditions, and market sentiment. This project introduces a decision support tool built to modernize that process, combining forecasting models with large language models to give policymakers, farmers, and other stakeholders proactive, real-time insight into demand and supply trends in agriculture.

## The data behind the system

The system draws on three categories of data. Remote sensing data includes hyperspectral surface reflectance, surface temperature, soil moisture, and NDVI, the vegetation index used to track plant health from satellite imagery. Statistical data covers pesticide usage and water quality. News data consists of sentiment reports capturing how production, supply, and demand news affects farmers and the broader market. All of this data spans roughly 20 years, from 2000 to 2020, narrowed down to wheat as the target crop, and extracted at both the county and state level across five states.

## Stage one: seven surrogate models

The first stage of the pipeline builds seven surrogate models, each designed to predict crop yield using one of the seven data dependencies. For surface reflectance and surface temperature, features are extracted using ResNet and then reduced in dimension with PCA before predicting yield with XGBoost. Soil moisture and NDVI follow a similar pattern, but use Vision Transformers instead of ResNet to extract features, again followed by PCA for dimensionality reduction and XGBoost for the final yield prediction. The statistical data, pesticide and water quality figures, is handled differently, using LSTM models for time series forecasting. The news data is processed through sentiment analysis using BERT. Because the underlying data spans 20 years, the system doesn't stop at predicting yield: it also forecasts future values of surface reflectance, surface temperature, soil moisture, and NDVI themselves, so the first stage produces both predicted yield values and forecasted values for each of the seven dependencies.

## Stage two: LLM chains explain the numbers

With seven forecasted parameters in hand, the second stage builds seven separate LLM chains using LangChain. An LLM chain combines a language model with a prompt to produce output directly, and here, each of the seven chains uses a different prompt tailored to its specific parameter. The goal of this stage is to generate a report explaining how a given parameter, such as surface reflectance, affects yield, and how a change in that single parameter value shifts the predicted yield. These chains use GPT-3.5 Turbo set to a temperature of 0.9, favoring more varied, exploratory language over strict determinism. A sequential chain then takes all seven of these individual reports and combines them into a single prompt.

## Stage three: fine-tuned policy generation

That combined prompt is handed to a GPT-3.5 model that has been specifically fine-tuned for this task, using an instruction fine-tuning approach on OpenAI's clusters. The fine-tuning data includes U.S. agricultural policy documents, market analysis documents, definitions, and dependency reports connecting each parameter to supply, production, and the broader supply and demand picture for wheat over the 20-year period, drawing on roughly 15 to 20 source documents in total. The final engineered prompt merges all seven surrogate model reports and feeds them into this fine-tuned model, which generates the actual policy recommendations.

## Putting it in front of users

All of the underlying data is stored in the cloud, and a Streamlit application provides the user interface. A user can select a single state, such as North Dakota, or drill down to a specific county, and generate a report for that selection. The resulting report starts with forecasted values, for example a soil moisture reading or an NDVI value, explains what that specific number signifies and how it affects yield, and then lays out policy recommendations grounded in those parameter relationships. The project's GitHub repository organizes the source code by surrogate model, with preprocessing and modeling scripts available for each of the seven parameter folders.

## Key takeaways

- The system integrates remote sensing, statistical, and news sentiment data spanning 20 years of wheat production across five states.
- Seven surrogate models predict yield from individual dependencies, using ResNet or Vision Transformers with PCA for feature reduction, XGBoost for prediction, LSTM for time series, and BERT for sentiment analysis.
- LangChain-based LLM chains, built on GPT-3.5 Turbo, translate each surrogate model's output into a plain-language report on how that parameter affects yield.
- A GPT-3.5 model fine-tuned on real agricultural policy and market documents turns the combined reports into concrete policy recommendations.
- A Streamlit interface lets users select a state or county and generate a tailored report on demand.

## Who this is for

This overview is useful for anyone interested in how remote sensing, time series forecasting, and fine-tuned language models can be combined into a single applied decision support system, particularly students and practitioners exploring agricultural data science or LLM-based reporting pipelines.
