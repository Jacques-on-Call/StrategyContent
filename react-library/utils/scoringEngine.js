export const calculateScore = (questionConfig, answerValue) => {
  if (!questionConfig || !questionConfig.scoring) {
    // If no scoring info, return 0 or the answerValue if it's numeric
    return typeof answerValue === 'number' ? answerValue : 0;
  }

  const scoringType = questionConfig.scoring.type;

  switch (scoringType) {
    case 'direct':
      // Handles sliders or any case where the answerValue is the score
      return typeof answerValue === 'number' ? answerValue : 0;
    
    case 'choice_based':
      // Handles questions where specific choices have predefined scores
      // E.g., Component 1 (ProfessionalAuthorityAssessment) or Component 4 (AuthenticityIntegrityCheck) primary question
      if (questionConfig.scoring.scores && questionConfig.scoring.scores.hasOwnProperty(answerValue)) {
        return questionConfig.scoring.scores[answerValue];
      }
      // Fallback for Component 1 style scoring where score might be directly in questionConfig.scoring
      if (questionConfig.scoring.hasOwnProperty(answerValue) && typeof questionConfig.scoring[answerValue] === 'number') {
          return questionConfig.scoring[answerValue];
      }
      return 0; // Default if answerValue not found in scores map

    case 'custom_grid_summary':
      // For Component 3 (ProfessionalPresenceAudit)
      // answerValue is expected to be the gridSelections object
      let veryEffectiveCount = 0;
      if (typeof answerValue === 'object' && answerValue !== null) {
        Object.values(answerValue).forEach(sel => {
          // Value for 'Very Effective' is 4 as per questions.js config for Component 3
          if (sel.effectiveness === 4) veryEffectiveCount++;
        });
      }
      return veryEffectiveCount;

    case 'ranking_data':
      // For Component 5 (AuthorityActionBlueprint)
      // The answerValue is the itemRanks object. This object itself is considered the 'score' or raw data.
      return answerValue; 

    default:
      // Unknown scoring type
      return typeof answerValue === 'number' ? answerValue : 0;
  }
};

export const getPersonalityTags = (questionConfig, answerValue) => {
  // Placeholder: Actual logic will involve mapping answers to tags based on ScoringData.js
  // Example:
  // if (ScoringData[questionConfig.componentId] && ScoringData[questionConfig.componentId][questionConfig.id]) {
  //   const answerScoring = ScoringData[questionConfig.componentId][questionConfig.id][answerValue];
  //   return answerScoring && answerScoring.personalityTags ? answerScoring.personalityTags : [];
  // }
  return [];
};

export const determineNextComponentInfluence = (questionConfig, answerValue) => {
  // Placeholder: Actual logic will use ScoringData.js to find 'nextComponentInfluence'
  // Example:
  // if (ScoringData[questionConfig.componentId] && ScoringData[questionConfig.componentId][questionConfig.id]) {
  //   const answerScoring = ScoringData[questionConfig.componentId][questionConfig.id][answerValue];
  //   return answerScoring && answerScoring.nextComponentInfluence ? answerScoring.nextComponentInfluence : null;
  // }
  return null;
};

export const mapToContentRecommendations = (questionConfig, answerValue) => {
  // Placeholder: Actual logic will use ScoringData.js or another mapping for recommendations
  return [];
};

export const processAnswer = (questionConfig, answerValue) => {
  const score = calculateScore(questionConfig, answerValue);
  const tags = getPersonalityTags(questionConfig, answerValue);
  const influence = determineNextComponentInfluence(questionConfig, answerValue);
  const recommendations = mapToContentRecommendations(questionConfig, answerValue);

  return {
    score: score,
    tags: tags,
    influence: influence,
    recommendations: recommendations,
    originalAnswer: answerValue
  };
};
