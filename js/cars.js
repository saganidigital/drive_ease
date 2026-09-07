/* ==========================================================================
   DriveEase - Fleet Filtering, Search Integration & Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Fleet Category Filtering
  const filterTabs = document.querySelectorAll('.filter-tab');
  const carCards = document.querySelectorAll('.car-card');

  const filterCars = (category) => {
    carCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (category === 'all' || cardCategory === category) {
        card.classList.remove('hidden');
        // Trigger subtle reveal
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 30);
      } else {
        card.classList.add('hidden');
      }
    });
  };

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.getAttribute('data-filter') || 'all';
      filterCars(category);
    });
  });

  // 2. Search Widget Integration
  const searchForm = document.getElementById('car-search-form');
  const searchCategorySelect = document.getElementById('search-category');
  const searchTabs = document.querySelectorAll('.search-tab-btn');

  // Search Mode Tabs (Round Trip, One Way, Chauffeur)
  searchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      searchTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  searchForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedCategory = searchCategorySelect?.value || 'all';
    const location = document.getElementById('search-location')?.value || 'Selected Hub';
    
    // Find matching fleet tab
    const matchingTab = document.querySelector(`.filter-tab[data-filter="${selectedCategory}"]`) || 
                        document.querySelector(`.filter-tab[data-filter="all"]`);
    
    if (matchingTab) {
      filterTabs.forEach(t => t.classList.remove('active'));
      matchingTab.classList.add('active');
      filterCars(selectedCategory);
    }

    // Smooth scroll to fleet
    const fleetSection = document.getElementById('fleet');
    if (fleetSection) {
      fleetSection.scrollIntoView({ behavior: 'smooth' });
    }

    if (window.showToast) {
      const count = selectedCategory === 'all' ? 
        carCards.length : 
        document.querySelectorAll(`.car-card[data-category="${selectedCategory}"]`).length;
      window.showToast(`Found ${count} available vehicles near ${location}`, 'info');
    }
  });

  // 3. Like / Wishlist Heart Button
  document.querySelectorAll('.car-like-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.toggle('liked');
      const isLiked = btn.classList.contains('liked');
      const carName = btn.closest('.car-card')?.querySelector('.car-name')?.textContent || 'Vehicle';
      
      if (window.showToast) {
        if (isLiked) {
          window.showToast(`❤️ Added ${carName} to your favorites!`, 'info');
        } else {
          window.showToast(`Removed ${carName} from favorites`, 'info');
        }
      }
    });
  });

  // 4. Testimonials Carousel Controls
  const track = document.querySelector('.testimonials-track');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');

  if (track && prevBtn && nextBtn) {
    const cardWidth = 450;

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
  }

  // 5. Promo Code Copy
  const copyPromoBtn = document.getElementById('copy-promo-btn');
  copyPromoBtn?.addEventListener('click', () => {
    const code = 'DRIVE20';
    navigator.clipboard?.writeText(code).then(() => {
      if (window.showToast) {
        window.showToast(`🎉 Promo code ${code} copied to clipboard! (20% Off)`, 'success');
      }
    }).catch(() => {
      if (window.showToast) {
        window.showToast(`Code is: ${code} - apply at reservation!`, 'info');
      }
    });
  });
});
