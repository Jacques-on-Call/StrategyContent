import React, { useState, useEffect } from 'react';

const Component4 = ({ onSubmitAnswer, componentNumber, questions, onCompleteComponent }) => {
  const [selectedPrimaryOptionValue, setSelectedPrimaryOptionValue] = useState('');
  const [followUpSliderValue, setFollowUpSliderValue] = useState(0); // Default, will be updated
  const [currentFollowUpQuestion, setCurrentFollowUpQuestion] = useState(null);
  const [sliderInteracted, setSliderInteracted] = useState(false); // Track if slider was touched

  const primaryQuestion = questions.find(q => q.type === 'singleChoiceWithFollowUp');

  useEffect(() => {
    if (primaryQuestion && selectedPrimaryOptionValue) {
      const selectedOption = primaryQuestion.options.find(opt => opt.value === selectedPrimaryOptionValue);
      if (selectedOption && selectedOption.followUpQuestionId) {
        const followUpQ = questions.find(q => q.id === selectedOption.followUpQuestionId);
        setCurrentFollowUpQuestion(followUpQ);
        // Initialize slider value to min or a default if min is not defined (e.g. 0)
        const initialSliderValue = followUpQ && followUpQ.min !== undefined ? followUpQ.min : 0;
        setFollowUpSliderValue(initialSliderValue);
        setSliderInteracted(false); // Reset interaction tracking for new follow-up
      } else {
        setCurrentFollowUpQuestion(null);
        setSliderInteracted(false);
      }
    } else {
      setCurrentFollowUpQuestion(null);
      setSliderInteracted(false);
    }
  }, [selectedPrimaryOptionValue, questions, primaryQuestion]);

  const handlePrimaryOptionChange = (value) => {
    setSelectedPrimaryOptionValue(value);
    // Follow-up and slider value will be set by useEffect
  };

  const handleSliderChange = (value) => {
    setFollowUpSliderValue(parseInt(value, 10));
    setSliderInteracted(true);
  };

  const handleSubmit = () => {
    if (!primaryQuestion || !selectedPrimaryOptionValue) {
      alert("Please select an answer for the primary question.");
      return;
    }

    // Primary Answer
    const primaryValue = selectedPrimaryOptionValue;
    // Score calculation is now handled by QuizContainer via scoringEngine
    onSubmitAnswer(componentNumber, primaryQuestion.id, primaryValue, primaryQuestion);

    // Follow-up Answer (if applicable)
    if (currentFollowUpQuestion) {
      if (!sliderInteracted && currentFollowUpQuestion.min === followUpSliderValue) {
        // If slider wasn't touched AND its value is still the initial minimum,
        // it's often good practice to confirm this is the intended value or prompt interaction.
        // For this implementation, we'll submit it as is, assuming default is acceptable if not touched.
      }
      const followUpValue = followUpSliderValue;
      // Score calculation is now handled by QuizContainer via scoringEngine
      onSubmitAnswer(componentNumber, currentFollowUpQuestion.id, followUpValue, currentFollowUpQuestion);
    }

    onCompleteComponent(componentNumber);
  };
  
  const isSubmitDisabled = () => {
    if (!selectedPrimaryOptionValue) return true;
    // If there's a follow-up, it's not strictly required to interact if default is okay
    // but you might want to enforce interaction:
    // if (currentFollowUpQuestion && !sliderInteracted) return true; 
    return false;
  };

  if (!primaryQuestion) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="component-container"> {/* Added generic container class */}
      <h2>Component {componentNumber}: Authenticity & Trust Audit</h2>
      <p className="context-text">In today's market, authenticity isn't just a buzzword—it's the currency of trust. This section probes the alignment between your brand's proclaimed values and its operational reality, a critical factor in building lasting client relationships.</p>
      
      <h3>{primaryQuestion.text}</h3>
      <div className="radio-options-container"> {/* Added container for radio options */}
        {primaryQuestion.options.map(option => (
          <div key={option.value} className="radio-option-wrapper"> {/* Wrapper for each radio option */}
            <label 
              className={`radio-option-label ${selectedPrimaryOptionValue === option.value ? 'selected' : ''}`}
              // The 'selected' class on label is for visual cues if CSS is designed for it.
              // Actual check is via input:checked.
            >
              <input
                type="radio"
                name={primaryQuestion.id}
                value={option.value}
                checked={selectedPrimaryOptionValue === option.value}
                onChange={() => handlePrimaryOptionChange(option.value)}
                // Inline style for marginRight removed, should be handled by CSS if needed
              />
              {option.text}
            </label>
          </div>
        ))}
      </div>

      {currentFollowUpQuestion && (
        <div className="slider-container" style={{ marginTop: '20px' }}> {/* Added class, kept marginTop for spacing */}
          <h4>{currentFollowUpQuestion.text}</h4>
          <input
            type="range"
            min={currentFollowUpQuestion.min}
            max={currentFollowUpQuestion.max}
            value={followUpSliderValue}
            onChange={(e) => handleSliderChange(e.target.value)}
            // Inline style for width/margin removed or commented
          />
          <div className="slider-labels"> {/* Applied class */}
            <span>{currentFollowUpQuestion.labels[0]} ({currentFollowUpQuestion.min})</span>
            {currentFollowUpQuestion.labels.length > 2 && <span>{currentFollowUpQuestion.labels[1]}</span>}
            <span>{currentFollowUpQuestion.labels[currentFollowUpQuestion.labels.length - 1]} ({currentFollowUpQuestion.max})</span>
          </div>
          <p>Current Value: {followUpSliderValue}</p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={isSubmitDisabled()}
        className="quiz-button" // Applied class
      >
        Submit Answers
      </button>

      <p className="relevance-text"> {/* Applied class */}
        <strong>Relevance:</strong> Misalignment here can subtly erode client trust. This audit helps pinpoint areas where your brand's walk might not match its talk, which is pivotal for long-term credibility.
      </p>
      <p className="next-steps-text"> {/* Applied class */}
        Next up: The final piece of the puzzle—how all these elements combine to form your client's overall perception and experience.
      </p>
    </div>
  );
};

export default Component4;
