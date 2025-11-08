const parallaxElements = document.querySelectorAll('[data-parallax]');
const nav = document.querySelector('.main-nav');

function handleParallax() {
  const viewportHeight = window.innerHeight;

  parallaxElements.forEach((element) => {
    const speed = parseFloat(element.dataset.speed || '0.15');
    const rect = element.getBoundingClientRect();
    const offset = (rect.top - viewportHeight / 2) * speed;
    element.style.transform = `translate3d(0, ${offset * -1}px, 0)`;
  });
}

function handleNav() {
  if (!nav) return;
  if (window.scrollY > 32) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

function animateOnScroll(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}

const observer = new IntersectionObserver(animateOnScroll, {
  threshold: 0.2,
});

parallaxElements.forEach((element) => observer.observe(element));

window.addEventListener('scroll', () => {
  handleParallax();
  handleNav();
});

window.addEventListener('resize', handleParallax);

handleParallax();
handleNav();
