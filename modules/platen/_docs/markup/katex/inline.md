---
title: Inline KaTeX
weight: 20
summary: >-
  Documentation on the `katex` image link markup, which renders math markup in the alt text of an
  image link on a content page, allowing you to include formulas and other advanced representations.
platen:
  title_as_heading: true
Memo:
  Name: katex
  MungeTitle: false
  Aliases:
    - math
    - chem
  Kind: Renderer.Image
  Attributes:
    id:
      Ignore: true
    class:
      Ignore: true
  SupportsInline: true
  alt_text:
    Alias: formula
    Type: KaTeX
  destination:
    Ignore: true
  title:
    Ignore: true
---

Platen uses special notation for rendering mathematical and scientific formulas in your content by
writing [KaTeX markup][01] as the alt text for an image link.

By default, when your KaTeX markup is rendered with an image link, it's rendered as a
[sref:`<span>`][s01] element without any additional styling.

To write longer KaTeX formulas with more control, use the [`katex` codeblock][02] instead.

## Syntax

{{< memo/renderer/syntax >}}

## Examples

```memo-example-renderer { title="KaTeX In a Paragraph" }
The Special Relativity Equation is defined as ![katex:E=mc^{2}](), where
![katex:E]() is energy, ![katex:m]() is mass, and ![katex:c]() is the speed
of light.

In plain words, energy equals mass times the speed of light squared.
```

## Inputs

This section describes how the normal markdown input for images works with the button render hook.

Images use this syntax for their inputs:

```markdown
![alt_text](source)
```

### `alt_text` (as `formula`)

Specifies the KaTeX formula to render inline.

This value must start with the prefix `katex:`, `math:`, or `chem:`. For example, with the image
link `![math:x=y^{2}]()`, `text`'s value would be `x=y^{2}`. The `math` and `chem` prefixes are
included for readability and convenience. All three prefixes work the same way.

Platen inserts the formula in a [sref:`<span>`][s01] element with the formula wrapped in parentheses
preceded by a backslash. The wrapping parentheses tell the KaTeX libraries to render the text inside
them.

You can use any valid [KaTeX functions][03] and Platen will render them. If you use the `\ce{...}`
expression for chemistry equations in a codeblock or give a codeblock the `chem` language ID, Platen
loads the [mhchem library][04] for you.

{{< memo/renderer/input "alt_text" >}}

### `source`

This value is ignored by Platen.

<!-- Link References -->
[01]: https://katex.org/
[02]: block.md
[03]: https://katex.org/docs/supported.html
[04]: https://mhchem.github.io/MathJax-mhchem/
[s01]: mdn.html.element:span
