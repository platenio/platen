---
title: Itch Embeds
weight: 100
summary: >-
  Documentation on the `itch` image link markup, which embeds an iframe linking to the itch page
  for a project.
Platen:
  title_as_heading: true
Memo:
  Name: itch
  MungeTitle: false
  Kind: Renderer.Image
  Aliases: []
  Attributes:
    id:
      Ignore: true
    class:
      Ignore: true
    dark:
      Type: Boolean
      Required: false
    square:
      Type: Boolean
      Required: false
    linkback:
      Type: Boolean
      Required: false
    background_color:
      Type: String.ColorHex
      Required: false
    text_color:
      Type: String.ColorHex
      Required: false
    button_color:
      Type: String.ColorHex
      Required: false
    border_color:
      Type: String.ColorHex
      Required: false
    border_width:
      Type: Int
      Required: false
  SupportsInline: false
  alt_text:
    Alias: title
    Type: String
  destination:
    Alias: id
    Required: true
  title:
    Ignore: true
---

Platen uses special notation for embedding [itch.io widgets][01] into your site with an image link.

When used, it inserts an [sref:`<iframe>`][s01] HTML element for your itch widget for you so you
don't have to remember how the embed URL is constructed or how to use an `<iframe>`.

## Syntax

{{< memo/renderer/syntax >}}

## Examples

```memo-example-renderer { title="Minimal Example" }
![itch:The Isle by Luke Geating](1637303)
```

```memo-example-renderer { title="Square Embed with Linkback" }
![itch:The Isle by Luke Geating](1637303)
{
  square   = true
  linkback = true
}
```

```memo-example-renderer { title="Fully Custom Embed" }
![itch:UNCONQUERED by Monkey's Paw Games](1765719)
{
  square           = false
  dark             = false
  linkback         = true
  background_color = "#d3d3ac"
  text_color       = "#000000"
  button_color     = "#e53b44"
  border_color     = "#fa5059"
  border_width     = 3
}
```

## Inputs

This section describes how the normal markdown input for images works with the itch render hook.

Images use this syntax for their inputs:

```markdown
![alt_text](source)
```

### `alt_text` (as `title`)

Specifies the [sref:`title`][s02] for the embed's iframe. The `title` attribute is important for
accessibility because it explains what the iframe leads to for folks using a screen reader.

This value must start with the prefix `itch:`. For example, with `![itch:My Game](12345)`, `title`'s
value would be `My Game`.

This title can be anything you want, but it should clearly inform the site visitor about the purpose
of this element. Usually, the name of the game or project is all that's needed. If the publisher is
someone else, you may want to include that information too.

Don't use any markup for this value. The text is added to an HTML attribute, not rendered from
Markdown.

{{< memo/renderer/input "alt_text" >}}

### `source` (as `id`)

Specify the ID for the project on itch. This is used to find and render your embed widget.

You can find the ID by navigating to the "Edit game" tab for your project on itch. The URL for that
page will look like `https://itch.io/game/edit/<id>`. The number at the end of the URL is your
project's ID.

You can also find the ID by going to your project's public page and clicking the "Embed" link in the
list of links at the very bottom of the page. That causes a popup to appear for your embed widget.
In the first line of the copyable HTML, you should see an attribute like
`src="https://itch.io/embed/<id>"`. The number at the end of that URL is your project's ID.

{{< memo/renderer/input "source" >}}

## Attributes

### `dark`

Specifies that the embed widget should use itch's default dark theme instead of the default light
theme.

{{< memo/renderer/attribute "dark" >}}

### `square`

Specifies that the embed widget should display as a square instead of the long rectangle. In this
display, only the cover is visible with the button for buying the project.

{{< memo/renderer/attribute "square" >}}

### `linkback`

Specifies whether the project's cover image should be a clickable link to the project page on itch.
By default, the cover image isn't a link.

This is particularly useful in combination with the `square` attribute, which doesn't display the
project's linked title.

{{< memo/renderer/attribute "linkback" >}}

### `background_color`

Specifies the background color for the embed widget.

{{< memo/renderer/attribute "background_color" >}}

### `text_color`

Specifies the text color for the embed widget. This only affects the text visible when the `square`
isn't set to `true`.

{{< memo/renderer/attribute "text_color" >}}

### `button_color`

Specifies the background color for the purchase button on the embed widget.

{{< memo/renderer/attribute "button_color" >}}

### `border_color`

Specifies the color of the border for the embed widget. This value is only effective when the
`borderWidth` attribute isn't set to `0`.

{{< memo/renderer/attribute "border_color" >}}

### `border_width`

Specifies the width of the embed widget's border in pixels. This value must be between `0` and `5`,
inclusive. When this value is `0`, no border is displayed.

{{< memo/renderer/attribute "border_width" >}}

<!-- Link References -->
[01]: https://itch.io/docs/creators/widget
[s01]: mdn.html.element:iframe
[s02]: mdn.html.global_attribute:title
