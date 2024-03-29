import { createCanvas, registerFont } from 'canvas';
import { FONT_SIZE } from './constants';
import setCanvasDimensions from './lib/setCanvasDimensions';
import renderText from './lib/renderText';

registerFont('src/fonts/minecraft.otf', { family: 'Minecraft' });
const font = `${FONT_SIZE}px Minecraft`;

export default function getPNGBuffer(text: string): Buffer {
    const canvas = createCanvas(0, 0);
    const ctx = canvas.getContext('2d');

    // Add font for the first time - it will be reset later to adjust for changes in the canvas size. For now it's to calculate text dimensions
    ctx.font = font;
    setCanvasDimensions(text, ctx);

    // Reset font and render text
    ctx.font = font;
    renderText(text, ctx);

    return canvas.toBuffer();
}
