---
title: Markup
summary: Documentation on the special markup Platen uses.
weight: 30
Platen:
  Menu:
    CollapseSection: true
---

This section documents the special markup that Platen supports. The markup transforms your Markdown
without requiring the use of [shortcodes][01] or inline HTML, meaning you can write more normal
Markdown while still adding non-standard blocks and elements to your site. Platen supports special
markup for codeblocks, headings, images (both block and inline), and links.

Codeblocks, headings, and block images support using attributes to pass options to the markup
outside of your site or page configuration. For more information, see the [Attributes](#attributes)
section.

## Codeblocks

A codeblock normally highlights the plain text source code placed inside it. Platen uses codeblocks
for rendering blocks of text, like adding [tabs][02] or [columns][03], and converting non-Markdown
text, like [turning KaTeX markup into formulas][04] or [Mermaid markup into diagrams][05].

In Markdown, a codeblock is specified with three or more backticks (`` ``` ``) followed by a
language ID. In addition to providing syntax highlighting for [many code languages][06] through
Hugo, Platen supports specific language IDs to transform your input.

Generally, Codeblocks use this syntax:

``````markdown
```<language_id>
<definition>
```
``````

Platen's markup codeblocks use this syntax:

``````markdown
```<language_id> { <attributes>}
---
<options>
---
<definition>
```
``````

In addition to [attributes](#attributes), Platen's markup that use codeblocks also all support
passing options as a [YAML][07] block wrapped in lines that only have triple dashes (`---`). This is
a more readable alternative to attributes, which are limited to a single line for codeblocks and
only support basic types of values.

You can use attributes and the option block together, but it's best practice to only use one of
them for a codeblock.

Options are always defined and documented for each codeblock markup.

## Headings

Headings are used to add semantic structure to a page. They create a [sref:`<h1>`--`<h6>`][s01]
heading element. This paragraph is immediately beneath an `<h2>` element.

In Markdown, a heading is specified with one or more hashes (`#`) followed by a space and then the
heading's text and an optional declaration of attributes in curly braces (`{}`).

Generally, headings use this syntax:

```markdown
### <text>
```

Platen's markup headings use this syntax:

```markdown
### <text> { <attributes> }
```

Platen's markup headings always use an attribute to tell Platen to render the heading differently
than default. If your heading doesn't have any attributes, you can be sure it will render normally.

For more information about how attributes work, see the [Attributes](#attributes) section.

## Image Links

Markdown supports adding images to your pages with [sref:alt text][s02] and an optional
[sref:title][s03] as an image link. You can add image links inline (inside a paragraph, table, or
other block element) or as a block of their own.

Generally, image links use this syntax:

```markdown
![alt_text](source 'title')
```

``````details { summary="Image Reference Links" }
You can also write image links with references. This is useful when the `source`
is reused multiple times. Instead of adding the parentheses after the alt text
with the source (and optional title), add square brackets (`[]`) with a
reference id. At the bottom of your Markdown, define the reference id by adding
it, followed by a colon (`:`) and then the source and optional title.

For example, these two links are equivalent:

```markdown
<!--   Basic Image Link   -->
![Platen Logo](/images/logo.svg)

<!-- Image Reference Link -->
![Platen Logo][01]

<!-- Reference Definition -->
[01]: /images/logo.svg
```

The syntax for image reference links is:

```markdown
![alt_text][reference_id]

[reference_id]: source 'title'
```

The reference definition can be anywhere in the file, but it's best practice to
define all of them at the end of the file. You can use whatever ID you want for
a reference link. Generally, shorter names break the flow of your Markdown less.
``````

### Inline Image Links

By default, inline image links may break the flow of their containing block element. Some of
Platen's markup uses inline image links to insert HTML into a block element without breaking the
flow, like the markup for [buttons][08].

Platen's markup for inline image links use this syntax:

```markdown
![prefix:alt_text](source 'title')
```

Platen's markup that uses inline image links always requires a prefix that ends with a colon (`:`)
that tells Platen which markup it should treat the image link as. Image links without a prefix or
with an unrecognized prefix are always treated as normal image links.

Inline image links don't have attributes and are usually less flexible than block image links.

### Block Image Links

Platen's markup for block image links use this syntax:

```markdown
![prefix:alt_text](source 'title')
{ <attributes> }
```

Platen's markup that uses block image links always requires a prefix that ends with a colon (`:`)
that tells Platen which markup it should treat the image link as. Image links without a prefix or
with an unrecognized prefix are always treated as normal image links.

Block image links can have attributes to add more options for how the markup is used. For more
information, see the [Attributes](#attributes) section.

## Links

Markdown supports adding [linked text][s04] to your pages with an optional [sref:link title][s05].

Links use this basic syntax:

```markdown
[text](destination 'title')
```

Platen's markup for links use this syntax:

```markdown
[prefix:text](destination 'title')
```

Platen's markup that links always requires a prefix that ends with a colon (`:`) that tells Platen
which markup it should treat the link as. Links without a prefix or with an unrecognized prefix are
always treated as normal links.

Links don't have attributes.

## Attributes

Platen supports passing attributes to Markdown blocks, like tables, lists, and paragraphs. They can't
be passed to inline elements like links or images inside a paragraph.

Unless otherwise stated, all of Platen's special markup and all Markdown block elements support
using attributes to set the rendered markup's or element's [sref:`id`][saa] attribute and add to its
[sref:`class`] attribute.

Attributes are always declared wrapped in curly braces (`{}`). Except for codeblocks, the attributes
may span multiple lines, which can make them easier to read.

The ID attribute is always specified with a hash (`#`) prefix. For example, to add the ID `cool-pic`
to an image, you would use `#cool-pic`:

```markdown
![alt_text](source)
{ #cool-pic }
```

You can add any number of classes by including them in the attribute declaration with a dot (`.`)
prefix. For example, to add the classes `foo`, `bar`, and `baz` to a codeblock, you would use `.foo`,
`.bar`, and `.baz`:

``````markdown
```html { .foo .bar .baz }
<p>An example HTML codeblock</p>
```
``````

Other attributes may be added as key-value pairs separated by an equals sign (`=`). For example, to
pass the attribute `collapse` as `true` for a heading, you would use `collapse=true`:

```markdown
## A Very Long Section { collapse=true }
```

A few notes on values for key-value pairs in attributes:

- If the value should be boolean (either `true` or `false`) or a number, don't wrap the value in
  quotes.
- If the value is a string of text, wrap the value in either single (`'`) or double (`"`) quotes.

How the attributes are used depends on each markup's syntax.

## Available Markup

This section includes the list of available markup for Platen. For more information on any of them,
see their documentation.

```section
```

<!-- Link References -->
[01]: https://gohugo.io/content-management/shortcodes/
[02]: tabs.md
[03]: columns.md
[04]: katex/_index.md
[05]: mermaid.md
[06]: https://gohugo.io/content-management/syntax-highlighting/
[07]: https://learnxinyminutes.com/docs/yaml/
[08]: buttons.md
[s01]: mdn.html.element:Heading_Elements
[s02]: mdn.html.element:img#attr-alt
[s03]: mdn.html.element:img#the_title_attribute
[s04]: mdn.html.element:a
[s05]: mdn.html.global_attribute:title
