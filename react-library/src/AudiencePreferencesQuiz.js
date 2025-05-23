import React, { useState } from 'react';
import { ArrowRight, MessageCircle, CheckCircle2, BarChart3, RefreshCcw } from 'lucide-react';

const AudiencePreferencesQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [multiSelectAnswers, setMultiSelectAnswers] = useState({
    0: [],
    2: []
  });

  const questions = [
    {
      id: 0,
      text: "Where do you typically hang out online for business insights?",
      type: "multiSelect",
      options: [
        { id: 'a', text: "LinkedIn & Professional Networks", icon: "👔" },
        { id: 'b', text: "Instagram, Twitter/X, TikTok", icon: "📱" },
        { id: 'c', text: "Industry Forums & Communities", icon: "🧩" },
        { id: 'd', text: "YouTube & Video Platforms", icon: "🎬" },
        { id: 'e', text: "Podcasts & Audio Content", icon: "🎧" },
        { id: 'f', text: "Newsletters & Email Content", icon: "📧" }
      ],
      helper: "Select all that apply - this helps us understand where to find you!"
    },
    {
      id: 1,
      text: "Which content format grabs your attention immediately?",
      type: "singleSelect",
      options: [
        { id: 'a', text: "In-depth articles I can really sink into", icon: "📝" },
        { id: 'b', text: "Quick visual content (infographics, short videos)", icon: "📊" },
        { id: 'c', text: "Detailed video tutorials & webinars", icon: "🎥" },
        { id: 'd', text: "Audio content I can listen to while multitasking", icon: "🔊" },
        { id: 'e', text: "Interactive tools & quizzes like this one!", icon: "🧪" }
      ],
      helper: "We all consume content differently - what's your go-to format?"
    },
    {
      id: 2,
      text: "What content qualities keep you coming back for more?",
      type: "multiSelect",
      options: [
        { id: 'a', text: "Data-backed insights & research", icon: "📈" },
        { id: 'b', text: "Real stories & case studies", icon: "📚" },
        { id: 'c', text: "Practical step-by-step guides", icon: "🔍" },
        { id: 'd', text: "Expert opinions & thought leadership", icon: "💡" },
        { id: 'e', text: "Behind-the-scenes authenticity", icon: "🎭" },
        { id: 'f', text: "Humor & entertainment value", icon: "😂" }
      ],
      helper: "Choose your top 3 - what makes content truly valuable to you?"
    },
    {
      id: 3,
      text: "How would you describe your community participation style?",
      type: "slider",
      options: [
        "Silent observer",
        "Occasional liker",
        "Regular commenter",
        "Active contributor",
        "Community leader"
      ],
      helper: "Everyone engages differently - there's no wrong answer!"
    }
  ];

  const handleSingleSelect = (questionId, answerId) => {
    setAnswers({...answers, [questionId]: answerId});
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 400);
    }
  };

  const handleMultiSelect = (questionId, answerId) => {
    const currentSelections = multiSelectAnswers[questionId] || [];
    
    if (currentSelections.includes(answerId)) {
      setMultiSelectAnswers({
        ...multiSelectAnswers,
        [questionId]: currentSelections.filter(id => id !== answerId)
      });
    } else {
      if (questionId === 2 && currentSelections.length >= 3) {
        // For question 3, limit to 3 selections
        return;
      }
      setMultiSelectAnswers({
        ...multiSelectAnswers,
        [questionId]: [...currentSelections, answerId]
      });
    }
  };

  const handleSliderChange = (questionId, value) => {
    setAnswers({...answers, [questionId]: value});
  };

  const isNextButtonDisabled = () => {
    const currentQ = questions[currentQuestion];
    if (currentQ.type === "multiSelect") {
      return (multiSelectAnswers[currentQ.id] || []).length === 0;
    }
    if (currentQ.type === "singleSelect") {
      return answers[currentQ.id] === undefined;
    }
    return false;
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setMultiSelectAnswers({ 0: [], 2: [] });
    setShowResults(false);
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];

    if (question.type === "singleSelect") {
      return (
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-800">{question.text}</h3>
          <p className="text-sm text-gray-500 italic">{question.helper}</p>
          <div className="space-y-2 mt-4">
            {question.options.map((option) => (
              <button
                key={option.id}
                className={`w-full p-3 flex items-center text-left rounded-lg transition-all duration-200 ${
                  answers[question.id] === option.id
                    ? "bg-indigo-100 border-2 border-indigo-500"
                    : "bg-white border border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => handleSingleSelect(question.id, option.id)}
              >
                <span className="text-xl mr-3">{option.icon}</span>
                <span>{option.text}</span>
                {answers[question.id] === option.id && (
                  <CheckCircle2 className="ml-auto text-indigo-600" size={18} />
                )}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (question.type === "multiSelect") {
      const selectedAnswers = multiSelectAnswers[question.id] || [];
      const maxSelectionsReached = question.id === 2 && selectedAnswers.length >= 3;
      
      return (
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-800">{question.text}</h3>
          <p className="text-sm text-gray-500 italic">{question.helper}</p>
          <div className="space-y-2 mt-4">
            {question.options.map((option) => (
              <button
                key={option.id}
                className={`w-full p-3 flex items-center text-left rounded-lg transition-all duration-200 ${
                  selectedAnswers.includes(option.id)
                    ? "bg-indigo-100 border-2 border-indigo-500"
                    : maxSelectionsReached 
                      ? "bg-white border border-gray-200 opacity-50 cursor-not-allowed"
                      : "bg-white border border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => handleMultiSelect(question.id, option.id)}
                disabled={maxSelectionsReached && !selectedAnswers.includes(option.id)}
              >
                <span className="text-xl mr-3">{option.icon}</span>
                <span>{option.text}</span>
                {selectedAnswers.includes(option.id) && (
                  <CheckCircle2 className="ml-auto text-indigo-600" size={18} />
                )}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (question.type === "slider") {
      const value = answers[question.id] !== undefined ? answers[question.id] : 2;
      
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800">{question.text}</h3>
          <p className="text-sm text-gray-500 italic">{question.helper}</p>
          
          <div className="mt-6 mb-2">
            <input
              type="range"
              min="0"
              max="4"
              value={value}
              onChange={(e) => handleSliderChange(question.id, parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-600">
            {question.options.map((label, index) => (
              <div 
                key={index} 
                className={`text-center ${value === index ? 'font-bold text-indigo-600' : ''}`}
                style={{width: '20%'}}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  // Define audience persona profiles based on question responses
  const audienceProfiles = {
    'Active Engagers': {
      description: 'This audience segment actively participates in communities, values authenticity, and prefers content that invites discussion or co-creation.',
      contentStrategies: [
        { title: 'Community Building', description: 'Create spaces for meaningful conversation around your content.' },
        { title: 'Interactive Content', description: 'Develop polls, quizzes, and interactive tools that invite participation.' },
        { title: 'Co-Creation Opportunities', description: 'Invite audience members to contribute their expertise or stories.' },
        { title: 'Question-Driven Content', description: 'Frame content around questions your audience is actively discussing.' }
      ],
      contentFormats: [
        { format: 'Live video Q&As', relevance: 95 },
        { format: 'Community forums & discussion threads', relevance: 90 },
        { format: 'User-generated content campaigns', relevance: 85 },
        { format: 'Interactive workshops & webinars', relevance: 80 }
      ]
    },
    'Focused Learners': {
      description: 'This audience segment is seeking specific knowledge, values depth and expertise, and prefers structured, information-rich content they can apply immediately.',
      contentStrategies: [
        { title: 'Research Summaries', description: 'Transform complex data into accessible insights with clear takeaways.' },
        { title: 'Expert Interviews', description: 'Feature recognized authorities who can validate your content.' },
        { title: 'Step-by-Step Guides', description: 'Create comprehensive tutorials with clear structure and progression.' },
        { title: 'Resource Libraries', description: 'Develop curated collections of high-value tools and templates.' }
      ],
      contentFormats: [
        { format: 'In-depth guides & whitepapers', relevance: 95 },
        { format: 'Data-rich visuals & infographics', relevance: 85 },
        { format: 'Structured courses & learning paths', relevance: 90 },
        { format: 'Tool-based content & templates', relevance: 80 }
      ]
    },
    'Visual Browsers': {
      description: 'This audience segment is visually-oriented, values creativity and aesthetic appeal, and prefers content that communicates quickly through compelling imagery.',
      contentStrategies: [
        { title: 'Visual Storytelling', description: 'Center your narrative around powerful images that evoke emotion.' },
        { title: 'Format Transformation', description: 'Convert text-heavy content into visual formats like infographics.' },
        { title: 'Design Investment', description: 'Prioritize professional design to enhance credibility and appeal.' },
        { title: 'Video Adaptation', description: 'Transform key content pieces into short, engaging videos.' }
      ],
      contentFormats: [
        { format: 'Short-form videos & reels', relevance: 95 },
        { format: 'Infographics & data visualizations', relevance: 90 },
        { format: 'Visual case studies & storyboards', relevance: 85 },
        { format: 'Image-rich social content', relevance: 80 }
      ]
    },
    'Practical Implementers': {
      description: 'This audience segment is action-oriented, values efficiency and practical application, and prefers content that delivers immediate, usable value.',
      contentStrategies: [
        { title: 'Action Templates', description: 'Create ready-to-use frameworks that simplify implementation.' },
        { title: 'Real-World Examples', description: 'Feature practical case studies with clear results and methods.' },
        { title: 'Implementation Guides', description: 'Focus on the "how" with detailed steps and troubleshooting tips.' },
        { title: 'ROI Emphasis', description: 'Clearly articulate the specific benefits and outcomes of taking action.' }
      ],
      contentFormats: [
        { format: 'Templates & swipe files', relevance: 95 },
        { format: 'Step-by-step tutorials', relevance: 90 },
        { format: 'Checklists & action plans', relevance: 85 },
        { format: 'Case studies with implementation details', relevance: 80 }
      ]
    },
    'Curious Explorers': {
      description: 'This audience segment is intellectually curious, values innovation and diverse perspectives, and prefers content that introduces new ideas and connections.',
      contentStrategies: [
        { title: 'Trend Analysis', description: 'Identify emerging patterns and future possibilities in your field.' },
        { title: 'Cross-Disciplinary Content', description: 'Draw unexpected connections between different domains and ideas.' },
        { title: 'Thought Leadership', description: 'Present unique viewpoints that challenge conventional thinking.' },
        { title: 'Question-Based Content', description: 'Frame content around provocative questions rather than definitive answers.' }
      ],
      contentFormats: [
        { format: 'Thought leadership articles & essays', relevance: 95 },
        { format: 'Interview series with diverse experts', relevance: 90 },
        { format: 'Podcast discussions on emerging trends', relevance: 85 },
        { format: 'Experimental content formats', relevance: 80 }
      ]
    }
  };

  // Function to determine audience persona based on answers
  const determineAudiencePersona = () => {
    // Platform preferences (question 0)
    const platformChoices = multiSelectAnswers[0] || [];
    // Content format preference (question 1)
    const formatPreference = answers[1];
    // Content qualities valued (question 2)
    const contentQualities = multiSelectAnswers[2] || [];
    // Engagement style (question 3)
    const engagementLevel = answers[3] !== undefined ? parseInt(answers[3]) : 2;
    
    // Logic to determine persona based on answers
    if (engagementLevel >= 3 && platformChoices.includes('c')) {
      return 'Active Engagers';
    } else if ((contentQualities.includes('a') || contentQualities.includes('c')) && 
              (formatPreference === 'a' || formatPreference === 'c')) {
      return 'Focused Learners';
    } else if ((formatPreference === 'b') && 
              (platformChoices.includes('b') || platformChoices.includes('d'))) {
      return 'Visual Browsers';
    } else if (contentQualities.includes('c') && 
              (engagementLevel < 3)) {
      return 'Practical Implementers';
    } else if ((contentQualities.includes('d') || contentQualities.includes('f')) && 
              (formatPreference === 'e' || platformChoices.includes('e'))) {
      return 'Curious Explorers';
    } else {
      // Default to the persona that best matches their engagement style
      return engagementLevel >= 3 ? 'Active Engagers' : 'Practical Implementers';
    }
  };

  // Map answers to more specific insights
  const generateContentInsights = () => {
    const formatPreference = answers[1];
    const engagementLevel = answers[3] !== undefined ? parseInt(answers[3]) : 2;
    const contentQualities = multiSelectAnswers[2] || [];
    
    // Generate specific insights
    const insights = [];
    
    // Format preference insights
    if (formatPreference === 'a') {
      insights.push({
        category: 'Content Length',
        insight: 'Your audience values depth over brevity - they're willing to engage with longer content that provides comprehensive value.',
        tip: 'Consider creating "content series" that build upon each other, allowing for both depth and digestible segments.'
      });
    } else if (formatPreference === 'b') {
      insights.push({
        category: 'Visual Priority',
        insight: 'Your audience processes information primarily through visual means and makes quick decisions about engagement.',
        tip: 'Front-load key information visually - use the first 3 seconds of videos or top section of posts to communicate core value.'
      });
    } else if (formatPreference === 'c') {
      insights.push({
        category: 'Learning Style',
        insight: 'Your audience prefers structured learning experiences with clear progression and visible outcomes.',
        tip: 'Frame content with explicit "before and after" scenarios that highlight transformation and results.'
      });
    } else if (formatPreference === 'd') {
      insights.push({
        category: 'Consumption Context',
        insight: 'Your audience often engages with content while multitasking, making retention a potential challenge.',
        tip: 'Create content with intentional repetition of key points and provide downloadable summaries for later reference.'
      });
    } else if (formatPreference === 'e') {
      insights.push({
        category: 'Engagement Preference',
        insight: 'Your audience enjoys participatory content that invites them to contribute rather than passively consume.',
        tip: 'Build interaction points throughout your content - not just at the end - to maintain active engagement.'
      });
    }
    
    // Engagement level insights
    if (engagementLevel >= 4) {
      insights.push({
        category: 'Community Potential',
        insight: 'Your audience includes potential advocates and co-creators who can amplify and contribute to your content.',
        tip: 'Create opportunities for audience members to showcase their expertise and build their own authority through your platform.'
      });
    } else if (engagementLevel <= 1) {
      insights.push({
        category: 'Value Clarity',
        insight: 'Your audience needs clear, upfront value propositions before deciding to engage more deeply.',
        tip: 'Focus on strong headlines and introductions that immediately communicate the specific benefit of engaging with your content.'
      });
    }
    
    // Content qualities insights
    if (contentQualities.includes('a')) {
      insights.push({
        category: 'Trust Building',
        insight: 'Your audience is skeptical of claims without evidence and values content that demonstrates research rigor.',
        tip: 'Even when sharing opinions, include data points or expert citations to build credibility.'
      });
    } else if (contentQualities.includes('b')) {
      insights.push({
        category: 'Narrative Approach',
        insight: 'Your audience connects with stories that illustrate concepts in action rather than abstract principles.',
        tip: 'Structure content around relatable scenarios and character-driven narratives, even when discussing technical topics.'
      });
    }
    
    return insights;
  };

  const renderResults = () => {
    const persona = determineAudiencePersona();
    const profileData = audienceProfiles[persona];
    const contentInsights = generateContentInsights();
    
    return (
      <div className="space-y-6">
        {/* Audience Persona Card */}
        <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100">
          <h3 className="font-semibold text-indigo-800 flex items-center text-lg mb-2">
            <MessageCircle className="mr-2" size={20} />
            Your Primary Audience Persona: {persona}
          </h3>
          <p className="text-gray-700 mb-4">
            {profileData.description}
          </p>
          
          {/* Progress indicators showing how this matches their preferences */}
          <div className="space-y-3 mt-4">
            <h4 className="font-medium text-indigo-700 text-sm">How your answers shaped this profile:</h4>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Platform choices</span>
                  <span className="font-medium">{multiSelectAnswers[0]?.length || 0} selected</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" 
                       style={{width: `${Math.min(100, ((multiSelectAnswers[0]?.length || 0) / 6) * 100)}%`}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Content format preference</span>
                  <span className="font-medium">{questions[1].options.find(o => o.id === answers[1])?.text.split('(')[0] || 'None selected'}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{width: answers[1] ? '100%' : '0%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Valued content qualities</span>
                  <span className="font-medium">{multiSelectAnswers[2]?.length || 0} selected</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" 
                       style={{width: `${Math.min(100, ((multiSelectAnswers[2]?.length || 0) / 3) * 100)}%`}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Format Recommendations */}
        <div className="bg-green-50 p-5 rounded-lg border border-green-100">
          <h3 className="font-semibold text-green-800 flex items-center text-lg mb-3">
            <BarChart3 className="mr-2" size={20} />
            Recommended Content Formats
          </h3>
          
          <div className="space-y-3">
            {profileData.contentFormats.map((format, idx) => (
              <div key={idx} className="flex items-center">
                <div className="w-full flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{format.format}</span>
                    <span className="text-sm text-gray-500">{format.relevance}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${idx === 0 ? 'bg-green-500' : 'bg-green-400'}`}
                      style={{width: `${format.relevance}%`}}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Content Strategy Recommendations */}
        <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
          <h3 className="font-semibold text-blue-800 flex items-center text-lg mb-3">
            <CheckCircle2 className="mr-2" size={20} />
            Content Strategy Recommendations
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {profileData.contentStrategies.map((strategy, idx) => (
              <div key={idx} className="bg-white p-3 rounded border border-blue-100">
                <h4 className="font-medium text-blue-700">{strategy.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{strategy.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Advanced Insights */}
        <div className="bg-amber-50 p-5 rounded-lg border border-amber-100">
          <h3 className="font-semibold text-amber-800 flex items-center text-lg mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            Advanced Audience Insights
          </h3>
          
          <div className="space-y-4">
            {contentInsights.slice(0, 2).map((insight, idx) => (
              <div key={idx} className="space-y-1">
                <h4 className="text-amber-700 font-medium">{insight.category}</h4>
                <p className="text-gray-700 text-sm">{insight.insight}</p>
                <div className="flex items-start mt-1">
                  <div className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-md font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span>Pro Tip</span>
                  </div>
                </div>
                <p className="text-gray-600 text-xs italic pl-5 border-l-2 border-amber-200">{insight.tip}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Next Steps */}
        <div className="bg-purple-50 p-5 rounded-lg border border-purple-100">
          <h3 className="font-semibold text-purple-800 flex items-center text-lg mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <polyline points="4 17 10 11 4 5"></polyline>
              <line x1="12" y1="19" x2="20" y2="19"></line>
            </svg>
            Action Plan
          </h3>
          
          <ol className="list-decimal pl-5 space-y-2 mt-2">
            <li className="text-gray-700">
              <span className="font-medium">Audit your current content</span>: Evaluate how well your existing content aligns with the formats and strategies recommended above.
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Create a test piece</span>: Develop one piece of content that fully embraces these audience preferences.
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Measure engagement</span>: Compare engagement metrics with your previous content to validate these insights.
            </li>
          </ol>
        </div>
        
        <button
          onClick={handleReset}
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center justify-center"
        >
          <RefreshCcw size={16} className="mr-2" />
          Take the Quiz Again
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-5">
      {!showResults ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-500">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <div className="flex gap-1">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 w-6 rounded-full ${
                    index === currentQuestion
                      ? "bg-indigo-600"
                      : index < currentQuestion
                      ? "bg-indigo-300"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {renderQuestion()}

          <div className="mt-6">
            <button
              onClick={handleNext}
              disabled={isNextButtonDisabled()}
              className={`w-full py-2 px-4 rounded-lg transition-colors flex items-center justify-center ${
                isNextButtonDisabled()
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
              <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </>
      ) : (
        renderResults()
      )}
    </div>
  );
};

export default AudiencePreferencesQuiz;
// In AudiencePreferencesQuiz.js
const AudiencePreferencesQuiz = () => {
  // Your component logic here
  // ...
  return (
    // Your component's JSX
    <div>{/* ... */}</div>
  );
};

// Export the component
export default AudiencePreferencesQuiz;

// We won't need this either for the library
// ReactDOM.render(
//   <AudiencePreferencesQuiz />,
//   document.getElementById('component2')
// );