import { ImageResponse } from "next/og";
import { CLIPSTACK } from "@/content/clipstack/index";

export const alt = CLIPSTACK.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Monochrome, like the page: grey canvas, black tile, black headline. Hex is
   literal because satori cannot read theme variables (same exemption as the
   site's OG). */
export default function OG() {
  const ring = (d: number, o: number) => (
    <div style={{ position: "absolute", width: d, height: d, borderRadius: 9999, border: "1px solid #c9c9c9", opacity: o }} />
  );
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", background: "#f4f4f4", color: "#0a0a0a", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", width: 620 }}>
          <div style={{ display: "flex", fontSize: 15, letterSpacing: 3, color: "#6a6a6a", fontWeight: 700 }}>FREE · MACOS 14+ · NO ACCOUNT</div>
          <div style={{ display: "flex", fontSize: 62, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, marginTop: 18 }}>Everything you copy, one shortcut away.</div>
          <div style={{ display: "flex", fontSize: 22, color: "#6a6a6a", marginTop: 20, lineHeight: 1.4 }}>Clipboard history for your Mac. Private, searchable, one shortcut.</div>
        </div>
        <div style={{ display: "flex", flex: 1, height: "100%", alignItems: "center", justifyContent: "center", position: "relative" }}>
          {ring(420, 0.35)}{ring(320, 0.55)}{ring(220, 0.8)}
          <div style={{ display: "flex", width: 132, height: 132, borderRadius: 36, background: "#0a0a0a", alignItems: "center", justifyContent: "center", boxShadow: "0 20px 50px rgba(0,0,0,.25)" }}>
            <svg viewBox="0 0 64 64" width="84" height="84"><rect x="18" y="20" width="24" height="30" rx="4" fill="#fff" opacity=".4" /><rect x="22" y="16" width="24" height="30" rx="4" fill="#fff" opacity=".7" /><rect x="26" y="12" width="24" height="30" rx="4" fill="#fff" /><rect x="33" y="10" width="10" height="4" rx="2" fill="#0a0a0a" /></svg>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
