import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatTicker from './components/StatTicker';
import Features from './components/Features';
import BentoGrid from './components/BentoGrid';
import HowItWorks from './components/HowItWorks';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <StatTicker />
      <Features />
      <BentoGrid />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;
