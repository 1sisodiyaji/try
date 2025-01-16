/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function PagePreLoader() {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);
  const transitionValues = {
    duration: 0.8,
    yoyo: Infinity,
    ease: "easeOut",
  };

  const ballStyle = {
    display: "block",
    width: "5rem",
    height: "5rem",
    backgroundColor: "transparent",
    marginRight: "auto",
    marginLeft: "auto",
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen w-screen fixed flex items-center justify-center bg-white z-[99]"
    >
      {/* Bouncing Image Animation */}
      <motion.div
      style={ballStyle}
      transition={{
        y: transitionValues,
        scale: transitionValues,
        rotateX: transitionValues,
      }}
      animate={{
        // Y-axis bounce animation
        y: ["-1000px", "0px", "-20px", "0px", "-10px"], // Falling and bouncing
        scale: [1, 1.2, 1.1, 1.15, 1], // Scaling to simulate depth during bounce
        rotateX: [0, -10, 10, 0], // 3D rotation during the bounce
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/logo.png"
          alt="Iverson Inc Logo"
          width={50}
          height={14}
          priority
        />
      </motion.div>
    </motion.div>
    </motion.div>
  );
}
