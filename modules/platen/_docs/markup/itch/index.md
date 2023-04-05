---
title: Itch Embeds
weight: 100
summary: >-
  Documentation on the `itch` image link markup, which embeds an iframe linking
  to the itch page for a project.
Memo:
  Name: itch
  MungeTitle: false
  front_matter:
    configs:
      - definition: frontmatter/preset.json
        publish:    /frontmatter/platen/data/itch.json
        resolve_schemas: true
      - definition: frontmatter/image.json
        publish:    /frontmatter/platen/content/snippets/itch/image.json
      - merge:      frontmatter/image.json
        publish:    /frontmatter/platen/content/snippets/itch.json
      - merge:
        - frontmatter/preset.json
        - frontmatter/image.json
        publish: /frontmatter/platen/markup/itch.json
        resolve_schemas: true
  Kind: Renderer.Image
  Aliases: []
  Attributes:
    class:
      Ignore: true
    preset:
      Type: String
      Required: false
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

When used, it inserts an [sref:`<iframe>`][s01] HTML element for your itch widget for you so you don't have to remember
how the embed URL is constructed or how to use an `<iframe>`.

## Syntax

{{< memo/renderer/syntax >}}

## Examples

```memo-example-renderer { title="Minimal Example" }
This example embeds the itch widget for The Isle with the default options.

<!--- Example Start -->

![itch:The Isle by Luke Geating](1637303)
```

```memo-example-renderer { title="Square Embed with Linkback" }
This example ensures the itch embed for The Isle is formatted as a square and
that clicking on the embed takes the visitor to the itch project page.
<!--- Example Start -->
![itch:The Isle by Luke Geating](1637303)
{
  square   = true
  linkback = true
}
```

```memo-example-renderer { title="Fully Custom Embed" }
This example shows all of the available options for customizing an itch embed
and uses them to ensure the theme matches the project.

<!--- Example Start -->

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

```memo-example-renderer { title="Referencing preset" }
This example uses a [preset](#presets) ID instead of the itch project ID to
pull the settings from data. It specifies the project ID as an attribute
because that value isn't defined in the preset. It overrides the values for
[`square`](#square) and [`border_width`](#border_width) but inherits the rest.

<!--- Example Start -->

![itch:](preset:UNCONQUERED)
{
  #1765719
  square=true
  border_width=5
}
```

## Inputs

This section describes how the normal markdown input for images works with the itch render hook.

Images use this syntax for their inputs:

```markdown
![alt_text](source)
```

### `alt_text` (as `title`)

Specifies the [sref:`title`][s02] for the embed's iframe. The `title` attribute is important for accessibility because
it explains what the iframe leads to for folks using a screen reader.

This value must start with the prefix `itch:`. For example, with `![itch:My Game](12345)`, `title`'s value would be
`My Game`.

This title can be anything you want, but it should clearly inform the site visitor about the purpose of this element.
Usually, the name of the game or project is all that's needed. If the publisher is someone else, you may want to
include that information too.

Don't use any markup for this value. The text is added to an HTML attribute, not rendered from Markdown.

If you're using a [preset](#presets) that defines the `title`, you can omit this value except for the prefix. For
example, `![itch:](MyGame)` would be recognized as an itch embed but `![](MyGame)` would not. If neither the image link
nor the referenced preset define a title, Platen raises an error.

{{< memo/renderer/input "alt_text" >}}

### `source` (as `id`)

Specify the ID for the project on itch. This is used to find and render your embed widget.

You can find the ID by navigating to the "Edit game" tab for your project on itch. The URL for that page will look like
`https://itch.io/game/edit/<id>`. The number at the end of the URL is your project's ID.

You can also find the ID by going to your project's public page and clicking the "Embed" link in the list of links at
the very bottom of the page. That causes a popup to appear for your embed widget. In the first line of the copyable
HTML, you should see an attribute like `src="https://itch.io/embed/<id>"`. The number at the end of that URL is your
project's ID.

Instead of specifying an itch project ID, you can specify the ID for a [preset](#presets) for the embed by prefixing
the value with `preset:`. Specify the name of the preset, like `![itch:](preset:foo)`. If the preset is defined in a
subfolder, specify the dot-path relative to `data/platen/embeds/itch`. For example, the preset defined in
`data/platen/embeds/itch/foo/bar/baz.yaml` would be specified like `![button:](preset:foo.bar.baz)`. For more
information, see [Presets](#presets).

{{< memo/renderer/input "source" >}}

## Attributes

### `background_color`

Specifies the background color for the embed widget.

{{< memo/renderer/attribute "background_color" >}}

### `border_color`

Specifies the color of the border for the embed widget. This value is only effective when the `borderWidth` attribute
isn't set to `0`.

{{< memo/renderer/attribute "border_color" >}}

### `border_width`

Specifies the width of the embed widget's border in pixels. This value must be between `0` and `5`, inclusive. When
this value is `0`, no border is displayed.

{{< memo/renderer/attribute "border_width" >}}

### `button_color`

Specifies the background color for the purchase button on the embed widget.

{{< memo/renderer/attribute "button_color" >}}

### `dark`

Specifies that the embed widget should use itch's default dark theme instead of the default light theme.

{{< memo/renderer/attribute "dark" >}}

### `id`

Specifies the itch project ID for the embed. This is an alternative to specifying it as the `source` in the image link.
It's only required when using a [preset](#presets) that doesn't define the `id`.

{{< memo/renderer/attribute "id" >}}

### `linkback`

Specifies whether the project's cover image should be a clickable link to the project page on itch. By default, the
cover image isn't a link.

This is particularly useful in combination with the `square` attribute, which doesn't display the project's linked
title.

{{< memo/renderer/attribute "linkback" >}}

### `preset`

Specifies the name of the [preset](#presets) to use for the embed. If the preset is defined in a subfolder, specify the
dot-path relative to `data/platen/embeds/itch`. For example, the preset defined in
`data/platen/embeds/itch/foo/bar/baz.yaml` would be specified like `preset="foo.bar.baz"`. For more information, see
[Presets](#presets).

{{< memo/renderer/attribute "preset" >}}

### `square`

Specifies that the embed widget should display as a square instead of the long rectangle. In this display, only the
cover is visible with the button for buying the project.

{{< memo/renderer/attribute "square" >}}

### `text_color`

Specifies the text color for the embed widget. This only affects the text visible when the `square` isn't set to
`true`.

{{< memo/renderer/attribute "text_color" >}}

## Presets

To make it easier to reuse your itch embeds, you can define any number of presets in your site data. They use the same
keys as the attributes.

To add a preset, create a YAML file in your site's [Data Folder][02] as `platen/embeds/itch/<ID>.yaml`. For example, if
your site uses the default data directory, to create a preset for UNCONQUERED you would create the file
`data/platen/embeds/itch/UNCONQUERED.yaml`.

```yaml
# data/platen/embeds/itch/UNCONQUERED.yaml
id:               1765719
title:            UNCONQUERED by Monkey's Paw Games
linkback:         true
background_color: "#d3d3ac"
text_color:       "#000000"
button_color:     "#e53b44"
border_color:     "#fa5059"
border_width:     3
```

You can reference a preset by specifying the preset's file name (without the `.yaml` suffix) as the ID in the image
link with the prefix `preset:`, like `![itch:](preset:UNCONQUERED)`.

```details { summary="Warning" .warning }
Make sure you specify the itch project id in the preset or as an attribute. If
you don't define it in one of those places, Platen raises an error.
```

You can override any value from the preset when you use it. If you specify a [`title`] in your image link, that value
overwrites the one defined in the preset. Any attributes you specify also overwrite the values from the preset.

Presets can also define properties that aren't available as attributes. The full set of properties are explained in the
rest of this section.

### `allow` { #preset-property-allow }

Specifies a [sref:permissions policy][s03] for the [sref:`<iframe>`][s01]. The policy defines what features are
available to the `<iframe>` (for example, access to the microphone, camera, battery, web-share, etc.) based on the
origin of the request.

For more information about valid values for this setting, see [Permissions Policy in the MDN web docs][s03].

### `background_color` { #preset-property-background_color }

Specifies the background color for the embed widget. Specify the color as a hex value, with or without the leading `#`.
If you include the `#`, the value must be wrapped in quotes. This value is case insensitive.

These declarations for the `background_color` preset property are equivalent.

`````````tabs { #preset-property-background_color-yaml }
``````tab { name="Without `#` Prefix" }
```yaml
background_color: E6E6FA
```
``````

``````tab { name="With `#` Prefix" }
```yaml
background_color: '#E6E6FA'
```
``````
`````````

### `border_color` { #preset-property-border_color }

Specifies the color of the border for the embed widget. This value is only effective when the `borderWidth` attribute
isn't set to `0`. Specify the color as a hex value, with or without the leading `#`. If you include the `#`, the value
must be wrapped in quotes. This value is case insensitive.

These declarations for the `border_color` preset property are equivalent.

`````````tabs { #preset-property-border_color-yaml }
``````tab { name="Without `#` Prefix" }
```yaml
border_color: E6E6FA
```
``````

``````tab { name="With `#` Prefix" }
```yaml
border_color: '#E6E6FA'
```
``````
`````````

### `border_width` { #preset-property-border_width }

Specifies the width of the embed widget's border in pixels. This value must be between `0` and `5`, inclusive. When
this value is `0`, no border is displayed.

`````````tabs { #preset-property-border_width-yaml }
``````tab { name="With Defined Border" }
```yaml
border_width: 3
```
``````

``````tab { name="Without a Border" }
```yaml
border_width: 0
```
``````
`````````

### `button_color` { #preset-property-button_color }

Specifies the background color for the purchase button on the embed widget. Specify the color as a hex value, with or
without the leading `#`. If you include the `#`, the value must be wrapped in quotes. This value is case insensitive.

These declarations for the `button_color` preset property are equivalent.

`````````tabs { #preset-property-button_color-yaml }
``````tab { name="Without `#` Prefix" }
```yaml
button_color: E6E6FA
```
``````

``````tab { name="With `#` Prefix" }
```yaml
button_color: '#E6E6FA'
```
``````
`````````

### `dark` { #preset-property-dark }

Specifies that the embed widget should use itch's default dark theme instead of the default light theme.

`````````tabs { #preset-property-dark-yaml }
``````tab { name="With Dark Theme" }
```yaml
dark: true
```
``````

``````tab { name="With Light (Default) Theme" }
```yaml
dark: false
```
``````
`````````

### `id` { #preset-property-id }

Specifies the itch project ID for the embed. This is an alternative to specifying it as the `source` in the image link.
It's only required when using a [preset](#presets) that doesn't define the `id`.

```yaml
id: 12345
```

### `linkback` { #preset-property-linkback }

Specifies whether the project's cover image should be a clickable link to the project page on itch. By default, the
cover image isn't a link.

This is particularly useful in combination with the `square` attribute, which doesn't display the project's linked
title.

`````````tabs { #preset-property-linkback-yaml }
``````tab { name="With Linkback" }
```yaml
linkback: true
```
``````

``````tab { name="Without Linkback" }
```yaml
linkback: false
```
``````
`````````

### `loading` { #preset-property-loading }

Specifies how the browser should load the embed's iframe. Set this value to `lazy` to defer loading of the iframe until
it's nearly in view. Set this value to `eager` to load the iframe immediately. The default value is `eager`. For more
information about this attribute, see [sref:`loading`][s04] in the MDN web docs.

`````````tabs { #preset-property-loading-yaml }
``````tab { name="Load Embed Immediately" }
```yaml
loading: eager
```
``````

``````tab { name="Defer Loading Embed" }
```yaml
loading: lazy
```
``````
`````````

### `sandbox` { #preset-property-sandbox }

Specifies extra restriction to apply to the content in the embed's iframe. If this value is specified as an empty list
(`[]`), it applies all restrictions. If this value is an list of valid values, those values are added to the allow
list.

For more information about iframe sandboxes and the list of valid exception values, see [sref:`sandbox`][s05] in the
MDN web docs.

`````````tabs { #preset-property-sandbox-yaml }
``````tab { name="Restrict All" }
```yaml
sandbox: []
```
``````

``````tab { name="Allow Scripts and Popups" }
```yaml
sandbox:
  - allow-scripts
  - allow-popups
```
``````
`````````

### `square` { #preset-property-square }

Specifies that the embed widget should display as a square instead of the long rectangle. In this display, only the
cover is visible with the button for buying the project.

`````````tabs { #preset-property-square-yaml }
``````tab { name="As Square" }
```yaml
square: true
```
``````

``````tab { name="As Rectangle" }
```yaml
square: false
```
``````
`````````

### `text_color` { #preset-property-text_color }

Specifies the text color for the embed widget. This only affects the text visible when the `square` isn't set to
`true`. Specify the color as a hex value, with or without the leading `#`. If you include the `#`, the value must be
wrapped in quotes. This value is case insensitive.

These declarations for the `text_color` preset property are equivalent.

`````````tabs { #preset-property-text_color-yaml }
``````tab { name="Without `#` Prefix" }
```yaml
text_color: E6E6FA
```
``````

``````tab { name="With `#` Prefix" }
```yaml
text_color: '#E6E6FA'
```
``````
`````````

### `title` { #preset-property-title }

Specifies the [sref:`title`][s02] for the embed's iframe. The `title` attribute is important for accessibility because
it explains what the iframe leads to for folks using a screen reader.

This title can be anything you want, but it should clearly inform the site visitor about the purpose of this element.
Usually, the name of the game or project is all that's needed. If the publisher is someone else, you may want to
include that information too.

Don't use any markup for this value. The text is added to an HTML attribute, not rendered from Markdown.

```yaml
title: UNCONQUERED by Monkey's Paw Games
```

## Configuration

Several of the options for this markup can be configured in your site configuration or Platen's parameter data. The
most convenient option is to edit the `data/_params/platen/markup.yaml` file. Every configuration setting can by
overridden by the attributes in your markup or properties in a preset.

The default values for this markup's rendering options are defined below:

```yaml
itch:
  dark:     false
  linkback: false
  square:   false
```

[sref:`dark`][c01]
: If you want to default your itch embeds to using the dark theme, set this value to `true`. The `dark`
  [attribute](#dark) and [preset property](#preset-property-dark) override this configuration setting.

[sref:`linkback`][c02]
: If you want to default your itch embeds to including a link to the project's page on its cover image, set this value
   to `true`. The `linkback`[attribute](#linkback) and [preset property](#preset-property-linkback) override this
   configuration setting.

[sref:`square`][c03]
: If you want to default your itch embeds to display as squares with the cover image and purchase button, set this
   value to `true`. The `square` [attribute](#square) and [preset property](#preset-property-square) override this
   configuration setting.

<!-- Link References -->
[01]: https://itch.io/docs/creators/widget
[02]: https://gohugo.io/templates/data-templates/#the-data-folder
[s01]: mdn.html.element:iframe
[s02]: mdn.html.global_attribute:title
[s03]: mdn.http:Permissions_Policy#iframe_syntax
[s04]: mdn.html.element:iframe#loading
[s05]: mdn.html.element:iframe#sandbox
[c01]: platen.site.markup.itch.dark
[c02]: platen.site.markup.itch.linkback
[c03]: platen.site.markup.itch.square
