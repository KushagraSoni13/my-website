// Cursor Trail Script
const cursorTrail = document.getElementById("cursor-trail");
let cursorDots = [];

for (let i = 0; i < 10; i++) {
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    cursorTrail.appendChild(dot);
    cursorDots.push(dot);
}

document.addEventListener("mousemove", (event) => {
    const { clientX, clientY } = event;

    cursorDots.forEach((dot, index) => {
        const delay = index * 50;
        setTimeout(() => {
            dot.style.left = `${clientX}px`;
            dot.style.top = `${clientY}px`;
            dot.style.opacity = "1";
            dot.style.transform = "translate(-50%, -50%) scale(1)";
        }, delay);
        setTimeout(() => {
            dot.style.opacity = "0";
            dot.style.transform = "translate(-50%, -50%) scale(0)";
        }, delay + 200);
    });
});

// Gyro Effect for Background
const bgVideo = document.querySelector('.bg-video');

// Function to handle device orientation (for mobile devices)
function handleOrientation(event) {
    const { beta, gamma } = event; // beta: front-to-back tilt, gamma: left-to-right tilt

    // Limit the values to prevent excessive rotation
    const maxTilt = 30; // Maximum tilt angle
    const clampedBeta = Math.max(-maxTilt, Math.min(maxTilt, beta));
    const clampedGamma = Math.max(-maxTilt, Math.min(maxTilt, gamma));

    const rotateY = (clampedGamma / maxTilt) * 10; // Rotate between -10deg to +10deg
    const rotateX = (clampedBeta / maxTilt) * -10; // Rotate between -10deg to +10deg

    bgVideo.style.transform = `translate(-50%, -50%) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
}

// Listen for device orientation events
if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', handleOrientation, true);
}

// Fallback to mousemove for desktop devices
document.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calculate rotation angles
    const rotateY = ((clientX / windowWidth) - 0.5) * 20; // Rotate between -10deg to +10deg
    const rotateX = ((clientY / windowHeight) - 0.5) * -20; // Rotate between -10deg to +10deg

    bgVideo.style.transform = `translate(-50%, -50%) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
});

// Reset rotation when mouse leaves the window
document.addEventListener('mouseleave', () => {
    bgVideo.style.transform = `translate(-50%, -50%) rotateY(0deg) rotateX(0deg)`;
});
