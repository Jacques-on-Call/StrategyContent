import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>DigitalView Dynamic Proposal Tool</h1>
      </header>
      <main>
        <h2>Services</h2>
        <ul>
          {services.map(service => (
            <li key={service.ServiceID}>{service.Name} - ${service.ClientPrice}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
