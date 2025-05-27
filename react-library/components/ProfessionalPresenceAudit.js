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
    <div>
      <h2>Component {componentNumber}: Professional Presence Audit</h2>
      <p>Your clients consume content across a spectrum of channels. Understanding where your message is (or isn't) making an impact is crucial for optimizing your reach and relevance. This section evaluates your current content distribution and format strategy.</p>
      
      <h3>{currentQuestion.text}</h3>

      <div style={{ overflowX: 'auto' }}> {/* For responsiveness on small screens */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Channel</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Effectiveness</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Primary Format</th>
            </tr>
          </thead>
          <tbody>
            {currentQuestion.channels && currentQuestion.channels.map(channel => (
              <tr key={channel.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{channel.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <select
                    value={gridSelections[channel.id]?.effectiveness === null ? '' : gridSelections[channel.id]?.effectiveness}
                    onChange={(e) => handleSelectionChange(channel.id, 'effectiveness', e.target.value)}
                    style={{ padding: '5px', width: '100%' }}
                  >
                    <option value="" disabled>Select Effectiveness</option>
                    {currentQuestion.effectivenessLevels.map(level => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <select
                    value={gridSelections[channel.id]?.format === null ? '' : gridSelections[channel.id]?.format}
                    onChange={(e) => handleSelectionChange(channel.id, 'format', e.target.value)}
                    style={{ padding: '5px', width: '100%' }}
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
        style={{ marginTop: '20px', padding: '10px 15px', cursor: isGridComplete() ? 'pointer' : 'not-allowed' }}
      >
        Submit Selections
      </button>

      <p style={{ marginTop: '30px', fontStyle: 'italic' }}>
        <strong>Relevance:</strong> This audit highlights potential gaps or strengths in your channel strategy, ensuring your valuable content reaches your audience where they are most receptive.
      </p>
      <p style={{ marginTop: '15px', fontWeight: 'bold' }}>
        Next up: We'll analyze how your brand's narrative builds (or erodes) trust and credibility with potential clients.
      </p>
    </div>
  );
};

export default Component3;
