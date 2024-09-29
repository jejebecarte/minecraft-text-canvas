<h1 align="center">Minecraft Text Canvas</h1>
<p align="center">A simple TypeScript application to generate images of Minecraft text using markup.</p>
<div align="center">
    <a href="https://www.npmjs.com/package/minecraft-text-canvas" target="_blank" rel="noreferrer">
        <img alt="Monthly downloads" src="https://img.shields.io/npm/dm/minecraft-text-canvas.svg?color=blue">
    </a>
    <a href="https://www.npmjs.com/package/minecraft-text-canvas" target="_blank" rel="noreferrer">
        <img alt="npm version" src="https://img.shields.io/npm/v/minecraft-text-canvas.svg">
    </a>
    <a href="https://github.com/Jejebecarte/minecraft-text-canvas/blob/master/LICENSE" target="_blank" rel="noreferrer">
        <img alt="License: MIT" src="https://img.shields.io/npm/l/minecraft-text-canvas?color=green" />
    </a>
</div>

-   [Installation](#installation)
-   [Supported Markup](#supported-markup)
-   [Usage](#usage)
-   [Acknowledgements](#acknowledgements)
-   [License](#license)

## Installation

This package requires [Node.js](https://nodejs.org/) `=>18.12.0`.

Install via the package manager of your choice:

```bash
$ npm install minecraft-text-canvas
$ yarn add minecraft-text-canvas
$ pnpm add minecraft-text-canvas
```

## Supported Markup

<details>
<summary>Click to view</summary>

| Name         | Character |
| ------------ | --------- |
| Dark Red     | &4        |
| Red          | &c        |
| Gold         | &6        |
| Yellow       | &e        |
| Dark Green   | &2        |
| Green        | &a        |
| Aqua         | &b        |
| Dark Aqua    | &3        |
| Dark Blue    | &1        |
| Blue         | &9        |
| Light Purple | &d        |
| Dark Purple  | &5        |
| White        | &f        |
| Gray         | &7        |
| Dark Gray    | &8        |
| Black        | &0        |
| Bold         | &l        |
| Italic       | &o        |
| Reset        | &r        |
| Newline      | \n        |

</details>

## Usage

The following example simply renders an example input text with some basic markup:

```javascript
import render from 'minecraft-text-canvas';
const result = render('&cExample &r&btext');
```

The `result` variable is of type `TextCanvasResult`, which allows the image to be retrieved as a PNG/JPEG [`Buffer`](https://nodejs.org/api/buffer.html) or a PNG/JPEG [`Stream`](https://nodejs.org/api/stream.html#readable-streams).

For usage examples pertaining to `Stream`s, see the [node-canvas](https://github.com/Automattic/node-canvas) documentation on creating [PNG](https://github.com/Automattic/node-canvas?tab=readme-ov-file#canvascreatepngstream) and [JPEG streams](https://github.com/Automattic/node-canvas?tab=readme-ov-file#canvascreatejpegstream).

## Acknowledgements

This repository is based off the [hypixel-fake-chat](https://github.com/mat-1/hypixel-fake-chat) generator.

## License

This is an open-source project under the [MIT License](https://github.com/Jejebecarte/minecraft-chat-generator/blob/master/LICENSE).
