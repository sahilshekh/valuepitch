import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Change useHistory to useNavigate

const EditUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({ name: '', email: '', role: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (err) {
        setError('Error fetching user data.');
      }
    };
    fetchUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:5000/api/users/${userId}`, user, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('User updated successfully!');
      navigate('/users'); // Use navigate for redirection
    } catch (err) {
      setError('Error updating user.');
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="User Name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} required />
      <input type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
      <select value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })} required>
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
      <button type="submit">Update User</button>
      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default EditUser;
