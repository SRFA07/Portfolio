import { ImageResponse } from "next/og";

export const alt = "Syed Reebal Faakhir Andrabi · Machine Learning";
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
          background: "#0a0a0b",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#22d3ee" }} />
          <div style={{ color: "#a1a1aa", fontSize: 26 }}>
            Open to SWE · ML · AI-Research internships
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#ededf0", fontSize: 72, fontWeight: 600, letterSpacing: -2 }}>
            Syed Reebal Faakhir Andrabi
          </div>
          <div style={{ color: "#22d3ee", fontSize: 30, marginTop: 18 }}>
            Machine Learning · Computer Vision · IIT Kanpur
          </div>
          <div style={{ color: "#a1a1aa", fontSize: 28, marginTop: 28, maxWidth: 900, lineHeight: 1.4 }}>
            I build ML systems for high-stakes domains, and report honest numbers.
          </div>
        </div>

        <div style={{ display: "flex", color: "#71717a", fontSize: 24 }}>github.com/SRFA07</div>
      </div>
    ),
    { ...size },
  );
}
