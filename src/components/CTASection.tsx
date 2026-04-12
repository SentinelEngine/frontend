import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import confetti from 'canvas-confetti';
import './CTASection.css';

const CTASection: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  const text = "Stop getting surprised";
  const words = text.split(' ');

  const handleConfetti = () => {
    confetti({ particleCount: 350, spread: 100, colors: ['#1D9E75', '#0F6E56', '#9FE1CB'] });
  };

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: { opacity: 1, transition: { staggerChildren: shouldReduceMotion ? 0 : 0.06 } }
  };

  const wordVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: shouldReduceMotion ? 0 : undefined } }
  };

  return (
    <section className="cta-section" ref={ref}>
      <div className="cta-glow"></div>
      <motion.h2 variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
        {words.map((word, i) => (
          <motion.span key={i} variants={wordVariants} style={{ display: 'inline-block', marginRight: '10px', willChange: 'transform, opacity' }}>
            {word}
          </motion.span>
        ))}
        <br />
        <motion.span
          className="sweep-text"
          initial={{ backgroundPosition: shouldReduceMotion ? '0 0' : '100% 0' }}
          animate={inView ? { backgroundPosition: '0 0' } : {}}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.4 }}
          style={{ willChange: 'background-position' }}
        >
          by your bill.
        </motion.span>
      </motion.h2>
      <motion.p
        className="cta-sub"
        initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.6 }}
        style={{ willChange: 'transform, opacity' }}
      >
        Install CloudGauge and see costs as you write — not 30 days later.
      </motion.p>
      <motion.div
        className="cta-btns"
        initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.8 }}
        style={{ willChange: 'transform, opacity' }}
      >
        <button className="btn-t cta-btn-anim" onClick={handleConfetti}>Install for VS Code — Free</button>
        <button className="btn-g cta-btn-anim">View on GitHub <span className="arrow">→</span></button>
      </motion.div>
      <motion.div
        style={{ marginTop: '2rem', fontSize: '12px', color: 'rgba(240,250,246,0.25)', willChange: 'opacity' }}
        initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: shouldReduceMotion ? 0 : 1 }}
      >
        MIT License · Sepolia · Built at Hackathon 2026
      </motion.div>
    </section>
  );
};

export default CTASection;
