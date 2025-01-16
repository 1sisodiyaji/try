/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { termsData } from "../../constants/termsData";

export default function Privacy() {
  // Define reusable colors for headings, text, and underline
  const headColor = "rgba(224,224,224,1)"; // Main heading color
  const textColor = "rgba(224,224,224,0.5)"; // Paragraph text color
  const underLineColor = "rgba(34, 34, 34, 1)"; // Horizontal rule color
  const linkColor="rgba(224,224,224,0.7)" // Link color


const links:any = {
    "Privacy Policy": "http://localhost:3000/privacy"
};

const parseTextWithLinks = (text: string) => {
    // Create a regex that combines URL detection and links object keys
    const urlRegex = new RegExp(`(https?://[^\\s]+)|(${Object.keys(links).map(key => 
        key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Escape special regex characters
    ).join('|')})`, 'g');
    
    const parts = text.split(urlRegex);
  
    return parts.map((part, index) => {
        if (!part) return null; // Skip empty parts
        
        // Check if part is a URL
        if (/(https?:\/\/[^\s]+)/.test(part)) {
            return (
                <a
                    key={index}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                    style={{ color: linkColor }}
                >
                    {part}
                </a>
            );
        }
        
        // Check if part is a key in the links object
        if (links[part]) {
            return (
                <a
                    key={index}
                    href={links[part]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                    style={{ color: linkColor }}
                >
                    {part}
                </a>
            );
        }
  
        // Handle plain text with potential line breaks
        return part.split("\n").map((line, i) => (
            <React.Fragment key={`${index}-${i}`}>
                {i > 0 && <br />} {/* Add line breaks */}
                {line}
            </React.Fragment>
        ));
    }).filter(Boolean); // Remove null entries
};

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Heading Section */}
      <div className="fixed left-[16px] top-[69px] lg:left-[125px] lg:top-[88px] w-[95%] lg:w-[420px]">
        <h1
          className="text-[40px] lg:text-[56px] leading-[48px] lg:leading-[64px] tracking-[-0.04em] text-left"
          style={{ color: headColor }}
        >
          {termsData.heading}
        </h1>
        <p
          className="text-[13px] leading-[10px] mt-[16px] text-left"
          style={{ color: textColor }}
        >
          {`LAST UPDATED . ${termsData.lastUpdated}`}
        </p>
        <hr
          className="mt-[32px] w-full"
          style={{ border: `1px solid ${underLineColor}` }}
        />
      </div>

      {/* Content Section */}
      <div className="mt-[200px] lg:mt-[211px] mx-[16px] lg:ml-[595px] lg:mr-[125px] lg:max-w-[720px]">
        {/* Head Paragraphs */}
        <div className="mb-[40px]">
          {termsData.headParagraphs.map((para, i) => (
            <div key={i} className="mb-[16px]">
              <p
                className="font-sans font-normal text-[16px] leading-[24px]"
                style={{ color: textColor }}
              >
                {parseTextWithLinks(para)}
              </p>
            </div>
          ))}
        </div>

        {/* Content Sections */}
        {termsData.content.map((section, index) => (
          <div key={index} className="mb-[40px]">
            <h2
              className="font-sans font-medium text-[18px] leading-[28px] mb-[24px]"
              style={{ color: headColor }}
            >
              {section.title}
            </h2>
            {section.paragraphs.map((para, i) => (
              <div key={i} className="mb-[24px]">
                {Array.isArray(para) ? (
                  <ul className="list-disc ml-4 lg:ml-6">
                    {para.map((item, j) => (
                      <li
                        key={j}
                        className="mt-1 font-sans font-normal text-[18px] leading-[28px]"
                        style={{ color: textColor }}
                      >
                        {parseTextWithLinks(item)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p
                    className="font-sans font-normal text-[18px] leading-[28px]"
                    style={{ color: textColor }}
                  >
                    {parseTextWithLinks(para)}
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
