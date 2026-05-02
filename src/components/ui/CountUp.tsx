"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  raw: string;
  className?: string;
}

function parseValue(raw: string): { num: number; prefix: string; suffix: string } {
  const match = raw.match(/^([^\d]*)(\d+(?:\.\d+)?)([^\d]*)$/);
  if (!match) return { num: 0, prefix: "", suffix: raw };
  return {
    num: parseFloat(match[2]),
    prefix: match[1],
    suffix: match[3],
  };
}

export default function CountUp({ raw, className }: CountUpProps) {
  const { num, prefix, suffix } = parseValue(raw);
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current || num === 0) return;
    started.current = true;

    const duration = 1400;
    const steps = 60;
    const increment = num / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= num) {
        setDisplay(num);
        clearInterval(interval);
      } else {
        setDisplay(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [inView, num]);

  const displayStr = num % 1 !== 0 ? display.toFixed(1) : String(display);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {inView ? displayStr : "0"}
      {suffix}
    </span>
  );
}
