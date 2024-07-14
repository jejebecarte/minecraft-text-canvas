# Minecraft font bitmaps

The `create-glyphs` script is a utility designed to slice Minecraft's original font sprite sheets into individual glyph bitmaps ready to be imported into [FontForge](https://fontforge.org/en-US/).

This script helps create a version of the Minecraft font with support beyond the limited extended ASCII character set provided by other distributions. Further, other versions of the font available online only supply a vectorised version of the italic font, instead of a properly rasterised edition that is required for this application.

Minecraft only stores the regular version of its font in its assets, utilising the following algorithms to create bold and italic text on the fly:

-   `Bold:` The character is drawn a second time over the original, this time one pixel to the right.

-   `Italic:` The character's resolution is tripled (e.g. a character that is normally `12x9` becomes `36x27`). The bottom row of pixels stay fixed, while every set of 4 rows above (and the remaining 3 at the top) are moved 1 pixel more to the right than the set directly below them.

> [!NOTE]
> Sometimes Minecraft, at least on version 1.16.5 renders italic text inconsistently. Given all other versions of the game render text at [triple the resolution](/scripts/font/images/correct-italic.png), the [quadruple resolution version](/scripts/font/images/incorrect-italic.png) was deemed to be incorrect and wasn't included in this version of the italic font.
>
> Further, the game seems to tuck characters into preceding ones so each vertical block is `3` pixels apart. This hasn't been included in this font either but could likely be calculated for each individual glyph by setting its width according to its height.

## Usage

1. Generate the glyph files, outputted as `.png`s in `scripts/font/dist`.

```bash
$ pnpm run create-glyphs
```

2. Replace the `directory` file path in `scripts/load-glyphs.py` with the absolute path to the `scripts/font/dist` directory. Create and open a new font in FontForge. Paste the edited script into the text area under `File > Execute Script` and click `OK`. This may take some time to execute.

3. Generate each font using `File > Generate Fonts...`:

-   Format: `OpenType (CFF)`
-   Uncheck `Validate Before Saving`
