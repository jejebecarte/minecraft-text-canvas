# Minecraft font bitmaps

The `create-bitmap-glyphs` script is a utility designed to slice Minecraft's original font sprite sheets into individual glyph bitmaps ready to be imported into [FontForge](https://fontforge.org/en-US/).

This script helps create a version of the Minecraft font with support beyond the limited extended ASCII character set provided by other distributions of the font. Further, other versions of the font available online only supplied a vectorised version of the italic font, instead of a properly rasterised edition that is required for this application.

Minecraft only stores the regular version of its font in its assets, utilising the following algorithms to create bold and italicised text on the fly:

-   `Bold:` The character is drawn a second time over the original, this time one pixel to the right.

-   `Italic:` The character's resolution is quadrupled (e.g. a character that is normally `8x8` becomes `32x32`). The bottom four rows of pixels stay fixed, while every set of 4 rows above is moved 1 pixel more to the right than the previous row.

## Usage

1. Generate the glyph files, outputted as `.png`s in `scripts/bitmap/dist`.

```bash
$ pnpm run create-bitmap-glyphs
```

2. Create a new font in FontForge and add an 8 pixel bitmap strike: `Ctrl/cmd + A > Element > Bitmap Strikes Available > Pixel Sizes`.

> [!NOTE]
> While the `nonlatin_european` and `ascii` character sets have a resolution of `8x8`, characters in the `accented` set are `9x12`. This may interfere with FontForge's bitmap strike settings but could most likely be worked around by creating a new strike.

3. Following [these](https://fontforge.org/docs/techref/autotrace.html) instructions, import the glyphs and autotrace the resulting background regions to generate the correct foreground glyphs.

> [!WARNING]
> This mass-import feature is currently broken and imports must be done individually. For this reason it is recommended to only add the extended ASCII character set until the feature is fixed. When this happens, italic font support will be added to this script to enable creating a correctly rasterised Minecraft font.
