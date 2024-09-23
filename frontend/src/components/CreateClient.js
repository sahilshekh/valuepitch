import React, { useState } from 'react';
import axios from 'axios';

const CreateClient = () => {
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [contactInfo, setContactInfo] = useState({ email: '', phone: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:5000/api/clients', { name, industry, contactInfo }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Redirect or show success message
    } catch (err) {
      setError('Error creating client.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Client Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Industry" value={industry} onChange={(e) => setIndustry(e.target.value)} required />
      <input type="email" placeholder="Email" value={contactInfo.email} onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })} required />
      <input type="text" placeholder="Phone" value={contactInfo.phone} onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })} required />
      <button type="submit">Create Client</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default CreateClient;
