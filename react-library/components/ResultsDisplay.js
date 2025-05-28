import React from 'react';

// Note: currentViewingStep prop is not used in this refactored version,
// as it now displays a summary of all results.
const ResultsDisplay = ({ allResponses, sessionData, questionsConfig, visualConfigsData }) => {
  if (!allResponses || Object.keys(allResponses).length === 0) {
    return (
      <div className="results-container">
        <h2>Assessment Results</h2>
        <p className="loading-message">No responses yet, or still loading...</p>
      </div>
    );
  }

  // Calculate total score (example: sum of all scores)
  let totalScore = 0;
  Object.values(allResponses).forEach(componentResponses => {
    Object.values(componentResponses).forEach(questionResponse => {
      if (typeof questionResponse.score === 'number') {
        totalScore += questionResponse.score;
      }
    });
  });

  // Placeholder for personality (would be derived from tags collected in QuizContainer/scoringEngine)
  const determinedPersonality = sessionData?.personalityProfile?.length > 0 
    ? sessionData.personalityProfile.join(', ') 
    : "To be determined";

  return (
    <div className="results-container">
      <h2>Your Brand Story Blueprint: Summary</h2>
      
      <div className="results-summary">
        <p>Thank you for completing the Brand Story Journey Assessment!</p>
        <p>Session Token: {sessionData?.token || 'N/A'}</p>
        <p>Total Calculated Score: <strong>{totalScore}</strong> (This is a raw sum, actual interpretation depends on scoring logic)</p>
        <div className="profile-badge">
          Your Tentative Profile: {determinedPersonality}
        </div>
      </div>

      <div className="card-container">
        <div className="card">
          <h4>Key Insights & Recommendations</h4>
          {/* This section would be dynamically populated based on visualConfigsData and responses */}
          <p>Based on your answers, here are some areas to focus on:</p>
          <ul>
            <li>Clarify your core message (Example insight).</li>
            <li>Explore new channels for content (Example insight).</li>
          </ul>
        </div>

        <div className="card">
          <h4>Next Steps</h4>
          <p>Consider these actions to strengthen your brand story:</p>
          <ul>
            <li>Schedule a consultation to discuss these results.</li>
            <li>Download your detailed report (Feature coming soon).</li>
          </ul>
        </div>
      </div>

      <div className="debug-responses" style={{ marginTop: '30px', textAlign: 'left' }}>
        <h4>Detailed Responses (for review):</h4>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', background: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
          {JSON.stringify(allResponses, null, 2)}
        </pre>
      </div>

      {/* Example of how to use visualConfigsData if it had content */}
      {/* {visualConfigsData?.maturityWheel?.stages && (
        <div className="card">
          <h4>Maturity Wheel Information</h4>
          <p>Number of stages: {visualConfigsData.maturityWheel.stages}</p>
        </div>
      )} */}
    </div>
  );
};

export default ResultsDisplay;
