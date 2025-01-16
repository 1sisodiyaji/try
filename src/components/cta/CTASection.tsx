"use client";

import { useEffect, useRef } from "react";
import Button from "../common/Button";
import { Gradient } from "../../utils/Gradient.js";

const CTASection = () => {
  const canvasRef = useRef(null);

  // Initialize Gradient
  useEffect(() => {
    const gradient = new Gradient();
    if (canvasRef.current) {
      gradient.initGradient("#gradient-canvas");
    }
  }, []);

  const handleClick = () => {
    console.log("button clicked");
  };

  return (
    <div
      className='relative w-full overflow-hidden rounded-xl p-6 bg-gradient-to-r from-[#080B1D] to-[#1f1f1f90] shadow-xl backdrop-blur-sm 
      border border-[#232D6B] '
    >
      {/* Gradient Background */}
      <canvas
        id='gradient-canvas'
        ref={canvasRef}
        className='absolute inset-0 w-full h-full'
        data-transition-in
      ></canvas>

      {/* Content */}
      <div className='relative flex flex-col justify-center items-center text-center text-white px-4 h-full space-y-7 z-20 backdrop-blur-sm'>
        <h1
          className='text-[24px] md:text-[56px] text-[#E0E0E0] font-normal md:leading-[64px] leading-[32px] tracking-[-0.02em]'
          style={{
            fontFamily: '"ABC Monument Grotesk", sans-serif',
            textUnderlinePosition: "from-font",
            textDecorationSkipInk: "none",
          }}
        >
          Ready?
        </h1>
        <Button text='GET IN TOUCH' onClick={handleClick} />
      </div>
    </div>
  );
};

export default CTASection;
