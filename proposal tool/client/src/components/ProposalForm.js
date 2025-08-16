import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ProposalForm() {
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    companyName: '',
    projectRequirements: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      axios.get(`/proposals/${id}`)
        .then(response => {
          setFormData(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [id, isEditMode]);

  const { clientName, email, companyName, projectRequirements } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const proposalData = { clientName, email, companyName, projectRequirements };

    try {
      if (isEditMode) {
        await axios.post(`/proposals/update/${id}`, proposalData);
      } else {
        await axios.post('/proposals/add', proposalData);
      }
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>{isEditMode ? 'Edit Proposal' : 'Create New Proposal'}</h3>
      <form onSubmit={onSubmit}>
        {/* Form fields are the same as before */}
        <div className="form-group">
          <label>Client Name: </label>
          <input  type="text"
              required
              className="form-control"
              name="clientName"
              value={clientName}
              onChange={onChange}
              />
        </div>
        <div className="form-group">
          <label>Email: </label>
          <input
              type="email"
              required
              className="form-control"
              name="email"
              value={email}
              onChange={onChange}
              />
        </div>
        <div className="form-group">
          <label>Company Name: </label>
          <input
              type="text"
              className="form-control"
              name="companyName"
              value={companyName}
              onChange={onChange}
              />
        </div>
        <div className="form-group">
          <label>Project Requirements: </label>
          <textarea
              className="form-control"
              name="projectRequirements"
              value={projectRequirements}
              onChange={onChange}
              />
        </div>
        <div className="form-group">
          <input type="submit" value={isEditMode ? 'Update Proposal' : 'Create Proposal'} className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

export default ProposalForm;
