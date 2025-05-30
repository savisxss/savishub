class SavisHub {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
    this.setupIntersectionObserver();
    this.initializeAnimations();
    this.setupFormValidation();
    this.createParticles();
    this.handleLoading();
    this.setupStatCounters();
    this.setupMobileMenu();
    this.setupSmoothScrolling();
  }

  // ===== EVENT BINDINGS =====
  bindEvents() {
    // Window events
    window.addEventListener('load', () => this.handlePageLoad());
    window.addEventListener('scroll', this.throttle(() => this.handleScroll(), 16));
    window.addEventListener('resize', this.debounce(() => this.handleResize(), 250));

    // Navigation events
    document.addEventListener('click', (e) => this.handleNavigation(e));
    
    // Form events
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }

    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => this.scrollToTop());
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
  }

  // ===== LOADING SCREEN =====
  handleLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate minimum loading time for smooth UX
    setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 500);
      }
    }, 1000);
  }

  handlePageLoad() {
    // Start animations after page load
    this.startHeroAnimations();
    this.updateNavigation();
  }

  // ===== SCROLL EFFECTS =====
  handleScroll() {
    this.updateNavigation();
    this.updateScrollIndicator();
    this.handleParallaxEffects();
  }

  updateNavigation() {
    const header = document.getElementById('header');
    const scrollY = window.scrollY;
    
    // Add scrolled class for header styling
    if (scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Update active navigation links
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === currentSection) {
        link.classList.add('active');
      }
    });
  }

  updateScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator && window.scrollY > 100) {
      scrollIndicator.style.opacity = '0';
    } else if (scrollIndicator) {
      scrollIndicator.style.opacity = '1';
    }
  }

  handleParallaxEffects() {
    const scrollY = window.scrollY;
    const heroParticles = document.getElementById('heroParticles');
    
    if (heroParticles && scrollY < window.innerHeight) {
      const speed = scrollY * 0.5;
      heroParticles.style.transform = `translateY(${speed}px)`;
    }
  }

  // ===== INTERSECTION OBSERVER =====
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Trigger specific animations
          if (entry.target.classList.contains('service-card')) {
            this.animateServiceCard(entry.target);
          }
          
          if (entry.target.classList.contains('tech-item')) {
            this.animateTechItem(entry.target);
          }
          
          if (entry.target.classList.contains('stat-item')) {
            this.animateStatCounter(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const elementsToObserve = document.querySelectorAll(`
      .section-header,
      .service-card,
      .tech-item,
      .about-content,
      .contact-content,
      .stat-item
    `);

    elementsToObserve.forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }

  // ===== ANIMATIONS =====
  initializeAnimations() {
    // Add CSS classes for initial animation states
    this.setupInitialAnimationStates();
  }

  setupInitialAnimationStates() {
    const animatedElements = document.querySelectorAll(`
      .hero-title .title-line,
      .hero-description,
      .hero-cta,
      .hero-visual
    `);

    animatedElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
    });
  }

  startHeroAnimations() {
    const titleLines = document.querySelectorAll('.hero-title .title-line');
    const description = document.querySelector('.hero-description');
    const cta = document.querySelector('.hero-cta');
    const visual = document.querySelector('.hero-visual');

    // Animate title lines
    titleLines.forEach((line, index) => {
      setTimeout(() => {
        line.style.transition = 'all 0.8s ease-out';
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
      }, index * 200);
    });

    // Animate description
    setTimeout(() => {
      if (description) {
        description.style.transition = 'all 0.8s ease-out';
        description.style.opacity = '1';
        description.style.transform = 'translateY(0)';
      }
    }, 600);

    // Animate CTA buttons
    setTimeout(() => {
      if (cta) {
        cta.style.transition = 'all 0.8s ease-out';
        cta.style.opacity = '1';
        cta.style.transform = 'translateY(0)';
      }
    }, 800);

    // Animate visual
    setTimeout(() => {
      if (visual) {
        visual.style.transition = 'all 0.8s ease-out';
        visual.style.opacity = '1';
        visual.style.transform = 'translateY(0)';
      }
    }, 1000);
  }

  animateServiceCard(card) {
    const delay = Array.from(card.parentElement.children).indexOf(card) * 100;
    
    setTimeout(() => {
      card.style.transform = 'translateY(0)';
      card.style.opacity = '1';
    }, delay);
  }

  animateTechItem(item) {
    const delay = Array.from(item.parentElement.children).indexOf(item) * 50;
    
    setTimeout(() => {
      item.style.transform = 'translateY(0) scale(1)';
      item.style.opacity = '1';
    }, delay);
  }

  // ===== STAT COUNTERS =====
  setupStatCounters() {
    this.statCounters = new Map();
  }

  animateStatCounter(statItem) {
    const numberElement = statItem.querySelector('.stat-number');
    if (!numberElement) return;

    const targetNumber = parseInt(numberElement.getAttribute('data-count'));
    const duration = 2000;
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentNumber = Math.floor(targetNumber * easeOutQuart);
      
      numberElement.textContent = currentNumber;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        numberElement.textContent = targetNumber;
      }
    };
    
    requestAnimationFrame(updateCounter);
  }

  // ===== MOBILE MENU =====
  setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      body.classList.toggle('menu-open');
    });

    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('menu-open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('menu-open');
      }
    });
  }

  // ===== SMOOTH SCROLLING =====
  setupSmoothScrolling() {
    // Enhanced smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  handleNavigation(e) {
    const target = e.target.closest('a[href^="#"]');
    if (!target) return;

    e.preventDefault();
    const targetId = target.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // ===== KEYBOARD NAVIGATION =====
  handleKeyboardNavigation(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
      const hamburger = document.getElementById('hamburger');
      const navMenu = document.getElementById('navMenu');
      
      if (hamburger?.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    }
  }

  // ===== PARTICLE SYSTEM =====
  createParticles() {
    const particlesContainer = document.getElementById('heroParticles');
    if (!particlesContainer) return;

    const particleCount = window.innerWidth > 768 ? 50 : 25;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random positioning
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 4 + 1;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 20;
      
      particle.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%);
        border-radius: 50%;
        animation: particleFloat ${duration}s ease-in-out infinite ${delay}s;
        pointer-events: none;
      `;
      
      particlesContainer.appendChild(particle);
    }

    // Add CSS animation for particles
    this.addParticleAnimation();
  }

  addParticleAnimation() {
    if (document.getElementById('particle-animation-styles')) return;

    const style = document.createElement('style');
    style.id = 'particle-animation-styles';
    style.textContent = `
      @keyframes particleFloat {
        0%, 100% {
          transform: translateY(0px) translateX(0px) rotate(0deg);
          opacity: 0;
        }
        10%, 90% {
          opacity: 1;
        }
        25% {
          transform: translateY(-20px) translateX(10px) rotate(90deg);
        }
        50% {
          transform: translateY(-40px) translateX(-5px) rotate(180deg);
        }
        75% {
          transform: translateY(-20px) translateX(-10px) rotate(270deg);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ===== FORM VALIDATION =====
  setupFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}Error`);
    
    let errorMessage = '';

    switch (fieldName) {
      case 'name':
        if (!value) {
          errorMessage = 'Name is required';
        } else if (value.length < 2) {
          errorMessage = 'Name must be at least 2 characters';
        }
        break;
        
      case 'email':
        if (!value) {
          errorMessage = 'Email is required';
        } else if (!this.isValidEmail(value)) {
          errorMessage = 'Please enter a valid email address';
        }
        break;
        
      case 'subject':
        if (!value) {
          errorMessage = 'Subject is required';
        } else if (value.length < 5) {
          errorMessage = 'Subject must be at least 5 characters';
        }
        break;
        
      case 'message':
        if (!value) {
          errorMessage = 'Message is required';
        } else if (value.length < 10) {
          errorMessage = 'Message must be at least 10 characters';
        }
        break;
    }

    if (errorElement) {
      errorElement.textContent = errorMessage;
      field.style.borderColor = errorMessage ? 'var(--error)' : '';
    }

    return !errorMessage;
  }

  clearFieldError(field) {
    const errorElement = document.getElementById(`${field.name}Error`);
    if (errorElement && field.value.trim()) {
      errorElement.textContent = '';
      field.style.borderColor = '';
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  handleFormSubmit(e) {
    const form = e.target;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    // Validate all fields
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    if (!isValid) {
      e.preventDefault();
      this.showFormStatus('Please correct the errors above', 'error');
      return;
    }

    // Show loading state
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span>Sending...</span>
      <div style="width: 20px; height: 20px; border: 2px solid transparent; border-top: 2px solid currentColor; border-radius: 50%; animation: spin 1s linear infinite;"></div>
    `;

    // Note: FormSubmit will handle the actual submission
    // The form will redirect to the success page specified in _next field
  }

  showFormStatus(message, type) {
    const statusElement = document.getElementById('formStatus');
    if (!statusElement) return;

    statusElement.textContent = message;
    statusElement.className = `form-status ${type}`;
    statusElement.style.display = 'block';

    // Auto hide after 5 seconds
    setTimeout(() => {
      statusElement.style.display = 'none';
    }, 5000);
  }

  // ===== RESIZE HANDLER =====
  handleResize() {
    // Recreate particles on significant size changes
    const currentWidth = window.innerWidth;
    if (Math.abs(currentWidth - (this.lastWidth || currentWidth)) > 200) {
      this.lastWidth = currentWidth;
      const particlesContainer = document.getElementById('heroParticles');
      if (particlesContainer) {
        particlesContainer.innerHTML = '';
        this.createParticles();
      }
    }
  }

  // ===== UTILITY FUNCTIONS =====
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // ===== PERFORMANCE MONITORING =====
  measurePerformance() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          console.log('Page Load Performance:', {
            dns: perfData.domainLookupEnd - perfData.domainLookupStart,
            connection: perfData.connectEnd - perfData.connectStart,
            response: perfData.responseEnd - perfData.responseStart,
            dom: perfData.domInteractive - perfData.responseEnd,
            total: perfData.loadEventEnd - perfData.navigationStart
          });
        }, 0);
      });
    }
  }
}

// ===== ADDITIONAL UTILITY FUNCTIONS =====

/**
 * Lazy load images for better performance
 */
function setupLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

/**
 * Add custom cursor effects
 */
function setupCustomCursor() {
  if (window.innerWidth > 1024) { // Only on desktop
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.1s ease-out;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    // Scale cursor on interactive elements
    document.querySelectorAll('a, button, .service-card, .tech-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
  }
}

/**
 * Add Easter egg for developers
 */
function addDeveloperEasterEgg() {
  console.log(`
    %c🚀 savisHub - Professional Development Services
    
    %cLooking at the source code? I appreciate attention to detail!
    
    %cInterested in working together?
    💬 Discord: savisxss
    📧 Email: savis.xss@gmail.com
    🐙 GitHub: https://github.com/savisxss
    
    %cTech Stack Used:
    • Vanilla JavaScript (ES6+)
    • Modern CSS with Custom Properties
    • Intersection Observer API
    • Performance-optimized animations
    • Mobile-first responsive design
    • Accessibility best practices
  `, 
    'color: #3b82f6; font-size: 18px; font-weight: bold;',
    'color: #64748b; font-size: 14px;',
    'color: #10b981; font-size: 14px;',
    'color: #7c3aed; font-size: 12px;'
  );
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize main application
  new SavisHub();
  
  // Setup additional features
  setupLazyLoading();
  setupCustomCursor();
  addDeveloperEasterEgg();
  
  // Register Service Worker for PWA functionality (if available)
  if ('serviceWorker' in navigator && location.hostname !== 'localhost') {
    navigator.serviceWorker.register('/savishub/sw.js').catch(err => {
      console.log('Service Worker registration failed:', err);
    });
  }
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SavisHub;
}