/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect } from 'react';
import { useLoader } from "@/context/LoaderContext";
import { AnimatePresence } from 'framer-motion';
import { usePathname } from "next/navigation"; // Detect route changes
import PreLoader from '@/components/preloader/PreLoader';
import PagePreLoader from '@/components/preloader/pagePreLoader';
export default function LoaderWrapper() {
  const { isLoading, setIsLoading } = useLoader();
  const pathname = usePathname();

  useEffect(() => {
    let locomotiveScrollInstance: any; // Use 'any' for now or import types

    const initializeLocomotiveScroll = async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      locomotiveScrollInstance = new LocomotiveScroll();
    };

    setIsLoading(true); // Show loader on route change

    initializeLocomotiveScroll();

    const timer = setTimeout(() => {
      setIsLoading(false); // Hide loader after animation
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 2000);

    return () => {
      clearTimeout(timer); // Cleanup timeout
      if (locomotiveScrollInstance && typeof locomotiveScrollInstance.destroy === 'function') {
        locomotiveScrollInstance.destroy(); // Destroy LocomotiveScroll instance
      }
    };
  }, [pathname, setIsLoading]);

  return (
    <AnimatePresence mode="wait">
       {isLoading && (pathname === '/' ? <PreLoader /> : <PagePreLoader />)}
    </AnimatePresence>
  );
}
