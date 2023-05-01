---
title: Tabs
weight: 210
summary: >-
  Documentation on the `tabs` language ID for codeblocks, which enables you to
  format content as tabs in a card pane on a page.
Memo:
  Name: tabs
  front_matter:
    configs:
      - definition: frontmatter/codeblock-group.json
        publish:    /frontmatter/platen/content/snippets/tabs/codeblock-group.json
      - definition: frontmatter/codeblock-entry.json
        publish:    /frontmatter/platen/content/snippets/tabs/codeblock-entry.json
      - merge:
          - frontmatter/codeblock-group.json
          - frontmatter/codeblock-entry.json
        publish: /frontmatter/platen/content/snippets/tabs.json
      - merge:
          - frontmatter/codeblock-group.json
          - frontmatter/codeblock-entry.json
        publish: /frontmatter/platen/markup/tabs.json
  MungeTitle: false
  Kind: Renderer.Codeblock
  Attributes:
    legacy:
      type: Boolean
      required: false
    preset:
      type: String
      required: false
  Data:
    activation:
      required: false
      enum:
        - auto
        - manual
      default: auto
    custom:
      required: false
      type: Boolean
      default: false
    no_scroll_controls:
      required: false
      type: Boolean
      default: false
    placement:
      required: false
      enum:
        - top
        - bottom
        - start
        - end
      default: top
    standardize_height:
      required: false
      type:     Boolean
      default:  false
    preset:
      type: String
      required: false
  Definition:
    Nested:
      Name: tab
      Kind: Renderer.Codeblock
      Attributes:
        name:
          Type: String.Markdown.Inline
          Required: false
        preset:
          type: String
          required: false
      Data:
        closable:
          type: Boolean
          required: false
          default: false
        disabled:
          type: Boolean
          required: false
          default: false
        preset:
          type: String
          required: false
      Definition:
        Type: String.Markdown.Block
        Syntax: Markdown to _render_ for the tab
---

The `tabs` codeblock markup makes it possible for you to convert Markdown content into tabs, where users see different
content depending on which tab is active.

When used, it inserts an [sref:`<sl-tab-group>`] element from [sref:Shoelace] to the page with named tabs (as
[sref:`<sl-tab>`] elements) and their content (as [sref:`<sl-tab-panel>`] elements) that site visitors can switch
between to render different content as needed.

## Syntax

The `tabs` codeblock supports setting options as either attributes or as YAML in a data block at the start of the
codeblock. If you're using the attribute syntax, the options must be specified on the same line that the codeblock
opens on. If you're using the data syntax, the options must be specified as valid YAML wrapped with three dashes
(`---`) before the rest of the definition.

For more information, see [Using Codeblocks][01] in the [User Guide][02].

{{% memo/renderer/syntax %}}

## Examples

`````````memo-example-renderer { title="Minimal Definition with Attributes" }
This example shows the minimal additional markup needed to render tabs in
Platen with attributes on the codeblocks.

Note that the first tab uses an `id` to set the name. The specified
`#first-tab` is converted into `First Tab`. For the second tab, the `name` is
passed directly.

Only the first tab gets an ID added to the element.

While you can use attributes with your codeblocks when you want to mostly use
the default options, we recommend using the YAML option syntax for a more
readable and editable definition.

<!--- Example Start -->

``````tabs
```tab { #first-tab }
This content only displays when the first tab is active.
```

```tab { name="Second _Tab_" }
This content only displays when the second tab is active.
```
``````
`````````

`````````memo-example-renderer { title="Minimal Definition with YAML Options" }
This example shows the minimal additional markup needed to render tabs in
Platen with YAML options in the codeblocks.

Note that the first tab uses an `id` to set the name. The specified
`#first-tab` is converted into `First Tab`. For the second tab, the `name` is
passed directly.

Only the first tab gets an ID added to the element.

<!--- Example Start -->

``````tabs
```tab
---
name: First Tab
---

This content only displays when the first tab is active.
```

```tab
---
name: Second Tab
---

This content only displays when the second tab is active.
```
``````
`````````

`````````memo-example-renderer { title="Full Definition" }
This example showcases the available options for tabs. It adds an `id` to the
tab group itself and gives it the `example` class.

It uses the `placement` option to put the tabs at the _bottom_ of the content
instead of the top. You could also put the tabs before or after the content
by setting `placement` to `start` or `end` respectively. For more information,
see `placement`.

It sets the `activation` to `manual`, which prevents the tabs from automatically
swapping when you use the arrow keys to change the tab you're focused on. For
more information on how `activation` works, see `activation`.

It sets `no_scroll_controls` to `false`, which is also the default. Because this
tab group has too many tabs to fit in the space, the tabs can be scrolled to
see the full options by clicking the arrows on either end of the tab list or
using the arrow keys on your keyboard. If this option was set to `true`, you
would only be able to use your keyboard to scroll the list. For more
information, see [`no_scroll_controls`](#options-no_scroll_controls).

Finally, it sets `standardize_height` to `true`, which ensures that the height
of the tab panels is made consistent, setting every tab to the same height as
the tallest rendered tab.

<!--- Example Start -->

``````tabs
---
id: full-tab-definition
class: example
placement: bottom
activation: auto
no_scroll_controls: false
standardize_height: true
---

```tab
---
name: Name-Only Tab
---

This tab only has a name. Because it's the first in the group,
it's displayed by default when the page loads.

It has no other options.
```

```tab
---
id: id-only-tab
---

This tab has only an ID. Note that the ID is added to the tab element
and that the name of the tab is automatically generated as
`Id Only Tab` from the defined id `id-only-tab`.
```

```tab
---
id: name-and-id-tab
name: Tab with `name` & `id`
---

This tab defines both `id` and `name`.

Note that the the ID is added to the `sl-tab` element,
but that the `name` and `panel`
attributes on the `sl-tab-panel` and `sl-tab` elements
are the plain-text of the rendered `name` option.

This also shows that you can use inline Markdown for the `name`
to control how it's displayed without breaking things.
```

```tab
---
name: Tab with a Class
class: example
---

This tab is the first in the group and is displayed by default. It has the
`example` class, which makes the content (describe style).
```

```tab
---
name: Closable Tab
closable: true
---

This tab can be closed, removing it from view until you
refresh the page.
```


```tab
---
id: disabled-tab
disabled: true
---

This tab is disabled. It can't be selected,
so the content is visible in the rendered view.
```
``````
`````````

`````````memo-example-renderer { title="Legacy Example" }
This example uses the legacy template for rendering the tabs.

With `legacy` set to true in the attributes or YAML options, Platen renders the
Markdown in a [sref:`<div>`] HTML container. Each tab is added as an
[sref:`<input>`] and [sref:`<label>`] representing the tab control and a child
`<div>` for the tab content. The Markdown content in each tab is rendered as
normal.

This option is included to allow folks to intentionally transition from the
legacy implementation to [sref:Shoelace], which will become the default in the
future. Eventually, the legacy implementation will be removed.

For more information, see [Legacy Template](#legacy-template).

[sref:`<div>`]:          mdn.html.element:div
[sref:`<input>`]:        mdn.html.element:input
[sref:`<label>`]:        mdn.html.element:label
[sref:`id`]:             mdn.html.global_attribute:id
[sref:Shoelace]:         sl:

<!--- Example Start -->

``````tabs { #unique-tab-id legacy=true}
```tab { #first-legacy-tab }
This content only displays when the first tab is active.
```

```tab { name="Second _Tab_" }
This content only displays when the second tab is active.
```
``````

`````````

## Attributes

### `class` { #attributes-class }

Specify any additional classes to insert into the class list for the tabs container element.

By default, the container element has the `platen-tabs` class. For more information about how classes affect the
styling of content in this markup, see [Styling](#styling).

{{% memo/renderer/attribute "class" %}}

### `id` { #attributes-id }

Specify this attribute to add an [sref:`id`] to the tabs' container element.

If you're using the [legacy template](#legacy-template), you _must_ specify a value for `id` either as an attribute or
an [option](#options-id). When you do, you're specifying a unique name for this group of tabs. Specify the unique name
for this group of tabs. If you use the legacy template without this value or with a non-unique value, the tab
navigation will break unpredictably.

{{% memo/renderer/attribute "id" %}}

### `legacy` { #attributes-legacy }

Specify `true` to use the [legacy template](#legacy-template) for the tabs markup, or `false` to use the
[sref:`<sl-tab-group>`] element from [sref:Shoelace]. If this value isn't set, Platen uses the value of the
`platen.markup.tabs.use_legacy` setting defined in your site configuration. For more information, see
[Configuration](#configuration).

When this setting is `true`, the following options are ignored:

- [`activation`](#options-activation), [`no_scroll_controls`](#options-no-scroll-controls), and
  [`placement`](#options-placement) on any container (`tabs`) codeblocks.
- [`closable`](#nested-options-closable) and [`disabled`](#nested-options-disabled) on any `tab` codeblocks.

{{< memo/renderer/attribute "legacy" >}}

### `preset` { #attributes-preset }

Specify the name of the [preset](#presets) to use, if any. If the preset is defined in a subfolder, specify the
dot-path relative to `data/platen/tabs`. For example, the preset defined in `data/platen/tabs/info/installing` would be
specified as `info.installing`.

{{< memo/renderer/attribute "preset" >}}

## YAML Options

### `activation` { #options-activation }

Specify the activation mode to use for the tab group. When the tab group is focused, keyboard users can
press the [kbd:Left]() and [kbd:Right]() keys to select the desired tab.

When the value of this option is `auto`, the selected tab is shown immediately.

To require the user to press [kbd:Space]() or [kbd:Enter]() to show the tab, set this value to `manual`.

If this option isn't set in the markup, Platen uses the value of the `platen.markup.tabs.activation` setting defined in
your site configuration. The site configuration default is `auto`. For more information, see
[Configuration](#configuration).

This option isn't valid with the [legacy template](#legacy-template).

{{< memo/renderer/option "activation" >}}

### `class` { #options-class }

Specify any additional classes to insert into the class list for the tabs container element.

By default, the container element has the `platen-tabs` class. For more information about how classes affect the
styling of content in this markup, see [Styling](#styling).

If this option isn't set in the markup, Platen uses the value of the `platen.markup.tabs.classes` setting defined in
your site configuration. The site configuration default is an empty list. For more information, see [Configuration](#configuration).

{{< memo/renderer/option "class" >}}

### `custom` { #options-custom }

Specify whether this tabs group should use a custom template instead of the default or legacy template. Set this option
to `true` to use the custom templates stubbed in `platen/markup/tabs/templates/custom`. That folder has a template for
the tab group (`group.html`) and one for the individual tabs (`tab.html`). If this value is `false`, Platen uses the
default or (if [`legacy`](#option-legacy) is `true`) [legacy](#legacy-template) template.

If this value is a string, Platen uses the value as the name of the folder in `platen/markup/tabs/templates` to look
for the `group.html` and `tab.html` templates for rendering the markup.

For more information, see [Custom Templates](#custom-templates).

{{< memo/renderer/option "custom" >}}

### `id` { #options-id }

Specify this option to add an [sref:`id`] to the tabs container element.

If you're using the [legacy template](#legacy-template), you _must_ specify a value for `id` either as an
[attribute](#attributes-id) or an option. When you do, you're specifying a unique name for this group of tabs. Specify
the unique name for this group of tabs. If you use the legacy template without this value or with a non-unique value,
the tab navigation will break unpredictably.

{{< memo/renderer/option "id" >}}

### `legacy` { #attributes-legacy }

Specify `true` to use the [legacy template](#legacy-template) for the tabs markup, or `false` to use the
[sref:`<sl-tab-group>`] element from [sref:Shoelace]. If this value isn't set, Platen uses the value of the
`platen.markup.tabs.use_legacy` setting defined in your site configuration. For more information, see
[Configuration](#configuration).

When this setting is `true`, the following options are ignored:

- [`activation`](#options-activation), [`no_scroll_controls`](#options-no-scroll-controls), and
  [`placement`](#options-placement) on any container (`tabs`) codeblocks.
- [`closable`](#nested-options-closable) and [`disabled`](#nested-options-disabled) on any `tab` codeblocks.

{{< memo/renderer/option "legacy" >}}

### `no_scroll_controls` { #options-no_scroll_controls }

Specify whether the scroll arrows should be visible when tabs overflow. Set this value to `true` to disable the
scroll arrows.

If this option isn't set in the markup, Platen uses the value of the `platen.markup.tabs.no_scroll_controls` setting
defined in your site configuration. The site configuration default is `auto`. For more information, see
[Configuration](#configuration).

This option isn't valid with the [legacy template](#legacy-template).

{{< memo/renderer/option "no_scroll_controls" >}}

### `placement` { #options-placement }

Specify where the tabs should be located in the container relative to their content.

If this option isn't set in the markup, Platen uses the value of the `platen.markup.tabs.placement` setting defined in
your site configuration. The site configuration default is `top`. For more information, see
[Configuration](#configuration).

This option isn't valid with the [legacy template](#legacy-template).

You can see the various options below.

``````details
---
summary: "Placement: `top`"
open: false
heading_level: 4
---

In this example, the tabs are in the `top` position, displaying in the order
they were specified in the Markdown.

```tabs
---
preset: example.placement
placement: top
---
```
``````

``````details
---
summary: "Placement: `bottom`"
open: false
heading_level: 4
---

In this example, the tabs are in the `bottom` position, beneath the rendered
content. The order is the same.

```tabs
---
preset: example.placement
placement: bottom
---
```
``````

``````details
---
summary: "Placement: `start`"
open: false
heading_level: 4
---

In this example, the tabs are in the `start` position, before the rendered
content. For languages written left-to-right, this puts them on the left. If
this page was written in a right-to-left language, start would be on the right
of the content.

```tabs
---
preset: example.placement
placement: start
---
```
``````

``````details
---
summary: "Placement: `end`"
open: false
heading_level: 4
---

In this example, the tabs are in the `end` position, after the rendered
content. For languages written left-to-right, this puts them on the right. If
this page was written in a right-to-left language, start would be on the left
of the content.

```tabs
---
preset: example.placement
placement: end
---
```
``````

{{< memo/renderer/option "placement" >}}

### `standardize_height` { #options-standardize_height }

Specify whether the tabs in the group should have their height standardized to the same height as the tallest rendered
tab in the group. This can help reduce how much the page layout updates when a reader switches between tabs.

If this option isn't set in the markup, Platen uses the value of the `platen.markup.tabs.standardize_height` setting
defined in your site configuration. The site configuration default is `false`. For more information, see
[Configuration](#configuration).

This option isn't valid with the [legacy template](#legacy-template). It's ignored when the preset is applied to
the markup for an individual tab.

{{< memo/renderer/option "standardize_height" >}}

### `preset` { #options-preset }

Specify the name of the [preset](#presets) to use, if any. If the preset is defined in a subfolder, specify the
dot-path relative to `data/platen/tabs`. For example, the preset defined in `data/platen/tabs/info/installing` would be
specified as `info.installing`.

{{< memo/renderer/option "preset" >}}

## Definition

Inside a `tabs` codeblock you must use one or more `tab` codeblocks. These determine how the tabs
themselves are rendered, while the attributes for the containing `tabs` codeblock control the
behavior of the tab group overall.

### `tab` Codeblocks

Each `tab` codeblock you use inside a `tabs` codeblock adds another tab. You can control the name
and styling for each tab independently.

#### Syntax { #nested-syntax }

{{< memo/renderer/syntax nested=true >}}

#### Attributes { #nested-attributes }

##### `class` { #nested-attributes-class }

Specify any additional classes to insert into the tab's elements. By default, the elements have no classes.

When using the [legacy template](#legacy-template), the elements have the following default classes:

- The [sref:`<div>`] has the `platen-tabs-content` and `markdown-inner` classes.
- The [sref:`<label>`] has the `toggle` class.
- The [sref:`<input>`] has no classes.

For more information about how classes affect the styling of content in this markup, see [Styling](#styling).

{{< memo/renderer/attribute "Nested.class" >}}

##### `id` { #nested-attributes-id }

Specify this attribute to add an [sref:`id`] to the tab's [sref:`<sl-tab>`] element.

If you're using the [legacy template](#legacy-template), individual tabs require an ID. If you specify this
value, it's used for the [sref:`id`] of the tab's [sref`<input>`] exactly as you specify it.

When you're using the legacy template and don't specify this value, you **must** specify the `name`
[attribute](#nested-attributes-name) or [option](#nested-options-name). When you do, Platen uses the down-cased and
urlized form to build an automatic ID for the tab. For example, if `id` isn't specified and `name` is specified as
`My Cool Tab`, the generated id would be `tabs-<groupID>-my-cool-tab`.

You can use this attribute with the `name` attribute or option to set an easier-to-link-to ID for the tab. This is
particularly useful if the tab name is long, uses inline HTML, or includes an icon.

{{< memo/renderer/attribute "Nested.id" >}}

##### `name` { #nested-attributes-name }

Specify the name of the tab. This is displayed as the label for the tab in the container.

If this value isn't specified, Platen uses the titleized form of the `id` [attribute](#nested-attributes-id) or
[option](#nested-options-id) as the name. For example, if `name` isn't specified and `id` is specified as
`my-cool-tab`, the generated name would be `My Cool Tab`.

You can use this attribute with the `id` attribute but you don't have to. You **must** specify
either `name`, `id`, or both.

{{< memo/renderer/attribute "Nested.name" >}}

##### `preset` { #nested-attributes-preset }

Specify the name of the [preset](#presets) to use, if any. If the preset is defined in a subfolder, specify the
dot-path relative to `data/platen/tabs`. For example, the preset defined in `data/platen/tabs/info/installing` would be
specified as `info.installing`.

{{< memo/renderer/attribute "Nested.preset" >}}

#### Options { #nested-options }

##### `class` { #nested-options-class }

Specify any additional classes to insert into the class list for this tab's `div`, `input`, and
`label` elements.

By default, the `div` has the `platen-tabs-content` and `markdown-inner` classes. The `label` has
the `toggle` class. The `input` has no classes. For more information about how classes affect the
styling of content in this markup, see [Styling](#styling).

{{< memo/renderer/option "Nested.class" >}}

##### `closable` { #nested-options-closable }

Specify whether this tab can be closed, removing it from view until the page is refreshed. Set this option to `true` to
make the tab closable.

This option isn't valid with the [legacy template](#legacy-template).

{{< memo/renderer/option "Nested.closable" >}}

##### `disabled` { #nested-options-disabled }

Specify whether this tab should be disabled, preventing users from selecting it. Set this option to `true` to make the
tab disabled.

This option isn't valid with the [legacy template](#legacy-template).

{{< memo/renderer/option "Nested.disabled" >}}

##### `id` { #nested-options-id }

Specify this option to add an [sref:`id`] to the tab's [sref:`<sl-tab>`] element.

If you're using the [legacy template](#legacy-template), individual tabs require an ID. If you specify this
value, it's used for the [sref:`id`] of the tab's [sref`<input>`] exactly as you specify it.

When you're using the legacy template and don't specify this value, you **must** specify the `name`
[attribute](#nested-attributes-name) or [option](#nested-options-name). When you do, Platen uses the down-cased and
urlized form to build an automatic ID for the tab. For example, if `id` isn't specified and `name` is specified as
`My Cool Tab`, the generated id would be `tabs-<groupID>-my-cool-tab`.

You can use this option with the `name` attribute or option to set an easier-to-link-to ID for the tab. This is
particularly useful if the tab name is long, uses inline HTML, or includes an icon.

{{< memo/renderer/option "Nested.id" >}}

##### `name` { #nested-options-name }

Specify the name of the tab. This is displayed as the label for the tab in the container.

If this value isn't specified, Platen uses the titleized form of the `id` [attribute](#nested-attributes-id) or
[option](#nested-options-id) as the name. For example, if `name` isn't specified and `id` is specified as
`my-cool-tab`, the generated name would be `My Cool Tab`.

You can use this option with the `id` option but you don't have to. You **must** specify either
`name`, `id`, or both.

{{< memo/renderer/option "Nested.name" >}}

##### `preset` { #nested-options-preset }

Specify the name of the [preset](#presets) to use, if any. If the preset is defined in a subfolder, specify the
dot-path relative to `data/platen/tabs`. For example, the preset defined in `data/platen/tabs/info/installing` would be
specified as `info.installing`.

{{< memo/renderer/option "Nested.preset" >}}

##### Definition { #nested-definition }

Inside the `tab` codeblock you can write any valid Markdown you want.

## Presets

You can define any number of preset tab groups and tabs reusably in your site's data. Any YAML files you add in the
`data/platen/tabs` folder are available for use. You can use folders to group presets together.

The available properties you can specify for a preset are listed below and match the available attributes and inputs.
When used together with attributes and inputs, any value specified as an attribute or input overrides the value
specified in the preset's definition.

`````````tabs { #merging-preset-and-attributes-example }
``````tab { name="Preset Definition" }
Here we define a preset for closable tabs in a task list:
`data/platen/tabs/task_list.yaml`:

```yaml
placement:  start
legacy:     false
activation: manual
closable:   true
```
``````

````````tab { name="Markdown Usage" }
Then, in our markdown, we use the tabs markup and reference the preset:

```````markdown
``````tabs { preset="task_list" }
---
activation: auto
---

```tab
---
name:   First Task
preset: task_list
---

Do the first thing.
```

```tab
---
name:   Second Task
preset: task_list
---

Do the next thing.
```

```tab
---
closable: false
name:     Third Task
preset:   task_list
---

Do the last thing.
```
``````
```````

The tab group is processed to the equivalent YAML internally:

```yaml
activation: auto
preset:     task_list
```

The individual tabs are processed to YAML that includes their name and the
preset, except for the last tab, which is processed to:

```yaml
closable: false
name:     Third Task
preset:   task_list
```
````````

````````tab { name="Merged Values" }
Now that we have both the values from the preset and Markdown, Platen combines
them.

They become:

```yaml
# Tab Group
placement:  start
legacy:     false
activation: auto

# First Tab
closable: true
name:     First Task

# Second Tab
closable: true
name:     Second Task

# Third Tab
closable: false
name:     Third Task
```

Because the tab group specifies `activation` as `auto` in its markup, that value
is preferred over the `manual` value from the preset. The tab group ignores the
value for `closable` altogether.

The first and second tabs take their values from the preset without overriding
anything, making them closable.

The third tab overrides `closable` as `false` in the markup.

``````tabs { preset="example.task_list" }
---
activation: auto
---

```tab
---
name:   First Task
preset: example.task_list
---

Do the first thing.
```

```tab
---
name:   Second Task
preset: example.task_list
---

Do the next thing.
```

```tab
---
closable: false
name:     Third Task
preset:   example.task_list
---

Do the last thing.
```
``````
````````
`````````

### `activation` { #preset-properties-activation }

Specify the activation mode to use for the tab group. When the tab group is focused, keyboard users can press the
[kbd:Left]() and [kbd:Right]() keys to select the desired tab.

When the value of this property is `auto`, the selected tab is shown immediately.

To require the user to press [kbd:Space]() or [kbd:Enter]() to show the tab, set this property to `manual`.

This property isn't valid with the [legacy template](#legacy-template). This property is ignored when a preset is
applied to tab markup. It's effective when applied to a tab group.

### `class` { #preset-properties-class }

Specify any additional classes to insert into the class list for the markup.

You can specify this value either as a string (if you only need to add one class) or as a list of strings.

```tabs
---
preset: docs.presets.property_class_strings
---
```

### `closable` { #preset-properties-closable }

Specify whether this tab can be closed, removing it from view until the page is refreshed. Set this option to `true` to
make the tab closable.

This option isn't valid with the [legacy template](#legacy-template).  It's ignored when the preset is applied to
the markup for a tab group.

### `custom` { #preset-properties-custom }

Specify whether the markup should use a custom template instead of the default or legacy template. Set this option
to `true` to use the custom templates stubbed in `platen/markup/tabs/templates/custom`. That folder has a template for
the tab group (`group.html`) and one for the individual tabs (`tab.html`). If this value is `false`, Platen uses the
default or (if [`legacy`](#option-legacy) is `true`) [legacy](#legacy-template) template.

If this value is a string, Platen uses the value as the name of the folder in `platen/markup/tabs/templates` to look
for the `group.html` and `tab.html` templates for rendering the markup.

For more information, see [Custom Templates](#custom-templates).

### `definition` { #preset-properties-definition }

You can use this property to include the inner content of the codeblock for a tab group or tab. If you specify any
content in the actual markup, it overriddes the value from the preset.

Be careful when using this option to predefine tabs. If you apply a preset with defined individual tabs to a tab
codeblock instead of a tab group, Platen will raise an error.

``````details
---
summary: Example Preset with Definition
heading_level: 4
---

This preset defines both `placement` and `definition`:

````yaml
placement: start
definition: |
  ```tab
  ---
  name: Normal
  ---
  This is a normal tab.
  ```
  ```tab
  ---
  name: Closable
  closable: true
  ---
  This is a normal tab.
  ```
  ```tab
  ---
  name: Disabled
  disabled: true
  ---
  This is a normal tab.
  ```
````

Note that the definition includes three tabs as if writing normal Markdown. Also
note the usage of the `|` character after the `definition` key declaration, and
that the lines after are indented two spaces. That syntax indicates that the
block of text should be treated as a single string, keeping the newlines. When
you're defining a definition in a preset, you should use that syntax.

The preset renders to this:

```tabs
---
preset: example.definition-preset
---
```
``````

### `disabled` { #preset-properties-disabled }

Specify whether this tab should be disabled, preventing users from selecting it. Set this option to `true` to make the
tab disabled.

This option isn't valid with the [legacy template](#legacy-template).  It's ignored when the preset is applied to
the markup for a tab group.

### `id` { #preset-properties-id }

Specify this property to add an [sref:`id`] to the markup. Be careful not to
use this value for more than one markup on a page, as sharing the same ID with
multiple elements is invalid. You'll need to override it by setting the ID
attribute or option in the markup.

### `legacy` { #preset-properties-legacy }

Specify `true` to use the [legacy template](#legacy-template) for the tabs markup, or `false` to use the
[sref:`<sl-tab-group>`] element from [sref:Shoelace]. This preset property is ignored when applied to the markup for an
individual tab.

If this value isn't set, Platen uses the value of the `platen.markup.tabs.use_legacy` setting defined in your site
configuration. For more information, see [Configuration](#configuration).

When this property is `true`, the following options are ignored:

- [`activation`](#options-activation), [`no_scroll_controls`](#options-no-scroll-controls), and
  [`placement`](#options-placement) on any container (`tabs`) codeblocks.
- [`closable`](#nested-options-closable) and [`disabled`](#nested-options-disabled) on any `tab` codeblocks.

### `name` { #preset-properties-name }

Specify the name of the tab. This is displayed as the label for the tab in the container. This property is ignored if
the preset is applied to the markup for a tab group.

If this value isn't specified, Platen uses the titleized form of the `id` [attribute](#nested-attributes-id) or
[option](#nested-options-id) as the name. For example, if `name` isn't specified and `id` is specified as
`my-cool-tab`, the generated name would be `My Cool Tab`.

You can use this property with the `id` property but you don't have to. You **must** specify either `name`, `id`, or
both for an individual tab.

### `no_scroll_controls` { #preset-properties-no_scroll_controls }

Specify whether the scroll arrows should be visible when tabs overflow. Set this value to `true` to disable the
scroll arrows.

If this option isn't set in the markup, Platen uses the value of the `platen.markup.tabs.no_scroll_controls` setting
defined in your site configuration. The site configuration default is `auto`. For more information, see
[Configuration](#configuration).

This option isn't valid with the [legacy template](#legacy-template). It's ignored when the preset is applied to
the markup for an individual tab.

### `placement` { #preset-properties-placement }

Specify where the tabs should be located in the container relative to their content.

If this option isn't set in the markup, Platen uses the value of the `platen.markup.tabs.placement` setting defined in
your site configuration. The site configuration default is `top`. For more information, see
[Configuration](#configuration).

This option isn't valid with the [legacy template](#legacy-template). It's ignored when the preset is applied to
the markup for an individual tab.

### `standardize_height` { #preset-properties-standardize_height }

Specify whether the tabs in the group should have their height standardized to the same height as the tallest rendered
tab in the group. This can help reduce how much the page layout updates when a reader switches between tabs.

If this option isn't set in the markup, Platen uses the value of the `platen.markup.tabs.standardize_height` setting
defined in your site configuration. The site configuration default is `false`. For more information, see
[Configuration](#configuration).

This option isn't valid with the [legacy template](#legacy-template). It's ignored when the preset is applied to
the markup for an individual tab.

{{< memo/renderer/option "standardize_height" >}}

## Custom Templates

If you want to use your own custom rendering for a tabs group without having to handle the markup parsing, attributes,
and options yourself, you can use the `custom` [option](#option-custom) or [sref:configuration setting][c01] to use
your own templates for rendering the details block.

Platen provides a pair of stubbed custom templates by default that include the available parameters you can use for
rendering. The stubbed templates raise an error and return an empty string.

## Legacy Template

The legacy template uses standard HTML elements instead of the more customizable [sref:Shoelace] elements. It doesn't
support as many options and will eventually be removed.

<sl-alert variant="warning" open>
  <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
  We strongly suggest you update your themes to use the new template.
</sl-alert>

When used, it creates a [sref:`<div>`] HTML container. Each tab is added as an [sref:`<input>`] and [sref:`<label>`]
representing the tab control and a child `<div>` for the tab content. The Markdown content in each tab is rendered as
normal.

Currently, Platen uses the legacy template by default and warns on its use. You can override these behaviors in the
configuration. To use the new template by default, set [sref:`platen.markup.tabs.use_legacy`][c08] to `false`. To
continue using the legacy tabs element without warnings, set [sref:`platen.markup.tabs.warn_on_legacy`][c09] to
`false`.

## Configuration

Several of the options for this markup can be configured in your site configuration or Platen's parameter data. The most
convenient option is to edit the `data/_params/platen/markup.yaml` file. Except for the `warn_on_legacy` setting, which
is site-wide, every configuration setting can by overridden by the attributes or options in your markup.

The default values for this markup's rendering options are defined below:

```yaml
tabs:
  custom: false
  classes: []
  activation: auto
  no_scroll_controls: false
  placement: top
  standardize_height: false
  preset: null
  use_legacy: true
  warn_on_legacy: true
```

[sref:`custom`][c01]
: If you set `custom` to `true`, Platen uses a custom template for rendering the details. By default, it uses the
  `platen/markup/tabs/templates/custom.html` template. If you set this value to a string, Platen uses a layout template
  by that name in the `platen/markup/tabs` folder. For more information, see [Custom Templates](#custom-templates).

[sref:`classes`][c02]
: If you set `classes` to a list of strings, Platen adds them to the rendered tabs group (_not_ the individual tab
  elements). If you specify any classes for a `tabs` codeblock as an [attribute](#attributes-class) or
  [option](#options-class), those are used instead.

[sref:`activation`][c03]
: Choose whether the tabs should require a manual keypress when navigating the tabs with a keyboard or if they should
  automatically display when cycling through them. Set this value to `manual` to require a keypress to activate. The
  default value is `auto`. If you specify the `activation` [option](#options-activation) in your markup, that value is
  used instead.

[sref:`no_scroll_controls`][c04]
: Choose whether the scroll arrows are displayed by default when tabs in a group overflow. Set this value to `false` to
  remove the arrows. The default value is `true`. If you specify the `no_scroll_controls`
  [option](#options-no_scroll_controls) in your markup, that value is used instead.

[sref:`placement`][c05]
: Choose where the tabs should be rendered relative to the content. The default value is `top`. If you specify the
  [`placement` option](#options-placement) in your markup, that value is used instead.

[sref:`preset`][c06]
: Choose the default preset to apply to tabs markup. There is no default preset. For more information, see
  [Presets](#presets).

[sref:`standardize_height`][c07]
: Choose whether every tab group is rendered with the heights of its tabs standardized to the same as the tallest tab
  in the group. Set this value to `true` to standardize the height. If you specify the `standardize_height`
  [option](#options-standardize_height) in your markup, that value is used instead.

[sref:`use_legacy`][c08]
: If you want your tabs rendered with the new default template to use the full set of options, set this value to
  `false`. It defaults to `true` now, but will default to `false` in the future. Eventually, the legacy template will
  be removed entirely.

[sref:`warn_on_legacy`][c09]
: If you want to silence the warnings Platen emits when you use the legacy template, set this value to `false`.

You can find the full set of options for this markup in the [sref:configuration reference][c99].

## Styling

This markup uses the SCSS defined in the `styles/markup/_tabs.scss` file in your [assets folder][h04], which
defaults to `assets` in your project root.

This section discusses styling the non-legacy template. Instead of applying custom styles to the
[legacy template](#legacy-template), we strongly recommend you migrate to the non-legacy template. In the near future,
it will become the default. Eventually, the legacy template will be removed entirely.

``````details
---
summary: Tabs SCSS
heading_level: 3
---

```scss
.markdown sl-tab-group.platen-tabs {
  &::part(body) {
    padding: 1rem;
  }
  sl-tab-panel {
    > :first-child {
      margin-top: 0;
    }
    > :last-child {
      margin-bottom: 0;
    }
  }
}
```
``````

The SCSS for tabs only applies to [sref:`<sl-tab-group>`] elements in a container that has the `markdown` class, and
only when the element itself has the `platen-tabs` class. This keeps the style from being unintentionally applied
anywhere else.

The style:

- Adds a small amount of padding to the contents of the tabs to align with the design of the rest of Platen's markup.
- Trims the margin above the first element in the rendered content and after the last element to avoid overly large
  spaces in the page.

### Extending the Style

You can extend this style by adding SCSS into the `styles/_custom.scss` file in your [assets folder][h04] or by copying
the provided style into `styles/markup/_tabs.scss` and editing it.

When you do, make sure your styles use this selector as the base. Your styles should be contained in this selector or
one of its children.

```scss
.markdown sl-tab-group.platen-tabs {
  // Your styles here
}
```

The rest of this section is a list of selectors you might find useful when styling the rendered tabs.

``````tabs
```tab { name="Tab Group" }
`[slot="nav"]`
: This selector targets the [sref:`<sl-tab>`] elements that make up the
  navigation for the rendered tabs.

`&::part(base)`
: This selector targets the tab group's base wrapper.

`&::part(nav)`
: This selector targets the tab group's navigation container where tabs are
  slotted in.

`&::part(tabs)`
: This selector targets the container that wraps the tabs.

`&::part(active-tab-indicator)`
: This selector targets the line that highlights the currently selected tab.

`&::part(body)`
: This selector targets the tab group's body where tab panels are slotted in.

`&::part(scroll-button)`
: This selector targets the previous/next scroll buttons that show when tabs are
  scrollable, an [sref:`<sl-icon-button>`].

`&::part(scroll-button--start)`
: This selector targets the starting scroll button.

`&::part(scroll-button--end)`
: This selector targets the ending scroll button.

`&::part(scroll-button__base)`
: This selector targets the scroll button's exported base part.

[sref:`<sl-icon-button>`]: sl.component:icon-button
[sref:`<sl-tab>`]: sl.component:tab
```

````tab {name="Tab Navigation"}

To target the navigation elements, use the selector `sl-tab` inside of the
tab-group selector, like this:

```scss
.markdown sl-tab-group.platen-tabs {
  sl-tab {
    // Your styles for the tabs themselves here
  }
}
```

`&::part(base)`
: This selector targets the tab's base wrapper.

`&::part(close-button)`
: This selector targets the close button for closable tabs.

`&::part(close-button__base)`
: This selector targets the close button's base container.
````

````tab {name="Tab Content"}

To target the displayed contents for a tab, use the selector `sl-tab-panel`
inside of the tab-group selector, like this:

```scss
.markdown sl-tab-group.platen-tabs {
  sl-tab-panel {
    // Your styles for the tabs themselves here
  }
}
```
````

`&::part(base)`
: This selector target's the tab panel's base wrapper.
``````

### Overriding the Style

You can completely override the provided style by defining the `styles/markup/_tabs.scss` file in your
[assets folder][h04].

You can also create a new style module in the `styles/markup` folder and set [sref:`platen.markup.tabs.style`][c10]
in your site configuration to that module's name. If you do, omit the leading `_` and trailing `.scss`. For example,
the name for the style module `assets/styles/markup/_foo.scss` is `foo`.

<!-- Link References -->
[01]: /using
[02]: /using
[sref:`<div>`]:            mdn.html.element:div
[sref:`<input>`]:          mdn.html.element:input
[sref:`<label>`]:          mdn.html.element:label
[sref:`id`]:               mdn.html.global_attribute:id
[sref:`<sl-icon-button>`]: sl.component:icon-button
[sref:`<sl-tab-group>`]:   sl.component:tab-group
[sref:`<sl-tab>`]:         sl.component:tab
[sref:`<sl-tab-panel>`]:   sl.component:tab-panel
[sref:Shoelace]:           sl:
[c01]: platen.site.markup.tabs.custom
[c02]: platen.site.markup.tabs.classes
[c03]: platen.site.markup.tabs.activation
[c04]: platen.site.markup.tabs.no_scroll_controls
[c05]: platen.site.markup.tabs.placement
[c06]: platen.site.markup.tabs.preset
[c07]: platen.site.markup.tabs.standardize_height
[c08]: platen.site.markup.tabs.use_legacy
[c09]: platen.site.markup.tabs.warn_on_legacy
[c10]: platen.site.markup.tabs.style
[c99]: platen.site.markup.tabs
[h01]: https://gohugo.io/variables/page/
[h02]: https://gohugo.io/templates/render-hooks/#render-hooks-for-code-blocks
[h03]: https://gohugo.io/templates/introduction/
[h04]: https://gohugo.io/getting-started/directory-structure/#directory-structure-explained
