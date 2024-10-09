---
layout: default
title: Radial Search
nav_order: 99
parent: Tutorials
has_children: false
has_math: true
grand_parent: Vector Search
---

# Radial Search Tutorial

```json
POST /products-shirts/_search
{
  "size": 2,
  "query": {
    "knn": {
      "item_vector": {
        "vector": [
          2, 4, 3
        ],
        "k": 10
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
