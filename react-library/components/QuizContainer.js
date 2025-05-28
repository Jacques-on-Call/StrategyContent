import React, { useState, useEffect } from 'react';
import OptInHook from './OptInHook';
import { getSessionCookie, setSessionCookie, generateSessionToken, clearSessionCookie } from '../utils/sessionManager';

// Placeholder imports for assessment components (will be created in later steps):
import ProfessionalAuthorityAssessment from './ProfessionalAuthorityAssessment.js';
import ClientResonanceAnalyzer from './ClientResonanceAnalyzer.js';
import ProfessionalPresenceAudit from './ProfessionalPresenceAudit.js';
import AuthenticityIntegrityCheck from './AuthenticityIntegrityCheck.js';
import AuthorityActionBlueprint from './AuthorityActionBlueprint.js';
import { processAnswer } from '../utils/scoringEngine.js';
import ResultsDisplay from './ResultsDisplay.js'; // Uncommented
import { QuestionsData } from '../data/questions.js';
import { VisualConfigsData } from '../data/visualConfigs.js';

// Component Imports for the Map
import ProfessionalAuthorityAssessment from './ProfessionalAuthorityAssessment.js';
import ClientResonanceAnalyzer from './ClientResonanceAnalyzer.js';
import ProfessionalPresenceAudit from './ProfessionalPresenceAudit.js';
import AuthenticityIntegrityCheck from './AuthenticityIntegrityCheck.js';
import AuthorityActionBlueprint from './AuthorityActionBlueprint.js';

const componentMap = {
  ProfessionalAuthorityAssessment,
  ClientResonanceAnalyzer,
  ProfessionalPresenceAudit,
  AuthenticityIntegrityCheck,
  AuthorityActionBlueprint
};

const brandStoryQuizSteps = [
  { step: 1, componentName: 'ProfessionalAuthorityAssessment', questionsDataKey: 'professionalAuthorityAssessmentQuestions' },
  { step: 2, componentName: 'ClientResonanceAnalyzer', questionsDataKey: 'clientResonanceAnalyzerQuestions' },
  { step: 3, componentName: 'ProfessionalPresenceAudit', questionsDataKey: 'professionalPresenceAuditQuestions' },
  { step: 4, componentName: 'AuthenticityIntegrityCheck', questionsDataKey: 'authenticityIntegrityCheckQuestions' },
  { step: 5, componentName: 'AuthorityActionBlueprint', questionsDataKey: 'authorityActionBlueprintQuestions' },
];

const QuizContainer = () => {
  const [currentView, setCurrentView] = useState('optIn'); // 'optIn', 'assessment', 'results'
  const [currentStep, setCurrentStep] = useState(1); // 1 through 5 for component rendering
  const [session, setSession] = useState(null);
  const [allResponses, setAllResponses] = useState({});

  // Session initialization
  useEffect(() => {
    const existingSession = getSessionCookie();
    if (existingSession) {
      console.log('Existing session found:', existingSession);
      // For now, clear session for a fresh start as resume logic is not fully implemented.
      clearSessionCookie();
      setSession(null); // Ensure session state is also cleared
      console.log('Previous session cleared for a fresh start.');
      // If resume logic were implemented:
      // setSession(existingSession);
      // setAllResponses(existingSession.responses || {}); // Assuming responses are stored in session
      // setCurrentView('assessment');
      // setCurrentStep(existingSession.progress.currentComponentNumber || 1); // Use a specific field for component number
    }
  }, []);

  const handleStartAssessment = () => {
    const newToken = generateSessionToken();
    const newSessionData = {
      token: newToken,
      progress: {
        currentComponentNumber: 1, // Tracks the component to be rendered
        questionsAnswered: 0,
        // Potentially store individual component completion status here if needed
      },
      responses: {}, // Initialize responses object
      personalityProfile: [],
      lastActive: Date.now(),
    };
    setSessionCookie(newSessionData);
    setSession(newSessionData);
    setAllResponses({}); // Clear any previous responses from state
    setCurrentView('assessment');
    setCurrentStep(1); // Set currentStep for rendering the first component
    // TODO: API Call POST /api/quiz/start
    // const anonymousMetadata = { referrer: document.referrer, deviceType: navigator.userAgent }; // Example
    // fetch('/api/quiz/start', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ session_token: newSessionData.token, metadata: anonymousMetadata })
    // })
    // .then(response => response.json())
    // .then(data => console.log('Quiz start response:', data))
    // .catch(error => console.error('Error starting quiz:', error));
    console.log('TODO: Call POST /api/quiz/start with token:', newSessionData.token);
  };
  
  // This function is called by individual components when they submit their answers
  // For components with multiple questions (like Component2, Component4), this will be called multiple times
  const handleAnswerSubmit = (componentNumber, questionId, answerValue, questionConfig) => {
    const processedResult = processAnswer(questionConfig, answerValue);

    setAllResponses(prev => ({
      ...prev,
      [componentNumber]: {
        ...prev[componentNumber],
        [questionId]: {
          value: processedResult.originalAnswer, // Store the original answer
          score: processedResult.score,
          // Optional: Store other processed results like tags if you plan to use them soon
          // tags: processedResult.tags,
        }
      }
    }));
  
    if (session) {
      const updatedSession = {
        ...session,
        progress: {
          ...session.progress,
          questionsAnswered: session.progress.questionsAnswered + 1,
        },
        responses: { // Also update responses in the session for persistence
          ...session.responses,
          [componentNumber]: {
            ...(session.responses[componentNumber] || {}),
            [questionId]: { // Storing processed data in session as well
              value: processedResult.originalAnswer, 
              score: processedResult.score 
            },
          }
        },
        lastActive: Date.now(),
      };
      setSessionCookie(updatedSession);
      setSession(updatedSession);
      // TODO: API Call POST /api/quiz/answer
      // fetch('/api/quiz/answer', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     session_token: session.token,
      //     component_number: componentNumber,
      //     question_id: questionId,
      //     answer_value: processedResult.originalAnswer,
      //     answer_score: processedResult.score
      //     // Potentially add processedResult.tags if also sending that
      //   })
      // })
      // .then(response => response.json())
      // .then(data => console.log('Quiz answer response:', data))
      // .catch(error => console.error('Error submitting answer:', error));
      console.log('TODO: Call POST /api/quiz/answer for question:', questionId, 'with value:', processedResult.originalAnswer, 'score:', processedResult.score);
    }
  };
  
  // This function is called by components (like Component2, Component3, Component4, Component5)
  // when they have completed all their internal questions.
  const handleComponentComplete = (completedComponentNumber) => {
    if (completedComponentNumber < brandStoryQuizSteps.length) { // Use brandStoryQuizSteps.length
      const nextStepNumber = completedComponentNumber + 1;
      setCurrentStep(nextStepNumber); 
      if (session) { 
        const updatedSession = {
          ...session,
          progress: { ...session.progress, currentComponentNumber: nextStepNumber },
          lastActive: Date.now(),
        };
        setSessionCookie(updatedSession);
        setSession(updatedSession);
      }
    } else {
      // This is the last component
      handleCompleteAssessment();
    }
  };


  const handleCompleteAssessment = () => {
    setCurrentView('results');
    if (session) {
      // TODO: API Call POST /api/quiz/complete
      // fetch('/api/quiz/complete', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ session_token: session.token })
      // })
      // .then(response => response.json())
      // .then(data => console.log('Quiz complete response:', data))
      // .catch(error => console.error('Error completing quiz:', error));
      console.log('TODO: Call POST /api/quiz/complete for token:', session.token);
    } else {
      console.log('TODO: Call POST /api/quiz/complete (no session active, this should not happen if flow is correct)');
    }
  };

  if (currentView === 'optIn') {
    const optInProps = {
      hookTitle: "Your clients make split-second trust decisions. Does their first impression of your story build confidence or create doubt?",
      hookContext: "Discover your unique Brand Story Blueprint—the same framework that helps industry leaders turn expertise into magnetic client attraction. Takes 3 minutes, reveals insights that typically cost thousands in consulting.",
      buttonText: "Begin Assessment",
      onStartAssessment: handleStartAssessment
    };
    return <OptInHook {...optInProps} />;
  }

  // Render logic for assessment components
  const renderCurrentComponent = () => {
    // Assuming QuestionsData is imported if needed by components directly, or pass as props
    // For simplicity, component-specific questions are managed within those components
    // using the 'questions' prop which would filter QuestionsData.
    // This QuizContainer focuses on orchestrating which component is visible.
    
    // For Client-Side Personalization Review:
    // The 'questions' prop is being passed to components below,
    // using QuestionsData directly. This confirms structural support.
    // The dynamic choice logic (selecting different question sets based on answers)
    // would require further state management and logic in QuizContainer.

    // switch (currentStep) { // OLD LOGIC
    //   case 1:
    //     return <ProfessionalAuthorityAssessment 
    //               onSubmitAnswer={handleAnswerSubmit} 
    //               componentNumber={1}
    //               questions={QuestionsData.professionalAuthorityAssessmentQuestions} 
    //               onCompleteComponent={handleComponentComplete} 
    //             />;
    //   // ... cases for 2, 3, 4, 5
    //   default:
    //     return <div>Error: Unknown step.</div>;
    // }
    return null; // Placeholder, this specific renderCurrentComponent function is removed/replaced
  };

  if (currentView === 'assessment') {
    const currentStepConfig = brandStoryQuizSteps.find(stepObj => stepObj.step === currentStep);

    if (!currentStepConfig) {
      return <div className="quiz-container error-message">Error: Configuration for step {currentStep} not found.</div>;
    }
    const CurrentAssessmentComponent = componentMap[currentStepConfig.componentName];
    if (!CurrentAssessmentComponent) {
      return <div className="quiz-container error-message">Error: Component {currentStepConfig.componentName} not found in map.</div>;
    }
    
    const questionsForComponent = QuestionsData[currentStepConfig.questionsDataKey] || [];
    const componentKey = `step-${currentStep}`;

    return (
      <div className="quiz-container component-fade-in" key={componentKey}>
        <CurrentAssessmentComponent
          componentNumber={currentStep}
          questions={questionsForComponent}
          onSubmitAnswer={handleAnswerSubmit}
          onCompleteComponent={handleComponentComplete}
          // allResponses={allResponses} // Pass if needed by any component
        />
      </div>
    );
  }

  if (currentView === 'results') {
    // Placeholder for ResultsDisplay component
    return (
      <div>
        <h1>Results Placeholder</h1>
        <p>Assessment Complete!</p>
        <p>Session Token: {session ? session.token : 'N/A'}</p>
        <h3>All Responses:</h3>
        <pre>{JSON.stringify(allResponses, null, 2)}</pre>
      </div>
    );
    // return <ResultsDisplay responses={allResponses} session={session} />;
  }

  return <div>Loading or invalid state...</div>; // Should not happen
};

export default QuizContainer;
