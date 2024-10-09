---
layout: default
title: Querying
nav_order: 8
parent: Vector Search
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

Filters
2. Radial
3. Nested
4. Hybrid
5. Re-scoring
6. Re-ranking
7. Exact search