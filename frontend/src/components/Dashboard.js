import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
    <h2 className="dashboard-heading">Dashboard</h2>
    <button className="dashboard-button" onClick={() => navigate('/add-expense')}>
      Add Expense
    </button>
    <button className="dashboard-button" onClick={() => navigate('/view-expenses')}>
      View Expenses
    </button>
  </div>
  );
};

export default Dashboard;
