import React from 'react';

const ResultsDisplay = ({ allResponses, currentViewingStep, visualConfigsData, questionsData }) => {
  // For Component 1 Results
  if (currentViewingStep === 1) {
    const question1Id = questionsData?.component1?.[0]?.id;
    const responseC1 = allResponses?.[1]?.[question1Id]; // Component number is 1 for keying in allResponses
    const scoreC1 = responseC1?.score;
    const valueC1 = responseC1?.value;

    if (responseC1) {
      let stageText = 'N/A';
      const question1Options = questionsData?.component1?.[0]?.options;
      if (question1Options) {
        const foundOption = question1Options.find(option => option.value === valueC1);
        if (foundOption) {
          stageText = foundOption.text;
        }
      }

      return (
        <div>
          <h2>Component 1 Results: Brand Story Maturity</h2>
          <p>Your determined stage: {stageText}</p>
          <p>(Score: {scoreC1})</p>
          {/* Placeholder for future visualConfigsData usage, e.g., maturity wheel description */}
          {/* visualConfigsData?.maturityWheel?.descriptions?.[valueC1] && 
              <p>Details: {visualConfigsData.maturityWheel.descriptions[valueC1]}</p> 
          */}
        </div>
      );
    } else {
      return <p>Component 1 results are not yet available.</p>;
    }
  }

  // Placeholder for other components or overall summary (currentViewingStep > 1 or other specific values)
  // Example for a generic overall summary if currentViewingStep is, say, 6
  // if (currentViewingStep === 6) {
  //   return (
  //     <div>
  //       <h2>Overall Assessment Summary</h2>
  //       <p>Detailed summary and personality archetype will be displayed here.</p>
  //       <pre>{JSON.stringify(allResponses, null, 2)}</pre>
  //     </div>
  //   );
  // }

  // Default/General Case
  return <p>Results will be shown here.</p>;
};

export default ResultsDisplay;
