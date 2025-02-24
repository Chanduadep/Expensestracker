import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/view.css'

const ViewExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/expenses', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setExpenses(response.data);
      } catch (error) {
        setError('Failed to load expenses');
      }
    };
    fetchExpenses();
  }, []);

  const handleEdit = (expenseId) => {
    navigate(`/edit-expense/${expenseId}`);
  };

  const handleDelete = async (expenseId) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${expenseId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setExpenses(expenses.filter(expense => expense._id !== expenseId));
    } catch (error) {
      setError('Failed to delete expense');
    }
  };

  return (
    <div className="view-expenses-container">
      <h2 className="view-expenses-heading">View Expenses</h2>
      {error && <p className="error-message">{error}</p>}
      {expenses.length === 0 ? (
        <p>No expenses available.</p>
      ) : (
        expenses.map(expense => (
          <div key={expense._id} className="expense-card">
            <h3>{expense.description}</h3>
            <p>{expense.amount}</p>
            <p className="date">{new Date(expense.date).toLocaleDateString()}</p>
            <div className="expense-actions">
              <button className="btn-edit" onClick={() => handleEdit(expense._id)}>Edit</button>
              <button className="btn-delete" onClick={() => handleDelete(expense._id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewExpenses;
