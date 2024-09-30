export const FONT_SIZE = 48;
export const BOLD_SHADOW_OFFSET = 4;
export const FONT = `${FONT_SIZE}px Minecraft`;
export const ITALIC_FONT = `${FONT_SIZE}px Minecraft Italic`;
export const SUPPORTED_FORMAT_CODES = /&(?:0|1|2|3|4|5|6|7|8|9|a|b|c|d|e|f|l|o|n|r)/g;
export const NEWLINE_REGEX = /$/gm;
export const CHAT_CODES = Object.freeze({
    BLACK: {
        char: '0',
        code: '&0',
        color: 0x000,
        shadowColor: 0x000,
    },
    DARK_BLUE: {
        char: '1',
        code: '&1',
        color: 0x00a,
        shadowColor: 0x00002b,
    },
    DARK_GREEN: {
        char: '2',
        code: '&2',
        color: 0x0a0,
        shadowColor: 0x002b00,
    },
    DARK_AQUA: {
        char: '3',
        code: '&3',
        color: 0x0aa,
        shadowColor: 0x002b2b,
    },
    DARK_RED: {
        char: '4',
        code: '&4',
        color: 0xa00,
        shadowColor: 0x2b0000,
    },
    DARK_PURPLE: {
        char: '5',
        code: '&5',
        color: 0xa0a,
        shadowColor: 0x2b002b,
    },
    GOLD: {
        char: '6',
        code: '&6',
        color: 0xfa0,
        shadowColor: 0x402b00,
    },
    GRAY: {
        char: '7',
        code: '&7',
        color: 0xaaa,
        shadowColor: 0x2b2b2b,
    },
    DARK_GRAY: {
        char: '8',
        code: '&8',
        color: 0x555,
        shadowColor: 0x151515,
    },
    BLUE: {
        char: '9',
        code: '&9',
        color: 0x55f,
        shadowColor: 0x151540,
    },
    GREEN: {
        char: 'a',
        code: '&a',
        color: 0x5f5,
        shadowColor: 0x154015,
    },
    AQUA: {
        char: 'b',
        code: '&b',
        color: 0x5ff,
        shadowColor: 0x154040,
    },
    RED: {
        char: 'c',
        code: '&c',
        color: 0xf55,
        shadowColor: 0x401515,
    },
    LIGHT_PURPLE: {
        char: 'd',
        code: '&d',
        color: 0xf5f,
        shadowColor: 0x401540,
    },
    YELLOW: {
        char: 'e',
        code: '&e',
        color: 0xff5,
        shadowColor: 0x404015,
    },
    WHITE: {
        char: 'f',
        code: '&f',
        color: 0xfff,
        shadowColor: 0x404040,
    },
    BOLD: {
        char: 'l',
        code: '&l',
    },
    UNDERLINE: {
        char: 'n',
        code: '&n',
    },
    ITALIC: {
        char: 'o',
        code: '&o',
    },
    RESET: {
        char: 'r',
        code: '&r',
    },
});
