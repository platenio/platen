---
title: Alerts
weight: 10
summary: >-
  Documentation on adding alerts to your content with a codeblock.
Memo:
  Name: alert
  front_matter:
    configs:
      # Data
      - definition:      frontmatter/defined-preset.json
        publish:         /frontmatter/platen/data/alerts-presets.json
        resolve_schemas: true
      - merge:
          - frontmatter/defined-preset.json
        publish:         /frontmatter/platen/data/alerts.json
        resolve_schemas: true
        join_arrays:     true
      # Snippet
      - definition: frontmatter/codeblock.json
        publish:    /frontmatter/platen/content/snippets/alerts/codeblock.json
      - merge:      frontmatter/codeblock.json
        publish:    /frontmatter/platen/content/snippets/alerts.json
      # Combined markup
      - merge:
        - frontmatter/defined-preset.json
        - frontmatter/codeblock.json
        publish:         /frontmatter/platen/markup/alerts.json
        resolve_schemas: true
        join_arrays:     true
  Kind: Renderer.Codeblock
  MungeTitle: false
  Data:
    closable:
      Type: Boolean
      Default: false
      Required: false
    custom:
      Type:     Boolean
      Default:  false
      Required: false
    duration:
      Type:     String
      Default:  0
      Required: false
    header:
      Type: String.Markdown.Inline
      Required: false
    icon:
      Type:     String
      Required: false
    open:
      Type:     Boolean
      Required: false
      Default:  true
    use_default_icons:
      type:     Boolean
      required: false
    variant:
      type: String
      enum:
        - danger
        - default
        - primary
        - success
        - warning
      required: false
  Definition:
    Required: true
    Syntax: Markdown Content.
    Type: String.Markdown.Block
    TrimsLeadingWhiteSpace: true
---

The `alert` codeblock markup makes it possible for you to convert Markdown content into a box of text that stands
out from the surrounding content. This makes it easier to call attention to some content.

When used, it inserts an [sref:`<sl-alert>`] element from [sref:Shoelace] to the page with your content inside it.

## Syntax

The `alert` codeblock supports setting options as either attributes or as YAML in a data block at the start of the
codeblock. If you're using the attribute syntax, the options must be specified on the same line that the codeblock
opens on. If you're using the data syntax, the options must be specified as valid YAML wrapped with three dashes
(`---`) before the rest of the definition.

For more information, see [Using Codeblocks][01] in the [User Guide][02].

{{% memo/renderer/syntax %}}

## Examples

``````memo-example-renderer { title="Minimal Definition" }
This example shows the default alert without any defined options or
configuration settings.

<!--- Example Start -->

```alert
This is an alert! It stands out from the page.
```
``````

``````memo-example-renderer { title="Variants with Default Icons" }
This example shows the available [variants](#options-variant) for alerts.
Because [sref:`use_default_icons`] is set to `true` in the site's configuration,
these alerts also include the default icons.

For more information, see the
[`use_default_icons` option](#options-use_default_icons) and
[Configuration](#configuration).

<!--- Example Start -->

```alert
---
variant: default
---
This is an alert with the `default` variant.
```

```alert
---
variant: primary
---
This is an alert with the `primary` variant.
```

```alert
---
variant: success
---
This is an alert with the `success` variant.
```

```alert
---
variant: warning
---
This is an alert with the `warning` variant.
```

```alert
---
variant: danger
---
This is an alert with the `danger` variant.
```
``````

``````memo-example-renderer { title="Variants without Default Icons" }
This example shows the available [variants](#options-variant) for alerts.
Because [`use_default_icons`](#options-use_default_icons) is set to `false`,
these alerts don't have any icons.

<!--- Example Start -->

```alert
---
variant:           default
use_default_icons: false
---
This is an alert with the `default` variant.
```

```alert
---
variant:           primary
use_default_icons: false
---
This is an alert with the `primary` variant.
```

```alert
---
variant:           success
use_default_icons: false
---
This is an alert with the `success` variant.
```

```alert
---
variant:           warning
use_default_icons: false
---
This is an alert with the `warning` variant.
```

```alert
---
variant:           danger
use_default_icons: false
---
This is an alert with the `danger` variant.
```
``````

``````memo-example-renderer { title="With Custom Icon and Header" }
This example shows an alert with a custom icon defined by the
[`icon` option](#options-icon). It also includes a header before the body of
the alert, defined with the [`header` option](#options-header).

The first example uses the shorthand syntax with the default icon library and
only specifies the icons name. The second example uses the full shorthand
syntax to specify the icon's name, variant, and library. The last example uses
the option syntax, explicitly setting the name, variant, and library as
key-value pairs. For more information, see the `icon` option's documentation.

<!--- Example Start -->

```alert
---
icon: cone-striped
header: "**Under Construction!**"
---
This section isn't fully finished. If you find any issues, let us know!
```

```alert
---
icon: traffic-cone&solid@boxicons
header: "**Under Construction!**"
---
This section isn't fully finished. If you find any issues, let us know!

This alert uses the full shorthand syntax for the icon.
```

```alert
---
icon:
  name:    traffic-cone
  library: boxicons
  variant: solid
header: "**Under Construction!**"
---
This section isn't fully finished. If you find any issues, let us know!

This alert uses the options syntax for the icon.
```
``````

## Attributes

You can add attributes to your codeblocks by adding a pair of curly braces (`{ ... }`) after the language id for the
codeblock. The attributes declaration must open and close on the same line the codeblock opens on.

For example, this is a valid declaration of a codeblock with attributes:

``````markdown
```language { #element-id .first-class .second-class }
Inner content for the codeblock.
```
``````

While you _can_ pass any of the options for this markup as attributes, we strongly recommend using the
[data options](#data-options) syntax instead. It's more readable, maintainable, and has more flexibility.

### `class` { #attributes-class }

Specify a string for classes to add to the [sref:`class`] attribute of the rendered [sref:`<sl-alert>`] element. By
default, it only has the `platen-alert` class.

If your markup doesn't specify `class` with this attribute, the [data option](#options-class), or the
[preset property](#preset-properties-class), it inherits the value from `platen.markup.alerts.classes` in your site
configuration. For more information, see [Configuration](#configuration).

For more information about styling your alerts, see [Styling](#styling).

{{< memo/renderer/attribute "class" >}}

### `id` { #attributes-id }

Specify a string for the [sref:`id`] attribute of the rendered [sref:`<sl-alert>`] element. By default, it has no `id`.

{{< memo/renderer/attribute "id" >}}

## Data Options

You can specify options for your codeblocks by adding a data block to the beginning of your codeblock before the
[definition](#definition). The data block must start on the line after codeblock opens with three dashes and end after
your options with another three dashes.

For example, this is a codeblock with a valid data block for options:

``````markdown
```language
---
class: first-class second-class
id:    element-id
---
Inner content for the codeblock.
```
``````

### `class` { #options-class }

Specify a string for classes to add to the [sref:`class`] attribute of the rendered [sref:`<sl-alert>`] element. By
default, it only has the `platen-alert` class. For more information about styling your alerts, see
[Styling](#styling).

If your markup doesn't specify `class` with this data option, the [attribute](#attributes-class), or the
[preset property](#preset-properties-class), it inherits the value from `platen.markup.alerts.classes` in your site
configuration. For more information, see [Configuration](#configuration).

{{< memo/renderer/option "class" >}}

### `closable` { #options-closable }

Specify whether the alert should be closable. When this option is set to `true`, the alert is rendered with a clickable
button that closes the alert, hiding it. You can make the alert visible again with scripting or by refreshing the page.

The default value is `false`.

{{< memo/renderer/option "closable" >}}

### `custom` { #options-custom }

Specify whether the alert should be rendered with a [custom template](#custom-templates) instead of the default one.
The default value is `false`.

If you set this value to `true`, Platen renders the alert with the `platen/markup/alerts/templates/custom` template
partial. If you set this value to a string, Platen renders the alert with the `platen/markup/alerts/templates/<value>`
template partial.

If your markup doesn't specify `custom` with this data option or the [preset property](#preset-properties-custom), it
inherits the value from `platen.markup.alerts.custom` in your site configuration. For more information, see
[Configuration](#configuration).

For more information about authoring a custom template, see [Custom Templates](#custom-templates).

{{< memo/renderer/option "custom" >}}

### `duration` { #options-duration }

Specify whether the alert should automatically close after the specified duration elapses. By default, alerts don't
close automatically. If you specify this value as an integer greater than `0`, the alert automatically closes that
many seconds after the page loads. You can specify an optional suffix for the value to indicate the time units:

- `s` for seconds
- `ms` for milliseconds

This option is intended to make composing new components easier, or for adding alerts that only display dynamically,
like when a user clicks a button on the page.

{{< memo/renderer/option "duration" >}}

### `header` { #options-header }

Specify a header for the alert as inline Markdown. When you do, the header is displayed before the rendered content for
the alert. Platen renders the header's inline Markdown and inserts it into an [sref:`<span>`] element that has the
`platen-alert-header` class. For more information about styling the header, see [Styling](#styling).

{{< memo/renderer/option "header" >}}

### `icon` { #options-icon }

Specify an icon to add to the start of the rendered [sref:`<sl-alert>`] in an [sref:`<sl-icon>`] element. You can
specify the icon either as a string using the shorthand syntax or as a map of options for the icon.

If your markup doesn't specify a value for `icon` with this data option or the
[preset property](#preset-properties-icon), it uses the icon defined for the alert's variant in the
`platen.markup.alerts.icons` setting in your site configuration if the value of `use_default_icons` is `true`. For more
information, see the [`use_default_icons`](#options-use_default_icons) option and [Configuration](#configuration).

{{< memo/renderer/option "icon" >}}

#### Shorthand Syntax { #options-icon-shorthand-syntax }

The shorthand syntax for icons in Platen is `<name>[&<variant>][@<library>]`, where:

- `<name>` is mandatory and represents the name of the icon.
- `&<variant>` is optional and represents the variant of the icon. Not all icons and libraries support variants. When
  you specify a variant in this syntax, you must specify it after the icon's name. You must separate the variant from
  the icon name with an ampersand (`&`). When you don't specify a variant, Platen uses the library's default variant.
- `&<library>` is optional and represents the library the icon belongs to. When you specify a library in this syntax,
  you must specify it after the icon's name and variant. You must separate the library from the icon name or variant
  with an at sign (`@`). When you don't specify a library, Platen uses the configured default library.

You can always use [sref:any valid icon] in Shoelace's default icon library.

#### Options Syntax { #options-icon-options-syntax }

The options syntax for icons is:

```yaml
name:    icon_name    # Mandatory
library: icon_library # Optional
variant: icon_variant # Optional
```

You can also pass any valid [sref:global HTML attribute] in the options map for the icon, like `class` or `style`.
Those attributes are passed through to the icon element.

### `id` { #options-id }

Specify a string for the [sref:`id`] attribute of the rendered [sref:`<sl-alert>`] element. By default, it has no `id`.

{{< memo/renderer/option "id" >}}

### `open` { #options-open }

Specify whether the alert should be visible when the page loads. The default value is `true`. Set this option to
`false` to hide the alert when the page loads.

This option is intended to make composing new components easier, or for adding alerts that only display dynamically,
like when a user clicks a button on the page.

{{< memo/renderer/option "open" >}}

### `use_default_icons` { #options-use_default_icons }

Specify whether the alert should use the default icon defined for the alert's [variant](#options-variant) in the site's
`platen.markup.alerts.icons` configuration setting.

If `use_default_icons` isn't specified as an option or [preset property](#preset-properties-use_default_icons), Platen
uses the value of the site's `platen.markup.alerts.use_default_icons` setting, which defaults to `true`.

If the markup specifies the `icon` [option](#options-icon) or [preset property](#preset-properties-icon), that icon is
used instead, even when this option is set to `true`.

For more information about the default icons, see [Configuration](#configuration).

{{< memo/renderer/option "use_default_icons" >}}

### `variant` { #options-variant }

Specify how the alert should be themed when rendered. The default value is inherited from the
`platen.markup.alerts.variant` setting in your site configuration, which defaults to `primary`.

The valid variants are:

- `danger`
- `default`
- `primary`
- `success`
- `warning`

If the `use_default_icons` [option](#options-use_default_icons),
[preset property](#preset-properties-use_default_icons), or configuration setting is set to `true`, the variant also
determines which icon is added to the alert. For more information, see the
[`use_default_icons`](#options-use_default_icons) option.

For more information on variant colors, see [Styling](#styling).

## Definition

Specify the text you want to include in the body of the rendered alert. You can include any valid Markdown, including
other codeblocks. To use nested codeblocks, you must have more backticks (`` ` ``) in the fence for the alert codeblock
than any of the nested codeblocks.

For example, this alert's content is split into [columns](../columns):

`````````markdown
``````alert
---
variant: primary
header: Alert with Nested Codeblocks
---

````columns { #alert-columns }
```column
This is the first column in the rendered alert.
```

```column
This is the second column in the rendered alert.
```
````
``````
`````````

It renders to:

``````alert
---
variant: primary
header: Alert with Nested Codeblocks
---

````columns { #alert-columns }
```column
This is the first column in the rendered alert.
```

```column
This is the second column in the rendered alert.
```
````
``````

## Presets

You can define any number of preset alerts in your site's data. Any YAML files you add in the `data/platen/alerts`
folder are available for use. You can use folders to group presets together.

The available properties you can specify for a preset are listed below and match the available attributes and 
inputs. When used together with your markup, any value specified as directly in your markup overrides the value
specified in the preset's definition.

### `class` { #preset-properties-class }

Specify a string for classes to add to the [sref:`class`] attribute of the rendered [sref:`<sl-alert>`] element. By
default, it only has the `platen-alert` class. For more information about styling your alerts, see
[Styling](#styling).

If your markup doesn't specify `class` with this preset property, the [attribute](#attributes-class), or the
[data option](#options-class), it inherits the value from `platen.markup.alerts.classes` in your site configuration.
For more information, see [Configuration](#configuration).

### `closable` { #preset-properties-closable }

Specify whether the alert should be closable. When this option is set to `true`, the alert is rendered with a clickable
button that closes the alert, hiding it. You can make the alert visible again with scripting or by refreshing the page.

The default value is `false`.

### `custom` { #preset-properties-custom }

Specify whether the alert should be rendered with a [custom template](#custom-templates) instead of the default one.
The default value is `false`.

If you set this value to `true`, Platen renders the alert with the `platen/markup/alerts/templates/custom` template
partial. If you set this value to a string, Platen renders the alert with the `platen/markup/alerts/templates/<value>`
template partial.

If your markup doesn't specify `custom` with this preset property or the [data option](#options-custom), it inherits
the value from `platen.markup.alerts.custom` in your site configuration. For more information, see
[Configuration](#configuration).

For more information about authoring a custom template, see [Custom Templates](#custom-templates).

### `definition` { #preset-properties-definition }

Specify the text you want to include in the body of the rendered alert. You can include any valid Markdown, including
other codeblocks. To use nested codeblocks, you must have more backticks (`` ` ``) in the fence for the alert codeblock
than any of the nested codeblocks.

``````details
---
summary: Example Preset with Definition
heading_level: 4
---

This preset defines both `variant` and `definition`:

````yaml
# Defined in `data/platen/alerts/docs/examples/definition-preset.yaml
variant: primary
definition: |
  This is an `alert` preset definition.

  It includes any normal Markdown you might want to use.

  ![button:See all Markup](/modules/platen/markup)

  It can even include codeblocks, like this YAML block:

  ```yaml
  variant: primary
  ```
````

Note that the definition includes normal Markdown. Also note the usage of the
`|` character after the `definition` key declaration, and that the lines after
are indented two spaces. That syntax indicates that the block of text should be
treated as a single string, keeping the newlines. When you're defining a
definition in a preset, you should use that syntax.

It's declared in the Markdown as:

````markdown
```alert
---
preset: docs.example.definition-preset
---
```
````

The preset renders to this:

```alert
---
preset: docs.example.definition-preset
---
```

If you specify the alert in the markdown with a definition, the preset's
`definiton` key is overridden:

````markdown
```alert
---
preset: docs.example.definition-preset
---

This Markdown _overrides_ the preset `definition` value.
```
````

As you can see here:

```alert
---
preset: docs.example.definition-preset
---

This Markdown _overrides_ the preset `definition` value.
```
``````

### `duration` { #preset-properties-duration }

Specify whether the alert should automatically close after the specified duration elapses. By default, alerts don't
close automatically. If you specify this value as an integer greater than `0`, the alert automatically closes that
many seconds after the page loads. You can specify an optional suffix for the value to indicate the time units:

- `s` for seconds
- `ms` for milliseconds

This property is intended to make composing new components easier, or for adding alerts that only display dynamically,
like when a user clicks a button on the page.

### `header` { #preset-properties-header }

Specify a header for the alert as inline Markdown. When you do, the header is displayed before the rendered content for
the alert. Platen renders the header's inline Markdown and inserts it into an [sref:`<span>`] element that has the
`platen-alert-header` class. For more information about styling the header, see [Styling](#styling).

### `icon` { #preset-properties-icon }

Specify an icon to add to the start of the rendered [sref:`<sl-alert>`] in an [sref:`<sl-icon>`] element. You can
specify the icon either as a string using the shorthand syntax or as a map of options for the icon.

If your markup doesn't specify a value for `icon` with this preset property or the
[data option](#options-icon), it uses the icon defined for the alert's variant in the
`platen.markup.alerts.icons` setting in your site configuration if the value of `use_default_icons` is `true`. For more
information, see the [`use_default_icons`](#options-use_default_icons) option and [Configuration](#configuration).

#### Shorthand Syntax { #preset-properties-icon-shorthand-syntax }

The shorthand syntax for icons in Platen is `<name>[&<variant>][@<library>]`, where:

- `<name>` is mandatory and represents the name of the icon.
- `&<variant>` is optional and represents the variant of the icon. Not all icons and libraries support variants. When
  you specify a variant in this syntax, you must specify it after the icon's name. You must separate the variant from
  the icon name with an ampersand (`&`). When you don't specify a variant, Platen uses the library's default variant.
- `&<library>` is optional and represents the library the icon belongs to. When you specify a library in this syntax,
  you must specify it after the icon's name and variant. You must separate the library from the icon name or variant
  with an at sign (`@`). When you don't specify a library, Platen uses the configured default library.

You can always use [sref:any valid icon] in Shoelace's default icon library.

#### Options Syntax { #preset-properties-icon-options-syntax }

The options syntax for icons is:

```yaml
name:    icon_name    # Mandatory
library: icon_library # Optional
variant: icon_variant # Optional
```

You can also pass any valid [sref:global HTML attribute] in the options map for the icon, like `class` or `style`.
Those attributes are passed through to the icon element.

### `id` { #preset-properties-id }

Specify a string for the [sref:`id`] attribute of the rendered [sref:`<sl-alert>`] element. By default, it has no `id`.

```alert
---
variant: warning
header: "**Careful!**"
---
When you define an `id` in a preset, you need to make sure you don't use that
preset more than once on a page without overriding the property in the markup.

Otherwise, you'll add two elements with the same ID, which is invalid HTML and
may cause accessibility issues too.
```

### `open` { #preset-properties-open }

Specify whether the alert should be visible when the page loads. The default value is `true`. Set this property to
`false` to hide the alert when the page loads.

This property is intended to make composing new components easier, or for adding alerts that only display dynamically,
like when a user clicks a button on the page.

### `use_default_icons` { #preset-properties-use_default_icons }

Specify whether the alert should use the default icon defined for the alert's [variant](#preset-properties-variant) in
the site's `platen.markup.alerts.icons` configuration setting.

If `use_default_icons` isn't specified as an [option](#options-use_default_icons) or preset property, Platen uses the
value of the site's `platen.markup.alerts.use_default_icons` setting, which defaults to `true`.

If the markup specifies the `icon` [option](#options-icon) or [preset property](#preset-properties-icon), that icon is
used instead, even when this option is set to `true`.

For more information about the default icons, see [Configuration](#configuration).

### `variant` { #preset-properties-variant }

Specify how the alert should be themed when rendered. The default value is inherited from the
`platen.markup.alerts.variant` setting in your site configuration, which defaults to `primary`.

The valid variants are:

- `danger`
- `default`
- `primary`
- `success`
- `warning`

If the `use_default_icons` [option](#options-use_default_icons),
[preset property](#preset-properties-use_default_icons), or configuration setting is set to `true`, the variant also
determines which icon is added to the alert. For more information, see the
[`use_default_icons`](#preset-properties-use_default_icons) preset property.

For more information on variant colors, see [Styling](#styling).

## Custom Templates

If you want to use your own custom rendering for a tabs group without having to handle the markup parsing, attributes,
and options yourself, you can use the `custom` [option](#options-custom) or [sref:configuration setting][c01] to use
your own templates for rendering the details block.

Platen provides a stubbed custom template by default that includes the available parameters you can use for rendering.
The stubbed template raises an error and returns an empty string.

``````details
---
summary: Stubbed Custom Template
heading_level: 3
open: false
---

```go-html-template
{{/*
    This custom template is a stub. It's here for your convenience only. If
    you want to define your own template, copy this one to start from. The
    inputs for your template are limited to the ones defined here, but your
    template can do whatever you need it to.
*/}}
{{- $Params  := . -}}
{{/*
    These values are passed to the custom template by Platen when canonicalizing
    the markup. They include:

    Attributes
        The list of attributes that Platen would've passed to the sl-alert
        element. You can parse this or reuse it.
    Content
        The pre-rendered content from the markup's definition.
    Classes
        The canonicalized list of classes for the alert. It includes the
        default class "platen-alert" as well as any classes specified in the
        markup. It's passed here as a space-separated list.
    Page
        The hugo Page variable for the Markdown page the alert markup was found
        in. You can use this to render content.
    Position
        The path to the file the alert markup was found in, as well as the line
        and column number where the codeblock started. Useful for error and
        warning messages.
    Config
        The configuration settings for platen.markup.tabs, merging them from
        both the Hugo configuration file(s) and the _params data folder.
    Options
        The canonicalized options for the markup. Platen has already merged
        the settings from the markup's attributes and YAML options and the
        preset, if specified. If the same options were set in multiple places,
        the preset values are overridden by attributes and attributes by the
        yaml options.

    Always pass the values meant to be insertable directly in the HTML through
    safeHTML, safeHTMLAttr (for attributes), safeCSS, safeJS, or safeURL so
    your values aren't munged unexpectedly.
*/}}
{{- $Attributes := $Params.Attributes | safeHTMLAttr -}}
{{- $Content    := $Params.Content    | safeHTML     -}}
{{- $Classes    := $Params.Classes    | safeHTMLAttr -}}
{{- $Page       := $Params.Page                      -}}
{{- $Position   := $Params.Position                  -}}
{{- $Config     := $Params.Config                    -}}
{{- $Options    := $Params.Options                   -}}

{{/*
    The default custom template raises an error because it's not
    actually implemented. This stub is for your convenience.
*/}}
{{- errorf "Used custom alert template at %s, but it's not implemented." $Position -}}

{{/*
    You don't need to do a return statement, you can just use
    a custom HTML template if you want. This return is included
    so Platen doesn't break if the custom template isn't defined.
*/}}
{{- return "" -}}
```
``````

### Custom Template Variables

Each of the variables contains useful values when defining your own template.

`$Attributes`
: The list of attributes that Platen would've passed to the [sref:`<sl-alert>`] element. You can parse this or reuse
  it.

`$Content`
: The pre-rendered content from the markup's definition.

`$Classes`
: The canonicalized list of classes for the alert. It includes the default class `platen-alert` as well as any classes
  specified in the markup. It's passed here as a space-separated list.

`$Page`
: The [Hugo Page object][h01] for the content page the markup was used on.

`$Position`
: The [Position][h02] information for where the alert codeblock was used. This is especially useful for writing error
  and warning messages, as it includes the name of the Markdown file and the line number and column where the markup
  was used.

`$Config`
: The merged values for [sref:`platen.markup.alerts`][c99] from the site configuration and Platen's handler for
  defining the configuration in the `data/_params` folder for your site.

`$Options`
: The canonicalized options for the markup. Platen has already merged the settings from the markup's
  [attributes](#attributes), [data options](#data-options), and the [preset](#presets), if specified. If the same
  options were set in multiple places, the preset values are overridden by attributes and attributes by the YAML
  options.

### Defining a Custom Template

You can copy the stubbed implementation into the `layouts/partials/platen/markup/alerts/templates` folder in your own
site. Then you can edit the template to render the details like [any other template in Hugo][h03].

You don't need to use a `return` statement. You can just emit the HTML as normal and Platen will handle the rest.

## Configuration

Several of the options for this markup can be configured in your site configuration or Platen's parameter data. The most
convenient option is to edit the `data/_params/platen/markup.yaml` file. Except for the `warn_on_legacy` setting, which
is site-wide, every configuration setting can by overridden by the attributes or options in your markup.

The default values for this markup's rendering options are defined below:

```yaml
alerts:
  custom: false
  preset: null
  classes: []
  variant: primary
  icons:
    danger:  exclamation-octagon
    default: gear
    primary: info-circle
    success: check2-circle
    warning: exclamation-triangle
  use_default_icons: true
```

[sref:`custom`][c01]
: Defines whether Platen should use a custom template for rendering alerts instead of the default template. For more
  information, see [Custom Templates](#custom-templates).

[sref:`preset`][c02]
: Defines which [preset](#presets) Platen should apply to alerts by default. For more information, see
  [Presets](#presets).

[sref:`classes`][c03]
: Defines a list of classes to add to alerts by default.

[sref:`variant`][c04]
: Defines which [variant](#options-variant) alerts should be rendered as by default. This sets the color of the alert
  and, if [`use_default_icons`](#options-use_default_icons) is `true`, which icon the alert should have.

[sref:`icons`][c05]
: Defines the default icons for each variant that are added to alerts when
  [`use_default_icons`](#options-use_default_icons) is set to `true`.

[sref:`use_default_icons`][c06]
: Defines whether alerts should use the configured icons for their variant by default.

You can find the full set of options for this markup in the [sref:configuration reference][c99].

## Styling

This markup uses the SCSS defined in the `styles/markup/_tabs.scss` file in your [assets folder][h04], which
defaults to `assets` in your project root.

``````details
---
summary: Alerts SCSS
heading_level: 3
---

```scss
.markdown sl-alert.platen-alert {
  // Ensure adjacent alerts have space between them.
  & + sl-alert.platen-alert {
    margin-top: $padding-large;
  }
}
```
``````

The SCSS for tabs only applies to [sref:`<sl-alert>`] elements in a container that has the `markdown` class, and
only when the element itself has the `platen-alert` class. This keeps the style from being unintentionally applied
anywhere else.

The style:

- Adds a small margin above alerts that are immediately below another alert, so there's a visible gap between them.

### Extending the Styling

You can extend this style by adding SCSS into the `styles/_custom.scss` file in your [assets folder][h04] or by copying
the provided style into `styles/markup/_alerts.scss` and editing it.

When you do, make sure your styles use this selector as the base. All of your styles should be contained in this
selector or one of its children.

```scss
.markdown sl-alert.platen-alert {
  // Your styles here
}
```

The rest of this section is a list of selectors you might find useful when styling the rendered alerts.

`&::part(base)`
: This selector targets the base wrapper for the rendered alert.

`&::part(icon)`
: This selector targets the container that wraps the rendered icon.

`> [slot="icon"]`
: This selector targets the [sref:`<sl-icon>`] element that renders the icon itself for the alert.

`&::part(close-button)`
: This selector targets the close button, which is an [sref:`<sl-icon-button>`].

`&::part(close-button__base)`
: This selector targets the close button's exported `base` part, which is the wrapper for the button.

`&::part(message)`
: This selector targets the container that wraps the alert's main content.

`&::part(message) > div.markdown-inner`
: This selector targets the container that wraps the [`header`](#options-header) and Markdown [definition](#definition)
  for the alert. The `markdown-inner` class removes the margin above the rendered header and after the last element in
  the definition.

`&::part(message) > div.markdown-inner > span.platen-alert-header`
: This selector targets the rendered [`header`](#options-header) specifically.

### Overriding the Styling

You can completely override the provided style by defining the `styles/markup/_alerts.scss` file in your
[assets folder][h04].

You can also create a new style module in the `styles/markup` folder and set [sref:`platen.markup.alerts.style`][c98]
in your site configuration to that module's name. If you do, omit the leading `_` and trailing `.scss`. For example,
the name for the style module `assets/styles/markup/_foo.scss` is `foo`.

<!-- Reference Link Definitions -->
[01]: /using
[02]: /using
[sref:global HTML attribute]: mdn.html.global_attribute:
[sref:`id`]:                  mdn.html.global_attribute:id
[sref:`class`]:               mdn.html.global_attribute:class
[sref:`<span>`]:              mdn.html.element:span
[sref:`<sl-alert>`]:          sl.component:tab-panel
[sref:`<sl-icon>`]:           sl.component:icon
[sref:any valid icon]:        sl.compponent:icon?default-icons
[sref:Shoelace]:              sl:
[c01]: platen.site.markup.alerts.custom
[c02]: platen.site.markup.alerts.preset
[c03]: platen.site.markup.alerts.classes
[c04]: platen.site.markup.alerts.variant
[c05]: platen.site.markup.alerts.icons
[c06]: platen.site.markup.alerts.use_default_icons
[c98]: platen.site.markup.alerts.style
[c99]: platen.site.markup.alerts
[h01]: https://gohugo.io/variables/page/
[h02]: https://gohugo.io/templates/render-hooks/#render-hooks-for-code-blocks
[h03]: https://gohugo.io/templates/introduction/
[h04]: https://gohugo.io/getting-started/directory-structure/#directory-structure-explained
