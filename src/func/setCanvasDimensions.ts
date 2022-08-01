import { CanvasRenderingContext2D } from "canvas";
import { fontOffset } from "..";
import getFormattedWidth from "./getFormattedWidth";
import wrapText from "./wrapText";

export default function setCanvasDimensions(text: string, ctx: CanvasRenderingContext2D) {
	// Wrap and strip the text of modifiers before finding it's height and width
	const wrappedText = wrapText(text, ctx);
	const measurement = ctx.measureText(wrappedText);

	const width = getFormattedWidth(wrappedText, ctx);
	const height = measurement.actualBoundingBoxAscent + measurement.actualBoundingBoxDescent;

	// Set canvas dimensions and reset font to adjust sizing
	ctx.canvas.width = width;
	ctx.canvas.height = height + fontOffset;
}
