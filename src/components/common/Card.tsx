import Image from "next/image";
import { CardProps } from "@/types/card";
import { useState } from "react";

const Card: React.FC<CardProps> = ({ src, alt, title, buttons }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative group overflow-hidden rounded-[8px]">
        {/* Skeleton Loader */}
      {isLoading && (
        <div className="absolute inset-0 w-full h-full bg-gray-300 animate-pulse rounded-[8px]"></div>
      )}
      {/* Card Image */}
      <Image
        src={src}
        alt={alt}
        width={432}
        height={578}
        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoadingComplete={() => setIsLoading(false)}
      />

      {/* Backdrop Cover */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] scale-y-0 scale-x-125 origin-bottom group-hover:scale-y-100 hover:scale-x-150 transition-transform duration-500 ease-in-out"></div>

      {/* Content Animation */}
      <div className="absolute inset-0 w-full flex flex-col justify-end items-start p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
        <p className="text-[24px] font-normal translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-in-out delay-300">
          {title}
        </p>
        <div className="flex flex-row space-x-2 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-in-out delay-300">
          {buttons.map((button, index) => (
            <button
              key={index}
              className="mt-2 px-3 py-1 text-[12px] backdrop-blur-[24px] text-[#FFFFFF] border border-[#FFFFFF14] rounded-3xl translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-in-out delay-700"
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
