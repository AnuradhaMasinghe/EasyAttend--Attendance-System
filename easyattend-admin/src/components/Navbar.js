import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';
import { FaHome, FaUserPlus, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';


function Navbar() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    navigate('/');
  };

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/dashboard">
         
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`${isCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <FaHome className="me-2" /> Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/add-user" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <FaUserPlus className="me-2" /> Add User
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/report" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <FaClipboardList className="me-2" /> Attendance Report
              </NavLink>
            </li>
          </ul>
          <button className="btn btn-outline-light logout-btn" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
