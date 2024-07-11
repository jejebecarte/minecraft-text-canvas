const fs = require('fs');
const path = require('path');
const { createCanvas, Image } = require('canvas');
const charMap = require('./font/mapping/include/default.json');

// Scaling is required for FontForge's autotrace to correctly identify edges
const SCALING = 10;
const sets = [
    {
        mapping: 0,
        imagePath: 'font/sprites/nonlatin_european.png',
        sideLengthX: 8,
        sideLengthY: 8,
        outDir: 'font/dist/strike-8',
    },
    {
        mapping: 1,
        imagePath: 'font/sprites/accented.png',
        sideLengthX: 9,
        sideLengthY: 12,
        outDir: 'font/dist/accented',
    },
    {
        mapping: 2,
        imagePath: 'font/sprites/ascii.png',
        sideLengthX: 8,
        sideLengthY: 8,
        outDir: 'font/dist/strike-8',
    },
];

sets.forEach(({ mapping, imagePath, sideLengthX, sideLengthY, outDir }) => {
    const outDirPath = path.resolve(__dirname, outDir);
    if (!fs.existsSync(outDirPath)) {
        fs.mkdirSync(outDirPath, { recursive: true });
    }

    const image = new Image();
    image.onload = () => {
        for (let x = 0; x < image.width / sideLengthX; x++) {
            for (let y = 0; y < image.height / sideLengthY; y++) {
                const hexCodePoint = charMap.providers[mapping].chars[y]
                    .codePointAt(x)
                    .toString(16);

                if (hexCodePoint === '0') continue;

                const canvas = createCanvas(sideLengthX * SCALING, sideLengthY * SCALING);
                const ctx = canvas.getContext('2d');

                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(
                    image,
                    x * sideLengthX,
                    y * sideLengthY,
                    sideLengthX,
                    sideLengthY,
                    0,
                    0,
                    sideLengthX * SCALING,
                    sideLengthY * SCALING
                );

                ctx.globalCompositeOperation = 'difference';
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                const out = fs.createWriteStream(`${__dirname}/${outDir}/${hexCodePoint}.png`);
                canvas.createPNGStream().pipe(out);
            }
        }
    };

    image.src = path.resolve(__dirname, imagePath);
});
