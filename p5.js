// p5js-script.js

let binaryPixels = [];

function setup() {
    createCanvas(1000, 1000);
    // pixelDensity(1);
    textAlign(CENTER, CENTER);
    textSize(5);
    noLoop();

    // Use the binaryData provided by Three.js
    if (window.binaryData) {
        for (let i = 0; i < window.binaryData.length; i++) {
            let row = [];
            for (let j = 0; j < window.binaryData[i].length; j++) {
                row.push(window.binaryData[i][j]);
            }
            binaryPixels.push(row);
        }
    }
}

function draw() {
    background(150);

    // Define pixel size
    let pixelSize = 5;
    for (let i = 0; i < binaryPixels.length; i+=5) {
        for (let j = 0; j < binaryPixels[i].length; j+=5) {
            const col = binaryPixels[i][j] === 1 ? 0 : 255
            stroke(col);
            fill(col);
            // rect(j * pixelSize, i * pixelSize, pixelSize, pixelSize);
            textSize(50);
            textStyle(NORMAL);
            text('a', (j) * pixelSize + pixelSize / 2, (i) * pixelSize + pixelSize / 2);
        }
    }
}
