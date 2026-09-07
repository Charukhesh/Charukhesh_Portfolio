"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/Charukhesh_Portfolio/suas1.jpeg",
  "/Charukhesh_Portfolio/suas2.jpeg",
  "/Charukhesh_Portfolio/suas3.jpeg",
];

export default function SuasSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
      {/* Slideshow */}
      <div className="relative aspect-[5/4] w-full overflow-hidden rounded-4xl border border-border-soft bg-panel shadow-lg">
        <AnimatePresence mode="wait"> 
          <motion.img
            key={index}
            src={images[index]}
            alt="SUAS IITM Team"
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </AnimatePresence>
        
        {/* Slideshow Indicators */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-bg/50 px-3 py-1.5 backdrop-blur-md">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-4 bg-accent" : "w-1.5 bg-[#f2f4f6]/50 hover:bg-[#f2f4f6]"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-6">
        <div>
          <div className="mb-3 font-mono text-[13px] tracking-widest text-accent uppercase flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            IIT Madras · Founded Feb 2024
          </div>
          <h3 className="font-display text-3xl font-semibold text-[#f2f4f6]">
            SUAS IITM (Aerial Robotics)
          </h3>
        </div>

        <p className="text-ink-dim leading-relaxed text-[15px]">
          In February 2024, I co-founded IIT Madras's first international aerial robotics team. We scaled from four founders to an internationally ranked autonomous aviation team in under a year, building full-stack UAVs designed to navigate, perceive, and deliver payloads in adversarial environments.
        </p>

        <div className="rounded-xl border border-border-soft bg-panel p-5">
          <div className="flex items-center justify-between mb-3">
             <h4 className="font-mono text-sm text-[#f2f4f6]">SHADOW UAV (SUAS 2025)</h4>
             <a href="https://www.suasiitm.com/" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-accent hover:underline">suasiitm.com ↗</a>
          </div>
          
          <p className="mb-5 text-[13.5px] text-ink-dim leading-relaxed">
            Engineered a folding carbon-fiber X-quadcopter running a <strong className="text-slate-300 font-medium">ROS 1 autonomy stack</strong>. Integrated real-time aerial mapping, object detection, and a winch-based payload delivery mechanism. The architecture allowed the full system to be assembled from a transport case to flight-ready in under 2.5 minutes.
          </p>
          <div className="grid grid-cols-2 gap-y-4 gap-x-2 border-t border-border-soft pt-4 font-mono text-[11px] sm:text-[11.5px]">
            <div>
              <div className="text-accent mb-0.5">8th Globally</div>
              <div className="text-slate-500">Technical Design Report</div>
            </div>
            <div>
              <div className="text-accent mb-0.5">23rd Overall</div>
              <div className="text-slate-500">70+ Int'l Teams (Rookie Year)</div>
            </div>
            <div>
              <div className="text-[#f2f4f6] mb-0.5">29:33 Flight</div>
              <div className="text-slate-500">Flawless, Zero Crashes</div>
            </div>
            <div>
              <div className="text-[#f2f4f6] mb-0.5">1st Attempt</div>
              <div className="text-slate-500">Safety Clearance Passed</div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border-soft bg-panel p-5 relative overflow-hidden">
          {/* Subtle glow effect for the "winning" vision */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-accent opacity-[0.08] blur-2xl"></div>
          
          <h4 className="mb-2 font-mono text-sm text-[#f2f4f6]">FALCON UAV (SUAS 2026)</h4>
          <p className="text-[13.5px] text-ink-dim leading-relaxed">
            Migrating to a robust <strong className="text-slate-300 font-medium">ROS 2 architecture</strong> for the upcoming Storm Response mission in Tulsa, Oklahoma. Armed with proof-of-flight-qualified hardware and the hard-earned lessons from our rookie year, we are aggressively optimizing our autonomy pipeline and are highly confident in our pursuit to win the 2026 championship.
          </p>
        </div>
      </div>
    </div>
  );
}