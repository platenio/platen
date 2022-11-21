---
title: detail
summary: >-
  Documentation on the `detail` shortcode, which adds a details and summary HTML tag to a Markdown
  page for semantically collapsible content.
Platen:
  ShowToC: true
---

The `detail` shortcode makes it possible for you to add an accessible and semantically accurate
form of collapsible content to a document.

When used, it inserts a [`details`][01] HTML tag with the title of the content as the
[`summary`][02] tag. The Markdown text specified in the shortcode is also transformed.

## Syntax

The `detail` shortcode supports both positional and named parameters. It requires opening and
closing tags.

### Positional Parameters

```go
{{%/* details "class" "title" */%}}
Markdown
{{%/* /details */%}}
```

### Named Parameters

```go
{{%/* details title="title" [class="class"] */%}}
Markdown
{{%/* /details */%}}
```

## Examples

### 1. Positional Parameter Example

#### Markdown Input { #example-positional-parameter-markdown-input }

```go
{{%/* details "info" "Example 1" */%}}
This text is rendered in a `detail` tag with a `summary` tag. The body text is
formatted as Markdown. If you inspect the rendered element on the page, it has
`info` added to its class attribute.
{{%/* /details */%}}
```

#### HTML Output { #example-positional-parameter-html-output }

```html
<details class="info">
  <summary id="Example-1">Example 1</summary>
  This text is rendered in a <code>detail</code> tag with a <code>summary</code>
  tag. The body text is formatted as Markdown. If you inspect the rendered
  element on the page, it has <code>info</code> added to its class attribute.
</details>
```

#### Rendered Shortcode { #example-positional-parameter-rendered-shortcode }

{{% details "info" "Example 1" %}}
This text is rendered in a `detail` tag with a `summary` tag. The body text is
formatted as Markdown. If you inspect the rendered element on the page, it has
`info` added to its class attribute.
{{% /details %}}

### 2. Named Parameter Example

#### Markdown Input { #example-named-parameter-markdown-input }

```go
{{%/* details title="Example 2" */%}}
This text is rendered in a `detail` tag with a `summary` tag. The body text is
formatted as Markdown.
{{%/* /details */%}}
```

#### HTML Output { #example-named-parameter-html-output }

```html
<details class="">
  <summary id="Example-2">Example 2</summary>
  This text is rendered in a <code>detail</code> tag with a <code>summary</code>
  tag. The body text is formatted as Markdown.
</details>
```

#### Rendered Shortcode { #example-named-parameter-rendered-shortcode }

{{% details title="Example 2" %}}
This text is rendered in a `detail` tag with a `summary` tag. The body text is
formatted as Markdown.
{{% /details %}}

## Parameters

### `class`

Specify a string for the [`class` attribute][03] of the `details` tag.

```yaml
Position: 0
Type: String
```

### `title`

Specify the text you want to use as the `summary` for the `details` tag.

```yaml
Position: 1
Type: String
```

<!-- Link References -->
[01]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
[02]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary
[03]: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class
