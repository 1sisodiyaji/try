import React from "react";
import { privacyData } from "../../constants/privacyData";

export default function Privacy() {
  // Define reusable colors for headings, text, and underline
  const headColor = "rgba(224,224,224,1)"; // Main heading color
  const textColor = "rgba(224,224,224,0.5)"; // Paragraph text color
  const underLineColor = "rgba(34, 34, 34, 1)"; // Horizontal rule color

  // Function to parse text and convert URLs into clickable links
  const parseTextWithLinks = (text:string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g; // Regex for detecting URLs
    const parts = text.split(urlRegex); // Split text into URLs and other text
  
    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        // Render URLs as links
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ color: textColor }}
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
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Heading Section */}
      <div className="fixed left-[16px] top-[69px] lg:left-[125px] lg:top-[88px] w-[95%] lg:w-[420px]">
        <h1
          className="text-[40px] lg:text-[56px] leading-[48px] lg:leading-[64px] tracking-[-0.04em] text-left"
          style={{ color: headColor }}
          
        >
          {privacyData.heading}
        </h1>
        <p
          className="text-[13px] leading-[10px] mt-[16px] text-left"
          style={{ color: textColor }}
        >
          {`LAST UPDATED . ${privacyData.lastUpdated}`}
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
          {privacyData.headParagraphs.map((para, i) => (
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
        {privacyData.content.map((section, index) => (
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
