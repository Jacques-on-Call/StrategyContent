import React, { useState, useEffect } from 'react';

const Component3 = ({ onSubmitAnswer, componentNumber, questions, onCompleteComponent }) => {
  const [gridSelections, setGridSelections] = useState({});
  
  // Assuming one grid question per component for now.
  const currentQuestion = questions[0]; 

  useEffect(() => {
    if (currentQuestion && currentQuestion.channels) {
      const initialSelections = {};
      currentQuestion.channels.forEach(channel => {
        initialSelections[channel.id] = { effectiveness: null, format: null };
      });
      setGridSelections(initialSelections);
    }
  }, [currentQuestion]); // Dependency on currentQuestion to re-init if it changes

  const handleSelectionChange = (channelId, type, value) => {
    // Convert value to number if it's for effectiveness, as values are numbers
    const processedValue = type === 'effectiveness' && value !== '' ? parseInt(value, 10) : (value === '' ? null : value);
    setGridSelections(prev => ({
      ...prev,
      [channelId]: {
        ...prev[channelId],
        [type]: processedValue
      }
    }));
  };

  const isGridComplete = () => {
    if (!currentQuestion || !currentQuestion.channels) return false;
    return currentQuestion.channels.every(channel => {
      const selection = gridSelections[channel.id];
      return selection && selection.effectiveness !== null && selection.format !== null;
    });
  };

  const handleSubmitGrid = () => {
    if (!isGridComplete()) {
      alert("Please make a selection for all options in the grid.");
      return;
    }

    let veryEffectiveCount = 0;
    Object.values(gridSelections).forEach(sel => {
      // Value for 'Very Effective' is 4 as per questions.js
      if (sel.effectiveness === 4) { 
        veryEffectiveCount++;
      }
    });
    // const calculatedScore = veryEffectiveCount; // Score calculation is now handled by QuizContainer via scoringEngine

    onSubmitAnswer(componentNumber, currentQuestion.id, gridSelections, currentQuestion);
    onCompleteComponent(componentNumber);
  };

  if (!currentQuestion) {
    return <div>Loading question...</div>;
  }

  return (
    <div className="component-container"> {/* Added generic container class */}
      <h2>Component {componentNumber}: Professional Presence Audit</h2>
      <p className="context-text">Your clients consume content across a spectrum of channels. Understanding where your message is (or isn't) making an impact is crucial for optimizing your reach and relevance. This section evaluates your current content distribution and format strategy.</p>
      
      <h3>{currentQuestion.text}</h3>

      <div style={{ overflowX: 'auto' }}> {/* This inline style for responsiveness can be kept or moved to a specific class if preferred */}
        <table className="grid-table"> {/* Applied class */}
          <thead>
            <tr>
              <th>Channel</th> {/* Removed inline styles, will be handled by .grid-table th */}
              <th>Effectiveness</th>
              <th>Primary Format</th>
            </tr>
          </thead>
          <tbody>
            {currentQuestion.channels && currentQuestion.channels.map(channel => (
              <tr key={channel.id}>
                <td>{channel.name}</td> {/* Removed inline styles, will be handled by .grid-table td */}
                <td>
                  <select
                    value={gridSelections[channel.id]?.effectiveness === null ? '' : gridSelections[channel.id]?.effectiveness}
                    onChange={(e) => handleSelectionChange(channel.id, 'effectiveness', e.target.value)}
                    // Inline style for padding/width removed, should be handled by general select styling in CSS
                  >
                    <option value="" disabled>Select Effectiveness</option>
                    {currentQuestion.effectivenessLevels.map(level => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={gridSelections[channel.id]?.format === null ? '' : gridSelections[channel.id]?.format}
                    onChange={(e) => handleSelectionChange(channel.id, 'format', e.target.value)}
                    // Inline style for padding/width removed
                  >
                    <option value="" disabled>Select Format</option>
                    {currentQuestion.formats.map(format => (
                      <option key={format.value} value={format.value}>{format.label}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={handleSubmitGrid}
        disabled={!isGridComplete()}
        className="quiz-button" // Applied class
      >
        Submit Selections
      </button>

      <p className="relevance-text"> {/* Applied class */}
        <strong>Relevance:</strong> This audit highlights potential gaps or strengths in your channel strategy, ensuring your valuable content reaches your audience where they are most receptive.
      </p>
      <p className="next-steps-text"> {/* Applied class */}
        Next up: We'll analyze how your brand's narrative builds (or erodes) trust and credibility with potential clients.
      </p>
    </div>
  );
};

export default Component3;
