"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { heroFrames } from "@/data/hero";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = heroFrames?.length;

const Frames = () => {
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

        const src = heroFrames[index];
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
        src={heroFrames[0]}
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
