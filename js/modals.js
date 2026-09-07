/* ==========================================================================
   DriveEase - Modern Native <dialog> Modal Controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const signinModal = document.getElementById('signin-modal');
  const signupModal = document.getElementById('signup-modal');
  const bookingModal = document.getElementById('booking-modal');

  // Generic Open Dialog Helper
  window.openModal = (dialogElement) => {
    if (dialogElement && typeof dialogElement.showModal === 'function') {
      dialogElement.showModal();
      document.body.style.overflow = 'hidden';
    }
  };

  // Generic Close Dialog Helper
  window.closeModal = (dialogElement) => {
    if (dialogElement && typeof dialogElement.close === 'function') {
      dialogElement.close();
      document.body.style.overflow = '';
    }
  };

  // Attach Trigger Buttons for Open
  document.querySelectorAll('[data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-open-modal');
      const targetModal = document.getElementById(targetId);
      if (targetModal) {
        window.openModal(targetModal);
      }
    });
  });

  // Attach Close Buttons
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const dialog = btn.closest('dialog');
      if (dialog) {
        window.closeModal(dialog);
      }
    });
  });

  // Native Backdrop Click-to-Close
  const allDialogs = document.querySelectorAll('dialog');
  allDialogs.forEach(dialog => {
    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        window.closeModal(dialog);
      }
    });

    // Reset body overflow when dialog closes via Escape key
    dialog.addEventListener('close', () => {
      document.body.style.overflow = '';
    });
  });

  // Switch between Sign In and Sign Up
  document.querySelectorAll('[data-switch-to]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-switch-to');
      const currentDialog = btn.closest('dialog');
      if (currentDialog) {
        window.closeModal(currentDialog);
      }
      const targetDialog = document.getElementById(targetId);
      if (targetDialog) {
        setTimeout(() => {
          window.openModal(targetDialog);
        }, 150);
      }
    });
  });

  // Form Submissions Handling (Demo UI)
  const signinForm = document.getElementById('signin-form');
  signinForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signin-email')?.value || 'User';
    window.closeModal(signinModal);
    if (window.showToast) {
      window.showToast(`Welcome back, ${email.split('@')[0]}! Signed in successfully.`, 'success');
    }
  });

  const signupForm = document.getElementById('signup-form');
  signupForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name')?.value || 'Member';
    window.closeModal(signupModal);
    if (window.showToast) {
      window.showToast(`Welcome to DriveEase, ${name}! Your account has been created.`, 'success');
    }
  });

  // Car Booking Flow Pre-fill
  document.querySelectorAll('.btn-book-car').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const carName = btn.getAttribute('data-car-name') || 'Selected Vehicle';
      const carPrice = btn.getAttribute('data-car-price') || '$150';
      const carType = btn.getAttribute('data-car-type') || 'Luxury';
      const carImg = btn.getAttribute('data-car-img') || '';

      // Update Booking Modal Content
      const modalCarName = document.getElementById('booking-car-name');
      const modalCarRate = document.getElementById('booking-car-rate');
      const modalCarType = document.getElementById('booking-car-type');
      const modalCarImg = document.getElementById('booking-car-img');
      const modalDailyRate = document.getElementById('booking-daily-rate');
      const modalTotalRate = document.getElementById('booking-total-rate');

      if (modalCarName) modalCarName.textContent = carName;
      if (modalCarRate) modalCarRate.textContent = `${carPrice} / day`;
      if (modalCarType) modalCarType.textContent = carType;
      if (modalCarImg && carImg) modalCarImg.src = carImg;
      if (modalDailyRate) modalDailyRate.textContent = `${carPrice} x 3 days`;
      
      // Calculate 3-day demo total (remove $ and convert)
      const numericPrice = parseInt(carPrice.replace(/[^0-9]/g, ''), 10) || 150;
      const subtotal = numericPrice * 3;
      const tax = Math.round(subtotal * 0.1);
      const total = subtotal + tax;

      if (modalTotalRate) modalTotalRate.textContent = `$${total.toLocaleString()}`;

      // Open Booking Modal
      window.openModal(bookingModal);
    });
  });

  // Booking Form Submission
  const bookingForm = document.getElementById('booking-form');
  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const carName = document.getElementById('booking-car-name')?.textContent || 'vehicle';
    window.closeModal(bookingModal);
    if (window.showToast) {
      window.showToast(`🎉 Reservation confirmed for ${carName}! Confirmation email sent.`, 'success');
    }
  });
});
