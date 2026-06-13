import { ImageResponse } from "next/og";

export const alt = "ORWOOD — Finishing & Furnishing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4f3ef",
          color: "#18120f",
          padding: "84px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 44,
            letterSpacing: "0.3em",
            fontWeight: 600,
          }}
        >
          ORWOOD
          <span
            style={{
              width: 14,
              height: 14,
              background: "#732017",
              marginLeft: 18,
              marginTop: 22,
            }}
          />
        </div>
        <div style={{ fontSize: 66, lineHeight: 1.1, maxWidth: 940 }}>
          Global interior fit-out, FF&E, joinery & design-build.
        </div>
        <div style={{ fontSize: 28, color: "#6d6862", letterSpacing: "0.04em" }}>
          Finishing & Furnishing · Since 2004
        </div>
      </div>
    ),
    { ...size }
  );
}
