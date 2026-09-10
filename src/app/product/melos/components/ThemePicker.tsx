"use client";

import { cn } from "@/lib/utils";
import { THEMES, type ThemeId } from "../lib/themes";
import { focusRing } from "../lib/ui";

export default function ThemePicker({
  value,
  onChange,
  disabled,
}: {
  value: ThemeId;
  onChange: (id: ThemeId) => void;
  disabled?: boolean;
}) {
  return (
    <fieldset>
      <legend className="sr-only">Visualizer theme</legend>
      <div className="grid grid-cols-2 gap-2">
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            type="button"
            disabled={disabled}
            onClick={() => onChange(theme.id)}
            aria-pressed={value === theme.id}
            className={cn(
              "rounded-xl border p-2.5 text-left transition-colors disabled:opacity-40",
              value === theme.id
                ? "border-[#A24BFF]/60 bg-[#A24BFF]/5"
                : "border-black/10 bg-white hover:border-black/25",
              focusRing
            )}
          >
            <span
              className="mb-2 block h-6 w-full rounded-md"
              style={{ background: theme.chip }}
              aria-hidden
            />
            <span className="block text-xs font-medium text-[#16181D]">
              {theme.name}
            </span>
            <span className="mt-0.5 block text-[10px] leading-snug text-[#667085]">
              {theme.tagline}
            </span>
          </button>
        ))}
      </div>
      <p className="mt-2 text-[11px] text-[#667085]">
        Your theme is baked into the recording.
      </p>
    </fieldset>
  );
}
