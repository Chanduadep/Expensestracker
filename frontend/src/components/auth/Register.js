import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../auth/Login.css";
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
  });
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.fullname.trim()) newErrors.fullname = "Fullname is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
       toast.success("Login successful")
      navigate("/login");
    } catch (error) {
      setError("Registration failed");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Register</h2>
      {apiError && <p className="error-message">{apiError}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullname"
          onChange={handleChange}
          value={formData.fullname}
          placeholder="Full Name"
          className={`input-field ${error.fullname ? `input-error`:""}`}
        />
        {error.fullname && <p className="error-message">{error.fullname}</p>}
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          placeholder="Email"
          className={`input-field ${error.email ? `input-error`:""}`}
          
        />
        {error.email && <p className="error-message">{error.email}</p>}
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
        <button type="submit" className="login-button">
          Register
        </button>
        <div className="form-footer">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
