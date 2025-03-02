import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../editExpense/edit.css';
import { toast } from 'react-toastify';
import Navbar from '../navbar/Navbar';

const EditExpense = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ description: '', amount: '', date: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/expenses/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log(response.data); 
        setFormData(response.data);
      } catch (error) {
        setError('Failed to fetch expense');
      }
    };

    fetchExpense();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updating Expense with Data:", formData);
    try {
      await axios.put(`http://localhost:5000/api/expenses/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      toast.success("expenses updated successfully")
      navigate('/view-expenses');
    } catch (error) {
      setError('Failed to update expense');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="edit-expense-container">
      <h2 className="edit-expense-heading">Edit Expense</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="description" 
          onChange={handleChange} 
          value={formData.description} 
          placeholder="Description" 
        />
        <input 
          type="number" 
          name="amount" 
          onChange={handleChange} 
          value={formData.amount} 
          placeholder="Amount" 
        />
        <input 
          type="date" 
          name="date" 
          onChange={handleChange} 
          value={formData.date} 
        />
        <button type="submit">Update Expense</button>
      </form>
    </div>
    </>
  );
};

export default EditExpense;
