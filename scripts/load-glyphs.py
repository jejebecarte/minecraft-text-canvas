import fontforge
import os

for i in range(2):
    is_regular = i == 0

    font = fontforge.activeFont() if is_regular else fontforge.font()
    font.encoding = "UnicodeFull"
    font.encoding = "compacted"
    font.comment = ""
    font.copyright = "Made by Jejebecarte\nhttps://github.com/jejebecarte/minecraft-text-canvas"
    font.familyname = "Minecraft" if is_regular else "Minecraft Italic"
    font.fontname = "Minecraft-Regular" if is_regular else "Minecraft-Italic"
    font.fullname = "Minecraft Regular" if is_regular else "Minecraft Italic"

    # BUG: Regular em size must be 24 - https://github.com/Automattic/node-canvas/issues/2434
    font.ascent = 20 if is_regular else 40
    font.descent = 4 if is_regular else 8
    font.uwidth = 0

    directory = os.fsencode("path/to/scripts/font/dist/{dir}".format(dir="regular" if is_regular else "italic"))

    for file in os.listdir(directory):
        filename = os.fsdecode(file)

        if filename.endswith(".png"):
            glyph = font.createChar(int(filename.removesuffix(".png"), base=16))

            # Prevent auto-hinting that ruins bitmap fonts and import outlines
            glyph.manualHints = True
            glyph.importOutlines(os.path.join(directory.decode("utf-8"), filename))

            # Trace outlines and remove superfluous edges
            glyph.autoTrace()
            glyph.removeOverlap()

            glyph.left_side_bearing = 0
            glyph.right_side_bearing = 2 if is_regular else 0

    # Manually set the space width
    space = font.createChar(32)
    space.width = 8 if is_regular else 16

    # TODO: Do characters ?{/ have Lpadding, and .\ Rpadding?
