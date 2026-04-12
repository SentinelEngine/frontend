import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './HowItWorks.css';

const StepNumber = ({ finalValue, inView }: { finalValue: number, inView: boolean }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (inView) {
      if (shouldReduceMotion) {
        const frameId = requestAnimationFrame(() => setDisplayValue(finalValue));
        return () => cancelAnimationFrame(frameId);
      }
      const duration = 1000;
      const startTime = performance.now();
      let canceled = false;
      const animateCount = (currentTime: number) => {
        if (canceled) return;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.floor(finalValue * easeOut));
        if (progress < 1) requestAnimationFrame(animateCount);
      };
      const timeoutId = setTimeout(() => requestAnimationFrame(animateCount), 200);
      return () => { canceled = true; clearTimeout(timeoutId); };
    }
  }, [inView, finalValue, shouldReduceMotion]);

  return <span className="step-n">{displayValue.toString().padStart(2, '0')}</span>;
};

const HowItWorks: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0 : 0.5 } }
  };

  return (
    <section className="how-section">
      <motion.div
        className="section-center"
        initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
        style={{ willChange: 'transform, opacity' }}
      >
        <div style={{ fontSize: '11px', color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '.6rem' }}>How it works</div>
        <div style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '700', letterSpacing: '-1px' }}>From keystroke to blockchain in 4 steps</div>
      </motion.div>

      <div style={{ position: 'relative', maxWidth: '960px', margin: '0 auto' }} ref={ref}>
        <motion.svg
          style={{ position: 'absolute', top: '50%', left: '0', width: '100%', height: '2px', zIndex: 0, pointerEvents: 'none', transform: 'translateY(-50%)', display: shouldReduceMotion ? 'none' : 'block' }}
          preserveAspectRatio="none"
        >
          <motion.line
            x1="0" y1="1" x2="100%" y2="1"
            stroke="rgba(29,158,117,0.2)"
            strokeWidth="2"
            strokeDasharray="1000"
            initial={{ strokeDashoffset: 1000 }}
            animate={inView ? { strokeDashoffset: 0 } : {}}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </motion.svg>

        <motion.div className="how-steps" variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'} style={{ position: 'relative', zIndex: 1, background: 'transparent' }}>
          <motion.div className="how-step step-hover" variants={itemVariants} style={{ willChange: 'transform, opacity' }}>
            <StepNumber finalValue={1} inView={inView} />
            <div className="step-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="4" width="12" height="8" rx="1" stroke="#1D9E75" strokeWidth="1.5" /><path d="M5 7h6M5 9.5h4" stroke="#1D9E75" strokeWidth="1" strokeLinecap="round" /></svg>
            </div>
            <div className="step-title">You type code</div>
            <div className="step-desc">Extension watches every keystroke with a 300ms debounce to avoid thrashing.</div>
          </motion.div>
          <motion.div className="how-step step-hover" variants={itemVariants} style={{ willChange: 'transform, opacity' }}>
            <StepNumber finalValue={2} inView={inView} />
            <div className="step-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5" stroke="#1D9E75" strokeWidth="1.5" /><path d="M8 5v3l2 2" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </div>
            <div className="step-title">Static analysis</div>
            <div className="step-desc">Regex + AST parser detects cloud service calls, models, and operation types.</div>
          </motion.div>
          <motion.div className="how-step step-hover" variants={itemVariants} style={{ willChange: 'transform, opacity' }}>
            <StepNumber finalValue={3} inView={inView} />
            <div className="step-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 13 L8 3 L13 13" stroke="#1D9E75" strokeWidth="1.5" fill="none" /><path d="M5 10h6" stroke="#1D9E75" strokeWidth="1" strokeLinecap="round" /></svg>
            </div>
            <div className="step-title">Cost engine</div>
            <div className="step-desc">Live pricing API maps each detection to a monthly estimate and renders badges.</div>
          </motion.div>
          <motion.div className="how-step step-hover" variants={itemVariants} style={{ willChange: 'transform, opacity' }}>
            <StepNumber finalValue={4} inView={inView} />
            <div className="step-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="3" y="6" width="10" height="7" rx="1" stroke="#1D9E75" strokeWidth="1.5" /><path d="M5 6V5a3 3 0 016 0v1" stroke="#1D9E75" strokeWidth="1.5" /></svg>
            </div>
            <div className="step-title">On-chain anchor</div>
            <div className="step-desc">On save, SHA-256 hash of the full report lands on Sepolia. Immutable forever.</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
