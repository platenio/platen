---
title: katex Shortcode
summary: >-
  Documentation on the `katex` shortcode, which renders math markup on a content
  page, allowing you to include formulas and other advanced representations.
Platen:
  TitleAsHeading: true
Memo:
  Name: katex
  Kind: Shortcode
  TagType: NoProcess
  Parameters:
    display:
      Named: true
      Position: 0
      Type: Boolean
      Required: false
    class:
      Named: true
      Position: 1
      Type: String.Class
      Required: false
  InnerText:
    Required: true
    Type: KaTeX
    TrimsLeadingWhiteSpace: true
---

The `katex` shortcode enables you to use render math symbols and equations using the [KaTeX][01]
markup language in your content.

## Syntax

{{< memo/shortcode/syntax >}}

## Examples

```memo-example-shortcode { title="Simple Inline Example" }
  This is {{</* katex */>}}\Pi{{</* /katex */>}}
```

```memo-example-shortcode { title="Display Block Example" }
  {{</* katex display=true */>}}
    \text{The Quadratic Formula:} \newline
    \quad \newline
    x={\frac {-b\pm {\sqrt {b^{2}-4ac}}}{2a}}
  {{</* /katex */>}}
```

## Parameters

### `display`

Specify whether the rendered math should use display mode instead of inline mode. In display mode,
the rendered math is centered and the `span` element displays as a block with a `1em` vertical
margin.

By default, the rendered math is displayed inline without any additional margin.

{{< memo/shortcode/parameter "display" >}}

### `class`

Specify any additional classes to add to the `span` containing the rendered math. By default, the
span has the `katex` class or `katex-display` if the `display` parameter is set to `true`.

{{< memo/shortcode/parameter "class" >}}

## Inner

Specify the KaTeX markup to render. For more information about this markup, see the
[KaTeX documentation for supported functions][02].

{{< memo/shortcode/inner >}}

<!-- Link References -->
[01]: https://katex.org/
[02]: https://katex.org/docs/supported.html
