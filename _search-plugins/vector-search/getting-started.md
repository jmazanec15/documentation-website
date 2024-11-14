---
layout: default
title: Getting Started
nav_order: 1
parent: Vector Search
---

# Getting Started

Welcome to this comprehensive guide on getting started with Vector Search in OpenSearch. In this guide, we walk through understanding and implementing Vector Search capabilities using OpenSearch.

## What is Vector Search?

Vector search can generally be thought of as an information retrieval method that uses a machine learning model to embed data into a vector space that is designed to place similar pieces of objects "near" each other in the vector space. Vectors can be sparse (with many empty dimensions) or dense (with information in each dimension).  This technique excels at uncovering implicit semantics and deeper connections to provide users with results that better match their intent. 

## What is Vector Search used for?

Vector search can be used in many different applications:
* Retrieval augmented generation
* Recommendation systems
* Fraud detection
* Multi-modal search
* Conversational search

## What Vector Search functionality does OpenSearch provide?

In OpenSearch, we provide a rich set of features that help users meet their workload requirements:

1. Sparse and Dense vector support: Accommodate both high-dimensional sparse vectors and compact dense vectors
2. Efficient Approximate and Exact Nearest Neighbor search: Efficient implements of nearest neighbor search allow OpenSearch to scale with your workload demands.
3. Configurable vector compression: Reduce space requirements to cut costs while still retaining high-quality search relevance.
4. Filtered search on vectors: Combine nearest neighbor search with traditional attribute-based filtering.
5. Automatic embedding generation (neural search): OpenSearch can handle generating embeddings for you.
6. Hybrid Search: Combine vector search with keyword-based search to get improved relevance.
7. Multi-vector support through nested fields: Store and query multiple vectors per document, enabling complex, multi-faceted similarity searches.

Check out [our tutorials]() to see what else is possible with Vector search in OpenSearch.

## Getting started

To start using vector search in OpenSearch, follow these steps:

1. Choose a model and setup an embedding pipeline
2. Create an index
3. Ingest your data
4. Start searching!

Let's dive in! [Choosing a model]()
