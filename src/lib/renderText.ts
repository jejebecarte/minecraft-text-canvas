import { CanvasRenderingContext2D } from 'canvas';
import {
    FONT_SIZE,
    FONT_OFFSET,
    SUPPORTED_MODIFIERS_GLOBAL,
    TEXT_COLORS,
    TEXT_SHADOW_COLORS,
} from '../constants';

export default function renderText(text: string, ctx: CanvasRenderingContext2D) {
    let cursorX = 0;
    let cursorY = FONT_SIZE - FONT_OFFSET;
    let currentColor: number = TEXT_COLORS.f;
    let currentShadowColor: number = TEXT_SHADOW_COLORS.f;
    let isBold = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i] as string;
        const nextChar = text[i + 1];

        // Check if this character and the next one are a supported modifier
        // WARNING: JavaScript has inconsistent RegEx test behaviour with the global flag enabled -
        // On subsequent test() calls, it begins searching from the index of the previous match.
        // For this reason, we have to create a new, non-global RegEx to test our expression.
        // I hate JS.
        if (char === '&' && new RegExp(SUPPORTED_MODIFIERS_GLOBAL.source).test(char + nextChar)) {
            if (nextChar && nextChar in TEXT_COLORS) {
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
        } else if (char === '\n') {
            cursorX = 0;
            cursorY = FONT_SIZE * 2 + FONT_OFFSET;
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
}
