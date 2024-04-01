import { CanvasRenderingContext2D } from 'canvas';
import { FONT_OFFSET, SUPPORTED_MODIFIERS_GLOBAL } from '../constants';

const BOLD_REGEX = /&l(.*?)(?:&r|$)/g;

export default function getFormattedWidth(unformattedText: string, ctx: CanvasRenderingContext2D) {
    let greatestFormattedWidth = 0;
    let isBold = false;

    // Remove all modifiers and split by line break to calculate text width
    const wrappedText = unformattedText.split(/\r\n|\r|\n/g);
    wrappedText.forEach((line) => {
        let lineWidth = ctx.measureText(line.replaceAll(SUPPORTED_MODIFIERS_GLOBAL, '')).width;

        // If bold carries over from previous line, prefix the line with '&l' so it fits the regex
        const boldSubstrings = isBold ? `&l${line}`.match(BOLD_REGEX) : line.match(BOLD_REGEX);
        if (boldSubstrings) {
            // Check if the bold modifier extends to the next line
            isBold = !boldSubstrings[-1]?.endsWith('&r');

            boldSubstrings.forEach((subStr) => {
                // Remove all modifiers in the text
                const subStrRemovedModifiers = subStr.replaceAll(SUPPORTED_MODIFIERS_GLOBAL, '');
                lineWidth += subStrRemovedModifiers.length * FONT_OFFSET;
            });
        }

        // If this is the widest line, set the overall width accordingly
        if (greatestFormattedWidth < lineWidth) {
            greatestFormattedWidth = lineWidth;
        }
    });

    return greatestFormattedWidth;
}
