# hugo-schematize

Tooling for publishing/documenting JSON Schemas from your Hugo site.

## Installing Schematize to Your Hugo Site

This is a hugo module.
You'll need to [make sure your site is ready to add this module to it](https://gohugo.io/hugo-modules/use-modules/).

Once that is done, you can update your site config to reference it:

```yaml
#config.yaml
module:
  imports:
    - path: 'github.com/platenio/hugo-schematize'
```

```toml
#config.toml
[module]
[[module.imports]]
  path = 'github.com/platenio/hugo-schematize'
```

Once you've saved your updated config file, you can run `hugo mod get -u` to pull this module down for use.

### Start From Template

Top of our todo list is to set up an extremely minimal default site for you to use which is ready to go.
We'll update this section when that's ready!

## Configuring Your Webring

Right now there's only a few configuration items for this module and they're optional.

### Webring Name

If you'd like to name your Webring, edit your site config:

```yaml
#config.yaml
params:
  Toroidal:
    WebringName: 'FooBar'
```

```toml
#config.toml
[params]
  [params.Toroidal]
  WebringName = "FooBar"
```

The above example will change the header for your site member list to `Members of the FooBar Webring` and the generated webring navigation label to `FooBar Webring`.

If left unset, the header for your site member list will read `Members of the Webring` and the generated webring navigation label will read `Webring`.

You can also add an `_index.md` file to the section of your site which hosts
your webring. If you do, the frontmatter for that file determines your webring
name:

- If the `name` parameter is set, that will be the name of your webring.
- If the `name` parameter is _not_ set, the name of your webring will be the
  title of that page (automatically determined by hugo unless you set the
  `title` parameter).

For more information on webring index files, see
[Webring Index files](#webring-index-files).

### Random Member Link

By default, the iframes for your webring include the name of the webring and then a nav list enabling users to go to the previous member of the webring,
the list of all webring members, or the next member of the webring.

With the `RandomMemberLink` configuration option, you can enable users to click a link to navigate to the homepage of a random member of the webring.

```yaml
#config.yaml
params:
  Toroidal:
    RandomMemberLink: true
```

```toml
#config.toml
[params]
  [params.Toroidal]
  RandomMemberLink = true
```

Specifying the value for this configuration item as `false` is the same as not specifying it.
You must opt in by setting this configuration item to `true` to enable the random member link.

### Theming

Minimal theming has been added to the member pages of the webring. This theme uses SCSS in the
`assets/schematize` folder. By default, the theme is set to **Auto**, which chooses between the
built-in light and dark themes depending on the user's operating system setting preferences.

You can specify an override via the `Theme` configuration option:

```yaml
#config.yaml
params:
  Toroidal:
    Theme: custom # or light, dark, or auto
```

```toml
#config.toml
[params]
  [params.Toroidal]
  Theme = 'custom' # or light, dark, or auto
```

The `custom` option allows you to design your own theme from scratch; to do so, you will need to
shadow the `assets/schematize/_custom.scss` file in your own site repo.

You can also override any variables you choose by shadowing the `assets/schematize/_variables.scss`
file. In the future, we'll have documentation explaining all of the variables. For now,
unfortunately, you need to [check out the source][source-variables] to see what is in there.

If you have any ideas for theming or run into anything you'd like us to make more extensible,
please [file an issue][file-an-issue].

## Webring Index Files

If you create an `_index.md` file in the base of the `schematize` folder of your
site, you can have a little more control over how your webring behaves. Any
configuration setting in an index file takes precedence over the site's
configuration.

In the frontmatter of a webring index, you can set:

- `title`:
- `name`:
- `description`:

If you are using the index file from any folder other than `content/schematize`
in your site, you **must** set the `type` parameter to `schematize` for it to be
recognized as a webring index.

### Example Webring Index

This index is located at `content/friends/_index.md`.

Frontmatter:

```yaml
title: The Fast Friends
name: Fast Friends
description: |
  A webring of collaborators; artists, writers, developers, and designers who
  work together and separately, supporting one another.
type: schematize
```

In this example, the webring name is `Fast Friends`. If you comment out the
`name` parameter, the webring name would become `The Fast Friends`. With both
parameters commented out, the webring name would become `Friends`, (the
automatic title Hugo gives the page if none is specified).

The `type` parameter is required because this page is not in the default folder
for schematize webrings (`content/schematize`).

## Adding Members

You can add new member sites to your webring by adding a markdown file in your `content/schematize` folder.
The only thing you need to include in that file is some frontmatter to tell hugo about the site.
For example:

```yaml
# content/schematize/first-member.md
---
name: First Member
homepage: https://firstmember.com
description: The first member's site
weight: 1
---
```

This will:

- Set the display name of the site in the member list to `First Member`
- Set all links to that site (on the member list and in the generated webring navigation) to `https://firstmember.com`
- Set the short description of the site in the member list to `The first member's site`
- Set their member number to 1; this is used both to display the members in the correct order in the member list and to determine which sites are considered "previous" and "next" in the generated webring navigation.

You will need a file for every member site added to the webring.
For now, we don't have any helpers to ease this, but we're going to write some tooling and update this doc as those land.

## Setting up the webring administration page

You can opt-in to a more delightful experience for your webring members by creating an admin page.
To do so, create the `content/schematize/admin.md` file and give it the following frontmatter:

```yaml
title: Toroidal Administration
description: |
  A useful admin page for schematize webring members
type: schematize/admin
outputs:
  - html
  - schematize
```

> **Note:** You can replace the title and description with whatever you like, but for the admin
> page to work properly, you need to set the `type` to `schematize/admin` and make sure the `outputs`
> includes both `html` and `schematize`.

With the administration page setup, your members can navigate to it, find their entry on the page,
and then review the code snippets and choose whether they want to copy the literal embed code or
use an iframe. This view also shows them their currently configured homepage (which other members
will navigate to for their entry in the webring) and the link to where the member can edit the
markdown source file for their member entry.

## Multiple Webrings

In addition to hosting a single webring, you can host any number of webrings.
Any webring not hosted in the root of the `content/schematize` folder **must**
include an `_index.md` file with the `type` parameter set to `schematize` in its
frontmatter. For more information, see
[Webring Index Files](#webring-index-files).

Other than the requirement of the index file, additional webrings work and can
be configured like a top-level webring, including
[administration][admin-page].

## Adding the webring navigation to your member site

To add the webring navigation to your member site, the following requirements must be met:

1. Your member page must be added to the webring host site and live on the internet.
2. The webring host must have setup the [Admin page][admin-page] correctly.

Once you have confirmed that both of those items are true, you can navigate to the admin page on
your host's site. On that page, you'll find an entry for your site as a member and you can choose
whether you want to embed the navigation on your site as a literal or an iframe.

In both cases, you will be able to review the embeddable code with comments that explain what/why
it does what it does. There are tradeoffs to both approaches, but in general, the literal embed
gives you more flexibility by requiring more work on your part while the iframe is minimal-work
to use but also minimal-flexibility.

Both options are designed so that you should not need to update your embedded code unless the name
used for your member site changes or the webring host updates their base URL or the path to the
admin page.

### Embedding the literal HTML

If you choose to embed the literal HTML, you're embedding a copy of the generated HTML that sits
on your member page on the host with two major differences:

1. It does _not_ include the host's styling; the HTML elements have the same classes and
   functionality, but none of the host's CSS comes with it. You will need to add your own styling
   via your site to handle how it displays for your users.
2. It includes a script which runs on page load to retrieve the latest data from the webring host
   and updates your navigation with the most accurate/up-to-date info it can. If the host can't be
   reached, it falls back on the links defined in the HTML you embedded--so you're never _wholly_
   beholden to the host after you embed, but being able to connect means you don't need to grab the
   updated embed code everytime the host makes a change.

### Embedding as an iframe

If you choose to embed the iframe HTML, you're embedding a reference to your member page on the host
inside your own website. Without the comments, this code snippet is much smaller than the literal
embed option, but it is _wholly_ dependent on connectivity to the webring host being available and
without substantial scripting on your end, you cannot retheme or otherwise style it.

On the other hand, because you're not embedding anything but a window into the host, you can also
rely on the default styling the host gives you without having to do any of the work yourself. When
compared to the literal embed, the iframe is much easier and more straightforward to use. You copy
the snippet, place it in your site where you want it to show up, and that's it.

The only special handling for the iframe on your site comes in the form of a convenience script,
which inspects the iframe after it loads and sets its size to the actual size of the content.

## Contacting Us

If you have any questions, comments, or concerns, you can reach out to us by
[starting a discussion][start-a-discussion], [filing an issue][file-an-issue], or reaching out to
the maintainers on Twitter or Discord.

[admin-page]:         #setting-up-the-webring-administration-page
[file-an-issue]:      https://github.com/platenio/hugo-schematize/issues/new
[start-a-discussion]: https://github.com/platenio/hugo-schematize/discussions/new