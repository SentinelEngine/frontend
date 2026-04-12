import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BentoGrid.css';

gsap.registerPlugin(ScrollTrigger);

const BentoGrid: React.FC = () => {
  const regionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (!cards.length) return;

      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        // Simple fade-in for mobile
        gsap.to(headerRef.current, {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          }
        });

        gsap.to(cards, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".bento-grid",
            start: "top 80%",
          }
        });
        return;
      }

      // Initial state: cards off-screen
      gsap.set(cards, {
        x: (i) => {
          const isLeft = [0, 3].includes(i); // C1 and C4 enter from left
          return isLeft ? -500 : 500;
        },
        opacity: 0,
        y: 40,
        scale: 0.95,
      });

      gsap.set(headerRef.current, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: regionRef.current,
          start: "top top",
          end: "+=1200", // Adjusted for better feel
          scrub: 1,
          pin: wrapperRef.current,
          pinSpacing: true, // Let GSAP handle the padding to avoid black gaps
          invalidateOnRefresh: true,
        }
      });

      // 1. Header fade in
      tl.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
      });

      // 2. Cards enter
      tl.to(cards, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        stagger: 0.1,
        duration: 1.2,
        ease: "power3.out",
      }, "-=0.3");

      // 2b. Mini-graph bars animation
      const bars = wrapperRef.current?.querySelectorAll('.bar');
      if (bars) {
        tl.from(bars, {
          scaleY: 0,
          transformOrigin: "bottom",
          stagger: 0.05,
          duration: 0.8,
          ease: "back.out(1.7)",
        }, "-=0.6");
      }

      // 3. HOLD
      tl.to({}, { duration: 2.0 });

      // 4. Cards exit
      tl.to(cards, {
        x: (i) => {
          const isLeft = [0, 3].includes(i);
          return isLeft ? -500 : 500;
        },
        opacity: 0,
        scale: 0.95,
        stagger: 0.05,
        duration: 0.8,
        ease: "power2.in",
      });

      // 5. Header fade out
      tl.to(headerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
      }, "<");

      // Crucial: Refresh on mount
      ScrollTrigger.refresh();

    }, regionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div className="bento-scroll-region" ref={regionRef}>
      <div className="bento-sticky-wrapper" ref={wrapperRef}>
        <section className="bento-section">
          <div ref={headerRef} className="bento-header">
            <div className="bento-label">Full coverage</div>
            <div className="bento-title">Everything your cloud stack touches</div>
          </div>
          
          <div className="bento-grid">
            {/* Card 1: Wide & Tall */}
            <div className="bc wide tall card-hover" ref={el => { cardsRef.current[0] = el; }}>
              <div className="bc-icon bc-t">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 12 L8 4 L13 12 Z" stroke="#1D9E75" strokeWidth="1.5" fill="none" /></svg>
              </div>
              <div className="bc-title">Cache = instant savings</div>
              <div className="bc-desc">Add one line of Redis caching and watch your LLM bill drop 60% in real time. The most powerful demo in the tool.</div>
              <div className="mini-graph">
                {[40, 42, 38, 44, 20, 18, 19, 17].map((h, i) => (
                  <div
                    key={i}
                    className="bar"
                    style={{
                      height: `${h}px`,
                      width: '14px',
                      background: i >= 4 ? 'var(--teal)' : '#E24B4A',
                      opacity: i >= 4 ? 0.8 : 0.7,
                    }}
                  />
                ))}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '6px' }}>Before cache → After cache (60% drop)</div>
            </div>

            {/* Card 2: Live pricing */}
            <div className="bc card-hover" ref={el => { cardsRef.current[1] = el; }}>
              <div className="bc-icon bc-a">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5" stroke="#F59E0B" strokeWidth="1.5" /><path d="M8 5v3l2 2" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </div>
              <div className="bc-title">Live pricing</div>
              <div className="bc-desc">Rates fetched from AWS, OpenAI, Anthropic APIs at startup. Always current.</div>
            </div>

            {/* Card 3: 6 services */}
            <div className="bc card-hover chip-hover-card" ref={el => { cardsRef.current[2] = el; }}>
              <div className="bc-icon bc-b">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="3" y="3" width="10" height="10" rx="2" stroke="#378ADD" strokeWidth="1.5" /><path d="M6 8h4M8 6v4" stroke="#378ADD" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </div>
              <div className="bc-title">6 services</div>
              <div className="bc-desc">GPT-4o, Claude, Lambda, DynamoDB, S3, Redis, API Gateway.</div>
              <div className="svc-chips">
                <span className="svc-chip">OpenAI</span><span className="svc-chip">Anthropic</span><span className="svc-chip">Lambda</span><span className="svc-chip">DynamoDB</span><span className="svc-chip">S3</span><span className="svc-chip">Redis</span>
              </div>
            </div>

            {/* Card 4: Sepolia anchored */}
            <div className="bc card-hover" ref={el => { cardsRef.current[3] = el; }}>
              <div className="bc-icon bc-p">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2 L14 12 L2 12 Z" stroke="#8247e5" strokeWidth="1.5" fill="none" /></svg>
              </div>
              <div className="bc-title">Sepolia anchored</div>
              <div className="bc-desc">SHA-256 hashes stored on-chain. Tamper-evident by design.</div>
            </div>

            {/* Card 5: Zero config */}
            <div className="bc wide card-hover" ref={el => { cardsRef.current[4] = el; }}>
              <div className="bc-icon bc-r">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 8 L7 11 L12 5" stroke="#E24B4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className="bc-title">Zero config. Instant on.</div>
              <div className="bc-desc">Install the extension, open any TypeScript or Python file, and detection starts immediately. No accounts, no API keys, no setup wizard.</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BentoGrid;
