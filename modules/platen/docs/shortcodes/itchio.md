---
title: itchio Shortcode
summary: >-
  Documentation on the `itchio` shortcode, which embeds an iframe linking to the
  itch page for a project.
Platen:
  TitleAsHeading: true
Memo:
  Name: itchio
  TagType: NoProcess
  Parameters:
    id:
      Named: true
      Position: 0
      Type: Int
      Required: true
    title:
      Named: true
      Position: 1
      Type: String
      Required: true
    dark:
      Named: true
      Type: Boolean
      Required: false
    square:
      Named: true
      Type: Boolean
      Required: false
    linkback:
      Named: true
      Type: Boolean
      Required: false
    backgroundColor:
      Named: true
      Type: String.ColorHex
      Required: false
    textColor:
      Named: true
      Type: String.ColorHex
      Required: false
    buttonColor:
      Named: true
      Type: String.ColorHex
      Required: false
    borderColor:
      Named: true
      Type: String.ColorHex
      Required: false
    borderWidth:
      Named: true
      Type: Int
      Required: false
---

The `itchio` shortcode enables you to embed links to your [itch][01] pages on your Platen site
without having to remember how the embed URL is constructed or how to use an `iframe` element.

## Syntax

{{< memo/shortcode/syntax >}}

## Examples

```memo-example-shortcode { title="Simple Positional Example" }
  {{</* itchio 1637303 "The Isle by Luke Gearing" */>}}
```

```memo-example-shortcode { title="Square Embed with Default Styling and Linkback" }
{{</* itchio id=1637303
            title="The Isle by Luke Gearing"
            square=true
            linkback=true
*/>}}
```

```memo-example-shortcode { title="Fully Custom Embed" }
{{</* itchio id=1765719
            title="UNCONQUERED by Monkey's Paw Games"
            square=false
            dark=false
            linkback=true
            backgroundColor="#d3d3ac"
            textColor="#000000"
            buttonColor="#E53B44"
            borderColor="#FA5059"
            borderWidth=3
*/>}}
```

## Parameters

### `id`

Specify the ID for the project on itch. This is used to find and render your embed widget.

You can find the ID by navigating to the "Edit game" tab for your project on itch. The URL for that
page will look like `https://itch.io/game/edit/<id>`. The number at the end of the URL is your
project's ID.

You can also find the ID by going to your project's public page and clicking the "Embed" link in the
list of links at the very bottom of the page. That causes a popup to appear for your embed widget.
In the first line of the copyable HTML, you should see an attribute like
`src="https://itch.io/embed/<id>"`. The number at the end of that URL is your project's ID.

You can specify the ID with or without wrapping quotes. Both `id=12345` and `id="12345"` are valid.

{{< memo/shortcode/parameter "id" >}}

### `title`

Specify the title for your embed widget. This value sets the `title` attribute on the iframe, which
is important for accessibility because it explains what the iframe leads to for folks using a screen
reader.

This title can be anything you want, but it should clearly inform the site visitor about the purpose
of this element. Usually, the name of the game is all that's needed. If the publisher is someone
else, you may want to include that information too.

Don't use any markup for this value. The text is added to an HTML attribute, not rendered from
Markdown.

{{< memo/shortcode/parameter "title" >}}

### `dark`

Specifies that the embed widget should use itch's default dark theme instead of the default light
theme.

{{< memo/shortcode/parameter "dark" >}}

### `square`

Specifies that the embed widget should display as a square instead of the long rectangle. In this
display, only the cover is visible with the button for buying the project.

{{< memo/shortcode/parameter "square" >}}

### `linkback`

Specifies whether the project's cover image should be a clickable link to the project page on itch.
By default, the cover image isn't a link.

This is particularly useful in combination with the `square` parameter, which doesn't display the
project's linked title.

{{< memo/shortcode/parameter "linkback" >}}

### `backgroundColor`

Specifies the background color for the embed widget.

{{< memo/shortcode/parameter "backgroundColor" >}}

### `textColor`

Specifies the text color for the embed widget. This only affects the text visible when the `square`
isn't set to `true`.

{{< memo/shortcode/parameter "textColor" >}}

### `buttonColor`

Specifies the background color for the purchase button on the embed widget.

{{< memo/shortcode/parameter "buttonColor" >}}

### `borderColor`

Specifies the color of the border for the embed widget. This value is only effective when the
`borderWidth` parameter isn't set to `0`.

{{< memo/shortcode/parameter "borderColor" >}}

### `borderWidth`

Specifies the width of the embed widget's border in pixels. This value must be between `0` and `5`,
inclusive. When this value is `0`, no border is displayed.

{{< memo/shortcode/parameter "borderWidth" >}}

<!-- Link References -->
[01]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
[03]: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class
