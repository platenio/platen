---
title: Host a Webring
summary: How to use the Toroidal module to host a webring with Hugo.
weight: 1
---

Toroidal is a Hugo module that helps you host webrings from your static site. This article explains
how to install Toroidal and use it to host your first webring.

## Installing Toroidal

To use Toroidal to host a webring, you need to have a Hugo site. Toroidal has a few prerequisites:

- Hugo v0.105.0 or newer. Toroidal is a module that extends Hugo's functionality. To install Hugo,
  see [Hugo's documentation][01]
- Go 1.18 or newer. Go is required to use Hugo modules like Toroidal. To install Golang, see the
  [Go documentation][02].

{{< details title="About Go" class="info" open=true >}}
  Even though Hugo and Toroidal requires Go, a programming language, you won't be doing any
  programming to use this module. It's only needed for managing Hugo modules.
{{< /details >}}

With Hugo and Go installed, you'll need to make sure your site is set up to use Hugo Modules. See
the [Use Hugo Modules][03] article in Hugo's documentation to do so.

Next, add Toroidal to your Hugo site's [configuration][04] with the following snippet:

```yaml
# config.yaml
module:
  imports:
    - path: 'github.com/platenio/platen/modules/toroidal'
```

With the Toroidal module added to you site configuration, you need to run a command to get Hugo to
retrieve the module for you.

```sh
hugo mod get -u github.com/platenio/platen/modules/toroidal
```

Now you're ready to add your first webring.

## Adding a Webring

The fastest way to add a new webring is to use the [`hugo new` command][05].

```sh
hugo new --kind toroidal-webring webrings/example-webring
```

This command creates a new Toroidal webring in `content/webrings/example-webring` and sets the
webring name to `Example Webring`.

The only configuration you can supply when using `hugo new` is the name of your webring and where it
exists in your content folder. Hugo sets the name of your webring to the last part of the path,
replacing the dashes (`-`) with spaces and title casing the name. That turns `my-neat-webring` into
`My Neat Webring`.

You can specify a path in your content folder by prefixing the name with the folder structure
you want. To add your webring to the root of your site, don't include a prefix.

```sh
hugo new --kind toroidal-webring my-neat-webring
```

This example creates a webring called `My Neat Webring` in the root of the content folder.

## Defining Members

With your webring created, you need to define your webring's members. You can do this with the
`hugo new` command too.

```sh
hugo new --kind toroidal-member webrings/example-webring/my-first-member.md
```

This command creates the `my-first-member.md` file in `content/webrings/example-webring` and
sets the name of the member to `My First Member`. As with creating a webring, the only options
you can use with the `hugo new` command is the name of the member and the path to their file.

When your first member file is created, you need to edit it. The file looks like this when
created (with your specified name instead):

```md
---
# For more information about the available options for defining a member site,
# see: http://platen.io/schemas/Toroidal/Content/Member/
name: First Member
description: |
  A short summary of the member's site
weight: 1 # Replace with desired weight.
ToroidalHomePage: https://member.com # Replace with the member's actual site
---
```

You should update the [sref:`description`] field to be a 1--3 sentence summary of the member site.
This value is used in the member list page for the webring to help visitors get a quick
understanding of each member.

You also need to update the [sref:`ToroidalHomePage`] field to the URL of the member site. This is
the URL that is actually used in the member list page and in member navigation to direct visitors to
each site in the webring.

### Adding More Members

You must add at least two member pages to the webring you created for it to work. You can add
another member with `hugo new`. Make sure to specify the path to the webring's folder in your
site and the name of the member.

```sh
hugo new --kind toroidal-member webrings/example-webring/another-member.md
```

As before, you need to edit the file.

```md
---
# For more information about the available options for defining a member site,
# see: http://platen.io/schemas/Toroidal/Content/Member/
name: Another Member
description: |
  A short summary of the member's site
weight: 1 # Replace with desired weight.
ToroidalHomePage: https://member.com # Replace with the member's actual site
---
```

This time, in addition to defining the [sref:`description`] and [sref:`ToroidalHomePage`] fields, you need to
update the [sref:`weight`]. Incremement it by one from the last member's value. For your second member,
`weight` should be set to `2`. For your third, `3`, and so on.

The [sref:`weight`] field is used to determine the order of member sites in the list and ensure that
visitors are able to cycle reliably through the list of members. You can reorder members however
you like, but they must _all_ have a defined [sref:`weight`] and none of the weights should be the same.

## Previewing Your Webring

Now that you've created a webring and added members, you can preview it locally by running
`hugo serve`. This builds your site content and hosts a local lightweight webserver you can
use to see your site before you publish it.

```sh
hugo serve
```

By default, your site is available at `http://localhost:1313`. Open that page in your browser and
navigate to your webring. If you added your webring at `webrings/example-webring`, you'll go to
`http://localhost:1313/webrings/example-webring/`.

Here you should see your list of members beneath the title `Members of the Example Webring`.
Clicking a member's name sends you to their home page, which you defined in the
[sref:`ToroidalHomePage`] setting for that member's definition file.

Great! But there's more you can do here. First, navigate to the administration page for your
webring. This is always a page called `admin` in your webring's section. If you added your
webring at `webrings/example-webring`, you'll go to `http://localhost:1313/webrings/example-webring/admin/`.

This page is to make things easier on you as the webring administrator and on your members. When you
publish your site, you can give the published URL for the administration page to your members. From
here, they can copy the HTML snippets they need to add the webring navigation to their own site.

You can also preview the navigation that members can add to their site by navigating to their
definition page. These pages are hidden from the Hugo menu, but you can access them directly.

If you created a member with the file name `my-neat-member` in a webring defined in
`webrings/example-webring`, you would navigate to
`http://localhost:1313/webrings/example-webring/my-neat-member/`.

By default, the member definition page shows the webring name as the title with a list of links:

- `Previous` to take a site visitor to the prior member in the webring
- `Member List` to take a site visitor to the member list on the host
- `Random` to take a site visitor to a random member in the webring
- `Next` to take a site visitor to the next member in the webring

{{< details title="Working Example" class="info" open=true >}}
You can also see a working example of a webring on this site. You can visit the [member list] and
the [administration page]. The member links don't go to a real site, but otherwise you can see
how things look.

[member list]: /modules/toroidal/webrings/example-webring
[administration page]: /modules/toroidal/webrings/example-webring/admin
{{< /details >}}

## Adding Webring Navigation to Member Sites

Members can navigate to the Members have the option to copy a literal HTML snippet or an iframe snippet.

The iframe snippet is configuration free: members copy the snippet, add it where they want on their
site, and that's it. The downside to the iframe method is that members have no control over the
styling for the navigation. It's just a window into the navigation as defined on the host.

The literal snippet is more flexible and robust, but requires members to style the navigation
themselves. They can copy it anywhere on their site. However, the literal snippet is designed so
that it can continue to work even if the host is temporarily unavailable, unlike the iframe snippet.

It's up to each member which method they want to use to host the webring navigation. From the
hosting perspective, there's no meaningful difference.

## Further Configuration

When you create a Toroidal webring for the first time, the module, webring, and member pages are
created with minimal and functional configuration. You can modify the styling, presentation, and
functionality.

For more information, see the [sref:site configuration], [sref:webring section configuration], and
[sref:member configuration] documentation.

<!-- Link References -->
[01]: https://gohugo.io/installation/
[02]: https://go.dev/doc/install
[03]: https://gohugo.io/hugo-modules/use-modules/
[04]: https://gohugo.io/getting-started/configuration/
[05]: https://gohugo.io/commands/hugo_new/
[sref:site configuration]: Toroidal.Site.Config
[sref:webring section configuration]: Toroidal.Content.Section
[sref:member configuration]: Toroidal.Content.Member
[sref:`description`]: Toroidal.Content.Member.description
[sref:`ToroidalHomePage`]: Toroidal.Content.Member.ToroidalHomePage
[sref:`weight`]: Toroidal.Content.Member.weight
