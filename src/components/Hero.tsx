import React from 'react';
import './Hero.css';

const EditorMockup = () => (
  <div className="editor-wrap">
    <div className="editor-tilt">
      <div className="e-bar">
        <div className="e-dot" style={{ background: '#ff5f57' }}></div>
        <div className="e-dot" style={{ background: '#febc2e' }}></div>
        <div className="e-dot" style={{ background: '#28c840' }}></div>
        <span className="e-tab">routes/chat.ts</span>
        <span className="e-tab on">api/handler.ts</span>
      </div>
      <div className="code">
        <div className="cl"><span className="ln">1</span><span className="ct"><span className="kw">import</span> OpenAI <span className="kw">from</span> <span className="str">'openai'</span></span></div>
        <div className="cl"><span className="ln">2</span><span className="ct"><span className="kw">import</span> {'{'} createClient {'}'} <span className="kw">from</span> <span className="str">'redis'</span></span></div>
        <div className="cl"><span className="ln">3</span><span className="ct"><span className="kw">import</span> {'{'} DynamoDB {'}'} <span className="kw">from</span> <span className="str">'@aws-sdk/client-dynamodb'</span></span></div>
        <div className="cl"><span className="ln">4</span><span className="ct"></span></div>
        <div className="cl"><span className="ln">5</span><span className="ct"><span className="kw">export async function</span> <span className="fn">handleChat</span>(prompt: <span className="kw">string</span>) {'{'}</span></div>
        <div className="cl"><span className="ln">6</span><span className="ct">&nbsp;&nbsp;<span className="cm">// check cache first</span></span></div>
        <div className="cl"><span className="ln">7</span><span className="ct">&nbsp;&nbsp;<span className="kw">const</span> hit = <span className="kw">await</span> redis.<span className="fn">get</span>(prompt)</span><span className="cb cb-lo">~$2/mo</span></div>
        <div className="cl"><span className="ln">8</span><span className="ct">&nbsp;&nbsp;<span className="kw">if</span> (hit) <span className="kw">return</span> JSON.<span className="fn">parse</span>(hit)</span></div>
        <div className="cl"><span className="ln">9</span><span className="ct"></span></div>
        <div className="cl"><span className="ln">10</span><span className="ct">&nbsp;&nbsp;<span className="kw">const</span> res = <span className="kw">await</span> openai.chat.completions.<span className="fn">create</span>({'{'}</span><span className="cb cb-hi">~$240/mo</span></div>
        <div className="cl"><span className="ln">11</span><span className="ct">&nbsp;&nbsp;&nbsp;&nbsp;model: <span className="str">"gpt-4o"</span>, messages: [{'{'} role: <span className="str">"user"</span>, content: prompt {'}'}]</span></div>
        <div className="cl"><span className="ln">12</span><span className="ct">&nbsp;&nbsp;{'}'})</span></div>
        <div className="cl"><span className="ln">13</span><span className="ct">&nbsp;&nbsp;<span className="kw">await</span> dynamo.<span className="fn">putItem</span>({'{'} TableName: <span className="str">"logs"</span>, Item: res {'}'})</span><span className="cb cb-md">~$18/mo</span></div>
        <div className="cl"><span className="ln">14</span><span className="ct">&nbsp;&nbsp;<span className="kw">await</span> redis.<span className="fn">set</span>(prompt, JSON.<span className="fn">stringify</span>(res))</span><span className="cb cb-lo">~$2/mo</span></div>
        <div className="cl"><span className="ln">15</span><span className="ct">&nbsp;&nbsp;<span className="kw">return</span> res.choices[0].message</span></div>
        <div className="cl"><span className="ln">16</span><span className="ct">{'}'}</span></div>
      </div>
      <div className="sbar">
        <span>☁ $262/mo estimated</span>
        <span style={{ opacity: .4 }}>|</span>
        <span>3 services detected</span>
        <span style={{ opacity: .4 }}>|</span>
        <span style={{ color: 'rgba(255,255,255,.55)' }}>On-chain: anchored ✓</span>
        <span style={{ opacity: .4 }}>|</span>
        <span style={{ color: 'rgba(255,255,255,.55)' }}>Polygon Mumbai</span>
      </div>
    </div>
  </div>
);

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-dots"></div>
      <div className="hero-glow"></div>
      <div className="badge"><span className="badge-dot"></span>Now with on-chain audit trail</div>
      <h1>See your <em>cloud bill</em><br/>as you type</h1>
      <p className="hero-sub">ESLint for cloud costs. Detect expensive API calls, LLM usage, and AWS services inline — before you ever hit commit.</p>
      <div className="hero-btns">
        <button className="btn-t">Install Extension — Free</button>
        <button className="btn-g">View on GitHub →</button>
      </div>
      <EditorMockup />
    </section>
  );
};

export default Hero;
