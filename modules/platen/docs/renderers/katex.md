---
title: KaTeX Codeblocks
summary: >-
  Documentation on the `katex` language ID for codeblocks, which renders math markup on a content
  page, allowing you to include formulas and other advanced representations.
Platen:
  TitleAsHeading: true
Memo:
  Name: katex
  Aliases:
    - math
    - chem
  Kind: Renderer.Codeblock
  Attributes:
    display:
      Type: Boolean
      Required: false
      Default: true
    as_figure:
      Type: Boolean
      Required: false
  Data:
    caption:
      Type: String.Markdown.Block
      Required: false
    caption_position:
      Enum:
        - top
        - bottom
      Required: false
      Default: 'bottom'
  Definition:
    Type: KaTeX
    Syntax: <KaTeX Markup>
---

With the `katex` language ID, you can render mathematical and scientific equations in your content
by writing [KaTeX markup][01] inside of a codeblock.

By default, when your KaTeX markup is rendered with a codeblock, it's rendered as a
[sref`<div>`][s01] element and in display mode. This centers the rendered markup and adds a top and
bottom margin to the block.

To use KaTeX for inline markup, see the [`katex` shortcode][02] instead.

## Syntax

{{< memo/renderer/syntax >}}

## Examples

``````memo-example-renderer { title="Quadratic Formula" }
```katex
x={\frac {-b\pm {\sqrt {b^{2}-4ac}}}{2a}}
```
``````

``````memo-example-renderer { title="With Classes" }
This example uses the `class` attribute to add classes to the rendered
div. Together, these classes change how the KaTeX is displayed after
it's rendered.
<!--- Example Start -->
```katex { .docs .example .katex }
x={\frac {-b\pm {\sqrt {b^{2}-4ac}}}{2a}}
```
``````

``````memo-example-renderer { title="Inline Mode" }
This example uses the `display` attribute to force the rendered KaTeX to
display in inline mode instead of the default display mode.
<!--- Example Start -->
```katex { display=false }
x={\frac {-b\pm {\sqrt {b^{2}-4ac}}}{2a}}
```
``````

``````memo-example-renderer { title="As Figure with Caption" }
This example uses the options syntax to define a caption for the formula. That
ensures the KaTeX markup is rendered inside a figure. You could add it as a
figure without the caption by setting the `as_figure`
[attribute](#attribute-as_figure) or [option](#option-as_figure) to `true`.
<!--- Example Start -->
```katex
---
caption: The Quadratic Formula
---
x={\frac {-b\pm {\sqrt {b^{2}-4ac}}}{2a}}
```
``````

``````memo-example-renderer { title="Chemistry" }
```chem
\ce{CO2 + C -> 2 CO}
```
``````

## Attributes

### `class` { #attribute-class }

Specify any additional classes to add to the `div` containing the rendered formula. By default, the
div has no classes.

If [`as_figure`](#attribute-as_figure) is `true`, the classes are added to both the figure and the
div.

{{< memo/renderer/attribute "class" >}}

### `id` { #attribute-id }

Specify an ID to add to the div as the [sref:`id`][s02] attribute. This makes it easier to link
directly to a formula. If this value isn't specified, the div has no ID.

If [`as_figure`](#attribute-as_figure) is `true`, the ID is added to the figure instead.

{{< memo/renderer/attribute "id" >}}

### `as_figure` { #attribute-as_figure }

Specify whether to render the KaTeX inside a [sref:`<figure>`][s03] element. When this value is
`true`, the formula is added inside a figure and the `id` and `class` both apply to that
figure. The `class` is also inherited on the div for the formula.

{{< memo/renderer/attribute "as_figure" >}}

### `display` { #attribute-display }

Specify whether the rendered markup should use display mode. In display mode, the rendered math is
centered and the `div` element displays as a block with a `1em` vertical margin. In inline mode,
the math is displayed without any additional margin.

By default, the KaTeX is rendered in display mode. Set this value to `false` to render in inline
mode.

{{< memo/renderer/attribute "display" >}}

## YAML Options

### `as_figure` { #option-as_figure }

Specify whether to render the formula inside a [sref:`<figure>`][s03] element. When this
value is `true`, the formula is added inside a figure and the `id` and `class` both apply to
that figure. The `class` is also inherited on the div for the formula.

{{< memo/renderer/option "as_figure" >}}

### `caption` { #option-caption }

Specify Markdown to use as the caption for the figure element. If this value is set, the formula is
rendered inside a figure element even if [`as_figure`](#option-as_figure) isn't set to `true`.

The caption's Markdown is rendered as a block without wrapping [sref:`<p>`][s04] tags inside a
[sref:`<figcaption>`][s05] element. By default, it's added beneath the formula.

You can use the [`caption_position`](#option-caption_position) option to render the caption above
the formula in the figure.

{{< memo/renderer/option "caption" >}}

### `caption_position` { #option-caption_position }

Specify either `top` or `bottom` to render the figure's caption above or below the formula. The
default value is `bottom`. This option is ignored if [`caption`](#option-caption) isn't set or is
empty.

{{< memo/renderer/option "caption_position" >}}

### `class` { #option-class }

Specify any additional classes to add to the `div` containing the rendered formula. By default, the
div has no classes.

If [`as_figure`](#option-as_figure) is `true` or [`caption`](#option-caption) is set, the classes are
added to both the figure and the div.

{{< memo/renderer/option "class" >}}

### `display` { #option-display }

Specify whether the rendered markup should use display mode. In display mode, the rendered math is
centered and the `div` element displays as a block with a `1em` vertical margin. In inline mode,
the math is displayed without any additional margin.

By default, the KaTeX is rendered in display mode. Set this value to `false` to render in inline
mode.

{{< memo/renderer/option "display" >}}

### `id` { #option-id }

Specify an ID to add to the div as the [sref:`id`][s02] attribute. This makes it easier to link
directly to an equation. If this value isn't specified, the div has no ID.

If [`as_figure`](#option-as_figure) is `true` or [`caption`](#option-caption) is set, the ID is added
to the figure instead.

{{< memo/renderer/option "id" >}}

## Definition

Inside the codeblock, you can use any valid [KaTeX functions][03] and Platen will render them.

If you use the `\ce{...}` expression for chemistry equations in a codeblock or give a
codeblock the `chem` language ID, Platen loads the [mhchem library][04] for you.

The `math` and `chem` language IDs are included for readability and convenience. All three language
IDs work the same way.

## Non-Codeblock Rendering

Platen also supports rendering of KaTeX without using the [shortcode][02] or a codeblock. While this
usage can be concise and convenient, it isn't always obvious what's happening when someone is
reading the source.

Platen doesn't use this rendering inside of inline code.

Be mindful when using a display mode syntax outside of a codeblock that the display mode rendering
breaks normal paragraph flow.

By default, any
text wrapped in the following tag pairs is rendered:

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
set [sref:`Platen.Features.Katex.Enabled`][s06] to `false` in your site configuration.

If you want to ensure you can use math or chemistry markup on a page without using a codeblock or
shortcode, you'll need to add [sref:`Platen.Features.Katex`][s07] to your page's front matter and
set `AlwaysLoad` to `true` or set [sref:`AlwaysLoad` in your site configuration][s08] to `true`.

```memo-example-data
Platen:
  Features:
    Katex:
      AlwaysLoad: true
```

With `AlwaysLoad` set to `true`, the KaTeX modules added to the page and automatically renders any
[valid tags](#non-codeblock-rendering) outside of codeblocks and inline code declarations.

For more information about the available options for configuring KaTeX site wide, see
[sref:the configuration documentation][s09].

[01]: https://katex.org/
[02]: ../shortcodes/katex.md
[03]: https://katex.org/docs/supported.html
[04]: https://mhchem.github.io/MathJax-mhchem/
[s01]: mdn.html.element:div
[s02]: mdn.html.global_attribute:id
[s03]: mdn.html.element:figure
[s04]: mdn.html.element:p
[s05]: mdn.html.element:figcaption
[s06]: Platen.Site.Features.Katex.Enabled
[s07]: Platen.Content.Features.Katex
[s08]: Platen.Site.Features.Katex.AlwaysLoad
[s09]: Platen.Site.Features.Katex
