import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const images = [
  {
    id: 1,
    title: "Figma AI Translation",
    year: "2021",
    src: "/media/images/play/gellary2.png",
  },
  {
    id: 2,
    title: "Availability",
    year: "2022",
    src: "/media/images/play/gellary1.png",
  },
  {
    id: 3,
    title: "Figma AI Translation",
    year: "2021",
    src: "/media/images/play/gellary2.png",
  },
  {
    id: 4,
    title: "Availability",
    year: "2022",
    src: "/media/images/play/gellary1.png",
  },
  {
    id: 5,
    title: "Figma AI Translation",
    year: "2021",
    src: "/media/images/play/gellary2.png",
  },
  {
    id: 6,
    title: "Figma AI Translation",
    year: "2021",
    src: "/media/images/play/gellary2.png",
  },
  {
    id: 7,
    title: "Availability",
    year: "2022",
    src: "/media/images/play/gellary1.png",
  },
  {
    id: 8,
    title: "Figma AI Translation",
    year: "2021",
    src: "/media/images/play/gellary2.png",
  },
  {
    id: 9,
    title: "Availability",
    year: "2022",
    src: "/media/images/play/gellary1.png",
  },
  {
    id: 10,
    title: "Figma AI Translation",
    year: "2021",
    src: "/media/images/play/gellary2.png",
  },
  {
    id: 11,
    title: "Figma AI Translation",
    year: "2021",
    src: "/media/images/play/gellary2.png",
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      const container = listRef.current;
      const imageHeight = 104; // Adjust based on the actual height of each image
      const selectedIndex = images.findIndex(
        (img) => img.id === selectedImage.id
      );

      // Calculate the top position to center the selected image
      const scrollPosition =
        selectedIndex * imageHeight -
        container.clientHeight / 2 +
        imageHeight / 2;

      container.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [selectedImage]);

  const handleImageSelect = (image: (typeof images)[0]) => {
    setSelectedImage(image);
  };

  // Determine the group of the selected image
  const getImageGroup = (index: number) => {
    if (index < 5) return "top";
    if (index === 5) return "top";
    return "bottom";
  };

  const selectedImageIndex = images.findIndex(
    (image) => image.id === selectedImage.id
  );
  const imageGroup = getImageGroup(selectedImageIndex);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="flex flex-col items-center lg:items-start lg:ml-[35%] md:p-0 p-2">
        <motion.div
          key={selectedImage.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center items-center text-center bg-[#121212] w-full max-w-[700px] h-[300px] md:h-[350px] lg:h-[400px] rounded-lg"
        >
          <img
            src={selectedImage.src}
            alt={selectedImage.title}
            className="w-72 h-48 md:w-96 md:h-64 object-cover rounded-lg shadow-lg"
          />
        </motion.div>

        <div className="flex flex-row w-full md:max-w-[700px] mt-4 px-2">
          <motion.div
            key={selectedImage.title}
            initial={{
              opacity: 0,
              y: imageGroup === "top" ? -30 : imageGroup === "bottom" ? 30 : 0,
            }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: imageGroup === "top" ? 30 : imageGroup === "bottom" ? -30 : 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeIn",
            }}
            className="flex md:flex-row flex-col md:items-center md:justify-between space-y-3 md:space-y-0"
          >
            <p className="text-[24px] font-normal leading-[28px] tracking-[-0.04em] text-[#E0E0E0]">
              {selectedImage.title}
            </p>
            <p className="text-[13px] font-normal leading-[10px] tracking-[-0.04em] text-[#727272] md:ml-64">
              {selectedImage.year}
            </p>
          </motion.div>
          <p className="text-[13px] font-normal leading-[10px] tracking-[-0.04em] text-[#727272] md:mt-2 mt-10 ml-auto">
            {"// SOREN IVERSON"}
          </p>
        </div>
      </div>

      <div className="w-full lg:absolute lg:inset-0 lg:-top-10 lg:left-32 lg:w-[280px] lg:h-full h-24 mt-6 lg:mt-0 -left-8">
        <div
          ref={listRef}
          className="flex lg:flex-col overflow-x-auto lg:h-full h-28 lg:overflow-y-auto scrollbar-hide lg:px-0"
        >
          {images.map((image) => (
            <motion.div
              key={image.id}
              onClick={() => handleImageSelect(image)}
              initial={{ opacity: 0.6, scale: 0.9 }}
              animate={{
                opacity: selectedImage.id === image.id ? 1 : 0.6,
                scale: selectedImage.id === image.id ? 1.05 : 0.9,
              }}
              transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              layoutScroll
              className="flex-shrink-0 mt-1 cursor-pointer flex justify-center items-center"
            >
              <img
                src={image.src}
                alt={image.title}
                className={`w-[100px] h-[70px] md:w-[100px] md:h-[100px] object-cover rounded-lg ${
                  selectedImage.id === image.id
                    ? "p-1 border-[1px] border-[#727272]"
                    : ""
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
