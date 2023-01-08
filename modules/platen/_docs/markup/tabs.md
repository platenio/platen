---
title: Tabs
weight: 210
summary: >-
  Documentation on the `tabs` language ID for codeblocks, which enables you to format content as
  tabs in a card pane on a page.
platen:
  title_as_heading: true
Memo:
  Name: tabs
  MungeTitle: false
  Kind: Renderer.Codeblock
  Attributes:
    id:
      Required: true
  Definition:
    Nested:
      Name: tab
      Kind: Renderer.Codeblock
      Attributes:
        name:
          Type: String.Markdown.Inline
          Required: false
      Definition:
        Type: String.Markdown.Block
        Syntax: Markdown to _render_ for the tab
---

The `tabs` codeblock markup makes it possible for you to convert Markdown content into tabs, where
users see different content depending on which tab is active.

When used, it creates a [sref:`<div>`][s01] HTML container. Each tab is added as an
[sref:`<input>`][s02] and [sref:`<label>`][s03] representing the tab control and a child `<div>` for
the tab content. The Markdown content in each tab is rendered as normal.

## Syntax

The `tabs` codeblock supports setting options as either attributes or as YAML in a data block at the
start of the codeblock. If you're using the attribute syntax, the options must be specified on the
same line that the codeblock opens on. If you're using the data syntax, the options must be
specified as valid YAML wrapped with three dashes (`---`) before the rest of the definition.

For more information, see [Using Codeblocks][01] in the [User Guide][02].

{{% memo/renderer/syntax %}}

## Examples

`````````memo-example-renderer { title="Minimal Attribute Example" }
``````tabs { #unique-tab-id }
```tab { #first-tab }
This content only displays when the first tab is active.
```

```tab { name="Second _Tab_" }
This content only displays when the second tab is active.
```
``````
`````````

`````````memo-example-renderer { title="Full Attribute Example" }
``````tabs { #full-positional .example }
```tab { name="Classless Tab" }
This content only displays when the first tab is active.

It has no class of its own, but any styling applied by
the `example` class for the tab group still applies.
```

```tab { #deprecated .deprecated name="Tab with 'deprecated' Class" }
This content only displays when the second tab is active.

It has the `deprecated` class applied to it in addition
to the tab group's `example` class.
```
``````
`````````

`````````memo-example-renderer { title="Minimal YAML Example" }
``````tabs
---
id: minimal-yaml
---

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

`````````memo-example-renderer { title="Full YAML Example" }
``````tabs
---
id: full-named
class: example
---

```tab
---
name: Classless Tab
---

This content only displays when the first tab is active.

It has no class of its own, but any styling applied by
the `example` class for the tab group still applies.
```

```tab
---
id: deprecated-yaml
name: Tab with Class
class: deprecated
---

This content only displays when the second tab is active.

It has the `deprecated` class applied to it in addition
to the tab group's `example` class.
```
``````
`````````

## Attributes

### `id` { #attributes-id }

Specify the unique name for this group of tabs. The created `div` is given the `id` attribute with
the prefix `tabs-`. For example, if this value is `example-1`, the `id` for the containing `div` is
`tabs-example-1`.

{{% memo/renderer/attribute "id" %}}

### `class` { #attributes-class }

Specify any additional classes to insert into the class list for the containing `div` of this group
of tabs.

By default, the containing `div` has the `platen-tabs` class. For more information about how classes
affect the styling of content in this markup, see [Styling](#styling).

{{% memo/renderer/attribute "class" %}}

## YAML Options

### `id` { #options-id }

Specify the unique name for this group of tabs. The created `div` is given the `id` attribute with
the prefix `tabs-`. For example, if this value is `example-1`, the `id` for the containing `div` is
`tabs-example-1`.

{{< memo/renderer/option "id" >}}

### `class` { #options-class }

Specify any additional classes to insert into the class list for the containing `div` of this group
of tabs.

By default, the containing `div` has the `platen-tabs` class. For more information about how classes
affect the styling of content in this markup, see [Styling](#styling).

{{< memo/renderer/option "class" >}}

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

Specify any additional classes to insert into the class list for this tab's `div`, `input`, and
`label` elements.

By default, the `div` has the `platen-tabs-content` and `markdown-inner` classes. The `label` has
the `toggle` class. The `input` has no classes. For more information about how classes affect the
styling of content in this markup, see [Styling](#styling).

{{< memo/renderer/attribute "Nested.class" >}}

##### `id` { #nested-attributes-id }

Specify an optional ID to give this column's div. Individual tabs require an ID. If you specify this
value, it's used for the div's [sref:`id`][s04] exactly as you specify it.

If you don't specify this value, you **must** specify the [`name`] attribute, from which Platen uses
the downcased and urlized form to build an automatic ID for the tab. For example, if `id` isn't
specified and `name` is specified as `My Cool Tab`, the generated id would be
`tabs-<groupID>-my-cool-tab`.

You can use this attribute with the `name` attribute to set an easier-to-link-to ID for the tab.
This is particularly useful if the tab name is long, uses inline HTML, or includes an icon.

{{< memo/renderer/attribute "Nested.id" >}}

##### `name` { #nested-attributes-name }

Specify the name of the tab. This is displayed as the label for the tab in the container.

If this value isn't specified, Platen uses the titleized form of the [`id`](#attributes-nested-id)
as the name. For example, if `name` isn't specified and `id` is specified as `my-cool-tab`, the
generated name would be `My Cool Tab`.

You can use this attribute with the `id` attribute but you don't have to. You **must** specify
either `name`, `id`, or both.

{{< memo/renderer/attribute "Nested.name" >}}

#### Options { #nested-options }

##### `class` { #nested-options-class }

Specify any additional classes to insert into the class list for this tab's `div`, `input`, and
`label` elements.

By default, the `div` has the `platen-tabs-content` and `markdown-inner` classes. The `label` has
the `toggle` class. The `input` has no classes. For more information about how classes affect the
styling of content in this markup, see [Styling](#styling).

{{< memo/renderer/option "Nested.class" >}}

##### `id` { #nested-options-id }

Specify an optional ID to give this column's div. Individual tabs require an ID. If you specify this
value, it's used for the div's [sref:`id`][s04] exactly as you specify it.

If you don't specify this value, you **must** specify the [`name`] option, from which Platen uses
the downcased and urlized form to build an automatic ID for the tab. For example, if `id` isn't
specified and `name` is specified as `My Cool Tab`, the generated id would be
`tabs-<groupID>-my-cool-tab`.

You can use this option with the `name` option to set an easier-to-link-to ID for the tab. This is
particularly useful if the tab name is long, uses inline HTML, or includes an icon.

{{< memo/renderer/option "Nested.id" >}}

##### `name` { #nested-options-name }

Specify the name of the tab. This is displayed as the label for the tab in the container.

If this value isn't specified, Platen uses the titleized form of the [`id`](#options-nested-id) as
the name. For example, if `name` isn't specified and `id` is specified as `my-cool-tab`, the
generated name would be `My Cool Tab`.

You can use this option with the `id` option but you don't have to. You **must** specify either
`name`, `id`, or both.

{{< memo/renderer/option "Nested.name" >}}

##### Definition { #nested-definition }

Inside the `tab` codeblock you can write any valid Markdown you want.

## Styling

The container `div` for the tabs is automatically assigned the `platen-tabs` class. Each tab's
content is placed inside a child `div` with the `platen-tabs-content` and `markdown-inner` classes.
The input for selecting the tab has the `toggle` class. The `label` for selecting the tab has no
classes.

When you use the `class` parameter for the `tabs` block, those classes are appended to the class
list for the container `div` only. When you use the `class` parameter for a `tab` block, those
classes are appended to that tab's `div`, `input`, and `label` elements.

All of the styling for the tabs is defined in the style module at `styles/markdown/_tabs.scss` in
your assets folder. If you create that file, you entirely overwrite the existing style definitions
for this markup.

<!-- Link References -->
[01]: /using
[02]: /using
[s01]: mdn.html.element:div
[s02]: mdn.html.element:input
[s03]: mdn.html.element:label
[s04]: mdn.html.global_attribute:id
