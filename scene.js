const width = 400;
const height = 400;

// Initialize Three.js Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.getElementById('threejs-container').appendChild(renderer.domElement);

// Create a simple 3D model (a cube)
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Create a render target
const renderTarget = new THREE.WebGLRenderTarget(width, height);
renderer.setRenderTarget(renderTarget);

// Render the scene to the render target
renderer.render(scene, camera);

// Extract Pixel Data
const pixelBuffer = new Uint8Array(4 * width * height);
renderer.readRenderTargetPixels(renderTarget, 0, 0, width, height, pixelBuffer);

// Reset the render target back to the default (screen)
renderer.setRenderTarget(null);

// Render the scene to the screen (default framebuffer)
renderer.render(scene, camera);

// Process the pixel data to create a binary map (1 if the pixel is part of the model, 0 otherwise)
window.binaryData = []; // Making this a global variable
for (let y = 0; y < height; y++) {
    let row = [];
    for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const alpha = pixelBuffer[index + 3]; // Alpha

        // Simple threshold: if alpha > 0, consider the pixel as part of the model
        row.push(alpha > 0 ? 1 : 0);
    }
    window.binaryData.push(row);
}