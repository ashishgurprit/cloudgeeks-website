// CloudGeeks Ghost Theme - Main JS

(function() {
    'use strict';

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const siteNav = document.querySelector('.site-nav');

    if (menuToggle && siteNav) {
        menuToggle.addEventListener('click', function() {
            siteNav.classList.toggle('is-open');
            menuToggle.classList.toggle('is-active');
        });
    }

    // Header scroll effect
    const header = document.querySelector('.site-header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }

        lastScroll = currentScroll;
    });

    // Lazy load images with fade in
    const images = document.querySelectorAll('img[loading="lazy"]');

    images.forEach(img => {
        img.addEventListener('load', function() {
            img.classList.add('is-loaded');
        });
    });

    // External links open in new tab
    const links = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');

    links.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

})();
