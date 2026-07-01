document.addEventListener('DOMContentLoaded', () => {

    // --- Interactive Cursor Spotlight Effect ---
    const body = document.body;
    if (window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                body.style.setProperty('--mouse-x', `${e.clientX}px`);
                body.style.setProperty('--mouse-y', `${e.clientY}px`);
            });
        });
    }

    // --- Smooth Scroll for ALL Navigation and Buttons ---
    document.querySelectorAll('.main-nav a, .cta-button, .learn-more-button').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerOffset = 100;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            }
        });
    });

    // --- Card Tilt Effect for Services & Automation Sections ---
    const interactiveCards = document.querySelectorAll('.service-card, .automation-card');
    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            card.style.transition = 'transform 0.1s ease-out';
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // --- Animated Number Counters for Stats Section ---
    const statsSection = document.querySelector('.stats-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    const speed = 200; // Animation speed

    const startCounter = () => {
        statNumbers.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        observer.observe(statsSection);
    }

    // --- Testimonial Slider ---
    const slidesContainer = document.querySelector('.testimonial-slides');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    let currentIndex = 0;

    function updateSlider() {
        if (slidesContainer) {
            slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        });
    }

});
