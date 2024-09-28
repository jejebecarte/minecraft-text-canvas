import { CanvasRenderingContext2D } from 'canvas';
import {
    BOLD_SHADOW_OFFSET,
    NEWLINE_REGEX,
    SUPPORTED_FORMAT_CODES,
    FONT_SIZE,
    ITALIC_FONT,
    FONT,
} from './constants';

const BOLD_REGEX = /&l(.*?)(?:&r|$)/gm;
const ITALIC_REGEX = /&o(.*?)(?:&r|$)/gm;

// TODO: Maximum JPEG size is 65_535 x 65_535
export default function setCanvasDimensions(text: string, ctx: CanvasRenderingContext2D) {
    const lines = text.split(NEWLINE_REGEX);
    let widestLineWidth = 0;

    // TODO: reuse the results from the bold and italic substring search in renderText() - draw text in chunks, not char by char
    lines.forEach((line) => {
        // Find the width of the line if no characters are bold or italic
        // ? This appears to always be BOLD_SHADOW_OFFSET wider than the text really is
        ctx.font = FONT;
        let width = ctx.measureText(line.replaceAll(SUPPORTED_FORMAT_CODES, '')).width;

        // Add the extra width for bold substrings
        line.match(BOLD_REGEX)?.forEach((subStr) => {
            const modifiersRemoved = subStr.replaceAll(SUPPORTED_FORMAT_CODES, '');
            width += modifiersRemoved.length * BOLD_SHADOW_OFFSET;
        });

        // Add the extra width for italic substrings
        [...line.matchAll(ITALIC_REGEX)]?.forEach((match) => {
            const group = match[1]!;

            ctx.font = FONT;
            const normal = ctx.measureText(group.replaceAll(SUPPORTED_FORMAT_CODES, '')).width;

            ctx.font = ITALIC_FONT;
            let italic = ctx.measureText(group.replaceAll(SUPPORTED_FORMAT_CODES, '')).width;

            // To account for regular width naturally being BOLD_SHADOW_OFFSET wider than it really is, do the same for italic text at the end of the line
            if (!match[0].endsWith('&r')) {
                italic += BOLD_SHADOW_OFFSET;
            }

            // Add the difference between the normal width and italic width
            width += italic - normal;
        });

        // If this is the widest line, set the overall width accordingly
        if (widestLineWidth < width) {
            widestLineWidth = width;
        }
    });

    // Add the shadow size to the height so it isn't cut off
    ctx.canvas.height = FONT_SIZE * lines.length + BOLD_SHADOW_OFFSET;
    ctx.canvas.width = widestLineWidth;
}
