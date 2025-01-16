'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface LoaderContextType {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  animationStep: number;
  setAnimationStep: (value: number) => void;
}

const LoaderContext = createContext<LoaderContextType>({
  isLoading: true,
  setIsLoading: () => {},
  animationStep: 1,
  setAnimationStep: () => {},
});

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [animationStep, setAnimationStep] = useState(1);

  // Handle initial page load
  useEffect(() => {
    // Initial page load timer
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []); // Empty dependency array for initial load only

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading, animationStep, setAnimationStep }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
}
