import { CanvasRenderingContext2D } from 'canvas';
import { FONT_OFFSET } from './constants';
import getFormattedWidth from './getFormattedWidth';

export default function setCanvasDimensions(text: string, ctx: CanvasRenderingContext2D) {
    const measurement = ctx.measureText(text);
    const baseHeight = measurement.actualBoundingBoxAscent + measurement.actualBoundingBoxDescent;

    // Add the shadow size to the height so it isn't cut off
    ctx.canvas.height = baseHeight + FONT_OFFSET;
    ctx.canvas.width = getFormattedWidth(text, ctx);
}
