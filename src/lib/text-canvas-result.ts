import { Canvas, JpegConfig, PNGStream, PngConfig } from 'canvas';

export default class TextCanvasResult {
    private canvas;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
    }

    public getPNGBuffer(config?: PngConfig): Buffer {
        return this.canvas.toBuffer('image/png', config);
    }

    public getJPEGBuffer(config?: JpegConfig): Buffer {
        return this.canvas.toBuffer('image/jpeg', config);
    }

    public createPNGStream(config?: PngConfig): PNGStream {
        return this.canvas.createPNGStream(config);
    }

    public createJPEGStream(config?: JpegConfig): PNGStream {
        return this.canvas.createJPEGStream(config);
    }
}
