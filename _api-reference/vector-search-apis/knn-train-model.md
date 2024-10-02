---
layout: default
title: Train Model
nav_order: 4
parent: Vector Search APIs
has_children: false
---

## Train a model

You can create and train a model that can be used for initializing k-NN native library indexes during indexing. This API pulls training data from a `knn_vector` field in a training index, creates and trains a model, and then serializes it to the model system index. Training data must match the dimension passed in the request body. This request is returned when training begins. To monitor the model's state, use the [Get model API](#get-a-model).

Query parameter |  Description
:--- | :---
`model_id` | The unique identifier of the fetched model. If not specified, then a random ID is generated. Optional. 
`node_id` | Specifies the preferred node on which to execute the training process. If provided, the specified node is used for training if it has the necessary capabilities and resources available. Optional.

Request parameter |  Description
:--- | :---
`training_index` | The index from which the training data is retrieved.
`training_field` | The `knn_vector` field in the `training_index` from which the training data is retrieved. The dimension of this field must match the `dimension` passed in this request.  
`dimension` | The dimension of the model being trained.
`max_training_vector_count` | The maximum number of vectors from the training index to be used for training. Defaults to all the vectors in the index. Optional.
`search_size` | The training data is pulled from the training index using scroll queries. This parameter defines the number of results to return per scroll query. Default is `10000`. Optional.
`description` | A user-provided description of the model. Optional.
`method` | The configuration of the approximate k-NN method used for search operations. For more information about the available methods, see [k-NN index method definitions]({{site.url}}{{site.baseurl}}/search-plugins/knn/knn-index#method-definitions). The method requires training to be valid.
`space_type` | The space type for which this model is trained, for example, Euclidean or cosine. Note: This value can also be set in the `method` parameter.

#### Usage

The following examples show how to initiate the training process for a k-NN model:

```json
POST /_plugins/_knn/models/{model_id}/_train?preference={node_id}
{
    "training_index": "train-index-name",
    "training_field": "train-field-name",
    "dimension": 16,
    "max_training_vector_count": 1200,
    "search_size": 100,
    "description": "My model",
    "space_type": "l2",
    "method": {
        "name":"ivf",
        "engine":"faiss",
        "parameters":{
            "nlist":128,
            "encoder":{
                "name":"pq",
                "parameters":{
                    "code_size":8
                }
            }
        }
    }
}

{
    "model_id": "model_x"
}
```

```json
POST /_plugins/_knn/models/_train?preference={node_id}
{
    "training_index": "train-index-name",
    "training_field": "train-field-name",
    "dimension": 16,
    "max_training_vector_count": 1200,
    "search_size": 100,
    "description": "My model",
    "space_type": "l2",
    "method": {
        "name":"ivf",
        "engine":"faiss",
        "parameters":{
            "nlist":128,
            "encoder":{
                "name":"pq",
                "parameters":{
                    "code_size":8
                }
            }
        }
    }
}

{
    "model_id": "dcdwscddscsad"
}
```
