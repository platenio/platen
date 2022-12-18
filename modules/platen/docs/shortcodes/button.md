---
title: button Shortcode
summary: >-
  Documentation on the `button` shortcode, which adds an anchor element to a
  Markdown page styled as a button rather than a normal link.
Platen:
  TitleAsHeading: true
Memo:
  Name: button
  TagType: NoProcess
  Parameters:
    ref:
      Named: true
      Position: 0
      Type: String.URL
      Required: true
    relative:
      Named: true
      Position: 1
      Type: Boolean
      Required: false
    class:
      Named: true
      Position: 2
      Type: String.Class
      Required: false
  InnerText:
    Required: true
    Type: String.Markdown.Inline
    TrimsLeadingWhiteSpace: true
---

The `button` shortcode enables you to add links to your document styled as clickable buttons instead
of standard links.

When used, it inserts an [`a`][01] HTML tag (the anchor element) with the inner text of the
shortcode as the button text and linking to the URL specified by the `href` or `relref` parameter.

## Syntax

{{< memo/shortcode/syntax >}}

## Examples

```memo-example-shortcode { title="Simple Positional Example" }
Leading explanatory text.
It might even span multiple lines.

Or paragraphs.
<!--- Example Start -->
{{</* button "https://flagrant.garden" */>}}Flagrant Garden{{</* /button */>}}
```

```memo-example-shortcode { title="Full Positional Example" }
{{</* button "details" true "internal" */>}}
  Relative link to the details page with the `internal` class.
{{</* /button */>}}
```

```memo-example-shortcode { title="Ref and Class Positional Example" >}}
{{</* button "https://flagrant.garden" "external" */>}}
  Link to Flagrant Garden with the `external` class.
{{</* /button */>}}
```

```memo-example-shortcode { title="Named Parameter Example" >}}
{{</* button ref="https://flagrant.garden" class="external flagrant" */>}}
  Flagrant Garden
{{</* /button */>}}
```

## Parameters

### `ref`

Specify the full or relative URL to where the button should link to.

{{< memo/shortcode/parameter "ref" >}}

### `relative`

Specify whether the value of `ref` is a relative URL. The default is `false`.

{{< memo/shortcode/parameter "relative" >}}

### `class`

Specify a string for the [`class`][03] attribute of the `a` element. By default, the `a`
element has only the `platen-btn` class.

{{< memo/shortcode/parameter "class" >}}

### Inner

Specify the text you want to include on the button itself.

{{< memo/shortcode/inner >}}

<!-- Link References -->
[01]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
[03]: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class
