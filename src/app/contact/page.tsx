/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
//Native imports
import { useEffect, useRef, useState } from "react";

//Constant imports
import { FORM_LABELS, BUDGET_OPTIONS, ADDRESS } from '../../constants/contactStrings';

export default function Contact() {
  // section of states
  const [filledInputs, setFilledInputs] = useState({
    name: "",
    company: "",
    email: "",
    budget: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    company: false,
    email: false,
    budget: false,
    message: false,
  });
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Track the focus state of each input
  const [isFocused, setIsFocused] = useState({
    name: false,
    company: false,
    email: false,
    budget: false,
    message: false,
  });

  // constants section
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Utility functions section
  const handleSelect = (value: any) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  // Handle input changes and update state
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setFilledInputs((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when input changes
    setErrors((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  // Handle input focus
  const handleFocus = (e: any) => {
    const { name } = e.target;
    setIsFocused((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  // Handle input blur
  const handleBlur = (e: any) => {
    const { name } = e.target;
    setIsFocused((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newErrors = {
      name: !filledInputs.name.trim(),
      company: !filledInputs.company.trim(),
      email: !emailRegex.test(filledInputs.email),
      budget: !filledInputs.budget.trim(),
      message: !filledInputs.message.trim(),
    };

    setErrors(newErrors);

    // Stop form submission if there are errors
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    // Handle successful submission (e.g., API call)
    // console.log("Form submitted successfully", filledInputs);
  };

  // Helper function to parse and format the address paragraphs
  const formatAddress = (addressArray: string[]) => {
    return addressArray.map((paragraph, index) => (
      <p key={index} className="mb-[16px] text-[14px]">
        {paragraph.split("\n").map((line, idx) => (
          <span key={idx}>
            {line}
            {idx < paragraph.split("\n").length - 1 && <br />} {/* Line break between lines */}
          </span>
        ))}
      </p>
    ));
  };

  return (
    <>
      <div className="flex min-h-screen md:justify-center mt-[34px] mx-[16px] md:mt-[100px] gap-[24px] flex-col md:flex-row">
        {/* Animation Section */}
        <div className=" w-full h-[361px] md:w-[583px] md:h-[520px] bg-green-400 rounded-[16px] mb-[32px] md:mb-0">
          <div className="text-[40px] md:text-[56px] leading-[64px] tracking-[-0.04em] m-[48px_44px_40px_40px]">
            {FORM_LABELS.READY} {/* Text for animation section */}
          </div>
          <div className="m-[121px_40px_40px_40px] leading-[20px] text-[14px] md:m-[256px_40px_40px_40px]">
            {formatAddress(ADDRESS.paragraphs)} {/* Display formatted address */}
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-[583px] px-[16px] md:px-[40px] md:py-[86px]">
          <form className="space-y-[16px] md:space-y-[20px]" onSubmit={handleSubmit}>
            {/* Row 1: Name and Company */}
            <div className="flex flex-col md:flex-row gap-[16px]">
              <div className="flex-1 relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={filledInputs.name}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className={`peer block w-full p-[21px_16px_7px] text-[14px] ${errors.name ? "border border-[#EA5858]" : ""}`}
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className={`absolute left-[16px] transition-all ${isFocused.name || filledInputs.name
                    ? "bottom-[29px] top-[9px] text-[9px]"
                    : "bottom-[18px] text-[14px]"}`}
                >
                  {FORM_LABELS.NAME} {/* Name label */}
                </label>
              </div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={filledInputs.company}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className={`peer block w-full p-[21px_16px_7px] text-[14px] ${errors.company ? "border border-[#EA5858]" : ""}`}
                  placeholder=" "
                />
                <label
                  htmlFor="company"
                  className={`absolute left-[16px] transition-all ${isFocused.company || filledInputs.company
                    ? "bottom-[29px] top-[9px] text-[9px]"
                    : "bottom-[18px] text-[14px]"}`}
                >
                  {FORM_LABELS.COMPANY} {/* Company label */}
                </label>
              </div>
            </div>

            {/* Row 2: Budget and Email */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">

                {/* Custom drop down */}
                <div ref={dropdownRef} className={`dropdown-container flex-1 relative ${errors.budget ? "border rounded-[8px] border-[#EA5858]" : ""}`}>
                  {/* Dropdown */}
                  <div
                    className={`dropdown ${isOpen ? "open" : ""}`}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <div
                      className={`dropdown-selected ${!filledInputs.budget ? "text-transparent" : "" /* Hide placeholder */}
                        }`}
                    >
                      {filledInputs.budget
                        ? BUDGET_OPTIONS.find((option) => option.value === filledInputs.budget)?.label
                        : "Placeholder"} {/* Placeholder is hidden */}
                    </div>
                    {isOpen && (
                      <div className="dropdown-options">
                        {BUDGET_OPTIONS.map((option) => (
                          <div
                            key={option.value}
                            className="dropdown-option"
                            onClick={() => {
                              handleInputChange({ target: { name: "budget", value: option.value } });
                              setIsOpen(false); // Close the menu
                            }}
                          >
                            {option.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Budget Label */}
                <label
                  htmlFor="budget"
                  className={`absolute left-[16px] flex items-center gap-[4px] transition-all ${isFocused.budget || filledInputs.budget
                    ? "bottom-[29px] top-[9px] text-[9px]"
                    : "bottom-[18px] text-[14px]"}`}
                >
                  {FORM_LABELS.BUDGET} {/* Budget label */}
                  {/* Exclamation button */}
                  <svg
                    width={filledInputs.budget ? 10 : 16}
                    height={filledInputs.budget ? 10 : 16}
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="group"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6ZM4.75 5.5C4.75 5.08579 5.08579 4.75 5.5 4.75H5.99739C6.1963 4.75 6.38707 4.82902 6.52772 4.96967C6.66837 5.11032 6.74739 5.30109 6.74739 5.5V8.29176C7.04005 8.39398 7.25 8.67247 7.25 9C7.25 9.41421 6.91421 9.75 6.5 9.75H5.99739C5.58318 9.75 5.24739 9.41421 5.24739 9V6.2064C4.95746 6.1027 4.75 5.82558 4.75 5.5ZM6 2.5C5.58579 2.5 5.25 2.83579 5.25 3.25C5.25 3.66421 5.58579 4 6 4C6.41421 4 6.75 3.66421 6.75 3.25C6.75 2.83579 6.41421 2.5 6 2.5Z"
                      fill="#727272"
                      className="group-hover:fill-[#BABABA]"
                    />
                  </svg>
                </label>
              </div>

              <div className="flex-1 relative">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={filledInputs.email}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className={`peer block w-full p-[21px_16px_7px] text-[14px] ${errors.email ? "border border-[#EA5858]" : ""}`}
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className={`absolute left-[16px] transition-all ${isFocused.email || filledInputs.email
                    ? "bottom-[29px] top-[9px] text-[9px]"
                    : "bottom-[18px] text-[14px]"}`}
                >
                  {FORM_LABELS.EMAIL} {/* Email label */}
                </label>
              </div>
            </div>

            {/* Row 3: Message */}
            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={filledInputs.message}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`h-[144px] peer block w-full p-[21px_16px_7px] text-[14px] ${errors.message ? "border border-[#EA5858]" : ""}`}
                placeholder=" "
              ></textarea>
              <label
                htmlFor="message"
                className={`absolute left-[16px] transition-all ${isFocused.message || filledInputs.message
                  ? "bottom-[1399px] top-[9px] text-[9px]"
                  : "bottom-[110px] top-[20px] text-[14px]"}`}
              >
                {FORM_LABELS.MESSAGE} {/* Message label */}
              </label>
            </div>

            {/* Row 4: Send Button */}
            <div className="flex justify-start">
              <button
                type="submit"
                className="border border-[#727272] w-[84px] h-[40px] rounded-[32px] bg-[#121212] text-[#727272] hover:border-[#BABABA]"
              >
                {FORM_LABELS.SEND} {/* Send button */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
