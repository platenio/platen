---
title: Section
summary: >-
  Documentation on the `section` language ID for codeblocks, which makes it possible for you to add
  a list of links to pages in a content section with their summary to provide context for those
  pages.
Platen:
  TitleAsHeading: true
Memo:
  Name: section
  Kind: Renderer.Codeblock
  Data:
    root:
      Type:     String.URL
      Required: false
    recurse:
      Type:     Boolean
      Required: false
      default:  false
    use_summary:
      Type:     Boolean
      Required: false
      default:  false
  Definition:
    Required: true
    Syntax: Markdown Content summarizing section.
    Type: String.Markdown.Block
    TrimsLeadingWhiteSpace: true
---

The `section` codeblock renderer makes it possible for you to add a list of links to pages in a
content section with their summary to provide context for those pages.

When used, it inserts a [sref:`<div>`][s01] element containing a description list ([`<dl>`][s02])
with each page defined as a term ([sref:`<dt>`][s03]) with the page's link and definition
([sref:`<dd>`][s04]) with the page's summary rendered from Markdown. Optionally, the div can include
leading rendered Markdown, either defined in the codeblock or pulled from the section page itself.

## Syntax

{{< memo/renderer/syntax >}}

## Examples

``````memo-example-renderer { title="Minimal Example" }
Technically, this _isn't_ the most minimal example. That would actually be:

````markdown
```section
```
````

However, this documentation page doesn't have any children, so that won't render
correctly. Instead, these examples all use the [`root`](#option-root) option to
set the section so they'll actually render something.

<!--- Example Start -->
```section
---
root: /modules/platen/renderers
---
```
``````

``````memo-example-renderer { title="Recursive Section" }
This example renders the list of pages for the Toroidal module recursively,
adding a nested description list for each folder.

<!--- Example Start -->
```section
---
root:    /modules/toroidal
recurse: true
---
```
``````

``````memo-example-renderer { title="With Section's Summary as Lead" }
This example renders the list of pages for this section, adding the section's
own summary as leading text before the list of child pages.

<!--- Example Start -->
```section
---
root:        /modules/platen/renderers
use_summary: true
---
```
``````

``````memo-example-renderer { title="With Custom Summary as Lead" }
This example renders the list of pages for this section, adding the Markdown
defined after the options block as leading text before the list of child pages.

<!--- Example Start -->
```section
---
root: /modules/platen/renderers
---

The Markdown render hooks enable you to write more normal Markdown to
render HTML that Markdown doesn't directly support, like columns and
tabs.
```
``````

## Attributes

### `class` { #attribute-class }

Specify a string for the [sref:`class`][s05] attribute of the containing [sref:`<div>`][s01]. By default,
it has no class. For more information about styling the list, see [Styling](#styling).

{{< memo/renderer/attribute "class" >}}

### `id` { #attribute-id }

Specify an [sref:ID][s06] to use for the containing [sref:`<div>`][s01]. With an ID, it's easier to
link to the section list. By default, it has no ID.

{{< memo/renderer/attribute "id" >}}

## YAML Options

### `class` { #option-class }

Specify a string for the [sref:`class`][s05] attribute of the containing `div` element. By default,
it has no class. For more information about styling the list, see [Styling](#styling).

{{< memo/renderer/option "class" >}}

### `id` { #option-id }

Specify an [sref:ID][s06] to use for the containing [sref:`<div>`][s01]. With an ID, it's easier to
link to the section list. By default, it has no ID.

{{< memo/renderer/option "id" >}}

### `root` { #option-root }

Specify a URL to a page for use as the section root. If that page has children, Platen renders a
description list linking to and describing those pages. By default, Platen uses the current page as
the section root.

If this value doesn't have a leading slash (`/`), Platen treats the URL as relative to the current
page. For example, from page `https://platen.io/foo`, Platen would look for a value `bar/baz` as
`https://platen.io/foo/bar/baz` but would look for `/bar/baz` as `https://platen.io/bar/baz`.

{{< memo/renderer/option "root" >}}

### `recurse` { #option-recurse }

Specify whether the list should recurse for child pages, adding nested description lists for any
child pages that have their own children. The default value is `false`.

{{< memo/renderer/option "recurse" >}}

### `use_summary` { #option-use_summary }

Specify whether you want to use the section page's own summary as lead copy for the section's
rendered block. If the definition for the code block includes any text after the options block, this
option is ignored.

{{< memo/renderer/option "use_summary" >}}

## Definition

Specify the text you want to include as lead copy in the div before the description list. You can
include any valid Markdown, including other codeblocks. To use nested codeblocks, you must have more
backticks (`` ` ``) in the fence for the section codeblock than any of the nested codeblocks.

## Styling

By default, the containing div has the `platen-section` class. The only styling applied to the list
is to ensure that nested description lists ([sref:`<dl>` elements][s02]) are indented.

This style is applied from `assets/styles/markdown/_section.scss`.

You can use the following selectors to control how the elements are rendered.

### The Section Container

```scss
div.platen-section {
  // CSS for the whole container
}
```

Use this selector to contain all other selectors to ensure your styles apply to the HTML rendered
from this markup and don't affect anything else.

To target a specific class of your own, add it to this selector. For example, to style sections with
the `deprecated` class:

```scss
div.platen-section.deprecated {
  // All CSS in this block applies only to sections with the
  // 'deprecated' class. You can overwrite or extend the default
  // styling this way.
}
```

### Description List

```scss
div.platen-section {
  > dl {
    // CSS for the top-level list
  }
  dl {
    // CSS for both the top-level and nested lists
  }

  dd dl {
      // CSS for only the nested lists
  }
}
```

Use the `> dl` selector to target the top-level list specifically. Use the `dl` selector to target
all description lists in the section container. Use the `dd dl` selector to target nested
description lists only.

### Terms

```scss
div.platen-section {
  dt {
    // CSS for terms in both the top-level and nested lists
    a {
      // CSS for the links in terms
    }
  }
}
```

Use the `dt` selector to target the terms in the description lists. Use the `a` selector nested
inside the `dt` selector to target the links inside the terms.

### Definitions

```scss
div.platen-section {
  dd {
    // CSS for definitions in both the top-level and nested lists.
  }
}
```

Use the `dd` selector to target the definitions in the description lists.

<!-- Link References -->
[s01]: mdn.html.element:div
[s02]: mdn.html.element:dl
[s03]: mdn.html.element:dt
[s04]: mdn.html.element:dd
[s05]: mdn.html.global_attribute:class
[s06]: mdn.html.global_attribute:id
