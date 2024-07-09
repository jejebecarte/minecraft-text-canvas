const path = require('path');
const fs = require('fs');
const { createCanvas, Image } = require('canvas');
const charMap = require('./bitmap/mapping/include/default.json');

const sets = [
    {
        mapping: 0,
        imagePath: 'bitmap/font/nonlatin_european.png',
        resolutionX: 128,
        resolutionY: 536,
        sideLengthX: 8,
        sideLengthY: 8,
        outDir: 'bitmap/dist/nonlatin_european',
    },
    {
        mapping: 1,
        imagePath: 'bitmap/font/accented.png',
        resolutionX: 144,
        resolutionY: 900,
        sideLengthX: 9,
        sideLengthY: 12,
        outDir: 'bitmap/dist/accented',
    },
    {
        mapping: 2,
        imagePath: 'bitmap/font/ascii.png',
        resolutionX: 128,
        resolutionY: 128,
        sideLengthX: 8,
        sideLengthY: 8,
        outDir: 'bitmap/dist/ascii',
    },
];

sets.forEach(
    ({ mapping, imagePath, resolutionX, resolutionY, sideLengthX, sideLengthY, outDir }) => {
        const outDirPath = path.resolve(__dirname, outDir);
        if (!fs.existsSync(outDirPath)) {
            fs.mkdirSync(outDirPath, { recursive: true });
        }

        const image = new Image();
        image.onload = () => {
            for (let x = 0; x < resolutionX / sideLengthX; x++) {
                for (let y = 0; y < resolutionY / sideLengthY; y++) {
                    const hex = charMap.providers[mapping].chars[y].codePointAt(x).toString(16);
                    if (hex === '0') continue;

                    const canvas = createCanvas(sideLengthX, sideLengthY);
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(
                        image,
                        x * sideLengthX,
                        y * sideLengthY,
                        sideLengthX,
                        sideLengthY,
                        0,
                        0,
                        sideLengthX,
                        sideLengthY
                    );

                    ctx.globalCompositeOperation = 'difference';
                    ctx.fillStyle = 'white';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    const name = `uni${'0000'.substring(0, 4 - hex.length)}${hex}`;
                    const out = fs.createWriteStream(`${__dirname}/${outDir}/${name}.png`, {
                        flags: 'w',
                    });

                    canvas.createPNGStream().pipe(out);
                }
            }
        };

        image.src = path.resolve(__dirname, imagePath);
    }
);
