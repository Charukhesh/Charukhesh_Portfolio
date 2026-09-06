"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experience } from "@/data/experience";

export default function Timeline() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="ml-1.5 border-l border-border-soft">
      {experience.map((entry, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="relative pb-2 pl-7">
            <span
              className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 bg-bg transition-colors ${
                isOpen ? "border-accent" : "border-border"
              }`}
            />
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full py-4 text-left"
              aria-expanded={isOpen}
            >
              <div className="mb-1 font-mono text-xs text-muted">{entry.when}</div>
              <h4 className="font-display text-lg font-semibold text-[#f2f4f6]">{entry.title}</h4>
              <div className="mt-1 flex items-center gap-2 font-mono text-[12px] text-accent2">
                {entry.where}
                <span className="text-muted">{isOpen ? "−" : "+"}</span>
              </div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden pl-0 text-[15px] text-ink-dim"
                >
                  {entry.bullets.map((b, j) => (
                    <li key={j} className="mb-2.5 list-disc pl-4 marker:text-muted last:mb-4">
                      {b}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
