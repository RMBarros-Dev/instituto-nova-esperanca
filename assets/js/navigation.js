/**
 * INSTITUTO NOVA ESPERANÇA — NAVIGATION MODULE V7.4
 * Drawer Mobile Acessível, Trap de Foco, Sticky Header, Navegação por Teclado (WCAG 2.2 AAA)
 */

(function () {
  'use strict';

  class Navigation {
    constructor() {
      this.header = document.querySelector('.site-header');
      this.toggleBtn = document.querySelector('.mobile-nav-toggle');
      this.nav = document.getElementById('main-navigation') || document.querySelector('.main-nav');
      this.isOpen = false;
      this.focusableEls = [];
      this.firstFocusable = null;
      this.lastFocusable = null;

      this.init();
    }

    init() {
      if (this.toggleBtn && this.nav) {
        this.bindDrawer();
      }
      this.bindScroll();
      this.bindSkipLinks();
    }

    bindDrawer() {
      this.toggleBtn.addEventListener('click', () => this.toggle());

      document.addEventListener('keydown', (e) => {
        if (!this.isOpen) return;

        if (e.key === 'Escape') {
          e.preventDefault();
          this.close();
          this.toggleBtn.focus();
        }

        if (e.key === 'Tab') {
          this.handleFocusTrap(e);
        }
      });

      // Fechar ao clicar fora no mobile
      document.addEventListener('click', (e) => {
        if (this.isOpen && !this.nav.contains(e.target) && !this.toggleBtn.contains(e.target)) {
          this.close();
        }
      });
    }

    toggle() {
      if (this.isOpen) this.close();
      else this.open();
    }

    open() {
      this.isOpen = true;
      this.nav.classList.add('is-open');
      this.toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('is-nav-open');
      document.body.style.overflow = 'hidden';

      this.updateFocusableElements();
      if (this.firstFocusable) {
        setTimeout(() => this.firstFocusable.focus(), 50);
      }
    }

    close() {
      this.isOpen = false;
      this.nav.classList.remove('is-open');
      this.toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('is-nav-open');
      document.body.style.overflow = '';
    }

    updateFocusableElements() {
      const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
      this.focusableEls = Array.from(this.nav.querySelectorAll(focusableSelector));
      this.firstFocusable = this.focusableEls[0];
      this.lastFocusable = this.focusableEls[this.focusableEls.length - 1];
    }

    handleFocusTrap(e) {
      if (!this.firstFocusable || !this.lastFocusable) return;

      if (e.shiftKey) {
        if (document.activeElement === this.firstFocusable) {
          e.preventDefault();
          this.lastFocusable.focus();
        }
      } else {
        if (document.activeElement === this.lastFocusable) {
          e.preventDefault();
          this.firstFocusable.focus();
        }
      }
    }

    bindScroll() {
      if (!this.header) return;

      let lastScrollY = window.scrollY;
      const onScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > 20) {
          this.header.classList.add('is-scrolled');
        } else {
          this.header.classList.remove('is-scrolled');
        }
        lastScrollY = currentScrollY;
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    bindSkipLinks() {
      document.querySelectorAll('.skip-link').forEach(link => {
        link.addEventListener('click', (e) => {
          const targetId = link.getAttribute('href');
          if (targetId && targetId.startsWith('#')) {
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
              targetEl.setAttribute('tabindex', '-1');
              targetEl.focus();
            }
          }
        });
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (window.safeRun) {
      window.safeRun('Navigation', () => new Navigation());
    } else {
      new Navigation();
    }
  });

})();
