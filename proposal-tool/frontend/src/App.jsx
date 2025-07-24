import { useState, useEffect } from 'react';
import './App.css';
import '../public/style.css';

function App() {
  const [proposals, setProposals] = useState([]);
  const [clientName, setClientName] = useState('');
  const [projectIntent, setProjectIntent] = useState('');

  useEffect(() => {
    fetch('/api/proposal')
      .then((res) => res.json())
      .then((data) => setProposals(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/proposal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: 1, // hardcoded for now
        summary: `${clientName} - ${projectIntent}`,
        status: 'draft',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProposals([...proposals, data]);
        setClientName('');
        setProjectIntent('');
      });
  };

  return (
    <>
      <h1>Proposal Tool</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Project Intent"
          value={projectIntent}
          onChange={(e) => setProjectIntent(e.target.value)}
        />
        <button type="submit">Create Proposal</button>
      </form>
      <h2>Proposals</h2>
      <ul>
        {proposals.map((proposal) => (
          <li key={proposal.id}>{proposal.summary}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
