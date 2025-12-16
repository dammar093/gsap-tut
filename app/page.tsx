import Frames from "@/components/Frames";
import Video from "@/components/Video";
import { heroFrames } from "@/data/hero";

export default function Home() {
  return (
    <div className="dark:bg-black">
      <main className="w-full">
        <Video />
        <Frames frames={heroFrames} />
      </main>
    </div>
  );
}
