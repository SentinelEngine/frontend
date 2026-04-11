import React from 'react';
import './CTASection.css';

const CTASection: React.FC = () => {
  return (
    <section className="cta-section">
      <div className="cta-glow"></div>
      <h2>Stop getting surprised<br /><span>by your bill.</span></h2>
      <p className="cta-sub">Install CloudCost Lens and see costs as you write — not 30 days later.</p>
      <div className="cta-btns">
        <button className="btn-t">Install for VS Code — Free</button>
        <button className="btn-g">View on GitHub →</button>
      </div>
      <div style={{ marginTop: '2rem', fontSize: '12px', color: 'rgba(240,250,246,0.25)' }}>MIT License · Polygon Mumbai · Built at Hackathon 2025</div>
    </section>
  );
};

export default CTASection;
