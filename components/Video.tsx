"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Video = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useGSAP(() => {
    const wrapper = wrapperRef.current;
    const video = videoRef.current;
    if (!wrapper || !video) return;

    const init = () => {
      const duration = video.duration;
      const scrub = { t: 0 };

      gsap.to(scrub, {
        t: duration,
        ease: "none",

        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: `+=3000`,
          scrub: 1,
          pin: true,
          anticipatePin: 1.5,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },

        onUpdate: () => {
          if (video) video.currentTime = scrub.t;
        },
      });
    };

    if (video.readyState >= 1) init();
    else video.addEventListener("loadedmetadata", init);

    return () => video.removeEventListener("loadedmetadata", init);
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-screen w-full">
      <video
        ref={videoRef}
        src="/assets/gsap.mp4"
        playsInline
        muted
        preload="auto"
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default Video;
