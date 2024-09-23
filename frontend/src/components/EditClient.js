import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Change useHistory to useNavigate

const EditClient = () => {
  const { clientId } = useParams();
  const [client, setClient] = useState({ name: '', industry: '', contactInfo: { email: '', phone: '' } });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/clients/${clientId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setClient(response.data);
      } catch (err) {
        setError('Error fetching client data.');
      }
    };
    fetchClient();
  }, [clientId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:5000/api/clients/${clientId}`, client, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Client updated successfully!');
      navigate('/clients'); // Use navigate for redirection
    } catch (err) {
      setError('Error updating client.');
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Client Name" value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} required />
      <input type="text" placeholder="Industry" value={client.industry} onChange={(e) => setClient({ ...client, industry: e.target.value })} required />
      <input type="email" placeholder="Email" value={client.contactInfo.email} onChange={(e) => setClient({ ...client, contactInfo: { ...client.contactInfo, email: e.target.value } })} required />
      <input type="text" placeholder="Phone" value={client.contactInfo.phone} onChange={(e) => setClient({ ...client, contactInfo: { ...client.contactInfo, phone: e.target.value } })} required />
      <button type="submit">Update Client</button>
      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default EditClient;
