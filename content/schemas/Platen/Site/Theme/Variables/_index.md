---
title: Variables
summary: Schemas for the theme variables in Platen's configuration.
weight: 10
Platen:
  Menu:
    CollapseSection: true
---

Platen uses these configuration settings to define SCSS variables and custom CSS properties (which
can be used like variables) into the theme's compiled style.

You can replace and extend these settings for your own site or theme module.

The [sref:Basic SCSS variables] are loaded first and independent of everything else. The
[sref:Calculated SCSS variables] depend on the basic variables and are loaded second.

The [sref:Dark] and [sref:Light] custom CSS properties are used for the site's [sref:mode], allowing
other style modules to reference a shared set of property names depending on the site configuration
or, if the site's mode is set to `auto`, their own operating system preferences.

```section
```

<!-- Reference Links -->
[sref:Basic SCSS variables]: Platen.Site.Theme.Variables.BasicSCSS
[sref:Calculated SCSS variables]: Platen.Site.Theme.Variables.CalculatedSCSS
[sref:Dark]: Platen.Site.Theme.Variables.DarkCSS
[sref:Light]: Platen.Site.Theme.Variables.LightCSS
[sref:mode]: Platen.Site.Theme.Config.Mode
