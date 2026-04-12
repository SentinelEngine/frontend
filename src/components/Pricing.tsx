import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import './Pricing.css';

interface SpotlightCardProps {
  children: React.ReactNode;
  isPopular?: boolean;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, isPopular }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`pricing-card ${isPopular ? 'popular' : ''}`}
    >
      <div
        className="spotlight"
        style={{
          opacity,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
      <div className="pricing-card-content">{children}</div>
    </div>
  );
};

const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-100px" });

  const proPriceMin = isYearly ? 640 : 800;
  const proPriceMax = isYearly ? 1600 : 2000;

  const features = [
    { name: "Real-time cost estimation", free: true, pro: true, org: true },
    { name: "Basic monthly projections", free: true, pro: true, org: true },
    { name: "Limited reports", free: true, pro: true, org: true },
    { name: "AI providers supported", free: "1", pro: "Unlimited", org: "Unlimited" },
    { name: "Community support", free: true, pro: true, org: true },
    { name: "Advanced cost breakdowns", free: false, pro: true, org: true },
    { name: "Historical trends", free: false, pro: true, org: true },
    { name: "Smart optimization suggestions", free: false, pro: true, org: true },
    { name: "Custom usage modeling", free: false, pro: true, org: true },
    { name: "Priority support", free: false, pro: true, org: true },
    { name: "All languages supported", free: false, pro: true, org: true },
    { name: "PR-level cost tracking", free: false, pro: false, org: true },
    { name: "Team dashboards", free: false, pro: false, org: true },
    { name: "Budget alerts", free: false, pro: false, org: true },
    { name: "Role-based access control", free: false, pro: false, org: true },
    { name: "Audit logs", free: false, pro: false, org: true },
    { name: "CI/CD integration", free: false, pro: false, org: true },
    { name: "Dedicated support", free: false, pro: false, org: true },
    { name: "SSO", free: false, pro: false, org: true },
  ];

  return (
    <section className="pricing-section" id="pricing" ref={ref}>
      <div className="pricing-header">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Pricing that scales with you
        </motion.h2>
        <motion.p
          className="pricing-desc"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Stop guessing cloud costs. Choose the perfect plan for your workflow.
        </motion.p>

        <motion.div
          className="billing-toggle"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className={!isYearly ? 'active' : ''}>Monthly</span>
          <button className="toggle-btn" onClick={() => setIsYearly(!isYearly)}>
            <div className={`toggle-knob ${isYearly ? 'yearly' : ''}`} />
          </button>
          <span className={isYearly ? 'active' : ''}>Yearly <span className="discount-badge">Save 20%</span></span>
        </motion.div>
      </div>

      <div className="pricing-cards">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SpotlightCard>
            <div className="tier-name">Free</div>
            <div className="tier-price">
              <span className="currency">₹</span>0<span className="period">/month</span>
            </div>
            <p className="tier-desc">Essential cost tracking for independent developers.</p>
            <button className="call-to-action-btn secondary">Install Free</button>
            <ul className="tier-features">
              <li>Real-time cost estimation in VS Code</li>
              <li>Basic monthly projections</li>
              <li>Limited reports</li>
              <li>1 AI provider</li>
              <li>Community support</li>
            </ul>
          </SpotlightCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SpotlightCard isPopular>
            <div className="popular-badge">Most Popular</div>
            <div className="tier-name">Pro</div>
            <div className="tier-price">
              <span className="currency">₹</span>{proPriceMin}-{proPriceMax}<span className="period">/mo per dev</span>
            </div>
            <p className="tier-desc">Advanced insights and optimization for professional teams.</p>
            <button className="call-to-action-btn primary">Start Pro Trial</button>
            <ul className="tier-features">
              <li>Advanced cost breakdowns</li>
              <li>Historical trends</li>
              <li>AI-powered smart optimization suggestions</li>
              <li>Custom usage modeling</li>
              <li>Priority support</li>
              <li>All languages supported</li>
            </ul>
          </SpotlightCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <SpotlightCard>
            <div className="tier-name">Organization</div>
            <div className="tier-price">Custom pricing</div>
            <p className="tier-desc">Enterprise-grade tracking, security, and governance.</p>
            <button className="call-to-action-btn ghost">Contact Sales</button>
            <ul className="tier-features">
              <li>PR-level cost tracking</li>
              <li>Team dashboards</li>
              <li>Budget alerts</li>
              <li>Role-based access control</li>
              <li>Audit logs</li>
              <li>CI/CD integration & SSO</li>
            </ul>
          </SpotlightCard>
        </motion.div>
      </div>

      <motion.div
        className="compare-section"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
      >

        <AnimatePresence>
          {showTable && (
            <motion.div
              className="compare-table-container"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <table className="compare-table">
                <thead>
                  <tr>
                    <th>Features</th>
                    <th>Free</th>
                    <th>Pro</th>
                    <th>Organization</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, i) => (
                    <tr key={i}>
                      <td>{feature.name}</td>
                      <td>
                        {typeof feature.free === 'boolean'
                          ? (feature.free ? <span className="check">✓</span> : <span className="dash">-</span>)
                          : feature.free}
                      </td>
                      <td>
                        {typeof feature.pro === 'boolean'
                          ? (feature.pro ? <span className="check">✓</span> : <span className="dash">-</span>)
                          : feature.pro}
                      </td>
                      <td>
                        {typeof feature.org === 'boolean'
                          ? (feature.org ? <span className="check">✓</span> : <span className="dash">-</span>)
                          : feature.org}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Pricing;
