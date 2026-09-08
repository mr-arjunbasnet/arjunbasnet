import { ImageResponse } from "next/og";
import { SERVICES, getService } from "@/content/services/index";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Service — Arjun Basnet";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

/**
 * Per-service OpenGraph card.
 *
 * Next 16 note: `params` is a Promise here, unlike in `generateImageMetadata`
 * where it is still synchronous. Since the `alt` text is static we skip
 * generateImageMetadata entirely and only await params, which avoids that
 * asymmetry altogether.
 *
 * Colours are literal hex on purpose — ImageResponse renders through satori,
 * which supports a CSS subset and cannot resolve Tailwind theme variables.
 */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);

  const heading = service?.heading ?? "Digital & AI Consulting";
  const tagline = service?.tagline ?? "Kathmandu, Nepal";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FBFBFD",
          padding: "72px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -180,
            width: 560,
            height: 560,
            borderRadius: "50%",
            border: "2px solid #DFE2F0",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            border: "2px solid #DFE2F0",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: "#7C3AED",
              display: "flex",
            }}
          />
          <span
            style={{
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#5B6178",
              fontWeight: 600,
            }}
          >
            {service ? service.name : "Services"}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 940 }}>
          <div
            style={{
              fontSize: 66,
              lineHeight: 1.08,
              color: "#10132A",
              fontWeight: 700,
              marginBottom: 24,
              display: "flex",
            }}
          >
            {heading}
          </div>
          <div
            style={{ fontSize: 30, color: "#5B6178", lineHeight: 1.4, display: "flex" }}
          >
            {tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #DFE2F0",
            paddingTop: 28,
          }}
        >
          <span style={{ fontSize: 26, color: "#10132A", fontWeight: 600 }}>
            Arjun Basnet
          </span>
          <span style={{ fontSize: 24, color: "#2563EB", fontWeight: 500 }}>
            arjun-basnet.com.np
          </span>
        </div>
      </div>
    ),
    size,
  );
}
