import React, { useState, useEffect } from "react";
import { redblood1, redblood2, redblood3 } from "./imageImports";

// --- START: Image Carousel Data ---
const images = [
  {
    url: redblood1,
    title: "Know your status. Protect yourself. Stop HIV.",
    subtitle: "STOP THE STIGMA NOW",
  },
  {
    url: redblood2,
    title: "Knowledge is protection.",
    subtitle: "Get tested. Stay safe. End HIV.",
  },
  {
    url: redblood3,
    title: "Stigma hurts, awareness heals.",
    subtitle: "Awareness saves lives.",
  },
];
// --- END: Image Carousel Data ---

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    // This logic correctly wraps around to 0
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    // Set up the automatic transition every 5 seconds
    const intervalId = setInterval(goToNext, 5000);
    // Cleanup function runs when the component unmounts or dependencies change
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures it runs only on mount/unmount

  const currentImage = images[currentIndex];

  return (
    <div className='h-[250px] md:h-[250px] w-auto mt-20 w-full relative overflow-hidden'>
      <div
        key={currentIndex}
        className='absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out'
        style={{ backgroundImage: `url('${currentImage.url}')`, opacity: 1 }}
      >
        <div className='absolute inset-0 bg-black opacity-80 '></div>

        <div className='h-full w-full flex flex-col items-center justify-center relative z-10 text-center'>
          <div className='absolute inset-0 bg-black opacity-40 shadow-none flex flex-col items-center justify-center p-4'>
            <h1 className='text-3xl  font-bold text-white mb-2'>
              {currentImage.title}
            </h1>
            <p className='text-m  font-medium text-white opacity-90 max-w-xl mx-auto'>
              {currentImage.subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
