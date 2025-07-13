import React, { useState, useEffect } from 'react';
import ServiceBlock from './components/ServiceBlock';
import CostVisualizer from './components/CostVisualizer';
import ImpactVisualizer from './components/ImpactVisualizer';
import './App.css';

function App() {
  const [services, setServices] = useState([]);
  const [proposalServices, setProposalServices] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [clientPrice, setClientPrice] = useState(0);
  const [proposalId, setProposalId] = useState(null); // Assuming we have a proposal ID

  useEffect(() => {
    // Create a new proposal when the app loads
    fetch('/api/proposals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ClientID: 1, Status: 'Draft' }) // Assuming client ID 1 for now
    })
      .then(res => res.text())
      .then(text => {
        const id = parseInt(text.split(': ')[1], 10);
        setProposalId(id);
      });

    // Fetch services
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error(err));
  }, []);

  const addServiceToProposal = (service) => {
    // Add the service to the proposal on the backend
    fetch(`/api/proposal_services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ProposalID: proposalId, ServiceID: service.ServiceID, Quantity: 1 })
    }).then(() => {
      setProposalServices([...proposalServices, service]);
    });
  };

  const removeServiceFromProposal = (serviceToRemove) => {
    // This is a bit tricky since we don't have the ProposalServiceID.
    // For now, we'll just remove it from the frontend.
    // A better implementation would be to fetch the ProposalServiceID when adding the service.
    setProposalServices(proposalServices.filter(s => s.ServiceID !== serviceToRemove.ServiceID));
  }

  useEffect(() => {
    if (proposalId) {
      // Recalculate cost
      fetch(`/api/proposals/${proposalId}/calculate-cost`)
        .then(res => res.json())
        .then(data => {
          setTotalCost(data.totalCost);
          setClientPrice(data.clientPrice);
        });
    }
  }, [proposalServices, proposalId]);


  return (
    <div className="App">
      <header className="App-header">
        <h1>DigitalView Dynamic Proposal Tool</h1>
      </header>
      <main>
        <div className="services-container">
          <h2>Services</h2>
          {services.map(service => (
            <ServiceBlock key={service.ServiceID} service={service} onAdd={addServiceToProposal} />
          ))}
        </div>
        <div className="proposal-container">
          <h2>Your Proposal</h2>
          <ul>
            {proposalServices.map(service => (
              <li key={service.ServiceID}>
                {service.Name}
                <button onClick={() => removeServiceFromProposal(service)}>Remove</button>
              </li>
            ))}
          </ul>
          <CostVisualizer totalCost={totalCost} clientPrice={clientPrice} />
          <ImpactVisualizer />
        </div>
      </main>
    </div>
  );
}

export default App;
