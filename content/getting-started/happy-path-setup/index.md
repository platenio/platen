---
title: Setup on the Happy Path
linktitle: Happy Path Setup
summary: Get started creating your first Platen site for interactive digital books on
  the happy path with GitHub and Netlify from a template.
weight: 1
---

This guide will help you create your own Platen site from a template without needing to install anything on your
computer. It uses GitHub as the source of truth for your new site and Netlify as its host. You can use both services
for free without signing up for any trial or subscription.

## Prerequisites

Before you can follow the rest of this tutorial, you'll need to create a user account for both [GitHub][01] and
[Netlify][02] if you don't already have one. We recommend creating a GitHub account first and using that to login to
Netlify.

## Deploy the Template

Now that you have your accounts created, you're ready to use Platen's template to create your site. Select the button
below, but keep this page open in case you need help and for more instructions!

[![Deploy to Netlify][i01]][03]

From here, follow Netlify's instructions. You'll need to connect your Netlify account to GitHub first.

![Screenshot showing the connect to GitHub button on Netlify][in01]

Next, give your repository a name. This can be anything you want. This tutorial is going to use `sprocky-games-coop` as
the name, but you should use a name that matches your own needs and preferences.

![Screenshot showing the naming page for Netlify][in02]

When you're happy with the name, select the `Save & Deploy` button on that page. Netlify will then immediately begin
creating and publishing your site. When it finishes, you'll be on an overview page for your site with an address like
`https://app.netlify.com/sites/fluffy-palmier-4e74f0/overview`.

![Screenshot showing the landing page for your new Netlify site][in03]

From here, select the `Site settings` button. That will take you to a page that lists your site's information.

![Screenshot of the site settings page on Netlify][in04]

Select the button labeled `Change site name` and set it to the same name you used for your project. That'll make it a
bit easier for you to find and link to your site until you're ready to setup a custom domain name.

![Screenshot of setting the new site name on Netlify][in05]

When you're ready, select the `Save` button to update your site's name.

Now you can select the link to your site from the page (near the top, above the site details).

![Screenshot of the link to your live site on Netlify][in06]

🎉🎉🎉

![Screenshot of the deployed site on Netlify][in07]

You've got a deployed Platen site! Now it's time to configure it to your needs.

## Set Up Your Codespace

The rest of this tutorial uses [GitHub's Codespaces][04] feature. It gives you all the power and convenience of a
fully-packed developer laptop configured for working on Platen, but in your browser.

From the Netlify page for your site's settings, select the link labeled `GitHub` just below your site's new URL. It
should take you to your site's repository on GitHub with a URL like
`https://github.com/<github-user-name>/<project-name>`. For this tutorial, the repository (which you can check out if
you want) is at [`https://github.com/michaeltlombardi/sprocky-games-coop`][05].

![Screenshot of the link to your site's GitHub repository on Netlify][ig01]

Once you're on that page, hit the period (`.`) key on your keyboard. This reopens your project in GitHub's
[web editor][06], which is great for quick edits but not as full-featured as a codespace. The next thing to do is
super-charge your editing experience and set up a codespace for your site.

![Screenshot of the repository opened in GitHub's web editor][ig02]

Type the key combination ![kbd:Ctrl+Shift+P]() (![kbd:⌘+Shift+P]() on macOS) to open the command palette. This lets you
do a lot of interesting things, but right now you want to type `Create new codespace` and hit ![kbd:Enter]().

![Screenshot of selecting the "Create new Codespace" command][ig03]

You'll be prompted to select a repository to create your codespace for. Select the repository where your Platen site
is, which should be the default at the top. In this example, it's `michaeltlombardi/sprocky-games-coop`. Select your
repository.

![Screenshot of selecting your repository for the codespace][ig04]

Next, you're prompted to choose a branch for your codespace. Select `main`.

![Screenshot of selecting the branch for the codespace][ig05]

Finally, you're prompted to select the instance type for your codespace, which determines how much resources your
codespace has. Platen doesn't require much, so you can select the smallest option[^1].

![Screenshot of selecting the instance type for the codespace][ig06]

After you make your selections, the page will update to show that it's setting up your codespace. This will take a bit
of time. When it finishes, you're shown a page that looks very similar to the previous one, but with an open terminal
that informs you you're now using a Codespace.

![Screenshot of the codespace after it's opened][ig07]

Now you have a fully functional place to edit and work on your Platen site!

## Setting Basic Configuration

While your site did deploy to Netlify, it did so with some default settings you'll want to change. This section will
help you get your site configured to match your initial needs.

In the file list on the left, find and open `config.yaml`. This is your Platen site's configuration file. All the
Hugo-specific settings are defined there.

![Screenshot of the codespace][ig08]

```details { .info summary="Aside: Editing Features" }
Before we change anything, try hovering on one of the keys (setting names) in
the file. You should see a popover box with information.

![Screenshot of the codespace with hover help for the baseURL key][di01]

We've done a bit of work to ensure that Hugo's configuration file is wired up to
provide you with help information (including a link to the documentation for
each setting), validation (so the editor can tell you if something is
_definitely_ wrong), and auto-complete where possible.

Describing those features in detail is outside the scope of this tutorial, but
they should help you out when you're working in your configuration from now on.

[di01]: images/config-file-hover.png
```

The first settings to change are the `baseURL` and `title`. By default, they're defined as:

```yaml
baseURL: https://platen-template.netlify.app/
title:   Platen Example
```

Set the `baseURL` to be the same as the URL to your site on Netlify. Make sure to include the `https://` prefix for the
URL. Set the `title` to whatever makes sense for your site. For the example in this tutorial, we're using
`Sprocky Games Coop`. The `baseURL` ensures your links work correctly. The `title` is used in your site's metadata and
in the tab name for your pages when opened in the browser.

```yaml
baseURL: https://sprocky-games-coop.netlify.app/
title:   Sprocky Games Coop
```

The only other setting we need to change right now is the `description` key down at the bottom.

```yaml
params:
  description: My site description.
```

This description is used in your site's metadata and forms the text that appears in the link previews when you share
your site on social media. For the example in this tutorial, we're going to set it to a brief description of the
(fictional) game developer cooperative.

```yaml
params:
  description: Tabletop games and interactive fiction by the Sprocky Games Coop.
```

When your `baseUrl`, `title`, and `description` are set, you're done editing this file.

![Screenshot of the edited config.yaml file][ig09]

## Setting Repository Options

There's one more change to make for your Platen site's settings. In the list of files on the left, select the `data`
folder, then `_params/platen`, then the `repository.yaml` file.

![Screenshot of the data/_params/platen/repository.yaml file][ig10]

Nearly every setting in this file is already correct for you. The only key that you need to update is the `url` key -
you want this to point to your own repository on GitHub. That url should be
`https://github.com/<github-user-name>/<project-name>`. For the example in this tutorial, that value is
`https://github.com/michaeltlombardi/sprocky-games-coop`.

```yaml
url:          https://github.com/michaeltlombardi/sprocky-games-coop
commit_path:  commit
edit_path:    edit/main
content_root: content
```

Once you've set `url` to your own repository, you're done editing this file.

```details { .info summary="Note:" }
If you hover on the keys in this file, you should get the pop-over help again
like you did in the Hugo configuration file. This file and the others in the
`data/_params` folder are all wired up with help, validation, and auto-complete.

When you're ready to start tweaking your Platen site more, that will help you.
Every option also links you to the documentation for configuring Platen.
```

## Setting Up Front Matter

By following this tutorial, your codespace is setup to use [Front Matter][07], an editor extension to make authoring
and maintaining your Markdown easier. Platen is deeply integrated with Front Matter to make your authoring experience
as delightful as possible.

There's one change you'll need to make to Front Matter's configuration file. In the list of files on the left of your
codespace window, select `frontmatter.json`.

![Screenshot of the opened frontmatter.json file][ig11]

Here, you need to set the `frontMatter.site.baseURL` to be the same as the URL to your site on Netlify, like you did
in the Hugo config file. Make sure to include the `https://` prefix for the URL.

```json
{
  "$schema": "https://beta.frontmatter.codes/frontmatter.schema.json",
  "frontMatter.extends": [
    "https://platen.io/frontmatter/platen.json"
  ],
  "frontMatter.site.baseURL": "https://sprocky-games-coop.netlify.app",
  "frontMatter.taxonomy.tags": [],
  "frontMatter.taxonomy.categories": []
}
```

Once you've set `frontMatter.site.baseURL`, you're done editing this file.

## Pushing Your Changes

Now that you've updated your configuration files, it's time to save and push your changes.

In the far left of your codespace, you should see an icon that has a bubble with the number `3` inside it. Select that
icon. Your view will be updated to show the `Source Control` panel. Here, you can review the changes you've made so
far.

Select `config.yaml` from the list of files under the `Changes` label.

![Screenshot of the view of changes for the config.yaml file in codespaces][ig12]

This shows you a comparison view of the file before (on the left) and after (on the right) your edits. You can review
the changes for each file to make sure you're happy with them. The only files changed should be `config.yaml`,
`frontmatter.json`, and `repository.yaml`.

When you're satisfied with the changes, hover on the bar labeled `Source Control` immediately above the text box
labeled message. Find the triple-dot icon on the far right. When your cursor is over that icon, the hover text should
say `More Actions...`. Select that icon. Move down the list of menu options to the one labeled `Branch` and select
`Create Branch...` from the sub-menu.

![Screenshot of the menu option for creating a branch in the codespace][ig13]

When you do, you're prompted at the top to provide a branch name. Specify it as `set-site-config` and hit
![kbd:Enter]().

![Screenshot of creating a branch in the codespace][ig14]

This changes your working context to a new branch called `set-site-config` instead of `main`. For now, what you need to
know about source control is that you always want to make all your changes to a working branch _other than_ `main`.
Think of `main` as your publishing copy of your work. Any changes that go to `main` also get used when publishing your
site that people will visit.

Now that you're on a working branch, you're ready to save and push your changes.

Hover on the bar labelled `Changes` and then select the plus icon (when you hover on it, it should read `Stage All
Changes`). Notice that the files move from the `Changes` section to the `Staged Changes` section.

![Screenshot of staged changes in the codespace][ig15]

Next, type a message into the text box at the top of sidebar. This message describes the changes you've made. That way,
when you or someone else you're working with tries to understand a change, you have context that explains the work. For
this tutorial, we're using the message:

```text
Update config values

This change overrides the default values from the template so that the site
works correctly.
```

When you've written your message, click the dropdown arrow on the button labelled `Commit` and select the `Commit &
Create Pull Request` option. This submits your changes on GitHub for you or your collaborators to review before you
publish them.

![Screenshot of committing the changes and creating a pull request in the codespace][ig16]

The side bar will update to show you the `Create Pull Request` menu. Leave the defaults in place, scroll to the bottom
of the menu, and select the `Create` button.

![Screenshot of creating the pull request in the codespace][ig17]

When you're prompted to publish your branch and then create the pull request, select the `Publish Branch` option.

![Screenshot of publishing the branch for the pull request in the codespace][ig18]

Once your pull request is created, Netlify will automatically begin publishing a review copy of your site. You'll need
to wait a minute or two for it to show up on the page. A new comment will show up and include links to your latest
deploy log and preview.

![Screenshot of the pull request with the Netlify preview comment and links in the codespace][ig19]

Select the link to the deploy preview. It should be something like
`https://deploy-preview-1--<project-name>.netlify.app`.

When you select the link, your browser opens a new tab and navigates to a live preview of your Platen site with the
changes you made. From here, you can investigate your site. Notice that your site's title on the site menu has changed
to the value you set in the hugo config for the `title` key.

![Screenshot of the site's preview with the changes on Netlify][ig20]

There's plenty you might want to change, but we'll cover content authoring and editing in the next tutorial. For now,
go back to the tab for your codespace. Scroll down on the pull request and select the `Merge Pull Request` button, then
the `Create Merge Commit` button. This will add your changes to your `main` branch and publish your updated site to
Netlify after a minute or two.

![Screenshot of merging the pull request in the codespace][ig21]

After you've merged your changes, select the `Delete branch...` button to remove the working branch from your
repository since you don't need it anymore. When prompted, make sure to check the box to suspend the codespace if
you're not going to go directly into another tutorial or keep working in the codespace.

![Screenshot of deleting the branch after merging in the codespace][ig22]

## Wrapping Up

In this tutorial, you:

- Created a new Platen site from the template
- Deployed your site to Netlify with a custom URL
- Created a codespace for working on your site
- Updated your configuration to match your project
- Reviewed and saved your changes
- Previewed your site with the new changes
- Merged and published your changes

From here on, you'll be able to use Netlify and GitHub to author and maintain your Platen site.

<!-- Footnotes -->
[^1]: [GitHub's Codespaces feature][04] has a number of free hours per month. If you use the smallest instance (2 cores
  and 4GB RAM), you get 60 hours free per month. If you use the medium instance (4 cores and 8GB RAM), you get 30 hours
  free per month. Any larger instance is wasted on Platen development, so we recommend against using them. We haven't
  noticed any performance issues when using the smallest instance, so we recommend you use that first. You can always
  change the size later, if you need to.

<!-- Link Reference Definitions -->
[01]:   https://github.com/join
[02]:   https://app.netlify.com/signup
[03]:   https://app.netlify.com/start/deploy?repository=https://github.com/platenio/platen-template
[04]:   https://github.com/features/codespaces
[05]:   https://github.com/michaeltlombardi/sprocky-games-coop
[06]:   https://docs.github.com/en/codespaces/the-githubdev-web-based-editor#about-the-githubdev-editor
[07]:   https://frontmatter.codes/
[i01]:  https://www.netlify.com/img/deploy/button.svg
[ig01]: images/netlify-github-link.png
[ig02]: images/github-web-opened.png
[ig03]: images/command-palette-create-new-codespace.png
[ig04]: images/command-palette-select-repo.png
[ig05]: images/command-palette-select-branch.png
[ig06]: images/command-palette-select-instance.png
[ig07]: images/opened-codespace.png
[ig08]: images/config-file-open.png
[ig09]: images/config-file-edited.png
[ig10]: images/repo-settings-open.png
[ig11]: images/frontmatter-config-open.png
[ig12]: images/source-control-changes.png
[ig13]: images/source-control-create-branch-menu.png
[ig14]: images/source-control-create-branch-name.png
[ig15]: images/source-control-staged-changes.png
[ig16]: images/source-control-commit-and-pr.png
[ig17]: images/source-control-pr-create.png
[ig18]: images/source-control-pr-publish-branch.png
[ig19]: images/pr-netlify-comment.png
[ig20]: images/pr-netlify-preview.png
[ig21]: images/source-control-merge-commit.png
[ig22]: images/source-control-delete-branch.png
[in01]: images/netlify-connect.png
[in02]: images/netlify-naming.png
[in03]: images/netlify-deployed-first-page.png
[in04]: images/netlify-site-settings.png
[in05]: images/netlify-naming-site.png
[in06]: images/netlify-site-link.png
[in07]: images/netlify-first-preview.png
