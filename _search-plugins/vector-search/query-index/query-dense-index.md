---
layout: default
title: Dense Vectors
nav_order: 4
parent: Query
grand_parent: Vector Search
---

# Querying data

To query the data:
```json
GET my-knn-index-1/_search
{
  "size": 2,
  "query": {
    "knn": {
      "my_vector2": {
        "vector": [2, 3, 5, 6],
        "k": 2
      }
    }
  }
}
```
{% include copy-curl.html %}

<details>
	<summary>Python Snippet</summary>

	~~~ python
    print("Hello python")
    ~~~
</details>

## Retrieving Data

## Re-ranking results