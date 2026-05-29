import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1>SuperHéroes SPA</h1>
      </Link>
      <div className="nav-links">
        <NavLink to="/" end>Todas</NavLink>
        <NavLink to="/marvel" className="nav-marvel">Marvel</NavLink>
        <NavLink to="/dc" className="nav-dc">DC</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
