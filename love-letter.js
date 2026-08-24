// DOM Elements
const letter = document.getElementById('letter');
const messageDisplay = document.getElementById('messageDisplay');
const bgMusic = document.getElementById('bgMusic');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    createSparkles();
});

// Setup Event Listeners
function setupEventListeners() {
    letter.addEventListener('click', openMessage);
}

// Open Message with Animation
function openMessage() {
    messageDisplay.classList.add('show');
    createSparkles();
    
    // Play soft background music (optional)
    // Uncomment to enable music
    // bgMusic.play().catch(() => {
    //     console.log('Music autoplay not allowed');
    // });
}

// Close Message
function closeMessage() {
    messageDisplay.classList.remove('show');
    // bgMusic.pause();
}

// Create Sparkles
function createSparkles() {
    const sparklesContainer = document.querySelector('.sparkles');
    if (!sparklesContainer) return;

    // Clear old sparkles
    sparklesContainer.innerHTML = '';

    // Create multiple sparkles
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.fontSize = '1.5em';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animation = `sparkle 1.5s ease-out forwards`;

            sparklesContainer.appendChild(sparkle);

            // Remove sparkle after animation
            setTimeout(() => {
                sparkle.remove();
            }, 1500);
        }, i * 100);
    }
}

// Allow clicking outside to close
messageDisplay.addEventListener('click', (e) => {
    if (e.target === messageDisplay) {
        closeMessage();
    }
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && messageDisplay.classList.contains('show')) {
        closeMessage();
    }
});