import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div className="logo-sq" style={{ width: '20px', height: '20px' }}>
          <svg viewBox="0 0 16 16" style={{ width: '10px', height: '10px', fill: '#fff' }}>
            <path d="M2 8 Q8 2 14 8 Q8 14 2 8Z" />
          </svg>
        </div>
        <span>CloudCost Lens</span>
      </div>
      <div className="footer-links">
        <span>Privacy</span><span>Terms</span><span>Docs</span><span>GitHub</span>
      </div>
    </footer>
  );
};

export default Footer;
