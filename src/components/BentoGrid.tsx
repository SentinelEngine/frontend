import React from 'react';
import './BentoGrid.css';

const BentoGrid: React.FC = () => {
  return (
    <section className="bento-section">
      <div className="bento-label">Full coverage</div>
      <div className="bento-title">Everything your cloud stack touches</div>
      <div className="bento-grid">
        <div className="bc wide tall">
          <div className="bc-icon bc-t">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 12 L8 4 L13 12 Z" stroke="#1D9E75" strokeWidth="1.5" fill="none"/></svg>
          </div>
          <div className="bc-title">Cache = instant savings</div>
          <div className="bc-desc">Add one line of Redis caching and watch your LLM bill drop 60% in real time. The most powerful demo in the tool.</div>
          <div className="mini-graph" id="mg">
            <div className="bar" style={{ height: '40px', width: '14px', background: '#E24B4A', opacity: .7 }}></div>
            <div className="bar" style={{ height: '42px', width: '14px', background: '#E24B4A', opacity: .7 }}></div>
            <div className="bar" style={{ height: '38px', width: '14px', background: '#E24B4A', opacity: .7 }}></div>
            <div className="bar" style={{ height: '44px', width: '14px', background: '#E24B4A', opacity: .7 }}></div>
            <div className="bar" style={{ height: '20px', width: '14px', background: 'var(--teal)', opacity: .8 }}></div>
            <div className="bar" style={{ height: '18px', width: '14px', background: 'var(--teal)', opacity: .8 }}></div>
            <div className="bar" style={{ height: '19px', width: '14px', background: 'var(--teal)', opacity: .8 }}></div>
            <div className="bar" style={{ height: '17px', width: '14px', background: 'var(--teal)', opacity: .8 }}></div>
          </div>
          <div style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '6px' }}>Before cache → After cache (60% drop)</div>
        </div>
        <div className="bc">
          <div className="bc-icon bc-a">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5" stroke="#F59E0B" strokeWidth="1.5"/><path d="M8 5v3l2 2" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <div className="bc-title">Live pricing</div>
          <div className="bc-desc">Rates fetched from AWS, OpenAI, Anthropic APIs at startup. Always current.</div>
        </div>
        <div className="bc">
          <div className="bc-icon bc-b">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="3" y="3" width="10" height="10" rx="2" stroke="#378ADD" strokeWidth="1.5"/><path d="M6 8h4M8 6v4" stroke="#378ADD" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <div className="bc-title">6 services</div>
          <div className="bc-desc">GPT-4o, Claude, Lambda, DynamoDB, S3, Redis, API Gateway.</div>
          <div className="svc-chips">
            <span className="svc-chip">OpenAI</span><span className="svc-chip">Anthropic</span><span className="svc-chip">Lambda</span><span className="svc-chip">DynamoDB</span><span className="svc-chip">S3</span><span className="svc-chip">Redis</span>
          </div>
        </div>
        <div className="bc">
          <div className="bc-icon bc-p">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2 L14 12 L2 12 Z" stroke="#8247e5" strokeWidth="1.5" fill="none"/></svg>
          </div>
          <div className="bc-title">Polygon anchored</div>
          <div className="bc-desc">SHA-256 hashes stored on-chain. Tamper-evident by design.</div>
        </div>
        <div className="bc wide">
          <div className="bc-icon bc-r">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 8 L7 11 L12 5" stroke="#E24B4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div className="bc-title">Zero config. Instant on.</div>
          <div className="bc-desc">Install the extension, open any TypeScript or Python file, and detection starts immediately. No accounts, no API keys, no setup wizard.</div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
