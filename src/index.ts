import { createCanvas, registerFont } from "canvas";
import addNewLines from "./func/addNewLines";
import getFormattedWidth from "./func/getFormattedWidth";
import saveImage from "./util/saveImage";

registerFont("src/fonts/font.otf", { family: "Minecraft" });

const message = "This is the default message";
const canvas = createCanvas(0, 0);
const ctx = canvas.getContext("2d");

ctx.font = "16px Minecraft";

const textWithNewLines = addNewLines(message, ctx);
const unformattedText = textWithNewLines.replaceAll("&.", "");
const measurement = ctx.measureText(unformattedText);
const height = measurement.actualBoundingBoxAscent + measurement.actualBoundingBoxDescent;
const width = getFormattedWidth(unformattedText, ctx);

canvas.width = width;
canvas.height = height;

ctx.fillText(message, 0, 8);

saveImage(canvas);
