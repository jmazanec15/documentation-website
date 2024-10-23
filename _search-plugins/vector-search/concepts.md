---
layout: default
title: Concepts
nav_order: 2
parent: Vector Search
---

# Concepts

There are a lot of new concepts assoicated with Vector Search. The below table contains a reference for keeping them in order!

| Concepts             | Description                                                                                                                                                                                              |
|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| vector               | A list of numbers. Typically, a vectors do not exist in isolation and are more often used in the context of a vector space                                                                               |
| dimension            | The length that all vectors in a vector space have                                                                                                                                                       |
| Dense Vectors        | Used in contrast to sparse vectors, a dense vector typically has relevant information in each dimension                                                                                                  |
| Sparse Vectors       | Sparse vectors have very high dimension, but very low information per dimension                                                                                                                          |
| Vector Search        | Vector Search is a general term used to describe the field of searching over dense or sparse vectors. It typically has a connotation involving machine learning                                          |
| k-NN search          | k-Nearest Neighbor search - A common problem in machine learning. Given a vector in a vector space, find the k nearest neighbors to this vector in a set of index vectors                                |
| Space Type           | The Space Type refers to the distance function used to determine how close neighbors are to each other.                                                                                                  |
| ANN search           | Approximate Nearest Neighbor search - a problem with the goal of approximating k-NN search in order to provide better search performance                                                                 |
| Exact Search         | Used in constrast with ANN search. k-NN search where the results returned are definitively the nearest neighbors                                                                                         |
| Vector Database      | Term for a data base that stores and provides efficient search over vector data types                                                                                                                    |
| Quantization         | An algorithmic technique to compress vectors into smaller sizes. This is beneficial for reducing resource consumption                                                                                    |
| Embedding Models     | Machine learning models used to embed some form of data into fixed dimensional vectors                                                                                                                   |
| k-NN Index Models    | Some quantization and ANN algorithms require a training step to initialize the data structures before ingestion can begin. In OpenSearch, the learned parameters from training are referred to as models |
| Semantic Search      | Type of search that emphasizes context and intent of query, as opposed to the exact letter of the query, which comes from term query                                                                     |
| Hybrid Search        | Type of search where ranking combines both semantic intent as well as keyword search                                                                                                                     |
| Neural Search        | Type of search where the embedding generation is done for the user                                                                                                                                       |
| Neural Sparse Search | Type of sparse vector search that uses an embedding model to generate the sparse embeddings                                                                                                              |
| Efficient Filters    | Filtering that is done during ANN search as opposed to before or after it.                                                                                                                               |
