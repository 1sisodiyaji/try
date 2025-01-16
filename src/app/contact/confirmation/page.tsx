"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

import signImage from "../../../../public/media/images/sign.png";
import orangeImage from "../../../../public/media/images/orangeCrop.png";
import phoneImage from "../../../../public/media/images/phone.jpg";
import { THANK } from "../../../constants/confirmationString";

export default function Confirmation() {
    const imageData = [
        { src: orangeImage, alt: 'Orange Image' },
        { src: phoneImage, alt: 'Phone Image' },
        { src: orangeImage, alt: 'Orange Image' },
        { src: phoneImage, alt: 'Phone Image' },
    ];

    const scrollRef = useRef<HTMLDivElement | null>(null);
    const controls = useAnimation();

    useEffect(() => {
        const handleResize = () => {
            const isLargeScreen = window.innerWidth >= 1024;
            const scrollContainer = scrollRef.current;
            
            if (isLargeScreen) {
                controls.start({
                    y: [0, -(scrollContainer?.scrollHeight || 0)], 
                    transition: { duration: 20, repeat: Infinity, repeatType: "loop",repeatDelay:-10, ease: "linear" },
                });
            } else {
                controls.start({
                    x: [0, -(scrollContainer?.scrollWidth || 0)],
                    transition: { duration: 20, repeat: Infinity, repeatType: "loop",repeatDelay:-10, ease: "linear" },
                });
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [controls]);

    const addLineBreaks = (text: string) => {
        return text.split("\n").map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen lg:px-0 lg:ml-[164px] mt-[24px]">
            {/* Thank you text section */}
            <div className="lg:fixed mt-[48px] text-[#FFFFFF] mx-[48px]">
                <p className="w-full lg:w-[499px] text-[40px] lg:text-[56px] leading-[48px] lg:leading-[64px] mb-4">
                    {addLineBreaks(THANK.text1)}
                </p>
                <p className="text-[16px] lg:text-[18px] leading-[24px] text-[#BABABA]">
                    {THANK.text2}
                </p>

                {/* Sign image */}
                <div className="w-[107.58px] h-[32px] mt-[24px]">
                    <Image
                        src={signImage}
                        alt="Signed"
                        layout="responsive"
                        objectFit="contain"
                    />
                </div>
            </div>

            {/* Image section */}
            <div className="mt-[60px] ms-[-90.88px] lg:mt-[-74px] lg:ml-[50%] xl:ml-[579px] xl:mr-[328px]">
                {/* Scroll container */}
                <motion.div
                    ref={scrollRef}
                    className="flex lg:flex-col gap-4 over overflow-x-auto pb-4 lg:pb-0 snap-x snap-mandatory"
                >
                    {imageData.map((image, index) => (
                        <motion.div
                            key={index}
                            className="relative min-w-[275.37px] h-[300px] lg:w-[369px] lg:h-[400px] rounded-[8px] overflow-hidden snap-center flex-shrink-0"
                            animate={controls} // Animate the content (images), not the container
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
