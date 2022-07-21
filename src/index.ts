import { createCanvas, registerFont } from "canvas";
import getFormattedWidth from "./func/getFormattedWidth";
import saveImage from "./util/saveImage";
import wrapText from "./func/wrapText";

registerFont("src/fonts/font.otf", { family: "Minecraft" });

// Set variables
const message = "This is the default message";
const canvas = createCanvas(0, 0);
const ctx = canvas.getContext("2d");
const fontSize = 8;

// Add font for the first time. The font will be reset later to adjust for changes in the canvas size, for now it's to calculate dimensions
ctx.font = `${fontSize}px Minecraft`;

// Wrap and strip the text of modifiers before finding it's height width
const wrappedText = wrapText(message, ctx);
const unformattedText = wrappedText.replaceAll("&.", "");
const measurement = ctx.measureText(unformattedText);
const height = measurement.actualBoundingBoxAscent + measurement.actualBoundingBoxDescent;
const width = getFormattedWidth(unformattedText, ctx);

// Set canvas dimensions and reset font to adjust sizing
canvas.height = height + fontSize / 8;
canvas.width = width + fontSize / 8;

ctx.textBaseline = "bottom";
ctx.font = `${fontSize}px Minecraft`;
ctx.fillText(message, 0, 0);

// At last, save the final image
saveImage(canvas);
