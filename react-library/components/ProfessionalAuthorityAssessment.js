import React, { useState } from 'react';
import { QuestionsData } from '../data/questions.js';

const Component1 = ({ onSubmitAnswer, componentNumber }) => {
  const [selectedOptionValue, setSelectedOptionValue] = useState('');

  const questionConfig = QuestionsData.component1[0];

  const handleOptionClick = (value) => {
    setSelectedOptionValue(value);
  };

  const handleSubmit = () => {
    if (!selectedOptionValue) {
      // This should ideally not be reachable if button is disabled, but as a safeguard:
      alert("Please select an option before submitting.");
      return;
    }

    const questionId = questionConfig.id;
    // Score calculation is now handled by QuizContainer via scoringEngine
    onSubmitAnswer(componentNumber, questionId, selectedOptionValue, questionConfig);
  };

  return (
    <div className="component-container"> {/* Added generic container class */}
      <h2>Component {componentNumber}: Brand Story Foundation</h2>
      <p className="context-text">Your expertise is unquestionable, but is your story? Many brilliant minds struggle to translate their complex value into a narrative that captivates and converts. This first step is about assessing the core of your current brand story.</p>
      
      <h3>{questionConfig.text}</h3>
      
      <div className="options-container"> {/* Added container for options */}
        {questionConfig.options.map(option => (
          <button
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
            className={`quiz-option-btn ${selectedOptionValue === option.value ? 'selected' : ''}`} // Applied classes
          >
            {option.text}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedOptionValue}
        className="quiz-button" // Applied class
      >
        Submit Answer
      </button>

      <p className="relevance-text"> {/* Applied class */}
        <strong>Relevance:</strong> These answers reveal whether your content positions you as a 'must-have' authority or a 'nice-to-have' commodity. Understanding your baseline is key to elevating your message.
      </p>
      <p className="next-steps-text"> {/* Applied class */}
        Next up: Now let's see if you're speaking their language, or if your message is getting lost in translation.
      </p>
    </div>
  );
};

export default Component1;
