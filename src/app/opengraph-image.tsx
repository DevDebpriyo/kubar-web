import { ImageResponse } from "next/og";

export const alt = "Kubar Labs — Embedded Origination Infrastructure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        color: "#f7f7f8",
        background:
          "radial-gradient(circle at 80% 15%, rgba(212,146,12,0.28), transparent 34%), linear-gradient(135deg, #04040c 0%, #0c1024 100%)",
      }}
    >
      <div style={{ display: "flex", fontSize: 38, fontWeight: 700 }}>
        KUBAR <span style={{ color: "#f0b429", marginLeft: 12 }}>LABS</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 940 }}>
        <div style={{ fontSize: 68, lineHeight: 1.08, fontWeight: 800 }}>
          Embedded origination infrastructure for business lending.
        </div>
        <div style={{ marginTop: 30, fontSize: 25, color: "#b8bac6" }}>
          NavDhan connects fragmented B2B platforms with existing lender systems.
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 22, color: "#f0b429" }}>
        kubar.tech
      </div>
    </div>,
    size,
  );
}
