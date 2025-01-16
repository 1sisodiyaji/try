import React from "react";
import Link from "next/link";
import { Icons } from "../../../public/icons";
import {
  FOOTER_LINKS,
  FOOTER_COPYRIGHT,
  FOOTER_LOCATION,
  FOOTER_MISC_LINKS,
} from "../../constants/Footer";
const Footer = () => {
  return (
    <footer className='footer px-6 py-8 relative overflow-hidden'>
      <div className='absolute inset-0 opacity-50'></div>
      <div className='mx-auto relative z-10'>
        <div className='flex flex-col md:flex-row justify-between items-start mb-8'>
          <div className='grid grid-cols-2 gap-8 text-sm'>
            <div>
              <h3 className='legal-link mb-6'>{FOOTER_LINKS.PAGES_HEADING}</h3>
              <ul className='space-y-3'>
                {FOOTER_LINKS.PAGES.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className='menu whitespace-nowrap'>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className='legal-link mb-6'>{FOOTER_LINKS.SOCIAL_HEADING}</h3>
              <ul className='space-y-3'>
                {FOOTER_LINKS.SOCIAL.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className='menu whitespace-nowrap'>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='flex justify-center md:mt-0 mt-8'>
            <Icons.Dot className='mr-2' />
            <p className='menu'>{FOOTER_LOCATION}</p>
          </div>
        </div>
        <div className='border-b mt-[88px] pb-8 border-seperator flex flex-col md:flex-row justify-between md:items-center border-[#333333]'>
          <div className='flex items-center md:mt-0 mt-4 cursor-pointer'>
            <p className='menu'>{FOOTER_COPYRIGHT}</p>
          </div>
          <div className='mt-6 md:mt-0 space-x-8 '>
            {FOOTER_MISC_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='legal-link whitespace-nowrap'
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className='flex justify-center mt-8'>
        <h1 className='w-full font-extrabold text-white md:text-8xl text-lg'>
          {" "}
          CraftFossLabs
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
