const parallaxElements = document.querySelectorAll('[data-parallax]');

const updateParallax = () => {
    const scrollY = window.pageYOffset;
    parallaxElements.forEach((el) => {
        const speed = parseFloat(el.dataset.speed || '0.1');
        const translate = scrollY * speed;
        el.style.transform = `translate3d(0, ${translate * -0.4}px, 0)`;
    });
};

const throttle = (fn, limit = 16) => {
    let inThrottle;
    let lastFn;
    let lastTime;
    return function throttled(...args) {
        const context = this;
        if (!inThrottle) {
            fn.apply(context, args);
            lastTime = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(() => {
                if (Date.now() - lastTime >= limit) {
                    fn.apply(context, args);
                    lastTime = Date.now();
                }
            }, Math.max(limit - (Date.now() - lastTime), 0));
        }
    };
};

const throttledParallax = throttle(updateParallax, 16);

window.addEventListener('scroll', throttledParallax, { passive: true });
window.addEventListener('resize', throttledParallax);

updateParallax();

const menuIcon = document.querySelector('.menu-icon');
const nav = document.querySelector('.top-nav nav');

if (menuIcon && nav) {
    menuIcon.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('nav--open');
        menuIcon.setAttribute('aria-expanded', String(isOpen));
        if (isOpen) {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.right = '0';
            nav.style.background = 'rgba(5, 5, 8, 0.95)';
            nav.style.padding = '1.5rem 2rem';
            nav.style.borderRadius = '20px';
            nav.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.35)';
            nav.style.gap = '1.2rem';
        } else {
            nav.removeAttribute('style');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 960) {
            nav.classList.remove('nav--open');
            nav.removeAttribute('style');
            menuIcon.setAttribute('aria-expanded', 'false');
        }
    });
}

const smoothLinks = document.querySelectorAll('a[href^="#"]');

smoothLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);

        if (target) {
            event.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth',
            });
        }
    });
});
