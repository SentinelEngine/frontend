import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './Navbar.css';

type PathProps = React.ComponentProps<typeof motion.path>;

const Path = (props: PathProps) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="var(--text)"
    strokeLinecap="round"
    {...props}
  />
);

const Hamburger = ({ isOpen, toggle }: { isOpen: boolean, toggle: () => void }) => (
  <button onClick={toggle} className="hamburger">
    <svg width="24" height="24" viewBox="0 0 24 24">
      <Path
        animate={isOpen ? "open" : "closed"}
        initial={false}
        variants={{ closed: { d: "M 2 6 L 22 6" }, open: { d: "M 4 20 L 20 4" } }}
        transition={{ duration: 0.3 }}
      />
      <Path
        d="M 2 12 L 22 12"
        animate={isOpen ? "open" : "closed"}
        initial={false}
        variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
        transition={{ duration: 0.1 }}
      />
      <Path
        animate={isOpen ? "open" : "closed"}
        initial={false}
        variants={{ closed: { d: "M 2 18 L 22 18" }, open: { d: "M 4 4 L 20 20" } }}
        transition={{ duration: 0.3 }}
      />
    </svg>
  </button>
);

const Navbar: React.FC<{ setView: (v: string) => void, currentView: string }> = ({ setView, currentView }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (v: string) => {
    setView(v);
    setIsOpen(false);
  };

  return (
    <>
      <div className={`nav-backdrop ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)}></div>
      <motion.nav
        className={`nav ${scrolled ? 'nav-scrolled' : ''}`}
        initial={{ y: shouldReduceMotion ? 0 : -20, opacity: shouldReduceMotion ? 1 : 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="nav-logo" style={{ zIndex: 101, cursor: 'pointer' }} onClick={() => handleNav('home')}>
          <div className="logo-sq">
            <img src="/logo.svg" alt="CloudGauge" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          CloudGauge
        </div>
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <a
            href="javascript:void(0)"
            className={currentView === 'docs' ? 'active' : ''}
            onClick={() => handleNav('docs')}
          >
            Docs
          </a>
          {currentView === 'home' ? (
            <>
              <a href="#features" onClick={() => setIsOpen(false)}>Features</a>
              <a href="#pricing" onClick={() => setIsOpen(false)}>Pricing</a>
            </>
          ) : (
            <a href="javascript:void(0)" onClick={() => handleNav('home')}>Home</a>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', zIndex: 101 }}>
          <a href="https://marketplace.visualstudio.com/items?itemName=cloudcostguard.cloud-cost-guard" target="_blank" rel="noopener noreferrer" className="nav-pill">
            <span className="pill-dot"></span>
            Install for VS Code
          </a>
          <Hamburger isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
        </div>
      </motion.nav>
    </>
  );
};


export default Navbar;
