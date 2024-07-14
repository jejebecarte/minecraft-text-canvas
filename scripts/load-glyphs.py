import fontforge
import os

for i in range(2):
    is_regular = i == 0

    font = fontforge.activeFont() if is_regular else fontforge.font()
    font.encoding = "UnicodeFull"
    font.encoding = "compacted"
    font.copyright = "Made by Jejebecarte\nhttps://github.com/Jejebecarte/minecraft-text-canvas"
    font.familyname = "Minecraft"
    font.fontname = "Minecraft-Regular" if is_regular else "Minecraft-Italic"
    font.fullname = "Minecraft Regular" if is_regular else "Minecraft Italic"

    font.ascent = 10 if is_regular else 30
    font.descent = 2 if is_regular else 6
    font.uwidth = 0

    directory = os.fsencode("C:/Users/24BosmNA/Documents/GitHub/minecraft-text-canvas/scripts/font/dist/{dir}"
                            .format(dir="regular" if is_regular else "italic"))

    for file in os.listdir(directory):
        filename = os.fsdecode(file)

        if filename.endswith(".png"):
            glyph = font.createChar(
                int(filename.removesuffix(".png"), base=16))

            # Prevent auto-hinting that ruins bitmap fonts and import outlines
            glyph.manualHints = True
            glyph.importOutlines(os.path.join(
                directory.decode("utf-8"), filename))

            # Trace outlines and remove superfluous edges
            glyph.autoTrace()
            glyph.removeOverlap()

            glyph.left_side_bearing = 0
            glyph.right_side_bearing = 1 if is_regular else 0

    # Manually set the space width
    space = font.createChar(32)
    space.width = 4 if is_regular else 12
