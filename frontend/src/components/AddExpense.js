import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/add.css'

const AddExpense = () => {
  const [formData, setFormData] = useState({ description: '', amount: '', date: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/expenses', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      navigate('/view-expenses');
    } catch (error) {
      setError('Failed to add expense');
    }
  };

  return (
    <div className="add-expense-container">
      <h2 className="add-expense-heading">Add Expense</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          onChange={handleChange}
          value={formData.description}
          placeholder="Description"
          className="add-expense-input"
        />
        <input
          type="number"
          name="amount"
          onChange={handleChange}
          value={formData.amount}
          placeholder="Amount"
          className="add-expense-input"
        />
        <input
          type="date"
          name="date"
          onChange={handleChange}
          value={formData.date}
          className="add-expense-input"
        />
        <button type="submit" className="add-expense-button">
          Add Expense
        </button>
      </form>
    </div>
  );
};
  

export default AddExpense;
