import React, { useState, useEffect } from 'react';

const Component2 = ({ onSubmitAnswer, componentNumber, questions, onCompleteComponent }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [componentAnswers, setComponentAnswers] = useState({});

  const currentQuestion = questions[currentQuestionIndex];

  // Initialize slider answers with a default value (e.g., min or mid-point)
  useEffect(() => {
    if (currentQuestion && currentQuestion.type === 'slider') {
      if (componentAnswers[currentQuestion.id] === undefined) {
        // Initialize with min value, or average if preferred
        const initialValue = currentQuestion.min !== undefined ? currentQuestion.min : Math.floor((currentQuestion.min + currentQuestion.max) / 2);
        setComponentAnswers(prev => ({ ...prev, [currentQuestion.id]: initialValue }));
      }
    }
  }, [currentQuestion, componentAnswers]); // Added componentAnswers to dependency array to ensure re-check if it changes externally

  const handleSliderChange = (questionId, newValue) => {
    setComponentAnswers(prev => ({ ...prev, [questionId]: parseInt(newValue) }));
  };

  const handleNextClick = () => {
    if (!currentQuestion) return;

    const questionId = currentQuestion.id;
    const value = componentAnswers[questionId];

    // Ensure a value is set (should be due to useEffect initialization for sliders)
    if (value === undefined) {
      alert("Please adjust the slider before proceeding."); // Should ideally not happen
      return;
    }

    // Score calculation is now handled by QuizContainer via scoringEngine
    onSubmitAnswer(componentNumber, questionId, value, currentQuestion);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onCompleteComponent(componentNumber);
    }
  };
  
  if (!currentQuestion) {
    return <div>Loading questions or component complete...</div>;
  }

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const currentSliderValue = componentAnswers[currentQuestion.id] !== undefined 
    ? componentAnswers[currentQuestion.id] 
    : currentQuestion.min; // Fallback, though useEffect should prevent this

  return (
    <div className="component-container"> {/* Added generic container class */}
      <h2>Component {componentNumber}: Client Resonance Analyzer</h2>
      <p className="context-text">Exceptional service means nothing if your message doesn't resonate with your ideal client's deepest needs and aspirations. This section assesses how well your current communication likely connects with them.</p>
      
      <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
      <h3>{currentQuestion.text}</h3>

      {currentQuestion.type === 'slider' && (
        <div className="slider-container"> {/* Added container class */}
          <input
            type="range"
            min={currentQuestion.min}
            max={currentQuestion.max}
            value={currentSliderValue}
            onChange={(e) => handleSliderChange(currentQuestion.id, e.target.value)}
            // Inline style for width can be kept if specific, or moved to CSS
            // style={{ width: '100%', margin: '10px 0' }} 
          />
          <div className="slider-labels"> {/* Applied class */}
            <span>{currentQuestion.labels[0]} ({currentQuestion.min})</span>
            {currentQuestion.labels.length > 2 && <span>{currentQuestion.labels[1]}</span>}
            <span>{currentQuestion.labels[currentQuestion.labels.length -1]} ({currentQuestion.max})</span>
          </div>
          <p>Current Value: {currentSliderValue}</p>
        </div>
      )}

      <button
        onClick={handleNextClick}
        className="quiz-button" // Applied class
        // disabled={componentAnswers[currentQuestion.id] === undefined} 
      >
        {isLastQuestion ? 'Finish Component' : 'Next Question'}
      </button>

      <p className="relevance-text"> {/* Applied class */}
        <strong>Relevance:</strong> This assessment identifies whether your messaging resonates on a logical and emotional level, or if it's merely skimming the surface, failing to capture true interest.
      </p>
      <p className="next-steps-text"> {/* Applied class */}
        Next up: Your message is one thing—where you deliver it changes everything. Let's explore your content distribution strategy.
      </p>
    </div>
  );
};

export default Component2;
