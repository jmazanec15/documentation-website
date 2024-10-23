---
layout: default
title: Ingest, Update and Delete
nav_order: 5
parent: Vector Search
---

# Ingest, Update, and Delete Data

Ingestion for Vector data works similarly to other fields.

## Dense Vector Ingestion

For `data_type = float32`, data needs to be ingested as arrays matching the dimension in the index mapping of float32 numbers. Here is a sample bulk request:

```json
POST _bulk
{ "index": { "_index": "my-knn-index-1", "_id": "1" } }
{ "my_dense_vector": [1.5, 2.5], "price": 12.2 }
{ "index": { "_index": "my-knn-index-1", "_id": "2" } }
{ "my_dense_vector": [2.5, 3.5], "price": 7.1 }
{ "index": { "_index": "my-knn-index-1", "_id": "3" } }
{ "my_dense_vector": [3.5, 4.5], "price": 12.9 }
{ "index": { "_index": "my-knn-index-1", "_id": "4" } }
{ "my_dense_vector": [5.5, 6.5], "price": 1.2 }
{ "index": { "_index": "my-knn-index-1", "_id": "5" } }
{ "my_dense_vector": [4.5, 5.5], "price": 3.7 }
{ "index": { "_index": "my-knn-index-1", "_id": "6" } }
{ "my_dense_vector": [1.5, 5.5], "price": 10.3 }
{ "index": { "_index": "my-knn-index-1", "_id": "7" } }
{ "my_dense_vector": [2.5, 3.5], "price": 5.5 }
{ "index": { "_index": "my-knn-index-1", "_id": "8" } }
{ "my_dense_vector": [4.5, 5.5], "price": 4.4 }
{ "index": { "_index": "my-knn-index-1", "_id": "9" } }
{ "my_dense_vector": [1.5, 5.5], "price": 8.9 }
```
{% include copy-curl.html %}

For optimizing the bulk size, see [Performance Tuning]().

Here ios a

<details>
	<summary>Python Snippet</summary>

	~~~ python
    print("Hello python")
    ~~~ 
</details>


## Sparse Vector Ingestion



## Auto-embed during ingestion



