"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdvancedItem from "./AdvancedItem"; // Adjust import path if needed
import { Project } from "../data/projects"; // Adjust import path if needed

interface Props {
  projects: Project[];
}

export default function AdvancedProjectsToggle({ projects }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const INITIAL_COUNT = 3;
  
  const visibleProjects = isExpanded ? projects : projects.slice(0, INITIAL_COUNT);
  const hiddenCount = projects.length - INITIAL_COUNT;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-0 border-t border-border-soft">
        <AnimatePresence initial={false}>
          {visibleProjects.map((project) => (
            <motion.div
              key={project.slug}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <AdvancedItem project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {projects.length > INITIAL_COUNT && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="group flex w-fit items-center gap-2 rounded border border-border-soft bg-panel px-4 py-2 font-mono text-xs text-text-muted transition-colors hover:border-accent hover:text-accent"
        >
          {isExpanded ? (
            <>
              <span>−</span>
              <span>SHOW LESS</span>
            </>
          ) : (
            <>
              <span>+</span>
              <span>SHOW {hiddenCount} MORE PROJECTS</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}