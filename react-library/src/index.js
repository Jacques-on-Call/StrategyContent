import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18
import QuizContainer from '../components/QuizContainer'; // Adjust path if needed
// Assuming css/quiz.css is linked in the main HTML or imported here if using a bundler that handles CSS imports
// import '../../css/quiz.css'; // Example if CSS is imported in JS

// Get the root element from the HTML
const rootElement = document.getElementById('brandStoryJourneyAssessmentRoot');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <QuizContainer />
    </React.StrictMode>
  );
} else {
  console.error('Target root element "brandStoryJourneyAssessmentRoot" not found in the HTML.');
}
