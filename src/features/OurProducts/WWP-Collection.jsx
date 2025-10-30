import React, { useState } from "react";
// Import icons
import { ShoppingCart, Menu, X } from "lucide-react";
// Import assets
import Logo from "/src/img/LOGO.jpg";
// Import Size Chart Modal and Images (assuming they are in the same relative folder as the original ShowcaseSection)
import SizeChartModal from "../LandingPage/SizeChartModal";
import {
  showcase1a,
  showcase1b,
  showcase2a,
  showcase2b,
  showcase3a, // Not used but kept for completeness of imports
  showcase3b, // Not used but kept for completeness of imports
} from "./imageImports-WWP";

// --- START: Copied and Modified Components from ShowcaseSection.jsx ---

const sizes = ["S", "M", "L", "XL", "XXL"];

// Component for a single product card with front/back toggle
const ClothesCard = ({ name, description, frontImage, backImage }) => {
  const [isFrontView, setIsFrontView] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isChartModalOpen, setIsChartModalOpen] = useState(false); // State for the Size Chart Modal

  const handleAction = (action) => {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }
    // Simulate action (In a real app, you'd send a request here)
    alert(`${name} (Size: ${selectedSize}) processed for: ${action}!`);
  };

  return (
    <div className='bg-white rounded-lg shadow-xl overflow-hidden flex flex-col'>
      {/* Image Carousel/Toggle */}
      <div className='relative h-96 bg-[#A9A9A9] flex-shrink-0'>
        <img
          src={isFrontView ? frontImage : backImage}
          alt={`${name} ${isFrontView ? "Front" : "Back"}`}
          className='w-full h-full object-cover transition duration-300 ease-in-out'
        />
        {/* Toggle Button */}
        <button
          onClick={() => setIsFrontView(!isFrontView)}
          className='absolute bottom-3 left-3 px-3 py-1 bg-black bg-opacity-70 text-white text-xs rounded-full font-medium uppercase hover:bg-opacity-90 transition'
        >
          View {isFrontView ? "Back" : "Front"}
        </button>
      </div>

      {/* Info, Size Selection, and Buttons */}
      <div className='p-6 flex flex-col flex-grow'>
        <h3 className='text-2xl font-bold text-gray-900 mb-2'>{name}</h3>
        {/* Min-height ensures alignment consistency */}
        <p className='text-gray-600 mb-4 text-sm min-h-[40px] flex-grow'>
          {description}
        </p>

        {/* Size Selection Section */}
        <div className='mb-4'>
          <p className='font-semibold text-gray-800 mb-2'>Select Size:</p>
          <div className='flex flex-wrap gap-2 mb-3'>
            {sizes.map((size) => (
              // Use a div as a clickable element and manage state manually
              <div
                key={size}
                onClick={() => {
                  // Manual click handler to toggle selection
                  if (selectedSize === size) {
                    setSelectedSize(null); // Deselect on second click
                  } else {
                    setSelectedSize(size); // Select on first click
                  }
                }}
                className={`cursor-pointer border-2 rounded-lg px-3 py-1 text-sm font-medium transition-colors select-none ${
                  selectedSize === size
                    ? "bg-black text-white border-black shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:border-black"
                }`}
              >
                {size}
                {/* Hidden input for form management */}
                <input
                  type='radio'
                  name={`${name}-size`}
                  value={size}
                  checked={selectedSize === size}
                  onChange={() => {}}
                  className='hidden'
                />
              </div>
            ))}
          </div>
          {/* View Size Chart Button */}
          <button
            onClick={() => setIsChartModalOpen(true)}
            className='text-xs font-medium text-red-600 hover:text-red-700 transition'
          >
            View Size Chart
          </button>
        </div>

        {/* Action Buttons */}
        <div className='flex space-x-3 mt-auto pt-3 border-t border-gray-100'>
          <button
            onClick={() => handleAction("Add to Cart")}
            disabled={!selectedSize}
            className={`flex-1 py-3 text-sm font-semibold rounded-lg transition ${
              selectedSize
                ? "border border-black text-black hover:bg-black hover:border-black hover:text-gray-100"
                : "border border-gray-400 text-gray-400 cursor-not-allowed"
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Size Chart Modal (outside the main card content but still part of the component logic) */}
      <SizeChartModal
        isOpen={isChartModalOpen}
        onClose={() => setIsChartModalOpen(false)}
      />
    </div>
  );
};

// Modified Showcase Section Component (Renamed and Filtered)
const WwpCollectionSection = () => {
  // Placeholder data for all clothes items
  const allClothesData = [
    {
      id: 1,
      name: "WWP Hoodie White",
      description:
        "The WWP Hoodie from the Walk With Pride Collection promotes courage and acceptance. It carries the statement “It’s a Virus, Not a Judgment” — a reminder to walk with pride and compassion.",
      frontImage: showcase1a, // Placeholder image path
      backImage: showcase1b, // Placeholder image path
    },
    {
      id: 2,
      name: "WWP Shirt White",
      description:
        "The WWP T-Shirt offers a relaxed, breathable fit with the same inspiring design from the Walk With Pride Collection. Empowers wearers to stand up for awareness and equality in everyday style.",
      frontImage: showcase2a, // Placeholder image path
      backImage: showcase2b, // Placeholder image path
    },
    {
      id: 3,
      name: "WWP Sweater White",
      description:
        "The WWP Sweater, featuring a clean front logo and a powerful back design that reads “Walk With Pride,” this piece blends comfort with advocacy — perfect for making a statement with purpose.",
      frontImage: showcase3a, // Placeholder image path
      backImage: showcase3b, // Placeholder image path
    },
  ];

  // Filter: Keep only items that start with "WWP"
  const wwpClothesData = allClothesData.filter((item) =>
    item.name.startsWith("WWP")
  );

  return (
    // Added 'pt-32' to offset for the fixed header
    <section className='py-16 pt-32 px-4 sm:px-6 lg:px-8 bg-white'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl sm:text-5xl font-extrabold text-gray-900 uppercase tracking-wider'>
            THE WWP COLLECTION
          </h2>
          <p className='mt-4 text-lg text-gray-600'>
            World Without Prejudice — The WWP Collection celebrates unity,
            compassion, and strength in the fight against HIV/AIDS
            discrimination. Designed to inspire awareness and inclusivity, each
            piece is more than fashion — it’s a statement of pride, empathy, and
            hope for a stigma-free world.
          </p>
        </div>

        {/* Clothes Grid */}
        {wwpClothesData.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {wwpClothesData.map((item) => (
              <ClothesCard
                key={item.id}
                name={item.name}
                description={item.description}
                frontImage={item.frontImage}
                backImage={item.backImage}
              />
            ))}
          </div>
        ) : (
          <p className='text-center text-xl text-gray-500'>
            No WWP products found.
          </p>
        )}
      </div>
    </section>
  );
};

// --- END: Copied and Modified Components from ShowcaseSection.jsx ---

// --- REMOVED: Header Component Definition ---

// --- REMOVED: Footer Component Definition ---

// Main Page Component
const WWPCollection = () => {
  return (
    // Header and Footer removed from here
    <div className='min-h-screen flex flex-col'>
      {/* <Header /> -- REMOVED */}
      <main className='flex-grow'>
        <WwpCollectionSection />
      </main>
      {/* <Footer /> -- REMOVED */}
    </div>
  );
};

export default WWPCollection;
