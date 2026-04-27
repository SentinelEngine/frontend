import { lazy, Suspense, useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import './App.css';

const Features = lazy(() => import('./components/Features'));
const BentoGrid = lazy(() => import('./components/BentoGrid'));
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const Pricing = lazy(() => import('./components/Pricing'));
const CTASection = lazy(() => import('./components/CTASection'));
const Footer = lazy(() => import('./components/Footer'));
const Docs = lazy(() => import('./pages/Docs'));

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #1D9E75, #8247e5)',
        transformOrigin: '0%',
        scaleX: scrollYProgress,
        zIndex: 9999
      }}
    />
  );
};


function App() {
  const [view, setView] = useState('home');

  // Sync scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="app-container">
      <ScrollProgress />
      <Navbar setView={setView} currentView={view} />
      
      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Hero />
            <Suspense fallback={<div style={{ height: '100vh', background: 'var(--bg)' }}></div>}>
              <Features />
              <BentoGrid />
              <HowItWorks />
              <Pricing />
              <CTASection />
              <Footer onDocsClick={() => setView('docs')} />
            </Suspense>
          </motion.div>
        ) : (
          <motion.div
            key="docs"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Suspense fallback={<div style={{ height: '100vh', background: 'var(--bg)' }}></div>}>
              <Docs />
              <Footer onDocsClick={() => setView('docs')} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

