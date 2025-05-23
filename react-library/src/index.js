import DecisionStyleQuiz from './DecisionStyleQuiz.js';
import AudiencePreferencesQuiz from './AudiencePreferencesQuiz.js';
import React from 'react';
import ReactDOM from 'react-dom';

// Make Component1 globally accessible
window.renderComponent1 = function(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    ReactDOM.render(<DecisionStyleQuiz />, container);
  } else {
    console.error(`Container with ID "${containerId}" not found.`);
  }
};

// Make Component2 globally accessible
window.renderComponent2 = function(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    ReactDOM.render(<AudiencePreferencesQuiz />, container);
  } else {
    console.error(`Container with ID "${containerId}" not found.`);
  }
};