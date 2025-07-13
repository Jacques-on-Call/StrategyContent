import React from 'react';

const ServiceBlock = ({ service, onAdd }) => {
  return (
    <div className="service-block">
      <h3>{service.Name}</h3>
      <p>{service.Description}</p>
      <p>Price: ${service.ClientPrice}</p>
      <button onClick={() => onAdd(service)}>Add to Proposal</button>
    </div>
  );
};

export default ServiceBlock;
