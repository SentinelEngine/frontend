import React from 'react';
import './Features.css';

const Features: React.FC = () => {
  return (
    <section>
      <div className="feat-row">
        <div className="feat-copy">
          <div className="feat-num">01 — Real-time detection</div>
          <h2 className="feat-h">Costs appear<br /><span>as you write</span></h2>
          <p className="feat-p">Every cloud API call is detected with 300ms debounce. Cost badges appear inline in the gutter, in CodeLens above each function, and in the status bar — all simultaneously. No config, no setup.</p>
          <div className="feat-link">Learn about detection coverage →</div>
        </div>
        <div className="feat-visual">
          <div className="ann-wrap">
            <div className="ann-bar">analyzer.ts — CloudCost Lens active</div>
            <div className="ann-line"><span className="ann-ln">12</span><span className="ann-code"><span style={{ color: 'var(--teal-bright)' }}>openai</span>.chat.completions.<span style={{ color: '#8bb8f0' }}>create</span>({'{'}</span><span className="ann-badge cb-hi">GPT-4o · ~$240/mo</span></div>
            <div className="ann-line"><span className="ann-ln">13</span><span className="ann-code">&nbsp;&nbsp;model: <span style={{ color: '#f0c070' }}>"gpt-4o"</span>,</span></div>
            <div className="ann-line"><span className="ann-ln">17</span><span className="ann-code"><span style={{ color: 'var(--teal-bright)' }}>redis</span>.<span style={{ color: '#8bb8f0' }}>get</span>(cacheKey)</span><span className="ann-badge cb-lo">Redis · ~$2/mo</span></div>
            <div className="ann-line"><span className="ann-ln">23</span><span className="ann-code"><span style={{ color: 'var(--teal-bright)' }}>dynamodb</span>.<span style={{ color: '#8bb8f0' }}>putItem</span>(params)</span><span className="ann-badge cb-md">DynamoDB · ~$18/mo</span></div>
            <div className="ann-line"><span className="ann-ln">29</span><span className="ann-code"><span style={{ color: 'var(--teal-bright)' }}>s3</span>.<span style={{ color: '#8bb8f0' }}>putObject</span>({'{'} Bucket: <span style={{ color: '#f0c070' }}>"logs"</span> {'}'})</span><span className="ann-badge cb-md">S3 · ~$12/mo</span></div>
            <div style={{ margin: '8px 14px', padding: '8px 12px', background: 'rgba(29,158,117,0.07)', borderRadius: '6px', border: '0.5px solid rgba(29,158,117,0.2)' }}>
              <div style={{ fontSize: '10px', color: 'var(--muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '.5px' }}>CodeLens · handleChat()</div>
              <div style={{ fontSize: '12px', color: 'var(--teal-bright)' }}>Cloud cost: ~$272/mo | See breakdown</div>
            </div>
          </div>
        </div>
      </div>

      <div className="feat-row flip">
        <div className="feat-copy">
          <div className="feat-num">02 — Blockchain audit</div>
          <h2 className="feat-h">Every save.<br /><span>Anchored forever.</span></h2>
          <p className="feat-p">On every file save, a canonical cost report is SHA-256 hashed and stored on Polygon Mumbai. Any future tampering with cost figures is immediately detectable — cryptographic proof for any auditor.</p>
          <div className="feat-link">View audit contract on Polygonscan →</div>
        </div>
        <div className="feat-visual">
          <div className="chain-vis">
            <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '.5px' }}>Audit records — Polygon Mumbai</div>
            <div className="chain-block">
              <div className="chain-id">Report · api/handler.ts · saved 2 min ago</div>
              <div className="chain-hash">0x3f7a9c2d8e1b4f5c6a7d0e2f9b3c8a1d4e7f2b5c8a3d6e9f1b4c7a0d3e6f9b2</div>
              <div className="chain-row">
                <span className="chain-tag chain-ok">✓ Authentic — matches on-chain</span>
                <span className="chain-ts">block #38,241,907</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
                <div className="poly-dot"></div>
                <span style={{ fontSize: '10px', color: 'var(--muted)' }}>Polygon Mumbai · TxHash: 0x9c2a...f71e</span>
              </div>
            </div>
            <div className="chain-block">
              <div className="chain-id">Report · api/handler.ts · edited locally</div>
              <div className="chain-hash" style={{ color: '#f09595' }}>0xa1d3f2c8e4b7a0d5f2c9e1b4a7d0f3c6e9b2a5d8f1c4e7b0a3d6f9c2e5b8a1d4</div>
              <div className="chain-row">
                <span className="chain-tag chain-fail">✗ Tampered — hash mismatch</span>
                <span className="chain-ts">divergence detected</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="feat-row">
        <div className="feat-copy">
          <div className="feat-num">03 — PR cost diffs</div>
          <h2 className="feat-h">Every PR gets<br /><span>a cost impact score</span></h2>
          <p className="feat-p">When you open a pull request, CloudCost Lens computes the cost delta between base and head branch. The diff is hashed and anchored on-chain — so the cost impact of every merge is immutably recorded.</p>
          <div className="feat-link">See PR integration docs →</div>
        </div>
        <div className="feat-visual">
          <div className="pr-card">
            <div className="pr-head">
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3fb950', display: 'inline-block' }}></span>
              <span className="pr-num">PR #247</span>
              <span className="pr-title">feat: add AI-powered search endpoint</span>
            </div>
            <div className="pr-rows">
              <div className="pr-row"><span className="pr-svc">OpenAI GPT-4o (new)</span><span className="pr-plus">+$240/mo</span></div>
              <div className="pr-row"><span className="pr-svc">Redis cache layer</span><span className="pr-minus">-$144/mo</span></div>
              <div className="pr-row"><span className="pr-svc">DynamoDB logging</span><span className="pr-plus">+$18/mo</span></div>
              <div className="pr-row"><span className="pr-svc">Lambda invocations</span><span className="pr-plus">+$8/mo</span></div>
            </div>
            <div className="pr-total">
              <span className="pr-total-label">Net monthly impact</span>
              <span className="pr-total-val">+$122/mo</span>
            </div>
            <div className="pr-anchor">
              <div className="poly-dot"></div>
              Cost diff anchored on Polygon · 0x7b4f...c29a · block #38,241,923
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
