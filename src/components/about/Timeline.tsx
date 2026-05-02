"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase } from "lucide-react";

type TimelineItemType = {
  type: "education" | "work";
  period: string;
  year: string;
  title: string;
  org: string;
  description: string;
  duration: string;
  badge?: string;
};

const items: TimelineItemType[] = [
  {
    type: "education",
    period: "Apr 2003 – Mar 2016",
    year: "2003",
    title: "School — Class 1 to 10",
    org: "Arundaya English Secondary School, Jhapa",
    description:
      "Completed secondary school education at Arundaya English Secondary School. Awarded district-level recognition in Essay Writing (N-PABSON, 2014) and Extempore Speech (N-PABSON, 2013). Active in Nepal Scouts and built early foundations in public speaking and competitive academics.",
    duration: "13 years",
  },
  {
    type: "education",
    period: "Jun 2016 – Jun 2018",
    year: "2016",
    title: "Higher Secondary Education (+2)",
    org: "Kanchanjunga Higher Secondary School",
    description:
      "Completed higher secondary education at Kanchanjunga Higher Secondary School with a focus on Science. Brief gap of two months between finishing Class 10 and enrolling in higher secondary.",
    duration: "2 years",
  },
  {
    type: "education",
    period: "Nov 2018 – Jun 2023",
    year: "2018",
    title: "B.Sc. Computer Science & Information Technology",
    org: "Madan Bhandari Memorial College, Tribhuvan University",
    description:
      "Awarded a 60% merit scholarship on entrance examination performance. Relevant coursework: DBMS, Software Engineering, AI, Web Technologies, Data Structures, Computer Networks. Co-authored a peer-reviewed publication on computer vision in the final year.",
    duration: "4 years 7 months",
    badge: "60% Merit Scholarship",
  },
  {
    type: "work",
    period: "Apr 2023 – Sep 2023",
    year: "2023",
    title: "Operations Management Intern",
    org: "HN Media Pvt. Ltd., Kathmandu",
    description:
      "Part-time internship during the final months of the Bachelor's degree. Coordinated content creation, production, editing, and social media teams. First professional exposure to cross-team coordination and digital content operations.",
    duration: "5 months",
  },
  {
    type: "work",
    period: "Sep 2023 – Present",
    year: "2023",
    title: "Project Manager & AI Automation Engineer",
    org: "Makura Creations Pvt. Ltd., Kathmandu",
    description:
      "Joined as Junior PM (Sep 2023), promoted to Associate PM (Jan 2024), then to Project Manager & AI Automation Engineer (Jan 2025). Led 100+ projects including 5 LMS platforms, Cricket Nepal's ICC Award-winning digital transformation, and 7 AI automation workflows using n8n and Claude.",
    duration: "1.5+ years",
    badge: "Current Role",
  },
];

function TimelineCard({
  item,
  index,
  isLeft,
}: {
  item: TimelineItemType;
  index: number;
  isLeft: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEdu = item.type === "education";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -28 : 28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`border border-[#E2DDD6] rounded-xl p-5 bg-[#FAFAF8] hover:shadow-md transition-shadow duration-300 ${
        isEdu
          ? "border-l-[3px] border-l-[#1A3FA8]"
          : "border-l-[3px] border-l-[#E05C2A]"
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full ${
              isEdu
                ? "bg-[#EEF2FF] text-[#1A3FA8]"
                : "bg-[#FFF4EE] text-[#E05C2A]"
            }`}
          >
            {isEdu ? "Education" : "Work"}
          </span>
          {item.badge && (
            <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#F2EEE8] text-[#737373]">
              {item.badge}
            </span>
          )}
        </div>
        <span className="text-[10px] text-[#737373] whitespace-nowrap font-medium">
          {item.duration}
        </span>
      </div>

      <h3 className="text-sm font-semibold text-[#111111] leading-snug mb-0.5">
        {item.title}
      </h3>
      <p
        className={`text-xs font-medium mb-3 ${
          isEdu ? "text-[#1A3FA8]" : "text-[#E05C2A]"
        }`}
      >
        {item.org}
      </p>
      <p className="text-xs text-[#737373] leading-relaxed">{item.description}</p>

      <p className="text-[10px] text-[#BBBBBB] mt-3 font-medium">{item.period}</p>
    </motion.div>
  );
}

function TimelineNode({
  item,
  index,
}: {
  item: TimelineItemType;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isEdu = item.type === "education";

  return (
    <div className="flex flex-col items-center" ref={ref}>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.05, type: "spring", stiffness: 200 }}
        className={`relative w-9 h-9 rounded-full flex items-center justify-center z-10 shadow-md ${
          isEdu ? "bg-[#1A3FA8]" : "bg-[#E05C2A]"
        }`}
      >
        {isEdu ? (
          <GraduationCap size={15} className="text-white" />
        ) : (
          <Briefcase size={15} className="text-white" />
        )}

        {/* Pulse ring */}
        {index === items.length - 1 && (
          <motion.div
            className="absolute inset-0 rounded-full bg-[#E05C2A] opacity-40"
            animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.div>

      {/* Year label */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="text-[10px] font-bold text-[#737373] mt-2 tracking-wider"
      >
        {item.year}
      </motion.span>
    </div>
  );
}

export default function Timeline() {
  return (
    <div className="relative">
      {/* Mobile: single column */}
      <div className="md:hidden space-y-0">
        {items.map((item, i) => {
          const isEdu = item.type === "education";
          return (
            <div key={i} className="flex gap-4">
              {/* Left: line + node */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                    isEdu ? "bg-[#1A3FA8]" : "bg-[#E05C2A]"
                  }`}
                >
                  {isEdu ? (
                    <GraduationCap size={13} className="text-white" />
                  ) : (
                    <Briefcase size={13} className="text-white" />
                  )}
                </div>
                {i < items.length - 1 && (
                  <div className="w-px flex-1 bg-[#E2DDD6] my-2" />
                )}
              </div>

              {/* Right: card */}
              <div className="pb-8 flex-1">
                <TimelineCard item={item} index={i} isLeft={false} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop: alternating */}
      <div className="hidden md:block">
        {/* Center vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#E2DDD6] -translate-x-px" />

        <div className="space-y-10">
          {items.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={i} className="grid grid-cols-[1fr_80px_1fr] gap-4 items-start">
                {/* Left side */}
                {isLeft ? (
                  <TimelineCard item={item} index={i} isLeft />
                ) : (
                  <div />
                )}

                {/* Center node */}
                <div className="flex justify-center pt-3">
                  <TimelineNode item={item} index={i} />
                </div>

                {/* Right side */}
                {!isLeft ? (
                  <TimelineCard item={item} index={i} isLeft={false} />
                ) : (
                  <div />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
