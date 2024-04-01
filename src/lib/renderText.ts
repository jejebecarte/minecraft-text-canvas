import { CanvasRenderingContext2D } from 'canvas';
import {
    FONT_SIZE,
    FONT_OFFSET,
    SUPPORTED_MODIFIERS_GLOBAL,
    TEXT_COLORS,
    TEXT_SHADOW_COLORS,
    NEWLINE_REGEX,
} from '../constants';

export default function renderText(text: string, ctx: CanvasRenderingContext2D) {
    let cursorY = FONT_SIZE - FONT_OFFSET;

    text.split(NEWLINE_REGEX).forEach((line) => {
        let currentColor: number = TEXT_COLORS.f;
        let currentShadowColor: number = TEXT_SHADOW_COLORS.f;
        let isBold = false;
        let cursorX = 0;

        for (let i = 0; i < line.length; i++) {
            const char = line[i] as string;
            const nextChar = line[i + 1];

            // Check if this character and the next one are a supported modifier
            // WARNING: JavaScript has inconsistent RegEx test behaviour with the global flag enabled -
            // On consecutive test() calls, it begins searching from the index of the previous match.
            // For this reason, we have to create a new, non-global RegEx to test our expression. I hate JS.
            if (
                nextChar &&
                char === '&' &&
                new RegExp(SUPPORTED_MODIFIERS_GLOBAL.source).test(char + nextChar)
            ) {
                if (nextChar in TEXT_COLORS) {
                    currentColor = TEXT_COLORS[nextChar as HexDigit];
                    currentShadowColor = TEXT_SHADOW_COLORS[nextChar as HexDigit];
                } else if (nextChar === 'r') {
                    currentColor = TEXT_COLORS.f;
                    currentShadowColor = TEXT_SHADOW_COLORS.f;
                    isBold = false;
                } else if (nextChar === 'l') {
                    isBold = true;
                } else {
                    continue;
                }

                // Skip the next character as it is part of a modifying sequence
                i += 1;
            } else {
                const shadowX = cursorX + FONT_OFFSET;
                const shadowY = cursorY + FONT_OFFSET;

                // Draw shadow
                ctx.fillStyle = `#${currentShadowColor.toString(16)}`;
                ctx.fillText(char, shadowX, shadowY);
                if (isBold) {
                    ctx.fillText(char, shadowX + FONT_OFFSET, shadowY);
                }

                // Draw text
                ctx.fillStyle = `#${currentColor.toString(16)}`;
                ctx.fillText(char, cursorX, cursorY);
                if (isBold) {
                    ctx.fillText(char, cursorX + FONT_OFFSET, cursorY);
                }

                // Add extra space in between letters if character is bold
                let { width } = ctx.measureText(char);
                if (isBold) {
                    width += FONT_OFFSET;
                }

                cursorX += width;
            }
        }

        // Move the cursor down to the next line. Add double-spacing to account for shadow
        cursorY += FONT_SIZE + (FONT_OFFSET * 2);
    });
}
