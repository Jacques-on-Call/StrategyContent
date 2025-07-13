const allocateLabor = (services) => {
  // This function will allocate labor costs based on the selected services.
  // It will return the total labor cost for the proposal.
  let totalLaborCost = 0;
  services.forEach(service => {
    // Replace with actual labor allocation logic
    totalLaborCost += service.EstimatedHoursYou * 35; // $35/hr for your time
    totalLaborCost += service.EstimatedHoursStaff * 40; // $40/hr for staff time
  });
  return totalLaborCost;
};

module.exports = {
  allocateLabor,
};
