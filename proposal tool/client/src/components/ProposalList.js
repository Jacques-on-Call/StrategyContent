import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import AuthService from '../services/auth.service';

function ProposalList() {
  const [proposals, setProposals] = useState([]);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
      const decodedToken = jwtDecode(user.token);
      setUserRole(decodedToken.user.role);
    }

    axios.get('/proposals/')
      .then(response => {
        setProposals(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  function proposalList() {
    return proposals.map(currentproposal => {
      return (
        <tr key={currentproposal._id}>
          <td>{currentproposal.clientName}</td>
          <td>
            <Link to={"/proposal/"+currentproposal._id}>View</Link>
            {(userRole === 'admin' || userRole === 'editor') && (
              <> | <Link to={"/edit/"+currentproposal._id}>Edit</Link></>
            )}
            {userRole === 'admin' && (
              <> | <button onClick={() => { deleteProposal(currentproposal._id) }} className="btn btn-link">Delete</button></>
            )}
          </td>
        </tr>
      )
    })
  }

  function deleteProposal(id) {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
      const config = {
        headers: {
          'x-auth-token': user.token
        }
      };
      axios.delete('/proposals/'+id, config)
        .then(response => { console.log(response.data)});

      setProposals(proposals.filter(el => el._id !== id))
    }
  }

  return (
    <div>
      <h3>Proposals</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Client Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { proposalList() }
        </tbody>
      </table>
    </div>
  );
}

export default ProposalList;
