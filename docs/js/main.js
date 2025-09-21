// Typed.js animation (your existing code)
var typed = new Typed(".auto-type", {
    strings: ["Astrophysics", "Transients", "Machine Learning", "Data Analysis"],
    typeSpeed: 80,
    backSpeed: 50,
    loop: true
  });
  
  // Fade/Slide scroll animation for sections
  const sections = document.querySelectorAll(".section");
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });
  
  sections.forEach(section => observer.observe(section));
  