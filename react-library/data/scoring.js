export const ScoringData = {
  // This object will hold the scoring logic and personality tag associations for each question.
  // The structure will likely map question IDs to their answer values, and then to scoring outcomes.
  // Example:
  // component1: {
  //   q1_story_approach: { // Question ID
  //     // Answer values and their corresponding scores/tags
  //     seeker: { primaryScore: 1, personalityTags: ['introspective', 'foundational'], nextComponentInfluence: 'beginner_path' },
  //     crafter: { primaryScore: 2, personalityTags: ['analytical', 'developing'], nextComponentInfluence: 'intermediate_path' },
  //     teller: { primaryScore: 3, personalityTags: ['expressive', 'communicative'], nextComponentInfluence: 'advanced_path' },
  //     connector: { primaryScore: 4, personalityTags: ['engaging', 'relational'], nextComponentInfluence: 'expert_path' },
  //     master: { primaryScore: 5, personalityTags: ['strategic', 'impactful'], nextComponentInfluence: 'leader_path' }
  //   }
  //   // ... other questions for component1
  // },
  // component2: {
  //   // ... scoring for component2 questions
  // }
  // ... and so on for other components.

  // The 'primaryScore' could contribute to an overall maturity score.
  // 'personalityTags' will be collected to determine the user's brand personality archetype.
  // 'nextComponentInfluence' could dynamically alter the questions or flow in subsequent components.
};
