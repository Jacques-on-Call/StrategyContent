// cost_calculator.js

/**
 * Calculates the total cost of a set of services, including labor and tool costs, with a markup.
 * @param {Array} services - An array of service objects.
 * @param {number} markup - The markup multiplier (e.g., 1.5 for a 50% markup).
 * @returns {number} The total calculated cost.
 */
function calculateTotalCost(services, markup) {
  let totalCost = 0;
  for (const service of services) {
    const laborCost = (service.EstimatedHoursYou * 35) + (service.EstimatedHoursStaff * 40);
    // In a real application, tool costs would be more complex to calculate
    const toolCost = service.ToolCost || 0;
    const baseCost = laborCost + toolCost;
    totalCost += baseCost;
  }
  return totalCost * markup;
}

module.exports = { calculateTotalCost };
