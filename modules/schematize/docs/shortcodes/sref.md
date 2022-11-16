---
title: sref
summary: >-
  Documentation on the `sref` shortcode, which automatically links to reference content.
---

> Intro text

## Syntax

The `flexcolumn` shortcode supports both positional and named parameters. It requires opening and
closing tags.

### Positional Parameters

```go
{{%/* columns "ratio" flattenForMobile */%}}
First column Markdown
<--->
Next column Markdown
{{%/* /columns */%}}
```

### Named Parameters

```go
{{%/* columns ratio="a:b" flattenForMobile=(true|false) */%}}
First column Markdown
<--->
Next column Markdown
{{%/* /columns */%}}
```

## Examples

### 1. Positional Parameter Example

#### Markdown Input { #example-positional-parameter-markdown-input }

```go
{{%/* columns "7:3" true */%}}
This is the first column of Markdown _content_. It takes up 70% of the available
width. Note that the Markdown in this column renders as normal.
<--->
This is the second column. It takes up the remaining 30% of the available width.
{{%/* /columns */%}}
```

#### HTML Output { #example-positional-parameter-html-output }

```html
<div class="book-columns flex flex-wrap flatten-in-mobile">
  <div style="flex-grow:7;" class="flex-even markdown-inner">
    This is the first column of Markdown <em>content</em>. It takes up 70%
    of the available width. Note that the Markdown in this column renders as
    normal.
  </div>
  <div style="flex-grow:3;" class="flex-even markdown-inner">
    This is the second column. It takes up the remaining 30% of the
    available width.
  </div>
</div>
```

#### Rendered Shortcode { #example-positional-parameter-rendered-shortcode }

{{% columns "7:3" true %}}
This is the first column of Markdown _content_. It takes up 70% of the
available width. Note that the Markdown in this column renders as normal.
<--->
This is the second column. It takes up the remaining 30% of the available
width.
{{% /columns %}}

### 2. Named Parameter Example

#### Markdown Input { #example-named-parameter-markdown-input }

```go
{{%/* columns ratio="5:3:2" flattenForMobile=true */%}}
This is the first column of Markdown _content_. It takes up 50% of the
available width. Note that the Markdown in this column renders as normal.
<--->
This is the second column. It takes up the 30% of the available width.
<--->
Final column, 20% of the width.
{{%/* /columns */%}}
```

#### HTML Output { #example-named-parameter-html-output }

```html
<div class="book-columns flex flex-wrap flatten-in-mobile">
  <div style="flex-grow:5;" class="flex-even markdown-inner">
    This is the first column of Markdown <em>content</em>. It takes up 50%
    of the available width. Note that the Markdown in this column renders
    as normal.
  </div>
  <div style="flex-grow:3;" class="flex-even markdown-inner">
    This is the second column. It takes up the 30% of the available width.
  </div>
  <div style="flex-grow:2;" class="flex-even markdown-inner">
    Final column, 20% of the width.
  </div>
</div>
```

#### Rendered Shortcode { #example-named-parameter-rendered-shortcode }

{{% columns ratio="5:3:2" flattenForMobile=true %}}
This is the first column of Markdown _content_. It takes up 50% of the
available width. Note that the Markdown in this column renders as normal.
<--->
This is the second column. It takes up the 30% of the available width.
<--->
Final column, 20% of the width.
{{% /columns %}}

## Parameters

### `ratio`

Specify a string of integers separated by colons (`:`), like `2:5`. The colons separate the maximum
width of each column in the flexible row. For more information, see the [`flex-grow`][02] CSS
property documentation.

To ensure the columns are evenly sized, specify this value as an empty string (`""`).

If you have more columns than items in the ratio string, extra columns are interpreted to have a
maximum width of `0` and aren't visible. They're still available to screen readers.

```yaml
Position: 0
Type: String
```

### `flattenForMobile`

Specify whether the columns should collapse into a vertical stack on smaller screens to make them
more readable. By default, the columns still display horizontally on smaller screens.

```yaml
Position: 1
Type: String
Default: false
```

## Styling

The container `div` for the columns is automatically assigned the `book-columns`, `flex`, and
`flex-wrap` classes.

Each column's content is placed inside a child `div` with the `flex-even` and `markdown-inner`
classes, as well as the inline style `flex-grow:<ratio>`, where `<ratio>` is the value specified for
that column in the shortcode tag. For example, if the ratio was defined as `3:5:2`, the second
column has the inline style `flex-grow:5`.

{{% columns %}}
This is the first column of Markdown _content_. It takes up 50% of the
available width. Note that the Markdown in this column renders as normal.
<--->
This is the second column. It takes up the 30% of the available width.
<--->
Final column, 20% of the width.
{{% /columns %}}
