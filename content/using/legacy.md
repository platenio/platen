---
title: Migrating from Legacy Settings
linkTitle: Legacy Settings
summary: Help for updating your Platen site to use newer features.
weight: 99
---

In a recent release, Platen added much stronger integration with [sref:Shoelace][s01]. This brings a host of benefits,
especially around composing configurable theme components and icons.

With this release, Platen raises a warning when you use legacy components and markup, but still defaults to those
legacy implementations. In the future, the new components and markup will become the default. Later, opting to use the
legacy options will raise an error instead of a warning. Finally, the legacy implementations will be removed.

We **strongly** recommend you migrate your site and any theme customizations to use the new components and markup.

## Display Updates

The `display` section of the configuration has expanded to cover several new features, replacing old non-configurable
components of the theme with much more configurable and functional components.

### Table of Contents

The table of contents (TOC) implementation has been reworked from a minimalist set of nested list items that linked to
the headings on the current page to a collapsible list of links using Shoelace's [sref:Tree][s02] and
[sref:Tree Item][s03] components.

If you enable the updated TOC, you can customize the indentation for the TOC as well as the collapse and expand icons.
Further, the implementation supports adding icons before and after the link text in the TOC by specifying attributes on
headings in your Markdown.

### Multilingual Languages Icon

For multilingual sites, the languages icon in the site menu that displays for the translated pages dropdown is now
implemented as a Shoelace [sref:Icon][s04] and is configurable. You can use the `platen.display.menu.languages_icon`
settings to configure it.

### Mobile Controls Buttons

The controls at the top of content pages for showing the site menu and the table of contents have been updated to use
Shoelace's [sref:Icon Buttons][s05]. They use Shoelace's [sref:Tooltip][s06] to display extra information when you
hover on them. You can configure both buttons with the `menu_control` and `toc_control` settings in
`platen.display.mobile`. You can override the icons, the tooltips, and the accessibility labels.

### Footer Link Buttons

The links at the bottom of the page for seeing the last edit to a page and editing it online have been reworked.
Instead of links, they're now Shoelace [sref:Buttons][s07].

The new button for the last edited on link now displays how long its been since the page was last updated. If you
hover on the button, it displays the localized time and date for that last update. Clicking the link takes you to the
commit that last updated the file.

The new button for the edit this page link is simpler and doesn't have a tooltip.

You can configure both buttons, including replacing their icons, updating their text, or removing them entirely, with
the `last_edited_on` and `edit_this_page` settings in `platen.display.footer`.

### Updating Your Configuration

To update your configuration to use the new display settings, you can either update the `_params/platen/display.yaml`
file in your site's [`data` folder][h01] or your `hugo.yaml` site configuration file.

For your convenience, Platen supports configuring your site with data files in the `_params` folder. If you followed
the [Happy Path][01] when setting up your site, or if you used the [Platen Template][02], you already have the data
files and folders created for configuring Platen from your site data.

The tabs below explain how you can use either option to update your configuration and take advantage of the new
functionality.

`````````tabs
``````tab
---
name: Updating in `data/_params`
---
Update the `_params/platen/display.yaml` file in your site's `data` folder.

Make sure the settings below are defined correctly in the file.

```yaml
table_of_contents:
  languages_icon:
    use_legacy: false
mobile:
  menu_control:
    use_legacy: false
  toc_control:
    use_legacy: false
footer:
  last_edited_on:
    use_legacy: false
  edit_this_page:
    use_legacy: false
```
``````

``````tab
---
name: Updating in `hugo.yaml`
---

If you'd rather manage your configuration options in a single configuration 
file, you can edit your `hugo.yaml` file.

Ensure the following key-value pairs are set in your `hugo.yaml` configuration
file.

```yaml
platen:
  display:
    table_of_contents:
      languages_icon:
        use_legacy: false
    mobile:
      menu_control:
        use_legacy: false
      toc_control:
        use_legacy: false
    footer:
      last_edited_on:
        use_legacy: false
      edit_this_page:
        use_legacy: false
```

```alert
We strongly recommend using the data files to manage your configuration if
you're setting more than one or two options. It's much more maintainable in
the long run. Each configuration section is easier to read.
```
``````
`````````

## Markup

Alongside general components, Platen has updated older markup to use Shoelace components, making them more customizable.

### Buttons

The [buttons][03] markup used to display a normal link that Platen styled to look like a button. Now the markup renders
[sref:Shoelace Buttons][s07], which are much more configurable. To see the full list of new options, see the markup's
[documentation][03].

A few highlights include being able to add icons to your buttons, change their shape and color, and indicate that the
button downloads a file.

To enable the new buttons markup, set `platen.markup.buttons.use_legacy` to `false` in your site configuration or in
the `_params/platen/markup.yaml` file in your site's data folder.

### Details

The [details][04] markup used to display an HTML [sref:`<details>`][m01] element that required classes to customize.
Now this markup renders [sref:Shoelace Details][s08], which are more configurable.

With the new markup, you can configure the icons displayed on the details block to indicate that a reader can collapse
or expand the block.

To enable the new details markup, set `platen.markup.details.use_legacy` to `false` in your site configuration or in
the `_params/platen/markup.yaml` file in your site's data folder.

### Tabs

The [tabs][05] markup used to display tabbed content in [sref:`<div>`][m02] elements controlled by custom inputs and
required classes to customize. Now, this markup renders a [sref:Shoelace Tab Group][s09] instead. To see the full list
of new options, see the markup's [documentation][03].

A few highlights include customizing where tabs are placed relative to their content, defining closable tabs, and
making tabs scrollable when they don't fit on the page.

To enable the new tabs markup, set `platen.markup.tabs.use_legacy` to `false` in your site configuration or in the
`_params/platen/markup.yaml` file in your site's data folder.

[s01]: sl.component:
[s02]: sl.component:tree
[s03]: sl.component:tree-item
[s04]: sl.component:icon
[s05]: sl.component:icon-button
[s06]: sl.component:tooltip
[s07]: sl.component:button
[s08]: sl.component:details
[s09]: sl.component:tab-group
[h01]: https://gohugo.io/getting-started/directory-structure/#directory-structure-explained
[m01]: mdn.html.element:details
[m02]: mdn.html.element:div
[01]: /getting-started/happy-path-setup/
[02]: https://github.com/platenio/platen-template
[03]: /modules/platen/markup/buttons/
[04]: /modules/platen/markup/details/
[05]: /modules/platen/markup/tabs/