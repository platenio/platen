---
title: Art
weight: 10
summary: >-
  Documentation on adding artwork to your content with an image link. 
Platen:
  TitleAsHeading: true
Memo:
  Name: art
  MungeTitle: false
  Kind: Renderer.Image
  Aliases: []
  Attributes:
    content_warning:
      Title: content_warning
      Type: String.Markdown.Inline
      Required: false
    caption:
      Type: String.Markdown.Inline
      Required: false
  SupportsInline: false
  alt_text:
    Required: true
  source:
    Required: true
  title:
    Alias: caption
    Required: false
---

Platen uses special notation for inserting artwork into your site with an image link.

When used, it inserts an [`figure`][01] HTML element with the inner text of the
shortcode (if any) as the caption.

## Syntax

{{< memo/renderer/syntax >}}

## Examples

```memo-example-renderer { title="Minimal Example" }
![art:Platen Logo](/images/logo.svg)
```

```memo-example-renderer { title="Example with Caption" }
![art:Platen Logo](/images/logo.svg "Example Caption")
```

```memo-example-renderer { title="Floating Half-Width Example" }
![art:Platen Logo](/images/logo.svg)
{ .half .float-left }

In this example, the art takes up half the available width and floats to
the left of this content.

This combination lets you include art alongside your content without breaking
the flow.
```

```memo-example-renderer { title="Example with ID" }
![art:Platen Logo](/images/logo.svg)
{ #id-example }
```

```memo-example-renderer { title="Example with Content Warning" }
![art:Platen Logo](/images/logo.svg "The caption gets blurred too.")
{ content_warning = "bright colors" }
```

```memo-example-renderer { title="Example with Link Reference" }
![art:Platen Logo][ex-ref]

[ex-ref]: /images/logo.svg "You can fit a longer caption or reuse a definition."
```

## Inputs

This section describes how the normal markdown input for images works with the art render hook.

Images use this syntax for their inputs:

```markdown
![altText](source 'title')
```

### `alt_text`

Specify that [alt text][02] for the artwork. The alt text is used to contextualize the art for
readers using assistive technologies like screen readers.

This value must start with the prefix `art:`. The text after the prefix is used for the alt text.
For example, with `![art:Platen Logo](/images/logo.svg)`, the alt text would be `Platen Logo`.

Don't use any markup for this value. The text is added to an HTML attribute, not rendered from
Markdown.

{{< memo/renderer/input "alt_text" >}}

### `source`

Specify the source for the artwork. This value should be a URL or URL fragment pointing to where the
Hugo can find the image. If you prefix this value with a leading forward slash (`/`), like
`/images/bear.png`, Platen looks for the image in your `static` folder.

If you specify this value with a leading `http://` or `https://`, Platen retrieves the image at
build time and bundles it into your site. This enables you to use images stored elsewhere and have
them available on your site as if they were local.

If you specify this value without a leading forward slash, `http://`, or `https://`, Platen looks
for the image first in the assets bundle for your page, then the assets folder, and finally your
content folder.

If Platen can't find your image from the specified source, it raises an error.

{{< memo/renderer/input "source" >}}

### `title` (as `caption`)

If you specify a title in your Markdown syntax for an art image link, Platen uses the title as the
figure caption.

{{< memo/renderer/input "title" >}}

## Attributes

### `class`

Specify any additional [classes][03] to add to the `figure` containing the artwork. By default, the
figure has the `platen-art` class. If you specify a value for `content_warning`, the figure also has
the `platen-content-warning` class.

You can use these additional classes to further style your artwork on a page. In addition to any
classes you define yourself, the following classes are available:

- `half` - The figure's width is limited to 50% of its container instead of 100%.
- `third` - The figure's width is limited to 33% of its container instead of 100%.
- `quarter` - The figure's width is limited to 25% of its container instead of 100%.

For more information about styling your artwork, see [Styling](#styling).

{{< memo/renderer/attribute "class" >}}

### `id`

If you specify a value for this attribute, it's used as the `id` of the figure, making it easier to
link to the figure directly.

<!-- markdownlint-disable MD051-->
For instance, an example on this page used the `id` attribute to set its ID to `id-example`, which
[this link points to](#id-example). Clicking that link will take you directly to the example image.
<!-- markdownlint-enable MD051-->

{{< memo/renderer/attribute "id" >}}

### `content_warning`

Specify a content warning for this artwork, if needed. If you specify any value for this attribute,
Platen loads the image blurred out with this value over it as a content warning.

Readers can click on the image or use their keyboard to select and activate the image to toggle the
artwork's visibility if they're okay with the content. When they do, the image is unblurred and the
content warning is hidding. Clicking on or activating the image again returns the blur and content warning.

{{< memo/renderer/attribute "content_warning" >}}

## Styling

By default, the art is added inside a [`<figure>`] element with the art itself in an [`<img>`]
element. The figure takes up the full width of its container and the image's height is dynamically
chosen to keep the image's original aspect ratio while filling that space.

<!-- markdownlint-disable MD051-->
The built-in helper classes, `half`, `third`, and `quarter` limit the width of the figure to 50%,
33%, and 25% of the available space respectively. When used in combination with the `float-left` or
`float-right` [utility classes][04], this enables you to use smaller images that your text flows
around. For an example of this, see [Floating Half-Width Example](#floating-half-width-example)
above.
<!-- markdownlint-enable MD051-->

You can inspect the current definition of the styles applied to artwork by inspecting the SCSS.

<!-- Todo: Add code handler for inserting assets for inspection -->

### Content Warning Styling

When you specify a content warning for the artwork, Platen:

- adds the `platen-content-warning` class to the figure
- inserts a checkbox [`<input>`][05] element and [`<label>`][06] for that input
- applies a 30 pixel [blur filter][07] to the image
- sets the visibility of the caption to [`hidden`][08]
- layers the input and label over the image so they can be selected and activated to toggle the blur
- stretches the label to fill the entire figure and centers the content warning at the top of the
  figure

You can override these behaviors by adding SCSS that uses the following selectors:

- `figure.platen-art.platen-content-warning` - use this as the top-level selector to contain the
  rest of your styling to ensure you only affect figures added by this render hook. The rest of
  these selectors assume they're used inside this one. For example:

  ```scss
  figure.platen-art.platen-content-warning {
    // all styling in here only applies to art added by this render hook
    // that has a content warning
  }
  ```

- `img` - use this to style the artwork itself. If you're wanting to limit the height or width, it's
  better to style the figure so the input and label for the content warning fit the image correctly.
- `figcaption` - use this to style the caption.
- `input.platen-content-warning` - use this to style the input. By default, its visibility is set to
  `hidden` because the label can be activated to toggle the blur and it takes up the entire
  figure.
- `input.platen-content-warning + label` - use this to style the label. By default it has its
  position set to [`absolute`][09] and sets the `top`, `bottom`, `left`, and `right` properties to
  `0` to ensure it stretches to fill the entire figure. It uses the [`::before`][10] pseudo-property
  to add the prefix `Content Warning` before the value of the `content_warning` attribute.
- `input[type="checkbox"]:checked + label` - use this to style the label when the reader has toggled
  the content warning off. By default, the only style applied is to set the [`opacity`][11] of the
  label to `0`, making it invisible.
- `input[type="checkbox"]:checked + label + img` - use this to style the image when the reader has
  toggled the content warning off. By default, the only style applied is to unblur the image.
- `input[type="checkbox"]:checked + label + img + figcaption` - use this to style the caption when
  the reader has toggled the content warning off. By default, the only style applied is to make the
  caption visible.

<!-- Link References -->
[01]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure
[02]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-alt
[03]: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class
[04]: /styling
[05]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
[06]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label
[07]: https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/blur
[08]: https://developer.mozilla.org/en-US/docs/Web/CSS/visibility#hidden
[09]: https://developer.mozilla.org/en-US/docs/Web/CSS/position
[10]: https://developer.mozilla.org/en-US/docs/Web/CSS/::before
[11]: https://developer.mozilla.org/en-US/docs/Web/CSS/opacity
