<!-- markdownlint-disable MD033 MD041-->
<!-- Navigate back to top -->
<a name="readme-top"></a>
<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Code License: MIT][license-code-shield]][license-code-url]
[![License: CC-BY][license-shield]][license-url]
[![Contributor Covenant][coc-shield]][coc-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/platenio/platen">
    <img src="site/static/images/logo.svg" alt="Logo" width="240" height="80">
  </a>

  <h3 align="center">Platen</h3>

  <p align="center">
    A toolkit providing scaffolding of digital tabletop gaming tools and other interactive web
    books. Platen shortens the distance between creators and digital versions of their texts that
    are accessible, interactive, responsive, and---above all---delightful to author and maintain.
    <br />
    <a href="https://platen.io"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://platen.io/getting-started/happy-path-setup/"><strong>Get Started with Platen »</strong></a>
    <br />
    <br />
    <a href="https://flagrant.garden">View Demo</a>
    ·
    <a href="https://github.com/platenio/platen/issues">Report Bug</a>
    ·
    <a href="https://github.com/platenio/platen/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <!-- <li><a href="#usage">Usage</a></li> -->
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

Platen is a collection of [Hugo][hugo-url] modules, tools, and guides for helping tabletop game
authors digital editions of their works as incredible as their physical editions. With Platen, you
can write your games in Markdown and

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

[![Hugo][hugo-shield]][hugo-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

<!-- This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps. -->

### Prerequisites

[![Hugo extended v0.108.0+][hugo-shield-minimum]][hugo-install]

Platen relies on the extended version of Hugo. For more information, see [Hugo's notes][hugo-ext].
For full installation instructions, see [Hugo's documentation][hugo-install].

[hugo-shield-minimum]: https://img.shields.io/badge/Hugo%20Extended-%5E0.108.0-ff4088?style=for-the-badge&logo=hugo
[hugo-install]: https://gohugo.io/getting-started/installing/
[hugo-ext]: https://gohugo.io/news/0.48-relnotes/

### Installation

You can add Platen to your Hugo site as a module.

Start with initializing hugo modules, if not done yet:

```sh
hugo mod init github.com/repo/path
```

Navigate to your hugo project root and add [module] section to your `config.yaml`:

```yaml
module:
  imports:
    - path: github.com/platenio/platen/modules/platen
```

Then, to load/update the theme module and run hugo:

```sh
hugo mod get -u
hugo server --minify
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

- [ ] Write getting started guide
  - [ ] Document shortcodes
  - [ ] Schematize configuration
  - [ ] Document configuration
- [ ] Write user handbook
  - [ ] Document styles
  - [ ] Document customization
  - [ ] Document Front Matter usage
  - [ ] Document suggested practices
- [ ] Write module developer guide
- [ ] Write contributor guide

See the [open issues](https://github.com/platenio/platen/issues) for a full list of
proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and
create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repository and create a pull
request. You can also open an issue with the tag `enhancement`. Don't forget to give the project a
star! Thanks again!

1. Fork the Project
1. Create your Feature Branch (`git checkout -b feature/main/AmazingFeature`)
1. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
1. Push to the Branch (`git push origin feature/main/AmazingFeature`)
1. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

The code in this project is distributed under [the MIT License][license-code-url]. The documentation
and other non-code files are licensed [CC-BY][license-url].

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Find me on twitter [@BigFnMikey][twitter].

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments

- Forked with 💜 from [hugo-book][hugo-book] by [Alex Shpak][hugo-book-author].

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Link References -->
[contributors-shield]: https://img.shields.io/github/contributors/platenio/platen.svg?style=for-the-badge
[contributors-url]: https://github.com/platenio/platen/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/platenio/platen.svg?style=for-the-badge
[forks-url]: https://github.com/platenio/platen/network/members
[stars-shield]: https://img.shields.io/github/stars/platenio/platen.svg?style=for-the-badge
[stars-url]: https://github.com/platenio/platen/stargazers
[issues-shield]: https://img.shields.io/github/issues/platenio/platen.svg?style=for-the-badge
[issues-url]: https://github.com/platenio/platen/issues
[license-code-shield]: https://img.shields.io/badge/Code%20License-MIT-green?style=for-the-badge
[license-shield]: https://img.shields.io/badge/License-CC--BY_4.0-blue?style=for-the-badge
[license-code-url]: https://github.com/platenio/platen/blob/main/LICENSE-CODE
[coc-shield]: https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg?style=for-the-badge
[coc-url]: https://github.com/platenio/platen/blob/main/.github/code_of_conduct.md
[hugo-shield]: https://img.shields.io/badge/Hugo-ff4088?style=for-the-badge&logo=hugo&logoColor=white
[hugo-url]: https://gohugo.io/
[hugo-book]: https://github.com/alex-shpak/hugo-book
[hugo-book-author]: https://github.com/alex-shpak
[license-url]: https://github.com/platenio/platen/blob/main/LICENSE
[twitter]: https://twitter.com/BigFnMikey
