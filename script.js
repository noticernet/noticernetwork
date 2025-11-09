// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for Section Animations
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Search Bar Functionality (Simulated with local filter example)
    const searchButton = document.querySelector('.search-bar button');
    const searchInput = document.querySelector('.search-bar input');
    const blogItems = document.querySelectorAll('.blog-item');
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.toLowerCase();
            blogItems.forEach(item => {
                const title = item.querySelector('h4').textContent.toLowerCase();
                const excerpt = item.querySelector('p').textContent.toLowerCase();
                if (title.includes(query) || excerpt.includes(query)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Back to Top Button
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Donation Modal
    const modal = document.getElementById('donation-modal');
    const closeBtn = document.querySelector('.close');
    const donateButtons = document.querySelectorAll('.cta-button[href="#donate"], .project-item .cta-button');

    donateButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (button.getAttribute('href') === '#donate' || button.textContent === 'Donate') {
                e.preventDefault();
                modal.style.display = 'block';
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Donation Form Submission (Simulated)
    const donationForm = document.getElementById('donation-form');
    donationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = document.getElementById('amount').value;
        alert(`Thank you for donating $${amount}!`);
        modal.style.display = 'none';
        donationForm.reset();
    });

    // Progress Bar Animation on Scroll
    const progressBars = document.querySelectorAll('.progress');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('data-width') || '50%'; // Use data-width if set
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        bar.setAttribute('data-width', bar.style.width); // Store initial width
        bar.style.width = '0%'; // Reset to 0
        progressObserver.observe(bar.parentElement);
    });
});
