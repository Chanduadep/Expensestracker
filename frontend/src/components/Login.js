import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import '../styles/Login.css'
const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
    <h2 className="login-heading">Login</h2>
    {error && <p className="error-message">{error}</p>}
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="text"
        name="username"
        onChange={handleChange}
        value={formData.username}
        placeholder="Username"
        className="input-field"
      />
      <input
        type="password"
        name="password"
        onChange={handleChange}
        value={formData.password}
        placeholder="Password"
        className="input-field"
      />
      <button type="submit" className="login-button">Login</button>
      <div className="form-footer">
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
    </form>
  </div>
);
};

export default Login;
