import { CanvasRenderingContext2D } from "canvas";
import TextColors from "../util/TextColors";
import { fontSize } from "..";

export default function renderText(text: string, ctx: CanvasRenderingContext2D) {
	let cursorX = 0;
	let cursorY = 8;
	let nextCharIsFormatter = false;
	let currentColor = 0xfff;
	let isBold = false;

	for (const char of text) {
		console.log(currentColor, nextCharIsFormatter);
		if (char === "&") {
			nextCharIsFormatter = true;
		} else if (nextCharIsFormatter) {
			if (char in TextColors) {
				currentColor = TextColors[char] as number;
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
			let charYOffset = 0;

			// The font has weird positioning for these characters
			if (char === "+" || char === "-") {
				charYOffset = -2;
			}

			const shadowColor = currentColor * 0.25;
			const shadowX = cursorX + fontSize / 8;
			const shadowY = cursorX + fontSize / 8 + charYOffset;

			// TODO: draw shadow
			ctx.fillStyle = `#${shadowColor.toString(16)}`;
			ctx.fillText(char, shadowX, shadowY);

			// TODO: draw boldened text
			if (isBold) {
				ctx.fillText(char, shadowX + 2, shadowY);
			}

			// TODO: draw normal text
			ctx.fillStyle = `#${currentColor.toString(16)}`;
			ctx.fillText(char, cursorX, cursorY + charYOffset);

			if (isBold) {
				ctx.fillText(char, cursorX + 2, cursorY + charYOffset);
			}

			let width = ctx.measureText(char).width;
			if (isBold) {
				width += 2;
			}

			cursorX += width;
		}
	}
}
