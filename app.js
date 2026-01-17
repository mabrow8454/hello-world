// Astronomical constants (in km)
const EARTH_RADIUS = 6371;
const MOON_RADIUS = 1737;
const EARTH_MOON_DISTANCE = 384400;
const MOON_ORBITAL_PERIOD = 27.3; // days
const EARTH_ROTATION_PERIOD = 1; // day
const MOON_ROTATION_PERIOD = 27.3; // days (tidally locked)

// Scale factor for visualization (1 unit = X km)
const SCALE = 1000; // 1 Three.js unit = 1000 km

// Scene setup
let scene, camera, renderer, controls;
let earth, moon, earthMesh, moonMesh;
let orbitLine;
let animationId;
let isPaused = false;
let simulationSpeed = 1000; // speed multiplier
let elapsedDays = 0;
let lastTime = Date.now();

// Initialize Three.js scene
function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Create camera
    const container = document.getElementById('canvas-container');
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
    );
    camera.position.set(0, 200, 500);
    camera.lookAt(0, 0, 0);

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Add lights
    addLights();

    // Create Earth
    createEarth();

    // Create Moon
    createMoon();

    // Create orbit path
    createOrbitPath();

    // Add stars
    createStarfield();

    // Add mouse controls
    addOrbitControls();

    // Setup event listeners
    setupEventListeners();

    // Start animation
    animate();
}

function addLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    // Sun light (directional)
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(500, 200, 300);
    sunLight.castShadow = true;
    sunLight.shadow.camera.near = 0.1;
    sunLight.shadow.camera.far = 2000;
    sunLight.shadow.camera.left = -200;
    sunLight.shadow.camera.right = 200;
    sunLight.shadow.camera.top = 200;
    sunLight.shadow.camera.bottom = -200;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    // Point light for additional illumination
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(500, 0, 0);
    scene.add(pointLight);
}

function createEarth() {
    const earthRadius = EARTH_RADIUS / SCALE;
    const geometry = new THREE.SphereGeometry(earthRadius, 64, 64);

    // Earth material with texture-like appearance
    const material = new THREE.MeshPhongMaterial({
        color: 0x2233ff,
        emissive: 0x112244,
        specular: 0x333333,
        shininess: 25,
        flatShading: false
    });

    earthMesh = new THREE.Mesh(geometry, material);
    earthMesh.castShadow = true;
    earthMesh.receiveShadow = true;

    // Add atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(earthRadius * 1.05, 64, 64);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x4488ff,
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    earthMesh.add(atmosphere);

    scene.add(earthMesh);

    // Add Earth label
    createLabel('Earth', earthMesh, earthRadius + 2);
}

function createMoon() {
    const moonRadius = MOON_RADIUS / SCALE;
    const geometry = new THREE.SphereGeometry(moonRadius, 32, 32);

    const material = new THREE.MeshPhongMaterial({
        color: 0xaaaaaa,
        emissive: 0x222222,
        shininess: 5
    });

    moonMesh = new THREE.Mesh(geometry, material);
    moonMesh.castShadow = true;
    moonMesh.receiveShadow = true;

    // Position moon at starting point
    const distance = EARTH_MOON_DISTANCE / SCALE;
    moonMesh.position.set(distance, 0, 0);

    scene.add(moonMesh);

    // Add Moon label
    createLabel('Moon', moonMesh, moonRadius + 1);
}

function createLabel(text, parentMesh, offset) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 64;

    context.fillStyle = 'rgba(255, 255, 255, 0.9)';
    context.font = 'Bold 24px Arial';
    context.textAlign = 'center';
    context.fillText(text, 128, 40);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(10, 2.5, 1);
    sprite.position.y = offset;

    parentMesh.add(sprite);
}

function createOrbitPath() {
    const orbitRadius = EARTH_MOON_DISTANCE / SCALE;
    const segments = 128;
    const geometry = new THREE.BufferGeometry();
    const positions = [];

    for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const x = Math.cos(theta) * orbitRadius;
        const z = Math.sin(theta) * orbitRadius;
        positions.push(x, 0, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const material = new THREE.LineBasicMaterial({
        color: 0x444444,
        transparent: true,
        opacity: 0.3
    });

    orbitLine = new THREE.Line(geometry, material);
    scene.add(orbitLine);
}

function createStarfield() {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.7,
        transparent: true
    });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}

function addOrbitControls() {
    // Simple mouse orbit controls
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    renderer.domElement.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    renderer.domElement.addEventListener('mousemove', (e) => {
        if (isMouseDown) {
            const deltaX = e.clientX - mouseX;
            const deltaY = e.clientY - mouseY;
            mouseX = e.clientX;
            mouseY = e.clientY;

            targetRotationY += deltaX * 0.005;
            targetRotationX += deltaY * 0.005;
            targetRotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotationX));
        }
    });

    renderer.domElement.addEventListener('mouseup', () => {
        isMouseDown = false;
    });

    // Camera rotation update
    function updateCameraRotation() {
        currentRotationX += (targetRotationX - currentRotationX) * 0.1;
        currentRotationY += (targetRotationY - currentRotationY) * 0.1;

        const radius = Math.sqrt(
            camera.position.x ** 2 +
            camera.position.y ** 2 +
            camera.position.z ** 2
        );

        camera.position.x = radius * Math.sin(currentRotationY) * Math.cos(currentRotationX);
        camera.position.y = radius * Math.sin(currentRotationX);
        camera.position.z = radius * Math.cos(currentRotationY) * Math.cos(currentRotationX);
        camera.lookAt(0, 0, 0);

        requestAnimationFrame(updateCameraRotation);
    }
    updateCameraRotation();

    // Zoom with mouse wheel
    renderer.domElement.addEventListener('wheel', (e) => {
        e.preventDefault();
        const zoomSpeed = 0.1;
        const direction = e.deltaY > 0 ? 1 : -1;

        camera.position.multiplyScalar(1 + direction * zoomSpeed);

        // Limit zoom
        const distance = camera.position.length();
        if (distance < 50) {
            camera.position.normalize().multiplyScalar(50);
        } else if (distance > 1500) {
            camera.position.normalize().multiplyScalar(1500);
        }
    }, { passive: false });
}

function setupEventListeners() {
    // Play/Pause button
    document.getElementById('play-pause').addEventListener('click', () => {
        isPaused = !isPaused;
        const btn = document.getElementById('play-pause');
        btn.textContent = isPaused ? '▶ Play' : '⏸ Pause';
    });

    // Reset button
    document.getElementById('reset').addEventListener('click', () => {
        elapsedDays = 0;
        moonMesh.position.set(EARTH_MOON_DISTANCE / SCALE, 0, 0);
        earthMesh.rotation.y = 0;
        moonMesh.rotation.y = 0;
        updateUI();
    });

    // Speed slider
    document.getElementById('speed-slider').addEventListener('input', (e) => {
        simulationSpeed = parseFloat(e.target.value);
        document.getElementById('speed-display').textContent = `${simulationSpeed.toFixed(0)}x`;
    });

    // Window resize
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function updateSimulation(deltaTime) {
    if (isPaused) return;

    // deltaTime is in seconds, convert to days for simulation
    const deltaTimeDays = (deltaTime / 1000) * (simulationSpeed / 86400);
    elapsedDays += deltaTimeDays;

    // Rotate Earth (one full rotation per day)
    const earthRotationSpeed = (2 * Math.PI) / EARTH_ROTATION_PERIOD;
    earthMesh.rotation.y += earthRotationSpeed * deltaTimeDays;

    // Moon orbital motion (27.3 days for full orbit)
    const moonOrbitSpeed = (2 * Math.PI) / MOON_ORBITAL_PERIOD;
    const orbitAngle = moonOrbitSpeed * elapsedDays;
    const orbitRadius = EARTH_MOON_DISTANCE / SCALE;

    moonMesh.position.x = Math.cos(orbitAngle) * orbitRadius;
    moonMesh.position.z = Math.sin(orbitAngle) * orbitRadius;

    // Moon rotation (tidally locked - same rotation period as orbit)
    const moonRotationSpeed = (2 * Math.PI) / MOON_ROTATION_PERIOD;
    moonMesh.rotation.y += moonRotationSpeed * deltaTimeDays;

    updateUI();
}

function updateUI() {
    // Update days elapsed
    document.getElementById('days-elapsed').textContent = elapsedDays.toFixed(1);

    // Calculate moon phase based on position
    const angle = Math.atan2(moonMesh.position.z, moonMesh.position.x);
    let phase = ((angle + Math.PI) / (2 * Math.PI)) * 8;
    phase = Math.floor(phase) % 8;

    const phases = [
        'New Moon 🌑',
        'Waxing Crescent 🌒',
        'First Quarter 🌓',
        'Waxing Gibbous 🌔',
        'Full Moon 🌕',
        'Waning Gibbous 🌖',
        'Last Quarter 🌗',
        'Waning Crescent 🌘'
    ];

    document.getElementById('moon-phase').textContent = phases[phase];
}

function animate() {
    animationId = requestAnimationFrame(animate);

    const currentTime = Date.now();
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    updateSimulation(deltaTime);
    renderer.render(scene, camera);
}

// Initialize the application
init();
