---
title: Installing Prerequisites
summary: >-
  Install the local prerequisites for authoring a Platen site.
weight: 1
draft: true
---

Setting up a Platen site locally requires a few different free tools. You'll need:

Hugo
: Platen relies on Hugo's extended version. We recommend running the latest available version. This
  section includes quick installation options. For more information, read [Hugo's install docs][01].

Go
: Platen is distributed as a [Hugo module][02]. Using Hugo modules requires [Go][03], the
  programming language Hugo's written in. You won't need to write any code.

Git
: [Git][04] is a tool for managing the changes and versioning of project files. While not strictly
  necessary, you'll quickly find yourself struggling to keep track of things without it and many
  useful integrations rely on it.

A text editor
: You need an application to write and edit your content and site configuration with. You can use
  any tool you like for this, but we recommend [VS Code][05].

````````````tabs { #install-per-platform }
  `````````tab { name="Windows" }
    The simplest way to install software on Windows is to use a package manager,
    like [Chocolatey] or [Scoop]. We recommend Chocolatey as the best all-around
    tool for managing software on your Windows machine.
    
    You can also install these tools manually.
    
    [Chocolatey]: https://docs.chocolatey.org/
    [Scoop]: https://scoop.sh/
  
    ``````tabs { #install-windows }
      ````tab { name="Chocolatey" }
      These commands assume Chocolatey is installed. They must be run from an
      elevated command line prompt. To learn how to install Chocolatey, see
      [Installing Chocolatey][a0].
      
      [a0]: https://chocolatey.org/install
      
      ```powershell
      choco install hugo-extended git golang vscode -y
      ```
      ````
      
      ````tab { name="Scoop" }
      These commands assume Scoop is installed. To learn how to install Scoop,
      see [Installation][b0] in the official documentation.
      
      [b0]: https://github.com/ScoopInstaller/Install#installation
      
      ```powershell
      scoop install hugo-extended git go vscode
      ```
      ````
      
      ```tab { name="Manual Install" }
      Use the following links to each tool's installation documentation.
      
      1. [Hugo][c0]
      1. [Git][c1]
      1. [Go][c2]
      1. [VS Code][c3]
      
      [c0]: https://gohugo.io/getting-started/installing/#windows
      [c1]: https://git-scm.com/download/win
      [c2]: https://go.dev/doc/install
      [c3]: https://code.visualstudio.com/docs/setup/windows
      ```
    ``````
  `````````

  `````````tab { name="macOS" }
    The simplest way to install software on macOS is to use a package manager,
    like [Homebrew].
    
    You can also install these tools manually.
    
    [Homebrew]: https://brew.sh/
    
    ``````tabs { #install-macos }
      ````tab { name="homebrew" }
      
      These commands assume Homebrew is installed. To learn how to install
      Homebrew, see [Installation][d0] in the official documentation.
      
      [d0]: https://docs.brew.sh/Installation
      
      ```sh
      brew install hugo git go
      brew install --cask visual-studio-code
      ```
      ````
      
      ```tab { name="Manual Install" }
      Use the following links to each tool's installation documentation.
      
      1. [Hugo][e0]
      1. [Git][e1]
      1. [Go][e2]
      1. [VS Code][e3]
      
      [e0]: https://gohugo.io/getting-started/installing/#macos
      [e1]: https://git-scm.com/download/mac
      [e2]: https://go.dev/doc/install
      [e3]: https://code.visualstudio.com/docs/setup/mac
      ```
    ``````
  `````````

  `````````tab { name="Linux" }
  The simplest way to install software on Linux is to use a package manager,
  like [snap].
  
  You can also install these tools manually. For OS-specific package managers
  and instructions, see the manual install tab.
  
  [snap]: https://snapcraft.io/docs/installing-snapd
  
  ``````tabs { #install-linux }
  
    ````tab { name="Snap" }
    If your distro supports snaps, you can install the tools with these commands:
    
    ```sh
    snap install hugo --channel=extended
    snap install go --channel=latest/stable
    snap install code --channel=latest/stable
    ```
    
    ```details { .info summary="Note" }
    Most Linux distros already have git installed.
    ```
    ````
  
    ```tab { name="Manual Install" }
    Use the following links to each tool's installation documentation.
    
    1. [Hugo][f0]
    1. [Git][f1]
    1. [Go][f2]
    1. [VS Code][f3]
    
    [f0]: https://gohugo.io/getting-started/installing/
    [f1]: https://git-scm.com/download/linux
    [f2]: https://go.dev/doc/install
    [f3]: https://code.visualstudio.com/docs/setup/linux
    ```
  ``````
  `````````

  `````````tab { name="Universal (Devcontainer)" }
  If you've already got VS Code installed and are familiar with [Docker][u0],
  you might prefer to use a [devcontainer][u1] instead of dealing with the
  software installations locally.

  You can use this definition:

  ```json
  {
      "image": "mcr.microsoft.com/devcontainers/go",
      "features": {
          "ghcr.io/devcontainers/features/hugo:1": {
              "extended": true
          },
          "ghcr.io/devcontainers/features/node:1": {
              "version": "latest"
          }
      },
      
      "customizations": {
          "vscode": {
              "extensions": [
                  "eliostruyf.vscode-front-matter-beta",
                  "davidanson.vscode-markdownlint",
                  "marvhen.reflow-markdown",
                  "darkriszty.markdown-table-prettify",
                  "wmaurer.change-case",
                  "nhoizey.gremlins",
                  "usernamehw.errorlens",
                  "eamodio.gitlens",
                  "tyriar.sort-lines",
                  "jock.svg",
                  "ms-vscode.wordcount",
                  "redhat.vscode-yaml"
              ]
          }
      },
      "forwardPorts": [
          1313
      ]
  }
  ```

  [u0]: https://www.docker.com/products/personal/
  [u1]: https://code.visualstudio.com/docs/devcontainers/containers
  `````````
````````````

[01]: https://gohugo.io/getting-started/installing/
[02]: https://gohugo.io/hugo-modules/
[03]: https://go.dev/learn/
[04]: https://git-scm.com/
[05]: https://code.visualstudio.com/
