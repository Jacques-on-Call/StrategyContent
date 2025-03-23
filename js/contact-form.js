export function initializeContactForm() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', handleContactFormSubmission);
  }
}

function handleContactFormSubmission(e) {
  e.preventDefault();
  grecaptcha.ready(function() {
    grecaptcha.execute('6LdMRV4qAAAAAODiZpygVMvT5sb2n30Xxps8EJin', { action: 'submit' }).then(function(token) {
      document.getElementById('g-recaptcha-response').value = token;
      var formData = new FormData(e.target);
      fetch('../php/contact.php', { method: 'POST', body: formData })
        .then(response => response.text())
        .then(data => {
          if (data.trim() === 'success') {
            window.location.href = 'contact-success.html';
          } else {
            throw new Error('Server response: ' + data);
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while submitting the form. Please try again later.');
        });
    });
  });
}
