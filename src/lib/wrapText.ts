import { CanvasRenderingContext2D } from 'canvas';
import { FONT_OFFSET } from '../constants';

export default function wrapText(text: string, ctx: CanvasRenderingContext2D) {
    let newText = '';
    let isBold = false;
    let cursor = 0;
    let nextCharIsFormatter = false;

    text.split('').forEach((char) => {
        if (char === '&') {
            nextCharIsFormatter = true;
        } else if (nextCharIsFormatter) {
            isBold = char === 'l';
            nextCharIsFormatter = false;
        } else if (char === '\n') {
            cursor = 0;
        } else {
            let { width } = ctx.measureText(char);
            if (isBold) {
                width += FONT_OFFSET;
            }

            cursor += width;
        }

        if (cursor > 1000) {
            newText += '\n';
            cursor = 0;
        }

        newText += char;
    });

    return newText;
}
