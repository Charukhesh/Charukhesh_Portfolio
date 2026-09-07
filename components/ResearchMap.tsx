"use client";

import { useState } from "react";

interface Node {
  id: string;
  label: string;
  x: number; // percent
  y: number; // percent
  connections: string[];
  projects: string[];
}

const NODES: Node[] = [
  {
    id: "ai",
    label: "MACHINE LEARNING",
    x: 50,
    y: 8,
    connections: ["robot", "generative", "llm", "cv", "prob", "quant"],
    projects: [
      "Flow-Latent MPC",
      "LLM Scene-Graph Planner",
      "Unified Multi-Task Vision",
      "Embedding Quality + MoE",
      "Plutus Market Maker",
    ],
  },
  {
    id: "robot",
    label: "ROBOT LEARNING",
    x: 14,
    y: 32,
    connections: ["ai", "control"],
    projects: [
      "Flow-Latent MPC",
      "LLM Scene-Graph Planner",
      "Risk-Aware Stochastic MPC",
    ],
  },
  {
    id: "generative",
    label: "GENERATIVE MODELS",
    x: 38,
    y: 32,
    connections: ["ai", "robot", "control"],
    projects: ["Flow-Latent MPC"],
  },
  {
    id: "llm",
    label: "LLM PLANNING",
    x: 62,
    y: 32,
    connections: ["ai", "robot", "state"],
    projects: ["LLM Scene-Graph Planner"],
  },
  {
    id: "cv",
    label: "COMPUTER VISION",
    x: 86,
    y: 32,
    connections: ["ai", "state"],
    projects: [
      "Unified Multi-Task Vision",
      "QualityCast-MLOps",
    ],
  },
  {
    id: "control",
    label: "STOCHASTIC CONTROL",
    x: 24,
    y: 58,
    connections: ["robot", "generative", "state", "auto"],
    projects: [
      "Risk-Aware Stochastic MPC",
      "M.Tech Thesis",
      "HRES Optimization",
      "Thrust-Limited Sliding-Mode Guidance",
    ],
  },
  {
    id: "state",
    label: "STATE ESTIMATION",
    x: 62,
    y: 58,
    connections: ["llm", "cv", "control", "prob", "sysid", "auto"],
    projects: [
      "Adaptive Kalman Filtering + RLS",
      "SINDy-RLS",
      "M.Tech Thesis",
    ],
  },
  {
    id: "prob",
    label: "PROBABILISTIC MODELING",
    x: 86,
    y: 58,
    connections: ["state", "ai", "quant"],
    projects: [
      "HRES Optimization",
      "Embedding Quality + MoE",
      "Risk-Aware Stochastic MPC",
      "Plutus Market Maker",
    ],
  },
  {
    id: "sysid",
    label: "SYSTEM IDENTIFICATION",
    x: 28,
    y: 84,
    connections: ["state", "control", "auto"],
    projects: [
      "SINDy-RLS",
      "Adaptive Kalman Filtering + RLS",
      "Data-Driven Model Order Reduction",
    ],
  },
  {
    id: "auto",
    label: "AUTONOMOUS SYSTEMS",
    x: 55,
    y: 84,
    connections: ["control", "state", "robot"],
    projects: [
      "Flow-Latent MPC",
      "LLM Scene-Graph Planner",
      "Risk-Aware Stochastic MPC",
      "Thrust-Limited Sliding-Mode Guidance",
    ],
  },
  {
    id: "quant",
    label: "QUANTITATIVE SYSTEMS",
    x: 82,
    y: 84,
    connections: ["ai", "prob"],
    projects: [
      "Plutus Market Maker",
      "Multi-Dimensional Return Forecasting",
      "Advanced Portfolio Optimization",
    ],
  },
];

export default function ResearchMap() {
  const [hover, setHover] = useState<string | null>(null);

  const hoveredNode = NODES.find((n) => n.id === hover);

  const activeSet = new Set(
    hover
      ? [
          hover,
          ...NODES.find((n) => n.id === hover)!.connections,
        ]
      : []
  );

  function isEdgeActive(a: Node, b: Node) {
    if (!hover) return false;

    return (
      (a.id === hover || b.id === hover) &&
      (a.connections.includes(b.id) ||
        b.connections.includes(a.id))
    );
  }

  const edges: [Node, Node][] = [];

  NODES.forEach((n) => {
    n.connections.forEach((cId) => {
      const target = NODES.find((x) => x.id === cId);

      if (
        target &&
        !edges.some(
          ([a, b]) =>
            (a === n && b === target) ||
            (a === target && b === n)
        )
      ) {
        edges.push([n, target]);
      }
    });
  });

  return (
    <div className="relative">
      <div className="relative aspect-[16/11] w-full rounded-lg border border-[#d9dee7] bg-white sm:aspect-[16/9]">
        {/* Connection graph */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          {edges.map(([a, b], i) => (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={
                isEdgeActive(a, b)
                  ? "#d97706"
                  : "#cbd5e1"
              }
              strokeWidth={
                isEdgeActive(a, b) ? 0.8 : 0.45
              }
              opacity={
                isEdgeActive(a, b) ? 1 : 0.8
              }
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {/* Research nodes */}
        {NODES.map((n) => {
          const isActive = hover === n.id;
          const isDimmed =
            hover !== null && !activeSet.has(n.id);

          return (
            <button
              key={n.id}
              onMouseEnter={() => setHover(n.id)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(n.id)}
              onBlur={() => setHover(null)}
              style={{
                left: `${n.x}%`,
                top: `${n.y}%`,
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-4 py-2.5 font-mono text-[11px] tracking-wide transition-all sm:px-5 sm:py-3 sm:text-[12px] ${
                isActive
                  ? "border-[#d97706] bg-[#fff7ed] text-[#b45309] shadow-sm"
                  : isDimmed
                    ? "border-[#e2e8f0] bg-white text-[#94a3b8] opacity-40"
                    : "border-[#cbd5e1] bg-white text-[#334155] shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
              }`}
            >
              {n.label}
            </button>
          );
        })}
      </div>

      {/* Linked project information */}
      <div className="mt-4 min-h-[2rem] font-mono text-[12.5px] text-slate-500">
        {hoveredNode && hoveredNode.projects.length > 0 ? (
          <>
            <span className="text-[#b45309]">
              linked work →{" "}
            </span>
            {hoveredNode.projects.join(" · ")}
          </>
        ) : (
          <span className="text-slate-400">
            Hover a node to see connected work.
          </span>
        )}
      </div>
    </div>
  );
}