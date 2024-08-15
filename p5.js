// p5js-script.js

let binaryPixels = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
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
    background(255);

    // Define pixel size
    let pixelSize = 10;
    for (let i = 0; i < binaryPixels.length; i++) {
        for (let j = 0; j < binaryPixels[i].length; j++) {
            fill(binaryPixels[i][j] === 1 ? 0 : 255);
            rect(j * pixelSize, i * pixelSize, pixelSize, pixelSize);
        }
    }
}
