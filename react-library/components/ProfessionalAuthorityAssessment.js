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
    <div>
      <h2>Component {componentNumber}: Brand Story Foundation</h2>
      <p>Your expertise is unquestionable, but is your story? Many brilliant minds struggle to translate their complex value into a narrative that captivates and converts. This first step is about assessing the core of your current brand story.</p>
      
      <h3>{questionConfig.text}</h3>
      
      <div>
        {questionConfig.options.map(option => (
          <button
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
            style={{ 
              backgroundColor: selectedOptionValue === option.value ? 'lightblue' : 'white', 
              border: selectedOptionValue === option.value ? '2px solid blue' : '1px solid #ccc',
              margin: '5px', 
              padding: '10px',
              textAlign: 'left',
              cursor: 'pointer'
            }}
          >
            {option.text}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedOptionValue}
        style={{ marginTop: '20px', padding: '10px 15px', cursor: selectedOptionValue ? 'pointer' : 'not-allowed' }}
      >
        Submit Answer
      </button>

      <p style={{ marginTop: '30px', fontStyle: 'italic' }}>
        <strong>Relevance:</strong> These answers reveal whether your content positions you as a 'must-have' authority or a 'nice-to-have' commodity. Understanding your baseline is key to elevating your message.
      </p>
      <p style={{ marginTop: '15px', fontWeight: 'bold' }}>
        Next up: Now let's see if you're speaking their language, or if your message is getting lost in translation.
      </p>
    </div>
  );
};

export default Component1;
