/**
 * CREAFILMS - Main JavaScript
 * Global functionality and interactions
 */

// Document Ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎬 CREAFILMS: Visual Legacy - Loaded');

    // Initialize smooth scroll
    initSmoothScroll();

    // Initialize video fallback
    initVideoFallback();

    // Performance optimization: Pause video when not in viewport
    initVideoObserver();
});

/**
 * Smooth Scroll for anchor links
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
 * Video Fallback Handler
 * If video fails to load, show fallback image
 */
function initVideoFallback() {
    const video = document.querySelector('.hero-video');

    if (!video) return;

    video.addEventListener('error', () => {
        console.warn('Video failed to load, using fallback image');
        video.style.display = 'none';

        // Create fallback image
        const fallbackImg = document.createElement('img');
        fallbackImg.src = 'assets/hero1.jpg';
        fallbackImg.alt = 'CREAFILMS Background';
        fallbackImg.className = 'hero-video';
        fallbackImg.style.objectFit = 'cover';

        video.parentNode.insertBefore(fallbackImg, video);
    });
}

/**
 * Intersection Observer for Video Performance
 * Pause video when not in viewport to save resources
 */
function initVideoObserver() {
    const video = document.querySelector('.hero-video');

    if (!video || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(err => console.warn('Video play failed:', err));
                } else {
                    video.pause();
                }
            });
        },
        { threshold: 0.25 }
    );

    observer.observe(video);
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
