"use client";

import Link from "next/link";

export default function Projects() {
  return (
    <main className="min-h-screen">
      <section className="relative">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center min-h-screen">
            {/* Content Section */}
            <div className="w-full lg:w-2/5 px-6 lg:px-0 py-16 lg:py-0 z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-wide">
                Projects
              </h1>
              <p className="mt-6 text-xl text-grey/80 tracking-wide max-w-xl">
                Harness the potential of your innovative spirit.
              </p>
              <div className="mt-10">
                <Link
                  href="#all-projects"
                  className="inline-block text-center text-white tracking-widest capitalize 
                           bg-black hover:bg-black/90 transition-colors
                           rounded-full px-8 py-3 shadow-lg hover:shadow-xl"
                >
                  Find Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}