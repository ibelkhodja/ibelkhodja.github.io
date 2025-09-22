// Add js-enabled class to html element
document.documentElement.classList.add('js-enabled');

// Initialize variables
const themeToggle = document.getElementById("theme-toggle");
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
let typedInstance = null;

// Function to restart typewriter with proper colors
function restartTypewriter() {
    if (typedInstance) {
      typedInstance.destroy();
    }
    
    if (typeof Typed !== 'undefined') {
      // Check current theme and set appropriate color
      const isDarkMode = document.body.classList.contains("dark-mode");
      const textColor = isDarkMode ? "#7ab8a5" : "#4c8577"; // Light green for dark, dark green for light
      
      // Apply color to the typewriter element
      const typewriterElement = document.querySelector(".auto-type");
      if (typewriterElement) {
        typewriterElement.style.color = textColor;
      }
      
      // Create new typed instance
      typedInstance = new Typed(".auto-type", {
        strings: ["transients", "data analysis", "machine learning in astronomy", "astronomical visualization"],
        typeSpeed: 70,
        backSpeed: 40,
        loop: true,
        // Ensure color is applied when typing starts
        onBegin: function(self) {
          self.cursor.style.display = 'inline';
          if (typewriterElement) {
            typewriterElement.style.color = textColor;
          }
        },
        // Ensure color is maintained after each string is typed
        onStringTyped: function(arrayPos, self) {
          if (typewriterElement) {
            typewriterElement.style.color = textColor;
          }
        }
      });
    }
  }
  
  // Dark/Light Mode Toggle with typewriter restart
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const icon = themeToggle.querySelector("i");
      
      if (document.body.classList.contains("dark-mode")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
        localStorage.setItem('theme', 'dark');
      } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
        localStorage.setItem('theme', 'light');
      }
      
      // Restart typewriter effect with correct colors
      restartTypewriter();
    });
  }
  
  // Initialize typewriter on page load
  document.addEventListener("DOMContentLoaded", function () {
    // Check for saved theme preference first
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add("dark-mode");
      if (themeToggle) {
        themeToggle.querySelector("i").classList.remove("fa-moon");
        themeToggle.querySelector("i").classList.add("fa-sun");
      }
    }
    
    // Then initialize typewriter with correct colors
    restartTypewriter();
  });

// Smooth Scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    // Update active nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
    });
    this.classList.add('active');
    
    // Get the target element
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // Calculate the position to scroll to (accounting for fixed header)
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      // Smooth scroll to the target
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    // Close mobile menu if open
    if (navLinks && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      if (hamburger) {
        hamburger.classList.remove('active');
      }
    }
  });
});

// Mobile menu toggle
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (hamburger && navLinks && 
      !hamburger.contains(e.target) && 
      !navLinks.contains(e.target) && 
      navLinks.classList.contains('active')) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinksArray = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinksArray.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
  
  // Show/hide back to top button
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    if (window.pageYOffset > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
});

// Back to top functionality
const backToTopBtn = document.querySelector('.back-to-top');
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Form submission (prevent default for demo)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Form submission would happen here in a real implementation!');
  });
}