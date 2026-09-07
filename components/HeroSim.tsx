"use client";

import { useEffect, useRef } from "react";

/**
 * "Autonomous System Simulation"
 * Demonstrates: PD Control, MPC Trajectory Rollouts, Kalman Covariance, and Impulsive Disturbances.
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

    // Goal tracking (Mouse)
    let mouse = { x: width * 0.72, y: height * 0.32 };
    let targetMouse = { ...mouse };
    
    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      targetMouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    canvas.addEventListener("mousemove", onMove);

    // Agent Physics State
    let t = 0;
    let covariance = 0; // Represents state uncertainty (P matrix trace)
    const agent = {
      x: width * 0.3,
      y: height * 0.6,
      vx: 0,
      vy: 0,
    };

    // Apply Impulsive Disturbance on Click (Adaptive KF project intuition)
    function onClick() {
      agent.vx += (Math.random() - 0.5) * 80;
      agent.vy += (Math.random() - 0.5) * 80;
      covariance = 60; // Instant uncertainty spike
    }
    canvas.addEventListener("mousedown", onClick);

    const trail: { x: number; y: number }[] = [];
    
    // Background Particles
    const particles = Array.from({ length: 26 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.4,
      s: 0.05 + Math.random() * 0.12,
    }));

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

      // Ease mouse target
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      // Draw background particles
      ctx!.fillStyle = "#5fb8b033";
      particles.forEach((p) => {
        p.y -= p.s * 0.002;
        if (p.y < 0) p.y = 1;
        ctx!.beginPath();
        ctx!.arc(p.x * width, p.y * height, p.r, 0, Math.PI * 2);
        ctx!.fill();
      });

      // --- DYNAMICS & CONTROL ---
      // 1. Generate a nominal lissajous path
      const nominalX = width * 0.4 + Math.sin(t * 0.5) * width * 0.15;
      const nominalY = height * 0.5 + Math.cos(t * 0.3) * height * 0.15;
      
      // 2. MPC target is a blend of the nominal path and the mouse attractor
      const targetX = nominalX + (mouse.x - nominalX) * 0.25;
      const targetY = nominalY + (mouse.y - nominalY) * 0.25;

      // 3. PD Controller pulling agent to target
      agent.vx += (targetX - agent.x) * 0.015; // Proportional gain
      agent.vy += (targetY - agent.y) * 0.015;
      agent.vx *= 0.88; // Damping (Derivative constraint)
      agent.vy *= 0.88;
      agent.x += agent.vx;
      agent.y += agent.vy;

      // 4. Uncertainty decay (Kalman filter converging after disturbance)
      covariance += (0 - covariance) * 0.03;

      // Update Trail
      trail.push({ x: agent.x, y: agent.y });
      if (trail.length > 60) trail.shift();

      // --- RENDERING ---

      // 1. MPC Candidate Rollouts (Flow-Latent MPC / Risk-Aware MPC)
      ctx!.lineWidth = 1;
      for (let i = -3; i <= 3; i++) {
        if (i === 0) continue; // Skip optimal, drawn later
        ctx!.beginPath();
        ctx!.moveTo(agent.x, agent.y);
        const cpX = agent.x + (mouse.x - agent.x) * 0.5 + (i * 25 * Math.sin(t));
        const cpY = agent.y + (mouse.y - agent.y) * 0.5 + (i * 25 * Math.cos(t));
        ctx!.quadraticCurveTo(cpX, cpY, mouse.x, mouse.y);
        ctx!.strokeStyle = `rgba(95, 184, 176, ${0.15 - Math.abs(i) * 0.03})`;
        ctx!.stroke();
      }

      // 2. Trajectory Trail (Past States)
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

      // 3. Optimal Planned Trajectory (Dashed)
      ctx!.setLineDash([4, 6]);
      ctx!.strokeStyle = "#5fb8b0";
      ctx!.lineWidth = 1.5;
      ctx!.beginPath();
      ctx!.moveTo(agent.x, agent.y);
      ctx!.lineTo(mouse.x, mouse.y);
      ctx!.stroke();
      ctx!.setLineDash([]);

      // 4. 360° LiDAR Scan
      ctx!.strokeStyle = "rgba(118, 127, 139, 0.2)";
      ctx!.lineWidth = 1;
      const scanOffset = t * 4;
      for (let i = 0; i < 32; i++) {
        const ang = scanOffset + (i / 32) * Math.PI * 2;
        // Fake depth variance based on angle
        const len = 35 + Math.sin(ang * 3) * 10 + Math.cos(ang * 5) * 5;
        ctx!.beginPath();
        ctx!.moveTo(agent.x, agent.y);
        ctx!.lineTo(agent.x + Math.cos(ang) * len, agent.y + Math.sin(ang) * len);
        ctx!.stroke();
      }

      // 5. Covariance Ellipse (State Uncertainty)
      ctx!.beginPath();
      const angle = Math.atan2(agent.vy, agent.vx);
      ctx!.ellipse(agent.x, agent.y, 14 + covariance, 9 + covariance * 0.4, angle, 0, Math.PI * 2);
      ctx!.strokeStyle = `rgba(215, 162, 74, ${0.3 + covariance / 100})`;
      ctx!.lineWidth = 1;
      ctx!.stroke();
      // Fill flash on impulse
      if (covariance > 5) {
        ctx!.fillStyle = `rgba(215, 162, 74, ${covariance / 400})`;
        ctx!.fill();
      }

      // 6. Goal Marker
      ctx!.beginPath();
      ctx!.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
      ctx!.strokeStyle = "#5fb8b0";
      ctx!.lineWidth = 1.5;
      ctx!.stroke();
      ctx!.beginPath();
      ctx!.arc(mouse.x, mouse.y, 12 + Math.sin(t * 5) * 2, 0, Math.PI * 2);
      ctx!.strokeStyle = "rgba(95, 184, 176, 0.4)";
      ctx!.stroke();

      // 7. Agent Core
      ctx!.beginPath();
      ctx!.arc(agent.x, agent.y, 4.5, 0, Math.PI * 2);
      ctx!.fillStyle = "#f2f4f6";
      ctx!.fill();
      ctx!.beginPath();
      ctx!.arc(agent.x, agent.y, 8.5, 0, Math.PI * 2);
      ctx!.strokeStyle = "#d7a24a";
      ctx!.lineWidth = 1.5;
      ctx!.stroke();

      // 8. Technical Telemetry Labels
      ctx!.fillStyle = "#767f8b";
      ctx!.font = "10px 'IBM Plex Mono', monospace";
      ctx!.fillText(`v=[${agent.vx.toFixed(1)}, ${agent.vy.toFixed(1)}]`, agent.x + 18, agent.y - 18);
      ctx!.fillText(`cov: ${(covariance).toFixed(1)}`, agent.x + 18, agent.y - 6);
      
      ctx!.fillStyle = "#5fb8b0";
      ctx!.fillText("goal ẑ", mouse.x + 14, mouse.y - 12);

      t += 0.016; // Time step
      raf = requestAnimationFrame(frame);
    }

    let raf = 0;
    if (reducedMotion) {
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
      canvas.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <div className="relative aspect-[6/5] w-full overflow-hidden rounded-lg border border-border-soft bg-panel2 group cursor-crosshair">
      <canvas ref={canvasRef} className="block h-full w-full" />
      
      {/* Footer Text */}
      <div className="pointer-events-none absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-wider text-muted">
        MPC & Estimation · SIMULATION
      </div>
      
      {/* Interactive Hint */}
      <div className="pointer-events-none absolute top-3 right-3 font-mono text-[10px] tracking-wider text-accent opacity-0 transition-opacity duration-500 group-hover:opacity-80">
        [ CLICK TO APPLY IMPULSE ]
      </div>
    </div>
  );
}