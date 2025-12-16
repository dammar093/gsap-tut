import Frames from "@/components/Frames";
import Video from "@/components/Video";

export default function Home() {
  return (
    <div className="dark:bg-black">
      <main className="w-full">
        <Video />
        <Frames />
      </main>
    </div>
  );
}
