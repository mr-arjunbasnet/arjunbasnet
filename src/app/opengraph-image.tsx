import { ImageResponse } from "next/og";

export const alt = "Arjun Basnet — Project Manager & AI Automation Engineer";
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
          background: "#FAFAF8",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Decorative ring top-right */}
        <div
          style={{
            position: "absolute",
            top: "-180px",
            right: "-180px",
            width: "520px",
            height: "520px",
            borderRadius: "9999px",
            border: "2px solid #E2DDD6",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "320px",
            height: "320px",
            borderRadius: "9999px",
            border: "2px solid #E2DDD6",
            display: "flex",
          }}
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
            background: "#E05C2A",
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
            background: "#1A3FA8",
            display: "flex",
          }}
        />

        {/* Top label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#737373",
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
              background: "#E05C2A",
              display: "flex",
            }}
          />
          Kathmandu, Nepal
          <div
            style={{
              width: "1px",
              height: "16px",
              background: "#E2DDD6",
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
            color: "#111111",
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
            background: "#E2DDD6",
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
              color: "#111111",
              fontWeight: 500,
              display: "flex",
            }}
          >
            Project Manager &amp; AI Automation Engineer
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#1A3FA8",
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
