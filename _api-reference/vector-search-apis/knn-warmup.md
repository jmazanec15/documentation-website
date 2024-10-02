---
layout: default
title: Warmup
nav_order: 2
parent: Vector Search APIs
has_children: false
---

## Warmup operation

The native library indexes used to perform approximate k-NN search are stored as special files with other Apache Lucene segment files. To perform a search on these indexes using the k-NN plugin, the plugin needs to load these files into native memory.

If the plugin has not loaded the files into native memory, then it loads them when it receives a search request. The loading time can cause high latency during initial queries. To avoid this, users often run random queries during a warmup period. After this warmup period, the files are loaded into native memory, and their production workloads can launch. This loading process is indirect and requires extra effort.

As an alternative, you can avoid this latency issue by running the k-NN plugin warmup API operation on the indexes you want to search. This operation loads all the native library files for all the shards (primaries and replicas) of all the indexes specified in the request into native memory.

After the process is finished, you can search against the indexes without initial latency penalties. The warmup API operation is idempotent, so if a segment's native library files are already loaded into memory, this operation has no effect. It only loads files not currently stored in memory.

#### Usage

This request performs a warmup on three indexes:

```json
GET /_plugins/_knn/warmup/index1,index2,index3?pretty
{
  "_shards" : {
    "total" : 6,
    "successful" : 6,
    "failed" : 0
  }
}
```

`total` indicates how many shards the k-NN plugin attempted to warm up. The response also includes the number of shards the plugin succeeded and failed to warm up.

The call does not return results until the warmup operation finishes or the request times out. If the request times out, then the operation continues on the cluster. To monitor the warmup operation, use the OpenSearch `_tasks` API:

```json
GET /_tasks
```

After the operation has finished, use the [k-NN `_stats` API operation](#stats) to see what the k-NN plugin loaded into the graph.

### Best practices

For the warmup operation to function properly, follow these best practices:

* Do not run merge operations on indexes that you want to warm up. During a merge operation, the k-NN plugin creates new segments, and old segments are sometimes deleted. For example, you could encounter a situation in which the warmup API operation loads native library indexes A and B into native memory but segment C is created from segments A and B being merged. Native library indexes A and B would no longer be in memory, and native library index C would also not be in memory. In this case, the initial penalty for loading native library index C still exists.

* Confirm that all native library indexes you want to warm up can fit into native memory. For more information about the native memory limit, see the [knn.memory.circuit_breaker.limit statistic]({{site.url}}{{site.baseurl}}/search-plugins/knn/settings#cluster-settings). High graph memory usage causes cache thrashing, which can lead to operations constantly failing and attempting to run again.

* Do not index any documents that you want to load into the cache. Writing new information to segments prevents the warmup API operation from loading the native library indexes until they are searchable. This means that you would have to run the warmup operation again after indexing.
****