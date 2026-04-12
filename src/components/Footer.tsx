import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Footer.css';

const Footer: React.FC<{ onDocsClick?: () => void }> = ({ onDocsClick }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.4, staggerChildren: shouldReduceMotion ? 0 : 0.05, delayChildren: shouldReduceMotion ? 0 : 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer
      className="footer"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={{ willChange: 'transform, opacity' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="footer-logo-hover">
        <div className="logo-sq" style={{ width: '24px', height: '24px', background: 'var(--teal)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0' }}>
          <img src="/logo.svg" alt="CloudGauge" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <span>CloudGauge</span>
      </div>
      <div className="footer-links">
        <motion.span variants={itemVariants} style={{ willChange: 'transform, opacity' }}>Privacy</motion.span>
        <motion.a 
          href="javascript:void(0)"
          onClick={onDocsClick}
          variants={itemVariants} 
          style={{ willChange: 'transform, opacity', color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}
        >
          Docs
        </motion.a>
        <motion.a
          href="https://github.com/SentinelEngine"
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariants}
          style={{ willChange: 'transform, opacity', color: 'inherit', textDecoration: 'none' }}
        >
          GitHub
        </motion.a>
      </div>
    </motion.footer >
  );
};

export default Footer;
