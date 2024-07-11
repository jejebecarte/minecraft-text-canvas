# Minecraft font bitmaps

The `create-glyphs` script is a utility designed to slice Minecraft's original font sprite sheets into individual glyph bitmaps ready to be imported into [FontForge](https://fontforge.org/en-US/).

This script helps create a version of the Minecraft font with support beyond the limited extended ASCII character set provided by other distributions. Further, other versions of the font available online only supply a vectorised version of the italic font, instead of a properly rasterised edition that is required for this application.

Minecraft only stores the regular version of its font in its assets, utilising the following algorithms to create bold and italic text on the fly:

-   `Bold:` The character is drawn a second time over the original, this time one pixel to the right.

-   `Italic:` The character's resolution is quadrupled (e.g. a character that is normally `8x8` becomes `32x32`). The bottom four rows of pixels stay fixed, while every set of 4 rows above is moved 1 pixel more to the right than the previous row.

## Usage

1. Generate the glyph files, outputted as `.png`s in `scripts/font/dist`.

```bash
$ pnpm run create-glyphs
```

2. Create a new font in FontForge and set glyph metrics under `Element > Font Info > General`:

-   Ascent: `7`
-   Descent: `1`
-   Underline Height: `0`

> [!NOTE]
> While the `nonlatin_european` and `ascii` character sets have a resolution of `8x8`, characters in the `accented` set are `9x12`. This interferes with the ascent and descent settings and so characters in the `accented` sprite sheet haven't been included in the final font.

3. Replace the `directory` file path in `scripts/load-glyphs.py` with the absolute path to the `strike-8` directory. Paste the edited script into the text area under `File > Execute Script` and click `OK`. This may take some time to execute.

4. Generate the font using `File > Generate Fonts...`:

-   Format: `OpenType (CFF)`
-   Uncheck `Validate Before Saving`
