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
      <legend className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8A8CA3]">
        Visualizer theme
      </legend>
      <div className="grid grid-cols-3 gap-2">
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
                ? "border-[#33E0FF]/70 bg-white/[0.06]"
                : "border-white/10 bg-white/[0.02] hover:border-white/25",
              focusRing
            )}
          >
            <span
              className="mb-2 block h-6 w-full rounded-md"
              style={{ background: theme.chip }}
              aria-hidden
            />
            <span className="block text-xs font-medium text-[#E8E9F2]">
              {theme.name}
            </span>
            <span className="mt-0.5 block text-[10px] leading-snug text-[#8A8CA3]">
              {theme.tagline}
            </span>
          </button>
        ))}
      </div>
      <p className="mt-2 text-[11px] text-[#8A8CA3]">
        Your theme is baked into the recording.
      </p>
    </fieldset>
  );
}
