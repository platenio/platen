---
name: "{{ .Name }}"
title: "{{ .Name | humanize | title }}"
summary: |
  Write a summary here
weight: 2
schematize: "{{ .Name }}"
outputs:
  - HTML
  - Schematize
---

{{% schematize %}}
