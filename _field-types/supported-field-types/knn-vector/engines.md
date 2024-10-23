---
layout: default
title: Engines
nav_order: 4
has_toc: true
parent: knn_vector
grand_parent: Supported field types
---

# Engines

An "Engine" refers to the library that creates the nearest neighbor structures and performs the nearest neighbor search. Currently, OpenSearch supports three different engines: "nmslib", "faiss", and "lucene". Each engine can be configured to build the ANN index in certain ways. Each engine may or may not support certain features.

## Engine Feature Matrix

| Feature/Engine                     | Faiss                           | Lucene                              | Nmslib                                            |
|:-----------------------------------|:--------------------------------|:------------------------------------|:--------------------------------------------------|
| Supported Data Types               | "float", "byte", "binary"       | "float", "byte"                     | "float"                                           |
| Supported Space Types              | "l2", "innerproduct", "hamming" | "l2", "innerproduct", "cosinesimil" | "l2", "innerproduct", "cosinesimil", "l1", "linf" |
| Concurrent index build (per shard) | Yes, see index_thread_qty       | No                                  | Yes, see index_thread_qty                         |
| Efficient Filtering                | Yes                             | Yes                                 | No                                                |

## Choosing the right Engine and Method

There are several options to choose from when building your `knn_vector` field. To determine the correct methods and parameters, you should first understand the requirements of your workload and what trade-offs you are willing to make. Factors to consider are (1) query latency, (2) query quality, (3) memory limits, and (4) indexing latency.

If memory is not a concern, HNSW offers a strong query latency/query quality trade-off.

If you want to use less memory and increase indexing speed as compared to HNSW while maintaining similar query quality, you should evaluate IVF.

If memory is a concern, consider adding a PQ encoder to your HNSW or IVF index. Because PQ is a lossy encoding, query quality will drop.

You can reduce the memory footprint by a factor of 2, with a minimal loss in search quality, by using the [`fp_16` encoder]({{site.url}}{{site.baseurl}}/search-plugins/knn/knn-vector-quantization/#faiss-16-bit-scalar-quantization). If your vector dimensions are within the [-128, 127] byte range, we recommend using the [byte quantizer]({{site.url}}{{site.baseurl}}/field-types/supported-field-types/knn-vector/#byte-vectors) to reduce the memory footprint by a factor of 4. To learn more about vector quantization options, see [k-NN vector quantization]({{site.url}}{{site.baseurl}}/search-plugins/knn/knn-vector-quantization/).

### Engine recommendations

In general, select NMSLIB or Faiss for large-scale use cases. Lucene is a good option for smaller deployments and offers benefits like smart filtering, where the optimal filtering strategy—pre-filtering, post-filtering, or exact k-NN—is automatically applied depending on the situation. The following table summarizes the differences between each option.

| |  NMSLIB/HNSW |  Faiss/HNSW |  Faiss/IVF |  Lucene/HNSW |
|:---|:---|:---|:---|:---|
|  Max dimensions |  16,000  |  16,000 |  16,000 |  16,000 |
|  Filter |  Post-filter |  Post-filter |  Post-filter |  Filter during search |
|  Training required |  No |  No |  Yes |  No |
|  Similarity metrics |  `l2`, `innerproduct`, `cosinesimil`, `l1`, `linf`  |  `l2`, `innerproduct` |  `l2`, `innerproduct` |  `l2`, `cosinesimil` |
|  Number of vectors   |  Tens of billions |  Tens of billions |  Tens of billions |  Less than 10 million |
|  Indexing latency |  Low |  Low  |  Lowest  |  Low  |
|  Query latency and quality  |  Low latency and high quality |  Low latency and high quality  |  Low latency and low quality  |  High latency and high quality  |
|  Vector compression  |  Flat |  Flat <br>Product quantization |  Flat <br>Product quantization |  Flat  |
|  Memory consumption |  High  |  High <br> Low with PQ |  Medium <br> Low with PQ |  High  |

## Faiss

### Supported methods

### Supported quantization techniques

### Memory Estimates

## Lucene

### Supported methods

### Supported quantization techniques

### Memory Estimates

## Nmslib

### Supported methods

| Method name | Requires training | Description                                                                                                                                                 |
|:------------|:------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `hnsw`      | false             | Hierarchical proximity graph approach to approximate k-NN search. For more details on the algorithm, see this [abstract](https://arxiv.org/abs/1603.09320). |

#### `hnsw` parameters

At index time, the following parameters are supported:

| Parameter name    | Required | Default | Updatable | Description                                                                                                                                                                                            |
|:------------------|:---------|:--------|:----------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `ef_construction` | false    | 100     | false     | The size of the dynamic list used during k-NN graph creation. Higher values result in a more accurate graph but slower indexing speed.                                                                 |
| `m`               | false    | 16      | false     | The number of bidirectional links that the plugin creates for each new element. Increasing and decreasing this value can have a large impact on memory consumption. Keep this value between 2 and 100. |

At search, the following parameters are supported:

| Parameter name | Required | Default | Updatable | Description                                                                                                                   |
|:---------------|:---------|:--------|:----------|:------------------------------------------------------------------------------------------------------------------------------|
| `ef_search`    | false    | 100     | false     | The size of the dynamic list used during HNSW search. Higher values result in a more accurate search but slower search speed. |

An index created in OpenSearch version 2.11 or earlier will still use the old `ef_construction` value (`512`).
{: .note}

To create an index with nmslib, run the following:
```json
PUT test-index
{
  "settings": {
    "index": {
      "knn": true
    }
  },
  "mappings": {
    "properties": {
      "my_vector": {
        "type": "knn_vector",
        "dimension": 3,
        "space_type": "l2",
        "method": {
          "name": "hnsw",
          "engine": "nmslib",
          "parameters": {
            "ef_construction": 100,
            "m": 16
          }
        }
      }
    }
  }
}
```

### Supported quantization techniques

`nmslib` does not currently support any quantization techniques.

### Memory Estimates


