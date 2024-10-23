---
layout: default
title: k-NN
parent: Vector Search Queries
has_toc: true
nav_order: 1
---

# knn query

The `knn` query type allows users to execute approximate nearest neighbor search on their collection of dense vectors. OpenSearch supports a rich feature set for their k-NN query. Below will detail the supported parameters.

## Examples

### Basic

```json
GET my-knn-index-1/_search
{
  "query": {
    "knn": {
      "my_vector": {
        "vector": [2, 3, 5, 6],
        "k": 2
      }
    }
  }
}
```
{% include copy-curl.html %}

Note that my_vector is the field name.

### Using Filters

### Radial Search

### Overriding Method Parameters

### Full Precision Re-scoring


## Parameters
| Parameter | Required/Optional | Data Type | Description |
|:----------|:------------------|:----------|:-------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `vector`  | Required          | Array of float32 or array of int8          | The query vector to find the nearest neighbors in the index to. This vector is a floating point array for float32 data types and int8 array for byte and binary      |
| `k`       | Required          |  Int between 0 <= 10,000         | The number of competitive hits to return per shard. In general, the larger this number is, the higher the liklihood that you find what your looking for at the expense of search latency  |

## Scoring


