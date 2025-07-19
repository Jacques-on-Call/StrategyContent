import React from 'react';

const CostVisualizer = ({ totalCost, clientPrice }) => {
  return (
    <div className="cost-visualizer">
      <h2>Cost Breakdown</h2>
      <p>Total Internal Cost: ${totalCost}</p>
      <h3>Client Price: ${clientPrice}</h3>
    </div>
  );
};

export default CostVisualizer;
