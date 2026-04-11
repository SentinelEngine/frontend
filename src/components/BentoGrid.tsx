import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './BentoGrid.css';

const BentoGrid: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  const gridVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } }
  };

  const cardVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0 : 0.4 } }
  };

  return (
    <section className="bento-section">
      <motion.div
        initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="bento-label">Full coverage</div>
        <div className="bento-title">Everything your cloud stack touches</div>
      </motion.div>
      <motion.div className="bento-grid" ref={ref} variants={gridVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
        <motion.div className="bc wide tall card-hover" variants={cardVariants} style={{ willChange: 'transform, opacity' }}>
          <div className="bc-icon bc-t">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 12 L8 4 L13 12 Z" stroke="#1D9E75" strokeWidth="1.5" fill="none" /></svg>
          </div>
          <div className="bc-title">Cache = instant savings</div>
          <div className="bc-desc">Add one line of Redis caching and watch your LLM bill drop 60% in real time. The most powerful demo in the tool.</div>
          <div className="mini-graph" id="mg">
            {[40, 42, 38, 44, 20, 18, 19, 17].map((h, i) => (
              <motion.div
                key={i}
                className="bar"
                initial={{ height: shouldReduceMotion ? h : 0 }}
                animate={inView ? { height: h } : {}}
                transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: shouldReduceMotion ? 0 : 0.5 + i * 0.05, ease: "backOut" }}
                style={{
                  width: '14px',
                  background: i >= 4 ? 'var(--teal)' : '#E24B4A',
                  opacity: i >= 4 ? 0.8 : 0.7,
                  willChange: 'height'
                }}
              />
            ))}
          </div>
          <div style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '6px' }}>Before cache → After cache (60% drop)</div>
        </motion.div>

        <motion.div className="bc card-hover" variants={cardVariants} style={{ willChange: 'transform, opacity' }}>
          <div className="bc-icon bc-a">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5" stroke="#F59E0B" strokeWidth="1.5" /><path d="M8 5v3l2 2" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </div>
          <div className="bc-title">Live pricing</div>
          <div className="bc-desc">Rates fetched from AWS, OpenAI, Anthropic APIs at startup. Always current.</div>
        </motion.div>

        <motion.div className="bc card-hover chip-hover-card" variants={cardVariants} style={{ willChange: 'transform, opacity' }}>
          <div className="bc-icon bc-b">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="3" y="3" width="10" height="10" rx="2" stroke="#378ADD" strokeWidth="1.5" /><path d="M6 8h4M8 6v4" stroke="#378ADD" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </div>
          <div className="bc-title">6 services</div>
          <div className="bc-desc">GPT-4o, Claude, Lambda, DynamoDB, S3, Redis, API Gateway.</div>
          <div className="svc-chips">
            <span className="svc-chip">OpenAI</span><span className="svc-chip">Anthropic</span><span className="svc-chip">Lambda</span><span className="svc-chip">DynamoDB</span><span className="svc-chip">S3</span><span className="svc-chip">Redis</span>
          </div>
        </motion.div>

        <motion.div className="bc card-hover" variants={cardVariants} style={{ willChange: 'transform, opacity' }}>
          <div className="bc-icon bc-p">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2 L14 12 L2 12 Z" stroke="#8247e5" strokeWidth="1.5" fill="none" /></svg>
          </div>
          <div className="bc-title">Sepolia anchored</div>
          <div className="bc-desc">SHA-256 hashes stored on-chain. Tamper-evident by design.</div>
        </motion.div>

        <motion.div className="bc wide card-hover" variants={cardVariants} style={{ willChange: 'transform, opacity' }}>
          <div className="bc-icon bc-r">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 8 L7 11 L12 5" stroke="#E24B4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div className="bc-title">Zero config. Instant on.</div>
          <div className="bc-desc">Install the extension, open any TypeScript or Python file, and detection starts immediately. No accounts, no API keys, no setup wizard.</div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BentoGrid;
