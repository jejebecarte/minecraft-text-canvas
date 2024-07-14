const fs = require('fs');
const path = require('path');
const { createCanvas, Image } = require('canvas');
const charMap = require('./font/mapping/include/default.json');

// Image scaling is required for FontForge's autotrace to correctly identify edges
const IMAGE_SCALING = 8;
const ITALIC_SCALING = 3;
const sets = [
    {
        mapping: 0,
        imagePath: 'font/sprites/nonlatin_european.png',
        sideLengthX: 8,
        sideLengthY: 8,
    },
    {
        mapping: 1,
        imagePath: 'font/sprites/accented.png',
        sideLengthX: 9,
        sideLengthY: 12,
    },
    {
        mapping: 2,
        imagePath: 'font/sprites/ascii.png',
        sideLengthX: 8,
        sideLengthY: 8,
    },
];

const regularOutDir = path.resolve(__dirname, 'font/dist/regular');
const italicOutDir = path.resolve(__dirname, 'font/dist/italic');
if (!fs.existsSync(regularOutDir) || !fs.existsSync(italicOutDir)) {
    fs.mkdirSync(regularOutDir, { recursive: true });
    fs.mkdirSync(italicOutDir, { recursive: true });
}

sets.forEach(({ mapping, imagePath, sideLengthX, sideLengthY }) => {
    const image = new Image();
    image.onload = () => {
        for (let x = 0; x < image.width / sideLengthX; x++) {
            for (let y = 0; y < image.height / sideLengthY; y++) {
                const hexCodePoint = charMap.providers[mapping].chars[y]
                    .codePointAt(x)
                    .toString(16);

                // This is not a visible character. Skip it.
                if (hexCodePoint === '0') continue;

                const invertColors = (ctx, width, height) => {
                    ctx.globalCompositeOperation = 'difference';
                    ctx.fillStyle = 'white';
                    ctx.fillRect(0, 0, width, height);
                    ctx.globalCompositeOperation = 'source-over';
                };

                // Each type has to be wrapped in a function or the output won't be saved properly
                const getRegularCanvas = () => {
                    const canvas = createCanvas(9 * IMAGE_SCALING, 12 * IMAGE_SCALING);

                    const ctx = canvas.getContext('2d');

                    // Create the regular glyph
                    ctx.imageSmoothingEnabled = false;
                    ctx.drawImage(
                        image,
                        x * sideLengthX,
                        y * sideLengthY,
                        sideLengthX,
                        sideLengthY,
                        0,
                        sideLengthY === 12 ? 0 : 3 * IMAGE_SCALING,
                        sideLengthX * IMAGE_SCALING,
                        sideLengthY * IMAGE_SCALING
                    );

                    invertColors(ctx, canvas.width, canvas.height);

                    return canvas;
                };

                const getItalicCanvas = () => {
                    const canvas = createCanvas(
                        (9 * ITALIC_SCALING + sideLengthY) * IMAGE_SCALING,
                        12 * ITALIC_SCALING * IMAGE_SCALING
                    );

                    const ctx = canvas.getContext('2d');

                    // Create the italic glyph. To keep italics looking even across glyphs with different dimensions, we put them all on a background of the same size and apply the algorithm from there.
                    // BUG: At large scaling factors this creates artifacts - https://github.com/Automattic/node-canvas/issues/2397
                    ctx.imageSmoothingEnabled = false;
                    ctx.drawImage(
                        image,
                        x * sideLengthX,
                        y * sideLengthY,
                        sideLengthX,
                        sideLengthY,
                        0,
                        sideLengthY === 12 ? 0 : 3 * ITALIC_SCALING * IMAGE_SCALING,
                        sideLengthX * ITALIC_SCALING * IMAGE_SCALING,
                        sideLengthY * ITALIC_SCALING * IMAGE_SCALING
                    );

                    const blockLevels = [31, 27, 23, 19, 15, 11, 7, 3, 0];
                    blockLevels.forEach((blockLevel, i) => {
                        const blockHeight =
                            i === blockLevels.length - 1 ? 3 * IMAGE_SCALING : 4 * IMAGE_SCALING;

                        const data = ctx.getImageData(
                            0,
                            blockLevel * IMAGE_SCALING,
                            canvas.width,
                            blockHeight
                        );

                        ctx.fillRect(0, blockLevel * IMAGE_SCALING, canvas.width, blockHeight);
                        ctx.putImageData(data, (i + 1) * IMAGE_SCALING, blockLevel * IMAGE_SCALING);
                    });

                    invertColors(ctx, canvas.width, canvas.height);

                    return canvas;
                };

                // Pipe out the regular glyph
                getRegularCanvas()
                    .createPNGStream()
                    .pipe(fs.createWriteStream(path.join(regularOutDir, `${hexCodePoint}.png`)));

                // Pipe out the italic glyph
                getItalicCanvas()
                    .createPNGStream()
                    .pipe(fs.createWriteStream(path.join(italicOutDir, `${hexCodePoint}.png`)));
            }
        }
    };

    image.src = path.resolve(__dirname, imagePath);
});
