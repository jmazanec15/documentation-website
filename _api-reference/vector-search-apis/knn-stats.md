---
layout: default
title: Stats
nav_order: 1
parent: Vector Search APIs
has_children: false
---

## Stats

The k-NN `stats` API provides information about the current status of the k-NN plugin. The plugin keeps track of both cluster-level and node-level statistics. Cluster-level statistics have a single value for the entire cluster. Node-level statistics have a single value for each node in the cluster. You can filter the query by `nodeId` and `statName`, as shown in the following example:

```
GET /_plugins/_knn/nodeId1,nodeId2/stats/statName1,statName2
```

Statistic |  Description
:--- | :---
`circuit_breaker_triggered` | Indicates whether the circuit breaker is triggered. This statistic is only relevant to approximate k-NN search.
`total_load_time` | The time in nanoseconds that k-NN has taken to load native library indexes into the cache. This statistic is only relevant to approximate k-NN search.
`eviction_count` | The number of native library indexes that have been evicted from the cache due to memory constraints or idle time. This statistic is only relevant to approximate k-NN search. <br /> **Note**: Explicit evictions that occur because of index deletion aren't counted.
`hit_count` | The number of cache hits. A cache hit occurs when a user queries a native library index that's already loaded into memory. This statistic is only relevant to approximate k-NN search.
`miss_count` | The number of cache misses. A cache miss occurs when a user queries a native library index that isn't loaded into memory yet. This statistic is only relevant to approximate k-NN search.
`graph_memory_usage` | The amount of native memory native library indexes are using on the node in kilobytes.
`graph_memory_usage_percentage` | The amount of native memory native library indexes are using on the node as a percentage of the maximum cache capacity.
`graph_index_requests` | The number of requests to add the `knn_vector` field of a document into a native library index.
`graph_index_errors` | The number of requests to add the `knn_vector` field of a document into a native library index that have produced an error.
`graph_query_requests` | The number of native library index queries that have been made.
`graph_query_errors` | The number of native library index queries that have produced an error.
`knn_query_requests` | The number of k-NN query requests received.
`cache_capacity_reached` | Whether `knn.memory.circuit_breaker.limit` has been reached. This statistic is only relevant to approximate k-NN search.
`load_success_count` | The number of times k-NN successfully loaded a native library index into the cache. This statistic is only relevant to approximate k-NN search.
`load_exception_count` | The number of times an exception occurred when trying to load a native library index into the cache. This statistic is only relevant to approximate k-NN search.
`indices_in_cache` | For each OpenSearch index with a `knn_vector` field and approximate k-NN turned on, this statistic provides the number of native library indexes that OpenSearch index has and the total `graph_memory_usage` that the OpenSearch index is using, in kilobytes.
`script_compilations` | The number of times the k-NN script has been compiled. This value should usually be 1 or 0, but if the cache containing the compiled scripts is filled, the k-NN script might be recompiled. This statistic is only relevant to k-NN score script search.
`script_compilation_errors` | The number of errors during script compilation. This statistic is only relevant to k-NN score script search.
`script_query_requests` | The total number of script queries. This statistic is only relevant to k-NN score script search.
`script_query_errors` | The number of errors during script queries. This statistic is only relevant to k-NN score script search.
`nmslib_initialized` | Boolean value indicating whether the *nmslib* JNI library has been loaded and initialized on the node.
`faiss_initialized` | Boolean value indicating whether the *faiss* JNI library has been loaded and initialized on the node.
`model_index_status` | Status of model system index. Valid values are "red", "yellow", "green". If the index does not exist, this will be null.
`indexing_from_model_degraded` | Boolean value indicating if indexing from a model is degraded. This happens if there is not enough JVM memory to cache the models.
`ing_requests` | The number of training requests made to the node.
`training_errors` | The number of training errors that have occurred on the node.
`training_memory_usage` | The amount of native memory training is using on the node in kilobytes.
`training_memory_usage_percentage` | The amount of native memory training is using on the node as a percentage of the maximum cache capacity.

Some statistics contain *graph* in the name. In these cases, *graph* is synonymous with *native library index*. The term *graph* is reflective of when the plugin only supported the HNSW algorithm, which consists of hierarchical graphs.
{: .note}

#### Usage

The following code examples show how to retrieve statistics related to the k-NN plugin. The first example fetches comprehensive statistics for the k-NN plugin across all nodes in the cluster, while the second example retrieves specific metrics (circuit breaker status and graph memory usage) for a single node.

```json
GET /_plugins/_knn/stats?pretty
{
    "_nodes" : {
        "total" : 1,
        "successful" : 1,
        "failed" : 0
    },
    "cluster_name" : "my-cluster",
    "circuit_breaker_triggered" : false,
    "model_index_status" : "YELLOW",
    "nodes" : {
      "JdfxIkOS1-43UxqNz98nw" : {
        "graph_memory_usage_percentage" : 3.68,
        "graph_query_requests" : 1420920,
        "graph_memory_usage" : 2,
        "cache_capacity_reached" : false,
        "load_success_count" : 179,
        "training_memory_usage" : 0,
        "indices_in_cache" : {
            "myindex" : {
                "graph_memory_usage" : 2,
                "graph_memory_usage_percentage" : 3.68,
                "graph_count" : 2
            }
        },
        "script_query_errors" : 0,
        "hit_count" : 1420775,
        "knn_query_requests" : 147092,
        "total_load_time" : 2436679306,
        "miss_count" : 179,
        "training_memory_usage_percentage" : 0.0,
        "graph_index_requests" : 656,
        "faiss_initialized" : true,
        "load_exception_count" : 0,
        "training_errors" : 0,
        "eviction_count" : 0,
        "nmslib_initialized" : false,
        "script_compilations" : 0,
        "script_query_requests" : 0,
        "graph_query_errors" : 0,
        "indexing_from_model_degraded" : false,
        "graph_index_errors" : 0,
        "training_requests" : 17,
        "script_compilation_errors" : 0
    }
  }
}
```

```json
GET /_plugins/_knn/HYMrXXsBSamUkcAjhjeN0w/stats/circuit_breaker_triggered,graph_memory_usage?pretty
{
    "_nodes" : {
        "total" : 1,
        "successful" : 1,
        "failed" : 0
    },
    "cluster_name" : "my-cluster",
    "circuit_breaker_triggered" : false,
    "nodes" : {
        "HYMrXXsBSamUkcAjhjeN0w" : {
            "graph_memory_usage" : 1
        }
    }
}
```
