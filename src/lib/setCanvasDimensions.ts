import { CanvasRenderingContext2D } from 'canvas';
import { FONT_OFFSET } from '../constants';
import wrapText from './wrapText';
import getFormattedWidth from './getFormattedWidth';

export default function setCanvasDimensions(text: string, ctx: CanvasRenderingContext2D) {
    // Wrap and strip the text of modifiers to find it's height and width
    const wrappedText = wrapText(text, ctx);
    const measurement = ctx.measureText(wrappedText);

    const height = measurement.actualBoundingBoxAscent + measurement.actualBoundingBoxDescent;
    const width = getFormattedWidth(wrappedText, ctx);

    // Set canvas dimensions
    ctx.canvas.height = height + FONT_OFFSET;
    ctx.canvas.width = width;
}
