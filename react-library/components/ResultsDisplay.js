import React from 'react';

// Helper to get question text from config
const getQuestionText = (questions, questionId) => {
  for (const key in questions) {
    if (Array.isArray(questions[key])) {
      const question = questions[key].find(q => q.id === questionId);
      if (question) return question.text;
    }
  }
  return 'Question text not found';
};


const ResultsDisplay = ({ allResponses, sessionData, questionsConfig, visualConfigsData }) => {
  if (!allResponses || Object.keys(allResponses).length === 0) {
    return (
      <div className="results-container">
        <h2>Assessment Results</h2>
        <p className="loading-message">No responses yet, or still loading...</p>
      </div>
    );
  }

  // Helper to find a specific question's response & score
  const getResponse = (componentNumber, questionId) => {
    return allResponses?.[componentNumber]?.[questionId] || { value: 'N/A', score: 'N/A' };
  };
  
  // Component 1: Professional Authority Assessment
  const c1Config = questionsConfig.professionalAuthorityAssessmentQuestions[0];
  const c1Response = getResponse(1, c1Config.id);
  const c1OptionText = c1Config.options.find(opt => opt.value === c1Response.value)?.text || 'N/A';

  // Component 2: Client Resonance Analyzer
  const c2Questions = questionsConfig.clientResonanceAnalyzerQuestions;
  
  // Component 3: Professional Presence Audit
  const c3Config = questionsConfig.professionalPresenceAuditQuestions[0];
  const c3Response = getResponse(3, c3Config.id); // This is the gridSelections object

  // Component 4: Authenticity Integrity Check
  const c4PrimaryConfig = questionsConfig.authenticityIntegrityCheckQuestions.find(q => q.type === 'singleChoiceWithFollowUp');
  const c4PrimaryResponse = getResponse(4, c4PrimaryConfig.id);
  const c4PrimaryOptionText = c4PrimaryConfig.options.find(opt => opt.value === c4PrimaryResponse.value)?.text || 'N/A';
  let c4FollowUpText = '', c4FollowUpValue = 'N/A';
  if (c4PrimaryResponse.value && c4PrimaryConfig.options.find(opt => opt.value === c4PrimaryResponse.value)?.followUpQuestionId) {
    const followUpId = c4PrimaryConfig.options.find(opt => opt.value === c4PrimaryResponse.value).followUpQuestionId;
    const c4FollowUpConfig = questionsConfig.authenticityIntegrityCheckQuestions.find(q => q.id === followUpId);
    const c4FollowUpResponse = getResponse(4, followUpId);
    c4FollowUpText = c4FollowUpConfig?.text || 'Follow-up question text not found';
    c4FollowUpValue = c4FollowUpResponse.value;
  }

  // Component 5: Authority Action Blueprint
  const c5Config = questionsConfig.authorityActionBlueprintQuestions[0];
  const c5Response = getResponse(5, c5Config.id); // This is the itemRanks object

  return (
    <div className="results-container">
      <h2>Your Brand Story Blueprint: Detailed Results</h2>
      <p className="results-summary">Review your answers and insights from each step of the assessment. Session Token: {sessionData?.token || 'N/A'}</p>

      <div className="card-container">
        {/* Component 1 Results Card */}
        <div className="card">
          <h4>Professional Authority Assessment Results</h4>
          <p><strong>{c1Config.text}</strong></p>
          <p>Your Answer: <span className="profile-badge">{c1OptionText}</span> (Score: {c1Response.score})</p>
          <div className="visual-placeholder">
            <p>[Brand Story Maturity Wheel Visual Placeholder]</p>
            <img src="/img/placeholder-wheel.png" alt="Brand Story Maturity Wheel Placeholder" style={{width:'100%', maxWidth:'300px', opacity:0.5}}/>
          </div>
        </div>

        {/* Component 2 Results Card */}
        <div className="card">
          <h4>Client Resonance Analyzer Results</h4>
          {c2Questions.map(q => {
            const r = getResponse(2, q.id);
            return <p key={q.id}><strong>{q.text}:</strong> {r.value} (Score: {r.score})</p>;
          })}
          <div className="visual-placeholder">
            <p>[Connection Bridge Visual Placeholder]</p>
            <img src="/img/placeholder-bridge.png" alt="Connection Bridge Placeholder" style={{width:'100%', maxWidth:'300px', opacity:0.5}}/>
          </div>
        </div>

        {/* Component 3 Results Card */}
        <div className="card">
          <h4>Professional Presence Audit Results</h4>
          <p><strong>{c3Config.text}</strong></p>
          {c3Response.value !== 'N/A' && typeof c3Response.value === 'object' ? (
            <ul>
              {Object.entries(c3Response.value).map(([channelId, selections]) => {
                const channelName = c3Config.channels.find(c => c.id === channelId)?.name || channelId;
                const effectivenessLabel = c3Config.effectivenessLevels.find(el => el.value === selections.effectiveness)?.label || selections.effectiveness;
                const formatLabel = c3Config.formats.find(f => f.value === selections.format)?.label || selections.format;
                return <li key={channelId}><strong>{channelName}:</strong> Effectiveness - {effectivenessLabel}, Format - {formatLabel}</li>;
              })}
            </ul>
          ) : <p>No selections recorded.</p>}
          <p>(Overall Score: {c3Response.score})</p>
          <div className="visual-placeholder">
            <p>[Story Channel Matrix Visual Placeholder]</p>
            <img src="/img/placeholder-matrix.png" alt="Story Channel Matrix Placeholder" style={{width:'100%', maxWidth:'300px', opacity:0.5}}/>
          </div>
        </div>

        {/* Component 4 Results Card */}
        <div className="card">
          <h4>Authenticity & Integrity Check Results</h4>
          <p><strong>{c4PrimaryConfig.text}</strong></p>
          <p>Your Answer: {c4PrimaryOptionText} (Score: {c4PrimaryResponse.score})</p>
          {c4FollowUpText && (
            <p><strong>{c4FollowUpText}:</strong> {c4FollowUpValue} (Score: getResponse(4, c4PrimaryConfig.options.find(opt => opt.value === c4PrimaryResponse.value).followUpQuestionId).score)</p>
          )}
          <div className="visual-placeholder">
            <p>[True North Compass Visual Placeholder]</p>
            <img src="/img/placeholder-compass.png" alt="True North Compass Placeholder" style={{width:'100%', maxWidth:'300px', opacity:0.5}}/>
          </div>
        </div>

        {/* Component 5 Results Card */}
        <div className="card">
          <h4>Authority Action Blueprint Results</h4>
          <p><strong>{c5Config.text}</strong></p>
          {c5Response.value !== 'N/A' && typeof c5Response.value === 'object' ? (
            <ul>
              {c5Config.items.map(item => (
                <li key={item.id}><strong>Rank {c5Response.value[item.id] || 'Not Ranked'}:</strong> {item.label}</li>
              ))}
            </ul>
          ) : <p>No ranking recorded.</p>}
          {/* Score for C5 is the ranking object itself, shown in debug or interpreted if logic existed */}
          <div className="visual-placeholder">
            <p>[Personalized Story Strategy Roadmap Visual Placeholder]</p>
            <img src="/img/placeholder-roadmap.png" alt="Story Strategy Roadmap Placeholder" style={{width:'100%', maxWidth:'300px', opacity:0.5}}/>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '30px', textAlign: 'left' }}>
        <h3>Visual Configuration Data (for dev):</h3>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', background: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
          {JSON.stringify(visualConfigsData, null, 2)}
        </pre>
      </div>

      <div className="debug-responses" style={{ marginTop: '30px', textAlign: 'left' }}>
        <h4>Detailed Responses (for review):</h4>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', background: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
          {JSON.stringify(allResponses, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ResultsDisplay;
