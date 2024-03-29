---
title: Styled Text
weight: 201
summary: >-
  Documentation on the `styled` image link markup, which renders an image link's
  text as a styled span.
Memo:
  Name: styled
  MungeTitle: false
  front_matter:
    configs:
      - definition: frontmatter/defined-style.json
        publish:    /frontmatter/platen/data/styled_text-styles.json
        resolve_schemas: true
      - definition: frontmatter/defined-preset.json
        publish:    /frontmatter/platen/data/styled_text-presets.json
        resolve_schemas: true
      - merge:
          - frontmatter/defined-style.json
          - frontmatter/defined-preset.json
        publish:    /frontmatter/platen/data/styled_text.json
        resolve_schemas: true
        join_arrays:     true
      - definition: frontmatter/image.json
        publish:    /frontmatter/platen/content/snippets/styled_text/image.json
      - merge:      frontmatter/image.json
        publish:    /frontmatter/platen/content/snippets/styled_text.json
      - merge:
          - frontmatter/defined-style.json
          - frontmatter/defined-preset.json
          - frontmatter/image.json
        publish: /frontmatter/platen/markup/styled_text.json
        resolve_schemas: true
        join_arrays:     true
  Kind: Renderer.Image
  Attributes:
    id:
      Ignore: true
    class:
      Ignore: true
  SupportsInline: false
  alt_text:
    Alias: text
    Type: String.Markdown.Inline
  destination:
    Alias: style
    Required: false
  title:
    Alias: class
    Type: String.Class
---

Platen uses special notation for rendering styled text with an image link.

When used, it inserts an [sref:`<span>` (span)][s01] HTML element.

## Syntax

{{< memo/renderer/syntax >}}

## Examples

```memo-example-renderer { title="Minimal Example" }
![styled:Flagrant Garden]()
```

```memo-example-renderer { title="With Classes" }
![styled:Flagrant Garden](. "example foo")
```

```memo-example-renderer { title="With Defined Style" }
![styled:Flagrant Garden](baz)
```

```memo-example-renderer { title="With Preset" }
An ![styled:](preset:example)
```

## Inputs

This section describes how the normal markdown input for images works with the styled text render hook.

Images use this syntax for their inputs:

```markdown
![alt_text](source)
```

### `alt_text` (as `text`)

Specifies the Markdown text to render as the span's text.

This value must start with the prefix `styled:`. For example, with `![styled:Platen]()`, `text`'s value would be
`Platen`.

{{< memo/renderer/input "alt_text" >}}

### `source` (as `style`)

Specify the name of the [style](#styles) to use, if any. If the style is defined in a subfolder, specify the dot-path
relative to `data/platen/styled_text/styles`. For example, the style defined in
`data/platen/styled_text/styles/flagrant_garden/basic` would be specified as `flagrant_garden.basic`. To specify the
default style, set this value to `.` or `_default`. This value must be passed to specify the `class` option as the
markup's `title`.

If you prefix this value with `preset:`, it uses the value as the preset for the markup instead of the style. For more
information, see [Presets](#presets).

{{< memo/renderer/input "source" >}}

### `title` (as `class`)

Specify one or more classes to add to the span element. To specify this value, you must specify a value for
`source`. To add classes to the default style, specify `source` as `.` or `_default`. For example, the markup
`![styled:text](. "foo bar")` adds the classes `foo` and `bar` to the default style.

{{< memo/renderer/input "title" >}}

## Presets

You can define any number of preset styled texts reusably in your site's data. Any YAML files you add in the
`data/platen/styled_text` folder are available for use. You can use folders to group presets together.

The available properties you can specify for a preset are listed below and match the available inputs. When used
together with inputs, any value specified as an input overrides the value specified in the preset's definition.

`````````tabs { #merging-work-and-attributes-example }
``````tab { name="Work Definition" }
Here we define a preset for a reusable span in
`data/platen/styled_text/example.yaml`:

```yaml
text: Example
class:
  - foo
  - bar
style:
  - baz
```
``````

``````tab { name="Markdown Usage" }
Then, in our markdown, we use the styled text markup and reference the preset:

```markdown
![styled:Override](preset:example)
```

Which is processed to the equivalent YAML internally:

```yaml
class: []
preset: example
text:   Override
```
``````

``````tab { name="Merged Values" }
Now that we have both the values from the preset and Markdown, Platen combines
them into:

```yaml
class:
  - foo
  - bar
style: baz
text:  Override
```

Because both the preset and the markdown specify a value for `text`, the value
from Markdown is used. If it had been written as `![styled:](preset:example)`
instead, the value from `example.yaml` would've been used.

Only the preset defines a value for the span's style, so that
value is used.

The preset also defines classes that the Markdown doesn't override, so those
are used.
``````
`````````

```details { summary="Careful!" .warning }
When you use a preset and inputs together, the values specified as an input
always **override** any values from the preset. If you specify a class as an
input, _only_ classes from the input are used, not the value of the `classes`
property in the preset.

If you want to use extensible values, you probably want to define a style
or add another preset instead.
```

### `class` { #preset-property-class }

Specify one or more classes to add to the span's element. By default, it has no classes.

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

### `style` { #preset-property-style }

Specify any number of styles to use for this preset. The styles are applied in the order they're specified, with later
styles overriding values from earlier ones.

You can specify a single style as a string or any number of styles as a list.

If the style is defined in a subfolder, specify the dot-path relative to `data/platen/styled_text/styles`. For example,
the style defined in `data/platen/styled_text/styles/flagrant_garden/basic` would be specified as
`flagrant_garden.basic`.

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

Specifies the Markdown text to render as the styled text. Unlike when defining this value as [input](#alt_text-as-text),
do not prefix this value with `styled:`. This value can also span multiple lines, unlike when you define it as input.

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
  This line of Markdown is very long. It might not be aesthetically pleasing to
  have a span with this much text.

  Notice that even though this looks like two paragraphs in the preset, it is
  treated as one very long line because of the `>-` syntax used.
```

Here it is: ![styled:](preset:long_line)
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
  This line of Markdown is very long. It might not be aesthetically pleasing to
  have a span with this much text.

  Notice that this does produce two paragraphs of text for the span because
  Platen keeps the line breaks. The blank line between these paragraphs ensures
  they're actually rendered as paragraphs.
```

![styled:](preset:paragraph)
``````
`````````

## Styles

You can use the defined styles feature to save different styles for your styled text as data. Any YAML files you add in
the `data/platen/styled_text/styles` folder are available for use. You can use folders to group styles together.

Style settings are applied to the span (`<span>`) element the markup adds.

### Default Style

All styled texts inherit the empty default style, defined in `data/platen/styled_text/styles/_default.yaml`. You can
override the default values by adding this file to your own site.

```details { summary="Careful when Overriding the Default File" .warning }
When you add the `_default.yaml` file to your site data, you **completely replace**
the default that Platen provides for all styled text. Make sure to do so carefully.

Most of the time, you'll just want to define new styles instead.
```

### `classes` { #style-property-classes }

Specify one or more classes to add to the span's element. By default, it has no classes. For styles other than the
[default](#default-style), these values are added to the default list of classes.

You can specify this value either as a string (if you only need to add one class) or as a list of strings.

`````````tabs { #style-property-class-strings }
``````tab { name="Single Class" }
```yaml
classes: sepia
```
``````

``````tab { name="Multiple Classes" }
```yaml
classes:
  - big
  - shadowed
```
``````
`````````

### `html_attributes` { #style-property-html_attributes }

This property defines the values for the HTML attributes of the [sref:span element][s01] added by the styled text
markup. By default, none of them are defined.

You can add any of the [sref:global HTML attributes][s02] to the element. If your value needs to be split across
multiple lines for readability, make sure to use the `>-` syntax after the key. This ensures that the value is treated
as a single line with no trailing newline, which would break the attribute in the HTML.

For example:

``````tabs { #style-property-attribute-example }
````tab { name="Style Definition"}
This style (defined in `data/platen/styled_text/styles/baz.yaml`) defines the
[sref:`style` attribute][e01] for the spans that use it. Note that it uses
the `>-` syntax after the key.

```yaml
classes:
  - baz
html_attributes:
  style: >-
    background: violet;
    border: 2px solid #e66465;
    color: black;
```

[e01]: mdn.html.global_attribute:style
````

````tab { name="Markdown" }
```markdown
This is a styled ![styled:span](baz).
```
````

````tab { name="Rendered Output"}
This is a styled ![styled:span](baz).
````
``````

<!-- Link References -->
[s01]: mdn.html.element:span
[s02]: mdn.html.global_attribute:
