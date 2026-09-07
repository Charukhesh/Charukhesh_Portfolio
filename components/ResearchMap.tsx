"use client";

import { useState } from "react";
import {
  Brain,
  Bot,
  Sparkles,
  MessageSquareCode,
  ScanEye,
  Activity,
  Target,
  Dices,
  SearchCode,
  Rocket,
  LineChart,
} from "lucide-react";

interface Node {
  id: string;
  label: string;
  x: number; // percent
  y: number; // percent
  connections: string[];
  projects: string[];
  color: string;
  icon: React.ElementType;
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
    color: "#a855f7", // Purple
    icon: Brain,
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
    color: "#3b82f6", // Blue
    icon: Bot,
  },
  {
    id: "generative",
    label: "GENERATIVE MODELS",
    x: 38,
    y: 32,
    connections: ["ai", "robot", "control"],
    projects: ["Flow-Latent MPC"],
    color: "#ec4899", // Pink
    icon: Sparkles,
  },
  {
    id: "llm",
    label: "LLM PLANNING",
    x: 62,
    y: 32,
    connections: ["ai", "robot", "state"],
    projects: ["LLM Scene-Graph Planner"],
    color: "#f59e0b", // Amber
    icon: MessageSquareCode,
  },
  {
    id: "cv",
    label: "COMPUTER VISION",
    x: 86,
    y: 32,
    connections: ["ai", "state"],
    projects: ["Unified Multi-Task Vision", "QualityCast-MLOps"],
    color: "#14b8a6", // Teal
    icon: ScanEye,
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
    color: "#ef4444", // Red
    icon: Activity,
  },
  {
    id: "state",
    label: "STATE ESTIMATION",
    x: 62,
    y: 58,
    connections: ["llm", "cv", "control", "prob", "sysid", "auto"],
    projects: ["Adaptive Kalman Filtering + RLS", "SINDy-RLS", "M.Tech Thesis"],
    color: "#8b5cf6", // Violet
    icon: Target,
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
    color: "#f97316", // Orange
    icon: Dices,
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
    color: "#06b6d4", // Cyan
    icon: SearchCode,
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
    color: "#eab308", // Yellow
    icon: Rocket,
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
    color: "#10b981", // Emerald
    icon: LineChart,
  },
];

export default function ResearchMap() {
  const [hover, setHover] = useState<string | null>(null);

  const hoveredNode = NODES.find((n) => n.id === hover);

  const activeSet = new Set(
    hover ? [hover, ...NODES.find((n) => n.id === hover)!.connections] : []
  );

  function isEdgeActive(a: Node, b: Node) {
    if (!hover) return false;
    return (
      (a.id === hover || b.id === hover) &&
      (a.connections.includes(b.id) || b.connections.includes(a.id))
    );
  }

  const edges: [Node, Node][] = [];

  NODES.forEach((n) => {
    n.connections.forEach((cId) => {
      const target = NODES.find((x) => x.id === cId);
      if (
        target &&
        !edges.some(
          ([a, b]) => (a === n && b === target) || (a === target && b === n)
        )
      ) {
        edges.push([n, target]);
      }
    });
  });

  return (
    <div className="relative">
      {/* Container modernized to fit the dark theme */}
      <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-border-soft bg-panel sm:aspect-[16/9]">
        
        {/* Background Grid Pattern for extra technical feel */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: 'linear-gradient(#f2f4f6 1px, transparent 1px), linear-gradient(90deg, #f2f4f6 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        ></div>

        {/* Connection graph */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          {edges.map(([a, b], i) => {
            const active = isEdgeActive(a, b);
            // Draw line in the color of the hovered node
            const strokeColor = active ? hoveredNode?.color : "#2a303c"; 
            
            return (
              <line
                key={i}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={strokeColor}
                strokeWidth={active ? 1.5 : 0.5}
                opacity={active ? 0.8 : 0.4}
                className="transition-all duration-300 ease-in-out"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>

        {/* Research nodes */}
        {NODES.map((n) => {
          const isActive = hover === n.id;
          const isDimmed = hover !== null && !activeSet.has(n.id);
          const Icon = n.icon;

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
                // Apply custom neon glow when active
                boxShadow: isActive ? `0 0 20px ${n.color}40` : "none",
                borderColor: isActive ? n.color : isDimmed ? "#1e2329" : "#3a4048",
                backgroundColor: isActive ? `${n.color}15` : "#12161a",
                color: isActive ? n.color : isDimmed ? "#475569" : "#aeb6c0",
              }}
              className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full border px-3 py-2 font-mono text-[10px] tracking-wide transition-all duration-300 sm:px-4 sm:py-2.5 sm:text-[11px] ${
                isDimmed ? "opacity-30" : "opacity-100 z-10"
              }`}
            >
              <Icon size={14} className={isActive ? "animate-pulse" : ""} />
              {n.label}
            </button>
          );
        })}
      </div>

      {/* Linked project information */}
      <div className="mt-5 min-h-[2.5rem] rounded-lg border border-border-soft bg-panel px-4 py-3 font-mono text-[12px] text-ink-dim sm:text-[13px]">
        {hoveredNode && hoveredNode.projects.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2">
            <span style={{ color: hoveredNode.color }} className="font-semibold">
              <hoveredNode.icon size={14} className="inline mr-1.5 pb-0.5" />
              {hoveredNode.label} WORK →
            </span>
            {hoveredNode.projects.map((proj, idx) => (
              <span key={proj} className="flex items-center">
                <span className="text-[#f2f4f6]">{proj}</span>
                {idx < hoveredNode.projects.length - 1 && (
                  <span className="mx-2 text-border-soft">/</span>
                )}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-muted flex items-center gap-2">
            <Sparkles size={14} /> Hover over a research node to explore connected implementations and projects.
          </span>
        )}
      </div>
    </div>
  );
}