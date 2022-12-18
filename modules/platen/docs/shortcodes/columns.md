---
title: columns
summary: >-
  Documentation on the `columns` shortcode, which turns Markdown content into columns with a
  flexible ratio.
Platen:
  TitleAsHeading: true
Memo:
  Name: columns
  Parameters:
    id:
      Named: true
      Position: 0
      Type: String.ID
      Required: true
    class:
      Named: true
      Position: 1
      Type: String.Class
      Required: false
  InnerText:
    Required: true
    TrimsLeadingWhiteSpace: true
    Nested:
      Name: column
      Required: true
      TagType: NoProcess
      Parameters:
        grow:
          Named: true
          Position: 0
          Type: integer
          Required: false
        class:
          Named: true
          Position: 1
          Type: String.Class
          Required: false
      InnerText:
        Required: true
        Type: String.Markdown.Block
        TrimsLeadingWhiteSpace: true
---

The `columns` shortcode makes it possible for you to convert Markdown content into columns with
a flexible ratio.

When used, it creates a [`div`][01] HTML container with each column of content is inserted in their
own `div`. The Markdown content in each column is rendered as normal.

## Syntax

{{< memo/shortcode/syntax >}}

## Examples

```memo-example-shortcode { title="Minimal Example" }
{{</* columns "example-1" */>}}
  {{</* column  */>}}
    This is the first of two evenly spaced columns.
  {{</* /column */>}}
  {{</* column */>}}
    This is the second column, with _markup_.
  {{</* /column */>}}
{{</* /columns */>}}
```

```memo-example-shortcode { title="Full Example" }
{{</* columns id="example-2" class="example" */>}}
  {{</* column  grow=2 class="lead" */>}}
    This is the first column. It's twice as wide as
    the second column and has the `lead` class. The
    parent shortcode adds the `example` class,
    which may affect each column.
  {{</* /column */>}}
  {{</* column grow=1 */>}}
    This is the second column, half as wide as the
    others. It has no extra class.
  {{</* /column */>}}
  {{</* column grow=2 class="follow" */>}}
    This is the third column, same size as the first.
    It has the `follow` class.
  {{</* /column */>}}
{{</* /columns */>}}
```

## Parameters

### `id`

Specify the unique name for this group of columns. The created `div` is given the `id` attribute
with the prefix `columns-`. For example, if this value is `example-1`, the `id` for the containing
`div` is `columns-example-1`.

{{< memo/shortcode/parameter "id" >}}

### `class`

Specify any additional classes to insert into the class list for the containing `div` of this group
of columns.

By default, the containing `div` has the `platen-columns`, `flex`, and `flex-wrap` classes. For more
information about how classes affect the styling of content in this shortcode, see
[Styling](#styling).

{{< memo/shortcode/parameter "class" >}}

## Inner

{{< memo/shortcode/inner >}}

### Nested Shortcode: `column`

Each `column` shortcode you use inside a `columns` shortcode adds another column. You can control
the size and styling for each column independently.

#### Syntax

{{< memo/shortcode/syntax nested=true >}}

#### Parameters

##### `grow`

Specify the column's maximum width in the group. If this value isn't specified for any `column`, all
columns are added with equal width. If this value is specified for any `column`, all columns without
a width are treated as having a width of `1`.

{{< memo/shortcode/parameter "Nested.grow" >}}

##### `class`

Specify any additional classes to insert into the class list for this column's `div`.

By default, the `div` has the `flex-even` and `markdown-inner` classes. For more information about
how classes affect the styling of content in this shortcode, see [Styling](#styling).

{{< memo/shortcode/parameter "Nested.class" >}}

#### Inner

Specify the text you want to include in the body of this column.

{{< memo/shortcode/inner nested=true >}}

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
[01]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div
[02]: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow
