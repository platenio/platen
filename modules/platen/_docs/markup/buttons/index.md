---
title: Buttons
weight: 20
summary: >-
  Documentation on the `button` image link markup, which renders an image link as a button.
platen:
  title_as_heading: true
Memo:
  Name: button
  MungeTitle: false
  front_matter:
    configs:
      - definition: frontmatter/defined-style.json
        publish:    /frontmatter/platen/data/buttons-styles.json
        resolve_schemas: true
      - definition: frontmatter/defined-preset.json
        publish:    /frontmatter/platen/data/buttons-presets.json
        resolve_schemas: true
      - merge:
          - frontmatter/defined-style.json
          - frontmatter/defined-preset.json
        publish:    /frontmatter/platen/data/buttons.json
        resolve_schemas: true
        join_arrays:     true
      - definition: frontmatter/image.json
        publish:    /frontmatter/platen/content/snippets/buttons/image.json
      - merge:      frontmatter/image.json
        publish:    /frontmatter/platen/content/snippets/buttons.json
      - merge:
          - frontmatter/defined-style.json
          - frontmatter/defined-preset.json
          - frontmatter/image.json
        publish: /frontmatter/platen/markup/buttons.json
        resolve_schemas: true
        join_arrays:     true
  Kind: Renderer.Image
  Aliases:
    - btn
  Attributes:
    id:
      Ignore: true
    style:
      Type: String
      Required: false
    preset:
      Type: String
      Required: false
  SupportsInline: false
  alt_text:
    Alias: text
    Type: String.Markdown.Inline
  destination:
    Alias: destination
    Required: true
  title:
    Ignore: true
---

Platen uses special notation for rendering links styled as buttons with an image link.

When used, it inserts an [sref:`<a>` (anchor)][s01] HTML element styled as a button.

## Syntax

{{< memo/renderer/syntax >}}

## Examples

```memo-example-renderer { title="Minimal Example" }
![button:Flagrant Garden](https://flagrant.garden)
```

```memo-example-renderer { title="With Classes" }
![button:Flagrant Garden](https://flagrant.garden)
{ .example .flagrant }
```

```memo-example-renderer { title="With Defined Style" }
![button:Flagrant Garden](https://flagrant.garden)
{ style="example_flagrant" }
```

```memo-example-renderer { title="With Preset" }
![button:](preset:flagrant_garden)
```

## Inputs

This section describes how the normal markdown input for images works with the button render hook.

Images use this syntax for their inputs:

```markdown
![alt_text](source)
```

### `alt_text` (as `text`)

Specifies the Markdown text to render as the button's visible text.

This value must start with the prefix `button:`. For example, with
`![button:Platen](https://platen.io)`, `text`'s value would be `Platen`.

{{< memo/renderer/input "alt_text" >}}

### `source` (as `destination`)

Specify the URL for where the button should take a visitor when clicked. This value is used as the
[sref:`href`][s02] attribute of the button's element.

{{< memo/renderer/input "source" >}}

## Attributes

### `class`

Specify one or more classes to add to the button's element. By default, it has only the `platen-btn`
class.

{{< memo/renderer/attribute "class" >}}

### `preset` { #attributes-preset }

Specify the name of the [preset](#presets) to use, if any. If the preset is defined in a subfolder,
specify the dot-path relative to `data/platen/buttons`. For example, the preset defined in
`data/platen/buttons/flagrant_garden/home` would be specified as `flagrant_garden.home`.

{{< memo/renderer/attribute "preset" >}}

### `style` { #attributes-style }

Specify the name of the [style](#styles) to use, if any. If the style is defined in a subfolder,
specify the dot-path relative to `data/platen/buttons/styles`. For example, the style defined in
`data/platen/buttons/styles/flagrant_garden/basic` would be specified as `flagrant_garden.basic`.

{{< memo/renderer/attribute "style" >}}

## Presets

You can define any number of preset buttons reusably in your site's data. Any YAML files you add in
the `data/platen/buttons` folder are available for use. You can use folders to group presets
together.

The available properties you can specify for a preset are listed below and match the available
attributes and inputs. When used together with attributes and inputs, any value specified as an
attribute or input overrides the value specified in the preset's definition.

`````````tabs { #merging-work-and-attributes-example }
``````tab { name="Work Definition" }
Here we define a preset for linking to the Flagrant Garden coop in
`data/platen/buttons/flagrant_garden.yaml`:

```yaml
destination: https://flagrant.garden
style:       example_flagrant
text:        _Flagrant Garden_
```
``````

``````tab { name="Markdown Usage" }
Then, in our markdown, we use the art markup and reference the work:

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
class:  extra-flagrant extra-garden
preset: flagrant_garden
text:   Flagrant Garden Coop
```
``````

``````tab { name="Merged Values" }
Now that we have both the values from the preset and Markdown, Platen combines
them into:

```yaml
class:       extra-flagrant extra-garden
destination: https://flagrant.garden
style:       example_flagrant
text:        Flagrant Garden Coop
```

Because both the preset and the markdown specify a value for `text`, the value
from Markdown is used. If it had been written as `![button:]()` instead, the
value from `flagrant_garden.yaml` would've been used.

Only the preset defines a value for the button's destination source, so that
value is used.

The preset doesn't define any classes but the Markdown does, so those are added
for use.
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

### `class` { #preset-property-class }

Specify one or more classes to add to the button's element. By default, it has only the `platen-btn`
class.

You can specify this value either as a string (if you only need to add one class) or as a list of
strings.

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

### `destination` { #preset-property-destination }

Specify the URL for where the button should take a visitor when clicked. This value is used as the
[sref:`href`][s02] attribute of the button's element.

### `style` { #preset-property-style }

Specify any number of styles to use for this preset. The styles are applied in the order they're
specified, with later styles overriding values from earlier ones.

You can specify a single style as a string or any number of styles as a list.

If the style is defined in a subfolder, specify the dot-path relative to
`data/platen/buttons/styles`. For example, the style defined in
`data/platen/buttons/styles/flagrant_garden/basic` would be specified as `flagrant_garden.basic`.

`````````tabs { #preset-property-style-strings }
``````tab { name="Single Style" }
```yaml
style: classic
```
``````

``````tab { name="Multiple Styles" }
In this example, because `flagrant` is specified last, any of its values that
conflict with those from `classic` are used. Any values that are only defined
in `classic` or `flagrant` are also used.
```yaml
style:
  - classic
  - flagrant
```
``````
`````````

### `text` { #preset-property-text }

Specifies the Markdown text to render as the button's visible text. Unlike when defining this value
as [input](#alt_text-as-text), do not prefix this value with `button:`. This value can also span
multiple lines, unlike when you define it as input.

`````````tabs { #preset-property-text-strings }
``````tab { name="Single Line" }
```yaml
text: Flagrant Garden
```
``````

``````tab { name="Long Line" }
In this example, the text is an arbitrarily long block of text. By declaring
the key as `text: >-`, you're telling Platen to treat the value as one very
long line of text, replacing line breaks with spaces and trimming any extra
whitespace.

In this usage, the value _must_ start on the next line and indented 2 spaces.
The rest of the lines of text must start at the same indent level.

```yaml
text: >-
  This line of Markdown is much longer than you could typically fit into a
  button. It might not be aesthetically pleasing to have a button with this
  much text.

  Notice that even though this looks like two paragraphs in the work, it is
  treated as one very long line because of the `>-` syntax used.
```

![button:](preset:long_line)
``````

``````tab { name="Paragraphs" }
In this example, the text is an arbitrarily long block of text representing two
paragraphs. By declaring the key as `text: |-`, you're telling Platen to treat 
the value as a block of text, where the line breaks are kept but other trailing
whitespace is removed.

In this usage, the value _must_ start on the next line and indented 2 spaces.
The rest of the lines of text must start at the same indent level.

```yaml
text: |-
  This block of Markdown is much longer than you could typically fit into a
  button. It might not be aesthetically pleasing to have a button with this
  much text.

  Notice that this does produce two paragraphs of text for the button because
  Platen keeps the line breaks. The blank line between these paragraphs ensures
  they're actually rendered as paragraphs.
```

![button:](preset:paragraph)
``````
`````````

## Styles

You can use the defined styles feature to save different styles for your buttons as data. Any YAML
files you add in the `data/platen/buttons/styles` folder are available for use. You can use folders
to group styles together.

Style settings are applied to the anchor (`<a>`) element the button adds.

### Default Style

All buttons inherit the default style, defined in `data/platen/buttons/styles/_default.yaml`. You
can override the default values by adding this file to your own site.

```details { summary="Careful when Overriding the Default File" .warning }
When you add the `_default.yaml` file to your site data, you **completely replace**
the default that Platen provides. Make sure to do so carefully.

Most of the time, you'll just want to define new styles instead.
```

``````details { summary="Default Style" .info}
```yaml
classes:
  - platen-btn
html_attributes:
  download:        null
  rel:             null
  referrer_policy: null
  target:          null
```
``````

### `classes` { #style-property-classes }

Specify one or more classes to add to the button's element. By default, it has only the `platen-btn`
class. For styles other than the [default](#default-style), these values are added to the default
list of classes.

You can specify this value either as a string (if you only need to add one class) or as a list of
strings.

`````````tabs { #style-property-class-strings }
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

### `html_attributes` { #style-property-html_attributes }

This property defines the values for the HTML attributes of the [sref:anchor element][s03] added by
the button markup. By default, none of them are defined. The [sref:`href`][s02] attribute is set by
the value of `text` passed as an [input](#alt_text-as-text) or
[preset property](#preset-property-text).

#### `download` { #style-property-html_attributes.download }

Maps to the [sref:`download` attribute][s04] and causes the browser to treat the linked URL as a
download. Use this for linking to files, rather than webpages.

Specify this value as an empty string to reuse the file's name. To rename the file, specify its new
name without an extension.

#### `rel` { #style-property-html_attributes.rel }

Maps to the [sref:`rel` attribute][s05] and defines the relationship of the linked URL as
a list of link types. Valid values are:

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

#### `referrer_policy` { #style-property-html_attributes.referrer_policy }

Maps to the [sref:`referrerpolicy` attribute][s07] and defines how much of the [sref:referrer][s08]
to send when following the link. Valid values are:

- `strict-origin-when-cross-origin` (default)
- `no-referrer`
- `no-referrer-when-downgrade`
- `origin`
- `origin-when-cross-origin`
- `same-origin`
- `strict-origin`
- `unsafe-url`

For more information on these values, see the [sref:documentation for `referrerpolicy`][s07].

#### `target` { #style-property-html_attributes.target }

Maps to the [sref:`target` attribute][s09] and defines where to display the linked URL, as the name
for a browsing context. Valid values are:

- `_self` (default)
- `_blank`
- `_parent`
- `_top`

For more information on these values, see the [sref:documentation for `target`][s09].

<!-- Link References -->
[s01]: mdn.html.element:a
[s02]: mdn.html.element:a#attr-href
[s03]: mdn.html.element:a#attributes
[s04]: mdn.html.element:a#attr-download
[s05]: mdn.html.element:a#attr-rel
[s06]: mdn.html.attribute:rel
[s07]: mdn.html.element:a#attr-referrerpolicy
[s08]: mdn.http.headers:Referer
[s09]: mdn.html.element:a#attr-target
