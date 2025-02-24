import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';

const Register = () => {
  const [formData, setFormData] = useState({ fullname: '', email: '', username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Register</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullname" onChange={handleChange} value={formData.fullname} placeholder="Full Name" className="input-field" required />
        <input type="email" name="email" onChange={handleChange} value={formData.email} placeholder="Email" className="input-field" required />
        <input type="text" name="username" onChange={handleChange} value={formData.username} placeholder="Username" className="input-field" required />
        <input type="password" name="password" onChange={handleChange} value={formData.password} placeholder="Password" className="input-field" required />
        <button type="submit" className="login-button">Register</button>
        <div className="form-footer">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Register;
