---
title: Shortcodes
summary: Shortcodes enable you to extend your Markdown with advanced features.
bookFlatSection: false
weight: 10
---

Platen relies on Hugo's [shortcodes][01] feature to help you go beyond simple Markdown when
authoring the digital editions of your books. Without shortcodes, you are limited to static
elements, like headers, paragraphs, lists, and tables. With shortcodes, you can embed iframes,
create forms, make your tables interactive, and more---without having to hand-write HTML in your
Markdown files.

## Using shortcodes

Shortcodes always have a tag. Some shortcodes require both opening and closing tags.

Basic shortcodes
: When a shortcode doesn't require a closing tag, write it like this:

  ```html
  {{%/* ShortcodeName parameters */%}}
  ```

  Where `ShortcodeName` is the name of the shortcode, like `ref`, and `parameters` is the list of
  values to pass to the shortcode separated by spaces. For example:

  ```html
  {{%/* ref "/docs/tutorials/getting-started.md" */%}}
  {{%/* twitter "dril" "1576784267769618433" */%}}
  ```

Named parameter shortcodes
: Some shortcodes use named parameters instead of positional ones. Write them like this:

  ```html
  {{%/* ShortcodeName ParameterName=ParameterValue */%}}
  ```

  For example:

  ```html
  {{%/* itchio id="1299168" square=true */%}}
  ```

Paired shortcodes
: When shortcodes require inner text, they also require paired tags to open and close the shortcode.
  Write them like this, with a `/` before the shortcode name in the closing tag:

  ```html
  {{%/* ShortcodeName parameters */%}}
  {{%/* /ShortCodeName */%}}
  ```

  ```html
  {{%/* ShortcodeName ParamaterName=ParameterValue */%}}
  {{%/* /ShortCodeName */%}}
  ```

  For example:

  ```html
  {{%/* details "warning" "Credentials in Repositories" */%}}
  Don't include your credentials---API tokens, passwords, etc---in your site's
  repository. If you do, they're publicly available to anyone who can see your
  source files.
  {{%/* /details */%}}
  ```

  ```html
  {{%/* details title="Credentials in Repositories" class="warning" */%}}
  Don't include your credentials---API tokens, passwords, etc---in your site's
  repository. If you do, they're publicly available to anyone who can see your
  source files.
  {{%/* /details */%}}
  ```

There's more nuance about shortcodes, but this covers the majority of use cases. For more
information on shortcodes, see the [Hugo documentation][01].

## Hugo's shortcodes

Hugo itself provides several shortcodes:

- [`figure`][02] extends your ability to place images on a page, using the `<figure>` HTML element instead
  of the simpler---but less versatile---image tag Markdown supports.
- [`instagram`][03] enables you to embed an image from Instagram.
- [`param`][04] is useful for debugging, allowing you to check the value of a page or site parameter
  without having to do any special coding.
- [`ref` and `relref`][05] help you [cross reference][06] your site, creating permalinks and
  handling complex features like linking across language versions or to other formats.
- [`tweet`][07] enables you to embed tweets in a consistent way.
- [`vimeo`][08] and [`youtube`][09] enable you to embed videos from those platforms.

## Creating shortcodes

You can also [create your own shortcodes][10] if the ones Hugo and Platen provide don't meet all of
your needs. If you find yourself wishing a shortcode existed though, you can always [reach out][11]
or [file an issue][12] and we'll be happy to see if we can help.

<!-- Link References -->
[01]: https://gohugo.io/content-management/shortcodes/
[02]: https://gohugo.io/content-management/shortcodes/#figure
[03]: https://gohugo.io/content-management/shortcodes/#instagram
[04]: https://gohugo.io/content-management/shortcodes/#param
[05]: https://gohugo.io/content-management/shortcodes/#ref-and-relref
[06]: https://gohugo.io/content-management/cross-references/
[07]: https://gohugo.io/content-management/shortcodes/#tweet
[08]: https://gohugo.io/content-management/shortcodes/#vimeo
[09]: https://gohugo.io/content-management/shortcodes/#youtube
[10]: https://gohugo.io/templates/shortcode-templates/
[11]: {{% ref "/contact.md" %}}
[12]: https://github.com/platenio/hugo-platen/issues
