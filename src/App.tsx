import { lazy, Suspense } from 'react';
import { motion, useScroll } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import './App.css';

const Features = lazy(() => import('./components/Features'));
const BentoGrid = lazy(() => import('./components/BentoGrid'));
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const CTASection = lazy(() => import('./components/CTASection'));
const Footer = lazy(() => import('./components/Footer'));

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
  return (
    <div className="app-container">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Suspense fallback={<div style={{ height: '100vh' }}></div>}>
        <Features />
        <BentoGrid />
        <HowItWorks />
        <CTASection />
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
