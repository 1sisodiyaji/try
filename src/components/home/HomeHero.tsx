"use client";

import Image from "next/image";
import { heroContent } from "@/constants/HeroContent";
import ShimmerButton from "../ui/shimmer-button";
import AnimatedGradientText from "../ui/animated-gradient-text";
import { Icons } from "../../../public/icons";
import { Particles } from "../animations/Particles";

export default function HomeHero() {
  return (
    <section className='relative mt-5 w-full'>
      {/* Gradient Background */}
      <div className='absolute -top-8 w-full h-2/4 overflow-hidden opacity-0 animate-[fadeInDown_1.2s_1.2s_ease-out_forwards]'>
        <Particles />
      </div>
      <div className='md:w-screen w-full h-full overflow-hidden'>
        <div className='absolute -top-[18%] left-0 w-1/2 opacity-0 animate-[fadeInDown_1s_1.2s_ease-out_forwards]'>
          <Image
            src='/leftRay.svg'
            alt='Left Ray'
            width={1000}
            height={1000}
            className='w-full md:h-auto h-full object-contain origin-top-left'
          />
        </div>
        <div className='absolute -top-[18%] right-0 w-1/2 opacity-0 animate-[fadeInDown_1s_1.2s_ease-out_forwards]'>
          <Image
            src='/rightRay.svg'
            alt='Right Ray'
            width={1000}
            height={1000}
            className='w-full md:h-auto h-full object-contain origin-top-right'
          />
        </div>
      </div>
      <div className='absolute flex items-center justify-center top-16 -z-10  w-full'>
        {/* <Icons.Hero className='w-full h-full ' /> */}
        <Image
          src='/aris.svg'
          alt='Hero Icon'
          width={1000}
          height={1000}
          className='opacity-0 animate-translateUp w-full h-auto object-contain'
        />
      </div>
      {/* Content */}
      <div className='mx-auto relative z-10 md:mt-52 mt-32'>
        {/* Main heading */}
        <AnimatedGradientText text='Innovating Open Source. Driving Impact.' />
        <div className='text-center'>
          <h1
            className='text-[40px] md:text-[80px] lg:text-[70px] text-[#E0E0E0] text-center font-normal md:leading-[88px] lg:leading-[88px] leading-[48px] tracking-[-0.04em] mt-6 max-w-5xl mx-auto'
            style={{
              fontFamily: '"ABC Monument Grotesk", sans-serif',
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
            {heroContent.mainHeading}
          </h1>
          <p
            className='text-[20px] md:text-[24px] text-[#FFFFFFB2] md:leading-[32px] leading-[24px] tracking-[-0.02em] font-normal mt-6 mx-auto max-w-[354px] md:max-w-4xl  text-center'
            style={{
              fontFamily: '"ABC Monument Grotesk", sans-serif',
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
            {heroContent.subHeading.split("ambitious companies")[0]}
            <span className='highlight-text align-middle pb-1 cursor-none'>
              ambitious companies
            </span>
            {heroContent.subHeading.split("ambitious companies")[1]}
          </p>
        </div>
        <div className='w-full flex  justify-center items-center gap-6 mt-6'>
          <ShimmerButton
            text={"Request a Demo"}
            className='bg-indigo-400 '
            shimmerColor='#87CEEB'
          />
          <button
            type='button'
            className='py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
          >
            Our Contributions
          </button>
        </div>
        <div className='flex justify-center  mt-8'>
          <Icons.Dot className='mr-2' />
          <p className='menu'> 2 Slots Available</p>
        </div>
      </div>
    </section>
  );
}
