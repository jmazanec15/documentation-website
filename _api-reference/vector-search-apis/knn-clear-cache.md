---
layout: default
title: Clear Cache
nav_order: 3
parent: Vector Search APIs
has_children: false
---

## k-NN clear cache
Introduced 2.14
{: .label .label-purple }

During approximate k-NN search or warmup operations, the native library indexes (`nmslib` and `faiss` engines) are loaded into native memory. Currently, you can evict an index from cache or native memory by either deleting the index or setting the k-NN cluster settings `knn.cache.item.expiry.enabled` and `knn.cache.item.expiry.minutes`, which removes the index from the cache if it is idle for a given period of time. However, you cannot evict an index from the cache without deleting the index. To solve this problem, you can use the k-NN clear cache API operation, which clears a given set of indexes from the cache.

The k-NN clear cache API evicts all native library files for all shards (primaries and replicas) of all indexes specified in the request. Similarly to how the [warmup operation](#warmup-operation) behaves, the k-NN clear cache API is idempotent, meaning that if you try to clear the cache for an index that has already been evicted from the cache, it does not have any additional effect.

This API operation only works with indexes created using the `nmslib` and `faiss` engines. It has no effect on indexes created using the `lucene` engine.
{: .note}

#### Usage

The following request evicts the native library indexes of three indexes from the cache:

```json
GET /_plugins/_knn/clear_cache/index1,index2,index3?pretty
{
  "_shards" : {
    "total" : 6,
    "successful" : 6,
    "failed" : 0
  }
}
```

The `total` parameter indicates the number of shards that the API attempted to clear from the cache. The response includes both the number of cleared shards and the number of shards that the plugin failed to clear.

The k-NN clear cache API can be used with index patterns to clear one or more indexes that match the given pattern from the cache, as shown in the following example:

```json
GET /_plugins/_knn/clear_cache/index*?pretty
{
  "_shards" : {
    "total" : 6,
    "successful" : 6,
    "failed" : 0
  }
}
```

The API call does not return results until the operation finishes or the request times out. If the request times out, then the operation continues on the cluster. To monitor the request, use the `_tasks` API, as shown in the following example:

```json
GET /_tasks
```

When the operation finishes, use the [k-NN `_stats` API operation](#stats) to see which indexes have been evicted from the cache.
