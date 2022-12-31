---
title: Columns
summary: >-
  Documentation on the `columns` language ID for codeblocks, which enables you to format content in
  multiple columns on a page.
Platen:
  TitleAsHeading: true
Memo:
  Name: columns
  Kind: Renderer.Codeblock
  Attributes:
    id:
      Required: true
  Definition:
    Nested:
      Name: column
      Kind: Renderer.Codeblock
      Attributes:
        grow:
          Type: Integer
          Required: false
      Definition:
        Type: String.Markdown.Block
        Syntax: Markdown to _render_ for the column
---

The `columns` codeblock renderer makes it possible for you to convert Markdown content into columns
with a flexible ratio.

When used, it creates a [sref:`<div>`][s01] HTML container with each column of content is inserted
in their own `div`. The Markdown content in each column is rendered as normal.

## Syntax

The `columns` codeblock supports setting options as either attributes or as YAML in a data block at
the start of the codeblock. If you're using the attribute syntax, the options must be specified
on the same line that the codeblock opens on. If you're using the data syntax, the options must be
specified as valid YAML wrapped with three dashes (`---`) before the rest of the definition.

For more information, see [Using Codeblocks][01] in the [User Guide][02].

{{< memo/renderer/syntax >}}

## Examples

`````````memo-example-renderer { title="Minimal Example" }
``````columns { #example-1 }
```column
This is the first of two evenly spaced columns.
```

```column
This is the second column's text.
```
``````
`````````

`````````memo-example-renderer { title="Full Example" }
``````columns { #example-1 .example }
```column { .lead grow=2 }
This is the first column. It's twice as wide as the second column
and has the `lead` class.

The `columns` codeblock adds the
`example` class to the containing `div`.
```

```column
This is the second column. Because it doesn't specify a value for
the `grow` option, it defaults to 1.

This makes it half as wide as the other columns.

It has no extra class.
```

```column
---
class: follow
grow:  2
---
This is the third column. It's the same size as the first and has
the `follow` class.

It uses the data syntax instead of attributes.
```
``````
`````````

## Attributes

### `class`

Specify any additional classes to add to the `div` containing the columns.

{{< memo/renderer/attribute "class" >}}

### `id`

Specify a page-unique ID for the set of columns. This is used to associate the columns together.

{{< memo/renderer/attribute "id" >}}

## YAML Options

### `class`

Specify any additional classes to add to the `div` containing the columns.

{{< memo/renderer/option "class" >}}

### `id`

Specify a page-unique ID for the set of columns. This is used to associate the columns together.

{{< memo/renderer/option "id" >}}

## Definition

Inside a `columns` codeblock you must use one or more `column` codeblocks. These determine how the
columns themselves are rendered, while the attributes for the containing `columns` codeblock control
the behavior of the column group overall.

### `column` Codeblocks

Each `column` codeblock you use inside a `columns` codeblock adds another column. You can control
the size and styling for each column independently.

#### Syntax

{{< memo/renderer/syntax nested=true >}}

#### Attributes

##### `class`

Specify any additional classes to insert into the class list for this column's `div`.

By default, the `div` has the `flex-even` and `markdown-inner` classes. For more information about
how classes affect the styling of content in this shortcode, see [Styling](#styling).

{{< memo/renderer/attribute "Nested.class" >}}

##### `grow`

Specify the column's maximum width in the group. Each column is given an inline style specifying a
value for the [sref:`flex-grow`][s02] attribute, which controls how the columns are displayed in the
group.

If this value isn't specified for any `column`, all columns are added with equal width. If this
value is specified for any `column`, all columns without a width are treated as having a width of
`1`.

{{< memo/renderer/attribute "Nested.grow" >}}

##### `id`

Specify an optional ID to give this column's div. By default, individual columns do not have an ID.
If you set this value, the column is given its own ID, enabling anyone to link directly to it.

{{< memo/renderer/attribute "Nested.id" >}}

##### Definition

Inside the `column` codeblock you can write any valid Markdown you want. It's rendered as a block
without wrapping `<p>` tags.

## Styling

The container `div` for the columns is automatically assigned the `platen-columns`, `flex`, and
`flex-wrap` classes. Each column's content is placed inside a child `div` with the `flex-even` and
`markdown-inner` classes.

The child `div` elements also have the inline style `flex-grow:<grow>` added, where `<grow>` is the
value specified for that column in their `grow` parameter.

By default, when the site is rendered in mobile view, the columns are collapsed on top of each
other. This turns them into rows of content in the same order they were defined in the shortcode.
You can override this behavior, having the columns always display as columns even on small screens,
by adding `no-flatten-for-mobile` to the value of the `class` parameter of the `columns` shortcode.

<!-- Link References -->
[01]: /using
[02]: /using
[s02]: mdn.css:flex-grow
[s01]: mdn.html.element:div
