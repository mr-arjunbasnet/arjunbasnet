"use client";

import { cn } from "@/lib/utils";
import type { DspSettings } from "../hooks/useMicAnalyser";
import { focusRing } from "../lib/ui";

const DSP_OPTIONS: { key: keyof DspSettings; label: string }[] = [
  { key: "echoCancellation", label: "Echo cancellation" },
  { key: "noiseSuppression", label: "Noise suppression" },
  { key: "autoGainControl", label: "Auto gain" },
];

export default function MicControls({
  devices,
  deviceId,
  onSelectDevice,
  dsp,
  onDsp,
  disabled,
}: {
  devices: MediaDeviceInfo[];
  deviceId: string;
  onSelectDevice: (id: string) => void;
  dsp: DspSettings;
  onDsp: (patch: Partial<DspSettings>) => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="melos-mic"
          className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8A8CA3]"
        >
          Microphone
        </label>
        <select
          id="melos-mic"
          value={deviceId}
          disabled={disabled || devices.length === 0}
          onChange={(e) => onSelectDevice(e.target.value)}
          className={cn(
            "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#E8E9F2] disabled:opacity-40",
            focusRing
          )}
        >
          {devices.length === 0 && (
            <option value="">Default microphone</option>
          )}
          {devices.map((device, i) => (
            <option
              key={device.deviceId || i}
              value={device.deviceId}
              className="bg-[#10101E] text-[#E8E9F2]"
            >
              {device.label || `Microphone ${i + 1}`}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2.5">
        {DSP_OPTIONS.map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between gap-3">
            <span id={`melos-dsp-${key}`} className="text-sm text-[#E8E9F2]">
              {label}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={dsp[key]}
              aria-labelledby={`melos-dsp-${key}`}
              disabled={disabled}
              onClick={() => onDsp({ [key]: !dsp[key] })}
              className={cn(
                "relative h-6 w-11 shrink-0 rounded-full border transition-colors disabled:opacity-40",
                dsp[key]
                  ? "border-transparent bg-gradient-to-r from-[#A24BFF] to-[#33E0FF]"
                  : "border-white/15 bg-white/10",
                focusRing
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all",
                  dsp[key] ? "left-[22px]" : "left-0.5"
                )}
              />
            </button>
          </div>
        ))}
      </div>

      <p className="text-[11px] leading-relaxed text-[#8A8CA3]">
        Tip: switching these off makes the bars livelier — and the audio rawer.
      </p>
    </div>
  );
}
