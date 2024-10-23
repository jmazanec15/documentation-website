---
layout: default
title: Benchmarking
nav_order: 17
parent: Vector Search
---

# Benchmarking

Vector Search workload performance requirements can vary drastically between users. For instance, one user may need to handle a very high query throughput, while another may need the nearest neighbor search quality to be very high. OpenSearch is very configurable so that all of these tradeoff requirements can be met (See our [Performance Tuning](#performance-tuning.md) guide for more details). Thus, before deploying to production, it is important to benchmark your configuration and then tweak it based on your needs.

Fortunately, OpenSearch has a robust set of benchmarking tools that can do the job!

## OpenSearch Benchmarks

[OpenSearch Benchmark (OSB)](https://opensearch.org/docs/latest/benchmark) is the main performance testing tool the [OpenSearch Project](https://github.com/opensearch-project) uses to measure performance. Checkout the [Quickstart](https://opensearch.org/docs/latest/benchmark/quickstart/) page to get setup! For Vector Search, there are several different workloads available. See [here](https://github.com/opensearch-project/opensearch-benchmark-workloads/tree/main/vectorsearch#vector-search-workload) for details! 

In order to run a benchmark, after you have [followed the setup](https://opensearch.org/docs/latest/benchmark/quickstart/), all you have to do is configure the parameters and point OSB at your cluster:
```bash
opensearch-benchmark execute-test \
    --target-hosts $ENDPOINT \
    --workload vectorsearch \
    --workload-params ${PARAMS_FILE} \
    --pipeline benchmark-only \
    --kill-running-processes
```

If you think that another type of Vector Search test would be helpful, do not hesitate to cut an issue to the [OpenSearch Benchmark Workloads](https://github.com/opensearch-project/opensearch-benchmark-workloads) repository!

## Nightly Benchmarks

The OpenSearch team [runs nightly benchmarks](https://opensearch.org/benchmarks/) to track performance improvements over time and detect regressions. These give a general sense of the performance that can be achieved on a few different configurations. If you have any questions, feel free to ask a question on the [forum](https://forum.opensearch.org/c/plugins/k-nn/48)! 

## Running your own workload

OpenSearch Benchmarks is very extensible. If the default workloads do not meet your benchmarking needs, you can easily create a new, custom workload with OSB, without having to write everything from scratch. For more details, see OSB's [page on workloads](https://opensearch.org/docs/latest/benchmark/user-guide/working-with-workloads/index/).
