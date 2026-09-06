"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STEPS = ["INITIALIZING SYSTEM", "LOADING RESEARCH", "LOADING MODELS", "LOADING SIMULATION"];
const STEP_MS = 260;

export default function Loader() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Only show once per session, and never for reduced-motion users.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("cbr-intro-seen");
    if (reduced || seen) return;

    setVisible(true);
    sessionStorage.setItem("cbr-intro-seen", "1");

    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      if (i >= STEPS.length) {
        clearInterval(interval);
        setTimeout(() => setVisible(false), STEP_MS + 120);
        return;
      }
      setStep(i);
    }, STEP_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-bg"
        >
          <div className="font-mono text-xs tracking-[0.15em] text-accent2">{STEPS[step]}</div>
          <div className="font-display text-2xl font-semibold text-[#f2f4f6]">CHARUKHESH B R</div>
          <button
            onClick={() => setVisible(false)}
            className="mt-2 font-mono text-[11px] tracking-wide text-muted underline underline-offset-4 hover:text-accent"
          >
            skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
