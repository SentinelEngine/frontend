import React, { useState, useEffect, type CSSProperties } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import './Docs.css';

const sections = [
  { id: 'about', title: 'About' },
  { id: 'features', title: 'Features' },
  { id: 'how-it-works', title: 'How it Works' },
  { id: 'prerequisites', title: 'Prerequisites' },
  { id: 'installation', title: 'Installation' },
  { id: 'usage', title: 'Usage' },
  { id: 'config', title: 'Configuration' },
  { id: 'languages', title: 'Languages' },
  { id: 'dev', title: 'Development' },
  { id: 'faq', title: 'FAQ' },
];

const FeatureCard = ({ title, children }: { title: string, children: React.ReactNode }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const glowStyle = {
    '--x': `${coords.x}px`,
    '--y': `${coords.y}px`,
  } as CSSProperties;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div
      className="feature-card"
      onMouseMove={handleMouseMove}
      style={glowStyle}
      whileHover={{ y: -8 }}
    >
      <h3>{title}</h3>
      <p>{children}</p>
    </motion.div>
  );
};

const CodeBlock = ({ code, lang = 'bash' }: { code: string, lang?: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <motion.div
      className="docs-code-block"
      whileHover={{ borderColor: 'var(--teal)' }}
    >
      <div className="code-header">
        <span className="code-lang">{lang}</span>
        <button className="code-copy" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre><code>{code}</code></pre>
    </motion.div>
  );
};

const Section = ({ id, title, children }: { id: string, title: string, children: React.ReactNode }) => (
  <motion.section
    id={id}
    className="docs-section"
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {title}
    </motion.h2>
    {children}
  </motion.section>
);

const Docs: React.FC = () => {
  const [activeSection, setActiveSection] = useState('about');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 120,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="docs-page">
      <motion.div className="docs-progress" style={{ scaleX }} />
      <div className="docs-container">

        {/* Sidebar */}
        <aside className="docs-sidebar">
          <div className="sidebar-inner">
            <h3 className="sidebar-title">Documentation</h3>
            <nav className="sidebar-nav">
              {sections.map((s) => (
                <button
                  key={s.id}
                  className={`sidebar-link ${activeSection === s.id ? 'active' : ''}`}
                  onClick={() => scrollTo(s.id)}
                >
                  {s.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="docs-main">
          <header className="docs-header">
            <h1 className="docs-title">CloudGauge</h1>
            <p className="docs-subtitle">ESLint for Cloud Costs — See your bill as you type.</p>
          </header>

          <Section id="about" title="About">
            <p>
              <strong>CloudGauge</strong> brings financial accountability directly into your IDE.
              By acting like a linter for cloud and AI spending, it provides real-time, inline cost estimates
              and architectural optimization suggestions. It's built for modern developers who want to avoid
              surprise cloud bills, featuring integrations with top-tier AI models.
            </p>
          </Section>

          <Section id="features" title="Features">
            <div className="feature-grid">
              <FeatureCard title="Real-Time Cost Estimates">
                Predicts the cost of infrastructure resources and AI API calls directly via CodeLens and inline editor gutter badges.
              </FeatureCard>
              <FeatureCard title="Smart Optimizations">
                Identifies expensive configurations in Terraform, Dockerfiles, and code, and uses integrated AI to suggest cheaper alternatives with a 1-click "Apply Fix".
              </FeatureCard>
              <FeatureCard title="AI Model Flexibility">
                Connect to Gemini, OpenAI, Anthropic, or run completely offline with <strong>Ollama</strong> for zero-data-leakage analysis.
              </FeatureCard>
            </div>
          </Section>

          <Section id="how-it-works" title="How It Works">
            <ol className="step-list">
              <li><strong>Parsing:</strong> The extension continuously monitors your active file and language environment.</li>
              <li><strong>Analysis:</strong> It detects infrastructure definitions, API calls, and usage parameters.</li>
              <li><strong>Execution:</strong> Queries your configured AI Engine and local Cost Engine to determine standard industry pricing.</li>
              <li><strong>Actionability:</strong> Renders warnings and presents actionable optimizations.</li>
            </ol>
          </Section>

          <Section id="prerequisites" title="Prerequisites">
            <div className="prereq-box">
              <h3>For Standard Use:</h3>
              <ul>
                <li>Visual Studio Code <strong>v1.85.0</strong> or higher.</li>
                <li>An AI Provider API Key (Gemini, OpenAI, etc.) OR a local instance of <strong>Ollama</strong>.</li>
              </ul>
              <h3 style={{ marginTop: '1.5rem' }}>For Development:</h3>
              <ul>
                <li><strong>Node.js:</strong> v18+</li>
                <li><strong>npm:</strong> v9+</li>
              </ul>
            </div>
          </Section>

          <Section id="installation" title="Installation">
            <h3>From VS Code Marketplace</h3>
            <p>1. Open VS Code and go to Extensions view (<code>Cmd+Shift+X</code>).</p>
            <p>2. Search for <code>CloudGauge</code> and click Install.</p>

            <h3 style={{ marginTop: '2rem' }}>Manual VSIX Installation</h3>
            <p>1. Download the latest <code>.vsix</code> from our releases.</p>
            <p>2. In Extensions view, click <code>...</code> &gt; <code>Install from VSIX...</code></p>
          </Section>

          <Section id="usage" title="Usage & Commands">
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Command</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><code>cloudgauge.showBreakdown</code></td><td>Displays cost breakdown of current file.</td></tr>
                  <tr><td><code>cloudgauge.analyzeAndSuggest</code></td><td>AI-powered cost saving improvements.</td></tr>
                  <tr><td><code>cloudgauge.viewCostReport</code></td><td>Opens the dedicated cost report panel.</td></tr>
                  <tr><td><code>cloudgauge.projectAudit</code></td><td>Full project-wide cost sweep.</td></tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="config" title="Configuration Settings">
            <p>Modify these in your VS Code <code>settings.json</code>:</p>
            <CodeBlock lang="json" code={`{
  "cloudgauge.warningThreshold": 50,
  "cloudgauge.monthlyCallEstimate": 50000,
  "cloudgauge.enableCodeLens": true,
  "cloudgauge.geminiApiKey": "YOUR_KEY"
}`} />
          </Section>

          <Section id="languages" title="Supported Languages">
            <ul className="lang-list">
              <li><code>TypeScript / JavaScript</code> (.ts, .js, .tsx)</li>
              <li><code>Terraform</code> (.tf)</li>
              <li><code>YAML</code> (K8s, CI/CD)</li>
              <li><code>Dockerfile</code></li>
              <li><code>Python</code> (.py)</li>
            </ul>
          </Section>

          <Section id="dev" title="Development">
            <CodeBlock lang="bash" code={`# Clone the repo
git clone https://github.com/cloudgauge/vscode-extension.git
cd vscode-extension

# Install dependencies
npm install

# Build and watch
npm run build:watch`} />
          </Section>

          <Section id="faq" title="Troubleshooting & FAQ">
            <div className="faq-item">
              <h4>My Inline Badges aren't appearing.</h4>
              <p>Ensure <code>cloudgauge.enableGutterBadges</code> is true and wait a few seconds for analysis.</p>
            </div>
            <div className="faq-item">
              <h4>"AI Optimization failed" error?</h4>
              <p>Verify your API key or Ollama status (<code>ollama serve</code>).</p>
            </div>
          </Section>
        </main>
      </div>
    </div>
  );
};

export default Docs;
