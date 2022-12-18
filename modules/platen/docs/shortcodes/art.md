---
title: art Shortcode
summary: >-
  Documentation on the `art` shortcode, which adds a figure element to a
  Markdown page for inserting artwork.
Platen:
  TitleAsHeading: true
Memo:
  Name: art
  TagType: NoProcess
  Parameters:
    src:
      Named: true
      Position: 0
      Type: String.URL
      Required: true
    alt:
      Named: true
      Position: 1
      Type: String
      Required: true
    class:
      Named: true
      Position: 2
      Type: String.Class
      Required: false
    contentWarning:
      Named: true
      Position: 3
      Type: String.Markdown.Inline
  InnerText:
    Required: false
    Type: String.Markdown.Inline
    TrimsLeadingWhiteSpace: true
---

The `art` shortcode enables you to add artwork to your document in a figure with an optional caption
and content warning.

When used, it inserts an [`figure`][01] HTML element with the inner text of the
shortcode (if any) as the caption.

## Syntax

{{< memo/shortcode/syntax >}}

## Examples

```memo-example-shortcode { title="Minimal Example" }
{{</* art "/images/logo.svg" "Platen Logo" /*/>}}
```

```memo-example-shortcode { title="Example with Caption" }
{{</* art "/images/logo.svg" "Platen Logo" */>}}
The Platen Logo was designed by [Monday](https://www.davecox.design/).
{{</* /art */>}}
```

```memo-example-shortcode { title="Floating Half-Width Example" }
{{</* art "/images/logo.svg" "Platen Logo" "half float-left" /*/>}}

In this example, the art takes up half the available width and floats to
the left of this content.

This combination lets you include art alongside your content without breaking
the flow.
```

```memo-example-shortcode { title="Example with Content Warning" }
{{</* art src="/images/logo.svg"
          alt="Platen Logo" 
          contentWarning="bright colors"
*/>}}
The Platen Logo was designed by [Monday](https://www.davecox.design/).
{{</* /art */>}}
```

## Parameters

### `src`

Specify the full or relative URL to where the art can be found.

{{< memo/shortcode/parameter "src" >}}

### `alt`

Specify the alt text for the art. This is required for accessibility. Don't specify this text with
any markup. It's added as an HTML attribute, not rendered.

{{< memo/shortcode/parameter "alt" >}}

### `class`

Specify a string for the [`class`][03] attribute of the `figure` element. By default, the `figure`
element has only the `platen-art` class.

{{< memo/shortcode/parameter "class" >}}

### `contentWarning`

Specify a content warning for this artwork, if needed.

{{< memo/shortcode/parameter "contentWarning" >}}

### Inner

Specify the text you want to include as a caption, if any.

{{< memo/shortcode/inner >}}

<!-- Link References -->
[01]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
[03]: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class
