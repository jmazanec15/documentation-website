---
layout: default
title: Delete Model
nav_order: 7
parent: Vector Search APIs
has_children: false
---


## Delete a model

You can delete a model in the cluster by using the DELETE operation. See the following usage example.

#### Usage

The following example shows how to delete a k-NN model:

```json
DELETE /_plugins/_knn/models/{model_id}
{
  "model_id": {model_id},
  "acknowledged": true
}
```

