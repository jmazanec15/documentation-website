---
layout: default
title: Search Model
nav_order: 6
parent: Vector Search APIs
has_children: false
---

## Search for a model

You can use an OpenSearch query to search for a model in the index. See the following usage example.

#### Usage

The following example shows how to search for k-NN models in an OpenSearch cluster and how to retrieve the metadata for those models, excluding the potentially large `model_blob` field:

```json
GET/POST /_plugins/_knn/models/_search?pretty&_source_excludes=model_blob
{
    "query": {
         ...
     }
}

{
    "took" : 0,
    "timed_out" : false,
    "_shards" : {
        "total" : 1,
        "successful" : 1,
        "skipped" : 0,
        "failed" : 0
    },
    "hits" : {
      "total" : {
          "value" : 1,
          "relation" : "eq"
      },
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : ".opensearch-knn-models",
        "_id" : "test-model",
        "_score" : 1.0,
        "_source" : {
          "engine" : "faiss",
          "space_type" : "l2",
          "description" : "Default",
          "model_id" : "test-model",
          "state" : "created",
          "error" : "",
          "dimension" : 128,
          "timestamp" : "2021-11-15T18:45:07.505369036Z"
        }
      }
    ]
  }
}
```
