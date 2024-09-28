export const FONT_SIZE = 48;
export const BOLD_SHADOW_OFFSET = 4;
export const FONT = `${FONT_SIZE}px Minecraft`;
export const ITALIC_FONT = `${FONT_SIZE}px Minecraft Italic`;
export const SUPPORTED_FORMAT_CODES = /&(?:0|1|2|3|4|5|6|7|8|9|a|b|c|d|e|f|l|o|r)/g;
export const NEWLINE_REGEX = /$/gm;
export const TEXT_COLORS: Record<HexDigit, number> = {
    '0': 0x000,
    '1': 0x00a,
    '2': 0x0a0,
    '3': 0x0aa,
    '4': 0xa00,
    '5': 0xa0a,
    '6': 0xfa0,
    '7': 0xaaa,
    '8': 0x555,
    '9': 0x55f,
    a: 0x5f5,
    b: 0x5ff,
    c: 0xf55,
    d: 0xf5f,
    e: 0xff5,
    f: 0xfff,
} as const;

export const TEXT_SHADOW_COLORS: Record<HexDigit, number> = {
    '0': 0x000,
    '1': 0x00002b,
    '2': 0x002b00,
    '3': 0x002b2b,
    '4': 0x2b0000,
    '5': 0x2b002b,
    '6': 0x402b00,
    '7': 0x2b2b2b,
    '8': 0x151515,
    '9': 0x151540,
    a: 0x154015,
    b: 0x154040,
    c: 0x401515,
    d: 0x401540,
    e: 0x404015,
    f: 0x404040,
} as const;
