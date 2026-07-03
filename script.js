// Remove loading screen
window.addEventListener('load', () => {
    document.getElementById('loading-screen').style.opacity = '0';
    setTimeout(() => document.getElementById('loading-screen').remove(), 500);
});

// Particles.js init
particlesJS('particles-js', {
    particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: '#00f0e8' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: false },
        size: { value: 2, random: true },
        line_linked: { enable: true, distance: 150, color: '#00bfff', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: 'none', random: false, straight: false }
    },
    interactivity: {
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } }
    },
    retina_detect: true
});

// Typing Animation
const typingText = document.querySelector('.typing-text');
const phrases = ['Content Creator', 'Photographer', 'Videographer', 'Tech Enthusiast'];
let phraseIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
    const current = phrases[phraseIndex];
    typingText.textContent = isDeleting ? current.substring(0, charIndex--) : current.substring(0, charIndex++);
    let speed = isDeleting ? 50 : 120;
    if (!isDeleting && charIndex === current.length) { speed = 2000; isDeleting = true; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; speed = 500; }
    setTimeout(typeEffect, speed);
}
typeEffect();

// Custom Cursor
document.addEventListener('mousemove', (e) => {
    document.querySelector('.cursor').style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    document.querySelector('.cursor-follower').style.transform = `translate(${e.clientX - 17.5}px, ${e.clientY - 17.5}px)`;
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    themeToggle.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
});

// Scroll Spy Navbar
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    document.querySelectorAll('section').forEach(sec => {
        const top = sec.offsetTop - 100;
        const bottom = top + sec.offsetHeight;
        const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
        if (scrollPos >= top && scrollPos < bottom) {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
    // Back to Top
    document.getElementById('back-to-top').style.display = scrollPos > 400 ? 'block' : 'none';
});
document.getElementById('back-to-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Video Autoplay on View
const videos = document.querySelectorAll('.video-player');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => e.isIntersecting ? e.target.play() : e.target.pause());
}, { threshold: 0.6 });
videos.forEach(v => observer.observe(v));

// Comments Toggle
document.querySelectorAll('.comment-toggle').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.video-info').querySelector('.comments-section').classList.toggle('active'));
});

// Lightbox
const galleryImgs = document.querySelectorAll('.gallery-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
galleryImgs.forEach(img => img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
}));
document.querySelector('.close-lightbox').addEventListener('click', () => lightbox.classList.remove('active'));

// Animated Stats Counter
const stats = document.querySelectorAll('.stat-number');
const countObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting && !e.target.classList.contains('done')) {
            const target = parseFloat(e.target.dataset.target);
            const duration = 2000;
            const increment = target / (duration / 20);
            let current = 0;
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(counter);
                    e.target.classList.add('done');
                }
                e.target.textContent = current % 1 === 0 ? Math.round(current) : current.toFixed(1);
            }, 20);
        }
    });
}, { threshold: 0.5 });
stats.forEach(s => countObserver.observe(s));

// Firebase Setup (uncomment & replace with your config)
/*
const firebaseConfig = {
    apiKey: "YOUR_KEY",
    authDomain: "YOUR_DOMAIN",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_BUCKET",
    messagingSenderId: "YOUR_SENDER",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
*/
