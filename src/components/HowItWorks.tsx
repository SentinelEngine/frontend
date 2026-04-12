import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './HowItWorks.css';

const steps = [
  { id: '01', title: 'You type code', desc: 'Extension watches every keystroke with a 300ms debounce to avoid thrashing.' },
  { id: '02', title: 'Static analysis', desc: 'Regex + AST parser detects cloud service calls, models, and operation types.' },
  { id: '03', title: 'Cost engine', desc: 'Live pricing API maps each detection to a monthly estimate and renders badges.' },
  { id: '04', title: 'On-chain anchor', desc: 'On save, SHA-256 hash of the full report lands on Sepolia. Immutable forever.' }
];

// SVG Curved Path: M 0,26 C 30,40 70,40 100,26
const PATH_DATA = "M 0,26 C 30,40 70,40 100,26";

const HowItWorks: React.FC = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => (prev + 20) % 5000);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  // Animation logic helpers
  const isNodeActive = (index: number) => {
    if (time >= 4400 && time < 5000) return true; // Final glow state
    const activationTimes = [0, 1200, 2400, 3600];
    return time >= activationTimes[index];
  };

  const isDotAnimating = (index: number) => {
    const startTimes = [800, 2000, 3200];
    const duration = 600;
    return time >= startTimes[index] && time < (startTimes[index] + duration);
  };

  const isLastGlow = time >= 4400 && time < 5000;

  return (
    <section className="how-section">
      <div className="section-label">Pipeline</div>
      <h2 className="section-heading">From keystroke to blockchain in 4 steps</h2>

      <div className="pipeline-wrapper">
        {steps.map((step, i) => (
          <React.Fragment key={step.id}>
            {/* NODE */}
            <div className="pipeline-node-container">
              <div 
                className={`node-circle ${isNodeActive(i) ? 'active' : ''} ${isLastGlow ? 'final-glow' : ''}`}
                style={isLastGlow ? { boxShadow: '0 0 30px #1D9E75, 0 0 60px rgba(29, 158, 117, 0.4)' } : {}}
              >
                {step.id}
              </div>
              <div className="node-title">{step.title}</div>
              <div className="node-desc">{step.desc}</div>
            </div>

            {/* PATH (only between nodes) */}
            {i < steps.length - 1 && (
              <div className="pipeline-path-container">
                <svg className="path-svg" viewBox="0 0 100 52" preserveAspectRatio="none">
                  <path d={PATH_DATA} className="path-base" />
                  <path 
                    d={PATH_DATA} 
                    className={`path-glow ${isDotAnimating(i) ? 'animating' : ''}`} 
                  />
                </svg>
                
                {/* TRAVELING DOT */}
                <div 
                  className={`traveling-dot ${isDotAnimating(i) ? 'animating' : ''}`}
                  style={{ 
                    offsetPath: `path("${PATH_DATA}")`,
                    /* We don't set offset-distance here because it's handled by CSS animation */
                  }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Decorative center glow based on last step */}
      <motion.div 
        className="pipeline-glow" 
        animate={{ 
          opacity: isLastGlow ? 0.3 : 0.07,
          scale: isLastGlow ? 1.5 : 1
        }}
        transition={{ duration: 0.4 }}
      />
    </section>
  );
};

export default HowItWorks;
