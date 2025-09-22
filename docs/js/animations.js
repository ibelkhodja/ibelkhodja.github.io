// Scroll animations
const animatedElements = document.querySelectorAll('.section-title, .hero-title, .hero-subtitle, .hero-text, .hero-buttons, .hero-image-container, .timeline-item, .project-card, .contact-info p, .contact-item, .contact-form');

const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animatedElements.forEach(element => {
  observer.observe(element);
});