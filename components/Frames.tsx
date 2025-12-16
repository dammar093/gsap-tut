"use client";

import React, { FC, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface FramesProps {
  frames: string[];
}

const Frames: FC<FramesProps> = ({ frames }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const FRAME_COUNT = frames.length;

  useGSAP(() => {
    if (!containerRef.current || !imageRef.current) return;

    const state = { frame: 0 };

    const tween = gsap.to(state, {
      frame: FRAME_COUNT - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: imageRef.current,
        pinSpacing: false,
      },
      onUpdate: () => {
        const i = Math.max(
          0,
          Math.min(FRAME_COUNT - 1, Math.round(state.frame))
        );
        imageRef.current!.src = frames[i];
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [frames]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
      }}
    >
      <img
        ref={imageRef}
        src={frames[0]}
        alt="Frame background"
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100vh",
          objectFit: "cover",
          pointerEvents: "none",
        }}
        draggable={false}
      />
    </div>
  );
};

export default Frames;
