"use client";

import { useState } from "react";

interface ProfileImageProps {
  src: string;
  alt?: string;
  variant?: "blue" | "yellow";
  className?: string;
}

export default function ProfileImage({
  src,
  alt = "Arjun Basnet",
  variant = "yellow",
  className = "",
}: ProfileImageProps) {
  const [imageOk, setImageOk] = useState(true);

  const bgClass =
    variant === "blue"
      ? "bg-gradient-to-br from-[#1A3FA8] via-[#2B52CC] to-[#1A3FA8]"
      : "bg-gradient-to-br from-[#FFD93D] via-[#E05C2A] to-[#1A3FA8]";

  return (
    <div
      className={`relative aspect-square w-full rounded-2xl overflow-hidden ${bgClass} ${className}`}
    >
      {/* Placeholder layer — always rendered underneath */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <span
          className="text-white/95 select-none"
          style={{
            fontFamily: "var(--font-dm-serif)",
            fontSize: "clamp(72px, 14vw, 160px)",
            letterSpacing: "-4px",
          }}
        >
          AB
        </span>
      </div>

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20">
        <span className="text-[10px] uppercase tracking-widest text-white/80 font-semibold">
          Arjun Basnet
        </span>
        <span className="text-[10px] uppercase tracking-widest text-white/80 font-semibold">
          ↗
        </span>
      </div>

      {/* Photo on top — uses plain <img> to avoid Next.js image-optimisation 400 errors when file is missing */}
      {imageOk && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover object-top z-10"
          onError={() => setImageOk(false)}
        />
      )}
    </div>
  );
}
