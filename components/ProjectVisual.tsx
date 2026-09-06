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

const VISUALS: Record<string, () => JSX.Element> = {
  "flow-latent-mpc": FlowLatentMPCViz,
  "llm-scene-planner": SceneGraphViz,
  "thesis-tail-risk": StochasticControlViz,
  "hres-optimization": HRESViz
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
