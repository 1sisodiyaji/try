"use client";
import React from "react";
import { SparklesCore } from "../ui/sparkles";

export function Particles() {
  return (
       <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
  );
}
