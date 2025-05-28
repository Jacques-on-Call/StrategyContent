import React from 'react';

const OptInHook = ({ hookTitle, hookContext, buttonText, onStartAssessment }) => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}> {/* Added basic styling for better presentation */}
      <h1>{hookTitle}</h1>
      <p style={{ fontSize: '1.1em', margin: '20px 0' }}>{hookContext}</p>
      <button 
        onClick={onStartAssessment} 
        style={{ padding: '10px 20px', fontSize: '1.2em', cursor: 'pointer' }}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default OptInHook;
