import { ImageResponse } from "next/og";

const MAX_DESCRIPTION_LENGTH = 160;

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Roi UI";
  const description = (searchParams.get("description") ?? "Components built on Base UI").slice(
    0,
    MAX_DESCRIPTION_LENGTH
  );

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        width: "100%",
        height: "100%",
        padding: 80,
        background: "#0a0a0a",
        color: "#fafafa",
      }}
    >
      <div style={{ fontSize: 28, color: "#a1a1a1", marginBottom: 24 }}>Roi UI</div>
      <div style={{ fontSize: 72, fontWeight: 600, letterSpacing: "-0.02em" }}>{title}</div>
      <div style={{ fontSize: 32, color: "#a1a1a1", marginTop: 24, maxWidth: 900 }}>{description}</div>
    </div>,
    { width: 1200, height: 630 }
  );
}
