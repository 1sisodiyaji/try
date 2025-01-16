'use client';

import React, { useRef, useState, useEffect } from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = "button", className }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hoverCircleRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (buttonRef.current && hoverCircleRef.current) {
        const btnRect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - btnRect.left;
        const y = e.clientY - btnRect.top;

        hoverCircleRef.current.style.top = `${y}px`;
        hoverCircleRef.current.style.left = `${x}px`;
      }
    };

    const button = buttonRef.current;
    if (button) {
      button.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (button) {
        button.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const handleClick = () => {
    setIsActive(true);
    setTimeout(() => setIsActive(false), 600); // Reset active state after animation
    if (onClick) onClick();
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      className={`relative bg-transparent border border-[#333333] hover:border-[#FFFFFF] w-auto h-10 py-[10px] px-5 text-[#FFFFFF] font-normal text-[14px] leading-[20px] rounded-[32px] overflow-hidden ${className}`}
    >
      <div
        ref={hoverCircleRef}
        className={`absolute hover-circle ${isActive ? "active" : ""}`}
      ></div>
      <span className="relative z-10 mix-blend-difference">{text}</span>
    </button>
  );
};

export default Button;
