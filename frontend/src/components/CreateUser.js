import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = ({ clientId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');  // Add password state
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
  console.log(token)
    try {
      // Include password in the POST request
      await axios.post(`http://localhost:5000/api/users/`, { name, email, phone, password }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Redirect or show success message
    } catch (err) {
      setError('Error creating user.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="User Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /> {/* Add password input */}
      <button type="submit">Create User</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default CreateUser;
