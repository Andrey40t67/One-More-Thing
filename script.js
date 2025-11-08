const parallaxNodes = document.querySelectorAll('[data-parallax]');
const mobileBreakpoint = 768;

const handleParallax = () => {
  if (window.innerWidth < mobileBreakpoint) {
    parallaxNodes.forEach((node) => {
      node.style.transform = 'none';
      node.style.setProperty('--parallax-intensity', '0px');
    });
    return;
  }

  const scrollY = window.scrollY;
  parallaxNodes.forEach((node) => {
    const rect = node.getBoundingClientRect();
    const offset = (scrollY + rect.top * 0.6) * 0.05;
    node.style.transform = `translate3d(0, ${offset * -1}px, 0)`;
    node.style.setProperty('--parallax-intensity', `${offset * 0.35}px`);
  });
};

const throttle = (fn, limit) => {
  let inThrottle;
  return function throttled(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const toggleNav = () => {
  const nav = document.querySelector('.topbar__nav');
  nav.classList.toggle('is-open');
};

const closeNav = () => {
  const nav = document.querySelector('.topbar__nav');
  nav.classList.remove('is-open');
};

const init = () => {
  const menuButton = document.querySelector('.topbar__menu');
  const nav = document.querySelector('.topbar__nav');
  menuButton.addEventListener('click', toggleNav);
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeNav();
    }
  });
  window.addEventListener('scroll', throttle(handleParallax, 16));
  window.addEventListener('resize', throttle(handleParallax, 50));
  handleParallax();
};

if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
