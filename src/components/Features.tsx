import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Features.css';

const CountUpValue = ({ finalValue, prefix, suffix, inView, delay = 0, isGreen = false }: { finalValue: number, prefix: string, suffix: string, inView: boolean, delay?: number, isGreen?: boolean }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [flash, setFlash] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (inView) {
      if (shouldReduceMotion) {
        setDisplayValue(finalValue);
        return;
      }
      const duration = 1200;
      const startTime = performance.now() + delay * 1000;
      let canceled = false;

      const animateCount = (currentTime: number) => {
        if (canceled) return;
        if (currentTime < startTime) {
          requestAnimationFrame(animateCount);
          return;
        }
        const elapsed = currentTime - startTime;
        let progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(finalValue * easeOut);

        setDisplayValue(currentVal);

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else if (isGreen) {
          setFlash(true);
          setTimeout(() => setFlash(false), 300);
        }
      };
      const timeoutId = setTimeout(() => requestAnimationFrame(animateCount), delay * 1000);
      return () => { canceled = true; clearTimeout(timeoutId); }
    }
  }, [inView, finalValue, delay, isGreen, shouldReduceMotion]);

  return <span style={flash ? { textShadow: '0 0 8px var(--teal-bright)', color: '#fff' } : { transition: 'all 0.3s' }}>{prefix}{displayValue}{suffix}</span>;
}

const FeatureRow01 = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="feat-row" ref={ref}>
      <motion.div className="feat-copy" initial={{ x: shouldReduceMotion ? 0 : -30, opacity: shouldReduceMotion ? 1 : 0 }} animate={inView ? { x: 0, opacity: 1 } : {}} transition={{ duration: shouldReduceMotion ? 0 : 0.6 }} style={{ willChange: 'transform, opacity' }}>
        <div className="feat-num">01 — Real-time detection</div>
        <h2 className="feat-h">Costs appear<br /><span>as you write</span></h2>
        <p className="feat-p">Every cloud API call is detected with 300ms debounce. Cost badges appear inline in the gutter, in CodeLens above each function, and in the status bar — all simultaneously. No config, no setup.</p>
        <div className="feat-link">Learn about detection coverage →</div>
      </motion.div>
      <motion.div className="feat-visual" initial={{ x: shouldReduceMotion ? 0 : 30, opacity: shouldReduceMotion ? 1 : 0 }} animate={inView ? { x: 0, opacity: 1 } : {}} transition={{ duration: shouldReduceMotion ? 0 : 0.6 }} style={{ willChange: 'transform, opacity' }}>
        <div className="ann-wrap hover-target">
          <div className="ann-bar">analyzer.ts — CloudCost Lens active</div>
          <div className="ann-line"><span className="ann-ln">12</span><span className="ann-code"><span style={{ color: 'var(--teal-bright)' }}>openai</span>.chat.completions.<span style={{ color: '#8bb8f0' }}>create</span>({'{'}</span>
            <motion.span className="ann-badge cb-hi" initial={{ x: shouldReduceMotion ? 0 : 15, opacity: shouldReduceMotion ? 1 : 0 }} animate={inView ? { x: 0, opacity: 1 } : {}} transition={{ delay: shouldReduceMotion ? 0 : 0.2, duration: shouldReduceMotion ? 0 : 0.4 }} style={{ willChange: 'transform, opacity' }}>GPT-4o · ~$240/mo</motion.span>
          </div>
          <div className="ann-line"><span className="ann-ln">13</span><span className="ann-code">&nbsp;&nbsp;model: <span style={{ color: '#f0c070' }}>"gpt-4o"</span>,</span></div>
          <div className="ann-line"><span className="ann-ln">17</span><span className="ann-code"><span style={{ color: 'var(--teal-bright)' }}>redis</span>.<span style={{ color: '#8bb8f0' }}>get</span>(cacheKey)</span>
            <motion.span className="ann-badge cb-lo" initial={{ x: shouldReduceMotion ? 0 : 15, opacity: shouldReduceMotion ? 1 : 0 }} animate={inView ? { x: 0, opacity: 1 } : {}} transition={{ delay: shouldReduceMotion ? 0 : 0.4, duration: shouldReduceMotion ? 0 : 0.4 }} style={{ willChange: 'transform, opacity' }}>Redis · ~$2/mo</motion.span>
          </div>
          <div className="ann-line"><span className="ann-ln">23</span><span className="ann-code"><span style={{ color: 'var(--teal-bright)' }}>dynamodb</span>.<span style={{ color: '#8bb8f0' }}>putItem</span>(params)</span>
            <motion.span className="ann-badge cb-md" initial={{ x: shouldReduceMotion ? 0 : 15, opacity: shouldReduceMotion ? 1 : 0 }} animate={inView ? { x: 0, opacity: 1 } : {}} transition={{ delay: shouldReduceMotion ? 0 : 0.6, duration: shouldReduceMotion ? 0 : 0.4 }} style={{ willChange: 'transform, opacity' }}>DynamoDB · ~$18/mo</motion.span>
          </div>
          <div className="ann-line"><span className="ann-ln">29</span><span className="ann-code"><span style={{ color: 'var(--teal-bright)' }}>s3</span>.<span style={{ color: '#8bb8f0' }}>putObject</span>({'{'} Bucket: <span style={{ color: '#f0c070' }}>"logs"</span> {'}'})</span>
            <motion.span className="ann-badge cb-md" initial={{ x: shouldReduceMotion ? 0 : 15, opacity: shouldReduceMotion ? 1 : 0 }} animate={inView ? { x: 0, opacity: 1 } : {}} transition={{ delay: shouldReduceMotion ? 0 : 0.8, duration: shouldReduceMotion ? 0 : 0.4 }} style={{ willChange: 'transform, opacity' }}>S3 · ~$12/mo</motion.span>
          </div>
          <div style={{ margin: '8px 14px', padding: '8px 12px', background: 'rgba(29,158,117,0.07)', borderRadius: '6px', border: '0.5px solid rgba(29,158,117,0.2)' }}>
            <div style={{ fontSize: '10px', color: 'var(--muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '.5px' }}>CodeLens · handleChat()</div>
            <div style={{ fontSize: '12px', color: 'var(--teal-bright)' }}>Cloud cost: ~$272/mo | See breakdown</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const FeatureRow02 = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="feat-row flip" ref={ref}>
      <motion.div className="feat-copy" initial={{ x: shouldReduceMotion ? 0 : 30, opacity: shouldReduceMotion ? 1 : 0 }} animate={inView ? { x: 0, opacity: 1 } : {}} transition={{ duration: shouldReduceMotion ? 0 : 0.6 }} style={{ willChange: 'transform, opacity' }}>
        <div className="feat-num">02 — Blockchain audit</div>
        <h2 className="feat-h">Every save.<br /><span>Anchored forever.</span></h2>
        <p className="feat-p">On every file save, a canonical cost report is SHA-256 hashed and stored on sepholia Mumbai. Any future tampering with cost figures is immediately detectable — cryptographic proof for any auditor.</p>
        <div className="feat-link">View audit contract on Sepolia →</div>
      </motion.div>
      <motion.div className="feat-visual" initial={{ x: shouldReduceMotion ? 0 : -30, opacity: shouldReduceMotion ? 1 : 0 }} animate={inView ? { x: 0, opacity: 1 } : {}} transition={{ duration: shouldReduceMotion ? 0 : 0.6 }} style={{ willChange: 'transform, opacity' }}>
        <div className="chain-vis">
          <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '.5px' }}>Audit records — Sepolia</div>

          <motion.div className="chain-block hover-target" initial={{ y: shouldReduceMotion ? 0 : 15, opacity: shouldReduceMotion ? 1 : 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ delay: shouldReduceMotion ? 0 : 0.25, duration: shouldReduceMotion ? 0 : 0.4 }} style={{ willChange: 'transform, opacity' }}>
            <div className="chain-id">Report · api/handler.ts · saved 2 min ago</div>
            <div className="chain-hash chain-glow">0x3f7a9c2d8e1b4f5c6a7d0e2f9b3c8a1d4e7f2b5c8a3d6e9f1b4c7a0d3e6f9b2</div>
            <div className="chain-row">
              <span className="chain-tag chain-ok">✓ Authentic — matches on-chain</span>
              <span className="chain-ts">block #38,241,907</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
              <div className="poly-dot"></div>
              <span style={{ fontSize: '10px', color: 'var(--muted)' }}>sepholia Mumbai · TxHash: 0x9c2a...f71e</span>
            </div>
          </motion.div>

          <motion.div className="chain-block hover-target" initial={{ y: shouldReduceMotion ? 0 : 15, opacity: shouldReduceMotion ? 1 : 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ delay: shouldReduceMotion ? 0 : 0.5, duration: shouldReduceMotion ? 0 : 0.4 }} style={{ willChange: 'transform, opacity' }}>
            <div className="chain-id">Report · api/handler.ts · edited locally</div>
            <div className="chain-hash" style={{ color: '#f09595' }}>0xa1d3f2c8e4b7a0d5f2c9e1b4a7d0f3c6e9b2a5d8f1c4e7b0a3d6f9c2e5b8a1d4</div>
            <div className="chain-row">
              <motion.span
                className="chain-tag chain-fail"
                animate={inView && !shouldReduceMotion ? { opacity: [1, 0.3, 1, 0.3, 1, 0.3, 1] } : {}}
                transition={{ delay: 0.7, duration: 1.2, times: [0, 0.16, 0.33, 0.5, 0.66, 0.83, 1] }}
                style={{ opacity: 1, willChange: 'opacity' }}
              >
                ✗ Tampered — hash mismatch
              </motion.span>
              <span className="chain-ts">divergence detected</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const FeatureRow03 = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="feat-row" ref={ref}>
      <motion.div className="feat-copy" initial={{ x: shouldReduceMotion ? 0 : -30, opacity: shouldReduceMotion ? 1 : 0 }} animate={inView ? { x: 0, opacity: 1 } : {}} transition={{ duration: shouldReduceMotion ? 0 : 0.6 }} style={{ willChange: 'transform, opacity' }}>
        <div className="feat-num">03 — PR cost diffs</div>
        <h2 className="feat-h">Every PR gets<br /><span>a cost impact score</span></h2>
        <p className="feat-p">When you open a pull request, CloudCost Lens computes the cost delta between base and head branch. The diff is hashed and anchored on-chain — so the cost impact of every merge is immutably recorded.</p>
        <div className="feat-link">See PR integration docs →</div>
      </motion.div>
      <motion.div className="feat-visual" initial={{ x: shouldReduceMotion ? 0 : 30, opacity: shouldReduceMotion ? 1 : 0 }} animate={inView ? { x: 0, opacity: 1 } : {}} transition={{ duration: shouldReduceMotion ? 0 : 0.6 }} style={{ willChange: 'transform, opacity' }}>
        <div className="pr-card hover-target">
          <div className="pr-head">
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3fb950', display: 'inline-block' }}></span>
            <span className="pr-num">PR #247</span>
            <span className="pr-title">feat: add AI-powered search endpoint</span>
          </div>
          <div className="pr-rows">
            <motion.div className="pr-row" initial={{ y: shouldReduceMotion ? 0 : 8, opacity: shouldReduceMotion ? 1 : 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ delay: shouldReduceMotion ? 0 : 0.1 }} style={{ willChange: 'transform, opacity' }}>
              <span className="pr-svc">OpenAI GPT-4o (new)</span>
              <span className="pr-plus"><CountUpValue inView={inView} delay={shouldReduceMotion ? 0 : 0.1} finalValue={240} prefix="+$" suffix="/mo" /></span>
            </motion.div>
            <motion.div className="pr-row" initial={{ y: shouldReduceMotion ? 0 : 8, opacity: shouldReduceMotion ? 1 : 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ delay: shouldReduceMotion ? 0 : 0.2 }} style={{ willChange: 'transform, opacity' }}>
              <span className="pr-svc">Redis cache layer</span>
              <span className="pr-minus"><CountUpValue inView={inView} delay={shouldReduceMotion ? 0 : 0.2} finalValue={144} prefix="-$" suffix="/mo" isGreen={true} /></span>
            </motion.div>
            <motion.div className="pr-row" initial={{ y: shouldReduceMotion ? 0 : 8, opacity: shouldReduceMotion ? 1 : 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ delay: shouldReduceMotion ? 0 : 0.3 }} style={{ willChange: 'transform, opacity' }}>
              <span className="pr-svc">DynamoDB logging</span>
              <span className="pr-plus"><CountUpValue inView={inView} delay={shouldReduceMotion ? 0 : 0.3} finalValue={18} prefix="+$" suffix="/mo" /></span>
            </motion.div>
            <motion.div className="pr-row" initial={{ y: shouldReduceMotion ? 0 : 8, opacity: shouldReduceMotion ? 1 : 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ delay: shouldReduceMotion ? 0 : 0.4 }} style={{ willChange: 'transform, opacity' }}>
              <span className="pr-svc">Lambda invocations</span>
              <span className="pr-plus"><CountUpValue inView={inView} delay={shouldReduceMotion ? 0 : 0.4} finalValue={8} prefix="+$" suffix="/mo" /></span>
            </motion.div>
          </div>
          <div className="pr-total">
            <span className="pr-total-label">Net monthly impact</span>
            <span className="pr-total-val"><CountUpValue inView={inView} delay={shouldReduceMotion ? 0 : 0.5} finalValue={122} prefix="+$" suffix="/mo" /></span>
          </div>
          <div className="pr-anchor">
            <div className="poly-dot"></div>
            Cost diff anchored on Sepolia · 0x7b4f...c29a · block #38,241,923
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Features: React.FC = () => {
  return (
    <section>
      <FeatureRow01 />
      <FeatureRow02 />
      <FeatureRow03 />
    </section>
  );
};

export default Features;
