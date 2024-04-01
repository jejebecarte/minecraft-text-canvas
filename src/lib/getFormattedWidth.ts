import { CanvasRenderingContext2D } from 'canvas';
import { FONT_OFFSET, NEWLINE_REGEX, SUPPORTED_MODIFIERS_GLOBAL } from '../constants';

const BOLD_REGEX = /&l(.*?)(?:&r|$)/g;

export default function getFormattedWidth(unformattedText: string, ctx: CanvasRenderingContext2D) {
    let greatestFormattedWidth = 0;

    // Remove all modifiers and split by line break to calculate text width
    unformattedText.split(NEWLINE_REGEX).forEach((line) => {
        let lineWidth = ctx.measureText(line.replaceAll(SUPPORTED_MODIFIERS_GLOBAL, '')).width;

        const boldSubstrings = line.match(BOLD_REGEX);
        boldSubstrings?.forEach((subStr) => {
            // Remove all modifiers in the text
            const subStrRemovedModifiers = subStr.replaceAll(SUPPORTED_MODIFIERS_GLOBAL, '');
            lineWidth += subStrRemovedModifiers.length * FONT_OFFSET;
        });

        // If this is the widest line, set the overall width accordingly
        if (greatestFormattedWidth < lineWidth) {
            greatestFormattedWidth = lineWidth;
        }
    });

    return greatestFormattedWidth;
}
