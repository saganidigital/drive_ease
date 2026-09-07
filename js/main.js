/* ==========================================================================
   DriveEase - Main Application Logic & Global Interactivity
   ========================================================================== */

// 1. Toast Notification System
window.showToast = (message, type = 'info') => {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let iconSvg = '';
  if (type === 'whatsapp') {
    iconSvg = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 2.05.811 3.211.812h.005c3.18 0 5.767-2.587 5.768-5.767 0-3.18-2.587-5.767-5.769-5.767zm7.848 5.766c-.002 4.337-3.529 7.863-7.868 7.863-1.321 0-2.613-.332-3.762-.962l-4.249 1.114 1.134-4.143c-.705-1.223-1.077-2.612-1.076-4.032.003-4.337 3.53-7.864 7.87-7.864 4.338 0 7.867 3.527 7.871 7.864z"/>
      </svg>
    `;
  } else if (type === 'success') {
    iconSvg = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    `;
  } else {
    iconSvg = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    `;
  }

  toast.innerHTML = `
    <span class="toast-icon">${iconSvg}</span>
    <span class="toast-text">${message}</span>
  `;

  container.appendChild(toast);

  // Auto remove after 4.2s
  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => {
      toast.remove();
    }, 350);
  }, 4200);
};

// 2. WhatsApp Demo Trigger
document.addEventListener('DOMContentLoaded', () => {
  const whatsappTriggers = document.querySelectorAll('.btn-whatsapp, .whatsapp-trigger');
  
  whatsappTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.showToast(
        '💬 WhatsApp Concierge (Demo Mode): In live production, this opens a direct 24/7 priority chat with your vehicle agent.',
        'whatsapp'
      );
    });
  });

  // 3. Stats Counter Animation on Scroll
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const animateCounters = () => {
    statNumbers.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target')) || 0;
      const isDecimal = target % 1 !== 0;
      const duration = 1800; // ms
      const steps = 60;
      const stepTime = duration / steps;
      let current = 0;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = isDecimal ? target.toFixed(1) : Math.floor(target).toLocaleString();
          clearInterval(timer);
        } else {
          counter.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString();
        }
      }, stepTime);
    });
  };

  const statsSection = document.querySelector('.stats-banner');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          animateCounters();
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.25 });

    statsObserver.observe(statsSection);
  }

  // 4. Scroll Reveal Intersection Observer
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 5. Newsletter Subscription Form Handler
  const newsletterForm = document.getElementById('newsletter-form');
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('.newsletter-input');
    if (input && input.value) {
      window.showToast('✨ Thank you for subscribing! You will receive VIP discounts & fleet updates.', 'success');
      input.value = '';
    }
  });

  // Log successful startup
  console.log('DriveEase UI Loaded - Premium Warm Obsidian & Burnt Orange Experience');
});
