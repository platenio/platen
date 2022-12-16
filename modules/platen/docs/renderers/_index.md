---
title: Rendering Hooks
summary: Documentation on the special rendering hooks Platen uses.
weight: 30
Platen:
  Menu:
    CollapseSection: true
---

This section documents the available rendering hooks that Platen uses. These hooks transform your
Markdown without requiring the use of [shortcodes][01]. Platen supports special rendering hooks for
titles, links, images, and codeblocks.

## Codeblocks

A codeblock normally highlights the plain text source code placed inside it.

In Markdown, a codeblock is specified with three or more backticks (`` ``` ``) followed by a
language ID. In addition to providing syntax highlighting for [many code languages][02], Platen
supports specific language IDs to transform your input. Some of these are an alternative to using
shortcodes, others are only implemented this way. Using codeblocks instead of shortcodes might feel
more natural and looks more like normal Markdown.

For example, this codeblock definition and [`katex` shortcode][03] are functionally the same:

Input Markdown:

``````markdown
```katex
\text{The Quadratic Formula (from codeblock):} \newline
\quad \newline
x={\frac {-b\pm {\sqrt {b^{2}-4ac}}}{2a}}
```

{{</* katex display=true */>}}
\text{The Quadratic Formula (from shortcode):} \newline
\quad \newline
x={\frac {-b\pm {\sqrt {b^{2}-4ac}}}
          {2a}}
{{</* /katex */>}}
``````

Rendered Markdown:

```katex
\text{The Quadratic Formula (from codeblock):} \newline
\quad \newline
x={\frac {-b\pm {\sqrt {b^{2}-4ac}}}{2a}}
```

{{< katex display=true >}}
\text{The Quadratic Formula (from shortcode):} \newline
\quad \newline
x={\frac {-b\pm {\sqrt {b^{2}-4ac}}}{2a}}
{{< /katex >}}

For more information about a specific renderer, see its documentation.

{{< section >}}

<!-- Link References -->
[01]: {{% ref "/using/concepts/shortcodes.md" %}}
