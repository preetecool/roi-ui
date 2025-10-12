import { HomeAnimatedCard } from "@/components/home-animated-card/home-animated-card";
import { HomeHeader } from "@/components/home-header/home-header";

export default function Home() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        paddingTop: "150px",
        paddingLeft: "max(40px, 5vw)",
        paddingRight: "max(40px, 5vw)",
      }}
    >
      <div style={{ position: "relative", zIndex: 1, maxWidth: "980px", margin: "0 auto" }}>
        <HomeHeader />
        <div
          style={{
            marginTop: "60px",
            transform: "rotate(-3deg)",
            transformOrigin: "top left",
          }}
        >
          <HomeAnimatedCard />
        </div>
      </div>
    </div>
  );
}
