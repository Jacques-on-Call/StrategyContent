// usage_tracker.js

// This is a simplified usage tracker. In a real application, this would
// interact with the database to track tool usage per client.

const toolUsage = {
  'SEMrush': {
    limit: 10,
    unit: 'projects',
    currentUsage: 0
  },
  'Buffer': {
    limit: 4,
    unit: 'channels',
    currentUsage: 0
  }
};

/**
 * Checks if adding a service would exceed a tool's usage limit.
 * @param {string} toolName - The name of the tool.
 * @param {number} amount - The amount of usage to add.
 * @returns {boolean} - True if the usage is within the limit, false otherwise.
 */
function checkUsage(toolName, amount) {
  if (toolUsage[toolName]) {
    return (toolUsage[toolName].currentUsage + amount) <= toolUsage[toolName].limit;
  }
  return true; // No limit for this tool
}

/**
 * Records tool usage.
 * @param {string} toolName - The name of the tool.
 * @param {number} amount - The amount of usage to add.
 */
function recordUsage(toolName, amount) {
  if (toolUsage[toolName]) {
    toolUsage[toolName].currentUsage += amount;
  }
}

module.exports = { checkUsage, recordUsage };
