import React, { useState } from "react";
// Import icons
import { ShoppingCart, Menu, X, Minus, Plus } from "lucide-react"; // Added Minus, Plus
// Import assets
import Logo from "/src/img/LOGO.jpg";
// Import Size Chart Modal and Images
import SizeChartModal from "../LandingPage/SizeChartModal";
import {
  showcase1a,
  showcase1b,
  showcase2a,
  showcase2b,
  showcase3a,
  showcase3b,
} from "./imageImports-WWP";

// ✨ NEW: Import useCart hook
import { useCart } from "../../components/CartContext";

// --- START: Product Components ---

const sizes = ["S", "M", "L", "XL", "XXL"];

// Component for a single product card with front/back toggle
// 👇 CRITICAL: Now accepts 'id' as a prop
const ClothesCard = ({
  id,
  name,
  description,
  frontImage,
  backImage,
  price,
}) => {
  const [isFrontView, setIsFrontView] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);

  const { addToCart } = useCart();

  const handleQuantityChange = (delta) => {
    setSelectedQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAction = (action) => {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }
    if (selectedQuantity < 1) {
      alert("Please select a quantity of 1 or more.");
      return;
    }

    // 💥 CRITICAL: Pass the product ID (UUID) to addToCart
    if (action === "Add to Cart") {
      addToCart(name, selectedSize, selectedQuantity, price, id);
    }
  };

  return (
    <div className='bg-white rounded-xl shadow-lg overflow-hidden flex flex-col'>
      {/* Image and Toggle */}
      <div
        className='relative group cursor-pointer'
        onClick={() => setIsFrontView(!isFrontView)}
      >
        <img
          src={isFrontView ? frontImage : backImage}
          alt={name}
          className='w-full h-80 object-cover transition-opacity duration-500'
        />
        <div className='absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center'>
          <span className='text-white text-lg font-bold p-2 bg-black bg-opacity-50 rounded-lg'>
            {isFrontView ? "View Back" : "View Front"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className='p-5 flex flex-col flex-grow'>
        <h3 className='text-xl font-bold text-gray-900 mb-1'>{name}</h3>
        <p className='text-sm text-gray-600 mb-3'>{description}</p>
        <p className='text-2xl font-extrabold text-red-600 mb-4'>
          ₱{price.toLocaleString()}
        </p>

        {/* Size Selection */}
        <div className='mb-4'>
          <h4 className='text-sm font-medium text-gray-700 mb-2'>
            Select Size:
          </h4>
          <div className='flex flex-wrap gap-2'>
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 text-sm rounded-full border transition duration-150 ${
                  selectedSize === size
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
              >
                {size}
              </button>
            ))}
            <button
              onClick={() => setIsChartModalOpen(true)}
              className='text-xs text-blue-500 hover:text-blue-700 underline ml-2'
            >
              Size Chart
            </button>
          </div>
        </div>

        {/* Quantity Selection */}
        <div className='mb-4 flex items-center'>
          <h4 className='text-sm font-medium text-gray-700 mr-4'>Quantity:</h4>
          <div className='flex items-center space-x-2'>
            <button
              onClick={() => handleQuantityChange(-1)}
              className='p-1 border rounded-full text-gray-600 hover:bg-gray-100 transition'
            >
              <Minus size={16} />
            </button>
            <span className='w-8 text-center text-lg font-medium text-gray-800'>
              {selectedQuantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              className='p-1 border rounded-full text-gray-600 hover:bg-gray-100 transition'
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => handleAction("Add to Cart")}
          className='mt-auto flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white text-base font-medium rounded-lg hover:bg-red-700 transition duration-150 shadow-md disabled:bg-gray-400'
        >
          <ShoppingCart size={20} />
          <span>Add to Cart</span>
        </button>
      </div>

      <SizeChartModal
        isOpen={isChartModalOpen}
        onClose={() => setIsChartModalOpen(false)}
      />
    </div>
  );
};

// 💥 CRITICAL: Product Data with Corrected UUIDs
const wwpClothesData = [
  {
    id: "0a1b2c3d-4e5f-4678-90ab-cdef01234567", // WWP Hoodie Black UUID
    name: "WWP Hoodie Black",
    description:
      "The WWP Hoodie from the Walk With Pride Collection promotes courage and acceptance. It carries the statement “It’s a Virus, Not a Judgment” — a reminder to walk with pride and compassion.",
    price: 1600,
    frontImage: showcase1a,
    backImage: showcase1b,
  },
  {
    id: "5f4e3d2c-1b0a-4987-6543-210fedcba987", // WWP Shirt Black UUID
    name: "WWP Shirt Black",
    description:
      "The WWP T-Shirt offers a relaxed, breathable fit with the same inspiring design from the Walk With Pride Collection. Empowers wearers to stand up for awareness and equality in everyday style.",
    price: 700,
    frontImage: showcase2a,
    backImage: showcase2b,
  },
  {
    id: "1c2d3e4f-5a6b-4789-9012-34567890efab", // WWP Sweater Black UUID
    name: "WWP Sweater Black",
    description:
      "The WWP Sweater, featuring a clean front logo and a powerful back design that reads “Walk With Pride,” this piece blends comfort with advocacy — perfect for making a statement with purpose.",
    price: 1400,
    frontImage: showcase3a,
    backImage: showcase3b,
  },
];

const WwpCollectionSection = () => {
  return (
    <section className='py-16 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-extrabold text-gray-900 uppercase tracking-wider'>
            THE WALK WITH PRIDE (WWP) COLLECTION
          </h2>
          <p className='mt-4 text-sm  text-gray-600'>
            The WWP Collection embodies resilience and strength in the fight
            against HIV/AIDS discrimination. Designed to inspire awareness and
            inclusivity, each piece is more than fashion — it’s a statement of
            pride, empathy, and hope for a stigma-free world.
          </p>
        </div>

        {/* Clothes Grid */}
        {wwpClothesData.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {wwpClothesData.map((item) => (
              <ClothesCard
                key={item.id}
                id={item.id} // 💥 CRITICAL: Pass the product ID
                name={item.name}
                description={item.description}
                frontImage={item.frontImage}
                backImage={item.backImage}
                price={item.price}
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

// Main Page Component
const WWPCollection = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <main className='flex-grow'>
        <WwpCollectionSection />
      </main>
    </div>
  );
};

export default WWPCollection;
