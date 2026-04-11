import React, { useEffect, useRef } from 'react';
import { motion, animate, useReducedMotion } from 'framer-motion';
import './Hero.css';

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; size: number; speedY: number; opacity: number }[] = [];
    const init = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particles = Array.from({ length: 25 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedY: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.15
      }));
    };

    init();
    window.addEventListener('resize', init);

    let animationId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.y -= p.speedY;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(29, 158, 117, ${p.opacity})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, display: window.innerWidth < 768 ? 'none' : 'block' }} />;
};

const CountUp = () => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      if (nodeRef.current) nodeRef.current.textContent = `☁ $262/mo estimated`;
      return;
    }
    const controls = animate(0, 262, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (value) => {
        if (nodeRef.current) {
          nodeRef.current.textContent = `☁ $${Math.round(value)}/mo estimated`;
        }
      }
    });
    return controls.stop;
  }, [shouldReduceMotion]);

  return <span ref={nodeRef}>☁ $0/mo estimated</span>;
};

const EditorMockup = () => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className="editor-wrap"
      initial={{ y: shouldReduceMotion ? 0 : 40, opacity: shouldReduceMotion ? 1 : 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" }}
      style={{ willChange: 'transform, opacity' }}
    >
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
          <div className="cl">
            <span className="ln">7</span>
            <span className="ct">&nbsp;&nbsp;<span className="kw">const</span> hit = <span className="kw">await</span> redis.<span className="fn">get</span>(prompt)</span>
            <motion.span className="cb cb-lo" initial={{ x: shouldReduceMotion ? 0 : 20, opacity: shouldReduceMotion ? 1 : 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.9, duration: shouldReduceMotion ? 0 : 0.5 }}>~$2/mo</motion.span>
          </div>
          <div className="cl"><span className="ln">8</span><span className="ct">&nbsp;&nbsp;<span className="kw">if</span> (hit) <span className="kw">return</span> JSON.<span className="fn">parse</span>(hit)</span></div>
          <div className="cl"><span className="ln">9</span><span className="ct"></span></div>
          <div className="cl">
            <span className="ln">10</span>
            <span className="ct">&nbsp;&nbsp;<span className="kw">const</span> res = <span className="kw">await</span> openai.chat.completions.<span className="fn">create</span>({'{'}</span>
            <motion.span className="cb cb-hi" initial={{ x: shouldReduceMotion ? 0 : 20, opacity: shouldReduceMotion ? 1 : 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.2, duration: shouldReduceMotion ? 0 : 0.5 }}>~$240/mo</motion.span>
          </div>
          <div className="cl"><span className="ln">11</span><span className="ct">&nbsp;&nbsp;&nbsp;&nbsp;model: <span className="str">"gpt-4o"</span>, messages: [{'{'} role: <span className="str">"user"</span>, content: prompt {'}'}]</span></div>
          <div className="cl"><span className="ln">12</span><span className="ct">&nbsp;&nbsp;{'}'})</span></div>
          <div className="cl">
            <span className="ln">13</span>
            <span className="ct">&nbsp;&nbsp;<span className="kw">await</span> dynamo.<span className="fn">putItem</span>({'{'} TableName: <span className="str">"logs"</span>, Item: res {'}'})</span>
            <motion.span className="cb cb-md" initial={{ x: shouldReduceMotion ? 0 : 20, opacity: shouldReduceMotion ? 1 : 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.5, duration: shouldReduceMotion ? 0 : 0.5 }}>~$18/mo</motion.span>
          </div>
          <div className="cl">
            <span className="ln">14</span>
            <span className="ct">&nbsp;&nbsp;<span className="kw">await</span> redis.<span className="fn">set</span>(prompt, JSON.<span className="fn">stringify</span>(res))</span>
            <motion.span className="cb cb-lo" initial={{ x: shouldReduceMotion ? 0 : 20, opacity: shouldReduceMotion ? 1 : 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.8, duration: shouldReduceMotion ? 0 : 0.5 }}>~$2/mo</motion.span>
          </div>
          <div className="cl"><span className="ln">15</span><span className="ct">&nbsp;&nbsp;<span className="kw">return</span> res.choices[0].message</span></div>
          <div className="cl"><span className="ln">16</span><span className="ct">{'}'}<span className="cursor">|</span></span></div>
        </div>
        <div className="sbar">
          <CountUp />
          <span style={{ opacity: .4 }}>|</span>
          <span>3 services detected</span>
          <span style={{ opacity: .4 }}>|</span>
          <span style={{ color: 'rgba(255,255,255,.55)' }}>On-chain: anchored ✓</span>
          <span style={{ opacity: .4 }}>|</span>
          <span style={{ color: 'rgba(255,255,255,.55)' }}>sepholia Mumbai</span>
        </div>
      </div>
    </motion.div>
  );
};

const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07 }
    }
  };

  const wordAnim = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: shouldReduceMotion ? 0 : 0.5 } }
  };

  return (
    <section className="hero">
      <div className="hero-dots"></div>
      <div className="hero-glow"></div>
      <ParticleCanvas />

      <motion.div
        className="badge"
        initial={{ y: shouldReduceMotion ? 0 : -16, opacity: shouldReduceMotion ? 1 : 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, ease: "easeOut", duration: shouldReduceMotion ? 0 : 0.5 }}
        style={{ willChange: 'transform, opacity' }}
      >
        <span className="badge-dot"></span>Now with on-chain audit trail
      </motion.div>

      <motion.h1 variants={container} initial="hidden" animate="visible" style={{ position: 'relative', zIndex: 1, willChange: 'opacity' }}>
        <motion.span variants={wordAnim} style={{ display: 'inline-block', willChange: 'transform, opacity' }}>See&nbsp;</motion.span>
        <motion.span variants={wordAnim} style={{ display: 'inline-block', willChange: 'transform, opacity' }}>your&nbsp;</motion.span>
        <motion.span variants={wordAnim} style={{ display: 'inline-block', willChange: 'transform, opacity' }}>
          <em style={{ fontStyle: 'italic', color: 'var(--teal)', fontWeight: 300 }}>cloud bill</em>
        </motion.span>
        <br />
        <motion.span variants={wordAnim} style={{ display: 'inline-block', willChange: 'transform, opacity' }}>as&nbsp;</motion.span>
        <motion.span variants={wordAnim} style={{ display: 'inline-block', willChange: 'transform, opacity' }}>you&nbsp;</motion.span>
        <motion.span variants={wordAnim} style={{ display: 'inline-block', willChange: 'transform, opacity' }}>type</motion.span>
      </motion.h1>

      <motion.p
        className="hero-sub"
        initial={{ y: shouldReduceMotion ? 0 : 12, opacity: shouldReduceMotion ? 1 : 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, ease: "easeOut", duration: shouldReduceMotion ? 0 : 0.5 }}
        style={{ willChange: 'transform, opacity' }}
      >
        ESLint for cloud costs. Detect expensive API calls, LLM usage, and AWS services inline — before you ever hit commit.
      </motion.p>

      <motion.div
        className="hero-btns"
        style={{ position: 'relative', zIndex: 1, willChange: 'opacity' }}
        initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: shouldReduceMotion ? 0 : 0.5 }}
      >
        <button className="btn-t">Install Extension — Free</button>
        <button className="btn-g">View on GitHub <span className="arrow">→</span></button>
      </motion.div>

      <EditorMockup />
    </section>
  );
};

export default Hero;
