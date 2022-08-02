import { CanvasRenderingContext2D } from "canvas";
import { fontOffset } from "..";
import getSupportedModifiers from "../util/getSupportedModifiers";

export default function getFormattedWidth(unformattedText: string, ctx: CanvasRenderingContext2D) {
	let formattedWidth = 0;

	// Add extra width for bold characters. The bold modifier continues over line breaks
	const boldSubstrings = unformattedText.match(/&l(.*?)(?:&r|$)/gs);
	if (boldSubstrings) {
		for (let substring of boldSubstrings) {
			// Replace formatting strings left in the bold text to calculate extra width
			substring = substring.replaceAll(getSupportedModifiers(), "");

			formattedWidth += substring.length * fontOffset;
		}
	}

	// Remove all modifiers and split by line break to calculate text width
	const formattedTextArray = unformattedText.replaceAll(getSupportedModifiers(), "").split(/\r\n|\r|\n/g);
	for (const substring of formattedTextArray) {
		const substringWidth = ctx.measureText(substring).width;

		if (formattedWidth < substringWidth) {
			formattedWidth = substringWidth;
		}
	}

	return formattedWidth;
}
