import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../navbar/navbar.css'


const Navbar = () => {
  
  const navigate = useNavigate();
 
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login');
  };

  return (
    <>
    <nav className='nav'>
      <div className='expense-name'>
        <Link to="/dashboard" className='expense-name' >
          Expense Tracker
        </Link>
        </div>
    <div className='expense-name' >
          {/* <Link to="/view-expenses" className='expense-name' >
                View expenses
              </Link>
              <Link to="/add-expense"  className='expense-name'>
                Add Expenses
              </Link>  */}
              <button onClick={handleLogout}>LogOut</button>  
        
      </div>
    </nav>
    </>
  );
};

export default Navbar;