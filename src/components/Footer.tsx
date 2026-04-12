import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Footer.css';

const Footer: React.FC = () => {
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
        <div className="logo-sq" style={{ width: '20px', height: '20px' }}>
          <svg viewBox="0 0 16 16" style={{ width: '10px', height: '10px', fill: '#fff' }}>
            <path d="M2 8 Q8 2 14 8 Q8 14 2 8Z" />
          </svg>
        </div>
        <span>CloudGauge</span>
      </div>
      <div className="footer-links">
        {['Privacy', 'Terms', 'Docs', 'GitHub'].map((link, i) => (
          <motion.span key={i} variants={itemVariants} style={{ willChange: 'transform, opacity' }}>{link}</motion.span>
        ))}
      </div>
    </motion.footer>
  );
};

export default Footer;
