import React from 'react';
import './HowItWorks.css';

const HowItWorks: React.FC = () => {
  return (
    <section className="how-section">
      <div className="section-center">
        <div style={{ fontSize: '11px', color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '.6rem' }}>How it works</div>
        <div style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '700', letterSpacing: '-1px' }}>From keystroke to blockchain in 4 steps</div>
      </div>
      <div className="how-steps">
        <div className="how-step">
          <div className="step-n">01</div>
          <div className="step-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="4" width="12" height="8" rx="1" stroke="#1D9E75" strokeWidth="1.5"/><path d="M5 7h6M5 9.5h4" stroke="#1D9E75" strokeWidth="1" strokeLinecap="round"/></svg>
          </div>
          <div className="step-title">You type code</div>
          <div className="step-desc">Extension watches every keystroke with a 300ms debounce to avoid thrashing.</div>
        </div>
        <div className="how-step">
          <div className="step-n">02</div>
          <div className="step-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5" stroke="#1D9E75" strokeWidth="1.5"/><path d="M8 5v3l2 2" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <div className="step-title">Static analysis</div>
          <div className="step-desc">Regex + AST parser detects cloud service calls, models, and operation types.</div>
        </div>
        <div className="how-step">
          <div className="step-n">03</div>
          <div className="step-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 13 L8 3 L13 13" stroke="#1D9E75" strokeWidth="1.5" fill="none"/><path d="M5 10h6" stroke="#1D9E75" strokeWidth="1" strokeLinecap="round"/></svg>
          </div>
          <div className="step-title">Cost engine</div>
          <div className="step-desc">Live pricing API maps each detection to a monthly estimate and renders badges.</div>
        </div>
        <div className="how-step">
          <div className="step-n">04</div>
          <div className="step-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="3" y="6" width="10" height="7" rx="1" stroke="#1D9E75" strokeWidth="1.5"/><path d="M5 6V5a3 3 0 016 0v1" stroke="#1D9E75" strokeWidth="1.5"/></svg>
          </div>
          <div className="step-title">On-chain anchor</div>
          <div className="step-desc">On save, SHA-256 hash of the full report lands on Polygon. Immutable forever.</div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
