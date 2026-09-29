/**
 * CREAFILMS - Main JavaScript
 * Editorial Luxury Experience
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎬 CREAFILMS: Visual Legacy');

    // Initialize video background
    initVideoBackground();

    // Initialize the direct Studio service selector
    initStudioSelector();

    // Performance: Pause video when tab not visible
    handleVisibilityChange();
});

/**
 * Direct Studio Service Selector
 */
function initStudioSelector() {
    const selector = document.querySelector('.studio-selector');

    if (!selector) return;

    const trigger = selector.querySelector('.studio-trigger');
    const options = selector.querySelector('.studio-options');
    const serviceLinks = selector.querySelectorAll('.studio-option');

    const setOpen = (open) => {
        selector.classList.toggle('is-open', open);
        trigger.setAttribute('aria-expanded', String(open));
        options.setAttribute('aria-hidden', String(!open));
    };

    trigger.addEventListener('click', (event) => {
        event.stopPropagation();
        const willOpen = !selector.classList.contains('is-open');

        setOpen(willOpen);

        if (!willOpen) trigger.blur();
    });

    serviceLinks.forEach((link) => {
        link.addEventListener('click', () => setOpen(false));
    });

    document.addEventListener('click', (event) => {
        if (!selector.contains(event.target)) setOpen(false);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape' || !selector.classList.contains('is-open')) return;

        setOpen(false);
        trigger.focus();
    });

    window.addEventListener('pageshow', () => setOpen(false));
}

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
        'assets/hero1.jpg'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Optional: Preload on load
window.addEventListener('load', preloadAssets);
