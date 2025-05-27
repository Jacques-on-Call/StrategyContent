import React, { useState, useEffect } from 'react';

const Component5 = ({ onSubmitAnswer, componentNumber, questions, onCompleteComponent }) => {
  const [itemRanks, setItemRanks] = useState({});

  const currentQuestion = questions[0]; // Assuming one ranking question per component
  const rankOptions = currentQuestion ? Array.from({ length: currentQuestion.items.length }, (_, i) => i + 1) : [];

  useEffect(() => {
    if (currentQuestion && currentQuestion.items) {
      const initialRanks = {};
      currentQuestion.items.forEach(item => {
        initialRanks[item.id] = null; // Use null for unselected
      });
      setItemRanks(initialRanks);
    }
  }, [currentQuestion]); // Depend on currentQuestion to re-init if it changes

  const handleRankChange = (itemId, selectedRank) => {
    setItemRanks(prev => ({
      ...prev,
      [itemId]: selectedRank === '' ? null : parseInt(selectedRank)
    }));
  };

  const isRankingCompleteAndValid = () => {
    if (!currentQuestion || !currentQuestion.items || Object.keys(itemRanks).length !== currentQuestion.items.length) {
      return false;
    }

    const assignedRanks = [];
    let allItemsRanked = true;

    for (const itemId in itemRanks) {
      const rank = itemRanks[itemId];
      if (rank === null) {
        allItemsRanked = false;
        break;
      }
      assignedRanks.push(rank);
    }

    if (!allItemsRanked) return false;

    // Check for uniqueness
    const uniqueRanks = new Set(assignedRanks);
    return uniqueRanks.size === currentQuestion.items.length;
  };

  const handleSubmitRanks = () => {
    if (!isRankingCompleteAndValid()) {
      alert("Please assign a unique rank to all items before proceeding.");
      return;
    }

    const answerValue = itemRanks;
    // Score calculation (or handling of ranking data) is now done by QuizContainer via scoringEngine
    onSubmitAnswer(componentNumber, currentQuestion.id, answerValue, currentQuestion);
    onCompleteComponent(componentNumber); // Signal completion of this component
  };

  if (!currentQuestion) {
    return <div>Loading question...</div>;
  }

  return (
    <div>
      <h2>Component {componentNumber}: Authority Action Blueprint</h2>
      <p>You've journeyed through the core elements of your brand's story. Now it's time to consolidate your insights into a clear action plan. This final step helps you prioritize where to focus your efforts for maximum impact on your authority and client attraction.</p>
      
      <h3>{currentQuestion.text}</h3>

      <div style={{ marginTop: '20px' }}>
        {currentQuestion.items.map(item => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <label htmlFor={`rank-${item.id}`} style={{ flex: 1, marginRight: '10px' }}>{item.label}:</label>
            <select
              id={`rank-${item.id}`}
              value={itemRanks[item.id] === null ? '' : itemRanks[item.id]}
              onChange={(e) => handleRankChange(item.id, e.target.value)}
              style={{ padding: '8px', minWidth: '150px' }}
            >
              <option value="" disabled>Select Rank...</option>
              {rankOptions.map(rank => (
                <option key={rank} value={rank}>{rank}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmitRanks}
        disabled={!isRankingCompleteAndValid()}
        style={{ marginTop: '30px', padding: '12px 20px', cursor: isRankingCompleteAndValid() ? 'pointer' : 'not-allowed' }}
      >
        Finalize Blueprint & View My Results
      </button>

      <p style={{ marginTop: '30px', fontStyle: 'italic' }}>
        <strong>Relevance:</strong> This blueprint isn't just an exercise; it's your strategic roadmap. By identifying your top priorities, you can channel your resources effectively, transforming insights into tangible improvements in how clients perceive and respond to your brand.
      </p>
      <p style={{ marginTop: '20px', fontWeight: 'bold' }}>
        Congratulations! You're about to see how these pieces fit together to form your unique Brand Story Blueprint.
      </p>
    </div>
  );
};

export default Component5;
