import { Canvas } from "canvas";
import { createWriteStream } from "fs";

export default function saveImage(canvas: Canvas) {
	const out = createWriteStream(__dirname + "/result.png");
	const stream = canvas.createPNGStream();

	stream.pipe(out);
}
