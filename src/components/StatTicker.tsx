import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './StatTicker.css';

const TickerItem = ({ finalValue, suffix, label, delay = 0 }: { finalValue: number, suffix: string, label: string, delay?: number }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      if (shouldReduceMotion) {
        setDisplayValue(finalValue);
        return;
      }
      const duration = 1800; // 1.8s
      const startTime = performance.now();
      let canceled = false;
      
      const animateCount = (currentTime: number) => {
        if (canceled) return;
        const elapsed = currentTime - startTime;
        let progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(finalValue * easeOut);
        
        setDisplayValue(currentVal);
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      
      const timeoutId = setTimeout(() => requestAnimationFrame(animateCount), delay * 1000);
      return () => { canceled = true; clearTimeout(timeoutId); };
    }
  }, [inView, finalValue, delay, shouldReduceMotion]);

  return (
    <motion.div 
      className="tick-item"
      ref={ref}
      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : delay }}
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="tick-num">{displayValue}{suffix}</div>
      <div className="tick-label">{label}</div>
    </motion.div>
  );
};

const StatTicker: React.FC = () => {
  return (
    <div className="ticker">
      <TickerItem finalValue={80} suffix="%" label="Bill shock rate" delay={0} />
      <TickerItem finalValue={30} suffix="d" label="Average feedback lag" delay={0.15} />
      <TickerItem finalValue={32} suffix="%" label="Cloud spend wasted" delay={0.3} />
    </div>
  );
};

export default StatTicker;
