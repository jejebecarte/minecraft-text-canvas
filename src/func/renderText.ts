import { TextColors, TextShadowColors } from "../util/TextColors";
import { fontOffset, fontSize } from "..";
import { CanvasRenderingContext2D } from "canvas";

export default function renderText(text: string, ctx: CanvasRenderingContext2D) {
	let cursorX = 0;
	let cursorY = fontSize - fontOffset;
	let nextCharIsFormatter = false;
	let currentColor = 0xfff;
	let currentShadowColor = 0x404040;

	let isBold = false;

	for (const char of text) {
		if (char === "&") {
			nextCharIsFormatter = true;
		} else if (nextCharIsFormatter) {
			if (char in TextColors) {
				currentColor = TextColors[char] as number;
				currentShadowColor = TextShadowColors[char] as number;
			} else if (char === "r") {
				currentColor = 0xfff;
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
