// ── THEME TOGGLE ──
const html = document.documentElement;
const toggleBtn = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme');
if (saved === 'light') html.classList.add('light');

toggleBtn.addEventListener('click', () => {
    html.classList.toggle('light');
    localStorage.setItem('theme', html.classList.contains('light') ? 'light' : 'dark');
});

// ── MOBILE MENU TOGGLE ──
const mobileBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-links a');

// Open/Close menu on hamburger click
mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Auto-close menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ── REVEAL ON SCROLL ──
const reveals = document.querySelectorAll('.reveal, .timeline-item');
const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { 
            e.target.classList.add('visible'); 
            obs.unobserve(e.target); 
        }
    });
}, { threshold: 0.12 });
reveals.forEach(r => obs.observe(r));

// ── SKILL BARS ──
const skillGroups = document.querySelectorAll('.skill-group');
const barObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            // Animate all skill bars within this group
            const bars = e.target.querySelectorAll('.skill-fill');
            bars.forEach(bar => {
                const w = bar.dataset.width;
                bar.style.width = (parseFloat(w) * 100) + '%';
                bar.classList.add('animated');
            });
            barObs.unobserve(e.target);
        }
    });
}, { threshold: 0.5 });
skillGroups.forEach(group => barObs.observe(group));

// ── CARD MOUSE GLOW ──
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
});

// ── NAV SHRINK ON SCROLL ──
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    // Only apply the shrink effect on larger screens to prevent jumpiness on mobile
    if (window.innerWidth > 768) {
        nav.style.padding = window.scrollY > 80 ? '1rem 4rem' : '1.4rem 4rem';
    } else {
        nav.style.padding = '1rem 1.5rem'; // Keep static on mobile
    }
});
