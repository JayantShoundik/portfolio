/**
 * JAYANT SHOUNDIK — STUDIO PORTFOLIO CONTROLLER
 * Handles scroll reveal animations, dual-split interactive hover, modals, and clipboard copy
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Data Store for Deep-Dive Project Modals
  const projectDetails = {
    prism: {
      tag: "Startup Engineering // InnoGrid",
      title: "Prism — Autonomous AI Marketing Engine",
      subtitle: "Multi-modal visual campaign synthesizer and WhatsApp delivery gateway",
      overview: "Prism converts raw customer profiles and product catalogs into automated, hyper-personalized campaigns. Built as a high-throughput monorepo architecture, it coordinates React UI dashboards, Spring Boot persistence, FastAPI Gemini 2.5 prompt engines, and Sarvam AI voice synthesis.",
      architecture: `[React UI :5173] ──> [Spring Boot :6500] (Firebase Auth, User Roles, DB)
      │
      └──> [FastAPI Gateway :6700] (Async Task Queue)
             ├──> [FastAPI Brain :6600] (Gemini 2.5 RAG + html2image compilation)
             ├──> [Sarvam AI API] (Speech & Voice synthesis)
             └──> [Twilio REST API] (Automated WhatsApp VIP Dispatch)`,
      highlights: [
        "Interactive brand kit setup (KYC) and dynamic visual template generation.",
        "RAG-driven Gemini 2.5 model context matching recommendations to customer demographic personas.",
        "Zero-latency background worker threads dispatching media assets and voice notes directly via WhatsApp.",
        "Monorepo architecture with Spring Boot JPA entities and relocatable local environment scripts."
      ],
      tech: ["React", "Vite", "Spring Boot", "FastAPI", "Gemini 2.5", "Sarvam AI", "Twilio", "Firebase Auth"],
      github: "https://github.com/JayantShoundik/prism"
    },

    nautrace: {
      tag: "Defense & Deep Tech // SIH-26143 NTRO",
      title: "Nautrace — Satellite Oil-Spill Detection & Hindcasting",
      subtitle: "Maritime forensic pipeline with Sentinel-1 SAR, SegFormer, OpenDrift & AIS correlation",
      overview: "Formulated for National Technical Research Organisation (NTRO) Problem Statement 26143. Solves maritime pollution forensics by detecting SAR oil slicks, eliminating look-alike false alarms, running hydrodynamic Lagrangian reverse-drift modeling, and attributing candidate vessels with probabilistic confidence.",
      architecture: `[Copernicus Sentinel-1 GRD SAR]
      │ (Dual-pol VV/VH)
      ▼
[SegFormer / U-Net Segmentation Engine]
      │ (Feature Mask & Slick Polygon)
      ▼
[Lagrangian Drift Hindcast: OpenDrift / Copernicus Marine SMOC + ECMWF Wind]
      │ (Probable Space-Time Spill Window)
      ▼
[Historical AIS Trajectory Reconstructor]
      │
      ▼
[Attribution Engine: Ranked Candidate Vessels & Evidentiary Report]`,
      highlights: [
        "False-positive reduction against low wind, biogenic slicks, and oceanic look-alikes.",
        "Copernicus Marine SMOC hourly surface currents (Stokes drift + tidal + circulation physics).",
        "Deterministic OpenDrift/OpenOil backward trajectory hindcasting engine.",
        "Complies with legal and evidentiary maritime intelligence standards (EMSA CleanSeaNet benchmarks)."
      ],
      tech: ["Sentinel-1 SAR", "SegFormer", "U-Net", "OpenDrift", "Copernicus SMOC", "AIS Trajectories", "Python"],
      github: "https://github.com/JayantShoundik"
    },

    "research-frontend": {
      tag: "Autonomous Systems // Research AI",
      title: "Research AI Agent & Streaming Workspace",
      subtitle: "Production AI research dashboard with real-time markdown streaming & agent thoughts",
      overview: "An interactive research platform enabling users to decompose dense topics into multi-agent investigation workflows. Features real-time token streaming markdown parsing, interactive agent step visualization, and collaborative workspace saving.",
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
        "Live token-by-token markdown parsing with interactive LaTeX and citation tooltips.",
        "Dynamic thought timeline displaying recursive reasoning states.",
        "Multi-session project management backed by Firebase Auth and firestore schemas."
      ],
      tech: ["React 19", "TypeScript", "Framer Motion", "Lucide React", "Firebase", "Python"],
      github: "https://github.com/JayantShoundik/frontend"
    },

    bimanyaya: {
      tag: "InsurTech AI // Grievance Redressal",
      title: "BimaNyaya (बीमान्याय) — AI Insurance Claim Dispute Platform",
      subtitle: "Democratizing insurance legal aid across India through RAG & rule engines",
      overview: "Enterprise platform designed to protect policyholders against unfair health insurance rejections, arbitrary room rent capping deductions, and proportionate deduction penalties.",
      architecture: `[TanStack Start React 19 SSR Web App + GSAP]
      │
      ├──> [FastAPI AI Engine: OCR + IRDAI Circulars RAG]
      ├──> [Go Microservices: Dispute Computation Engine]
      └──> [Convex DB: Reactive Policy State & Case Management]`,
      highlights: [
        "Automated OCR extraction of medical discharge summaries and hospital billings.",
        "Deterministic rule engines calculating proportionate room rent capping deductions.",
        "Retrieval-Augmented Generation (RAG) over IRDAI master circulars for legally admissible dispute drafts.",
        "Convex DB reactive data layer with TanStack Start SSR performance."
      ],
      tech: ["TanStack Start", "React 19", "FastAPI", "Go", "Convex DB", "OCR", "RAG"],
      github: "https://github.com/JayantShoundik/BimaNyaya"
    },

    smartrecsys: {
      tag: "Machine Learning // Real-Time Scoring",
      title: "SmartRecSys — Scalable Recommendation Engine",
      subtitle: "High-throughput vector retrieval and collaborative filtering architecture",
      overview: "Engineered for high-volume content and product discovery. Employs a dual-tower neural embedding model with approximate nearest neighbor (ANN) vector indexing for sub-10ms response times.",
      architecture: `[User Interaction Stream] ──> [Feature Extraction Pipeline]
      │
      ▼
[Vector ANN Index (HNSW / FAISS)] ──> [Top-K Candidate Retrieval]
      │
      ▼
[Neural Re-Ranking Model (PyTorch)] ──> [Redis Cached Real-Time Output]`,
      highlights: [
        "Hybrid scoring combining collaborative behavioral signals and semantic content embeddings.",
        "Sub-10ms retrieval latency utilizing FAISS vector clustering and Redis caching.",
        "Modular Python architecture with clean test coverage and reproducible benchmarks."
      ],
      tech: ["Python", "PyTorch", "FAISS", "FastAPI", "Redis", "Scikit-Learn"],
      github: "https://github.com/JayantShoundik/SmartRecSys"
    },

    "legal-ai": {
      tag: "NLP & LLMs // Legal Assistant",
      title: "Legal AI Assistant & Statute Synthesizer",
      subtitle: "Autonomous contract query engine with citation and liability detection",
      overview: "Streamlines commercial and statutory legal research by analyzing lengthy agreements, identifying potential liability traps, and providing verifiable statutory references.",
      architecture: `[Document Ingestion (PDF / DOCX)] ──> [Recursive Chunking & Embeddings]
      │
      ▼
[ChromaDB Vector Store] ──> [Context Retrieval Engine]
      │
      ▼
[LangChain Prompt Pipeline + LLM] ──> [Fact-Checked Legal Summary]`,
      highlights: [
        "Domain-specific RAG indexing statutory penal codes and commercial precedents.",
        "Automatic clause extraction and liability exposure scoring.",
        "FastAPI backend with structured JSON schema outputs."
      ],
      tech: ["Python", "LangChain", "ChromaDB", "FastAPI", "Transformers"],
      github: "https://github.com/JayantShoundik/legal-ai-assistant"
    },

    healthcare: {
      tag: "Enterprise Full-Stack // Java Spring Boot",
      title: "Enterprise Healthcare Management System",
      subtitle: "Normalized multi-role hospital management with Spring Boot & MySQL",
      overview: "Production-ready hospital operations platform managing patient admissions, clinical scheduling, physician diagnostics, and administrative KPI tracking.",
      architecture: `[Front Client UI (JSP / Bootstrap)]
      │
      ▼
[Spring Boot Security & MVC Controllers]
      │
      ▼
[Hibernate / JPA ORM Layer]
      │
      ▼
[Normalized MySQL Database (Patients, Doctors, Appointments, Logs)]`,
      highlights: [
        "Strict Role-Based Access Control (RBAC) across patient, physician, and admin personas.",
        "Normalized 3NF relational schema with ACID transactional integrity.",
        "Audit logging and automated appointment conflict resolution."
      ],
      tech: ["Java", "Spring Boot", "Hibernate/JPA", "MySQL", "Spring Security", "REST API"],
      github: "https://github.com/JayantShoundik/HealthcareSystem"
    },

    "stock-analytics": {
      tag: "Financial Engineering // ML & Tableau",
      title: "Stock Analytics Dashboard & Algorithmic Suite",
      subtitle: "NSE algorithmic data pipelines, ML price regression, and Tableau dashboards",
      overview: "End-to-end quantitative financial analysis suite collecting Indian equity market data (NSE/NIFTY50), generating technical momentum features, and predicting price trends.",
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

  // 2. Scroll Reveal Observer
  const revealItems = document.querySelectorAll('.reveal-item');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('revealed'));
  }

  // 3. Interactive Hero Split Parallax / Tilt
  const portraitCard = document.getElementById('portrait-card');
  const heroLeft = document.querySelector('.hero-left-role');
  const heroRight = document.querySelector('.hero-right-role');

  if (portraitCard && heroLeft && heroRight) {
    heroLeft.addEventListener('mouseenter', () => {
      portraitCard.style.transform = 'translateY(-8px) rotate(-1.5deg) scale(1.02)';
      portraitCard.style.boxShadow = '0 24px 48px -12px rgba(14, 165, 233, 0.2)';
    });
    heroLeft.addEventListener('mouseleave', () => {
      portraitCard.style.transform = '';
      portraitCard.style.boxShadow = '';
    });

    heroRight.addEventListener('mouseenter', () => {
      portraitCard.style.transform = 'translateY(-8px) rotate(1.5deg) scale(1.02)';
      portraitCard.style.boxShadow = '0 24px 48px -12px rgba(99, 102, 241, 0.2)';
    });
    heroRight.addEventListener('mouseleave', () => {
      portraitCard.style.transform = '';
      portraitCard.style.boxShadow = '';
    });
  }

  // 4. Modal Controller
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

      <div class="modal-section-title">Key Engineering Highlights</div>
      <ul class="clean-checklist">
        ${data.highlights.map(h => `<li>${h}</li>`).join('')}
      </ul>

      <div class="modal-section-title">Technologies &amp; Tools</div>
      <div class="tag-row">
        ${data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>

      <div class="modal-action-row">
        ${data.github ? `
          <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn-studio btn-studio-dark btn-sm">
            <span>Explore Repository on GitHub</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
          </a>
        ` : ''}
        <button class="btn-studio btn-studio-outline btn-sm" id="inner-close-btn">Close Inspector</button>
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

  modalCloseBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  // 5. Mobile Navigation
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const studioNav = document.getElementById('studio-nav');

  if (mobileToggle && studioNav) {
    mobileToggle.addEventListener('click', () => {
      studioNav.classList.toggle('mobile-open');
    });

    studioNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        studioNav.classList.remove('mobile-open');
      });
    });
  }

  // 6. Copy Email Action with Toast
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');

  function showToast(message) {
    if (!toast) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('jshoundik06@gmail.com').then(() => {
        showToast('Email copied: jshoundik06@gmail.com');
      }).catch(() => {
        showToast('Direct email: jshoundik06@gmail.com');
      });
    });
  }
});
