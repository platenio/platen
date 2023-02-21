---
title: Using Front Matter with Page Content 
linktitle: Content
summary: >-
  Get started using Front Matter to review and edit your content metadata and data files.
weight: 1
---

Platen's integration with Front Matter is particularly helpful when authoring and editing your pages. This page walks
you through a quick tour of Front Matter's content-specific features.

## Opening Your Codespace

Navigate to your repository on GitHub. When you have that page open, type the period key (`.`) and GitHub will open the
web editor for your repository.

![Screenshot of the opened web editor for the sprocky-games-coop repository on GitHub][i01]

Your next action depends on whether you've already created a codespace for your repository:

``````tabs { #codespace-setup }
```tab { name="With Existing Codespace" }
Type the key combination ![kbd:Ctrl+Shift+P]() (![kbd:⌘+Shift+P]() on macOS) to
open the command palette and type `Connect to codespace` and hit ![kbd:Enter]().
```

```tab { name="Creating new Codespace" }
Type the key combination ![kbd:Ctrl+Shift+P]() (![kbd:⌘+Shift+P]() on macOS) to
open the command palette and want to type `Create new codespace` and hit
![kbd:Enter]().

You'll be prompted to select a repository to create your codespace for. Select
the repository where your Platen site is, which should be the default at the
top. Next, you're prompted to choose a branch for your codespace. Select `main`.

Finally, you're prompted to select the instance type for your codespace, which
determines how much resources your codespace has. Platen doesn't require much,
so you can select the smallest option.

After you make your selections, the page will update to show that it's setting
up your codespace. This will take a bit of time.
```
``````

When your codespace is open, you're ready to checkout Platen's integration with
Front Matter.

## Content Metadata

The first Front Matter integration we'll look at for Platen is the metadata for your Markdown content. Open the file
`content/_index.md` in your codespace.

![Screenshot of the opened index Markdown file in the codespace][i02]

On the activity bar (the bar in the editor with icons, usually on the far-left of your editor window), select the icon
that looks like `FM`. When you hover on the icon, it should display a pop-up that reads `Front Matter`.

![Screenshot of selecting the Front Matter option on the activity bar in the codespace][i03]

This replaces the file-tree view of your repository with the Front Matter view for the file you currently have open.

![Screenshot of the opened Front Matter bar for the index file in the codespace][i04]

At the top of the bar are the global settings. We're going to ignore them for now as the defaults are fine. Collapse
that information by selecting the arrow to the left of the `Global Settings` title on the bar.

![Screenshot of the collapsed Global Settings and displayed SEO Status in the opened Front Matter bar][i05]

The next section in the bar is the SEO status. This shows some information about the current page as best practices for
writing on a website. It also shows you a breakdown of how many headings, paragraphs, links, and images the page
includes.

The next section has a list of actions Front Matter can take. Select the `Start server` option.

![Screenshot of the Actions section in the Front Matter bar with the "Start server" button highlighted][i06]

That starts hugo in the background. Now you can select the `Open preview` button, which opens the rendered page in your
editor. This lets you preview your work without having to leave the editor.

![Screenshot of the editor with the page preview showing to the right of the document][i07]

Edit the page by adding a new paragraph. You'll see the preview reflect your changes after a few moments.

![Screenshot of the editor with the updated preview page][i08]

Collapse the Actions section.

![Screenshot of the Metadata section of the Front Matter bar][i09]

The last important section of the Front Matter bar to review for now is the Metadata section. This section includes all
the metadata options for the file along with descriptions of what the option does. You can edit your metadata in this
view instead of in the document itself.

Change the text in the `Summary` option to something suitable for your site. You'll see the text in the document update
after you do.

![Screenshot of the updated metadata in the editor][i10]

When you're happy with the file's metadata, you're ready to move on to adding snippets.

## Adding Snippets

Add a new line to the file's content. Then, use the insert snippet shortcut ([kbd:Ctrl+Shift+V]()) to bring up the
snippet dashboard view. Alternatively, you can click the scissors icon in the top-right corner of the editor.

![Screenshot of the Front Matter snippet dashboard view in the editor][i11]

This view lists all of the supported special markup for Platen, which Front Matter calls snippets. In the search bar on
the top left, you can search for specific snippets. Type `Details` into the search bar, hover over the snippet card,
and select the `+` button that appears while hovering.

![Screenshot of the details snippet card in the dashboard with the insert snippet button highlighted][i12]

This brings up a new view for filling out the options for the markup. We'll cover the markup in more depth in a future
tutorial. For now, add text to the `Summary Markdown` and `Content Markdown` fields.

![Screenshot of the details snippet modal with the summary and content fields filled out][i13]

Notice that as you updated the fields the snippet's preview changed to include your text. When you're happy with the
summary and content, select the `Insert` button at the bottom of the view. When your view returns to the file, save it.

![Screenshot of the editor with the details markup added and the page preview showing the rendered markup][i14]

You just added an HTML [sref:`<details>`][s01] element to the page. You can use this markup to add collapsible sections
to your content.

## Wrapping Up

In this walkthrough you saw how you can use Front Matter with your content files to:

1. Review your SEO
1. Preview your pages while you work on them
1. Edit your page metadata
1. Insert special markup with snippets

<!-- Link Reference Definitions -->
[i01]: images/github-web-editor.png
[i02]: images/content-open.png
[i03]: images/content-fm-activity-bar.png
[i04]: images/content-fm-open.png
[i05]: images/content-fm-collapsed-status.png
[s01]: mdn.html.element:details
