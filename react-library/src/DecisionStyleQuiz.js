// React component with improved styling for visibility on any background
const DecisionStyleQuiz = () => {
  // State management
  const [currentState, setCurrentState] = React.useState('intro'); // 'intro', 'questions', 'results'
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [responses, setResponses] = React.useState({});
  const [feedback, setFeedback] = React.useState(null);
  
  // Enhanced questions with audience-focused context
  const questions = [
    {
      id: 'q1_decision_approach',
      text: 'How do you primarily approach making significant business decisions?',
      context: 'Just like how you process information, your audience has preferred ways of receiving content.',
      options: [
        'A. Data-driven analysis is key.',
        'B. I blend data analysis with my intuition.',
        'C. My gut feeling and experience guide me.',
        'D. I primarily rely on instinct.'
      ]
    },
    {
      id: 'q2_structure_importance',
      text: 'How important is a structured approach to implementing new ideas?',
      context: 'Your preference for structure mirrors how different audience segments respond to content organization.',
      options: [
        'A. Essential – I need clear steps to follow.',
        'B. Important – Steps are helpful for implementation.',
        'C. Moderately important – I can adapt a general framework.',
        'D. Not very important – I prefer flexibility and adaptation.'
      ]
    },
    {
      id: 'q3_info_attention',
      text: 'When evaluating new business information, what first captures your attention?',
      context: 'The elements that catch your eye are often the same ones your like-minded audience values.',
      options: [
        'A. Hard data, statistics, and detailed evidence.',
        'B. Real-world examples and case studies.',
        'C. Clear, actionable steps or how-to guides.',
        'D. The overall narrative or "big picture".'
      ]
    },
    {
      id: 'q4_risk_tolerance',
      text: 'When facing uncertainty in a decision, you tend to:',
      context: 'Your approach to risk can inform how you communicate change to your audience.',
      options: [
        'A. Gather more data until the path is clear.',
        'B. Weigh probabilities and choose logically.',
        'C. Consider scenarios but move forward with partial information.',
        'D. Trust your gut and take bold action.'
      ]
    }
  ];

  // Enhanced profile descriptions with audience connection
  const profileDescriptions = {
    'Analytical Planner': 'You thrive on data and structure. Your ideal audience likely values thorough research, step-by-step guidance, and evidence-based recommendations.',
    'Data-Guided Adapter': 'You use data as a foundation but adapt your approach. Your audience appreciates well-researched content with room for creative application.',
    'Structured Intuitive': 'You follow your intuition within organized frameworks. Your audience connects with authentic storytelling backed by clear processes.',
    'Creative Navigator': 'You trust your instincts and embrace flexibility. Your audience responds to inspirational content that offers fresh perspectives.',
    'Balanced Decision-Maker': 'You blend analysis with intuition seamlessly. Your audience values balanced content that combines facts with relatable examples.'
  };

  // Helper functions
  const getAnswerWeight = (answer) => {
    const weights = { 'A.': 25, 'B.': 50, 'C.': 75, 'D.': 100 };
    return weights[answer.substring(0, 2)] || 50;
  };

  const calculateStructureScore = (answer) => {
    const structureMap = {
      'A. Essential – I need clear steps to follow.': 20,
      'B. Important – Steps are helpful for implementation.': 40,
      'C. Moderately important – I can adapt a general framework.': 70,
      'D. Not very important – I prefer flexibility and adaptation.': 90
    };
    return structureMap[answer] || 50;
  };

  // Enhanced action steps without redundant focus mention
  const getActionSteps = (profileType) => {
    const actionStepsByType = {
      'Analytical Planner': [
        { title: 'Data Audit', description: 'Review your analytics to better understand audience behavior.' },
        { title: 'Research Summary', description: 'Create detailed reports for data-driven audience segments.' },
        { title: 'Process Documentation', description: 'Develop clear frameworks your structured audience will appreciate.' },
        { title: 'Evidence Collection', description: 'Gather testimonials and case studies to support your points.' }
      ],
      'Data-Guided Adapter': [
        { title: 'Trend Analysis', description: 'Identify patterns in audience engagement across different content.' },
        { title: 'Flexible Templates', description: 'Create adaptable frameworks for various content types.' },
        { title: 'Audience Experiments', description: 'Test multiple content approaches with measurable outcomes.' },
        { title: 'Format Diversity', description: 'Develop a mix of structured and free-form content.' }
      ],
      'Structured Intuitive': [
        { title: 'Story Framework', description: 'Build templates for authentic storytelling that maintains structure.' },
        { title: 'Intuition Journal', description: 'Document content ideas that resonate on an emotional level.' },
        { title: 'Process Visualization', description: 'Create visual guides that make structure more engaging.' },
        { title: 'Connection Points', description: 'Identify emotional hooks within your structured content.' }
      ],
      'Creative Navigator': [
        { title: 'Inspiration Board', description: 'Collect content examples that spark creative thinking.' },
        { title: 'Audience Immersion', description: 'Spend time in your audience\'s environment to gain insights.' },
        { title: 'Vision Mapping', description: 'Create high-level content roadmaps with room for improvisation.' },
        { title: 'Innovative Formats', description: 'Experiment with new content types your audience hasn\'t seen.' }
      ],
      'Balanced Decision-Maker': [
        { title: 'Content Balance', description: 'Audit your mix of factual and storytelling elements.' },
        { title: 'Audience Personas', description: 'Develop detailed profiles capturing both logical and emotional needs.' },
        { title: 'Feedback Loops', description: 'Create systems to gather both qualitative and quantitative responses.' },
        { title: 'Integrated Strategy', description: 'Blend data-driven and intuitive approaches in your content plan.' }
      ]
    };
    
    return actionStepsByType[profileType] || actionStepsByType['Balanced Decision-Maker'];
  };

  // Enhanced content preference guide based on profile
  const getContentPreferences = (profileType) => {
    const preferencesByType = {
      'Analytical Planner': [
        { format: 'White papers & detailed guides', fit: 95 },
        { format: 'Data visualizations & infographics', fit: 90 },
        { format: 'Step-by-step tutorials', fit: 85 },
        { format: 'Case studies with metrics', fit: 80 }
      ],
      'Data-Guided Adapter': [
        { format: 'Research-backed articles', fit: 90 },
        { format: 'Practical guides with options', fit: 85 },
        { format: 'Interactive tools & calculators', fit: 80 },
        { format: 'Comparative analysis content', fit: 75 }
      ],
      'Structured Intuitive': [
        { format: 'Storytelling with clear takeaways', fit: 90 },
        { format: 'Process-oriented videos', fit: 85 },
        { format: 'Templates with creative examples', fit: 80 },
        { format: 'Structured Q&As and interviews', fit: 75 }
      ],
      'Creative Navigator': [
        { format: 'Thought leadership content', fit: 90 },
        { format: 'Visual storytelling & videos', fit: 85 },
        { format: 'Innovative case studies', fit: 80 },
        { format: 'Trend predictions & insights', fit: 75 }
      ],
      'Balanced Decision-Maker': [
        { format: 'Mixed-media content packages', fit: 90 },
        { format: 'Stories supported by data', fit: 85 },
        { format: 'Practical guides with context', fit: 80 },
        { format: 'Balanced perspective pieces', fit: 75 }
      ]
    };
    
    return preferencesByType[profileType] || preferencesByType['Balanced Decision-Maker'];
  };

  // Quiz control functions
  const startQuiz = () => {
    setCurrentState('questions');
    setCurrentQuestion(0);
    setResponses({});
  };

  const handleAnswer = (answer) => {
    const updatedResponses = {
      ...responses,
      [questions[currentQuestion].id]: answer
    };
    setResponses(updatedResponses);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const calculatedFeedback = generateFeedback(updatedResponses);
      setFeedback(calculatedFeedback);
      setCurrentState('results');
    }
  };

  const generateFeedback = (responses) => {
    const intuitionScore = getAnswerWeight(responses.q1_decision_approach || 'B.');
    const structureScore = calculateStructureScore(responses.q2_structure_importance || 'B.');
    const attentionScore = getAnswerWeight(responses.q3_info_attention || 'B.');
    const riskScore = getAnswerWeight(responses.q4_risk_tolerance || 'B.');

    let profileType = 'Balanced Decision-Maker';
    if (intuitionScore < 40 && structureScore < 40) {
      profileType = 'Analytical Planner';
    } else if (intuitionScore < 40 && structureScore > 60) {
      profileType = 'Data-Guided Adapter';
    } else if (intuitionScore > 60 && structureScore < 40) {
      profileType = 'Structured Intuitive';
    } else if (intuitionScore > 60 && structureScore > 60) {
      profileType = 'Creative Navigator';
    }

    return {
      profileType,
      profileDescription: profileDescriptions[profileType],
      intuitionScore,
      structureScore,
      attentionScore,
      riskScore,
      actionSteps: getActionSteps(profileType),
      contentPreferences: getContentPreferences(profileType)
    };
  };

  // Common card style with consistent background
  const cardStyle = {
    backgroundColor: 'white',
    color: '#333',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '0 auto',
    maxWidth: '800px'
  };

  // Button style with consistent colors
  const buttonStyle = {
    backgroundColor: 'var(--green)',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '15px'
  };

  // Option button style with high contrast
  const optionButtonStyle = {
    display: 'block',
    width: '100%',
    padding: '12px 15px',
    margin: '10px 0',
    textAlign: 'left',
    background: 'white',
    color: '#333',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'normal',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
  };

  // Heading styles with consistent colors
  const headingStyle = {
    color: 'var(--blue)',
    marginBottom: '15px'
  };

  // Render different states
  return (
    <div className="interactive-section" style={{ margin: '0 auto', position: 'relative' }}>
      {/* Intro Screen */}
      {currentState === 'intro' && (
        <div className="interactive-tool-intro" style={cardStyle}>
          <h3 style={headingStyle}>Decision Style & Audience Connection Assessment</h3>
          <p style={{ color: '#555' }}>Discover how your decision-making approach influences the way you connect with your audience.</p>
          <div style={{ background: 'rgba(0, 57, 113, 0.05)', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <p style={{ color: '#555', fontStyle: 'italic', margin: '0' }}>
              By understanding your own information processing style, you'll gain insights into how to better communicate with audience members who think like you — and those who don't.
            </p>
          </div>
          <button 
            onClick={startQuiz}
            className="cta-button"
            style={buttonStyle}
          >
            Begin Assessment
          </button>
        </div>
      )}

      {/* Questions Screen */}
      {currentState === 'questions' && (
        <div className="questions-container" style={cardStyle}>
          <div className="progress-container" style={{
            width: '100%',
            backgroundColor: '#e0e0e0',
            height: '10px',
            marginBottom: '20px',
            borderRadius: '5px'
          }}>
            <div style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              height: '100%',
              backgroundColor: 'var(--green)',
              borderRadius: '5px'
            }}></div>
          </div>
          
          <h4 style={{ color: '#555' }}>Question {currentQuestion + 1} of {questions.length}</h4>
          <h3 style={headingStyle}>{questions[currentQuestion].text}</h3>
          
          {/* Added context that connects to audience insight */}
          <p style={{ 
            color: '#666', 
            fontStyle: 'italic', 
            backgroundColor: 'rgba(199, 234, 70, 0.1)', 
            padding: '10px', 
            borderRadius: '5px',
            borderLeft: '3px solid var(--light-green)',
            marginBottom: '20px'
          }}>
            {questions[currentQuestion].context}
          </p>
          
          <div className="options-container" style={{ marginTop: '20px' }}>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                style={optionButtonStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f5f5f5';
                  e.currentTarget.style.borderColor = 'var(--blue)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.borderColor = '#ccc';
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Screen */}
      {currentState === 'results' && feedback && (
        <div className="results-container" style={cardStyle}>
          <h2 style={headingStyle}>Your Decision-Making Profile</h2>
          <h3 style={{ color: 'var(--blue)', marginBottom: '10px' }}>{feedback.profileType}</h3>
          
          {/* Added profile description */}
          <p style={{ 
            color: '#555', 
            fontSize: '16px', 
            backgroundColor: 'rgba(0, 57, 113, 0.05)', 
            padding: '15px', 
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            {feedback.profileDescription}
          </p>
          
          {/* Spectrum Visualizations */}
          <div className="metrics-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '15px',
            margin: '20px 0'
          }}>
            {/* Intuition Spectrum */}
            <div className="metric" style={{
              background: 'rgba(0, 57, 113, 0.05)',
              padding: '15px',
              borderRadius: '8px'
            }}>
              <h4 style={{ color: '#444', margin: '0 0 10px 0' }}>Data vs Intuition</h4>
              <div style={{
                height: '8px',
                background: '#e0e0e0',
                borderRadius: '4px',
                margin: '10px 0'
              }}>
                <div style={{
                  width: `${feedback.intuitionScore}%`,
                  height: '100%',
                  background: 'var(--blue)',
                  borderRadius: '4px'
                }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                <span>Data-Driven</span>
                <span>Intuitive</span>
              </div>
            </div>
            
            {/* Structure Spectrum */}
            <div className="metric" style={{
              background: 'rgba(0, 57, 113, 0.05)',
              padding: '15px',
              borderRadius: '8px'
            }}>
              <h4 style={{ color: '#444', margin: '0 0 10px 0' }}>Structure Preference</h4>
              <div style={{
                height: '8px',
                background: '#e0e0e0',
                borderRadius: '4px',
                margin: '10px 0'
              }}>
                <div style={{
                  width: `${feedback.structureScore}%`,
                  height: '100%',
                  background: 'var(--light-green)',
                  borderRadius: '4px'
                }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                <span>Structured</span>
                <span>Flexible</span>
              </div>
            </div>
          </div>
          
          {/* Content Preferences - New Section */}
          <div className="content-preferences" style={{ marginTop: '30px' }}>
            <h4 style={{ color: '#444', marginBottom: '15px' }}>Recommended Content Types For Your Audience</h4>
            <div style={{ marginBottom: '20px' }}>
              <p style={{ color: '#666', marginBottom: '15px' }}>Your decision style suggests these content formats will resonate with your like-minded audience:</p>
            </div>
            {feedback.contentPreferences.map((pref, index) => (
              <div key={index} style={{
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <div style={{ flex: '1' }}>
                  <span style={{ color: '#444', fontWeight: index === 0 ? 'bold' : 'normal' }}>{pref.format}</span>
                </div>
                <div style={{ 
                  flex: '2',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <div style={{
                    flex: '1',
                    height: '8px',
                    background: '#e0e0e0',
                    borderRadius: '4px'
                  }}>
                    <div style={{
                      width: `${pref.fit}%`,
                      height: '100%',
                      background: index === 0 ? 'var(--green)' : 'var(--light-green)',
                      borderRadius: '4px'
                    }}></div>
                  </div>
                  <span style={{ width: '40px', color: '#666', fontSize: '14px' }}>{pref.fit}%</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Action Steps */}
          <div className="action-steps" style={{ marginTop: '30px' }}>
            <h4 style={{ color: '#444', marginBottom: '15px' }}>Connect Better With Your Audience</h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '15px',
              marginTop: '15px'
            }}>
              {feedback.actionSteps.map((step, index) => (
                <div key={index} style={{
                  background: 'rgba(199, 234, 70, 0.2)',
                  padding: '15px',
                  borderRadius: '8px',
                  borderLeft: '4px solid var(--light-green)'
                }}>
                  <h5 style={{ margin: '0 0 5px 0', color: 'var(--green)' }}>{step.title}</h5>
                  <p style={{ margin: 0, color: '#555' }}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ 
            marginTop: '30px', 
            padding: '15px', 
            borderRadius: '8px',
            backgroundColor: 'rgba(0, 57, 113, 0.05)',
          }}>
            <h4 style={{ color: '#444', marginBottom: '10px' }}>Why This Matters</h4>
            <p style={{ color: '#555', margin: '0' }}>
              Understanding your decision style helps you recognize both your strengths and blind spots when communicating with your audience. Just as you prefer certain information formats, your audience has their own preferences - some matching yours, others differing significantly.
            </p>
          </div>
          
          <button
            onClick={startQuiz}
            style={buttonStyle}
          >
            Retake Assessment
          </button>
        </div>
      )}
    </div>
  );
};


// Export the component
export default DecisionStyleQuiz;

// We will remove this ReactDOM.render part for the library
// ReactDOM.render(
//   <DecisionStyleQuiz />,
//   document.getElementById('component1')
// );