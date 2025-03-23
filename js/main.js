document.addEventListener('DOMContentLoaded', async (event) => {
  if (document.querySelector('.hamburger')) {
    const { initializeHamburgerMenu } = await import('./hamburger-menu.js');
    initializeHamburgerMenu();
  }
  if (document.querySelector('.logo')) {
    const { initializeLogo } = await import('./logo.js');
    initializeLogo();
  }
  if (document.querySelector('.chatbot')) {
    const { initializeChatbot } = await import('./chatbot.js');
    initializeChatbot();
  }
  if (document.getElementById('getQuoteBtn')) {
    const { initializeGetQuoteButton } = await import('./get-quote-button.js');
    initializeGetQuoteButton();
  }
  if (document.getElementById('contactForm')) {
    const { initializeContactForm } = await import('./contact-form.js');
    initializeContactForm();
  }
  if (document.getElementById('cookie-notice')) {
    const { initializeCookieNotice } = await import('./cookie-notice.js');
    initializeCookieNotice();
  }
  if (document.querySelectorAll('.faq-item').length > 0) {
    const { initializeFAQ } = await import('./faq.js');
    initializeFAQ();
  }

const yearElement = document.getElementById('year');
console.log('Year element:', yearElement);
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
    console.log('Year set to:', new Date().getFullYear());
}

});