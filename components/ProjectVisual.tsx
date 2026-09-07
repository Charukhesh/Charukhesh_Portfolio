"use client";

import { motion } from "framer-motion";

const drawVariant = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const } }
};

function FlowLatentMPCViz() {
  return (
    <svg viewBox="0 0 480 300" className="h-full w-full">
      <g stroke="#1c212a" strokeWidth={1}>
        {[0, 60, 120, 180, 240].map((y) => (
          <line key={y} x1="0" y1={y + 20} x2="480" y2={y + 20} />
        ))}
      </g>
      {/* candidate (unselected) trajectories */}
      {[
        "M40,250 C110,220 140,150 190,130 S260,80 320,55",
        "M40,250 C90,230 130,190 180,170 S280,110 330,90",
        "M40,250 C100,240 120,200 170,190 S250,140 300,120"
      ].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="#3a4048"
          strokeWidth={1.4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={drawVariant}
          transition={{ duration: 1.1, delay: i * 0.15 }}
        />
      ))}
      {/* selected / optimal trajectory */}
      <motion.path
        d="M40,250 C120,215 150,130 210,110 S300,60 360,40"
        fill="none"
        stroke="#d7a24a"
        strokeWidth={2.6}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={drawVariant}
        transition={{ duration: 1.3, delay: 0.5 }}
      />
      <circle cx="40" cy="250" r="5" fill="#e7e9ec" />
      <circle cx="360" cy="40" r="6" fill="#d7a24a" />
      <text x="20" y="272" fontFamily="IBM Plex Mono" fontSize="10" fill="#767f8b">
        observation
      </text>
      <text x="330" y="30" fontFamily="IBM Plex Mono" fontSize="10" fill="#d7a24a">
        verified goal
      </text>
      <text x="150" y="292" fontFamily="IBM Plex Mono" fontSize="9.5" fill="#5a6068">
        16 candidates → V-JEPA verification → optimal trajectory
      </text>
    </svg>
  );
}

function SceneGraphViz() {
  const nodes = [
    { x: 60, y: 60, label: "table" },
    { x: 150, y: 40, label: "plate" },
    { x: 150, y: 120, label: "cup" },
    { x: 260, y: 80, label: "counter" },
    { x: 360, y: 60, label: "sink" },
    { x: 360, y: 140, label: "dishwasher" }
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [0, 3],
    [3, 4],
    [3, 5]
  ];
  return (
    <svg viewBox="0 0 460 220" className="h-full w-full">
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="#5fb8b0aa"
          strokeWidth={1.3}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 * i }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.12 * i }}
        >
          <circle cx={n.x} cy={n.y} r={7} fill="#12151a" stroke={i === 3 ? "#d7a24a" : "#5fb8b0"} strokeWidth={1.5} />
          <text x={n.x} y={n.y - 14} textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="10" fill="#aeb6c0">
            {n.label}
          </text>
        </motion.g>
      ))}
      <text x="20" y="200" fontFamily="IBM Plex Mono" fontSize="9.5" fill="#5a6068">
        depth scan → hierarchical 3D scene graph → grounded LLM plan
      </text>
    </svg>
  );
}

function StochasticControlViz() {
  return (
    <svg viewBox="0 0 460 220" className="h-full w-full">
      {/* uncertainty envelope */}
      <motion.path
        d="M20,140 C100,120 180,100 260,90 S380,60 440,50 L440,90 C380,100 260,130 180,140 S100,165 20,180 Z"
        fill="#5fb8b01a"
        stroke="none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
      {/* risk boundary (dashed) */}
      <line x1="20" y1="180" x2="440" y2="95" stroke="#c17b6f" strokeWidth={1.3} strokeDasharray="4 5" />
      <text x="360" y="88" fontFamily="IBM Plex Mono" fontSize="9.5" fill="#c17b6f">
        CVaR risk boundary
      </text>
      {/* control horizon markers */}
      {[120, 220, 320].map((x, i) => (
        <line key={i} x1={x} y1="30" x2={x} y2="200" stroke="#242a32" strokeWidth={1} strokeDasharray="2 4" />
      ))}
      {/* nominal state trajectory */}
      <motion.path
        d="M20,160 C100,140 180,120 260,110 S380,80 440,70"
        fill="none"
        stroke="#d7a24a"
        strokeWidth={2.4}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={drawVariant}
      />
      <text x="20" y="205" fontFamily="IBM Plex Mono" fontSize="9.5" fill="#5a6068">
        state estimate · uncertainty envelope · re-solved every horizon step
      </text>
    </svg>
  );
}

function HRESViz() {
  const sources = [
    { x: 40, y: 40, label: "solar" },
    { x: 40, y: 100, label: "wind" },
    { x: 40, y: 160, label: "battery" }
  ];
  return (
    <svg viewBox="0 0 460 220" className="h-full w-full">
      {sources.map((s, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
        >
          <rect x={s.x - 22} y={s.y - 14} width={44} height={28} rx={4} fill="none" stroke="#5fb8b0" strokeWidth={1.2} />
          <text x={s.x} y={s.y + 4} textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="9" fill="#5fb8b0">
            {s.label}
          </text>
          <line x1={s.x + 22} y1={s.y} x2={190} y2={100} stroke="#242a32" strokeWidth={1} />
        </motion.g>
      ))}
      {/* optimization landscape contours */}
      {[70, 50, 30].map((r, i) => (
        <motion.ellipse
          key={i}
          cx="300"
          cy="100"
          rx={r + 40}
          ry={r}
          fill="none"
          stroke="#d7a24a"
          strokeWidth={1}
          opacity={0.35 + i * 0.15}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.35 + i * 0.15 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.1 }}
        />
      ))}
      {/* monte carlo scatter */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        const r = 20 + ((i * 37) % 55);
        const x = 300 + Math.cos(angle) * r;
        const y = 100 + Math.sin(angle) * r * 0.55;
        return (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={1.6}
            fill="#aeb6c0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + (i % 12) * 0.03 }}
          />
        );
      })}
      <text x="20" y="205" fontFamily="IBM Plex Mono" fontSize="9.5" fill="#5a6068">
        synthetic generation profiles → multi-objective sizing → 25-yr Monte Carlo reliability
      </text>
    </svg>
  );
}

function RiskAwareMPCVisual() {
  return (
    <svg
      viewBox="0 0 900 190"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full"
      fontFamily="IBM Plex Mono"
    >
      <defs>
        <marker
          id="risk-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="#5a6068" />
        </marker>
      </defs>

      <g fill="none" stroke="#3a4048" strokeWidth="1.3">
        <rect x="20" y="60" width="145" height="70" rx="3" />
        <rect x="205" y="60" width="160" height="70" rx="3" stroke="#5fb8b0" />
        <rect x="405" y="25" width="180" height="65" rx="3" stroke="#d7a24a" />
        <rect x="405" y="105" width="180" height="65" rx="3" />
        <rect x="625" y="60" width="150" height="70" rx="3" />
        <rect x="815" y="60" width="65" height="70" rx="3" />
      </g>

      <g
        stroke="#5a6068"
        strokeWidth="1.2"
        markerEnd="url(#risk-arrow)"
      >
        <line x1="165" y1="95" x2="203" y2="95" />
        <line x1="365" y1="80" x2="403" y2="58" />
        <line x1="365" y1="110" x2="403" y2="137" />
        <line x1="585" y1="58" x2="623" y2="90" />
        <line x1="585" y1="137" x2="623" y2="100" />
        <line x1="775" y1="95" x2="813" y2="95" />
      </g>

      <g fill="#dde2e7" fontSize="12">
        <text x="38" y="88">Local perception</text>
        <text x="38" y="105" fill="#767f8b">sensor observations</text>

        <text x="223" y="88" fill="#5fb8b0">Occupancy grid</text>
        <text x="223" y="105" fill="#767f8b">free / occupied / unknown</text>

        <text x="423" y="53" fill="#d7a24a">A* global planner</text>
        <text x="423" y="70" fill="#767f8b">reference trajectory</text>

        <text x="423" y="133">Risk-aware MPC</text>
        <text x="423" y="150" fill="#767f8b">chance constraints · 1% risk</text>

        <text x="643" y="88">Control action</text>
        <text x="643" y="105" fill="#767f8b">receding horizon</text>

        <text x="825" y="88">UAV</text>
        <text x="825" y="105" fill="#767f8b">motion</text>
      </g>

      <text
        x="450"
        y="184"
        textAnchor="middle"
        fill="#767f8b"
        fontSize="11"
      >
        Gaussian obstacle uncertainty → dynamic clearance margins → probabilistic safety
      </text>
    </svg>
  );
}

function AdaptiveKFVisual() {
  return (
    <svg
      viewBox="0 0 900 190"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full"
      fontFamily="IBM Plex Mono"
    >
      <defs>
        <marker
          id="kf-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="#5a6068" />
        </marker>
      </defs>

      <g fill="none" stroke="#3a4048" strokeWidth="1.3">
        <rect x="20" y="60" width="150" height="70" rx="3" />
        <rect x="215" y="60" width="145" height="70" rx="3" stroke="#5fb8b0" />
        <rect x="405" y="20" width="180" height="65" rx="3" />
        <rect x="405" y="105" width="180" height="65" rx="3" stroke="#d7a24a" />
        <rect x="625" y="60" width="150" height="70" rx="3" />
        <rect x="815" y="60" width="65" height="70" rx="3" />
      </g>

      <g
        stroke="#5a6068"
        strokeWidth="1.2"
        markerEnd="url(#kf-arrow)"
      >
        <line x1="170" y1="95" x2="213" y2="95" />
        <line x1="360" y1="82" x2="403" y2="55" />
        <line x1="360" y1="108" x2="403" y2="137" />
        <line x1="585" y1="55" x2="623" y2="90" />
        <line x1="585" y1="137" x2="623" y2="100" />
        <line x1="775" y1="95" x2="813" y2="95" />
      </g>

      <g fill="#dde2e7" fontSize="12">
        <text x="38" y="88">Physical system</text>
        <text x="38" y="105" fill="#767f8b">mass–spring–damper</text>

        <text x="233" y="88" fill="#5fb8b0">Noisy observations</text>
        <text x="233" y="105" fill="#767f8b">position + velocity</text>

        <text x="423" y="48">Standard / Adaptive KF</text>
        <text x="423" y="65" fill="#767f8b">innovation-driven Q update</text>

        <text x="423" y="133" fill="#d7a24a">Targeted Injection KF</text>
        <text x="423" y="150" fill="#767f8b">χ² test → velocity covariance</text>

        <text x="643" y="88">State estimate</text>
        <text x="643" y="105" fill="#767f8b">x̂ₖ · Pₖ</text>

        <text x="827" y="88">RLS</text>
        <text x="827" y="105" fill="#767f8b">λₖ</text>
      </g>

      <text
        x="450"
        y="184"
        textAnchor="middle"
        fill="#767f8b"
        fontSize="11"
      >
        impulsive wall collision → innovation test → selective velocity uncertainty injection
      </text>
    </svg>
  );
}

function SINDYRLSVisual() {
  return (
    <svg
      viewBox="0 0 900 190"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full"
      fontFamily="IBM Plex Mono"
    >
      <defs>
        <marker
          id="sindy-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="#5a6068" />
        </marker>
      </defs>

      <g fill="none" stroke="#3a4048" strokeWidth="1.3">
        <rect x="20" y="60" width="145" height="70" rx="3" />
        <rect x="205" y="60" width="165" height="70" rx="3" stroke="#5fb8b0" />
        <rect x="410" y="60" width="165" height="70" rx="3" stroke="#d7a24a" />
        <rect x="615" y="60" width="150" height="70" rx="3" />
        <rect x="805" y="60" width="75" height="70" rx="3" />
      </g>

      <g
        stroke="#5a6068"
        strokeWidth="1.2"
        markerEnd="url(#sindy-arrow)"
      >
        <line x1="165" y1="95" x2="203" y2="95" />
        <line x1="370" y1="95" x2="408" y2="95" />
        <line x1="575" y1="95" x2="613" y2="95" />
        <line x1="765" y1="95" x2="803" y2="95" />
      </g>

      <g fill="#dde2e7" fontSize="12">
        <text x="38" y="88">Closed-loop data</text>
        <text x="38" y="105" fill="#767f8b">cart + pendulum + LQR</text>

        <text x="223" y="88" fill="#5fb8b0">Implicit SINDy</text>
        <text x="223" y="105" fill="#767f8b">two-pass STLSQ</text>

        <text x="428" y="88" fill="#d7a24a">Coupled dynamics</text>
        <text x="428" y="105" fill="#767f8b">plant + controller</text>

        <text x="633" y="88">RLS decoupling</text>
        <text x="633" y="105" fill="#767f8b">friction + LQR gains</text>

        <text x="823" y="88">Physical</text>
        <text x="823" y="105">model</text>
      </g>

      <text
        x="450"
        y="160"
        textAnchor="middle"
        fill="#767f8b"
        fontSize="11"
      >
        Ghost Controller → structural discovery → controller–plant parameter separation
      </text>

      <text
        x="450"
        y="178"
        textAnchor="middle"
        fill="#5fb8b0"
        fontSize="11"
      >
        &lt;4% identification error on hidden LQR gains
      </text>
    </svg>
  );
}

function PlutusVisual() {
  return (
    <svg
      viewBox="0 0 900 190"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full"
      fontFamily="IBM Plex Mono"
    >
      <defs>
        <marker
          id="plutus-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="#5a6068" />
        </marker>
      </defs>

      <g fill="none" stroke="#3a4048" strokeWidth="1.3">
        <rect x="15" y="60" width="125" height="70" rx="3" />
        <rect x="170" y="60" width="135" height="70" rx="3" stroke="#5fb8b0" />
        <rect x="335" y="60" width="135" height="70" rx="3" stroke="#d7a24a" />
        <rect x="500" y="60" width="135" height="70" rx="3" />
        <rect x="665" y="60" width="110" height="70" rx="3" />
        <rect x="805" y="60" width="75" height="70" rx="3" />
      </g>

      <g
        stroke="#5a6068"
        strokeWidth="1.2"
        markerEnd="url(#plutus-arrow)"
      >
        <line x1="140" y1="95" x2="168" y2="95" />
        <line x1="305" y1="95" x2="333" y2="95" />
        <line x1="470" y1="95" x2="498" y2="95" />
        <line x1="635" y1="95" x2="663" y2="95" />
        <line x1="775" y1="95" x2="803" y2="95" />
      </g>

      <g fill="#dde2e7" fontSize="11.5">
        <text x="28" y="87">Market data</text>
        <text x="28" y="104" fill="#767f8b">RFQ / FOK flow</text>

        <text x="185" y="87" fill="#5fb8b0">Parameter inference</text>
        <text x="185" y="104" fill="#767f8b">betas · volatility</text>

        <text x="350" y="87" fill="#d7a24a">Monte Carlo</text>
        <text x="350" y="104" fill="#767f8b">1,000 paths · fair value</text>

        <text x="515" y="87">Risk / toxicity</text>
        <text x="515" y="104" fill="#767f8b">edge · variance · Kelly</text>

        <text x="680" y="87">Inventory skew</text>
        <text x="680" y="104" fill="#767f8b">85% capital cap</text>

        <text x="819" y="87">Quotes</text>
        <text x="819" y="104">/ fills</text>
      </g>

      <text
        x="450"
        y="160"
        textAnchor="middle"
        fill="#767f8b"
        fontSize="11"
      >
        daily pricing cache → millisecond-scale pricing → solvency-aware execution
      </text>

      <text
        x="450"
        y="178"
        textAnchor="middle"
        fill="#5fb8b0"
        fontSize="11"
      >
        survived all 20 adversarial simulation stages without bankruptcy
      </text>
    </svg>
  );
}

function QualityCastVisual() {
  return (
    <svg
      viewBox="0 0 900 190"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full"
      fontFamily="IBM Plex Mono"
    >
      <defs>
        <marker
          id="quality-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="#5a6068" />
        </marker>
      </defs>

      <g fill="none" stroke="#3a4048" strokeWidth="1.3">
        <rect x="15" y="60" width="120" height="70" rx="3" />
        <rect x="165" y="60" width="130" height="70" rx="3" stroke="#5fb8b0" />
        <rect x="325" y="60" width="130" height="70" rx="3" />
        <rect x="485" y="60" width="130" height="70" rx="3" stroke="#d7a24a" />
        <rect x="645" y="60" width="110" height="70" rx="3" />
        <rect x="785" y="60" width="95" height="70" rx="3" />
      </g>

      <g
        stroke="#5a6068"
        strokeWidth="1.2"
        markerEnd="url(#quality-arrow)"
      >
        <line x1="135" y1="95" x2="163" y2="95" />
        <line x1="295" y1="95" x2="323" y2="95" />
        <line x1="455" y1="95" x2="483" y2="95" />
        <line x1="615" y1="95" x2="643" y2="95" />
        <line x1="755" y1="95" x2="783" y2="95" />
      </g>

      <g fill="#dde2e7" fontSize="11.5">
        <text x="31" y="87">Raw images</text>
        <text x="31" y="104" fill="#767f8b">validation</text>

        <text x="182" y="87" fill="#5fb8b0">Airflow + DVC</text>
        <text x="182" y="104" fill="#767f8b">ETL · versioning</text>

        <text x="342" y="87">PyTorch</text>
        <text x="342" y="104" fill="#767f8b">training</text>

        <text x="502" y="87" fill="#d7a24a">MLflow</text>
        <text x="502" y="104" fill="#767f8b">registry · artifacts</text>

        <text x="662" y="87">FastAPI</text>
        <text x="662" y="104" fill="#767f8b">inference</text>

        <text x="801" y="87">Monitor</text>
        <text x="801" y="104" fill="#767f8b">+ HITL</text>
      </g>

      <text
        x="450"
        y="160"
        textAnchor="middle"
        fill="#767f8b"
        fontSize="11"
      >
        inference → Prometheus/Grafana → operator feedback → retraining
      </text>

      <text
        x="450"
        y="178"
        textAnchor="middle"
        fill="#5fb8b0"
        fontSize="11"
      >
        reproducible data + model lineage + readiness validation
      </text>
    </svg>
  );
}

const VISUALS: Record<string, () => JSX.Element> = {
  "flow-latent-mpc": FlowLatentMPCViz,
  "llm-scene-planner": SceneGraphViz,
  "thesis-tail-risk": StochasticControlViz,
  "hres-optimization": HRESViz,
  "risk-aware-stochastic-mpc": RiskAwareMPCVisual,
  "adaptive-kalman-rls": AdaptiveKFVisual,
  "sindy-rls-cart-pendulum": SINDYRLSVisual,
  "plutus-market-maker": PlutusVisual,
  "qualitycast-mlops": QualityCastVisual
};

export default function ProjectVisual({ slug }: { slug: string }) {
  const Viz = VISUALS[slug];
  if (!Viz) return null;
  return (
    <div className="flex aspect-[16/10] w-full items-center justify-center rounded-lg border border-border-soft bg-panel2 p-4">
      <Viz />
    </div>
  );
}
