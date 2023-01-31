---
title: Art
weight: 10
summary: >-
  Documentation on adding artwork to your content with an image link. 
platen:
  title_as_heading: true
Memo:
  Name: art
  front_matter:
    configs:
      - definition: frontmatter/preset-style.json
        publish:    /frontmatter/platen/data/art-styles.json
        resolve_schemas: true
      - definition: frontmatter/preset-work.json
        publish:    /frontmatter/platen/data/art-works.json
        resolve_schemas: true
      - merge:
          - frontmatter/preset-style.json
          - frontmatter/preset-work.json
        publish:    /frontmatter/platen/data/art.json
        resolve_schemas: true
        join_arrays:     true
      - definition: frontmatter/image-local.json
        publish:    /frontmatter/platen/content/snippets/art/image-local.json
      - definition: frontmatter/image-remote.json
        publish:    /frontmatter/platen/content/snippets/art/image-remote.json
      - merge:
          - frontmatter/image-local.json
          - frontmatter/image-remote.json
        publish: /frontmatter/platen/content/snippets/art.json
      - merge:
          - frontmatter/image-local.json
          - frontmatter/image-remote.json
          - frontmatter/preset-style.json
          - frontmatter/preset-work.json
        publish: /frontmatter/platen/markup/art.json
        resolve_schemas: true
        join_arrays:     true
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
    style:
      Type: String
      Required: false
    work:
      Type: String
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

```memo-example-renderer { title="With Caption" }
![art:Platen Logo](/images/logo.svg "Example Caption")
```

```memo-example-renderer { title="With Classes" }
![art:Platen Logo](/images/logo.svg)
{ .half .float-left }

In this example, the art takes up half the available width and floats to
the left of this content.

This combination lets you include art alongside your content without breaking
the flow.
```

```memo-example-renderer { title="With ID" }
![art:Platen Logo](/images/logo.svg)
{ #id-example }
```

```memo-example-renderer { title="With Content Warning" }
![art:Platen Logo](/images/logo.svg "The caption gets blurred too.")
{ content_warning = "bright colors" }
```

```memo-example-renderer { title="With Link Reference" }
![art:Platen Logo][ex-ref]

[ex-ref]: /images/logo.svg "You can fit a longer caption or reuse a definition."
```

```memo-example-renderer { title="Preset Style" }
![art:Platen Logo](/images/logo.svg)
{ style="left_half" }

In this example, the art takes up half the available width, floats to the left
of this content, and has a sepia filter applied from the `left_half` style.

You can use styles to define presets for your artwork looks.
```

```memo-example-renderer { title="From defined work" }
You can define presets for entire artworks if you want to reuse the same image
several times. Then you can reference the work in the source or as an attribute.

![art:](work:platen.logo)

You can even override the values from the predefined work - anything you specify
in your Markdown overrides the predefined values.

![art:The Platen Logo, inline]()
{
  work="platen.logo"
  style="left_half"
  caption="An example of overriding a work."
  #work-override
}

When you use a lot of different artworks or the same artwork in different
places, combining the `work` and `style` attributes gives you a lot of control
over how the artwork looks in a reusable way.
```

## Inputs

This section describes how the normal markdown input for images works with the art render hook.

Images use this syntax for their inputs:

```markdown
![altText](source 'title')
```

### `alt_text` { #inputs-alt_text }

Specify that [alt text][02] for the artwork. The alt text is used to contextualize the art for
readers using assistive technologies like screen readers.

This value must start with the prefix `art:`. The text after the prefix is used for the alt text.
For example, with `![art:Platen Logo](/images/logo.svg)`, the alt text would be `Platen Logo`.

Don't use any markup for this value. The text is added to an HTML attribute, not rendered from
Markdown.

{{< memo/renderer/input "alt_text" >}}

### `source` { #inputs-source }

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

### `title` (as `caption`) { #inputs-title-as-caption }

If you specify a title in your Markdown syntax for an art image link, Platen uses the title as the
figure caption.

{{< memo/renderer/input "title" >}}

## Attributes

### `class` { #attributes-class }

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

### `id` { #attributes-id }

If you specify a value for this attribute, it's used as the `id` of the figure, making it easier to
link to the figure directly.

<!-- markdownlint-disable MD051-->
For instance, an example on this page used the `id` attribute to set its ID to `id-example`, which
[this link points to](#id-example). Clicking that link will take you directly to the example image.
<!-- markdownlint-enable MD051-->

{{< memo/renderer/attribute "id" >}}

### `content_warning` { #attributes-content_warning }

Specify a content warning for this artwork, if needed. If you specify any value for this attribute,
Platen loads the image blurred out with this value over it as a content warning.

Readers can click on the image or use their keyboard to select and activate the image to toggle the
artwork's visibility if they're okay with the content. When they do, the image is unblurred and the
content warning is hidding. Clicking on or activating the image again returns the blur and content
warning.

{{< memo/renderer/attribute "content_warning" >}}

### `style` { #attributes-style }

{{< memo/renderer/attribute "style" >}}

### `work` { #attributes-work }

{{< memo/renderer/attribute "work" >}}

## Preset Styles

You can use the preset styles feature to save different styles for your artwork as data. Any YAML
files you add in the `data/platen/art/styles` folder are available for use. You can use folders to
group styles together.

Style settings are applied across the various elements that the art markup adds: the figure, image,
and caption. Additionally, styles can define values that are used when the artwork has a content
warning.

### Default Style

All artwork inherits the default style, defined in `data/platen/art/styles/_default.yaml`. You can
override the default values by adding this file to your own site.

```details { summary="Careful when Overriding the Default File" .warning }
When you add the `_default.yaml` file to your site data, you **completely replace**
the default that Platen provides. Make sure to do so carefully.

Most of the time, you'll just want to define new styles instead.
```

``````details { summary="Default Style" .info}
```yaml
figure:
  classes:
    - platen-art
image:
  classes: []
caption:
  classes: []
content_warning:
  figure:
    classes:
      - platen-content-warning
  input:
    classes:
      - platen-content-warning
    name_prefix: toggle
    id_prefix: content-warning
  caption:
    classes: []
```
``````

### Figure Style Options

These style options affect the `<figure>` element the art is added in.

The only available option is to specify a list of classes. If you specify any values for
`figure.classes`, those classes are added to the list of classes specified in the
[default style](#default-style). However, if a work preset specifies two or more styles, only the
value from the last applied style is used.

When using the art markup or defining a work, any values in the `class` attribute or property are
also added to this value.

<!-- Example showing merge behaviors -->

### Image Style Options

These style options affect the `<img>` element the art is added in.

The only available option is to specify a list of classes. If you specify any values for
`image.classes`, those classes are added to the list of classes specified in the
[default style](#default-style). However, if a work preset specifies two or more styles, only the
value from the last applied style is used.

### Caption Style Options

These style options affect the `<figcaption>` element the art is added in.

The only available option is to specify a list of classes. If you specify any values for
`caption.classes`, those classes are added to the list of classes specified in the
[default style](#default-style). However, if a work preset specifies two or more styles, only the
value from the last applied style is used.

### Content Warning Style Options

These style options affect the elements only when the markup or work sets the `content_warning`
attribute or property to a non-empty string. In that case, the `input` options are used and the
other values are merged into the values for `figure`, `image`, and `caption`.

<!-- Show merging behavior -->
`````````tabs { #merging-content_warning-style }
``````tab { name="Style Definition" }
Consider the default style definition.

```yaml
figure:
  classes:
    - platen-art
image:
  classes: []
caption:
  classes: []
content_warning:
  figure:
    classes:
      - platen-content-warning
  input:
    classes:
      - platen-content-warning
    id_prefix: content-warning
    name_prefix: toggle
  caption:
    classes: []
```
``````

``````tab { name="Without Content Warning" }
This is the effective style settings when art markup doesn't include a content warning:
```yaml
figure:
  classes:
    - platen-art
image:
  classes: []
caption:
  classes: []
```
``````

``````tab { name="With Content Warning" }
This is the effective style settings when art markup does include a content
warning. Note that it now includes the `input` key and that `figure.classes`
has the content warning class added to it.

```yaml
figure:
  classes:
    - platen-art
    - platen-content-warning
image:
  classes: []
caption:
  classes: []
input:
  classes:
    - platen-content-warning
  id_prefix: content-warning
  name_prefix: toggle
```
``````
`````````

#### Input Style Options

These style options affect the `<input>` element added to the art's figure when a content warning is
specified.

If you specify any values for `content_warning.input.classes`, those classes are added to the list
of classes specified in the [default style](#default-style). However, if a work preset specifies two
or more styles, only the value from the last applied style is used.

The `content_warning.input.id_prefix` value is used to define a prefix for the `id` property of the
input element. This helps ensure a more unique and visibly identifiable purpose for the element and
keeps it from conflicting with other elements.

The `content_warning.input.name_prefix` value is used to define a prefix for the `name` property of
the input element. It's combined with the ID prefix to help ensure a more unique and visibly
identifiable purpose for the element and is used to associate the input with its label.

## Preset Works

You can define any number of artworks reusably in your site's data. Any YAML files you add in the
`data/platen/art/works` folder are available for use. You can use folders to group works together.

The available properties you can specify for a work are listed below and match the available
attributes. When used together with attributes, any value specified as an attribute overrides the
value specified in the work's definition.

`````````tabs { #merging-work-and-attributes-example }
``````tab { name="Work Definition" }
Here we define a work for the Platen logo in
`data/platen/art/works/platen/logo.yaml`:

```yaml
alt: The Platen Logo
src: /images/logo.svg
id: from-work
```
``````

``````tab { name="Markdown Usage" }
Then, in our markdown, we use the art markup and reference the work:

```markdown
![art:The Platen Logo, from work]()
{
  work="platen.logo"
  style="left_half"
  caption="An example of overriding a work."
  #work-override
}
```

Which is processed to the equivalent YAML internally:

```yaml
alt: The Platen Logo, from work
id: work-override
caption: An example of overriding a work.
style: left_half
```
``````

``````tab { name="Merged Values" }
Now that we have both the values from the work and Markdown, Platen combines
them into:

```yaml
alt: The Platen Logo, from work
src: /images/logo.svg
id: work-override
caption: An example of overriding a work.
style: left_half
```

Because both the work and the markdown specify a value for `alt`, the value
from Markdown is used. If it had been written as `![art:]()` instead, the value
from `logo.yaml` would've been used.

Only the work defines a value for the art's source, so that value is used.

Both the work and the markdown specify a value for `id`, so the value from
Markdown is used again, overriding the value from the work.

The remaining values for `caption` and `style` are only defined in the Markdown,
so they're added to the merged values.
``````
`````````

```details { summary="Careful!" .warning }
When you use a work and attributes together, the values specified as an
attribute always **override** any values from the work. If you specify a class
as an attribute, _only_ classes from the attribute are used, not the value of
the `class` property in the work.

If you want to use extensible values, you probably want to define a preset style
or add another work instead.
```

### `alt` { #work-property-alt }

Specify that [alt text][02] for the artwork. The alt text is used to contextualize the art for
readers using assistive technologies like screen readers. Don't use any markup for this value. The
text is added to an HTML attribute, not rendered from Markdown.

### `src` { #work-property-src }

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

### `id` { #work-property-id }

If you specify a value for this property, it's used as the `id` of the figure, making it easier to
link to the figure directly.

### `class` { #work-property-class }

Specify any additional [classes][03] to add to the `figure` containing the artwork. By default, the
figure has the `platen-art` class. If you specify a value for `content_warning`, the figure also has
the `platen-content-warning` class.

You can specify this value either as a string (if you only need to add one class) or as a list of
strings.

`````````tabs { #work-property-class-strings }
``````tab { name="Single Class" }
```yaml
class: sepia
```
``````

``````tab { name="Multiple Classes" }
```yaml
class:
  - half
  - float-left
```
``````
`````````

You can use these additional classes to further style your artwork on a page. In addition to any
classes you define yourself, the following classes are available:

- `half` - The figure's width is limited to 50% of its container instead of 100%.
- `third` - The figure's width is limited to 33% of its container instead of 100%.
- `quarter` - The figure's width is limited to 25% of its container instead of 100%.

For more information about styling your artwork, see [Styling](#styling).

### `caption` { #work-property-caption }

Specify Markdown to use as the caption for the art's figure.

### `content_warning` { #work-property-content_warning }

Specify a content warning for this artwork, if needed. If you specify any value for this attribute,
Platen loads the image blurred out with this value over it as a content warning.

Readers can click on the image or use their keyboard to select and activate the image to toggle the
artwork's visibility if they're okay with the content. When they do, the image is unblurred and the
content warning is hidding. Clicking on or activating the image again returns the blur and content
warning.

### `style`

Specify any number of styles to use for this artwork. The styles are applied in the order they're
specified, with later styles overriding values from earlier ones.

You can specify a single style as a string or any number of styles as a list.

`````````tabs { #work-property-style-strings }
``````tab { name="Single Style" }
```yaml
style: left_half
```
``````

``````tab { name="Multiple Styles" }
In this example, because `right_half` is specified last, any of its values that
conflict with those from `left_half` are used. Any values that are only defined
in `left_half` or `right_half` are also used.
```yaml
style:
  - left_half
  - right_half
```
``````
`````````

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
