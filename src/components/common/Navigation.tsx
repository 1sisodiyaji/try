"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useLoader } from "@/context/LoaderContext";
import { Icons } from "../../../public/icons";

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setIsLoading } = useLoader();
  const [isCommuinityOpen, setIsCommuinityOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = () => {
      setIsCommuinityOpen(false);
      if (menuOpen) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [menuOpen , isCommuinityOpen]);

  const handleNavigation = (path: string) => {
    if (path === pathname) return;

    setIsLoading(true);
    setMenuOpen(false);
    setTimeout(() => {
      router.push(path);
    }, 100);
  };

  const mainNavigationItems = [
    { label: "Home", path: "/" },
    { label: "Developments", path: "/projects" },
    { label: "About", path: "/about" },
    { label: "Community", path: "/community" },
  ];

  const renderMainNavigationButtons = (isMobile = false) => {
    const itemsToRender = isMobile
      ? mainNavigationItems
      : mainNavigationItems.filter((item) => item.label !== "Community");

    return itemsToRender.map((item) => (
      <button
        key={item.path}
        onClick={() => handleNavigation(item.path)}
        className={`text-white transition-transform uppercase font-semibold ${
          isMobile
            ? "text-lg p-2 rounded-lg hover:bg-[#222] hover:scale-105"
            : "p-2 hover:scale-105"
        }`}
      >
        {item.label}
      </button>
    ));
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[70%] 
    rounded-full flex justify-between items-center z-50 py-2 px-6 
    transition-all duration-300 ease-in-out
    ${isScrolled ? "bg-gradient-to-r from-[#080B1D] to-[#1f1f1f90] shadow-xl backdrop-blur-sm border border-[#232D6B]" : "bg-transparent border-transparent"}`}
    >
      {/* Left: Main Navigation */}
      <div className='flex items-center gap-4 md:gap-6'>
        <div className='hidden md:flex gap-6'>
          {renderMainNavigationButtons()}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          className='text-white hover:opacity-80 transition-opacity uppercase md:hidden'
        >
          <Icons.Menu className='h-10 w-10 stroke-slate-100' />
        </button>
      </div>

      {/* Center: Logo */}
      <div className='flex justify-center'>
        <button onClick={() => handleNavigation("/")}>
          <Image
            src='/logo.png'
            alt='company Logo'
            width={50}
            height={50}
            priority
          />
        </button>
      </div>

      {/* Right: Additional Navigation */}
      <div className='hidden md:flex justify-end items-center gap-6'>
        <div className="relative">
  
      <button
        onClick={() => setIsCommuinityOpen(!isCommuinityOpen)}
        className="text-white uppercase font-semibold p-2 hover:scale-105 transition-transform"
      >
        Community
      </button>

      {/* Dropdown Menu */}
      {isCommuinityOpen && (
        <div className="absolute top-10 left-0 bg-white text-black rounded shadow-lg w-48">
          <ul>
            <li
              onClick={() => handleNavigation("/blogs")}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              Blogs
            </li>
            <li
              onClick={() => handleNavigation("/contributors")}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              Contributors
            </li>
          </ul>
        </div>
      )}
    </div>
        <button
          onClick={() => handleNavigation("/github")}
          className="relative h-12 w-12 flex justify-center items-center 
            rounded-full floating-bg bg-gradient-to-r from-[#faf9fa] to-[#2c2c2c] 
            hover:scale-105 transition-transform after:content-[''] after:absolute 
            after:bottom-[-8px] after:left-1/2 after:transform 
            after:-translate-x-1/2 after:w-[70%] after:h-2 after:rounded-full 
            after:bg-white after:blur-md after:opacity-75"
        >
          <Icons.Github className='h-12 w-12' />
        </button>

        <button
          onClick={() => handleNavigation("/contact")}
          className='text-white uppercase font-semibold px-4 h-12 rounded-full 
            bg-gradient-to-r from-[#232D6B] to-[#2575fc] hover:scale-105 
            transition-transform'
        >
          Contact Us
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='fixed top-16 left-0 w-full px-4 z-50'>
          <div
            onClick={(e) => e.stopPropagation()}
            className='bg-[#121212] bg-opacity-95 flex flex-col items-start 
            text-white gap-4 p-6 rounded-lg shadow-lg border border-[#333]'
          >
            {renderMainNavigationButtons(true)}
            {/* Mobile-specific Additional Buttons */}
            <div className='w-full flex flex-col gap-4'>
              <button
                onClick={() => handleNavigation("/github")}
                className='flex items-center justify-center w-full p-2 rounded-lg 
                  bg-gradient-to-r from-[#faf9fa] to-[#2c2c2c] hover:scale-105 
                  transition-transform'
              >
                <Icons.Github className='h-6 w-6 mr-2' />
                GitHub
              </button>
              <button
                onClick={() => handleNavigation("/contact")}
                className='text-white w-full p-3 rounded-lg bg-gradient-to-r 
                  from-[#232D6B] to-[#2575fc] hover:scale-105 
                  transition-transform uppercase font-semibold text-lg'
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
