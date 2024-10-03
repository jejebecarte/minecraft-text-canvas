import { CanvasRenderingContext2D } from 'canvas';
import {
    BOLD_SHADOW_OFFSET,
    NEWLINE_REGEX,
    SUPPORTED_FORMAT_CODES,
    FONT_SIZE,
    ITALIC_FONT,
    FONT,
    CHAT_CODES,
    MAX_CANVAS_SIZE,
} from './constants';

export default function setCanvasDimensions(text: string, ctx: CanvasRenderingContext2D) {
    const lines = text.split(NEWLINE_REGEX);
    let widestLineWidth = 0;

    // TODO: reuse the results from the bold and italic substring search in renderText() - draw text in chunks, not char by char
    lines.forEach((line) => {
        // Find the width of the line if no characters are bold or italic
        ctx.font = FONT;
        let width = ctx.measureText(line.replaceAll(SUPPORTED_FORMAT_CODES, '')).width;

        // Add the extra width for bold substrings
        line.match(/&l(.*?)(?:&r|$)/gm)?.forEach((subStr) => {
            const modifiersRemoved = subStr.replaceAll(SUPPORTED_FORMAT_CODES, '');
            width += modifiersRemoved.length * BOLD_SHADOW_OFFSET;
        });

        // Add extra width for a starting strikethrough/underline
        if (line.match(/^&(?:n|m)/m)) {
            width += BOLD_SHADOW_OFFSET;
        }

        // Add extra width for an ending strikethrough/underline or italic (italic font has no right bearing)
        if (line.match(/&(?:n|m|o)(?:(?!&r).)*$/m)) {
            width += BOLD_SHADOW_OFFSET;
        }

        // Add the extra width for italic substrings
        [...line.matchAll(/&o(.*?)(?:&r|$)/gm)]?.forEach((match) => {
            const group = match[1]!;

            ctx.font = FONT;
            const normal = ctx.measureText(group.replaceAll(SUPPORTED_FORMAT_CODES, '')).width;

            ctx.font = ITALIC_FONT;
            let italic = ctx.measureText(group.replaceAll(SUPPORTED_FORMAT_CODES, '')).width;

            // Add the difference between the normal width and italic width
            width += italic - normal;
        });

        // If this is the widest line, set the overall width accordingly
        if (widestLineWidth < width) {
            widestLineWidth = width;
        }
    });

    // Extra height for underline shadow on the bottom line
    const underlineExtraheight = lines[lines.length - 1]?.includes(CHAT_CODES.UNDERLINE.code)
        ? BOLD_SHADOW_OFFSET
        : 0;

    // Add the shadow size to the height so it isn't cut off
    const height = FONT_SIZE * lines.length + BOLD_SHADOW_OFFSET + underlineExtraheight;

    if (widestLineWidth > MAX_CANVAS_SIZE || height > MAX_CANVAS_SIZE) {
        throw new Error(`Reached maximum canvas size of ${MAX_CANVAS_SIZE}px`);
    }

    ctx.canvas.width = widestLineWidth;
    ctx.canvas.height = height;
}
