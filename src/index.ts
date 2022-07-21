import { createCanvas, registerFont } from "canvas";
import renderText from "./func/renderText";
import saveImage from "./util/saveImage";
import setCanvasDimensions from "./func/setCanvasDimensions";

registerFont("src/fonts/font.otf", { family: "Minecraft" });

// Set variables
export const fontSize = 8;
export const fontOffset = fontSize / 8;
const font = `${fontSize}px Minecraft`;
const text = "This &dis the defau&lalt message";
const canvas = createCanvas(0, 0);
const ctx = canvas.getContext("2d");

// Add font for the first time - it will be reset later to adjust for changes in the canvas size. For now it's to calculate text dimensions
ctx.font = font;
setCanvasDimensions(text, ctx);

// Reset font and render text
ctx.font = font;
renderText(text, ctx);

// At last, save the final image
saveImage(canvas);
