---
title: Create a new Platen site
summary: >-
  Learn how to create a new website for digital books with Platen and Hugo
weight: 10
---

This article walks you through creating a new website for digital books with Platen and Hugo.

[Hugo][01] is a tool for quickly creating static websites you can deploy anywhere. Static sites
don't require setting up servers. Sites built with Hugo are fast, secure by default, and enable you
to write your content in plain text without needing to learn HTML.

Platen builds on Hugo, providing you with a set of tools that give you a clean and minimal theme you
can fully customize, extend Markdown for interactive books, and simplify your workflow. With Platen,
you can write your books once and then release them as web pages, EPUBs, and PDFs.

## Install Prerequisites

Setting up a Platen site locally requires a few different free tools. You'll need:

Hugo
: Platen relies on Hugo's extended version. We recommend running the latest available version. This
  section includes quick installation options. For more information, read [Hugo's install docs][02].

Go
: Platen is distributed as a [Hugo module][03]. Using Hugo modules requires [Go][04], the
  programming language Hugo's written in. You won't need to write any code.

Git
: [Git][05] is a tool for managing the changes and versioning of project files. While not strictly
  necessary, you'll quickly find yourself struggling to keep track of things without it and many
  useful integrations rely on it.

A text editor
: You need an application to write and edit your content and site configuration with. You can use
  any tool you like for this, but we recommend [VS Code][06].

### Windows

The simplest way to install software on Windows is to use a package manager, like [Chocolatey][07]
or [Scoop][08]. We recommend Chocolatey as the best all-around tool for managing software on your
Windows machine.

You can also install these tools manually.

{{% tabs "install-windows" %}}

{{% tab "Chocolatey" %}}

These commands assume Chocolatey is installed. They must be run from an elevated command line
prompt. To learn how to install Chocolatey, see [Installing Chocolatey][a0].

[a0]: https://chocolatey.org/install

```powershell
choco install hugo-extended git golang vscode -y
```

{{% /tab %}}

{{% tab "Scoop" %}}

These commands assume Scoop is installed. To learn how to install Scoop, see [Installation][b0] in
the official documentation.

[b0]: https://github.com/ScoopInstaller/Install#installation

```powershell
scoop install hugo-extended git go vscode
```

{{% /tab %}}

{{% tab "Manual Install" %}}

Use the following links to each tool's installation documentation.

1. [Hugo][c0]
1. [Git][c1]
1. [Go][c2]
1. [VS Code][c3]

[c0]: https://gohugo.io/getting-started/installing/#windows
[c1]: https://git-scm.com/download/win
[c2]: https://go.dev/doc/install
[c3]: https://code.visualstudio.com/docs/setup/windows

{{% /tab %}}

{{% /tabs %}}

### macOS

The simplest way to install software on macOS is to use a package manager, like [Homebrew][09].

You can also install these tools manually.

{{% tabs "install-macos" %}}

{{% tab "homebrew" %}}

These commands assume Homebrew is installed. To learn how to install Homebrew, see
[Installation][d0] in the official documentation.

[d0]: https://docs.brew.sh/Installation

```sh
brew install hugo git go
brew install --cask visual-studio-code
```

{{% /tab %}}

{{% tab "Manual Install" %}}

Use the following links to each tool's installation documentation.

1. [Hugo][e0]
1. [Git][e1]
1. [Go][e2]
1. [VS Code][e3]

[e0]: https://gohugo.io/getting-started/installing/#macos
[e1]: https://git-scm.com/download/mac
[e2]: https://go.dev/doc/install
[e3]: https://code.visualstudio.com/docs/setup/mac

{{% /tab %}}

{{% /tabs %}}

### Linux

The simplest way to install software on Linux is to use a package manager, like [snap][10].

You can also install these tools manually. For OS-specific package managers and instructions, see
the manual install tab.

{{% tabs "install-linux" %}}

{{% tab "Snap" %}}

If your distro supports snaps, you can install the tools with these commands:

```sh
snap install hugo --channel=extended
snap install go --channel=latest/stable
snap install code --channel=latest/stable
```

{{< hint info >}}

**Note:** Most Linux distros already have git installed.

{{< /hint >}}

{{% /tab %}}

{{% tab "Manual Install" %}}

Use the following links to each tool's installation documentation.

1. [Hugo][f0]
1. [Git][f1]
1. [Go][f2]
1. [VS Code][f3]

[f0]: https://gohugo.io/getting-started/installing/
[f1]: https://git-scm.com/download/linux
[f2]: https://go.dev/doc/install
[f3]: https://code.visualstudio.com/docs/setup/linux

{{% /tab %}}

{{% /tabs %}}

## Create a Platen Site

## Add Configuration

## Next Steps

[01]: https://gohugo.io/about/what-is-hugo
[02]: https://gohugo.io/getting-started/installing/
[03]: https://gohugo.io/hugo-modules/
[04]: https://go.dev/learn/
[05]: https://git-scm.com/
[06]: https://code.visualstudio.com/
[07]: https://docs.chocolatey.org/
[08]: https://scoop.sh/
[09]: https://brew.sh/
[10]: https://snapcraft.io/docs/installing-snapd
