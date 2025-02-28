import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import '../auth/Login.css';
import {toast } from 'react-toastify';
const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState({ username: '', password: '' });
  const [apiError,setApiError]=useState('')
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({...error,[e.target.name]:''})
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateErrors={}
    if(!formData.username.trim()) validateErrors.username="Username is required";
    if(!formData.password.trim()) validateErrors.password="Password is required";
    if(Object.keys(validateErrors).length>0){
      setError(validateErrors)
      return
    }
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      toast.success("Login successful")
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
    <h2 className="login-heading">Login</h2>
    {apiError && <p className="error-message">{apiError}</p>}
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="text"
        name="username"
        onChange={handleChange}
        value={formData.username}
        placeholder="Username"
        className={`input-field ${error.username ? `input-error`:""}`}
      />
      {error.username && <p className="error-message">{error.username}</p>}
      <input
        type="password"
        name="password"
        onChange={handleChange}
        value={formData.password}
        placeholder="Password"
        className={`input-field ${error.password ? `input-error`:""}`}
      />
      {error.password && <p className="error-message">{error.password}</p>}
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