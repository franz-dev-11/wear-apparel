import React, { useState } from "react";
import SizeChartModal from "./SizeChartModal";
import {
  showcase1a,
  showcase1b,
  showcase2a,
  showcase2b,
  showcase3a,
  showcase3b,
} from "./imageImports";

// ✨ NEW: Import useCart hook
import { useCart } from "../../components/CartContext"; // ⬅️ CONFIRM THIS PATH

const sizes = ["S", "M", "L", "XL", "XXL"];

// Component for a single product card with front/back toggle
const ClothesCard = ({ name, description, frontImage, backImage }) => {
  const [isFrontView, setIsFrontView] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);

  // ✨ NEW: Get addToCart function from context
  const { addToCart } = useCart();

  const handleAction = (action) => {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }

    // 💥 REVISED: Call the global context function to update the cart count
    if (action === "Add to Cart") {
      addToCart(name, selectedSize);
    }

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
        <p className='text-gray-600 mb-4 text-sm min-h-[40px] flex-grow'>
          {description}
        </p>

        {/* Size Selection Section */}
        <div className='mb-4'>
          <p className='font-semibold text-gray-800 mb-2'>Select Size:</p>
          <div className='flex flex-wrap gap-2 mb-3'>
            {sizes.map((size) => (
              <div
                key={size}
                onClick={() => {
                  if (selectedSize === size) {
                    setSelectedSize(null);
                  } else {
                    setSelectedSize(size);
                  }
                }}
                className={`cursor-pointer border-2 rounded-lg px-3 py-1 text-sm font-medium transition-colors select-none ${
                  selectedSize === size
                    ? "bg-black text-white border-black shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:border-black"
                }`}
              >
                {size}
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

// Main Showcase Section Component
const ShowcaseSection = () => {
  // Placeholder data for 3 clothes items
  const clothesData = [
    {
      id: 1,
      name: "AWARE Hoodie White",
      description:
        "The AWARE Hoodie combines comfort and purpose. Crafted in sleek black, it features a minimalist heart and “Be Aware” print — a subtle reminder to stay informed and spread awareness in style.",
      frontImage: showcase1a,
      backImage: showcase1b,
    },
    {
      id: 2,
      name: "AWARE Shirt White",
      description:
        "The AWARE T-Shirt offers a relaxed fit with its vibrant back design promotes compassion and equality, making it the perfect everyday wear for those who choose to stand against stigma. This shirt has a slightly longer product description than the others to demonstrate the new alignment fix in action.",
      frontImage: showcase2a,
      backImage: showcase2b,
    },
    {
      id: 3,
      name: "WWP Sweater Black",
      description:
        "The WWP Sweater, featuring a clean front logo and a powerful back design that reads “Walk With Pride,” this piece blends comfort with advocacy — perfect for making a statement with purpose.",
      frontImage: showcase3a,
      backImage: showcase3b,
    },
  ];

  return (
    <section className='py-16 px-4 sm:px-6 lg:px-8 bg-white'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-2xl sm:text-3xl font-extrabold text-gray-900 uppercase tracking-wider'>
            OUR SIGNATURE COLLECTION
          </h2>
          <p className='mt-4 text-sm  text-gray-600'>
            The AWARE and WWP (Walk With Pride) Collections stand at the heart
            of our mission to promote HIV awareness and end discrimination. Each
            design carries a message of compassion, unity, and pride —
            empowering you to wear purpose, spark conversation, and walk toward
            a stigma-free world.
          </p>
        </div>

        {/* Clothes Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {clothesData.map((item) => (
            <ClothesCard
              key={item.id}
              name={item.name}
              description={item.description}
              frontImage={item.frontImage}
              backImage={item.backImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
