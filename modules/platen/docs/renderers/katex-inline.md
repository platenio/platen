---
title: Inline KaTeX
summary: >-
  Documentation on the `katex` image link renderer, which renders math markup in the alt text of an
  image link on a content page, allowing you to include formulas and other advanced representations.
Platen:
  TitleAsHeading: true
Memo:
  Name: katex
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

## Manual Markup Rendering

Platen also supports rendering of KaTeX without using the image link or [codeblock][02] markup.
While this usage can be concise and convenient, it isn't always obvious what's happening when
someone is reading the source.

Platen doesn't use this rendering inside of inline code.

Be mindful when using a display mode syntax outside of a codeblock that the display mode rendering
breaks normal paragraph flow.

By default, any text wrapped in the following tag pairs is rendered:

- Inline Mode Syntaxes:
  - `\\(...\\)`

    ```markdown
    This is \\(x^{2}\\), which is also written as \\(x \times x\\).
    ```

    This is \\(x^{2}\\), which is also written as \\(x \times x\\).
- Display Mode Syntaxes:
  - `\\[...\\]`

    ```markdown
    \\[x={\frac {-b\pm {\sqrt {b^{2}-4ac}}}{2a}}\\]
    ```

    \\[x={\frac {-b\pm {\sqrt {b^{2}-4ac}}}{2a}}\\]
  - `$$...$$`

    ```markdown
    $$x={\frac {-b\pm {\sqrt {b^{2}-4ac}}}{2a}}$$
    ```

    $$x={\frac {-b\pm {\sqrt {b^{2}-4ac}}}{2a}}$$

## Configuration

You can also use configuration to define how KaTeX behaves on your Platen site. If you want to use
KaTeX rendering inside of a codeblock, no special configuration is required as long as you haven't
set [sref:`Platen.Markup.Katex.Enabled`][s02] to `false` in your site configuration.

If you want to ensure you can use math or chemistry markup on a page without using a codeblock or
shortcode, you'll need to add [sref:`Platen.Markup.Katex`][s03] to your page's front matter and
set `AlwaysLoad` to `true` or set [sref:`AlwaysLoad` in your site configuration][s04] to `true`.

```memo-example-data
Platen:
  Markup:
    Katex:
      AlwaysLoad: true
```

With `AlwaysLoad` set to `true`, the KaTeX modules added to the page and automatically renders any
[valid tags](#manual-markup-rendering) outside of codeblocks and image link declarations.

For more information about the available options for configuring KaTeX site wide, see
[sref:the configuration documentation][s05].

<!-- Link References -->
[01]: https://katex.org/
[02]: katex.md
[03]: https://katex.org/docs/supported.html
[04]: https://mhchem.github.io/MathJax-mhchem/
[s01]: mdn.html.element:span
[s02]: Platen.Site.Markup.Katex.Enabled
[s03]: Platen.Content.Markup.Katex
[s04]: Platen.Site.Markup.Katex.AlwaysLoad
[s05]: Platen.Site.Markup.Katex
