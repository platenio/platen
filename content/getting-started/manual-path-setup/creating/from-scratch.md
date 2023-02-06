---
title: Create a Platen Site from Scratch
linktitle: From Scratch
summary: >-
  Create a new Platen site locally.
weight: 2
draft: true
---

If you've installed the [prerequisites][01], you can create a new Platen site on your local machine.

## Creating the site folder

Navigate to a folder on your computer where you want to create your site's files. When you run the command, Hugo
creates a new folder for your site and its files. So if you're in `C:\code`, the example below will create the folder
`C:\code\sprocky-games-coop`.

```bash
# sprocky-games-coop is the name of the folder to create
hugo new site sprocky-games-coop -f yaml
```

```output
Congratulations! Your new Hugo site is created in C:\code\sprocky-games-coop.

Just a few more steps and you're ready to go:

1. Download a theme into the same-named folder.
   Choose a theme from https://themes.gohugo.io/ or
   create your own with the "hugo new theme <THEMENAME>" command.
2. Perhaps you want to add some content. You can add single files
   with "hugo new <SECTIONNAME>\<FILENAME>.<FORMAT>".
3. Start the built-in live server via "hugo server".

Visit https://gohugo.io/ for quickstart guide and full documentation.
```

## Edit Hugo Configuration File

## Add Platen Data Parameter Files

[01]: ../prerequisites.md
