"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ScrollControls } from "@react-three/drei";
import { Vortex } from "../ui/vortex";
import dynamic from "next/dynamic";

const MacContainer = dynamic(() => import("../animations/MacContainer"), {
  ssr: false,
});

const MacScroll = () => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className='w-full h-screen relative flex items-center justify-center overflow-hidden -top-52'>
      <div
        className={`w-full mx-auto rounded-md overflow-hidden ${
          isMobile ? "h-[20rem]" : "h-[30rem] md:h-[40rem]"
        }`}
      >
        <Vortex
          backgroundColor='transparent'
          className='flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full'
        >
          <div className='absolute inset-0 animate-float -top-16'>
            <div className='absolute flex flex-col items-center top-1/2 md:left-1/2 md:-translate-x-1/2 text-white w-full'>
              <h1 className='text-2xl md:text-4xl font-semibold text-white text-center px-4'>
                Unleash the power of <br />
                <span className='text-3xl md:text-[6rem] font-bold mt-1 leading-none'>
                  Open Source
                </span>
              </h1>
            </div>
            <Canvas
              camera={{
                fov: isMobile ? 16 : 12,
                position: isMobile ? [0, -5, 250] : [0, -10, 220],
              }}
              style={{
                background: "transparent",
                width: "100%",
                height: "100%",
              }}
            >
              <Suspense fallback={null}>
                <Environment
                  files='https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/4k/wide_street_01_4k.exr'
                  background={false}
                />
                <ScrollControls
                  pages={3}
                  damping={0.1}
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <MacContainer />
                </ScrollControls>
              </Suspense>
            </Canvas>
          </div>
        </Vortex>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(MacScroll), {
  ssr: false,
});
