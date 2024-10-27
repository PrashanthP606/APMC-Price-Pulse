// Smooth scrolling with error handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect with throttling
let lastScrollTime = 0;
const throttleDelay = 100; // ms

function updateHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    header.style.backgroundColor = window.scrollY > 50 
        ? '#1a365d' 
        : 'transparent';
}

window.addEventListener('scroll', () => {
    const now = Date.now();
    if (now - lastScrollTime >= throttleDelay) {
        lastScrollTime = now;
        requestAnimationFrame(updateHeader);
    }
});

// Initialize header state
document.addEventListener('DOMContentLoaded', updateHeader);