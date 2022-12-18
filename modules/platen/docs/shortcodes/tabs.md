---
title: tabs
summary: >-
  Documentation on the `tabs` shortcode, which adds tabbed content in a card
  pane to a document.
Platen:
  TitleAsHeading: true
Memo:
  Name: tabs
  Parameters:
    id:
      Named: true
      Position: 0
      Type: String.Markdown.Inline
      Required: true
    class:
      Named: true
      Position: 1
      Type: String.Class
      Required: false
  InnerText:
    Required: true
    Type: String.Markdown.Block
    TrimsLeadingWhiteSpace: true
    Nested:
      Name: tab
      Required: true
      TagType: NoProcess
      Parameters:
        name:
          Named: true
          Position: 0
          Type: String.Markdown.Inline
          Required: true
        class:
          Named: true
          Position: 1
          Type: String.Class
          Required: false
      InnerText:
        Required: true
        Type: String.Markdown.Block
        TrimsLeadingWhiteSpace: true
---

The `tags` shortcode makes it possible for you to add tabbed content to a document, where users see
different content depending on which tab is active.

## Syntax

{{% memo/shortcode/syntax %}}

## Examples

```memo-example-shortcode { title="Minimal Positional Example" }
{{%/* tabs "unique-tab-id" */%}}
  {{</* tab "First Tab" */>}}
    This content only displays when the first tab is active.
  {{</* /tab */>}}
  {{</* tab "Second Tab" */>}}
    This content only displays when the second tab is active.
  {{</* /tab */>}}
{{%/* /tabs */%}}
```

```memo-example-shortcode { title="Full Positional Example" }
{{%/* tabs "full-positional" "example" */%}}
  {{</* tab "Classless Tab" */>}}
    This content only displays when the first tab is active.

    It has no class of its own, but any styling applied by
    the `example` class for the tab group still applies.
  {{</* /tab */>}}
  {{</* tab "Tab with 'deprecated' Class" "deprecated" */>}}
    This content only displays when the second tab is active.

    It has the `deprecated` class applied to it in addition
    to the tab group's `example` class.
  {{</* /tab */>}}
{{%/* /tabs */%}}
```

```memo-example-shortcode { title="Minimal Named Example" }
{{%/* tabs id="minimal-named" */%}}
  {{</* tab name="First Tab" */>}}
    This content only displays when the first tab is active.
  {{</* /tab */>}}
  {{</* tab name="Second Tab" */>}}
    This content only displays when the second tab is active.
  {{</* /tab */>}}
{{%/* /tabs */%}}
```

```memo-example-shortcode { title="Full Named Example" }
{{%/* tabs id="full-named" class="example" */%}}
  {{</* tab name="Classless Tab" */>}}
    This content only displays when the first tab is active.

    It has no class of its own, but any styling applied by
    the `example` class for the tab group still applies.
  {{</* /tab */>}}
  {{</* tab name="Tab with 'deprecated' Class" class="deprecated" */>}}
    This content only displays when the second tab is active.

    It has the `deprecated` class applied to it in addition
    to the tab group's `example` class.
  {{</* /tab */>}}
{{%/* /tabs */%}}
```

## Parameters

### `id`

Specify the unique name for this group of tabs. The created `div` is given the `id` attribute with
the prefix `tabs-`. For example, if this value is `example-1`, the `id` for the containing `div` is
`tabs-example-1`.

{{% memo/shortcode/parameter "id" %}}

### `class`

Specify any additional classes to insert into the class list for the containing `div` of this group
of tabs.

By default, the containing `div` has the `platen-tabs` class. For more information about how classes
affect the styling of content in this shortcode, see [Styling](#styling).

{{% memo/shortcode/parameter "class" %}}

## Inner

{{% memo/shortcode/inner %}}

### Nested Shortcode: `tab`

Each `tab` shortcode you use inside a `tabs` shortcode adds another tab. You can control the name
and styling for each tab independently.

#### Syntax

{{% memo/shortcode/syntax nested=true %}}

#### Parameters

##### `name`

Specify the name of the tab. This is displayed as the label for the tab in the container.

{{% memo/shortcode/parameter "Nested.name" %}}

##### `class`

Specify any additional classes to insert into the class list for this tab's `div`, `input`, and
`label` elements.

By default, the `div` has the `platen-tabs-content` and `markdown-inner` classes. The `label` has
the `toggle` class. The `input` has no classes. For more information about how classes affect the
styling of content in this shortcode, see [Styling](#styling).

{{% memo/shortcode/parameter "Nested.class" %}}

#### Inner

Specify the text you want to include in the body of this tab.

{{% memo/shortcode/inner nested=true %}}

## Styling

The container `div` for the tabs is automatically assigned the `platen-tabs` class. Each tab's
content is placed inside a child `div` with the `platen-tabs-content` and `markdown-inner` classes.
The input for selecting the tab has the `toggle` class. The `label` for selecting the tab has no
classes.

When you use the `class` parameter for the `tabs` shortcode, those classes are appended to the class
list for the container `div` only. When you use the `class` parameter for a `tab` shortcode, those
classes are appended to that tab's `div`, `input`, and `label` elements.

All of the styling for the tabs is defined in the style module at `styles/shortcodes/_tabs.scss` in
your assets folder. If you create that file, you entirely overwrite the existing style definitions
for this shortcode.
