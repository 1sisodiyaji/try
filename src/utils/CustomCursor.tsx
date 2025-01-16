"use client";

import React, { useEffect, useRef } from "react";

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    const updateCursorPosition = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = `${e.pageX}px`;
        cursor.style.top = `${e.pageY}px`;
      }
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (cursor) {
        if (target.closest(".highlight-text")) {
          cursor.style.display = "none"; // Hide the custom cursor
        } else {
          cursor.style.display = "block"; // Show the custom cursor
        }
      }
    };

    // Listen for mousemove to update position and hover events
    window.addEventListener("mousemove", updateCursorPosition);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
};

export default CustomCursor;
