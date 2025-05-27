import React from 'react';

const OptInHook = ({ onStartAssessment }) => {
  return (
    <div>
      <h1>Your clients make split-second trust decisions. Does their first impression of your story build confidence or create doubt?</h1>
      <p>Discover your unique Brand Story Blueprint—the same framework that helps industry leaders turn expertise into magnetic client attraction. Takes 3 minutes, reveals insights that typically cost thousands in consulting.</p>
      <button onClick={onStartAssessment}>Begin Assessment</button>
    </div>
  );
};

export default OptInHook;
