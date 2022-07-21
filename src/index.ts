import { createCanvas, registerFont } from "canvas";
import getFormattedWidth from "./func/getFormattedWidth";
import renderText from "./func/renderText";
import saveImage from "./util/saveImage";
import wrapText from "./func/wrapText";

registerFont("src/fonts/font.otf", { family: "Minecraft" });

// Set variables
export const fontSize = 8;
const font = `${fontSize}px Minecraft`;
const message = "This &dis the defau&lalt message";
const canvas = createCanvas(0, 0);
const ctx = canvas.getContext("2d");

// Add font for the first time - it will be reset later to adjust for changes in the canvas size. For now it's to calculate text dimensions
ctx.font = font;

// Wrap and strip the text of modifiers before finding it's height and width
const wrappedText = wrapText(message, ctx);
const unformattedText = wrappedText.replaceAll("&.", "");
const measurement = ctx.measureText(unformattedText);
const height = measurement.actualBoundingBoxAscent + measurement.actualBoundingBoxDescent;
const width = getFormattedWidth(unformattedText, ctx);

// Set canvas dimensions and reset font to adjust sizing
canvas.height = height + fontSize / 8;
canvas.width = width + fontSize / 8;

// Reset font and render text
ctx.font = font;
renderText(message, ctx);

// At last, save the final image
saveImage(canvas);
