import fontforge
import os

font = fontforge.activeFont()
font.encoding = "UnicodeFull"
font.encoding = "compacted"
font.copyright = "Made by Jejebecarte\nhttps://github.com/Jejebecarte/minecraft-text-canvas"
font.familyname = "Minecraft"
font.fontname = "Minecraft-Regular"
font.fullname = "Minecraft Regular"
font.uwidth = 0

directory = os.fsencode("absolute/path/to/scripts/font/dist/strike-8")

for file in os.listdir(directory):
    filename = os.fsdecode(file)

    if filename.endswith(".png"):
        glyph = font.createChar(int(filename.removesuffix(".png"), base=16))
        glyph.manualHints = True
        glyph.importOutlines(os.path.join(directory.decode("utf-8"), filename))
        glyph.autoTrace()
        glyph.right_side_bearing = 1

# Manually set the space width
space = font.createChar(32)
space.width = 2
