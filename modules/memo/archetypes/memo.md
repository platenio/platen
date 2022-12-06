---
title: "{{ .Name }}"
summary: |
  Write a summary here.
Memo:
  Name: details
  Parameters:
    name:
      Title: name
      Named: true
      Position: 0
      Type: String.Markdown.Inline
      Required: true
  InnerText: # Delete this key if the shortcode doesn't use .Inner
    Required: true
    Type: String.Markdown.Block
    TrimsLeadingWhiteSpace: true
outputs:
  - HTML
  # - MemoFrontMatter
---

Put your leading description here.

## Syntax

{{% memo/shortcode/syntax %}}

## Examples

{{% memo/shortcode/example "1. Positional Parameter Example" %}}

  {{%/* details "Example 1" "info" */%}}
    This text is rendered in a `detail` tag with a `summary` tag. The body
    text is formatted as Markdown. If you inspect the rendered element on the
    page, it has `info` added to its class attribute.
  {{%/* /details */%}}

{{% /memo/shortcode/example %}}

## Parameters

### `name`

Put your parameter description here.

{{% memo/shortcode/parameter "name" %}}

### Inner

If your shortcode uses `.Inner`, explain how and why here. If it doesn't, delete
this section.

{{% memo/shortcode/inner %}}
