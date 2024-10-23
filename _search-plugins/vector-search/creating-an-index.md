---
layout: default
title: Creating an Index
nav_order: 3
parent: Vector Search
has_toc: true
---

# Creating an Index

## Dense Vector Index

OpenSearch provides rich configurability for building indices with dense vectors. In OpenSearch a dense vector is represented as a `knn_vector` field. See the [field reference]() to learn more about all of the configuration options. To create an index, set the `settings.index.knn` parameter to `true` and then run:

```json
PUT /my-dense-vector-index
{
  "settings": {
    "index": {
      "knn": true
    }
  },
  "mappings": {
    "properties": {
      "my_dense_vector": {
        "type": "knn_vector",
        "dimension": 16,
        "space_type": "l2"
      }
    }
  }
}
```
{% include copy-curl.html %}

## Sparse Vector Index

OpenSearch also has the capability to build indices with sparse vectors. OpenSearch supports this by encoding the sparse vectors in the `rank_features` field type. See [field reference]() for more details. To create an index, run:
```json
PUT /my-sparse-vector-index
{
  "mappings": {
    "properties": {
      "my_sparse_vector": {
        "type": "rank_features"
      }
    }
  }
}
```
{% include copy-curl.html %}

## Configuring Automatic Embedding

With the neural-search and ml-commons plugins, OpenSearch can be configured to generate the sparse or dense vectors from your text based data for you! In order to do this, you simply need to setup ingestion processors. Before getting started, make sure to register your model. See this [ML-Commons tutorial](https://opensearch.org/docs/latest/ml-commons-plugin/tutorials/generate-embeddings/) for more details.

In order to auto-embed during ingestion, you need to setup an ingestion pipeline. This will basically intercept your ingestion requests and insert the auto-generated vectors into the documents. Creating this ingestion pipeline will look something like:

```json
PUT _ingest/pipeline/my_embedding_pipeline
{
  "processors": [
    {
      "set": {
        "field": "title_tmp",
        "value": "{{_ingest._value.title}}"
      }
    },
    {
      "text_embedding": {
        "model_id": "embedding_model",
        "field_map": {
          "title_tmp": "_ingest._value.my_vector"
        }
      }
    },
    {
      "remove": {
        "field": "title_tmp"
      }
    }
  ]
}
```

Then, to create the index, add the processor as a setting:
```json
PUT my_books
{
  "settings" : {
      "index.knn" : "true",
      "default_pipeline": "my_embedding_pipeline"
  },
  "mappings": {
    "properties": {
      "description": {
        "type": "text"
      },
      "my_dense_vector": {
        "type": "knn_vector",
        "dimension": 16,
        "space_type": "l2"
      },
      "my_sparse_vector": {
        "type": "rank_features"
      }
    }
  }
}
```

Then, you can start ingesting your text data and the embeddings will be automatically generated!

