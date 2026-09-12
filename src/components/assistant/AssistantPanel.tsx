"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Mic, MicOff, Send, Volume2, VolumeX, Sparkles } from "lucide-react";
import VoiceOrb, { type OrbMode, type OrbSignal } from "./VoiceOrb";
import { track } from "@/lib/analytics";

type Msg = { role: "user" | "assistant"; text: string };

const OPENERS = [
  "What do you help with?",
  "How much does a website cost?",
  "Can you automate our quotations?",
  "Tell me about AI training",
  "I want to talk to Arjun",
];

/**
 * The assistant: orb on top, conversation beneath. Voice in and out run on
 * this device (the browser's speech APIs); text goes to /api/assistant, which
 * answers from Claude when configured and from a rules-based concierge when
 * not. The orb reads the microphone while you speak and pulses while it
 * reads a reply aloud; otherwise it idles.
 */
export default function AssistantPanel() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "Hi — I'm Arjun's assistant. Ask about a service, a product, pricing or how to get in touch. Speak or type." },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<OrbMode>("idle");
  const [listening, setListening] = useState(false);
  const [speak, setSpeak] = useState(true);
  // Speech capability, read through useSyncExternalStore so the server render
  // (always "no") and the first client render agree, with no state-in-effect.
  const canListen = useSyncExternalStore(
    () => () => {},
    () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      return Boolean(w.SpeechRecognition || w.webkitSpeechRecognition) && Boolean(navigator.mediaDevices?.getUserMedia);
    },
    () => false,
  );
  const signal = useRef<OrbSignal>({ level: 0, bands: [0, 0, 0] });
  const audio = useRef<{ ctx: AudioContext; analyser: AnalyserNode; stream: MediaStream; raf: number } | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rec = useRef<any>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" }); }, [messages, busy]);

  async function startMic() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    await ctx.resume();
    const analyser = ctx.createAnalyser(); analyser.fftSize = 2048; analyser.smoothingTimeConstant = 0.55;
    ctx.createMediaStreamSource(stream).connect(analyser);
    const td = new Float32Array(analyser.fftSize), fd = new Uint8Array(analyser.frequencyBinCount);
    const tick = () => {
      analyser.getFloatTimeDomainData(td); let s = 0; for (let i = 0; i < td.length; i++) s += td[i] * td[i];
      const db = 20 * Math.log10(Math.sqrt(s / td.length) + 1e-8);
      analyser.getByteFrequencyData(fd); const hz = ctx.sampleRate / analyser.fftSize;
      const band = (a: number, b: number) => { let x = 0, n = 0; for (let i = Math.floor(a / hz); i <= Math.ceil(b / hz) && i < fd.length; i++) { x += fd[i]; n++; } return n ? x / n / 255 : 0; };
      signal.current = { level: Math.min(1, Math.max(0, (db + 58) / 42)), bands: [Math.min(1, band(80, 300) * 1.5), Math.min(1, band(300, 2000) * 1.8), Math.min(1, band(2000, 6000) * 2.6)] };
      if (audio.current) audio.current.raf = requestAnimationFrame(tick);
    };
    audio.current = { ctx, analyser, stream, raf: requestAnimationFrame(tick) };
  }
  function stopMic() {
    if (!audio.current) return;
    cancelAnimationFrame(audio.current.raf); audio.current.stream.getTracks().forEach((k) => k.stop()); audio.current.ctx.close();
    audio.current = null; signal.current = { level: 0, bands: [0, 0, 0] };
  }

  async function toggleListen() {
    if (listening) { rec.current?.stop(); return; }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) return;
    try { await startMic(); } catch { setMessages((m) => [...m, { role: "assistant", text: "I couldn't reach the microphone. You can type instead." }]); return; }
    const r = new SR(); r.lang = "en-US"; r.interimResults = true; r.continuous = false; rec.current = r;
    let finalText = "";
    r.onresult = (e: { resultIndex: number; results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) { const res = e.results[i]; if (res.isFinal) finalText += res[0].transcript; else interim += res[0].transcript; }
      setInput(finalText || interim);
    };
    r.onend = () => { setListening(false); setMode("idle"); stopMic(); if (finalText.trim()) void send(finalText.trim()); };
    r.onerror = () => { setListening(false); setMode("idle"); stopMic(); };
    setListening(true); setMode("live"); r.start();
  }

  function say(text: string) {
    if (!speak || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text); u.rate = 1; u.pitch = 1;
    u.onstart = () => setMode("demo"); u.onend = () => setMode("idle"); u.onerror = () => setMode("idle");
    window.speechSynthesis.speak(u);
  }

  async function send(text: string) {
    const q = text.trim(); if (!q || busy) return;
    setInput(""); setBusy(true);
    const next: Msg[] = [...messages, { role: "user", text: q }];
    setMessages(next);
    track("assistant_message", { source: "page" });
    try {
      const res = await fetch("/api/assistant", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next.slice(-12) }) });
      const data = await res.json();
      const reply = data?.reply || "Sorry — I couldn't answer that. Try WhatsApp for a quick reply from Arjun.";
      setMessages((m) => [...m, { role: "assistant", text: reply }]); say(reply);
    } catch {
      setMessages((m) => [...m, { role: "assistant", text: "Something went wrong on my side. WhatsApp is the fastest way to reach Arjun." }]);
    } finally { setBusy(false); }
  }

  return (
    <div className="grid min-h-[100dvh] grid-rows-[minmax(38dvh,1fr)_auto] md:grid-cols-[1.1fr_1fr] md:grid-rows-1">
      <VoiceOrb mode={mode} signal={signal} onActivate={canListen ? toggleListen : undefined} className="min-h-[38dvh] md:min-h-[100dvh]" />

      <section className="flex flex-col bg-night text-white md:border-l md:border-white/10" aria-label="Conversation">
        <header className="flex items-center justify-between px-5 py-4 md:px-7">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-lavender">Assistant</p>
            <p className="text-sm text-white/70">Practical answers about Arjun&rsquo;s services and products.</p>
          </div>
          <button type="button" onClick={() => { setSpeak((v) => !v); if (speak) window.speechSynthesis?.cancel(); }} aria-pressed={speak} className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-white/10 text-white" aria-label={speak ? "Turn read-aloud off" : "Turn read-aloud on"}>
            {speak ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </header>

        <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-5 pb-4 md:px-7" role="log" aria-live="polite">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div className={m.role === "user" ? "max-w-[85%] rounded-2xl rounded-br-md bg-white px-4 py-2.5 text-[15px] leading-relaxed text-indigo" : "max-w-[85%] rounded-2xl rounded-bl-md border border-white/15 bg-white/8 px-4 py-2.5 text-[15px] leading-relaxed text-white/90 [&_a]:text-lavender [&_a]:underline"} dangerouslySetInnerHTML={{ __html: m.text.replace(/</g, "&lt;").replace(/\[([^\]]+)\]\((\/[^)\s]+)\)/g, '<a href="$2">$1</a>') }} />
            </div>
          ))}
          {busy && <p className="text-sm text-white/50">Thinking…</p>}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {OPENERS.map((o) => (
                <button key={o} type="button" onClick={() => void send(o)} className="rounded-full border border-white/20 bg-white/8 px-3 py-1.5 text-[13px] text-white/85 hover:bg-white/15">{o}</button>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); void send(input); }} className="border-t border-white/10 px-5 py-4 md:px-7">
          <div className="flex items-end gap-2">
            {canListen && (
              <button type="button" onClick={() => void toggleListen()} aria-pressed={listening} className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border ${listening ? "border-transparent bg-brand text-white" : "border-white/20 bg-white/10 text-white"}`} aria-label={listening ? "Stop listening" : "Speak"}>
                {listening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
            )}
            <label className="sr-only" htmlFor="assistant-input">Your message</label>
            <textarea id="assistant-input" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void send(input); } }} rows={1} placeholder={listening ? "Listening…" : "Ask about services, products, pricing, or how to reach Arjun"} className="min-h-11 flex-1 resize-none rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-[15px] text-white placeholder:text-white/40 focus:border-lavender focus:outline-none" />
            <button type="submit" disabled={busy || !input.trim()} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand text-white disabled:opacity-50" aria-label="Send"><Send size={18} /></button>
          </div>
          <p className="mt-2.5 flex items-center gap-1.5 text-[12px] text-lavender/80"><Sparkles size={12} aria-hidden /> Your voice is analysed on this device. Only the text you send leaves it. Prefer a person? <Link href="/contact" className="underline">Contact Arjun</Link>.</p>
        </form>
      </section>
    </div>
  );
}
