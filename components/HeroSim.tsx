"use client";

import { useEffect, useRef } from "react";

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

    // Goal tracking (Batman / Mouse)
    let mouse = { x: width * 0.72, y: height * 0.32 };
    let targetMouse = { ...mouse };
    
    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      targetMouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    canvas.addEventListener("mousemove", onMove);

    // Agent Physics State (Spiderman)
    let t = 0;
    let covariance = 0; 
    const agent = {
      x: width * 0.3,
      y: height * 0.6,
      vx: 0,
      vy: 0,
    };

    function onClick() {
      agent.vx += (Math.random() - 0.5) * 80;
      agent.vy += (Math.random() - 0.5) * 80;
      covariance = 60; 
    }
    canvas.addEventListener("mousedown", onClick);

    const trail: { x: number; y: number }[] = [];
    
    // Background Marvel Objects
    const types = ['ironman', 'cap', 'thor'];
    const particles = Array.from({ length: 15 }, () => ({
      x: Math.random(),
      y: Math.random(),
      type: types[Math.floor(Math.random() * types.length)],
      s: 0.05 + Math.random() * 0.1,
      angle: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      size: 10 + Math.random() * 6
    }));

    // --- CUSTOM CANVAS DRAWING FUNCTIONS ---

    function drawCapShield(x: number, y: number, size: number, alpha: number) {
      ctx!.save();
      ctx!.translate(x, y);
      ctx!.globalAlpha = alpha;
      const colors = ["#dc2626", "#f8fafc", "#dc2626", "#1d4ed8"]; 
      for(let i = 0; i < 4; i++) {
         ctx!.beginPath();
         ctx!.arc(0, 0, size * (1 - i * 0.25), 0, Math.PI * 2);
         ctx!.fillStyle = colors[i];
         ctx!.fill();
      }
      ctx!.fillStyle = "#f8fafc";
      ctx!.beginPath();
      for(let i = 0; i < 5; i++) {
         let angle = (i * Math.PI * 2) / 5 - Math.PI/2;
         let pX = Math.cos(angle) * size * 0.25;
         let pY = Math.sin(angle) * size * 0.25;
         if(i===0) ctx!.moveTo(pX, pY);
         else ctx!.lineTo(pX, pY);
         angle += Math.PI / 5;
         pX = Math.cos(angle) * size * 0.1;
         pY = Math.sin(angle) * size * 0.1;
         ctx!.lineTo(pX, pY);
      }
      ctx!.fill();
      ctx!.restore();
    }

    function drawArcReactor(x: number, y: number, size: number, alpha: number) {
      ctx!.save();
      ctx!.translate(x, y);
      ctx!.globalAlpha = alpha;
      ctx!.beginPath();
      ctx!.arc(0, 0, size, 0, Math.PI * 2);
      ctx!.fillStyle = "#1e293b";
      ctx!.fill();
      ctx!.strokeStyle = "#94a3b8";
      ctx!.lineWidth = 2;
      ctx!.stroke();
      ctx!.beginPath();
      ctx!.arc(0, 0, size * 0.7, 0, Math.PI * 2);
      ctx!.fillStyle = "#06b6d4";
      ctx!.shadowColor = "#06b6d4";
      ctx!.shadowBlur = 10;
      ctx!.fill();
      ctx!.beginPath();
      ctx!.arc(0, 0, size * 0.3, 0, Math.PI * 2);
      ctx!.fillStyle = "#fff";
      ctx!.fill();
      ctx!.restore();
    }

    function drawMjolnir(x: number, y: number, size: number, angle: number, alpha: number) {
      ctx!.save();
      ctx!.translate(x, y);
      ctx!.rotate(angle);
      ctx!.globalAlpha = alpha;
      ctx!.fillStyle = "#78350f"; 
      ctx!.fillRect(-size * 0.15, 0, size * 0.3, size * 1.2);
      ctx!.fillStyle = "#94a3b8"; 
      ctx!.fillRect(-size * 0.6, -size * 0.5, size * 1.2, size * 0.7);
      ctx!.fillStyle = "#cbd5e1";
      ctx!.fillRect(-size * 0.5, -size * 0.4, size * 1.0, size * 0.5);
      if (Math.random() > 0.9) {
         ctx!.strokeStyle = "#38bdf8";
         ctx!.lineWidth = 1;
         ctx!.beginPath();
         ctx!.moveTo(-size * 0.7, -size * 0.2);
         ctx!.lineTo(-size * 0.9, -size * 0.5);
         ctx!.lineTo(-size * 1.1, -size * 0.1);
         ctx!.stroke();
      }
      ctx!.restore();
    }

    function drawBatman(x: number, y: number, size: number) {
      ctx!.save();
      ctx!.translate(x, y);
      ctx!.beginPath();
      ctx!.ellipse(0, 0, size * 1.8, size * 1.1, 0, 0, Math.PI * 2);
      ctx!.fillStyle = "#eab308";
      ctx!.fill();
      ctx!.lineWidth = 1.5;
      ctx!.strokeStyle = "#ca8a04";
      ctx!.stroke();
      ctx!.fillStyle = "#000";
      ctx!.beginPath();
      ctx!.moveTo(0, size * 0.5);
      ctx!.quadraticCurveTo(-size * 0.8, size * 0.6, -size * 1.4, -size * 0.2);
      ctx!.quadraticCurveTo(-size * 0.6, 0, -size * 0.4, -size * 0.4);
      ctx!.lineTo(-size * 0.15, -size * 0.4);
      ctx!.lineTo(-size * 0.1, -size * 0.8);
      ctx!.lineTo(0, -size * 0.5);
      ctx!.lineTo(size * 0.1, -size * 0.8);
      ctx!.lineTo(size * 0.15, -size * 0.4);
      ctx!.lineTo(size * 0.4, -size * 0.4);
      ctx!.quadraticCurveTo(size * 0.6, 0, size * 1.4, -size * 0.2);
      ctx!.quadraticCurveTo(size * 0.8, size * 0.6, 0, size * 0.5);
      ctx!.fill();
      ctx!.restore();
    }

    function drawSpiderman(x: number, y: number, angle: number, size: number) {
      ctx!.save();
      ctx!.translate(x, y);
      ctx!.rotate(angle);
      
      // Face
      ctx!.beginPath();
      ctx!.arc(0, 0, size, 0, Math.PI * 2);
      ctx!.fillStyle = "#dc2626";
      ctx!.fill();
      
      // Web pattern
      ctx!.strokeStyle = "rgba(0,0,0,0.3)";
      ctx!.lineWidth = 0.5;
      for(let i=0; i<8; i++) {
        let a = (i/8) * Math.PI * 2;
        ctx!.beginPath();
        ctx!.moveTo(0,0);
        ctx!.lineTo(Math.cos(a)*size, Math.sin(a)*size);
        ctx!.stroke();
      }

      // Eyes
      ctx!.fillStyle = "#fff";
      ctx!.strokeStyle = "#000";
      ctx!.lineWidth = 1;
      
      // Right Eye (Oriented facing +X)
      ctx!.beginPath();
      ctx!.moveTo(size * 0.2, size * 0.2);
      ctx!.quadraticCurveTo(size * 0.8, size * 0.4, size * 0.8, size * 0.1);
      ctx!.quadraticCurveTo(size * 0.5, -size * 0.1, size * 0.2, size * 0.2);
      ctx!.fill(); ctx!.stroke();

      // Left Eye
      ctx!.beginPath();
      ctx!.moveTo(size * 0.2, -size * 0.2);
      ctx!.quadraticCurveTo(size * 0.8, -size * 0.4, size * 0.8, -size * 0.1);
      ctx!.quadraticCurveTo(size * 0.5, size * 0.1, size * 0.2, -size * 0.2);
      ctx!.fill(); ctx!.stroke();

      ctx!.restore();
    }

    function drawGrid() {
      ctx!.strokeStyle = "#1c212a";
      ctx!.lineWidth = 1;
      const gap = 46;
      for (let x = 0; x < width; x += gap) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0); ctx!.lineTo(x, height); ctx!.stroke();
      }
      for (let y = 0; y < height; y += gap) {
        ctx!.beginPath();
        ctx!.moveTo(0, y); ctx!.lineTo(width, y); ctx!.stroke();
      }
    }

    function frame() {
      ctx!.clearRect(0, 0, width, height);
      drawGrid();

      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      // Draw floating Avengers objects
      particles.forEach((p) => {
        p.y -= p.s * 0.002;
        p.angle += p.rotSpeed;
        if (p.y < -0.1) p.y = 1.1;
        
        const px = p.x * width;
        const py = p.y * height;
        if (p.type === 'cap') drawCapShield(px, py, p.size, 0.2);
        else if (p.type === 'ironman') drawArcReactor(px, py, p.size, 0.2);
        else if (p.type === 'thor') drawMjolnir(px, py, p.size, p.angle, 0.2);
      });

      // Dynamics
      const nominalX = width * 0.4 + Math.sin(t * 0.5) * width * 0.15;
      const nominalY = height * 0.5 + Math.cos(t * 0.3) * height * 0.15;
      const targetX = nominalX + (mouse.x - nominalX) * 0.25;
      const targetY = nominalY + (mouse.y - nominalY) * 0.25;

      agent.vx += (targetX - agent.x) * 0.015; 
      agent.vy += (targetY - agent.y) * 0.015;
      agent.vx *= 0.88; 
      agent.vy *= 0.88;
      agent.x += agent.vx;
      agent.y += agent.vy;
      covariance += (0 - covariance) * 0.03;

      trail.push({ x: agent.x, y: agent.y });
      if (trail.length > 50) trail.shift();

      // 1. MPC Candidate Rollouts (Spider Webs)
      ctx!.lineWidth = 1;
      for (let i = -3; i <= 3; i++) {
        if (i === 0) continue; 
        ctx!.beginPath();
        ctx!.moveTo(agent.x, agent.y);
        const cpX = agent.x + (mouse.x - agent.x) * 0.5 + (i * 25 * Math.sin(t));
        const cpY = agent.y + (mouse.y - agent.y) * 0.5 + (i * 25 * Math.cos(t));
        ctx!.quadraticCurveTo(cpX, cpY, mouse.x, mouse.y);
        ctx!.strokeStyle = `rgba(242, 244, 246, ${0.15 - Math.abs(i) * 0.03})`;
        ctx!.stroke();
      }

      // 2. Trajectory Trail (Golden web line)
      ctx!.beginPath();
      trail.forEach((p, i) => {
        if (i === 0) ctx!.moveTo(p.x, p.y);
        else ctx!.lineTo(p.x, p.y);
      });
      ctx!.strokeStyle = "#d7a24a";
      ctx!.lineWidth = 2;
      ctx!.stroke();

      // 3. Optimal Planned Web Line
      ctx!.setLineDash([4, 6]);
      ctx!.strokeStyle = "#f8fafc";
      ctx!.lineWidth = 1.5;
      ctx!.beginPath();
      ctx!.moveTo(agent.x, agent.y);
      ctx!.lineTo(mouse.x, mouse.y);
      ctx!.stroke();
      ctx!.setLineDash([]);

      // 4. Spidey Sense Radar
      ctx!.strokeStyle = "rgba(220, 38, 38, 0.2)"; // Red radar
      ctx!.lineWidth = 1;
      const scanOffset = t * 4;
      for (let i = 0; i < 32; i++) {
        const ang = scanOffset + (i / 32) * Math.PI * 2;
        const len = 35 + Math.sin(ang * 3) * 10 + Math.cos(ang * 5) * 5;
        ctx!.beginPath();
        ctx!.moveTo(agent.x, agent.y);
        ctx!.lineTo(agent.x + Math.cos(ang) * len, agent.y + Math.sin(ang) * len);
        ctx!.stroke();
      }

      // 5. Covariance Ellipse
      ctx!.beginPath();
      const moveAngle = Math.atan2(agent.vy, agent.vx);
      ctx!.ellipse(agent.x, agent.y, 20 + covariance, 15 + covariance * 0.4, moveAngle, 0, Math.PI * 2);
      ctx!.strokeStyle = `rgba(220, 38, 38, ${0.3 + covariance / 100})`;
      ctx!.lineWidth = 1;
      ctx!.stroke();
      if (covariance > 5) {
        ctx!.fillStyle = `rgba(220, 38, 38, ${covariance / 400})`;
        ctx!.fill();
      }

      // 6. Draw Characters
      drawBatman(mouse.x, mouse.y, 14);
      drawSpiderman(agent.x, agent.y, moveAngle, 12);

      // 7. Telemetry Labels
      ctx!.fillStyle = "#767f8b";
      ctx!.font = "10px 'IBM Plex Mono', monospace";
      ctx!.fillText(`v=[${agent.vx.toFixed(1)}, ${agent.vy.toFixed(1)}]`, agent.x + 22, agent.y - 18);
      ctx!.fillText(`cov: ${(covariance).toFixed(1)}`, agent.x + 22, agent.y - 6);
      
      t += 0.016; 
      raf = requestAnimationFrame(frame);
    }

    let raf = 0;
    if (reducedMotion) {
      drawGrid();
      drawBatman(width * 0.7, height * 0.32, 16);
      drawSpiderman(width * 0.32, height * 0.6, 0, 16);
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
    // Updated aspect ratio to `aspect-video` (16:9) to make it much wider horizontally
    <div className="relative aspect-[5/4] w-full min-h-[350px] sm:min-h-[420px] overflow-hidden rounded-lg border border-border-soft bg-panel2 group cursor-crosshair">
      <canvas ref={canvasRef} className="block h-full w-full" />
      
      <div className="pointer-events-none absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-wider text-muted">
        Spiderman chasing Batman · MPC SIMULATION
      </div>
      
      <div className="pointer-events-none absolute top-3 right-3 font-mono text-[10px] tracking-wider text-accent opacity-0 transition-opacity duration-500 group-hover:opacity-80">
        [ CLICK TO APPLY IMPULSE ]
      </div>
    </div>
  );
}