document.addEventListener('DOMContentLoaded', () => {

    // Smooth page load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1)';
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    });

    // Reveal on scroll — smooth staggered
    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach(el => el.classList.add('hidden-state'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find sibling index for stagger
                const parent = entry.target.parentElement;
                const siblings = parent ? Array.from(parent.querySelectorAll('.reveal-up')) : [];
                const idx = siblings.indexOf(entry.target);
                const delay = Math.min(idx * 150, 600);

                setTimeout(() => {
                    entry.target.classList.remove('hidden-state');
                    entry.target.classList.add('active');
                }, delay);

                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.06, rootMargin: '0px 0px -80px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // Nav scroll effect — smooth
    const nav = document.getElementById('main-nav');
    if (nav) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                nav.classList.toggle('scrolled', scrollY > 60);
                lastScroll = scrollY;
            });
        }, { passive: true });
    }

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            mobileToggle.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const offset = target.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });

    // Parallax depth on scroll — hero image subtle zoom
    const heroBg = document.querySelector('.hero-full-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                const rate = scrolled * 0.0003;
                heroBg.style.transform = `scale(${1 + rate})`;
                heroBg.style.opacity = Math.max(1 - scrolled * 0.001, 0.3);
            });
        }, { passive: true });
    }

});
