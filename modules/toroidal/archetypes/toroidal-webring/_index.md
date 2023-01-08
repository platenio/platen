---
{{- $webringName := replace .Name "-" " " | title }}
# For more information about the available options for defining a member site,
# see: http://platen.io/modules/toroidal/config/content/section/
title: {{ $webringName }}
type: toroidal
cascade:
  toroidal_webring_name: {{ $webringName }}
---

This is boilerplate text that is never shown. Hugo requires _some_ text in the body of a file to
display it as a clickable link in the site menu. That's the only purpose of this paragraph.
