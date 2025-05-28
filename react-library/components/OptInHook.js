import React from 'react';

const OptInHook = ({ hookTitle, hookContext, buttonText, onStartAssessment }) => {
  return (
    <div className="opt-in-hook-container"> {/* Applied class */}
      <h1>{hookTitle}</h1>
      <p>{hookContext}</p> {/* Removed inline style, will be handled by .opt-in-hook-container p or general p */}
      <button 
        onClick={onStartAssessment} 
        className="cta-button" // Applied class, .cta-button or general button style from css/quiz.css
      >
        {buttonText}
      </button>
    </div>
  );
};

export default OptInHook;
