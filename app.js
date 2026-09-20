/**
 * JAYANT SHOUNDIK // STARK-TECH HUD ENGINE v2.6
 * 60FPS Ambient Canvas, Stark CLI Terminal, Interactive Node Inspector, and Arc UI
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. LIVE UTC SYSTEM CLOCK
  // --------------------------------------------------------------------------
  const clockEl = document.getElementById('utc-clock');
  function updateClock() {
    if (!clockEl) return;
    const now = new Date();
    const utcStr = now.toISOString().substring(11, 19);
    clockEl.textContent = `UTC ${utcStr}`;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // --------------------------------------------------------------------------
  // 2. MOUSE CURSOR RADIAL SPOTLIGHT
  // --------------------------------------------------------------------------
  window.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });

  // --------------------------------------------------------------------------
  // 3. 60FPS AMBIENT CONSTELLATION / PARTICLE CANVAS
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 20), 55);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    let mouse = { x: -1000, y: -1000 };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(renderParticles);
    }
    renderParticles();
  }

  // --------------------------------------------------------------------------
  // 4. EXPERTISE MATRIX: INTERACTIVE NODE INSPECTOR
  // --------------------------------------------------------------------------
  const nodeData = {
    react: {
      name: "React 19 & Concurrent Architecture",
      badge: "FRONTEND CORE // V19.0",
      desc: "Implemented in Columbus AI workspace and InnoGrid Prism for asynchronous token streaming, dynamic UI rendering, and sub-millisecond DOM updates with useTransition.",
      code: `// React 19 Concurrent Dispatch Pattern
const streamTask = useTransition(async () => {
  const stream = await orchestrateAgentPipeline({ input, mode: 'DEEP_RESEARCH' });
  for await (const chunk of stream) {
    updateWorkspaceBuffer(prev => prev + chunk.token);
  }
});`
    },
    nextjs: {
      name: "Next.js & SSR Production Pipelines",
      badge: "FRONTEND FRAMEWORK // APP ROUTER",
      desc: "Architecting server-side rendering, streaming edge middleware, and optimal SEO payloads with React Server Components.",
      code: `// Next.js Edge Middleware Router
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('sys_auth_jwt');
  return token ? NextResponse.next() : NextResponse.redirect(new URL('/auth', request.url));
}`
    },
    tailwind: {
      name: "Tailwind CSS & Design Systems",
      badge: "UI SYSTEM // UTILITY FIRST",
      desc: "Crafting bespoke dark-mode design tokens, glassmorphism filters, and responsive layout constraints with zero runtime overhead.",
      code: `// Custom Tailwind Architecture Config
theme: {
  extend: {
    colors: {
      obsidian: '#030712',
      arcCyan: '#00F0FF',
      hyperViolet: '#8B5CF6'
    }
  }
}`
    },
    canvas: {
      name: "HTML5 Canvas & Procedural Graphics",
      badge: "CREATIVE ENGINEERING // 60FPS",
      desc: "Direct GPU-accelerated 2D context rendering for ambient particle networks, interactive HUD reticles, and real-time data visualizers.",
      code: `// 60FPS Velocity Engine Loop
function updateFrame() {
  ctx.clearRect(0, 0, width, height);
  renderConstellationMesh(particles);
  requestAnimationFrame(updateFrame);
}`
    },
    framermotion: {
      name: "Framer Motion & Spring Physics",
      badge: "ANIMATION // SPRING INTERPOLATION",
      desc: "Fluid physics-based transitions, layout animations, and gesture-driven HUD interaction surfaces.",
      code: `// Motion Spring Preset
const hudTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 25
};`
    },
    typescript: {
      name: "TypeScript Strict Type Safety",
      badge: "TYPE SYSTEM // COMPILE-TIME RESILIENCE",
      desc: "Strict type models for multi-agent payloads, API responses, and monorepo domain entity definitions.",
      code: `// Enterprise Agent Payload Contract
interface AgentTaskPayload<T = unknown> {
  readonly taskId: string;
  readonly vectorEmbedding: Float32Array;
  readonly metadata: Record<string, T>;
}`
    },
    gemini: {
      name: "Google Gemini 2.5 API & RAG",
      badge: "FOUNDATIONAL AI // MULTI-MODAL",
      desc: "Integrated as the cognitive brain of InnoGrid Prism for persona matching, hyper-personalized marketing copy, and multi-modal synthesis.",
      code: `// Gemini 2.5 Multi-Modal Synthesis
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: [catalogContext, customerPersonaPrompt]
});`
    },
    langgraph: {
      name: "LangGraph Multi-Agent Orchestration",
      badge: "AGENTIC REASONING // GRAPH CYCLES",
      desc: "Designing stateful multi-agent graphs with task decomposition, evaluation cycles, and automated fallback routing.",
      code: `// LangGraph Workflow Node Mapping
const workflow = new StateGraph(AgentState)
  .addNode("planner", planResearchStep)
  .addNode("retriever", fetchGroundingCitations)
  .addEdge("planner", "retriever");`
    },
    rag: {
      name: "Statute & Legal RAG Architectures",
      badge: "SEMANTIC INGESTION // VECTOR RANKING",
      desc: "Engineered in Vidhan AI and BimaNyaya for legal circular ingestion, proportionate deductions, and verifiable citation lookup.",
      code: `// Legal Embeddings Context Injection
def query_statute_context(dispute_text: str):
    embeddings = embedding_engine.embed_query(dispute_text)
    return vector_store.similarity_search_by_vector(embeddings, k=5)`
    },
    chromadb: {
      name: "ChromaDB & Vector Databases",
      badge: "HIGH-DIMENSIONAL // HNSW INDEX",
      desc: "Fast in-memory and persistent vector index management for sub-second nearest-neighbor document retrieval.",
      code: `// Chroma Vector Collection Query
collection = chroma_client.get_or_create_collection("irdai_statutes")
results = collection.query(query_embeddings=[vec], n_results=4)`
    },
    pytorch: {
      name: "PyTorch & Deep Learning Models",
      badge: "NEURAL ARCHITECTURES // ML PIPELINES",
      desc: "Trained U-Net and SegFormer models for SAR satellite segmentation and neural recommendation scoring.",
      code: `// PyTorch Dual-Tower Forward Pass
class DualTower(nn.Module):
    def forward(self, user_vec, item_vec):
        return torch.cosine_similarity(self.user_net(user_vec), self.item_net(item_vec))`
    },
    sarvam: {
      name: "Sarvam AI Voice Synthesis",
      badge: "SPEECH AI // INDIAN REGIONAL AUDIO",
      desc: "Voice-note synthesis generating human-like regional audio campaigns dispatched to VIP WhatsApp leads in Prism.",
      code: `// Sarvam Voice Generator Dispatch
const audioBuffer = await sarvam.synthesize({
  text: campaignScript,
  voice: 'hi-IN-shweta',
  pace: 1.05
});`
    },
    springboot: {
      name: "Spring Boot 3 & Enterprise Architecture",
      badge: "JAVA ENTERPRISE // MVC & REST",
      desc: "Production auth gateways, JPA transactional entities, multi-role RBAC, and secure persistence in Healthcare System & Prism.",
      code: `// Spring Security Filter Configuration
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http.csrf(AbstractHttpConfigurer::disable)
               .authorizeHttpRequests(auth -> auth.requestMatchers("/api/**").authenticated())
               .build();
}`
    },
    fastapi: {
      name: "FastAPI High-Concurrency Backend",
      badge: "PYTHON ASYNC // ASGI 6000+ RPS",
      desc: "Async Python backends powering the AI brain, queue processors, and vector pipeline gateways.",
      code: `// FastAPI Async Task Endpoint
@app.post("/api/v1/dispatch-campaign")
async def dispatch_campaign(payload: CampaignSchema, bg_tasks: BackgroundTasks):
    bg_tasks.add_task(orchestrate_whatsapp_delivery, payload)
    return {"status": "ENQUEUED"}`
    },
    hibernate: {
      name: "Hibernate ORM & JPA Relations",
      badge: "DATA PERSISTENCE // 3NF ACID",
      desc: "Normalized schema mapping, relational integrity, and optimized JPQL query execution for healthcare and analytics databases.",
      code: `// JPA One-to-Many Clinical Appointment Mapping
@OneToMany(mappedBy = "physician", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
private List<Appointment> scheduledVisits;`
    },
    mysql: {
      name: "Normalized MySQL Architecture",
      badge: "RELATIONAL DB // INDEX OPTIMIZATION",
      desc: "3NF database schemas, composite indexing, and transaction-safe records across financial and enterprise systems.",
      code: `// Performance Composite Index
CREATE INDEX idx_user_timestamp ON campaign_logs (user_id, dispatch_timestamp DESC);`
    },
    microservices: {
      name: "Microservices Mesh & Async Queues",
      badge: "DISTRIBUTED // DOCKER & IPC",
      desc: "Decoupled 4-node architecture coordinating React, Spring Boot, FastAPI, and third-party gateways in InnoGrid Prism.",
      code: `// Monorepo Service Bridge
HTTP :5173 (React UI) -> :6500 (Spring Boot Core) -> :6700 (FastAPI Gateway) -> :6600 (FastAPI Brain)`
    },
    rbac: {
      name: "Enterprise Role-Based Access Control",
      badge: "SECURITY // JWT & IDENTITY TREES",
      desc: "Multi-tenant permission isolation across patient, doctor, and administrator domains.",
      code: `// Role Authorization Annotation
@PreAuthorize("hasRole('ADMIN') or hasAuthority('MODULE_ACCESS')")
public ResponseEntity<?> inspectKPIAnalytics();`
    },
    docker: {
      name: "Docker Containers & Orchestration",
      badge: "DEVOPS // REPRODUCIBLE BUILDS",
      desc: "Containerizing FastAPI brains, Go microservices, and React production builds with multi-stage images.",
      code: `// Multi-stage Production Container
FROM node:20-alpine AS builder
WORKDIR /app && COPY . . && RUN npm run build
FROM nginx:alpine && COPY --from=builder /app/dist /usr/share/nginx/html`
    },
    githubactions: {
      name: "GitHub Actions CI/CD Automation",
      badge: "CONTINUOUS DELIVERY // AUTOMATED TESTS",
      desc: "Automated linting, test suites, CodeQL security scanning, and automated deployment pipelines.",
      code: `// CI Pipeline Workflow
name: Deploy Main Pipeline
on: { push: { branches: [main] } }
jobs: { test_and_deploy: { runs-on: ubuntu-latest } }`
    },
    firebase: {
      name: "Firebase Cloud Auth & Firestore",
      badge: "CLOUD PLATFORM // AUTH & RULES",
      desc: "Enterprise user token verification and real-time workspace persistence across autonomous research sessions.",
      code: `// Firebase Token Verification
const decodedToken = await admin.auth().verifyIdToken(bearerToken);`
    },
    tableau: {
      name: "Tableau Quantitative BI Dashboards",
      badge: "BUSINESS INTELLIGENCE // NSE EQUITIES",
      desc: "Comparative financial performance dashboards contrasting NIFTY 50 equities with ML trend predictions.",
      code: `// Tableau Calculated Field
IF [Moving_Avg_20] > [Moving_Avg_50] THEN 'BULLISH BREAKOUT' ELSE 'BEARISH' END`
    },
    twilio: {
      name: "Twilio WhatsApp Business Gateway",
      badge: "MESSAGING // REST API INTEGRATION",
      desc: "Automated direct-to-WhatsApp media dispatch pipelines for VIP customer engagement.",
      code: `// Twilio Media Dispatch
await twilioClient.messages.create({
  from: 'whatsapp:+14155238886',
  to: targetPhone,
  mediaUrl: [compiledVisualCardUrl]
});`
    },
    linux: {
      name: "Linux Systems & POSIX Shell Scripting",
      badge: "SYSTEMS // BASH & KERNEL TUNING",
      desc: "Relocatable shell setup scripts, process daemon management, and high-throughput server configuration.",
      code: `#!/usr/bin/env bash
echo "Spinning up InnoGrid Monorepo microservices..."
./start.sh --port 6500 --env production &`
    }
  };

  const inspName = document.getElementById('insp-name');
  const inspBadge = document.getElementById('insp-badge');
  const inspDesc = document.getElementById('insp-desc');
  const inspCode = document.getElementById('insp-code');
  const allNodes = document.querySelectorAll('.tech-node');

  allNodes.forEach(nodeBtn => {
    nodeBtn.addEventListener('click', () => {
      allNodes.forEach(n => n.classList.remove('active-node'));
      nodeBtn.classList.add('active-node');

      const nodeKey = nodeBtn.getAttribute('data-node');
      const data = nodeData[nodeKey];
      if (data && inspName) {
        inspName.textContent = data.name;
        inspBadge.textContent = data.badge;
        inspDesc.textContent = data.desc;
        inspCode.textContent = data.code;

        // Micro-surge animation on the inspector box
        const inspectorBox = document.getElementById('node-inspector');
        inspectorBox.style.boxShadow = '0 0 40px rgba(0, 240, 255, 0.4)';
        setTimeout(() => {
          inspectorBox.style.boxShadow = '';
        }, 400);
      }
    });
  });

  // --------------------------------------------------------------------------
  // 5. STARK HUD INTERACTIVE CLI TERMINAL
  // --------------------------------------------------------------------------
  const cliForm = document.getElementById('cli-form');
  const cliInput = document.getElementById('cli-input');
  const cliOutput = document.getElementById('cli-output');

  function printLine(text, cssClass = '') {
    const line = document.createElement('div');
    line.className = `cli-line ${cssClass}`;
    line.innerHTML = text;
    cliOutput.appendChild(line);
    cliOutput.scrollTop = cliOutput.scrollHeight;
  }

  if (cliForm && cliInput && cliOutput) {
    cliForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const rawCmd = cliInput.value.trim();
      if (!rawCmd) return;

      printLine(`<span style="color:var(--arc-cyan);">stark://jayant&gt;</span> ${rawCmd}`);
      cliInput.value = '';

      const cmd = rawCmd.toLowerCase();

      switch (cmd) {
        case 'help':
          printLine(`<strong>AVAILABLE STARK DIRECTIVES:</strong>`);
          printLine(`  <span style="color:var(--arc-cyan);">projects</span>  : Inspect production case studies & architectures`);
          printLine(`  <span style="color:var(--arc-cyan);">skills</span>    : Display core technology capabilities`);
          printLine(`  <span style="color:var(--arc-cyan);">whoami</span>    : Display Jayant Shoundik dossier & merit metrics`);
          printLine(`  <span style="color:var(--arc-cyan);">contact</span>   : Transmit direct communication channels`);
          printLine(`  <span style="color:var(--arc-cyan);">arc</span>       : Trigger Arc-Reactor optical power surge`);
          printLine(`  <span style="color:var(--arc-cyan);">time</span>      : Return live UTC system timestamp`);
          printLine(`  <span style="color:var(--arc-cyan);">clear</span>     : Flush terminal output buffer`);
          break;

        case 'projects':
          printLine(`<strong>ACTIVE CASE STUDIES:</strong>`);
          printLine(`  [01] <strong>Vidhan AI</strong>: Legal AI Assistant & Statute Synthesizer (LangChain, ChromaDB)`);
          printLine(`  [02] <strong>Columbus</strong>: Autonomous AI Research Agent (React 19, Framer Motion)`);
          printLine(`  [03] <strong>InnoGrid Prism</strong>: Autonomous AI Marketing Engine (Gemini 2.5, Twilio)`);
          printLine(`  [04] <strong>Nautrace</strong>: Satellite SAR Oil-Spill Attribution (SIH-26143 NTRO)`);
          printLine(`  [05] <strong>Squarieean</strong>: Quantitative Financial & Stock Analytics Suite`);
          break;

        case 'skills':
          printLine(`<strong>SYSTEM CAPABILITY MATRIX:</strong>`);
          printLine(`  <strong>Frontend:</strong> React 19, Next.js, Tailwind CSS, HTML5 Canvas, Framer Motion`);
          printLine(`  <strong>AI / LLM:</strong> Gemini 2.5, LangGraph, Legal RAG, ChromaDB, PyTorch, Sarvam AI`);
          printLine(`  <strong>Backend:</strong> Spring Boot 3, FastAPI, Hibernate JPA, MySQL, Microservices`);
          printLine(`  <strong>Cloud:</strong> Docker, GitHub Actions, Firebase Auth, Tableau, Linux`);
          break;

        case 'whoami':
          printLine(`<strong>DOSSIER // JAYANT SHOUNDIK:</strong>`);
          printLine(`  Role: Frontend & AI Architect // Founding Engineer`);
          printLine(`  Education: B.Tech in Web Technology (2023-2027) @ C.V. Raman Global University`);
          printLine(`  Academic Merit: CGPA 8.9 (Top Tier)`);
          printLine(`  Accolades: Winner CGU MUN (Highest Commendation), Winner Tech Vision 2047`);
          printLine(`  Experience: Software Developer Intern @ Satpathy Solutions`);
          break;

        case 'contact':
          printLine(`<strong>TRANSMISSION CHANNELS:</strong>`);
          printLine(`  Email: <a href="mailto:shoundikjayant@gmail.com" style="color:var(--arc-cyan);">shoundikjayant@gmail.com</a>`);
          printLine(`  Phone: +91 7070203434`);
          printLine(`  LinkedIn: <a href="https://linkedin.com/in/jayant-shoundik" target="_blank" style="color:var(--arc-cyan);">linkedin.com/in/jayant-shoundik</a>`);
          printLine(`  GitHub: <a href="https://github.com/JayantShoundik" target="_blank" style="color:var(--arc-cyan);">github.com/JayantShoundik</a>`);
          break;

        case 'arc':
          printLine(`<span style="color:var(--arc-cyan);">[ARC_REACTOR]</span> Power output surged to 120%. Commencing particle burst...`);
          const heroPort = document.getElementById('hero-portrait');
          if (heroPort) {
            heroPort.style.boxShadow = '0 0 100px rgba(0, 240, 255, 0.8), 0 0 140px rgba(139, 92, 246, 0.6)';
            setTimeout(() => {
              heroPort.style.boxShadow = '';
            }, 1200);
          }
          break;

        case 'time':
          printLine(`System Timestamp: ${new Date().toUTCString()}`);
          break;

        case 'clear':
          cliOutput.innerHTML = '';
          break;

        default:
          printLine(`Command not recognized: '<span style="color:var(--stark-red);">${rawCmd}</span>'. Type '<span style="color:var(--arc-cyan);">help</span>' for manual.`, 'banner-line');
          break;
      }
    });
  }

  // --------------------------------------------------------------------------
  // 6. INTERACTIVE PROJECT DETAIL MODALS
  // --------------------------------------------------------------------------
  const projectDetails = {
    "legal-ai": {
      tag: "Case Study 01.1 // Legal AI",
      title: "Vidhan AI & Legal Assistant",
      subtitle: "Autonomous statutory contract analyzer & liability detection engine",
      overview: "Vidhan AI resolves complex legal inquiries by digesting dense commercial contracts, statutes, and legal rulings. Employs domain-tuned RAG vectors to compute clause liability scores, detect unfavorable indemnities, and formulate admissible dispute replies.",
      architecture: `[Document Ingestion (PDF / Acts)] ──> [Recursive Chunking & Embeddings]
      │
      ▼
[ChromaDB Vector Store] ──> [Context Retrieval Engine]
      │
      ▼
[LangChain Prompt Pipeline + LLM] ──> [Fact-Checked Legal Summary + Citations]`,
      highlights: [
        "Domain-specific RAG indexing statutory penal codes and commercial precedents.",
        "Automatic clause extraction and liability exposure risk scoring.",
        "FastAPI backend with structured JSON schema responses and citation linking."
      ],
      tech: ["Python", "LangChain", "ChromaDB", "FastAPI", "Transformers"],
      github: "https://github.com/JayantShoundik/legal-ai-assistant"
    },

    "research-frontend": {
      tag: "Case Study 01.2 // Autonomous Agents",
      title: "Columbus — AI Research Agent",
      subtitle: "Interactive research platform with real-time markdown streaming & reasoning traces",
      overview: "Columbus empowers researchers to break down complex queries into iterative investigation trees. Features dynamic token-by-token streaming markdown rendering, recursive thought decomposition, and collaborative workspace persistence.",
      architecture: `[Client: React 19 + Framer Motion]
      │ (WebSocket / SSE Stream)
      ▼
[FastAPI Agent Orchestrator]
      ├──> [Decomposition Agent: Task Planner]
      ├──> [Retrieval Agent: Web Grounding & Citation Ingestion]
      └──> [Synthesis Agent: Structured Markdown Generator]
      │
      ▼
[Firebase Encrypted Cloud Workspace]`,
      highlights: [
        "Real-time token-streaming markdown parser with LaTeX formula & citation tooltips.",
        "Animated reasoning graph displaying recursive multi-agent steps.",
        "Multi-tenant session state backed by Firebase Auth and firestore schemas."
      ],
      tech: ["React 19", "TypeScript", "Framer Motion", "Lucide React", "Firebase", "Python"],
      github: "https://github.com/JayantShoundik/frontend"
    },

    prism: {
      tag: "Case Study 01.3 // InnoGrid Startup",
      title: "InnoGrid Prism // Autonomous Marketing Engine",
      subtitle: "Multi-modal visual campaign synthesizer and automated WhatsApp delivery gateway",
      overview: "Prism converts raw customer profiles and product catalogs into automated, hyper-personalized visual campaigns. Built as a high-throughput monorepo architecture, it coordinates React UI dashboards, Spring Boot persistence, FastAPI Gemini 2.5 prompt engines, and Sarvam AI voice synthesis.",
      architecture: `[React UI :5173] ──> [Spring Boot :6500] (Firebase Auth, User Roles, DB)
      │
      └──> [FastAPI Gateway :6700] (Async Task Queue)
             ├──> [FastAPI Brain :6600] (Gemini 2.5 RAG + html2image compilation)
             ├──> [Sarvam AI API] (Speech & Voice synthesis)
             └──> [Twilio REST API] (Automated WhatsApp VIP Dispatch)`,
      highlights: [
        "Interactive brand kit setup (KYC) and dynamic visual template compilation.",
        "RAG-driven Gemini 2.5 context matching recommendations to customer demographic personas.",
        "Zero-latency background worker threads dispatching media assets and voice notes directly via WhatsApp.",
        "Monorepo architecture with Spring Boot JPA entities and relocatable local environment scripts."
      ],
      tech: ["React", "Vite", "Spring Boot", "FastAPI", "Gemini 2.5", "Sarvam AI", "Twilio", "Firebase Auth"],
      github: "https://github.com/JayantShoundik/prism"
    },

    nautrace: {
      tag: "Case Study 01.4 // SIH-26143 NTRO",
      title: "Nautrace — Satellite Oil-Spill Attribution",
      subtitle: "Maritime forensic pipeline with Sentinel-1 SAR, SegFormer, OpenDrift & AIS correlation",
      overview: "Formulated for National Technical Research Organisation (NTRO) Problem Statement 26143. Solves maritime pollution forensics by detecting SAR oil slicks, eliminating look-alike false alarms, running hydrodynamic Lagrangian reverse-drift modeling, and attributing candidate vessels with probabilistic confidence.",
      architecture: `[Copernicus Sentinel-1 GRD SAR] (Dual-pol VV/VH)
      │
      ▼
[SegFormer / U-Net Segmentation Engine] (Feature Mask & Slick Polygon)
      │
      ▼
[Lagrangian Drift Hindcast: OpenDrift / Copernicus Marine SMOC + ECMWF Wind]
      │
      ▼
[Historical AIS Trajectory Reconstructor]
      │
      ▼
[Attribution Engine: Ranked Candidate Vessels & Evidentiary Report]`,
      highlights: [
        "False-positive reduction against low wind, biogenic slicks, and oceanic look-alikes.",
        "Copernicus Marine SMOC hourly surface currents (Stokes drift + tidal + circulation physics).",
        "Deterministic OpenDrift/OpenOil backward trajectory hindcasting engine.",
        "Complies with legal and evidentiary maritime intelligence standards."
      ],
      tech: ["Sentinel-1 SAR", "SegFormer", "U-Net", "OpenDrift", "Copernicus SMOC", "AIS Trajectories", "Python"],
      github: "https://github.com/JayantShoundik"
    },

    "stock-analytics": {
      tag: "Case Study 01.5 // Quantitative Algorithms",
      title: "Squarieean & Stock Analytics Suite",
      subtitle: "NSE algorithmic data pipelines, ML price regression, and Tableau dashboards",
      overview: "End-to-end quantitative financial analysis suite collecting Indian equity market data (NSE/NIFTY50), generating technical momentum features (SMA, EMA, RSI, Bollinger Bands), and predicting price trends.",
      architecture: `[NSE Market Data Ingestion]
      │
      ▼
[Pandas / NumPy Feature Engineering: SMA, EMA, RSI, Bollinger Bands]
      │
      ├──> [ML Regression Engine (Scikit-Learn)]
      └──> [Interactive Business Intelligence Dashboard (Tableau)]`,
      highlights: [
        "Engineered automated pipelines for volume anomaly detection and momentum breakout signals.",
        "Trained ML regression models for short-horizon equity trajectory prediction.",
        "Interactive Tableau dashboard providing comparative performance against NIFTY 50."
      ],
      tech: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Tableau", "Flask"],
      github: "https://github.com/JayantShoundik/stock_analytics_dashboard"
    }
  };

  const modalBackdrop = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  function openModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    modalContent.innerHTML = `
      <span class="modal-hero-tag">${data.tag}</span>
      <h2 class="modal-title">${data.title}</h2>
      <p class="modal-subtitle">${data.subtitle}</p>

      <div class="modal-section-title">System Overview</div>
      <p class="modal-body-text">${data.overview}</p>

      <div class="modal-section-title">System Architecture Flow</div>
      <div class="modal-flow-box">
        <pre><code>${data.architecture}</code></pre>
      </div>

      <div class="modal-section-title">Engineering Highlights</div>
      <ul style="list-style:none; padding-left:0; margin-bottom:20px; display:flex; flex-direction:column; gap:8px;">
        ${data.highlights.map(h => `<li style="font-size:0.88rem; color:var(--text-secondary); position:relative; padding-left:18px;"><span style="position:absolute; left:0; color:var(--arc-cyan); font-weight:bold;">✓</span> ${h}</li>`).join('')}
      </ul>

      <div class="modal-section-title">Technology Stack</div>
      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:24px;">
        ${data.tech.map(t => `<span class="hud-badge badge-cyan">${t}</span>`).join('')}
      </div>

      <div class="modal-action-row">
        ${data.github ? `
          <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn-stark btn-stark-primary btn-sm">
            <span>INSPECT REPOSITORY ON GITHUB</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
          </a>
        ` : ''}
        <button class="btn-stark btn-stark-outline btn-sm" id="inner-close-btn">CLOSE HUD</button>
      </div>
    `;

    modalBackdrop.classList.add('active');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const innerClose = document.getElementById('inner-close-btn');
    if (innerClose) {
      innerClose.addEventListener('click', closeModal);
    }
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  // --------------------------------------------------------------------------
  // 7. COPY EMAIL TO CLIPBOARD WITH HUD TOAST
  // --------------------------------------------------------------------------
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');

  function triggerToast(msg) {
    if (!toast) return;
    toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('shoundikjayant@gmail.com').then(() => {
        triggerToast('COPIED: shoundikjayant@gmail.com');
      }).catch(() => {
        triggerToast('EMAIL: shoundikjayant@gmail.com');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 8. MOBILE NAVIGATION
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const hudNav = document.getElementById('hud-nav');

  if (mobileToggle && hudNav) {
    mobileToggle.addEventListener('click', () => {
      hudNav.classList.toggle('mobile-open');
    });

    hudNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hudNav.classList.remove('mobile-open');
      });
    });
  }
});
