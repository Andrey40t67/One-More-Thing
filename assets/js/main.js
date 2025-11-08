const navLinks = Array.from(document.querySelectorAll('.navbar nav a'));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.navbar nav');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuToggle.classList.toggle('open');
  });
}

navLinks.forEach((link) =>
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.classList.remove('open');
  })
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const index = sections.indexOf(entry.target);
      if (index >= 0) {
        navLinks[index].classList.toggle('active', entry.isIntersecting);
      }
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0.2,
  }
);

sections.forEach((section) => {
  section.classList.add('reveal');
  observer.observe(section);
});

const hero = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  const progress = Math.min(window.scrollY / 600, 1);
  hero.style.setProperty('--hero-blur', `${progress * 16}px`);
  hero.style.setProperty('--hero-opacity', `${1 - progress * 0.2}`);
});
