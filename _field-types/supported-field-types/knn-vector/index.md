---
layout: default
title: knn_vector
nav_order: 90
has_children: true
has_toc: true
parent: Supported field types
redirect_from:
  - /opensearch/supported-field-types/vector/
  - /field-types/vector/
---

# knn_vector field type
**Introduced 1.0**
{: .label .label-purple }

The `knn_vector` field type allows users to ingest their k-NN vectors into an OpenSearch index and perform different kinds of k-NN search. The `knn_vector` field is highly configurable and can serve many different k-NN workloads. See [Vector Search]() for detailed walk-throughs and tutorials for running Vector workloads in OpenSearch.

## Example

For example, to map `my_vector` as a `knn_vector`, use the following request:

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
        "dimension": 16,
        "space_type": "l2"
      }
    }
  }
}
```
{% include copy-curl.html %}

## Parameters

| Name                | Required | Default         | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
|:--------------------|:---------|:----------------|:-----------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `dimension`         | `true`   | N/A             | Positive Integer | The dimensionality of the vector space for which this model is designed. This will correspond to the number of numeric values per vector                                                                                                                                                                                                                |
| `data_type`         | `false`  | "float"         | String           | The numeric type used to encode the value of each dimension in the vector. See [Data Types]() for more information                                                                                                                                                                                                                                      |
| `space_type`        | `false`  | "l2"            | String           | The function that is used to define distance between vectors for the field. See [Space Types]() for more information                                                                                                                                                                                                                                    |
| `mode`              | `false`  | "in_memory"     | String           | String that indicates which workload configuration you want to target for this field. The `mode` dictates the default values for both indexing and search. You can further fine-tune your index by overriding the default parameter values in the k-NN field mapping. See [Modes]() for more information                                                |
| `compression_level` | `false`    | "1x"            | String           | String that indicates how much quantization should be applied on the index to reduce the memory footprint. See [Compression Levels]() for more information                                                                                                                                                                                              |
| `method`            | `false`    | See [Methods]() | Nested Object    | Defines the low-level algorithmic configuration for nearest neighbor search for the field. Can be used for additional fine-tuning on top of the `mode` and `compression_level` parameters. See [Methods]() for more information                                                                                                                         |
| `model_id`          | `false`    | See [Models]()  | String           | For k-NN configurations that require a training, or preprocessing, step before ingestion can begin, a `model` can be created via the [Training API]() and then used to configure the nearest neighbor search for the field. *Important* When this field is set, the other parameters of `knn_vector` cannot be set. See [Models]() for more information |

## Data Types

The `data_type` determines how many bits are required to represent a dimension in the vector.

| Datatype | Bits/Dimension | Supported Engines           | Description                                                                                                                                                                                                                                                       | 
|:---------|:---------------|:----------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `float`  | 32             | `faiss`, `lucene`, `nmslib` | TBD                                                                                                                                                                                                                                                               |
| `byte`   | 8              | `faiss`, `lucene`           | Must be in the [-128, 127]  range/                                                                                                                                                                                                                                |
| `binary` | 1              | `faiss`, `lucene`           | You must convert your binary data into 8-bit signed integers (`int8`) in the [-128, 127] range. For example, the binary sequence of 8 bits `0, 1, 1, 0, 0, 0, 1, 1` must be converted into its equivalent byte value of `99` to be used as a binary vector input. |


Ingesting `float` vectors would look like:
```json
PUT test-index/_doc/1
{
  "my_vector": [-126, 28, 127]
}
```

Ingesting `byte` vectors would look like:
```json
PUT test-index/_doc/1
{
  "my_vector": [-126, 28, 127]
}
```

where the input values are in the range -127 - 127

Ingesting `binary` vectors would look like
```json
PUT test-index/_doc/1
{
  "my_vector": [-126, 28, 127]
}
```
where TODO

## Space Types

A _space_ corresponds to the function used to measure the distance between two points in order to determine the k-nearest neighbors. From the k-NN perspective, a lower score equates to a closer and better result. This is the opposite of how OpenSearch scores results, where a higher score equates to a better result. The k-NN plugin supports the following spaces.

Not every engine supports each of these spaces. Be sure to check out [the engine documentation]() to make sure the space you are interested in is supported.
{: note.}

| Space type | Distance function ($$d$$ ) | OpenSearch score |
| :--- | :--- | :--- |
| `l1`  | $$ d(\mathbf{x}, \mathbf{y}) = \sum_{i=1}^n \lvert x_i - y_i \rvert $$ | $$ score = {1 \over {1 + d} } $$ |
| `l2`  | $$ d(\mathbf{x}, \mathbf{y}) = \sum_{i=1}^n (x_i - y_i)^2 $$ | $$ score = {1 \over 1 + d } $$ |
| `linf` | $$ d(\mathbf{x}, \mathbf{y}) = max(\lvert x_i - y_i \rvert) $$ | $$ score = {1 \over 1 + d } $$ |
| `cosinesimil` | $$ d(\mathbf{x}, \mathbf{y}) = 1 - cos { \theta } = 1 - {\mathbf{x} \cdot \mathbf{y} \over \lVert \mathbf{x}\rVert \cdot \lVert \mathbf{y}\rVert}$$$$ = 1 - {\sum_{i=1}^n x_i y_i \over \sqrt{\sum_{i=1}^n x_i^2} \cdot \sqrt{\sum_{i=1}^n y_i^2}}$$, <br> where $$\lVert \mathbf{x}\rVert$$ and $$\lVert \mathbf{y}\rVert$$ represent the norms of vectors $$\mathbf{x}$$ and $$\mathbf{y}$$, respectively. | **NMSLIB** and **Faiss**:<br>$$ score = {1 \over 1 + d } $$  <br><br>**Lucene**:<br>$$ score = {2 - d \over 2}$$ |
| `innerproduct` (supported for Lucene in OpenSearch version 2.13 and later) | **NMSLIB** and **Faiss**:<br> $$ d(\mathbf{x}, \mathbf{y}) = - {\mathbf{x} \cdot \mathbf{y}} = - \sum_{i=1}^n x_i y_i $$  <br><br>**Lucene**:<br> $$ d(\mathbf{x}, \mathbf{y}) = {\mathbf{x} \cdot \mathbf{y}} = \sum_{i=1}^n x_i y_i $$ | **NMSLIB** and **Faiss**:<br> $$ \text{If} d \ge 0,  score = {1 \over 1 + d }$$ <br> $$\text{If} d < 0, score = −d + 1$$  <br><br>**Lucene:**<br> $$ \text{If} d > 0, score = d + 1 $$ <br> $$\text{If} d \le 0, score = {1 \over 1 + (-1 \cdot d) }$$ |
| `hamming` (supported for binary vectors in OpenSearch version 2.16 and later) | $$ d(\mathbf{x}, \mathbf{y}) = \text{countSetBits}(\mathbf{x} \oplus \mathbf{y})$$ | $$ score = {1 \over 1 + d } $$ |

The cosine similarity formula does not include the `1 -` prefix. However, because similarity search libraries equate lower scores with closer results, they return `1 - cosineSimilarity` for the cosine similarity space---this is why `1 -` is included in the distance function.
{: .note }

With cosine similarity, it is not valid to pass a zero vector (`[0, 0, ...]`) as input. This is because the magnitude of such a vector is 0, which raises a `divide by 0` exception in the corresponding formula. Requests containing the zero vector will be rejected, and a corresponding exception will be thrown.
{: .note }

The `hamming` space type is supported for binary vectors in OpenSearch version 2.16 and later.
{: .note}

## Modes

Vector search involves trade-offs between low-latency and low-cost search. Specify the `mode` mapping parameter of the `knn_vector` type to indicate which search mode you want to prioritize. The `mode` dictates the default values for k-NN parameters. You can further fine-tune your index by overriding the default parameter values in the k-NN field mapping.

The following modes are currently supported.

| Mode    | Default engine | Description  |
|:---|:---|:---|
| `in_memory` | `nmslib`       | Prioritizes low-latency search. This mode uses the `nmslib` engine without any quantization applied. It is configured with the default parameter values for vector search in OpenSearch.                                                            |
| `on_disk`             | `faiss`        | Prioritizes low-cost vector search while maintaining strong recall. By default, the `on_disk` mode uses quantization and rescoring to execute a two-pass approach to retrieve the top neighbors. The `on_disk` mode supports only `float` vector types. |

To create a k-NN index that uses the `on_disk` mode for low-cost search, send the following request:

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
        "mode": "on_disk"
      }
    }
  }
}
```
{% include copy-curl.html %}

## Compression Levels

The `compression_level` mapping parameter selects a quantization encoder that reduces vector memory consumption by the given factor. The following table lists the available `compression_level` values.

| Compression level | Supported engines              |
|:------------------|:-------------------------------|
| `1x`              | `faiss`, `lucene`, and `nmslib` |
| `2x`              | `faiss`                        |
| `4x`              | `lucene`                       |
| `8x`              | `faiss`                        |
| `16x`             | `faiss`                        |
| `32x`             | `faiss`                        |

For example, if a `compression_level` of `32x` is passed for a `float32` index of 768-dimensional vectors, the per-vector memory is reduced from `4 * 768 = 3072` bytes to `3072 / 32 = 846` bytes. Internally, binary quantization (which maps a `float` to a `bit`) may be used to achieve this compression.

If you set the `compression_level` parameter, then you cannot specify an `encoder` in the `method` mapping. Compression levels greater than `1x` are only supported for `float` vector types.
{: .note}

The following table lists the default `compression_level` values for the available workload modes.

| Mode | Default compression level    |
|:------------------|:-------------------------------|
| `in_memory`       | `1x` |
| `on_disk`         | `32x` |


To create a vector field with a `compression_level` of `16x`, specify the `compression_level` parameter in the mappings. This parameter overrides the default compression level for the `on_disk` mode from `32x` to `16x`, producing higher recall and accuracy at the expense of a larger memory footprint:

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
        "mode": "on_disk",
        "compression_level": "16x"
      }
    }
  }
}
```
{% include copy-curl.html %}

## Methods

A method definition refers to the underlying configuration of the approximate k-NN algorithm you want to use. Method definitions are used to either create a knn_vector field (when the method does not require training) or create a model during training that can then be used to create a knn_vector field.

A method definition will always contain the name of the method, the engine (the library) to use, and a map of parameters to configure the method.

Mapping parameter | Required | Default | Updatable | Description
:--- | :--- | :--- | :--- | :---
`name` | true | n/a | false | The identifier for the nearest neighbor method.
`space_type` | false | l2 | false | The vector space used to calculate the distance between vectors. Note: This value should be specified at the top level of the mapping.
`engine` | false | nmslib | false | The approximate k-NN library to use for indexing and search. The available libraries are faiss, nmslib, and lucene. See [Engines]()
`parameters` | false | null | false | The parameters used for the nearest neighbor method.

See [Engines]() for more details about which methods are supported by which engines. 

## Models

Model IDs are used when the underlying Approximate k-NN algorithm requires a training step. As a prerequisite, the model must be created with the [Train API]({{site.url}}{{site.baseurl}}/search-plugins/knn/api#train-a-model). The
model contains the information needed to initialize the native library segment files.

```json
    "my_vector": {
      "type": "knn_vector",
      "model_id": "my-model"
    }
```

## Disable KNN Index Building

In some cases, you do not want to build the ANN structures for nearest-neighbor search. For example, you may want to just use the vectors for scripting or exact search, or you may just want to ingest a data set for training. In order to create an index that does not create these structures, run the following:
```json
PUT test-index
{
  "mappings": {
    "properties": {
      "my_vector": {
        "type": "knn_vector",
        "dimension": 3,
        "data_type": "float"
      }
    }
  }
}
```

Note that properties related to the Vector Space are valid, but properties related to the ANN method are invalid.

