---
title: Hexmaps
weight: 45
summary: >-
  Documentation on the `tabs` language ID for codeblocks, which enables you to
  format content as tabs in a card pane on a page.
Memo:
  Name: tabs
  # front_matter:
  #   configs:
  #     - definition: frontmatter/codeblock-group.json
  #       publish:    /frontmatter/platen/content/snippets/tabs/codeblock-group.json
  #     - definition: frontmatter/codeblock-entry.json
  #       publish:    /frontmatter/platen/content/snippets/tabs/codeblock-entry.json
  #     - merge:
  #         - frontmatter/codeblock-group.json
  #         - frontmatter/codeblock-entry.json
  #       publish: /frontmatter/platen/content/snippets/tabs.json
  #     - merge:
  #         - frontmatter/codeblock-group.json
  #         - frontmatter/codeblock-entry.json
  #       publish: /frontmatter/platen/markup/tabs.json
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

The `hexmapp` codeblock markup makes it possible for you to insert a five-by-five p, where each hex is clickable to
display the current hex content below the map.

## Examples

``````hexmapp
---
id: hexmap
placement: start
---
```hexx
---
name: "first hex"
id: hex1
---
Option to turn tab pressing into a link to another page? Ideally...
```

```hexx
---
name: "second hex"
id: hex2
---
_Preferably_ not too much text because it looks weird when it scrolls. 
```
``````