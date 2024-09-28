# Minecraft fonts

The `create-glyphs` script is a utility designed to slice Minecraft's original font sprite sheets into individual glyph bitmaps ready to be imported into [FontForge](https://fontforge.org/en-US/).

This script helps create a version of the Minecraft font with support beyond the limited extended ASCII character set provided by other distributions. Further, other versions of the font available online only supply a vectorised version of the italic font, instead of a properly rasterised edition that is required for this application.

Minecraft only stores the regular version of its font in its assets, utilising the following algorithms to create bold and italic text on the fly:

-   `Bold:` The character is drawn a second time over the original, this time one pixel to the right.

-   `Italic:` The character's resolution is quadrupled (e.g. a character that is normally `9x12` becomes `36x48`). The bottom 2 rows of pixels stay fixed, while every set of 4 rows above (and the remaining 2 at the top) are moved 1 pixel more to the right than the set directly below them.

> [!NOTE]
> Minecraft version 1.16.5 (and possibly other versions) render italic text inconsistently. The [quadruple resolution version](/scripts/images/correct-italic.png) was deemed correct and thus the [triple resolution version](/scripts/images/incorrect-italic.png) has not been included in the italic font.
>
> Further, the game seems to [tuck characters into preceding ones](/scripts/images/italic-tucking.png). This font does not include this feature.

Due to [this](https://github.com/Automattic/node-canvas/issues/1452) node-canvas issue, the italic and regular fonts must have different families, else styles can't be applied.

## Usage

1. Generate the glyph files, outputted as `.png`s in `scripts/font/dist`.

```bash
$ pnpm run create-glyphs
```

2. Replace the `directory` file path in `scripts/load-glyphs.py` with the absolute path to the `scripts/font/dist` directory.

3. Create and open a new font in FontForge. Paste the edited script into the text area under `File > Execute Script` and click `OK`. This may take some time to execute.

4. Generate each font using `File > Generate Fonts...`:

-   Format: `OpenType (CFF)`
-   Uncheck `Validate Before Saving`
