// This file contains the JavaScript functionality specific to the content menu. 
// It handles menu interactions, such as opening, closing, and navigation.

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.hamburger');
    const menu = document.querySelector('.main-nav');
    const closeBtn = document.querySelector('.close-btn');

    // Function to open the menu
    function openMenu() {
        menu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Function to close the menu
    function closeMenu() {
        menu.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scrolling
    }

    // Event listener for the hamburger icon
    menuToggle.addEventListener('click', openMenu);

    // Event listener for the close button
    closeBtn.addEventListener('click', closeMenu);

    // Close menu when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
            closeMenu();
        }
    });
});