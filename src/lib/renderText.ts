import { CanvasRenderingContext2D } from 'canvas';
import {
    FONT_SIZE,
    BOLD_SHADOW_OFFSET,
    SUPPORTED_FORMAT_CODES,
    TEXT_COLORS,
    TEXT_SHADOW_COLORS,
    NEWLINE_REGEX,
    FONT,
    ITALIC_FONT,
} from './constants';

export default function renderText(text: string, ctx: CanvasRenderingContext2D) {
    let cursorY = FONT_SIZE - BOLD_SHADOW_OFFSET;

    text.split(NEWLINE_REGEX).forEach((line) => {
        // Reset all properties
        let currentColor: number = TEXT_COLORS.f;
        let currentShadowColor: number = TEXT_SHADOW_COLORS.f;
        let isBold = false;
        let cursorX = 0;
        ctx.font = FONT;

        for (let i = 0; i < line.length; i++) {
            const char = line[i] as string;
            const nextChar = line[i + 1];

            // Check if this character and the next are a formatting code
            if (nextChar && char === '&' && `${char}${nextChar}`.match(SUPPORTED_FORMAT_CODES)) {
                if (nextChar in TEXT_COLORS) {
                    currentColor = TEXT_COLORS[nextChar as HexDigit];
                    currentShadowColor = TEXT_SHADOW_COLORS[nextChar as HexDigit];
                } else if (nextChar === 'r') {
                    currentColor = TEXT_COLORS.f;
                    currentShadowColor = TEXT_SHADOW_COLORS.f;
                    isBold = false;
                    ctx.font = FONT;
                } else if (nextChar === 'l') {
                    isBold = true;
                } else if (nextChar === 'o') {
                    ctx.font = ITALIC_FONT;
                } else {
                    continue;
                }

                // Skip the next character as it is part of a modifying sequence
                i += 1;
            } else {
                const shadowX = cursorX + BOLD_SHADOW_OFFSET;
                const shadowY = cursorY + BOLD_SHADOW_OFFSET;

                // Draw shadow
                ctx.fillStyle = `#${currentShadowColor.toString(16)}`;
                ctx.fillText(char, shadowX, shadowY);
                if (isBold) {
                    ctx.fillText(char, shadowX + BOLD_SHADOW_OFFSET, shadowY);
                }

                // Draw text
                ctx.fillStyle = `#${currentColor.toString(16)}`;
                ctx.fillText(char, cursorX, cursorY);
                if (isBold) {
                    ctx.fillText(char, cursorX + BOLD_SHADOW_OFFSET, cursorY);
                }

                // Add extra space in between letters if character is bold
                let { width } = ctx.measureText(char);
                if (isBold) {
                    width += BOLD_SHADOW_OFFSET;
                }

                cursorX += width;
            }
        }

        // Move the cursor down to the next line. Add double-spacing to account for shadow
        cursorY += FONT_SIZE;
    });
}
