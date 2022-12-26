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
  Kind: Renderer.Codeblock
  Attributes:
    display:
      Type: Boolean
      Required: false
      Default: true
  Definition:
    Type: KaTeX
    Syntax: <KaTeX markup>
---

With the `katex` language ID, you can render mathematical and scientific equations in your content
by writing [KaTeX markup][01] inside of a codeblock.

By default, when your KaTeX markup is rendered with a codefence, it's rendered in display mode. This
centers the rendered markup and adds a top and bottom margin to the block.

To use KaTeX for inline markup, see the [`katex` shortcode][02] instead.

## Syntax

{{< memo/renderer/syntax >}}

## Examples

``````memo-example-renderer { title="Quadratic Formula" }
```katex
x={\frac {-b\pm {\sqrt {b^{2}-4ac}}}{2a}}
```
``````

``````memo-example-renderer { title="Quadratic Formula with Classes" }
This example uses the `class` attribute to add classes to the rendered
span. Together, these classes change how the KaTeX is displayed after
it's rendered.
<!--- Example Start -->
```katex { .docs .example .katex }
x={\frac {-b\pm {\sqrt {b^{2}-4ac}}}{2a}}
```
``````

``````memo-example-renderer { title="Quadratic Formula in Inline Mode" }
This example uses the `display` attribute to force the rendered KaTeX to
display in inline mode instead of the default display mode.
<!--- Example Start -->
```katex { display=false }
x={\frac {-b\pm {\sqrt {b^{2}-4ac}}}{2a}}
```
``````

``````memo-example-renderer { title="Quadratic Formula in Math Codeblock" }
```math
x={\frac {-b\pm {\sqrt {b^{2}-4ac}}}{2a}}
```
``````

``````memo-example-renderer { title="Chemistry" }
```chemistry
\ce{CO2 + C -> 2 CO}
```
``````

## Attributes

### `class`

Specify any additional classes to add to the `span` containing the rendered math. By default, the
span has the `katex` class or `katex-display` if the `display` parameter is set to `true`.

{{< memo/renderer/attribute "class" >}}

### `display`

Specify whether the rendered markup should use display mode. In display mode, the rendered math is
centered and the `span` element displays as a block with a `1em` vertical margin. In inline mode,
the math is displayed without any additional margin.

By default, the KaTeX is rendered in display mode. Set this value to `false` to render in inline mode.

{{< memo/renderer/attribute "display" >}}

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
set `Platen.Features.Katex.Enabled` to `false` in your site configuration.

If you want to ensure you can use math or chemistry markup on a page without using a codeblock or
shortcode, you'll need to add `Platen.Features.Katex` to your page's front matter.

```memo-example-data
Platen:
  Features:
    Katex:
      Enabled: true
```

With `Platen.Features.Katex.Enabled` set to `true`, KaTeX is added to the page and
automatically renders any [valid tags](#non-codeblock-rendering) outside of codeblocks and inline
code declarations.

[01]: https://katex.org/
[02]: ../shortcodes/katex.md
[03]: https://katex.org/docs/supported.html
[04]: https://mhchem.github.io/MathJax-mhchem/
