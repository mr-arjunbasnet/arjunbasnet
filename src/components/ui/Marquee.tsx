"use client";

import { motion } from "framer-motion";

const items = [
  "Project Management",
  "AI Automation",
  "EdTech Platforms",
  "Nepal",
  "n8n Workflows",
  "Claude API",
  "LMS Design",
  "ICC Award",
  "Computer Vision",
  "Cricket Nepal",
  "Adaptive Learning",
  "100+ Projects",
  "Makura Creations",
  "Kathmandu",
];

const doubled = [...items, ...items];

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-[#E2DDD6] bg-[#F2EEE8] py-3 select-none">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 28,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-8 text-xs font-medium uppercase tracking-widest text-[#737373]">
            {item}
            <span className="text-[#E05C2A] text-base leading-none">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
