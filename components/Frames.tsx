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
  const FRAME_COUNT = frames?.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !imageRef.current) return;

    const frameState = { frame: 0 };

    const tween = gsap.to(frameState, {
      frame: FRAME_COUNT - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: true,
      },
      onUpdate: () => {
        const index = Math.max(
          1,
          Math.min(FRAME_COUNT - 1, Math.round(frameState.frame))
        );

        const src = frames[index];
        if (src && imageRef.current) {
          imageRef.current.src = src;
        }
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: "150vh",
        backgroundColor: "#000",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img
        ref={imageRef}
        src={frames[0]}
        alt="Scroll frame animation"
        style={{
          width: "100%",
          height: "100vh",
          objectFit: "cover",
        }}
        draggable={false}
      />
    </div>
  );
};

export default Frames;
