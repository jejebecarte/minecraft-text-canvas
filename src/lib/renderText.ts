import { CanvasRenderingContext2D } from 'canvas';
import {
    FONT_SIZE,
    BOLD_SHADOW_OFFSET,
    SUPPORTED_FORMAT_CODES,
    NEWLINE_REGEX,
    FONT,
    ITALIC_FONT,
    CHAT_CODES,
} from './constants';

const getFillStyle = (color: number) => `#${color.toString(16)}`;

export default function renderText(text: string, ctx: CanvasRenderingContext2D) {
    let cursorY = FONT_SIZE - BOLD_SHADOW_OFFSET;

    text.split(NEWLINE_REGEX).forEach((line) => {
        let textFill = getFillStyle(CHAT_CODES.WHITE.color);
        let shadowFill = getFillStyle(CHAT_CODES.WHITE.shadowColor);
        let isBold = false;
        let isUnderlined = false;
        let cursorX = 0;
        ctx.font = FONT;

        for (let i = 0; i < line.length; i++) {
            const char = line[i] as string;
            const nextChar = line[i + 1];

            // Check if this character and the next are a formatting code
            if (nextChar && char === '&' && `${char}${nextChar}`.match(SUPPORTED_FORMAT_CODES)) {
                if ('0123456789abcdef'.includes(nextChar)) {
                    const code = Object.values(CHAT_CODES).find(
                        (color) => color.char === nextChar
                    ) as ColorCode;

                    textFill = getFillStyle(code.color);
                    shadowFill = getFillStyle(code.shadowColor);
                } else if (nextChar === 'r') {
                    textFill = getFillStyle(CHAT_CODES.WHITE.color);
                    shadowFill = getFillStyle(CHAT_CODES.WHITE.shadowColor);
                    isBold = false;
                    isUnderlined = false;
                    ctx.font = FONT;
                } else if (nextChar === CHAT_CODES.BOLD.char) {
                    isBold = true;
                } else if (nextChar === CHAT_CODES.ITALIC.char) {
                    ctx.font = ITALIC_FONT;
                } else if (nextChar === CHAT_CODES.UNDERLINE.char) {
                    isUnderlined = true;
                } else {
                    continue;
                }

                // Skip the next character as it is part of a modifying sequence
                i += 1;
            } else {
                let { width } = ctx.measureText(char);

                // Add space for underlined first char
                if (isUnderlined && cursorX === 0) {
                    cursorX += BOLD_SHADOW_OFFSET;
                }

                const shadowX = cursorX + BOLD_SHADOW_OFFSET;
                const shadowY = cursorY + BOLD_SHADOW_OFFSET;

                // Draw shadow
                ctx.fillStyle = shadowFill;
                ctx.fillText(char, shadowX, shadowY);
                if (isBold) {
                    ctx.fillText(char, shadowX + BOLD_SHADOW_OFFSET, shadowY);
                }

                // Draw text
                ctx.fillStyle = textFill;
                ctx.fillText(char, cursorX, cursorY);
                if (isBold) {
                    ctx.fillText(char, cursorX + BOLD_SHADOW_OFFSET, cursorY);
                }

                // Add extra spacing if character is bold
                if (isBold) {
                    width += BOLD_SHADOW_OFFSET;
                }

                // Draw underline
                if (isUnderlined) {
                    ctx.fillStyle = shadowFill;
                    ctx.fillRect(
                        cursorX,
                        cursorY + 2 * BOLD_SHADOW_OFFSET,
                        width + BOLD_SHADOW_OFFSET,
                        BOLD_SHADOW_OFFSET
                    );

                    ctx.fillStyle = textFill;
                    ctx.fillRect(
                        cursorX - BOLD_SHADOW_OFFSET,
                        cursorY + BOLD_SHADOW_OFFSET,
                        width + BOLD_SHADOW_OFFSET,
                        BOLD_SHADOW_OFFSET
                    );
                }

                cursorX += width;
            }
        }

        // Move the cursor down to the next line. Add double-spacing to account for shadow
        cursorY += FONT_SIZE;
    });
}
