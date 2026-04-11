import React from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="nav">
      <div className="nav-logo">
        <div className="logo-sq"><svg viewBox="0 0 16 16"><path d="M2 8 Q8 2 14 8 Q8 14 2 8Z"/></svg></div>
        CloudCost Lens
      </div>
      <div className="nav-links">
        <a href="#">Docs</a><a href="#">Features</a><a href="#">Pricing</a><a href="#">Changelog</a>
      </div>
      <button className="nav-pill">Install for VS Code</button>
    </nav>
  );
};

export default Navbar;
