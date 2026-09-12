import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import { SITE } from "@/content/site";

/*
 * The mark, inlined as a data URI. Satori renders <img> from data URIs but
 * cannot read theme variables or React components, so the standalone SVG in
 * public/brand/ is the source here — the same drawing LogoMark.tsx carries.
 * Read once at module load; this route is generated at build time.
 */
const MARK = `data:image/svg+xml;base64,${fs
  .readFileSync(path.join(process.cwd(), "public/brand/mark/ARJUN_mark_full.svg"))
  .toString("base64")}`;

export const alt = `${SITE.name} — ${SITE.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#FAF8F6",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* The mark, top-right. It replaced two decorative concentric rings
            that had stood in for a logo motif before there was a logo. */}
        <img
          src={MARK}
          alt=""
          width={340}
          height={340}
          style={{ position: "absolute", top: "40px", right: "72px", opacity: 0.95 }}
        />
        {/* Decorative dot accents */}
        <div
          style={{
            position: "absolute",
            bottom: "180px",
            right: "120px",
            width: "16px",
            height: "16px",
            borderRadius: "9999px",
            background: "#8B5CF6",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "240px",
            right: "200px",
            width: "10px",
            height: "10px",
            borderRadius: "9999px",
            background: "#5B4BDB",
            display: "flex",
          }}
        />

        {/* Top label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#6B6790",
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "9999px",
              background: "#8B5CF6",
              display: "flex",
            }}
          />
          Kathmandu, Nepal
          <div
            style={{
              width: "1px",
              height: "16px",
              background: "#E6E1F2",
              display: "flex",
            }}
          />
          ICC Digital Award 2023 & 2024
        </div>

        {/* Spacer */}
        <div style={{ display: "flex", flex: 1 }} />

        {/* Name */}
        <div
          style={{
            fontSize: 180,
            fontWeight: 400,
            color: "#221A5C",
            lineHeight: 1,
            letterSpacing: "-6px",
            fontFamily: "serif",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex" }}>Arjun</div>
          <div style={{ display: "flex" }}>Basnet.</div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "#E6E1F2",
            marginTop: "32px",
            marginBottom: "20px",
            display: "flex",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: "#221A5C",
              fontWeight: 500,
              display: "flex",
            }}
          >
            {SITE.jobTitle}
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#5B4BDB",
              fontWeight: 600,
              letterSpacing: "1px",
              display: "flex",
            }}
          >
            arjun-basnet.com.np
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
