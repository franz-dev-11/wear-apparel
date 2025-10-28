import React, { useState, useEffect } from "react";
import Header from "../components/Header";

// --- START: Local Image Imports (for carousel) ---
// IMPORTANT: These paths must be correct relative to this file's location.
import redblood1 from "/src/img/redblood1.png";
import redblood2 from "/src/img/redblood2.png";
import redblood3 from "/src/img/redblood3.png";
import ARinfo from "/src/img/AR.png";
// --- END: Local Image Imports ---

// --- START: Fullscreen Image Modal Component (NEW) ---
const FullscreenImageModal = ({ isOpen, onClose, imageUrl, altText }) => {
  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 transition-opacity'
      onClick={onClose}
    >
      <div
        className='p-4 max-h-full max-w-full'
        onClick={(e) => e.stopPropagation()} // Prevent modal closing when clicking the image/content area
      >
        <button
          className='absolute top-4 right-4 text-white text-4xl font-light hover:text-red-500 transition'
          onClick={onClose}
          aria-label='Close Fullscreen View'
        >
          &times;
        </button>
        <img
          src={imageUrl}
          alt={altText}
          className='max-h-[90vh] max-w-[90vw] object-contain cursor-default'
        />
      </div>
    </div>
  );
};
// --- END: Fullscreen Image Modal Component (NEW) ---

// --- START: Simple Image Carousel Component (With Subtitles) ---
const images = [
  {
    url: redblood1,
    title: "Discovering Healthy Red Blood Cells",
    subtitle: "Essential carriers of oxygen and life force.",
  },
  {
    url: redblood2,
    title: "Analyzing Blood Flow Dynamics",
    subtitle: "Understanding microcirculation at a cellular level.",
  },
  {
    url: redblood3,
    title: "Magnified View of Cellular Structure",
    subtitle: "Focusing on the biconcave shape and membrane integrity.",
  },
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(goToNext, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const currentImage = images[currentIndex];

  return (
    <div className='h-64 w-full relative overflow-hidden'>
      <div
        className='absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out'
        style={{ backgroundImage: `url('${currentImage.url}')` }}
      >
        <div className='absolute inset-0 bg-black opacity-30'></div>
        <div className='h-full w-full flex flex-col items-center justify-center relative z-10 p-4 text-center'>
          <h1 className='text-4xl font-extrabold text-white mb-2'>
            {currentImage.title}
          </h1>
          <p className='text-xl font-medium text-white opacity-90 max-w-xl'>
            {currentImage.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};
// --- END: Simple Image Carousel Component (With Subtitles) ---

// --- START: AR Info Section Component (Integrated) ---
// MODIFIED: Added onImageClick prop
const ARInfoSection = ({ onImageClick }) => {
  return (
    <section className='bg-white py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-8xl mx-auto border-4 border-red-500 rounded-lg p-6 md:p-10 flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12'>
        {/* Left Content Area (Text) */}
        <div className='flex-1 text-center lg:text-left'>
          <h2 className='text-4xl sm:text-5xl font-extrabold text-red-600 leading-tight mb-4'>
            NOT JUST AN APPAREL —<br className='hidden sm:inline' /> EXPERIENCE
            AUGMENTED REALITY!
          </h2>
          <p className='text-gray-700 text-lg leading-relaxed'>
            Every shirt you buy from our{" "}
            <span className='font-bold'>wear.apparel</span> collection is more
            than just clothing — it's an innovation. Each apparel includes a{" "}
            <span className='font-bold text-red-600'>QR code</span> printed on
            it. Once scanned, it reveals an{" "}
            <span className='font-bold text-red-600'>
              Augmented Reality (AR) experience
            </span>{" "}
            that brings awareness to life with HIV. Learn, engage, and advocate
            — all through your shirt!
          </p>
        </div>

        {/* Right Content Area (Image/Diagram) */}
        <div className='flex-1 min-w-0'>
          {/* NEW: Make the image clickable */}
          <button
            onClick={onImageClick}
            className='block w-full text-left focus:outline-none focus:ring-4 focus:ring-red-500/50 rounded-md transition duration-150 ease-in-out'
            aria-label='View Augmented Reality Information in Fullscreen'
          >
            <img
              src={ARinfo}
              alt='Features of Wear Augmented Reality (Click to enlarge)'
              className='max-w-full h-auto object-contain rounded-md hover:opacity-80 transition duration-150 ease-in-out'
            />
          </button>
        </div>
      </div>
    </section>
  );
};
// --- END: AR Info Section Component (Integrated) ---

const LandingPage = () => {
  const [hasMounted, setHasMounted] = React.useState(false);
  // NEW: State for the fullscreen modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // NEW: Handlers for the modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />

      <ImageCarousel />

      {/* The AR Info Section is rendered here */}
      {/* MODIFIED: Pass the openModal handler */}
      <ARInfoSection onImageClick={openModal} />

      <main className='container mx-auto py-12 px-4'>
        <h2 className='text-3xl font-bold text-gray-800 mb-4'>Welcome Back!</h2>
        <p className='text-gray-600'>
          This content appears below the local image banner.
        </p>
      </main>

      {/* NEW: Render the Fullscreen Modal */}
      <FullscreenImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageUrl={ARinfo}
        altText='Features of Wear Augmented Reality'
      />
    </div>
  );
};

export default LandingPage;
