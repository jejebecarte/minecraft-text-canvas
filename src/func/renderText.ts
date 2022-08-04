import { TextColors, TextShadowColors } from "../util/TextColors";
import { fontOffset, fontSize } from "..";
import { CanvasRenderingContext2D } from "canvas";
import getSupportedModifiers from "../util/getSupportedModifiers";
import isObjKey from "../util/isObjKey";

export default function renderText(text: string, ctx: CanvasRenderingContext2D) {
	let cursorX = 0;
	let cursorY = fontSize - fontOffset;
	let currentColor = TextColors["f"];
	let currentShadowColor = TextShadowColors["f"];
	let isBold = false;

	for (let i = 0; i < text.length; i++) {
		const char = text[i] as string;
		const nextChar = text[i + 1];

		// Check if this character and the next one are a supported formatter
		if (char === "&" && getSupportedModifiers().test(char + nextChar)) {
			if (isObjKey(nextChar, TextColors)) {
				currentColor = TextColors[nextChar];
				currentShadowColor = TextShadowColors[nextChar];
			} else if (nextChar === "r") {
				currentColor = TextColors["f"];
				currentShadowColor = TextShadowColors["f"];
				isBold = false;
			} else if (nextChar === "l") {
				isBold = true;
			} else {
				continue;
			}

			// Skip the next character as it is modifying
			i += 1;
		} else if (char === "\n") {
			cursorX = 0;
			cursorY = fontSize * 2 + fontOffset;
		} else {
			const shadowX = cursorX + fontOffset;
			const shadowY = cursorY + fontOffset;

			// Draw shadow
			ctx.fillStyle = `#${currentShadowColor.toString(16)}`;
			ctx.fillText(char, shadowX, shadowY);
			if (isBold) {
				ctx.fillText(char, shadowX + fontOffset, shadowY);
			}

			// Draw text
			ctx.fillStyle = `#${currentColor.toString(16)}`;
			ctx.fillText(char, cursorX, cursorY);
			if (isBold) {
				ctx.fillText(char, cursorX + fontOffset, cursorY);
			}

			// Add extra space in between letters if character is bold
			let width = ctx.measureText(char).width;
			if (isBold) {
				width += fontOffset;
			}

			cursorX += width;
		}
	}
}
