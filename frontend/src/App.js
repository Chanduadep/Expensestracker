import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import AddExpense from './components/addExpenses/AddExpense';
import ViewExpenses from './components/viewExpenses/ViewExpenses';
import EditExpense from './components/editExpense/EditExpense';
import Navbar from './components/navbar/Navbar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/view-expenses" element={<ViewExpenses />} />
        <Route path="/edit-expense/:id" element={<EditExpense />} />
        <Route path='/navbar' element={<Navbar/>}/>
      </Routes>
    </Router>
    </>
  );
};

export default App;
