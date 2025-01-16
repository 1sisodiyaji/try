import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css";
import MainContentWrapper from "@/components/MainContentWrapper";
import CustomCursor from "@/utils/CustomCursor";

export const metadata: Metadata = {
  title: "CraftFossLabs",
  description: "Creative Technology Agency",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-[#00020F] text-white'>
        <MainContentWrapper>{children}</MainContentWrapper>
        <CustomCursor />
      </body>
    </html>
  );
}
