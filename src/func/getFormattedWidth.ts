import { CanvasRenderingContext2D } from "canvas";

export default function getFormattedWidth(unformattedText: string, ctx: CanvasRenderingContext2D) {
	let totalWidth = 0;

	let cursor = 0;
	let isBold = false;
	let nextCharIsFormatter = false;

	for (const char of unformattedText) {
		if (char === "&") {
			nextCharIsFormatter = true;
		} else if (nextCharIsFormatter) {
			isBold = char === "l";
			nextCharIsFormatter = false;
		} else if (char === "\n") {
			cursor = 0;
		} else {
			let width = ctx.measureText(char).width;
			if (isBold) {
				width += 2;
			}

			cursor += width;

			if (cursor > totalWidth) {
				totalWidth = cursor;
			}
		}
	}

	return totalWidth;
}
