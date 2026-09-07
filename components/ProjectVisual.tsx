"use client";

import { motion } from "framer-motion";

const drawVariant = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const } }
};

<defs>
  <marker
    id="sindy-arrow"
    markerWidth="8"
    markerHeight="8"
    refX="6"
    refY="3"
    orient="auto"
  >
    <path d="M0,0 L6,3 L0,6 Z" fill="#5fb8b0" />
  </marker>
</defs>

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
  const inputs = [
    { y: 35, label: "Solar Δ-GMM" },
    { y: 85, label: "Wind Clusters" },
    { y: 135, label: "BESS Degrad." }
  ];

  return (
    <svg viewBox="0 0 460 220" className="h-full w-full">
      {/* 1. WEATHER GENERATION (INPUTS) */}
      {inputs.map((input, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
        >
          <rect x="15" y={input.y - 14} width="90" height="28" rx="4" fill="#1e2329" stroke="#3a4048" strokeWidth={1.2} />
          <text x="60" y={input.y + 4} textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="9" fill="#dde2e7">
            {input.label}
          </text>
        </motion.g>
      ))}

      {/* Connection Lines 1 -> 2 */}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        stroke="#3a4048"
        strokeWidth={1}
        fill="none"
      >
        <path d="M 105 35 L 125 35 L 125 85 L 155 85" />
        <path d="M 105 85 L 155 85" />
        <path d="M 105 135 L 125 135 L 125 85 L 155 85" />
      </motion.g>

      {/* 2. ENDOGENOUS SIZING (PARETO FRONT) */}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      >
        {/* Axes */}
        <polyline points="165,35 165,150 265,150" stroke="#5a6068" strokeWidth={1} fill="none" />
        <text x="165" y="25" fontFamily="IBM Plex Mono" fontSize="8" fill="#767f8b">PPA Penalty</text>
        <text x="265" y="145" textAnchor="end" fontFamily="IBM Plex Mono" fontSize="8" fill="#767f8b">CapEx</text>

        {/* Pareto Curve */}
        <path d="M 175 50 Q 185 130 255 135" stroke="#4a5058" strokeWidth={1.5} fill="none" />
      </motion.g>

      {/* Pareto Architectures */}
      <motion.g initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.2 }}>
        {/* Arch A: Lean / Risky */}
        <circle cx="177" cy="62" r="3" fill="#d7a24a" />
        <text x="184" y="65" fontFamily="IBM Plex Mono" fontSize="8" fill="#d7a24a">Lean (A)</text>
        
        {/* Arch C: Oversized / Safe */}
        <circle cx="242" cy="133" r="3" fill="#5fb8b0" />
        <text x="242" y="125" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="8" fill="#5fb8b0">Oversized (C)</text>
      </motion.g>

      {/* Connection Lines 2 -> 3 */}
      <motion.path
        d="M 275 90 L 300 90"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5, duration: 0.5 }}
        stroke="#3a4048"
        strokeWidth={1}
        fill="none"
      />

      {/* 3. MONTE CARLO RISK ASSESSMENT (CDFs) */}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.8 }}
      >
        {/* Axes */}
        <polyline points="310,35 310,150 440,150" stroke="#5a6068" strokeWidth={1} fill="none" />
        <text x="310" y="25" fontFamily="IBM Plex Mono" fontSize="8" fill="#767f8b">P(IRR &lt; x)</text>
        <text x="440" y="145" textAnchor="end" fontFamily="IBM Plex Mono" fontSize="8" fill="#767f8b">15-yr IRR</text>

        {/* Target IRR Line */}
        <line x1="415" y1="35" x2="415" y2="150" stroke="#767f8b" strokeWidth={1} strokeDasharray="2 2" />
        <text x="415" y="25" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="8" fill="#767f8b">Target</text>
      </motion.g>

      {/* CDF Curves showing deterministic collapse */}
      {/* Safe/Oversized Curve - tight distribution */}
      <motion.path
        d="M 380 150 Q 410 145 415 45"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2.2, duration: 1, ease: "easeOut" }}
        stroke="#5fb8b0"
        strokeWidth={1.5}
        fill="none"
      />
      <motion.text
        x="375" y="85"
        fontFamily="IBM Plex Mono" fontSize="8" fill="#5fb8b0"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.6 }}
      >
        Arch C
      </motion.text>

      {/* Risky/Lean Curve - catastrophic tail */}
      <motion.path
        d="M 320 150 Q 350 120 415 45"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2.6, duration: 1, ease: "easeOut" }}
        stroke="#d7a24a"
        strokeWidth={1.5}
        fill="none"
      />
      <motion.text
        x="320" y="115"
        fontFamily="IBM Plex Mono" fontSize="8" fill="#d7a24a"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 3.2 }}
      >
        Arch A
      </motion.text>
      <motion.text
        x="320" y="125"
        fontFamily="IBM Plex Mono" fontSize="8" fill="#d7a24a"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 3.2 }}
      >
        (Risk Tail)
      </motion.text>

      {/* Global Caption */}
      <text x="230" y="195" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="9" fill="#5a6068">
        synthetic weather generation → endogenous NSGA-II sizing → 15-yr risk assessment (CDFs)
      </text>
    </svg>
  );
}

function RiskAwareMPCViz() {
  return (
    <svg viewBox="0 0 480 300" className="h-full w-full">
      {/* grid */}
      <g stroke="#1c212a" strokeWidth={1}>
        {[0, 60, 120, 180, 240].map((y) => (
          <line key={y} x1="0" y1={y + 20} x2="480" y2={y + 20} />
        ))}
      </g>

      {/* uncertain obstacle region */}
      <motion.ellipse
        cx="260"
        cy="135"
        rx="55"
        ry="38"
        fill="#d7a24a10"
        stroke="#d7a24a66"
        strokeDasharray="4 4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      />

      <circle
        cx="260"
        cy="135"
        r="12"
        fill="#12151a"
        stroke="#d7a24a"
        strokeWidth={1.8}
      />

      {/* candidate trajectories */}
      {[
        "M45,245 C120,230 175,185 245,155 S350,125 425,80",
        "M45,245 C125,220 180,150 235,125 S330,105 425,80",
        "M45,245 C125,250 180,230 230,205 S330,160 425,80",
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
          transition={{ duration: 1, delay: i * 0.15 }}
        />
      ))}

      {/* selected risk-aware trajectory */}
      <motion.path
        d="M45,245 C125,225 175,215 225,185 C270,158 285,195 330,165 S385,110 425,80"
        fill="none"
        stroke="#d7a24a"
        strokeWidth={2.6}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={drawVariant}
        transition={{ duration: 1.3, delay: 0.45 }}
      />

      {/* UAV */}
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <circle cx="45" cy="245" r="6" fill="#e7e9ec" />
        <line x1="35" y1="239" x2="55" y2="251" stroke="#e7e9ec" />
        <line x1="55" y1="239" x2="35" y2="251" stroke="#e7e9ec" />
      </motion.g>

      {/* goal */}
      <circle cx="425" cy="80" r="6" fill="#5fb8b0" />

      <text
        x="20"
        y="270"
        fontFamily="IBM Plex Mono"
        fontSize="10"
        fill="#767f8b"
      >
        UAV
      </text>

      <text
        x="228"
        y="116"
        fontFamily="IBM Plex Mono"
        fontSize="10"
        fill="#d7a24a"
      >
        uncertain obstacle
      </text>

      <text
        x="390"
        y="68"
        fontFamily="IBM Plex Mono"
        fontSize="10"
        fill="#5fb8b0"
      >
        goal
      </text>

      <text
        x="115"
        y="292"
        fontFamily="IBM Plex Mono"
        fontSize="9.5"
        fill="#5a6068"
      >
        noisy perception → chance constraint → risk-aware trajectory
      </text>
    </svg>
  );
}

function AdaptiveKFViz() {
  return (
    <svg viewBox="0 0 480 300" className="h-full w-full">
      <g stroke="#1c212a" strokeWidth={1}>
        {[0, 60, 120, 180, 240].map((y) => (
          <line key={y} x1="0" y1={y + 20} x2="480" y2={y + 20} />
        ))}
      </g>

      {/* wall */}
      <line
        x1="300"
        y1="45"
        x2="300"
        y2="250"
        stroke="#d7a24a"
        strokeWidth={2}
      />

      {/* true position trajectory */}
      <motion.path
        d="M45,205 C100,195 155,170 215,135 C255,112 285,95 300,100 C320,105 350,165 395,195"
        fill="none"
        stroke="#5fb8b0"
        strokeWidth={2.2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={drawVariant}
        transition={{ duration: 1.3 }}
      />

      {/* standard KF lag */}
      <motion.path
        d="M45,205 C105,198 160,175 215,140 C260,112 290,105 305,115 C330,135 350,160 395,180"
        fill="none"
        stroke="#3a4048"
        strokeWidth={1.4}
        strokeDasharray="5 4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={drawVariant}
        transition={{ duration: 1.2, delay: 0.3 }}
      />

      {/* injected uncertainty */}
      <motion.ellipse
        cx="330"
        cy="145"
        rx="42"
        ry="30"
        fill="#d7a24a12"
        stroke="#d7a24a"
        strokeDasharray="4 4"
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />

      {/* observations */}
      {[55, 90, 125, 160, 195, 230, 265, 320, 350, 380].map(
        (x, i) => {
          const y =
            x < 300
              ? 205 - (x - 45) * 0.58 + (i % 2 ? 5 : -4)
              : 100 + (x - 300) * 0.85 + (i % 2 ? 4 : -4);

          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="2.5"
              fill="#aeb6c0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.04 * i }}
            />
          );
        }
      )}

      <circle cx="45" cy="205" r="5" fill="#e7e9ec" />

      <text
        x="270"
        y="38"
        fontFamily="IBM Plex Mono"
        fontSize="10"
        fill="#d7a24a"
      >
        wall collision
      </text>

      <text
        x="320"
        y="130"
        fontFamily="IBM Plex Mono"
        fontSize="10"
        fill="#d7a24a"
      >
        ↑ velocity
      </text>

      <text
        x="20"
        y="230"
        fontFamily="IBM Plex Mono"
        fontSize="10"
        fill="#767f8b"
      >
        noisy observations
      </text>

      <text
        x="115"
        y="292"
        fontFamily="IBM Plex Mono"
        fontSize="9.5"
        fill="#5a6068"
      >
        innovation spike → χ² detection → targeted velocity uncertainty
      </text>
    </svg>
  );
}

function SINDYRLSViz() {
  const cartX = 245;
  const cartY = 205;
  const pivotX = 245;
  const pivotY = 180;

  return (
    <svg viewBox="0 0 480 300" className="h-full w-full">
      {/* ground */}
      <line
        x1="55"
        y1="235"
        x2="425"
        y2="235"
        stroke="#3a4048"
        strokeWidth={2}
      />

      {/* cart */}
      <motion.g
        initial={{ x: -15 }}
        whileInView={{ x: 15 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.5,
          repeat: 1,
          repeatType: "reverse",
        }}
      >
        <rect
          x="210"
          y="190"
          width="70"
          height="38"
          rx="4"
          fill="#12151a"
          stroke="#5fb8b0"
          strokeWidth={1.6}
        />

        <circle cx="225" cy="235" r="7" fill="#12151a" stroke="#5fb8b0" />
        <circle cx="265" cy="235" r="7" fill="#12151a" stroke="#5fb8b0" />

        {/* pendulum */}
        <line
          x1={pivotX}
          y1={pivotY}
          x2="285"
          y2="100"
          stroke="#d7a24a"
          strokeWidth={3}
        />

        <circle
          cx="285"
          cy="100"
          r="9"
          fill="#12151a"
          stroke="#d7a24a"
          strokeWidth={1.7}
        />
      </motion.g>

      {/* control force */}
      <motion.path
        d="M175,208 L205,208"
        stroke="#5fb8b0"
        strokeWidth={2}
        markerEnd="url(#sindy-arrow)"
      />

      <text
        x="125"
        y="200"
        fontFamily="IBM Plex Mono"
        fontSize="10"
        fill="#5fb8b0"
      >
        LQR force
      </text>

      {/* angle */}
      <path
        d="M245,150 A30,30 0 0 1 267,157"
        fill="none"
        stroke="#767f8b"
      />

      <text
        x="270"
        y="158"
        fontFamily="IBM Plex Mono"
        fontSize="10"
        fill="#767f8b"
      >
        θ
      </text>

      {/* discovery concept */}
      <motion.rect
        x="55"
        y="55"
        width="125"
        height="55"
        rx="3"
        fill="#12151a"
        stroke="#3a4048"
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      />

      <text
        x="72"
        y="78"
        fontFamily="IBM Plex Mono"
        fontSize="10"
        fill="#aeb6c0"
      >
        closed-loop data
      </text>

      <text
        x="72"
        y="96"
        fontFamily="IBM Plex Mono"
        fontSize="9"
        fill="#5a6068"
      >
        plant + controller
      </text>

      <motion.path
        d="M180,82 C215,105 220,125 235,160"
        fill="none"
        stroke="#5a6068"
        strokeWidth={1.2}
        strokeDasharray="4 4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      />

      <text
        x="310"
        y="70"
        fontFamily="IBM Plex Mono"
        fontSize="10"
        fill="#d7a24a"
      >
        RLS decoupling
      </text>

      <text
        x="310"
        y="87"
        fontFamily="IBM Plex Mono"
        fontSize="9"
        fill="#767f8b"
      >
        friction + LQR gains
      </text>

      <text
        x="115"
        y="292"
        fontFamily="IBM Plex Mono"
        fontSize="9.5"
        fill="#5a6068"
      >
        SINDy discovers structure → RLS separates controller from plant
      </text>
    </svg>
  );
}

function PlutusViz() {
  return (
    <svg viewBox="0 0 480 300" className="h-full w-full">
      {/* probability distribution */}
      <g stroke="#1c212a" strokeWidth={1}>
        {[0, 60, 120, 180, 240].map((y) => (
          <line key={y} x1="0" y1={y + 20} x2="480" y2={y + 20} />
        ))}
      </g>

      <motion.path
        d="M55,220
           C95,218 110,205 130,175
           C150,140 175,105 210,100
           C245,95 265,130 285,165
           C305,198 330,215 365,220"
        fill="none"
        stroke="#5fb8b0"
        strokeWidth={2.2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={drawVariant}
        transition={{ duration: 1.2 }}
      />

      {/* fair value */}
      <line
        x1="220"
        y1="75"
        x2="220"
        y2="235"
        stroke="#d7a24a"
        strokeDasharray="5 4"
        strokeWidth={1.5}
      />

      <circle cx="220" cy="100" r="5" fill="#d7a24a" />

      {/* bid */}
      <motion.line
        x1="180"
        y1="245"
        x2="180"
        y2="190"
        stroke="#5fb8b0"
        strokeWidth={2}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.7 }}
      />

      {/* offer */}
      <motion.line
        x1="260"
        y1="245"
        x2="260"
        y2="175"
        stroke="#d7a24a"
        strokeWidth={2}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.85 }}
      />

      {/* inventory */}
      <motion.path
        d="M325,235 C345,220 355,195 350,165"
        fill="none"
        stroke="#aeb6c0"
        strokeWidth={1.5}
        strokeDasharray="4 4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
      />

      <text
        x="25"
        y="245"
        fontFamily="IBM Plex Mono"
        fontSize="10"
        fill="#767f8b"
      >
        simulated outcomes
      </text>

      <text
        x="187"
        y="65"
        fontFamily="IBM Plex Mono"
        fontSize="10"
        fill="#d7a24a"
      >
        fair value
      </text>

      <text
        x="165"
        y="260"
        fontFamily="IBM Plex Mono"
        fontSize="10"
        fill="#5fb8b0"
      >
        bid
      </text>

      <text
        x="248"
        y="260"
        fontFamily="IBM Plex Mono"
        fontSize="10"
        fill="#d7a24a"
      >
        offer
      </text>

      <text
        x="315"
        y="150"
        fontFamily="IBM Plex Mono"
        fontSize="10"
        fill="#aeb6c0"
      >
        inventory
      </text>

      <text
        x="110"
        y="292"
        fontFamily="IBM Plex Mono"
        fontSize="9.5"
        fill="#5a6068"
      >
        uncertainty → fair binary price → inventory-skewed quotes
      </text>
    </svg>
  );
}

function QualityCastViz() {
  return (
    <svg viewBox="0 0 480 300" className="h-full w-full">
      {/* inspection image */}
      <motion.rect
        x="45"
        y="70"
        width="125"
        height="125"
        rx="4"
        fill="#12151a"
        stroke="#3a4048"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      />

      {/* casting silhouette */}
      <path
        d="M75,170 L75,115 L100,95 L140,100 L150,125 L140,165 Z"
        fill="none"
        stroke="#aeb6c0"
        strokeWidth={2}
      />

      {/* defect */}
      <motion.circle
        cx="120"
        cy="135"
        r="10"
        fill="#d7a24a18"
        stroke="#d7a24a"
        strokeWidth={1.5}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      />

      {/* arrow */}
      <line
        x1="175"
        y1="132"
        x2="215"
        y2="132"
        stroke="#5a6068"
        strokeWidth={1.5}
      />

      {/* classifier */}
      <motion.rect
        x="220"
        y="75"
        width="110"
        height="110"
        rx="4"
        fill="#12151a"
        stroke="#5fb8b0"
        strokeWidth={1.5}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      />

      <text
        x="275"
        y="110"
        textAnchor="middle"
        fontFamily="IBM Plex Mono"
        fontSize="11"
        fill="#5fb8b0"
      >
        CV MODEL
      </text>

      <text
        x="275"
        y="132"
        textAnchor="middle"
        fontFamily="IBM Plex Mono"
        fontSize="10"
        fill="#aeb6c0"
      >
        defect score
      </text>

      <text
        x="275"
        y="153"
        textAnchor="middle"
        fontFamily="IBM Plex Mono"
        fontSize="11"
        fill="#d7a24a"
      >
        REJECT
      </text>

      {/* result */}
      <line
        x1="330"
        y1="132"
        x2="370"
        y2="132"
        stroke="#5a6068"
        strokeWidth={1.5}
      />

      <motion.rect
        x="375"
        y="85"
        width="65"
        height="90"
        rx="4"
        fill="#12151a"
        stroke="#d7a24a"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      />

      <text
        x="407"
        y="115"
        textAnchor="middle"
        fontFamily="IBM Plex Mono"
        fontSize="10"
        fill="#d7a24a"
      >
        HUMAN
      </text>

      <text
        x="407"
        y="135"
        textAnchor="middle"
        fontFamily="IBM Plex Mono"
        fontSize="9"
        fill="#767f8b"
      >
        feedback
      </text>

      <text
        x="407"
        y="154"
        textAnchor="middle"
        fontFamily="IBM Plex Mono"
        fontSize="9"
        fill="#767f8b"
      >
        ↻ retrain
      </text>

      {/* feedback loop */}
      <motion.path
        d="M405,180 C405,235 275,245 275,190"
        fill="none"
        stroke="#3a4048"
        strokeWidth={1.2}
        strokeDasharray="4 4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1 }}
      />

      <text
        x="60"
        y="220"
        fontFamily="IBM Plex Mono"
        fontSize="10"
        fill="#767f8b"
      >
        casting inspection image
      </text>

      <text
        x="95"
        y="292"
        fontFamily="IBM Plex Mono"
        fontSize="9.5"
        fill="#5a6068"
      >
        defect → model decision → human feedback → reproducible retraining
      </text>
    </svg>
  );
}

const VISUALS: Record<string, () => JSX.Element> = {
  "flow-latent-mpc": FlowLatentMPCViz,
  "llm-scene-planner": SceneGraphViz,
  "thesis-tail-risk": StochasticControlViz,
  "hres-optimization": HRESViz,
  "risk-aware-stochastic-mpc": RiskAwareMPCViz,
  "adaptive-kalman-rls": AdaptiveKFViz,
  "sindy-rls-cart-pendulum": SINDYRLSViz,
  "plutus-market-maker": PlutusViz,
  "qualitycast-mlops": QualityCastViz
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
