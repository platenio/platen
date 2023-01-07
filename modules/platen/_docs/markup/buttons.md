---
title: Buttons
weight: 20
summary: >-
  Documentation on the `button` image link markup, which renders an image link as a button.
Platen:
  TitleAsHeading: true
Memo:
  Name: button
  MungeTitle: false
  Kind: Renderer.Image
  Aliases:
    - btn
  Attributes:
    id:
      Ignore: true
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

```memo-example-renderer { title="Button with Classes" }
![button:Flagrant Garden](https://flagrant.garden)
{ .example .flagrant }
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

<!-- Link References -->
[s01]: mdn.html.element:a
[s02]: mdn.html.element:a#attr-href
