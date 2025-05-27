export const QuestionsData = {
  component1: [
    {
      id: 'q1_story_approach',
      text: 'Which statement best describes your current brand storytelling approach?',
      type: 'multipleChoice', // or 'slider', 'gridSelection' etc.
      options: [
        { value: 'seeker', text: 'Story Seeker (Just starting to define our narrative)' },
        { value: 'crafter', text: 'Story Crafter (We have some basic story elements)' },
        { value: 'teller', text: 'Story Teller (We communicate a consistent message)' },
        { value: 'connector', text: 'Story Connector (Our story actively engages our audience)' },
        { value: 'master', text: 'Story Master (Our storytelling is strategic and measurably impactful)' }
      ],
      // For Component 1, this might map to the maturity wheel stages
      scoring: { // This scoring might be simplified or moved to scoring.js later
        seeker: 1,
        crafter: 2,
        teller: 3,
        connector: 4,
        master: 5
      }
    }
  ],
  component2: [
    {
      id: 'q2_audience_understanding',
      text: "How well do you feel you understand your primary audience's deepest motivations?",
      type: 'slider',
      min: 0,
      max: 10,
      labels: ['Not at all', 'Somewhat', 'Very Well'], // Min, Mid (approx), Max
      scoring: { type: 'direct' } // Score is the direct slider value
    },
    {
      id: 'q2_feedback_integration',
      text: 'How effectively do you integrate client feedback into your service or product development?',
      type: 'slider',
      min: 0,
      max: 10,
      labels: ['Rarely', 'Sometimes', 'Consistently'],
      scoring: { type: 'direct' }
    }
  ],
  component3: [
    {
      id: 'q3_channel_effectiveness',
      text: 'For each channel, select how effective you believe it is for your brand. Then, choose your primary storytelling format for that channel.',
      type: 'gridSelection',
      channels: [
        { id: 'video', name: 'Video Platforms (e.g., YouTube, Vimeo)' },
        { id: 'blog', name: 'Blogs/Articles' },
        { id: 'social', name: 'Social Media (e.g., LinkedIn, Instagram)' },
        { id: 'email', name: 'Email Marketing' },
        { id: 'podcast', name: 'Podcasts' }
      ],
      effectivenessLevels: [
        { value: 1, label: 'Not Effective' },
        { value: 2, label: 'Somewhat Effective' },
        { value: 3, label: 'Effective' },
        { value: 4, label: 'Very Effective' }
      ],
      formats: [
        { value: 'long_form', label: 'Long-form (detailed)' },
        { value: 'short_form', label: 'Short & Punchy' },
        { value: 'visual_heavy', label: 'Visual Heavy' },
        { value: 'interactive', label: 'Interactive' }
      ],
      scoring: {
        type: 'custom_grid_summary' // Score might be an object or a summary value
      }
    }
  ],
  component4: [
    {
      id: 'q4_authenticity_statement',
      text: "Which statement best reflects your brand's current approach to authenticity in its messaging?",
      type: 'singleChoiceWithFollowUp',
      options: [
        { value: 'values_driven', text: 'Our messaging is consistently driven by our core values.', followUpQuestionId: 'q4_follow_up_values_consistency' },
        { value: 'aspirational', text: 'Our messaging reflects our aspirational brand identity, which we are still growing into.', followUpQuestionId: 'q4_follow_up_aspiration_gap' },
        { value: 'market_focused', text: 'Our messaging is primarily shaped by market demands and competitor actions.', followUpQuestionId: 'q4_follow_up_market_pressure' }
      ],
      scoring: { type: 'choice_based', scores: { values_driven: 3, aspirational: 2, market_focused: 1 } }
    },
    { id: 'q4_follow_up_values_consistency', text: 'How consistently do you feel your day-to-day operations reflect these core values?', type: 'slider', min: 0, max: 10, labels: ['Inconsistently', 'Somewhat', 'Very Consistently'], scoring: { type: 'direct' } },
    { id: 'q4_follow_up_aspiration_gap', text: 'How significant is the gap between your current reality and this aspirational identity?', type: 'slider', min: 0, max: 10, labels: ['Very Small', 'Moderate', 'Very Significant'], scoring: { type: 'direct' } },
    { id: 'q4_follow_up_market_pressure', text: 'How much pressure do you feel to compromise authenticity due to market demands?', type: 'slider', min: 0, max: 10, labels: ['Very Little', 'Some', 'A Lot'], scoring: { type: 'direct' } }
  ],
  component5: [
    {
      id: 'q5_action_priority',
      text: 'Based on your journey so far, rank the following areas in order of priority for your brand storytelling (1 = highest priority):',
      type: 'priorityRanking',
      items: [
        { id: 'clarify_messaging', label: 'Clarifying Your Core Message' },
        { id: 'audience_research', label: 'Deeper Audience Research' },
        { id: 'content_consistency', label: 'Improving Content Consistency' },
        { id: 'channel_optimization', label: 'Optimizing Key Channels' },
        { id: 'authenticity_review', label: 'Authenticity & Values Alignment Review' }
      ],
      rankingSlots: 5, // Should match items.length
      scoring: { type: 'ranking_data' } // Score will be the ranking object itself
    }
  ]
};
