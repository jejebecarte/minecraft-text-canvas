import { CanvasRenderingContext2D } from "canvas";
import { fontOffset } from "..";
import getFormattedWidth from "./getFormattedWidth";
import wrapText from "./wrapText";

export default function setCanvasDimensions(text: string, ctx: CanvasRenderingContext2D) {
	// Wrap and strip the text of modifiers before finding it's height and width
	const wrappedText = wrapText(text, ctx);
	const unformattedText = wrappedText.replaceAll("&.", "");
	const measurement = ctx.measureText(unformattedText);
	const height = measurement.actualBoundingBoxAscent + measurement.actualBoundingBoxDescent;
	const width = getFormattedWidth(unformattedText, ctx);

	// Set canvas dimensions and reset font to adjust sizing
	ctx.canvas.height = height + fontOffset;
	ctx.canvas.width = width + fontOffset;
}
