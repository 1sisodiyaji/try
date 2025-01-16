"use client";

import { motion } from "framer-motion";

interface TextAnimationProps {
  textData: { text: string; delay: number; isNewParagraph?: boolean }[]; // Added isNewParagraph flag
}

export default function TextAnimation({ textData }: TextAnimationProps) {
  const textVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
    },
    visible: (delay: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: delay,
        duration: 1,
        ease: "easeInOut",
      },
    }),
    exit: (delay: number) => ({
      opacity: 0,
      filter: "blur(10px)",
      transition: {
        delay: delay / 2,
        duration: 1,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div>
      {textData.map((item, i) => (
        <motion.p
          key={i}
          className={`text-[24px] md:text-[40px] lg:text-[40px] text-[#E0E0E0] md:leading-[48px] lg:leading-[48px] leading-[32px] tracking-[-0.02em] font-normal highlight-text  ${
            item.isNewParagraph ? "mt-3" : ""
          }`}
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          custom={item.delay}
          viewport={{ once: false, amount: 0.5 }}
          style={{
            fontFamily: '"ABC Monument Grotesk", sans-serif',
            textUnderlinePosition: "from-font",
            textDecorationSkipInk: "none",
          }}
        >
          {item.text}
        </motion.p>
      ))}
    </div>
  );
}
