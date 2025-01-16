"use client";

import HomeHero from "@/components/home/HomeHero";
import CTASection from "@/components/cta/CTASection";
import dynamic from "next/dynamic";

// Dynamically import MacScroll with SSR disabled
const MacScroll = dynamic(() => import("@/components/home/MacScroll"), {
  ssr: false,
  loading: () => (
    <div className='h-screen flex items-center justify-center'>
      <div className='animate-pulse'>Loading 3D Model...</div>
    </div>
  ),
});

export default function Home() {
  return (
    <div className='flex items-center justify-items-center'>
      <main className='flex flex-col items-center justify-center sm:items-start'>
        <HomeHero />
        <MacScroll />
        <CTASection />
      </main>
    </div>
  );
}
