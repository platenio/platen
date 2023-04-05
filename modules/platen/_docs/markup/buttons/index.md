---
title: Buttons
weight: 20
summary: >-
  Documentation on the `button` image link markup, which renders an image link as a button.
Memo:
  Name: button
  MungeTitle: false
  front_matter:
    configs:
      - definition: frontmatter/defined-preset.json
        publish:    /frontmatter/platen/data/buttons-presets.json
        resolve_schemas: true
      - merge:
          - frontmatter/defined-preset.json
        publish:    /frontmatter/platen/data/buttons.json
        resolve_schemas: true
        join_arrays:     true
      - definition: frontmatter/image.json
        publish:    /frontmatter/platen/content/snippets/buttons/image.json
      - merge:      frontmatter/image.json
        publish:    /frontmatter/platen/content/snippets/buttons.json
      - merge:
          - frontmatter/defined-preset.json
          - frontmatter/image.json
        publish: /frontmatter/platen/markup/buttons.json
        resolve_schemas: true
        join_arrays:     true
  kind: Renderer.Image
  aliases:
    - btn
  attributes:
    id:
      Ignore: true
    circle:
      type: Boolean
      required: false
    download_name:
      type: String
      required: false
    height:
      type: String.Length
      required: false
    legacy:
      type: Boolean
      required: false
      default: false
    outline:
      type: Boolean
      required: false
    pill:
      type: Boolean
      required: false
    prefix_icon:
      type: string
      required: false
    rel:
      type: String
      required: false
    size:
      enum:
        - small
        - medium
        - large
      required: false
    suffix_icon:
      type: String
      required: false
    target:
      enum:
        - _blank
        - _parent
        - _self
        - _top
    variant:
      enum:
        - default
        - primary
        - success
        - neutral
        - warning
        - danger
        - text
    width:
      type: String.Length
      required: false
    preset:
      type: String
      required: false
  SupportsInline: false
  alt_text:
    alias: label_text
    type: String.Markdown.Inline
  destination:
    alias: destination
    required: true
  title:
    alias: label_icon
    required: false
---

The `button` image markup makes it possible for you to define a link that's styled as a button.

When used, it inserts an [sref:`<sl-button>`] element from [sref:Shoelace] to the page that site visitors can select
to open another web page or download a file.

## Syntax

{{< memo/renderer/syntax >}}

## Examples

```memo-example-renderer { title="Minimal Example" }
![button:Flagrant Garden](https://flagrant.garden)
```

```memo-example-renderer { title="Button Sizes" }
You can make your buttons smaller or larger with the [`size`](#size) attribute,
which uses consistent values across your site for small, medium, and large. You
can also use the [`height`](#height) and [`width`](#width) attributes to
customize those values for the button, overriding the defaults for the `size`.

<!--- Example Start -->

![button:Flagrant Garden](https://flagrant.garden)
{ size="small" }

![button:Flagrant Garden](https://flagrant.garden)
{ size="medium" }

![button:Flagrant Garden](https://flagrant.garden)
{ size="large" }

![button:Flagrant Garden](https://flagrant.garden)
{ height="4rem" width="100%" }
```

```memo-example-renderer { title="Button Variants" }
You can use variants to change how the buttons are displayed. For more
information on variants, see [`variant`](#variant).

You can also use the [`outline`](#outline) attribute to render the buttons with
the variant colors applied to the label text and outline instead of making the
entire button the variant color.

Note that the `text` variant never has an outline or background color. It's the
same size as the other buttons but only has the text colored.

<!--- Example Start -->

![button:Flagrant Garden](https://flagrant.garden)
{ variant="default" }

![button:Flagrant Garden](https://flagrant.garden)
{ variant="default" outline=true }

<br />

![button:Flagrant Garden](https://flagrant.garden)
{ variant="primary" }

![button:Flagrant Garden](https://flagrant.garden)
{ variant="primary" outline=true }

<br />

![button:Flagrant Garden](https://flagrant.garden)
{ variant="success" }

![button:Flagrant Garden](https://flagrant.garden)
{ variant="success" outline=true }

<br />

![button:Flagrant Garden](https://flagrant.garden)
{ variant="neutral" }

![button:Flagrant Garden](https://flagrant.garden)
{ variant="neutral" outline=true }

<br />

![button:Flagrant Garden](https://flagrant.garden)
{ variant="warning" }

![button:Flagrant Garden](https://flagrant.garden)
{ variant="warning" outline=true }

<br />

![button:Flagrant Garden](https://flagrant.garden)
{ variant="danger" }

![button:Flagrant Garden](https://flagrant.garden)
{ variant="danger" outline=true }

<br />

![button:Flagrant Garden](https://flagrant.garden)
{ variant="text" }
```

```memo-example-renderer { title="Pill Buttons" }
You can make the buttons rounded by setting the [`pill`](#pill) attribute. This
works with the [`variant`](#variant) and [`outline`](#outline) attributes.

<!-- Example Start -->
![button:Flagrant Garden](https://flagrant.garden)
{ pill=true }

![button:Flagrant Garden](https://flagrant.garden)
{ pill=true outline=true }

<br />

![button:Flagrant Garden](https://flagrant.garden)
{ pill=true variant="primary" }

![button:Flagrant Garden](https://flagrant.garden)
{ pill=true variant="primary" outline=true }
```

```memo-example-renderer { title="Buttons with Icons" }
You can add an icon before or after the label text with the
[`prefix_icon`](#prefix_icon) and [`suffix_icon`](#suffix_icon) attributes.

You can use the [`title`](#title-as-label_icon)  input instead of writing text
for the button's label. When you do, you can also use the [`circle`](#circle)
attribute to render the button as a circle around the icon.

<!-- Example Start -->
![button:Flagrant Garden](https://flagrant.garden)
{ prefix_icon="cloud-download-fill" }

![button:Flagrant Garden](https://flagrant.garden)
{ suffix_icon="cloud-upload-fill" }

<br />

![button:Flagrant Garden](https://flagrant.garden)
{ prefix_icon="cloud-download-fill" suffix_icon="cloud-upload-fill" }

<br />

![button:](https://flagrant.garden "gear")

![button:](https://flagrant.garden "gear")
{ circle=true }
```

```memo-example-renderer { title="With Classes" }
![button:Flagrant Garden](https://flagrant.garden)
{ .example .flagrant }
```

```memo-example-renderer { title="With Preset" }
![button:](preset:flagrant_garden)
```

```memo-example-renderer { title="With Legacy Template" }
This example uses the legacy template for rendering the button.

With [`legacy`](#legacy) set to `true` in the attributes or from a preset,
Platen renders the button with the native [sref:`<a>` (anchor)][s01] HTML
element instead of the [sref:`<sl-button>`] element from [sref:Shoelace].

This option is included to allow folks to intentionally transition from the
legacy implementation to Shoelace, which will become the default in the future.
Eventually, the legacy implementation will be removed. For more information, see
[Legacy Template](#legacy-template).

[sref:`<sl-button>`]: sl.component:button
[sref:Shoelace]: sl:
[s01]: mdn.html.element:a

<!-- Example Start -->

![button:Legacy Button](https://flagrant.garden)
{ legacy=true }
```

## Inputs

This section describes how the normal markdown input for images works with the button render hook.

Images use this syntax for their inputs:

```markdown
![alt_text](source "title")
```

### `alt_text` (as `label_text`)

Specifies the Markdown text to render as the button's label.

This value must start with the prefix `button:`. For example, with `![button:Platen](https://platen.io)`,
`label_text`'s value would be `Platen`.

{{< memo/renderer/input "alt_text" >}}

### `source` (as `destination`)

Specify the URL for where the button should take a visitor when clicked. This value is used as the
[sref:`href`][s02] attribute of the button's element.

You can also use this value to specify a [Preset](#presets) for the button by prefixing the value with `preset:`.
Specify the name of the [preset](#presets), like `![button:](preset:foo)`. If the preset is defined in a subfolder,
specify the dot-path relative to `data/platen/buttons`. For example, the preset defined in
`data/platen/buttons/flagrant_garden/home` would be specified like `![button:](preset:flagrant_garden.home)`.

{{< memo/renderer/input "source" >}}

### `title` (as `label_icon`)

Specify the name of the icon you want to display instead of text for the button label. You can use any
[sref:valid icon][sl01] from Shoelace. When you specify the name of an icon, Platen ignores the value for `label_text`.

{{< memo/renderer/input "title" >}}

## Attributes

### `circle`

Use this attribute to make the button render as a circle just large enough to hold the
[`label_icon`](#title-as-label_icon). If this attribute is set without a label icon, it's ignored.

This option isn't valid with the [legacy button](#legacy-template).

{{< memo/renderer/attribute "circle" >}}

### `class`

Specify one or more classes to add to the button's element. By default, it has only the `platen-btn` class.

You can also define the default classes for your buttons with the `platen.markup.buttons.classes` setting for
your site configuration. Values from your site configuration are overridden by this attribute in your markup. For more
information, see [Configuration](#configuration).

{{< memo/renderer/attribute "class" >}}

### `download_name`

Use this attribute to tell the browser to download the linked file with this name. This is only useful when the
[`destination`](#source-as-destination) is a file.

This option isn't valid with the [legacy button](#legacy-template).

{{< memo/renderer/attribute "download_name" >}}

### `height`

Use this attribute to set a custom height for the rendered button. This overrides the height set by the button's
[`size`](#size). This is a simplistic style option for when the only style you want to override for your button is its
dimensions. It's usually better and more maintainable to define a custom [`class`](#class) for your buttons. For more
information on styling your buttons, see [Styling](#styling).

This option isn't valid with the [legacy button](#legacy-template).

{{< memo/renderer/attribute "height" >}}

### `legacy`

Use this option to set whether Platen uses the legacy template for rendering buttons.

Specify `true` to use the [legacy template](#legacy-template) for the buttons element, or `false` to use the
[sref:`<sl-button>`] element from [sref:Shoelace]. If this value isn't set, Platen uses the value of the
`platen.markup.buttons.use_legacy` setting defined in your site configuration. For more information, see
[Configuration](#configuration).

When this setting is `true`, the options in the list below aren't valid. If you use them when `legacy` is `true`,
Platen warns you about the incompatibility and ignores the invalid options.

- [`circle`](#circle)
- [`download_name`](#download_name)
- [`height`](#height)
- [`outline`](#outline)
- [`pill`](#pill)
- [`prefix_icon`](#prefix_icon)
- [`rel`](#rel)
- [`size`](#size)
- [`suffix_icon`](#suffix_icon)
- [`target`](#target)
- [`variant`](#variant)
- [`width`](#width)

{{< memo/renderer/attribute "legacy" >}}

### `outline`

Use this attribute to render the button with an outline instead of as a block with background color.

You can also define whether your buttons are rendered with an outline with the `platen.markup.buttons.outline` setting
for your site configuration. Values from your site configuration are overridden by this attribute in your markup. For
more information, see [Configuration](#configuration).

This option isn't valid with the [legacy button](#legacy-template).

{{< memo/renderer/attribute "outline" >}}

### `pill`

Use this attribute to render the button with rounded corners instead of as a rectangle.

You can also define whether your buttons are rendered with rounded corners with the `platen.markup.buttons.pill`
setting for your site configuration. Values from your site configuration are overridden by this attribute in your
markup. For more information, see [Configuration](#configuration).

This option isn't valid with the [legacy button](#legacy-template).

{{< memo/renderer/attribute "pill" >}}

### `prefix_icon`

Use this attribute to insert an icon before your label text. You can use any [sref:valid icon][sl01] from Shoelace.

This option isn't valid with the [legacy button](#legacy-template).

{{< memo/renderer/attribute "prefix_icon" >}}

### `preset` { #attributes-preset }

Specify the name of the [preset](#presets) to use, if any. If the preset is defined in a subfolder,
specify the dot-path relative to `data/platen/buttons`. For example, the preset defined in
`data/platen/buttons/flagrant_garden/home` would be specified as `flagrant_garden.home`.

{{< memo/renderer/attribute "preset" >}}

### `rel`

Use this value to set the [sref:`rel`] to define the relationship of the linked URL as a list of link types. When
specifying multiples values, specify them together as a space-separated string.

The default value is `noreferrer noopener`. Set this value to an empty string to remove the attribute from the rendered
button.

Valid values are:

- `alternate`
- `author`
- `bookmark`
- `external`
- `help`
- `license`
- `me`
- `next`
- `nofollow`
- `noopener`
- `noreferrer`
- `opener`
- `prev`
- `search`

For more information on valid values, see [the documentation for the `rel` attribute][s06].

This option isn't valid with the [legacy button](#legacy-template).

{{< memo/renderer/attribute "rel" >}}

### `size`

Use this attribute to specify the size of the rendered button. The default size is `medium`.

This option isn't valid with the [legacy button](#legacy-template).

{{< memo/renderer/attribute "size" >}}

### `suffix_icon`

Use this attribute to insert an icon after your label text. You can use any [sref:valid icon][sl01] from Shoelace.

This option isn't valid with the [legacy button](#legacy-template).

{{< memo/renderer/attribute "suffix_icon" >}}

### `target`

Use this attribute to set the [sref:`target`][s09] attribute on the rendered button to tell the browser where to open
the link. Note that when using this attribute, you will need to override the [`rel`](#rel) attribute or the links won't
work.

This option isn't valid with the [legacy button](#legacy-template).

{{< memo/renderer/attribute "target" >}}

### `variant`

Use this attribute to change the theme of the rendered button.

The `text` variant is a special variant that removes the borders and background color of the button styling only the
label. The button has the same target area for interactions.

This option isn't valid with the [legacy button](#legacy-template).

{{< memo/renderer/attribute "variant" >}}

### `width`

Use this attribute to set a custom width for the rendered button. This overrides the width set by the button's
[`size`](#size). This is a simplistic style option for when the only style you want to override for your button is its
dimensions. It's usually better and more maintainable to define a custom [`class`](#class) for your buttons. For more
information on styling your buttons, see [Styling](#styling).

This option isn't valid with the [legacy button](#legacy-template).

{{< memo/renderer/attribute "width" >}}

## Presets

You can define any number of preset buttons reusably in your site's data. Any YAML files you add in the
`data/platen/buttons` folder are available for use. You can use folders to group presets together.

The available properties you can specify for a preset are listed below and match the available attributes and inputs.
When used together with attributes and inputs, any value specified as an attribute or input overrides the value
specified in the preset's definition.

`````````tabs { #merging-preset-and-attributes-example }
``````tab { name="Preset Definition" }
Here we define a preset for linking to the Flagrant Garden coop in
`data/platen/buttons/platenio.yaml`:

```yaml
destination: https://flagrant.garden
label_text:  _Flagrant Garden_
prefix_icon:
  name: flower3
  style: >-
    filter: invert(.7)sepia(1)saturate(.5)hue-rotate(270deg);
```
``````

``````tab { name="Markdown Usage" }
Then, in our markdown, we use the button markup and reference the preset:

```markdown
![button:Flagrant Garden Coop]()
{
  preset="flagrant_garden"
  .extra-flagrant
  .extra-garden
}
```

Which is processed to the equivalent YAML internally:

```yaml
class:      extra-flagrant extra-garden
preset:     flagrant_garden
label_text: Flagrant Garden Coop
```
``````

``````tab { name="Merged Values" }
Now that we have both the values from the preset and Markdown, Platen combines
them into:

```yaml
class:       extra-flagrant extra-garden
destination: https://flagrant.garden
label_text:  Flagrant Garden Coop
prefix_icon:
  name: flower3
  style: >-
    filter: invert(.7)sepia(1)saturate(.5)hue-rotate(270deg);
```

Because both the preset and the markdown specify a value for `label_text`, the value
from Markdown is used. If it had been written as `![button:]()` instead, the
value from `flagrant_garden.yaml` would've been used.

Only the preset defines a value for the button's destination source, so that
value is used.

The preset doesn't define any classes but the Markdown does, so those are added
for use.

![button:Flagrant Garden Coop]()
{
  preset="flagrant_garden"
  .extra-flagrant
  .extra-garden
}
``````
`````````

```details { summary="Careful!" .warning }
When you use a preset, inputs, and attributes together, the values specified as
an input or attribute always **override** any values from the preset. If you
specify a class as an attribute, _only_ classes from the attribute are used, not
the value of the `class` property in the preset.

If you want to use extensible values, you probably want to define a style
or add another preset instead.
```

### `circle` { #preset-property-circle }

Use this property to make the button render as a circle just large enough to hold the
[`label_icon`](#title-as-label_icon). If this property is set without a label icon, it's ignored.

This option isn't valid with the [legacy button](#legacy-template).

### `class` { #preset-property-class }

Specify one or more classes to add to the button's element. By default, it has only the `platen-btn` class.

You can specify this value either as a string (if you only need to add one class) or as a list of strings.

`````````tabs { #preset-property-class-strings }
``````tab { name="Single Class" }
```yaml
class: sepia
```
``````

``````tab { name="Multiple Classes" }
```yaml
class:
  - big
  - shadowed
```
``````
`````````

You can also define the default classes for your buttons with the `platen.markup.buttons.classes` setting for
your site configuration. Values from your site configuration are overridden by this property in your preset. For more
information, see [Configuration](#configuration).

### `destination` { #preset-property-destination }

Specify the URL for where the button should take a visitor when clicked. This value is used as the [sref:`href`][s02]
attribute of the button's element.

### `download_name` { #preset-property-download_name }

Use this property to tell the browser to download the linked file with this name. This is only useful when the
`destination` [input](#source-as-destination) or [preset property](#preset-property-destination) is a file.

This option isn't valid with the [legacy button](#legacy-template).

### `height` { #preset-property-height }

Use this property to set a custom height for the rendered button. This overrides the height set by the button's
[`size`](#size). This is a simplistic style option for when the only style you want to override for your button is its
dimensions. It's usually better and more maintainable to define a custom [`class`](#class) for your buttons. For more
information on styling your buttons, see [Styling](#styling).

This option isn't valid with the [legacy button](#legacy-template).

### `html_attributes` { #preset-property-html_attributes }

Use this property to add any number of HTML attributes to the button element. This property gives you more flexibility
for extending and overriding the element without needing a custom template.

This value must be a map of key-value pairs where the key is the name of the attribute and value is the attribute's
value. Any values that aren't a string are converted into one before inserting them into the element's HTML.

For example, you could define the [sref:`lang` global attribute][s05] to set the language of the button to Italian:

```yaml
html_attributes:
  lang: it
```

If any of the keys in this property conflict with a key that is added by another property or an attribute in the
markup, the other property or attribute is applied instead of the value for the key in this property. For example,
while you could specify `size` with this property, it would be overrided by the `size` [attribute](#size) or
[preset property](#preset-property-size) if either of them is set.

This option isn't valid with the [legacy button](#legacy-template).

### `label_icon` { #preset-property-label_icon }

Use this property to insert an icon instead of label text. When you specify this property, Platen ignores the value for
`label_text`.

If this property's value is a string, it must be the name of the icon. You can use any [sref:valid icon][sl01] from
Shoelace. With this property, you can also define attributes to pass to the label icon.

`````````tabs { #preset-property-label_icon-values }
``````tab { name="As String" }
In this case, the value of `label_icon` is the name of the icon to insert.

```yaml
# data/platen/buttons/label_icon/string.yaml
label_icon: gear
```

![button:String Configuration](https://platen.io)
{ preset="label_icon.string" }
``````

``````tab { name="As Object with Properties" }
In this case, the value of `label_icon` is an object with defined properties.

```yaml
# data/platen/buttons/label_icon/object.yaml
label_icon:
  name: gear
  style: "color: #417505;"
```

![button:Object Configuration](https://platen.io)
{ preset="label_icon.object" }
``````
`````````

This option isn't valid with the [legacy button](#legacy-template).

#### `name` { #preset-property-label_icon-name }

If you're specifying the `label_icon` as an object, this property is required. The value must be the name of the icon.
You can use any [sref:valid icon][sl01] from Shoelace.

#### `label` { #preset-property-label_icon-label }

Specify an alternate description to use for assistive devices. If omitted, the icon will be considered presentational
and ignored by assistive devices.

#### `src` { #preset-property-label_icon-src }

Specify the URL of an SVG file to use as the icon. Be sure you trust the content you are including, as it will be
executed as code and can result in XSS attacks.

#### Other Attributes

You can specify any other HTML attributes for the icon. The key is used as the name of the attribute and the value is
the attribute's value. Any values that aren't a string are converted into one before inserting them into the element's
HTML.

### `label_text` { #preset-property-label_text }

Specifies the Markdown text to render as the button's visible text. Unlike when defining this value as
[input](#alt_text-as-label_text), do not prefix this value with `button:`. This value can also span multiple lines,
unlike when you define it as input.

`````````tabs { #preset-property-label_text-strings }
``````tab { name="Single Line" }
```yaml
label_text: Flagrant Garden
```
``````

``````tab { name="Long Line" }
In this example, the value is an arbitrarily long block of text. By declaring
the key as `label_text: >-`, you're telling Platen to treat the value as one
very long line of text, replacing line breaks with spaces and trimming any
extra whitespace.

In this usage, the value _must_ start on the next line and indented 2 spaces.
The rest of the lines of text must start at the same indent level.

```yaml
label_text: >-
  This line of Markdown is much longer than you could typically fit into a
  button. It might not be aesthetically pleasing to have a button with this
  much text.

  Notice that even though this looks like two paragraphs in the work, it is
  treated as one very long line because of the `>-` syntax used.
height: auto
width: 100%
```

![button:](preset:long_line)

Notice that this example also needs to use the `height` and `width` settings
to get the button to display the entire text instead of clipping it. This works,
but it still doesn't look very good. You could further style it with a custom
class, but we strongly advise you not to make buttons with this much text.
``````

``````tab { name="Paragraphs" }
In this example, the value is an arbitrarily long block of text representing
two paragraphs. By declaring the key as `label_text: |-`, you're telling Platen
to treat  the value as a block of text, where the line breaks are kept but
other trailing whitespace is removed.

In this usage, the value _must_ start on the next line and indented 2 spaces.
The rest of the lines of text must start at the same indent level.

```yaml
label_text: |-
  This block of Markdown is much longer than you could typically fit into a
  button. It might not be aesthetically pleasing to have a button with this
  much text.

  Notice that this does produce two paragraphs of text for the button because
  Platen keeps the line breaks. The blank line between these paragraphs ensures
  they're actually rendered as paragraphs.
height: auto
width: 100%
```

![button:](preset:paragraph)

Notice that this example also needs to use the `height` and `width` settings
to get the button to display the entire text instead of clipping it. This works,
but it still doesn't look very good. You could further style it with a custom
class, but we strongly advise you not to make buttons with this much text.
``````
`````````

### `legacy` { #preset-property-legacy }

Use this property to set whether Platen uses the legacy template for rendering buttons.

Specify `true` to use the [legacy template](#legacy-template) for the buttons element, or `false` to use the
[sref:`<sl-button>`] element from [sref:Shoelace]. If this value isn't set in the preset or markup, Platen uses the
value of the `platen.markup.buttons.use_legacy` setting defined in your site configuration. For more information, see
[Configuration](#configuration).

When this setting is `true`, the attributes and preset properties in the list below aren't valid. If you use them when
`legacy` is `true`, Platen warns you about the incompatibility and ignores the invalid options.

- [`circle`](#circle)
- [`download_name`](#download_name)
- [`height`](#height)
- [`outline`](#outline)
- [`pill`](#pill)
- [`prefix_icon`](#prefix_icon)
- [`rel`](#rel)
- [`size`](#size)
- [`suffix_icon`](#suffix_icon)
- [`target`](#target)
- [`variant`](#variant)
- [`width`](#width)

### `outline` { #preset-property-outline }

Use this property to render the button with an outline instead of as a block with background color.

You can also define whether your buttons are rendered with an outline with the `platen.markup.buttons.outline` setting
for your site configuration. Values from your site configuration are overridden by this preset property. For
more information, see [Configuration](#configuration).

This option isn't valid with the [legacy button](#legacy-template).

### `pill` { #preset-property-pill }

Use this property to render the button with rounded corners instead of as a rectangle.

You can also define whether your buttons are rendered with rounded corners with the `platen.markup.buttons.pill`
setting for your site configuration. Values from your site configuration are overridden by this preset property. For
more information, see [Configuration](#configuration).

This option isn't valid with the [legacy button](#legacy-template).

### `prefix_icon` { #preset-property-prefix_icon }

Use this property to insert an icon before your label text.

If this property's value is a string, it must be the name of the icon. You can use any [sref:valid icon][sl01] from Shoelace.
With this property, you can also define attributes to pass to the prefix icon.

`````````tabs { #preset-property-prefix_icon-values }
``````tab { name="As String" }
In this case, the value of `prefix_icon` is the name of the icon to insert.

```yaml
# data/platen/buttons/prefix/string.yaml
prefix_icon: gear
```

![button:String Configuration](https://platen.io)
{ preset="prefix.string" }
``````

``````tab { name="As Object with Properties" }
In this case, the value of `prefix_icon` is an object with defined properties.

```yaml
# data/platen/buttons/prefix/object.yaml
prefix_icon:
  name: gear
  style: "color: #417505;"
```

![button:Object Configuration](https://platen.io)
{ preset="prefix.object" }
``````
`````````

This option isn't valid with the [legacy button](#legacy-template).

#### `name` { #preset-property-prefix_icon-name }

If you're specifying the `prefix_icon` as an object, this property is required. The value must be the name of the icon.
You can use any [sref:valid icon][sl01] from Shoelace.

#### `label` { #preset-property-prefix_icon-label }

Specify an alternate description to use for assistive devices. If omitted, the icon will be considered presentational
and ignored by assistive devices.

#### `src` { #preset-property-prefix_icon-src }

Specify the URL of an SVG file to use as the icon. Be sure you trust the content you are including, as it will be
executed as code and can result in XSS attacks.

#### Other Attributes

You can specify any other HTML attributes for the icon. The key is used as the name of the attribute and the value is
the attribute's value. Any values that aren't a string are converted into one before inserting them into the element's
HTML.

### `rel` { #preset-property-rel }

Use this property to set the [sref:`rel`] to define the relationship of the linked URL as a list of link types. When
specifying multiples values, specify them together as a space-separated string.

The default value is `noreferrer noopener`. Set this value to an empty string to remove the property from the rendered
button.

Valid values are:

- `alternate`
- `author`
- `bookmark`
- `external`
- `help`
- `license`
- `me`
- `next`
- `nofollow`
- `noopener`
- `noreferrer`
- `opener`
- `prev`
- `search`

For more information on valid values, see [the documentation for the `rel` attribute][s06].

This option isn't valid with the [legacy button](#legacy-template).

### `size` { #preset-property-size }

Use this property to specify the size of the rendered button. The default size is `medium`.

This option isn't valid with the [legacy button](#legacy-template).

### `suffix_icon` { #preset-property-suffix_icon }

Use this property to insert an icon after your label text.

If this property's value is a string, it must be the name of the icon. You can use any [sref:valid icon][sl01] from
Shoelace. With this property, you can also define attributes to pass to the suffix icon.

`````````tabs { #preset-property-suffix_icon-values }
``````tab { name="As String" }
In this case, the value of `suffix_icon` is the name of the icon to insert.

```yaml
# data/platen/buttons/suffix/string.yaml
suffix_icon: gear
```

![button:String Configuration](https://platen.io)
{ preset="suffix.string" }
``````

``````tab { name="As Object with Properties" }
In this case, the value of `suffix_icon` is an object with defined properties.

```yaml
# data/platen/buttons/suffix/object.yaml
suffix_icon:
  name: gear
  style: "color: #417505;"
```

![button:Object Configuration](https://platen.io)
{ preset="suffix.object" }
``````
`````````

This option isn't valid with the [legacy button](#legacy-template).

#### `name` { #preset-property-suffix_icon-name }

If you're specifying the `suffix_icon` as an object, this property is required. The value must be the name of the icon.
You can use any [sref:valid icon][sl01] from Shoelace.

#### `label` { #preset-property-suffix_icon-label }

Specify an alternate description to use for assistive devices. If omitted, the icon will be considered presentational
and ignored by assistive devices.

#### `src` { #preset-property-suffix_icon-src }

Specify the URL of an SVG file to use as the icon. Be sure you trust the content you are including, as it will be
executed as code and can result in XSS attacks.

#### Other Attributes

You can specify any other HTML attributes for the icon. The key is used as the name of the attribute and the value is
the attribute's value. Any values that aren't a string are converted into one before inserting them into the element's
HTML.

### `target`

Use this property to set the [sref:`target`][s09] attribute on the rendered button to tell the browser where to open
the link. Note that when using this property, you will need to override the [`rel`](#rel) property or the links won't
work.

This option isn't valid with the [legacy button](#legacy-template).

### `variant`

Use this property to change the theme of the rendered button.

The `text` variant is a special variant that removes the borders and background color of the button styling only the
label. The button has the same target area for interactions.

This property isn't valid with the [legacy button](#legacy-template).

### `width`

Use this property to set a custom width for the rendered button. This overrides the width set by the button's
[`size`](#size). This is a simplistic style option for when the only style you want to override for your button is its
dimensions. It's usually better and more maintainable to define a custom [`class`](#class) for your buttons. For more
information on styling your buttons, see [Styling](#styling).

This property isn't valid with the [legacy button](#legacy-template).

## Legacy Template

The legacy template uses the standard [sref:`<a>` (anchor)][s01] HTML element instead of the more customizable Shoelace
element. It doesn't support as many options and will eventually be removed.

<sl-alert variant="warning" open>
  <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
  We strongly suggest you update your themes to use the new template.
</sl-alert>

Currently, Platen uses the legacy template by default and warns on its use. You can override these behaviors in the
configuration. To use the new template by default, set [sref:`platen.markup.buttons.use_legacy`][c98] to `false`. To
continue using the legacy buttons element without warnings, set [sref:`platen.markup.buttons.warn_on_legacy`][c99] to
`false`.

## Configuration

Several of the options for this markup can be configured in your site configuration or Platen's parameter data. The most
convenient option is to edit the `data/_params/platen/markup.yaml` file. Except for the `warn_on_legacy` setting, which
is site-wide, every configuration setting can by overridden by the attributes in your markup or properties in a preset.

The default values for this markup's rendering options are defined below:

```yaml
buttons:
  classes: []
  size: null
  outline: null
  pill: null
  variant: null
  use_legacy: true
  warn_on_legacy: true
```

[sref:`classes`][c01]
: If you set `classes` to a list of strings, Platen adds them to the rendered buttons. If you specify any classes for
  a buttons markup as an [attribute](#class) or [preset property](#preset-property-class), those are used instead.

[sref:`size`][c02]
: If you want to change the default size for your buttons, set this value to `small`, `medium`, or `large`. The `size`
  [attribute](#size) and [preset property](#preset-property-size) override this configuration setting.

[sref:`outline`][c03]
: If you want to set your buttons to display outlined instead of solid by default, set this value to `true`. The
  `outline` [attribute](#outline) and [preset property](#preset-property-outline) override this configuration setting.

[sref:`pill`][c04]
: If you want to set your buttons to display with rounded corners by default, set this value to `true`. The `pill`
  [attribute](#pill) and [preset property](#preset-property-pill) override this configuration setting.

[sref:`variant`][c05]
: If you want to change the default variant for your buttons, set this value to a valid variant. The `variant`
  [attribute](#variant) and [preset property](#preset-property-variant) override this configuration setting.

[sref:`use_legacy`][c98]
: If you want your buttons rendered with the new default template to use the full set of options, set this value to
  `false`. It defaults to `true` now, but will default to `false` in the future. Eventually, the legacy template will
  be removed entirely.

[sref:`warn_on_legacy`][c99]
: If you want to silence the warnings Platen emits when you use the legacy template, set this value to `false`.

You can find the full set of options for this markup in the [sref:configuration reference][c00].

## Styling

This markup uses the SCSS defined in the `styles/markup/_buttons.scss` file in your [assets folder][h04], which
defaults to `assets` in your project root.

This section discusses styling the non-legacy template. Instead of applying custom styles to the
[legacy template](#legacy-template), we strongly recommend you migrate to the non-legacy template. In the near future,
it will become the default. Eventually, the legacy template will be removed entirely.

``````details
---
summary: Details SCSS
heading_level: 3
---

```scss
.markdown sl-button.platen-btn {
  &[data-custom-height="true"] {
    &::part(base) {
      height: var(--custom-height);
      align-items: center;
    }
  }
  &[data-custom-width="true"] {
    width: var(--custom-width);
    &::part(base) {
      white-space: normal;
    }
  }
}
```
``````

The SCSS for buttons only applies to [sref:`<sl-button>`] elements in a container that has the `markdown` class and
only when the element itself has the `platen-btn` class. This keeps the style from being unintentionally applied
anywhere else.

The style:

- Handles when the `height` [attribute](#height) or [preset property](#preset-property-height) is set for a button.
  When it is, Platen adds the `data-custom-height` attribute to the [sref:`<sl-button>`] element and adds the
  `--custom-height` CSS variable as an inline style.

  The SCSS applies only when the `data-custom-height` attribute is set. It overrides the button's container height and
  ensures that they align vertically instead of at the top.
- Handles when the `width` [attribute](#width) or [preset property](#preset-property-width) is set for a button.
  When it is, Platen adds the `data-custom-width` attribute to the [sref:`<sl-button>`] element and adds the
  `--custom-width` CSS variable as an inline style.

  The SCSS applies only when the `data-custom-width` attribute is set. It overrides the button's width and sets ensures
  that the label text breaks across lines as needed.

### Extending the Style

You can extend this style by adding SCSS into the `styles/_custom.scss` file in your [assets folder][h04] or by copying
the provided style into `styles/markup/_buttons.scss` and editing it.

When you do, make sure your styles use this selector as the base. All of your styles should be contained in this
selector or one of its children.

```scss
.markdown sl-details.platen-btn {
  // Your styles here
}
```

The rest of this section is a list of selectors you might find useful when styling the rendered buttons.

`[slot="prefix"]`
: This selector targets the [sref:`<sl-icon>`] that Platen adds when you use the `prefix_icon`
  [attribute](#prefix_icon) or [preset property](#preset-property-prefix_icon).

`[slot="suffix"]`
: This selector targets the [sref:`<sl-icon>`] that Platen adds when you use the `suffix_icon`
  [attribute](#suffix_icon) or [preset property](#preset-property-suffix_icon).

`&::part(base)`
: This selector targets the base container for the rendered button.

`&::part(prefix)`
: This selector targets the container that wraps  the prefix icon.

`&::part(label)`
: This selector targets the container that wraps the button's label text.

`&::part(suffix)`
: This selector targets the container that wraps the suffix icon.

### Overriding the Style

You can completely override the provided style by defining the `styles/markup/_buttons.scss` file in your
[assets folder][h04].

You can also create a new style module in the `styles/markup` folder and set [sref:`platen.markup.buttons.style`][c06]
in your site configuration to that module's name. If you do, omit the leading `_` and trailing `.scss`. For example,
the name for the style module `assets/styles/markup/_foo.scss` is `foo`.

<!-- Link References -->
[sref:`<sl-button>`]: sl.component:button
[sref:Shoelace]: sl:
[s01]: mdn.html.element:a
[s02]: mdn.html.element:a#attr-href
[s06]: mdn.html.attribute:rel
[s05]: mdn.html.global_attribute:lang
[s09]: mdn.html.element:a#attr-target
[sl01]: sl.component:icon?id=default-icons
[c00]: platen.site.markup.buttons
[c01]: platen.site.markup.buttons.classes
[c02]: platen.site.markup.buttons.size
[c03]: platen.site.markup.buttons.outline
[c04]: platen.site.markup.buttons.pill
[c05]: platen.site.markup.buttons.variant
[c06]: platen.site.markup.buttons.style
[c98]: platen.site.markup.buttons.use_legacy
[c99]: platen.site.markup.buttons.warn_on_legacy
[h04]: https://gohugo.io/getting-started/directory-structure/#directory-structure-explained
