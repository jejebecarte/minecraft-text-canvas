import path from 'path';
import { createCanvas, registerFont } from 'canvas';
import setCanvasDimensions from './lib/setCanvasDimensions';
import renderText from './lib/renderText';
import TextCanvasResult from './lib/TextCanvasResult';

// Fonts must have different families, else styles can't be applied - https://github.com/Automattic/node-canvas/issues/1452
const fontFile = (fileName: string) => path.join(__dirname, 'fonts/', fileName);
registerFont(fontFile('minecraft-regular.otf'), { family: 'Minecraft' });
registerFont(fontFile('minecraft-italic.otf'), { family: 'Minecraft Italic' });

export { CHAT_CODES } from './lib/constants';

export default function render(text: string): TextCanvasResult {
    const canvas = createCanvas(0, 0);
    const ctx = canvas.getContext('2d');

    setCanvasDimensions(text, ctx);
    renderText(text, ctx);

    return new TextCanvasResult(canvas);
}
