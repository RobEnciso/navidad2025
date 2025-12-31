/**
 * CREAFILMS - Main JavaScript
 * Editorial Luxury Experience
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎬 CREAFILMS: Visual Legacy');

    // Initialize video background
    initVideoBackground();

    // Initialize smooth interactions
    initSmoothInteractions();

    // Performance: Pause video when tab not visible
    handleVisibilityChange();
});

/**
 * Video Background Handler with Elegant Fallback
 */
function initVideoBackground() {
    const video = document.getElementById('bg-video');

    if (!video) return;

    // Check if video source exists
    video.addEventListener('loadeddata', () => {
        console.log('✓ Video loaded successfully');
    });

    // Fallback to image if video fails
    video.addEventListener('error', () => {
        console.warn('⚠ Video failed to load, using fallback image');
        document.body.classList.add('no-video');
    });

    // Ensure video plays (some browsers require user interaction)
    const playVideo = () => {
        video.play().catch(err => {
            console.warn('Video autoplay prevented:', err);
            document.body.classList.add('no-video');
        });
    };

    // Try to play video
    playVideo();

    // Retry on user interaction
    document.addEventListener('click', () => {
        if (video.paused) {
            playVideo();
        }
    }, { once: true });
}

/**
 * Smooth Interactions & Hover Effects
 */
function initSmoothInteractions() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        // Add ripple effect on click (optional)
        link.addEventListener('click', (e) => {
            createRipple(e, link);
        });

        // Subtle parallax on hover
        link.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('nav-bc')
                ? 'translateX(-50%) translateY(-2px)'
                : 'translateY(-2px)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = this.classList.contains('nav-bc')
                ? 'translateX(-50%) translateY(0)'
                : 'translateY(0)';
        });
    });
}

/**
 * Create Ripple Effect (Luxury Touch)
 */
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        top: ${y}px;
        left: ${x}px;
        pointer-events: none;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
    `;

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// Ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/**
 * Handle Page Visibility (Performance)
 * Pause video when tab is not visible
 */
function handleVisibilityChange() {
    const video = document.getElementById('bg-video');

    if (!video) return;

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            video.pause();
        } else {
            video.play().catch(err => console.warn('Video play failed:', err));
        }
    });
}

/**
 * Smooth Scroll (if adding more sections later)
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Preload critical assets (Optional Performance Boost)
 */
function preloadAssets() {
    const criticalImages = [
        'assets/hero1.jpg',
        'assets/hero2.jpg'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Optional: Preload on load
window.addEventListener('load', preloadAssets);
