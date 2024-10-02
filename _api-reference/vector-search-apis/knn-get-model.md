---
layout: default
title: Get Model
nav_order: 5
parent: Vector Search APIs
has_children: false
---

## Get a model

The GET model operation retrieves information about models present in the cluster. Some native library index configurations require a training step before indexing and querying can begin. The output of training is a model that can be used to initialize native library index files during indexing. The model is serialized in the k-NN model system index. See the following GET example:

```
GET /_plugins/_knn/models/{model_id}
```

Response field |  Description
:--- | :---
`model_id` | The unique identifier of the fetched model.
`model_blob` | The base64 encoded string of the serialized model.
`state` | The model's current state, which can be `created`, `failed`, or `training`.
`timestamp` | The date and time when the model was created.
`description` | A user-provided description of the model.
`error` | An error message explaining why the model is in a failed state.
`space_type` | The space type for which this model is trained, for example, Euclidean or cosine. Note - this value can be set in the top-level of the request as well
`dimension` | The dimensionality of the vector space for which this model is designed.
`engine` | The native library used to create the model, either `faiss` or `nmslib`. 

### Usage

The following examples show how to retrieve information about a specific model using the k-NN plugin API. The first example returns all the available information about the model, while the second example shows how to selectively retrieve fields.

```json
GET /_plugins/_knn/models/test-model?pretty
{
  "model_id" : "test-model",
  "model_blob" : "SXdGbIAAAAAAAAAAAA...",
  "state" : "created",
  "timestamp" : "2021-11-15T18:45:07.505369036Z",
  "description" : "Default",
  "error" : "",
  "space_type" : "l2",
  "dimension" : 128,
  "engine" : "faiss" 
}
```

```json
GET /_plugins/_knn/models/test-model?pretty&filter_path=model_id,state
{
  "model_id" : "test-model",
  "state" : "created"
}
```
