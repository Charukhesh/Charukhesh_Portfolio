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
  { id: "ai", label: "MACHINE LEARNING", x: 50, y: 8, connections: ["robot", "generative", "llm", "cv"], projects: [] },
  {
    id: "robot",
    label: "ROBOT LEARNING",
    x: 14,
    y: 32,
    connections: ["ai", "control"],
    projects: ["Flow-Latent MPC", "LLM Scene-Graph Planner"]
  },
  {
    id: "generative",
    label: "GENERATIVE MODELS",
    x: 38,
    y: 32,
    connections: ["ai", "control"],
    projects: ["Flow-Latent MPC (V-JEPA world model)"]
  },
  {
    id: "llm",
    label: "LLM PLANNING",
    x: 62,
    y: 32,
    connections: ["ai", "state"],
    projects: ["LLM Scene-Graph Planner"]
  },
  {
    id: "cv",
    label: "COMPUTER VISION",
    x: 86,
    y: 32,
    connections: ["ai", "state"],
    projects: ["Unified Multi-Task Vision", "QualityCast-MLOps"]
  },
  {
    id: "control",
    label: "STOCHASTIC CONTROL",
    x: 24,
    y: 58,
    connections: ["robot", "generative", "state", "auto"],
    projects: ["Risk-Aware Stochastic MPC", "M.Tech Thesis", "HRES Optimization"]
  },
  {
    id: "state",
    label: "STATE ESTIMATION",
    x: 62,
    y: 58,
    connections: ["llm", "cv", "control", "prob", "auto"],
    projects: ["Adaptive Kalman Filtering + RLS", "SINDy-RLS", "M.Tech Thesis"]
  },
  {
    id: "prob",
    label: "PROBABILISTIC MODELING",
    x: 86,
    y: 58,
    connections: ["state"],
    projects: ["HRES Optimization", "Embedding Quality + MoE"]
  },
  {
    id: "auto",
    label: "AUTONOMOUS SYSTEMS",
    x: 43,
    y: 84,
    connections: ["control", "state"],
    projects: ["Flow-Latent MPC", "LLM Scene-Graph Planner"]
  }
];

export default function ResearchMap() {
  const [hover, setHover] = useState<string | null>(null);

  const hoveredNode = NODES.find((n) => n.id === hover);
  const activeSet = new Set(hover ? [hover, ...NODES.find((n) => n.id === hover)!.connections] : []);

  function isEdgeActive(a: Node, b: Node) {
    if (!hover) return false;
    return (a.id === hover || b.id === hover) && (a.connections.includes(b.id) || b.connections.includes(a.id));
  }

  const edges: [Node, Node][] = [];
  NODES.forEach((n) => {
    n.connections.forEach((cId) => {
      const target = NODES.find((x) => x.id === cId);
      if (target && !edges.some(([a, b]) => (a === n && b === target) || (a === target && b === n))) {
        edges.push([n, target]);
      }
    });
  });

  return (
    <div className="relative">
      <div className="relative aspect-[16/11] w-full rounded-lg border border-border-soft bg-panel2 sm:aspect-[16/9]">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {edges.map(([a, b], i) => (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={isEdgeActive(a, b) ? "#d7a24a" : "#242a32"}
              strokeWidth={isEdgeActive(a, b) ? 0.5 : 0.3}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {NODES.map((n) => {
          const isActive = hover === n.id;
          const isDimmed = hover !== null && !activeSet.has(n.id);
          return (
            <button
              key={n.id}
              onMouseEnter={() => setHover(n.id)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(n.id)}
              onBlur={() => setHover(null)}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-2.5 py-1.5 font-mono text-[9.5px] tracking-wide transition-all sm:text-[10.5px] ${
                isActive
                  ? "border-accent bg-accent-soft text-accent"
                  : isDimmed
                    ? "border-border-soft text-muted opacity-40"
                    : "border-border text-ink-dim"
              }`}
            >
              {n.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 min-h-[2rem] font-mono text-[12.5px] text-ink-dim">
        {hoveredNode && hoveredNode.projects.length > 0 ? (
          <>
            <span className="text-accent2">linked work → </span>
            {hoveredNode.projects.join(" · ")}
          </>
        ) : (
          <span className="text-muted">Hover a node to see connected work.</span>
        )}
      </div>
    </div>
  );
}
