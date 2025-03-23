export function initializeChatbot() {
  const chatbot = document.querySelector('.chatbot');
  if (chatbot) {
    chatbot.addEventListener('click', () => {
      chatbot.classList.toggle('active');
      alert('Chatbot functionality coming soon!');
    });
  }
}
