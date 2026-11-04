/* ==========================================================================
   Demo Precision Sdn Bhd - Static Interactions
   Plain JavaScript; zero external dependencies or network requests.
   Behaviour customised for static demonstration.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --- Mobile Navigation Toggle ---
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');
  var navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      navMenu.classList.toggle('is-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
      if (!navMenu.contains(event.target) && !navToggle.contains(event.target) && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu on Escape key press
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  // Close mobile navigation drawer when any link is selected
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navMenu && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        if (navToggle) {
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // --- Contact Form Placeholder Handling ---
  var contactForm = document.getElementById('contact-form');
  var formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', function (event) {
      // Prevent any submission or network dispatch
      event.preventDefault();

      var nameInput = document.getElementById('name');
      var emailInput = document.getElementById('email');
      var messageInput = document.getElementById('message');

      var nameValue = nameInput ? nameInput.value.trim() : '';
      var emailValue = emailInput ? emailInput.value.trim() : '';
      var messageValue = messageInput ? messageInput.value.trim() : '';

      // Client-side field completion check
      if (!nameValue || !emailValue || !messageValue) {
        formStatus.textContent = 'Please fill in all fields before submitting.';
        formStatus.className = 'form-status status-error';
        return;
      }

      // Email format check
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailValue)) {
        formStatus.textContent = 'Please enter a valid email address.';
        formStatus.className = 'form-status status-error';
        return;
      }

      // Form is a placeholder only, customised to send nothing anywhere
      formStatus.textContent = 'Thank you for your enquiry. This form is a placeholder only, customised for demonstration purposes, and sends nothing anywhere.';
      formStatus.className = 'form-status status-success';
      contactForm.reset();
    });
  }

  // --- Active Navigation Link Highlight (ScrollSpy) ---
  var sections = document.querySelectorAll('main > section');
  if ('IntersectionObserver' in window && sections.length > 0) {
    var observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
});
