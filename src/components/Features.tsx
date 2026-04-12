import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Features.css';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    num: '01 — Real-time detection',
    title: 'Costs appear',
    titleSpan: 'as you write',
    desc: 'Every cloud API call is detected with 300ms debounce. Cost badges appear inline in the gutter, in CodeLens above each function, and in the status bar — all simultaneously. No config, no setup.',
    link: 'Learn about detection coverage →',
    accent: '#1D9E75', // Brand Teal
    visual: (
      <div className="fc-visual-code">
        <div className="fc-ann-bar">analyzer.ts — CloudGauge active</div>
        <div className="fc-ann-line">
          <span className="fc-ln">12</span>
          <span className="fc-code"><span style={{ color: '#1D9E75' }}>openai</span>.chat.completions.<span style={{ color: '#8bb8f0' }}>create</span>({'{'}</span>
          <span className="fc-badge cb-hi">GPT-4o · ~$240/mo</span>
        </div>
        <div className="fc-ann-line">
          <span className="fc-ln">17</span>
          <span className="fc-code"><span style={{ color: '#1D9E75' }}>redis</span>.<span style={{ color: '#8bb8f0' }}>get</span>(cacheKey)</span>
          <span className="fc-badge cb-lo">Redis · ~$2/mo</span>
        </div>
        <div className="fc-ann-line">
          <span className="fc-ln">23</span>
          <span className="fc-code"><span style={{ color: '#1D9E75' }}>dynamodb</span>.<span style={{ color: '#8bb8f0' }}>putItem</span>(params)</span>
          <span className="fc-badge cb-md">DynamoDB · ~$18/mo</span>
        </div>
        <div className="fc-ann-line">
          <span className="fc-ln">29</span>
          <span className="fc-code"><span style={{ color: '#1D9E75' }}>s3</span>.<span style={{ color: '#8bb8f0' }}>putObject</span>({'{'} Bucket: <span style={{ color: '#f0c070' }}>"logs"</span> {'}'})</span>
          <span className="fc-badge cb-md">S3 · ~$12/mo</span>
        </div>
        <div className="fc-codelens">
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '.5px' }}>CodeLens · handleChat()</div>
          <div style={{ fontSize: '12px', color: '#1D9E75' }}>Cloud cost: ~$272/mo | See breakdown</div>
        </div>
      </div>
    ),
  },
  {
    num: '02 — Blockchain audit',
    title: 'Every save.',
    titleSpan: 'Anchored forever.',
    desc: 'On every file save, a canonical cost report is SHA-256 hashed and stored on Sepolia Mumbai. Any future tampering with cost figures is immediately detectable — cryptographic proof for any auditor.',
    link: 'View audit contract on Sepolia →',
    accent: '#8247e5', // Cryptographic Purple
    visual: (
      <div className="fc-chain-vis">
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '.5px' }}>Audit records — Sepolia</div>
        <div className="fc-chain-block">
          <div className="fc-chain-id">Report · api/handler.ts · saved 2 min ago</div>
          <div className="fc-chain-hash" style={{ color: '#1D9E75' }}>0x3f7a9c2d8e1b4f5c6a7d0e2f9b3c8a1d4e7f2b5c8a3d6e9f1b4c7a0d3e6f9b2</div>
          <div className="fc-chain-row">
            <span className="fc-chain-tag ok">✓ Authentic — matches on-chain</span>
            <span className="fc-chain-ts">block #38,241,907</span>
          </div>
        </div>
        <div className="fc-chain-block" style={{ borderColor: 'rgba(226,75,74,0.3)' }}>
          <div className="fc-chain-id">Report · api/handler.ts · edited locally</div>
          <div className="fc-chain-hash" style={{ color: '#E24B4A' }}>0xa1d3f2c8e4b7a0d5f2c9e1b4a7d0f3c6e9b2a5d8f1c4e7b0a3d6f9c2e5b8a1d4</div>
          <div className="fc-chain-row">
            <span className="fc-chain-tag fail">✗ Tampered — hash mismatch</span>
            <span className="fc-chain-ts">divergence detected</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    num: '03 — PR cost diffs',
    title: 'Every PR gets',
    titleSpan: 'a cost impact score',
    desc: 'When you open a pull request, CloudGauge computes the cost delta between base and head branch. The diff is hashed and anchored on-chain — so the cost impact of every merge is immutably recorded.',
    link: 'See PR integration docs →',
    accent: '#E24B4A', // Brand Red
    visual: (
      <div className="fc-pr-card">
        <div className="fc-pr-head">
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3fb950', display: 'inline-block' }}></span>
          <span className="fc-pr-num">PR #247</span>
          <span className="fc-pr-title">feat: add AI-powered search endpoint</span>
        </div>
        <div className="fc-pr-rows">
          <div className="fc-pr-row"><span>OpenAI GPT-4o (new)</span><span style={{ color: '#E24B4A' }}>+$240/mo</span></div>
          <div className="fc-pr-row"><span>Redis cache layer</span><span style={{ color: '#1D9E75' }}>-$144/mo</span></div>
          <div className="fc-pr-row"><span>DynamoDB logging</span><span style={{ color: '#E24B4A' }}>+$18/mo</span></div>
          <div className="fc-pr-row"><span>Lambda invocations</span><span style={{ color: '#E24B4A' }}>+$8/mo</span></div>
        </div>
        <div className="fc-pr-total">
          <span>Net monthly impact</span>
          <span style={{ color: '#E24B4A', fontWeight: 700, fontSize: '18px' }}>+$122/mo</span>
        </div>
        <div className="fc-pr-anchor">
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8247e5', display: 'inline-block', flexShrink: 0 }}></span>
          Cost diff anchored on Sepolia · 0x7b4f...c29a · block #38,241,923
        </div>
      </div>
    ),
  },
];

const Features: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2000",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          pinSpacing: true
        }
      });

      // Step 1: First card fully visible
      tl.to(cards[0], {
        top: "50%",
        duration: 1.2,
        ease: "power2.out"
      });

      // Pause (user sees full card)
      tl.to({}, { duration: 0.2 });

      tl.to(cards[cards.length - 1], {
        scale: 1,
        duration: 0.3,
      });

      // Step 2+: Stack cards one by one
      cards.slice(1).forEach((card, i) => {
        tl.to(card, {
          top: "50%",
          duration: 1,
          ease: "power2.out"
        });

        // keep previous card slightly scaled (hidden under)
        tl.to(cards[i], {
          scale: 0.92,
          duration: 0.5,
          ease: "power2.out"
        }, "<");

        // Pause between cards
        tl.to({}, { duration: 0.5 });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="feat-stack-section" ref={sectionRef}>
      <div className="feat-stack-cards">
        {features.map((f, i) => (
          <div
            className="feat-card"
            key={i}
            ref={el => { cardsRef.current[i] = el; }}
            style={{ zIndex: i + 1 }}
          >
            <div className="feat-card-container">
              {/* LEFT: Text */}
              <div className="feat-card-copy">
                <div className="feat-card-num" style={{ color: f.accent }}>{f.num}</div>
                <h2 className="feat-card-h">
                  {f.title}<br />
                  <span style={{ color: f.accent }}>{f.titleSpan}</span>
                </h2>
                <p className="feat-card-p">{f.desc}</p>
                <div className="feat-card-link" style={{ color: f.accent }}>{f.link}</div>
              </div>

              {/* RIGHT: Visual */}
              <div className="feat-card-visual">
                {f.visual}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
