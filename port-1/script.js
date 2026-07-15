document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 1. Mobile Menu Toggles
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const menuClose = document.querySelector('.mobile-menu-close');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-item');

    if (menuToggle && mobileOverlay) {
        menuToggle.addEventListener('click', () => mobileOverlay.classList.add('active'));
        menuClose.addEventListener('click', () => mobileOverlay.classList.remove('active'));
        mobileLinks.forEach(link => link.addEventListener('click', () => mobileOverlay.classList.remove('active')));
    }

    // 2. Header scroll effect
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.style.borderBottomColor = 'rgba(255,255,255,0.1)';
        } else {
            header.style.borderBottomColor = 'rgba(255,255,255,0.06)';
        }
    });

    // 3. Intersection Observer for fade-in-up animations
    const animatedElements = document.querySelectorAll('.animate-fade-in-up, .animate-fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    // 4. Typed text effect
    const typedTextEl = document.getElementById('typed-text');
    if (typedTextEl) {
        const titles = [
            'Cloud & DevOps Engineer',
            'AWS & Kubernetes Architect',
            'Infrastructure Automation Expert',
            'CI/CD Pipeline Engineer'
        ];
        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentTitle = titles[titleIndex];
            
            if (isDeleting) {
                typedTextEl.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextEl.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
            }

            let delay = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentTitle.length) {
                delay = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                delay = 500;
            }

            setTimeout(typeEffect, delay);
        }

        setTimeout(typeEffect, 1000);
    }
});

// Project tab switching (global function for inline onclick)
function switchProjectTab(button, tabName) {
    const card = button.closest('.project-card');
    card.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    card.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    button.classList.add('active');
    card.querySelector(`.tab-content.${tabName}`).classList.add('active');
}
