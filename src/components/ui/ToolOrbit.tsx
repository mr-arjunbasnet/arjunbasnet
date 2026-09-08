"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

type Tool = { name: string; icon: string; category: string; color?: string };

// Inner ring — AI & automation core
const innerTools: Tool[] = [
  { name: "Claude", icon: "logos:claude", category: "AI" },
  { name: "n8n", icon: "simple-icons:n8n", color: "EA4B71", category: "Automation" },
  { name: "OpenAI", icon: "logos:openai-icon", category: "AI" },
  { name: "Python", icon: "logos:python", category: "Code" },
  { name: "TensorFlow", icon: "logos:tensorflow", category: "ML" },
  { name: "PyTorch", icon: "logos:pytorch-icon", category: "ML" },
];

// Outer ring — delivery, PM & product
const outerTools: Tool[] = [
  { name: "Next.js", icon: "logos:nextjs-icon", category: "Web" },
  { name: "React", icon: "logos:react", category: "Web" },
  { name: "Figma", icon: "logos:figma", category: "Design" },
  { name: "Notion", icon: "logos:notion-icon", category: "PM" },
  { name: "Jira", icon: "logos:jira", category: "PM" },
  { name: "Confluence", icon: "logos:confluence", category: "PM" },
  { name: "Slack", icon: "logos:slack-icon", category: "Comms" },
  { name: "GitHub", icon: "logos:github-icon", category: "Code" },
];

function ToolBadge({ tool }: { tool: Tool }) {
  return (
    <div className="relative bg-white rounded-2xl shadow-md border border-border flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 hover:scale-110 hover:shadow-xl hover:border-primary transition-all duration-300 cursor-pointer group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://api.iconify.design/${tool.icon}.svg${tool.color ? `?color=%23${tool.color}` : ""}`}
        alt={tool.name}
        loading="lazy"
        className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
      <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-fg bg-bg border border-border px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30 pointer-events-none shadow-sm">
        {tool.name}
      </span>
    </div>
  );
}

export default function ToolOrbit() {
  return (
    <div className="relative w-full aspect-square max-w-[420px] mx-auto select-none">
      {/* Soft radial glow background */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(26,63,168,0.08) 0%, rgba(224,92,42,0.04) 40%, transparent 70%)",
        }}
      />

      {/* Outer dashed ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] h-[88%] rounded-full border border-dashed border-border/70" />

      {/* Inner dashed ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[55%] rounded-full border border-dashed border-border" />

      {/* Pulse rings around center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-primary/10 z-0"
        animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-primary/10 z-0"
        animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeOut", delay: 1.7 }}
      />

      {/* Center: AI orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-primary via-primary-light to-primary flex items-center justify-center z-20"
        style={{ boxShadow: "0 12px 40px rgba(26,63,168,0.4), inset 0 -2px 6px rgba(0,0,0,0.2)" }}
        whileHover={{ scale: 1.08 }}
        animate={{
          boxShadow: [
            "0 12px 40px rgba(26,63,168,0.4), inset 0 -2px 6px rgba(0,0,0,0.2)",
            "0 12px 50px rgba(26,63,168,0.6), inset 0 -2px 6px rgba(0,0,0,0.2)",
            "0 12px 40px rgba(26,63,168,0.4), inset 0 -2px 6px rgba(0,0,0,0.2)",
          ],
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles size={32} className="text-white" strokeWidth={1.8} />
        </motion.div>
      </motion.div>

      {/* Inner ring — clockwise */}
      <motion.div
        className="absolute inset-0 z-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      >
        {innerTools.map((tool, i) => {
          const angle = (i / innerTools.length) * Math.PI * 2 - Math.PI / 2;
          const radius = 27.5;
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius;
          return (
            <div
              key={tool.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              >
                <ToolBadge tool={tool} />
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* Outer ring — counter-clockwise */}
      <motion.div
        className="absolute inset-0 z-10"
        animate={{ rotate: -360 }}
        transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
      >
        {outerTools.map((tool, i) => {
          const angle = (i / outerTools.length) * Math.PI * 2 - Math.PI / 2;
          const radius = 44;
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius;
          return (
            <div
              key={tool.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
              >
                <ToolBadge tool={tool} />
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
