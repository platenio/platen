---
title: Variables
summary: Schemas for the theme variables in Platen's configuration.
weight: 10
platen:
  menu:
    collapse_section: true
---

Platen uses these configuration settings to define SCSS variables and custom CSS properties (which
can be used like variables) into the theme's compiled style.

You can replace and extend these settings for your own site or theme module.

The [sref:Basic SCSS variables] are loaded first and independent of everything else. The
[sref:Calculated SCSS variables] depend on the basic variables and are loaded second.

The [sref:dark] and [sref:light] custom CSS properties are used for the site's [sref:mode], allowing
other style modules to reference a shared set of property names depending on the site configuration
or, if the site's mode is set to `auto`, their own operating system preferences.

```section
```

<!-- Reference Links -->
[sref:Basic SCSS variables]: platen.site.theme.variables.basic_scss
[sref:Calculated SCSS variables]: platen.site.theme.variables.calculated_scss
[sref:dark]: platen.site.theme.variables.dark_css
[sref:light]: platen.site.theme.variables.light_css
[sref:mode]: platen.site.theme.config.mode
