import { CanvasRenderingContext2D } from "canvas";
import { fontOffset } from "..";
import getSupportedModifiers from "../util/getSupportedModifiers";

export default function getFormattedWidth(unformattedText: string, ctx: CanvasRenderingContext2D) {
	let formattedWidth = 0;
	let isBold = false;

	// Remove all modifiers and split by line break to calculate text width
	const wrappedText = unformattedText.split(/\r\n|\r|\n/g);
	for (let line of wrappedText) {
		let lineWidth = ctx.measureText(line.replaceAll(getSupportedModifiers(), "")).width;

		// Prefix the line with '&l' so it fits the bold-matching regex
		if (isBold) {
			line = "&l" + line;
		}

		const boldSubstrings = line.match(/&l(.*?)(?:&r|$)/g);
		if (boldSubstrings) {
			// Check if the bold modifier extends to the next line
			isBold = !boldSubstrings[-1]?.endsWith("&r");

			for (let boldSubstring of boldSubstrings) {
				// Remove all modifiers in the text
				boldSubstring = boldSubstring.replaceAll(getSupportedModifiers(), "");

				lineWidth += boldSubstring.length * fontOffset;
			}
		}

		// If this is the widest line, set the overall width accordingly
		if (formattedWidth < lineWidth) {
			formattedWidth = lineWidth;
		}
	}

	return formattedWidth;
}
