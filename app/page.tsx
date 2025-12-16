import Frames from "@/components/Frames";
import { heroFrames } from "@/data/hero";

const Page = () => {
  return (
    <section
      style={{
        position: "relative",
        height: "250vh", // shared scroll space
        overflow: "hidden",
      }}
    >
      {/* Background frames */}
      <Frames frames={heroFrames} />

      {/* Foreground content ON TOP of frames */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "120px",
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              maxWidth: 600,
              margin: "0 auto 140px",
              padding: 24,
              background: "rgba(0,0,0,0.75)",
              color: "#fff",
              borderRadius: 16,
            }}
          >
            <h2>Card {i + 1}</h2>
            <p>This card scrolls over the frame animation.</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Page;
