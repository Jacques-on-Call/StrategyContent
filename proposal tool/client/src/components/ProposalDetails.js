import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProposalDetails() {
  const [proposal, setProposal] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/proposals/${id}`)
      .then(response => {
        setProposal(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [id]);

  if (!proposal) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{proposal.clientName}</h2>
      <p><strong>Email:</strong> {proposal.email}</p>
      <p><strong>Company:</strong> {proposal.companyName}</p>
      <p><strong>Requirements:</strong> {proposal.projectRequirements}</p>
      {/* I will add the other fields later */}
    </div>
  );
}

export default ProposalDetails;
