import React, { useEffect, useRef } from 'react';
import { motion, animate, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

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
      particles = Array.from({ length: 200 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedY: Math.random() * 0.8 + 0.2,
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

const MagneticGridCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const spacing = 32;
    let dots: { ox: number, oy: number, x: number, y: number }[] = [];

    const init = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      dots = [];
      for (let x = 0; x < canvas.width + spacing; x += spacing) {
        for (let y = 0; y < canvas.height + spacing; y += spacing) {
          dots.push({ ox: x, oy: y, x: x, y: y });
        }
      }
    };
    init();
    window.addEventListener('resize', init);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseleave', onMouseLeave);

    let animationId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(29, 158, 117, 0.4)';

      const { x: mx, y: my } = mouseRef.current;
      const radius = 120;

      dots.forEach(dot => {
        const dx = dot.ox - mx;
        const dy = dot.oy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius) {
          const force = (radius - dist) / radius;
          const pullX = (dx / dist) * force * 15;
          const pullY = (dy / dist) * force * 15;
          dot.x = dot.ox - pullX;
          dot.y = dot.oy - pullY;
        } else {
          dot.x += (dot.ox - dot.x) * 0.1;
          dot.y += (dot.oy - dot.y) * 0.1;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.1, 0, Math.PI * 2);
        ctx.fill();
      });
      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
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

const TypewriterHeadline = ({ onComplete, isTyped }: { onComplete: () => void, isTyped: boolean }) => {
  const phrase = "ESLint for cloud costs, see your bill as you type.";
  const [text, setText] = React.useState('');
  const [isDone, setIsDone] = React.useState(false);

  React.useEffect(() => {
    if (isTyped) {
      setText(phrase);
      setIsDone(true);
      return;
    }

    if (isDone) return;

    const timer = setTimeout(() => {
      if (text.length < phrase.length) {
        setText(phrase.substring(0, text.length + 1));
      } else {
        setIsDone(true);
        setTimeout(onComplete, 500); // Slight delay before centering
      }
    }, 45);

    return () => clearTimeout(timer);
  }, [text, isDone, onComplete, phrase, isTyped]);

  return (
    <h1 className="typewriter-headline">
      {text}<span className="cursor-blink">|</span>
    </h1>
  );
};

const Hero: React.FC = () => {
  const [isTyped, setIsTyped] = React.useState(false);
  const editorWrapperRef = useRef<HTMLDivElement>(null);
  const editorCardRef = useRef<HTMLDivElement>(null);

  // Skip typewriter on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20 && !isTyped) {
        setIsTyped(true);
        // Force complete the typewriter logic
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isTyped]);

  useEffect(() => {
    if (!isTyped) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: editorWrapperRef.current,
          start: "top top",
          end: () => "+=500", // Much shorter scroll distance to avoid gaps
          scrub: 1, // Add a bit of smoothing to the scrub
          pin: true,
          invalidateOnRefresh: true,
        }
      });

      // Step 1: scale to 1.0 and flatten tilt
      tl.to(editorCardRef.current, {
        scale: 1,
        rotateX: 0,
        duration: 1,
        ease: "power2.out"
      });

      // Step 2: expand to 80vw / 70vh (reduced size by 15%)
      tl.to(editorCardRef.current, {
        width: "80vw",
        height: "70vh",
        borderRadius: 20,
        duration: 2,
        ease: "power2.out"
      });

      // Hold this wide state briefly before handing off to the feature stack.
      tl.to({}, { duration: 0.2 });

      // Step 3: LIQUID EXIT - Dissolve and scale down in center to clear for Features
      // Step 3: LIQUID EXIT - Dissolve quickly
      tl.to(editorCardRef.current, {
        scale: 0.9,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.4,
        ease: "power2.in"
      });
    }, editorWrapperRef);

    return () => ctx.revert();
  }, [isTyped]);

  const containerVariants = {
    typing: {
      top: '40%',
      left: '5vw',
      right: 'auto',
      x: 0,
      y: '-50%',
      textAlign: 'left' as const,
      flexDirection: 'column' as const,
      alignItems: 'flex-start' as const
    },
    centered: {
      top: '50%',
      right: 'auto',
      left: '50%',
      x: '-50%',
      y: '-50%',
      textAlign: 'center' as const,
      flexDirection: 'column' as const,
      alignItems: 'center' as const
    }
  };

  return (
    <section className="hero">
      <div className="hero-main">
        <MagneticGridCanvas />
        <div className="hero-glow"></div>
        <ParticleCanvas />

        <motion.div
          className="hero-content-wrapper"
          initial="typing"
          animate={isTyped ? "centered" : "typing"}
          variants={containerVariants}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 15,
            duration: 1.2,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            display: 'flex',
            zIndex: 10
          }}
        >
          <motion.div
            className="hero-brand"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isTyped ? 1 : 0, y: isTyped ? 0 : 20 }}
            transition={{ delay: isTyped ? 0.3 : 0 }}
            style={{ marginBottom: '1.5rem', justifyContent: isTyped ? 'center' : 'flex-start' }}
          >
            <div className="brand-sq" style={{ width: '28px', height: '28px', background: 'var(--teal)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0' }}>
              <img src="/logo.svg" alt="CloudGauge" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            CloudGauge
          </motion.div>

          <TypewriterHeadline isTyped={isTyped} onComplete={() => setIsTyped(true)} />

          <motion.div
            className="hero-btns-new"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isTyped ? 1 : 0, y: isTyped ? 0 : 20 }}
            transition={{ delay: isTyped ? 0.5 : 0 }}
          >
            <a href="" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Install for VS Code
            </a>
            <a href="" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              View on GitHub →
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: isTyped ? 1 : 0 }}
          transition={{ delay: 1.5 }}
        >
        </motion.div>
      </div>

      {/* GSAP Expansion Wrapper */}
      <div className="editor-reveal-wrapper" ref={editorWrapperRef}>
        <div className="editor-expandable-card" ref={editorCardRef}>
          <EditorMockup />
        </div>
      </div>
    </section>
  );
};

export default Hero;
