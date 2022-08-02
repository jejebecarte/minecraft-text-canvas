import { TextColors, TextShadowColors } from "../util/TextColors";
import { fontOffset, fontSize } from "..";
import { CanvasRenderingContext2D } from "canvas";
import isObjKey from "../util/isObjKey";

export default function renderText(text: string, ctx: CanvasRenderingContext2D) {
	let cursorX = 0;
	let cursorY = fontSize - fontOffset;
	let nextCharIsFormatter = false;
	let currentColor = TextColors["f"];
	let currentShadowColor = TextShadowColors["f"];

	let isBold = false;

	for (const char of text) {
		if (char === "&") {
			nextCharIsFormatter = true;
		} else if (nextCharIsFormatter) {
			if (isObjKey(char, TextColors)) {
				currentColor = TextColors[char];
				currentShadowColor = TextShadowColors[char];
			} else if (char === "r") {
				currentColor = TextColors["f"];
				currentShadowColor = TextShadowColors["f"];
				isBold = false;
			} else if (char === "l") {
				isBold = true;
			}

			nextCharIsFormatter = false;
		} else if (char === "\n") {
			cursorX = 0;
			cursorY = fontSize + Math.floor(fontSize / 4);
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
