"use client";
import { useState } from "react";
import WorkList from "@/components/work/WorkList";
import Gallery from "@/components/work/Gallery";

export default function Work() {
  const [activeComponent, setActiveComponent] = useState("work");

  return (
    <section
      className={`transform transition-all duration-700 ease-in-out mx-auto mt-8 ${
        activeComponent === "work" ? "md:p-16 p-8" : "md:p-8 p-0"
      }`}
    >
      {/* Header with Work and Play */}
      <div className="flex items-center justify-between w-full z-10">
        {/* WORK Heading */}
        <h1
          onClick={() => setActiveComponent("work")}
          className={`cursor-pointer text-[40px] md:text-[80px] font-normal leading-[88px] tracking-[-0.04em] text-left transform transition-all duration-700 ease-in-out ${
            activeComponent === "work"
              ? "opacity-100 scale-100 translate-x-0"
              : "opacity-50 md:scale-[0.3] scale-[0.5] md:-translate-x-20 -translate-x-4"
          }`}
        >
          WORK
        </h1>

        {/* Horizontal Line */}
        <div
          className={`flex-1 border-t border-[#222222] mx-8 transform transition-all duration-700 ease-in-out ${
            activeComponent === "work"
              ? "scale-x-100 translate-x-0" // Slightly increase border length
              : "md:scale-x-[1.35] scale-x-[2.25] md:-translate-x-5 -translate-x-2" // Extend and move border left/right
          }`}
        ></div>

        {/* PLAY Heading */}
        <h1
          onClick={() => setActiveComponent("play")}
          className={`cursor-pointer text-[40px] md:text-[80px] font-normal leading-[88px] tracking-[-0.04em] text-right transform transition-all duration-700 ease-in-out ${
            activeComponent === "play"
              ? "opacity-100 md:scale-[0.3] scale-[0.5] md:translate-x-14 translate-x-1"
              : "opacity-50 scale-100 translate-x-0"
          }`}
        >
          PLAY
        </h1>
      </div>

      {/* Content Section */}
      <div className="mt-8">
        <div
          key={activeComponent}
          className="animate-fadeInOut transition-all duration-1000"
        >
          {activeComponent === "work" ? (
            <div>
              <WorkList />
            </div>
          ) : (
            <div>
              <Gallery />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
