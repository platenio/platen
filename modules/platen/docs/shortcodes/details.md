---
title: details
summary: >-
  Documentation on the `detail` shortcode, which adds a details and summary HTML tag to a Markdown
  page for semantically collapsible content.
Platen:
  TitleAsHeading: true
Memo:
  Name: details
  Parameters:
    title:
      Named: true
      Position: 0
      Type: String.Markdown.Inline
      Required: true
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

The `detail` shortcode makes it possible for you to add an accessible and semantically accurate
form of collapsible content to a document.

When used, it inserts a [`details`][01] HTML tag with the title of the content as the
[`summary`][02] tag. The Markdown text specified in the shortcode is also transformed.

## Syntax

{{< memo/shortcode/syntax >}}

## Examples

```memo-example-shortcode { title="Positional Parameter Example" }
{{</* details "Example 1" "info" */>}}
  This text is rendered in a `detail` tag with a
  `summary` tag. The body text is formatted as
  Markdown.

  It has `info` added to its class attribute.
{{</* /details */>}}
```

```memo-example-shortcode { title="Named Parameter Example" }
{{</* details title="Example 2" */>}}
  This text is rendered in a `detail` tag with a
  `summary` tag. The body text is formatted as
  Markdown.
{{</* /details */>}}
```

## Parameters

### `title`

Specify the text you want to use as the `summary` for the `details` element.

{{< memo/shortcode/parameter "title" >}}

### `class`

Specify a string for the [`class`][03] attribute of the `details` element. By default, the `details`
element has no class and the `div` element containing the content from `Inner` has the
`markdown-inner` class.

{{< memo/shortcode/parameter "class" >}}

### Inner

Specify the text you want to include in the body of the `details` element.

{{< memo/shortcode/inner >}}

<!-- Link References -->
[01]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
[02]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary
[03]: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class
