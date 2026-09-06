"use client";

import { useEffect, useRef } from "react";

/**
 * "Autonomous system simulation" hero visual. Runs on a 2D canvas so it stays
 * lightweight (no WebGL/Three.js dependency). Renders a single static frame
 * for prefers-reduced-motion users instead of animating.
 */
export default function HeroSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    // mouse position acts as a subtle "goal" attractor
    let mouse = { x: width * 0.72, y: height * 0.32 };
    let targetMouse = { ...mouse };
    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      targetMouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    canvas.addEventListener("mousemove", onMove);

    // agent state — loops along a soft path, gently pulled toward the goal
    let t = 0;
    const particles = Array.from({ length: 26 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.4,
      s: 0.05 + Math.random() * 0.12
    }));

    const trail: { x: number; y: number }[] = [];

    function drawGrid() {
      ctx!.strokeStyle = "#1c212a";
      ctx!.lineWidth = 1;
      const gap = 46;
      for (let x = 0; x < width; x += gap) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, height);
        ctx!.stroke();
      }
      for (let y = 0; y < height; y += gap) {
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(width, y);
        ctx!.stroke();
      }
    }

    function frame() {
      ctx!.clearRect(0, 0, width, height);
      drawGrid();

      // ease mouse
      mouse.x += (targetMouse.x - mouse.x) * 0.04;
      mouse.y += (targetMouse.y - mouse.y) * 0.04;

      // particles (latent-space specks)
      ctx!.fillStyle = "#5fb8b055";
      particles.forEach((p) => {
        p.y -= p.s * 0.002;
        if (p.y < 0) p.y = 1;
        ctx!.beginPath();
        ctx!.arc(p.x * width, p.y * height, p.r, 0, Math.PI * 2);
        ctx!.fill();
      });

      // agent position: lissajous-ish loop, blended toward the goal
      const baseX = width * 0.28 + Math.sin(t * 0.6) * width * 0.14;
      const baseY = height * 0.62 + Math.cos(t * 0.4) * height * 0.16;
      const pull = 0.18;
      const agent = {
        x: baseX + (mouse.x - baseX) * pull,
        y: baseY + (mouse.y - baseY) * pull
      };

      trail.push({ ...agent });
      if (trail.length > 70) trail.shift();

      // trajectory trail
      ctx!.beginPath();
      trail.forEach((p, i) => {
        if (i === 0) ctx!.moveTo(p.x, p.y);
        else ctx!.lineTo(p.x, p.y);
      });
      ctx!.strokeStyle = "#d7a24a";
      ctx!.lineWidth = 2;
      ctx!.globalAlpha = 0.8;
      ctx!.stroke();
      ctx!.globalAlpha = 1;

      // predicted trajectory (dashed, extrapolated toward goal)
      ctx!.setLineDash([4, 6]);
      ctx!.strokeStyle = "#5fb8b0aa";
      ctx!.beginPath();
      ctx!.moveTo(agent.x, agent.y);
      ctx!.lineTo(mouse.x, mouse.y);
      ctx!.stroke();
      ctx!.setLineDash([]);

      // sensor rays from agent
      ctx!.strokeStyle = "#3a4048";
      ctx!.lineWidth = 1;
      for (let i = 0; i < 7; i++) {
        const ang = (i / 6) * Math.PI - Math.PI / 2 + Math.sin(t * 0.5) * 0.15;
        const len = 34 + Math.sin(t * 2 + i) * 6;
        ctx!.beginPath();
        ctx!.moveTo(agent.x, agent.y);
        ctx!.lineTo(agent.x + Math.cos(ang) * len, agent.y + Math.sin(ang) * len);
        ctx!.stroke();
      }

      // goal marker
      ctx!.beginPath();
      ctx!.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2);
      ctx!.strokeStyle = "#5fb8b0";
      ctx!.lineWidth = 1.5;
      ctx!.stroke();
      ctx!.beginPath();
      ctx!.arc(mouse.x, mouse.y, 11, 0, Math.PI * 2);
      ctx!.strokeStyle = "#5fb8b055";
      ctx!.stroke();

      // agent body
      ctx!.beginPath();
      ctx!.arc(agent.x, agent.y, 5.5, 0, Math.PI * 2);
      ctx!.fillStyle = "#e7e9ec";
      ctx!.fill();
      ctx!.beginPath();
      ctx!.arc(agent.x, agent.y, 9.5, 0, Math.PI * 2);
      ctx!.strokeStyle = "#d7a24a";
      ctx!.lineWidth = 1.4;
      ctx!.stroke();

      // technical label near agent
      ctx!.fillStyle = "#767f8b";
      ctx!.font = "10px 'IBM Plex Mono', monospace";
      ctx!.fillText(`state s(t)  ·  t=${t.toFixed(1)}`, agent.x + 14, agent.y - 12);
      ctx!.fillStyle = "#5fb8b0";
      ctx!.fillText("goal ẑ", mouse.x + 14, mouse.y - 12);

      t += 0.012;
      raf = requestAnimationFrame(frame);
    }

    let raf = 0;
    if (reducedMotion) {
      // static single frame, no rAF loop
      drawGrid();
      ctx!.fillStyle = "#e7e9ec";
      ctx!.beginPath();
      ctx!.arc(width * 0.32, height * 0.6, 6, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.strokeStyle = "#5fb8b0";
      ctx!.beginPath();
      ctx!.arc(width * 0.7, height * 0.32, 6, 0, Math.PI * 2);
      ctx!.stroke();
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="relative aspect-[6/5] w-full overflow-hidden rounded-lg border border-border-soft bg-panel2">
      <canvas ref={canvasRef} className="block h-full w-full" />
      <div className="pointer-events-none absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-wider text-muted">
        autonomous system · simulation
      </div>
    </div>
  );
}
