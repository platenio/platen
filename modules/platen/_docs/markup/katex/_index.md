---
title: KaTeX Formulas
weight: 120
summary: >-
  Documentation on using math markup to include formulas in your text.
platen:
  title_as_heading: true
  menu:
    collapse_section: true
Memo:
  MungeTitle: false
  front_matter:
    configs:
      - merge:
          - ./block:frontmatter/codeblock.json
          - ./inline:frontmatter/image.json
        publish: /frontmatter/platen/content/snippets/katex.json
---

Platen supports using [KaTeX markup][01] to add mathematical and scientific formulas to your pages.
You can add the formulas inline (inside paragraphs or lists) with [image links][02] or as blocks on
their own with [codeblocks][03].

``````memo-example-renderer { skip_number=true level=2 }
This is the Special Relativity Equation:

```katex
x={\frac {-b\pm {\sqrt {b^{2}-4ac}}}{2a}}
```

In the equation, ![katex:E]() is energy, ![katex:m]() is mass, and ![katex:c]()
is the speed of light.

In plain words, energy equals mass times the speed of light squared.
``````

Regardless of whether you're using the inline or block syntax, you can use any valid
[KaTeX functions][04] and Platen will render them. If you use the `\ce{...}` expression for
chemistry equations, use the `chem` language ID for a codeblock, or use the `chem:` prefix for an
image link, Platen loads the [mhchem library][05] for you to render chemistry formulas too.

## Inline Formulas

To use KaTeX markup inline, add an image link with the `katex:`, `math:`, or `chem:` prefix for the
alt text. The rest of the alt text is treated as KaTeX and rendered.

That turns `![katex:x=y^{2}]()` into ![katex:x=y^{2}]().

For more information, see [Inline KaTeX][02].

## Block Formulas

To use KaTeX markup for larger formulas or as standalone figures, add a codeblock with the `katex`,
`math`, or `chem` language ID.

That turns this:

``````markdown
```katex
---
caption: The Quadratic Formula
---
x={\frac {-b\pm {\sqrt {b^{2}-4ac}}}{2a}}
```
``````

Into this:

```katex
---
caption: The Quadratic Formula
---
x={\frac {-b\pm {\sqrt {b^{2}-4ac}}}{2a}}
```

For more information, see [Block KaTeX][03].

## Manual Markup

Platen also supports rendering of KaTeX without using the [inline image link][02] or
[codeblock][03] syntax. While this usage can be concise and convenient, it isn't always obvious
what's happening when someone is reading the source.

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
set [sref:`platen.markup.katex.enabled`][s06] to `false` in your site configuration.

If you want to ensure you can use math or chemistry markup on a page without using a codeblock or
shortcode, you'll need to add [sref:`platen.markup.katex`][s07] to your page's front matter and
set `always_load` to `true` or set [sref:`always_load` in your site configuration][s08] to `true`.

```memo-example-data
platen:
  markup:
    katex:
      always_load: true
```

With `always_load` set to `true`, the KaTeX modules added to the page and automatically renders any
[valid tags](#manual-markup) outside of codeblocks and inline code declarations.

For more information about the available options for configuring KaTeX site wide, see
[sref:the configuration documentation][s09].

<!-- Link References -->
[01]: https://katex.org/
[02]: inline.md
[03]: block.md
[04]: https://katex.org/docs/supported.html
[05]: https://mhchem.github.io/MathJax-mhchem/
[s06]: platen.site.markup.katex.Enabled
[s07]: platen.content.markup.katex
[s08]: platen.site.markup.katex.always_load
[s09]: platen.site.markup.katex
