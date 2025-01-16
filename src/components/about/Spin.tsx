// orignal code 
// 'use client';

// import { motion } from 'framer-motion';
// import React, { useState } from 'react';

// // Replace these with your actual image URLs
// const images = [
//   '/media/images/confirmation.png',
//   '/media/images/about-gradient.png',
//   '/media/images/contact_gradient.png',
//   '/media/images/desktop-nav.png',
//   '/media/images/home-gradient.png',
//   '/media/images/gradient-frame.png',
// ];

// export default function SpinningImageWheel() {
//   const [activeIndex, setActiveIndex] = useState(0); // Active image index
//   const [isSpinning, setIsSpinning] = useState(false);

//   // Number of segments in the wheel
//   const totalImages = images.length;
//   const degreePerImage = 360 / totalImages;

//   const spinToImage = (clickedIndex: number) => {
//     if (isSpinning) return; // Prevent clicking while spinning
//     setIsSpinning(true);

//     // const clicks = (clickedIndex - activeIndex + totalImages) % totalImages; // Calculate rotation steps

//     setTimeout(() => {
//       setActiveIndex(clickedIndex);
//       setIsSpinning(false);
//     }, 100); // Match the animation duration
//   };

//   return (
//     <div className="relative flex flex-col items-center justify-center h-screen bg-black overflow-hidden">
//       {/* Rotating Wheel */}
//       <motion.div
//         className="relative flex items-center justify-center w-[400px] h-[400px] rounded-full"
//         animate={{
//           rotate: `-${(activeIndex % totalImages) * degreePerImage + 180}deg`, // Align active image to left
//         }}
//         transition={{ duration: 1, ease: 'easeInOut' }}
//       >
//         {/* Images */}
//         {images.map((img, index) => {
//           const isActive = index === activeIndex;

//           return (
//             <motion.div
//               key={index}
//               className={`absolute cursor-pointer transition-all duration-500`}
//               style={{
//                 transform: `
//                   rotate(${index * degreePerImage}deg) 
//                   translate(180px) 
//                   rotate(-${index * degreePerImage}deg)
//                 `,
//                 filter: isActive ? 'none' : 'grayscale(100%)',
//               }}
//               onClick={() => spinToImage(index)}
//             >
//               <motion.img
//                 src={img}
//                 alt={`Image ${index}`}
//                 className="w-20 h-20 object-cover rounded-lg border border-white"
//                 animate={{
//                   scale: isActive ? 1.5 : 1, // Proper scaling for active image
//                 }}
//                 transition={{ duration: 0.5 }}
//               />
//             </motion.div>
//           );
//         })}
//       </motion.div>
//     </div>
//   );
// }



'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';

// Replace these with your actual image URLs
const images = [
  '/media/images/confirmation.png',
//   '/media/images/about-gradient.png',
//   '/media/images/contact_gradient.png',
//   '/media/images/desktop-nav.png',
//   '/media/images/home-gradient.png',
//   '/media/images/gradient-frame.png',
'/media/images/confirmation.png',
'/media/images/confirmation.png',
'/media/images/confirmation.png',
'/media/images/confirmation.png',
'/media/images/confirmation.png',
];

export default function SpinningImageWheel() {
  const [activeIndex, setActiveIndex] = useState(0); // Active image index
  const [isSpinning, setIsSpinning] = useState(false);

  // Number of segments in the wheel
  const totalImages = images.length;
  const degreePerImage = 360 / totalImages;

  const spinToImage = (clickedIndex: number) => {
    if (isSpinning) return; // Prevent clicking while spinning
    setIsSpinning(true);

    setTimeout(() => {
      setActiveIndex(clickedIndex);
      setIsSpinning(false);
    }, 100); // Match the animation duration
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-black overflow-hidden">
      {/* Rotating Wheel */}
      <motion.div
        className="relative flex items-center justify-center w-[400px] h-[400px] rounded-full"
        animate={{
          rotate: `-${(activeIndex % totalImages) * degreePerImage + 180}deg`, // Align active image to left
        }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
         
        {/* Images */}
        {images.map((img, index) => {
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={index}
              className={`absolute cursor-pointer transition-all duration-500`}
              style={{
                transform: `
                   rotate(${index * degreePerImage}deg) 
                  translate(180px) 
                  rotate(${90}deg) 
                  rotate(${90}deg)
                `,
                filter: isActive ? 'none' : 'grayscale(100%)',
              }}
              onClick={() => spinToImage(index)}
            >
              <motion.img
                src={img}
                alt={`Image ${index}`}
                className="w-20 h-20 object-cover rounded-lg border border-white"
                animate={{
                  scale: isActive ? 1.5 : 1, // Proper scaling for active image
                }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          );
        })}
      </motion.div>
      <div className="absolute text-center text-white font-bold text-xl z-10">
          <p>$5B+</p>
          <p>
          REVENUE INFLUENCE
          </p>
        </div>
    </div>
  );
}
