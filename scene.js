const width = 200;
const height = 200;

// Initialize Three.js Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.getElementById('threejs-container').appendChild(renderer.domElement);

// Create a simple 3D model (a cube)
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Set initial camera position and rotation angle
let cameraAngleX = 0;
let cameraAngleY = 0;
const radius = 1.5;

// Update camera position based on rotation angles
function updateCameraPosition() {
    camera.position.x = radius * Math.sin(cameraAngleY) * Math.cos(cameraAngleX);
    camera.position.y = radius * Math.sin(cameraAngleX);
    camera.position.z = radius * Math.cos(cameraAngleY) * Math.cos(cameraAngleX);
    camera.lookAt(scene.position);
}

updateCameraPosition();

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
        const green = pixelBuffer[index + 1]; // Green channel

        // Simple threshold: if green > 0, consider the pixel as part of the model
        row.push(green > 0 ? 1 : 0);
    }
    window.binaryData.push(row);
}

// Handle camera rotation with arrow keys
document.addEventListener('keydown', (event) => {
    const step = 0.1; // Adjust rotation angle step size

    switch (event.key) {
        case 'ArrowUp':
            cameraAngleX -= step;
            break;
        case 'ArrowDown':
            cameraAngleX += step;
            break;
        case 'ArrowLeft':
            cameraAngleY -= step;
            break;
        case 'ArrowRight':
            cameraAngleY += step;
            break;
    }

    // Limit the vertical rotation to avoid flipping the camera upside down
    cameraAngleX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, cameraAngleX));

    // Update the camera position and render the scene
    updateCameraPosition();
    renderer.render(scene, camera);
});