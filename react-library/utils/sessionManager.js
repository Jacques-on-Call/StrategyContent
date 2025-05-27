export const setSessionCookie = (sessionData) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 30); // Expires in 30 days
  const cookieString = `brandStorySession=${JSON.stringify(sessionData)};expires=${expires.toUTCString()};path=/`;
  document.cookie = cookieString;
};

export const getSessionCookie = () => {
  const nameEQ = 'brandStorySession=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      try {
        return JSON.parse(c.substring(nameEQ.length, c.length));
      } catch (e) {
        console.error("Error parsing session cookie:", e);
        return null;
      }
    }
  }
  return null;
};

export const clearSessionCookie = () => {
  document.cookie = 'brandStorySession=;Max-Age=-99999999;path=/';
};

export const generateSessionToken = () => {
  return `${Date.now().toString(36)}${Math.random().toString(36).substr(2, 5)}`;
};

// Example Usage (for testing purposes, remove or comment out in production)
/*
const sampleSession = {
  session_token: generateSessionToken(),
  progress: {
    currentComponent: 'Component1',
    questionsAnswered: 0
  },
  personalityProfile: [],
  lastActive: Date.now()
};
setSessionCookie(sampleSession);
console.log(getSessionCookie());
clearSessionCookie();
console.log(getSessionCookie());
*/
