import React from "react";
import { X } from "./lucideImports";
import { sizechart, sizechart1, sizechart2 } from "./imageImports";

// --- START: Size Chart Modal Component (NEW) ---
const SizeChartModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    // Overlay for the modal
    <div className='fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4'>
      {/* Modal Content */}
      <div className='bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 relative'>
        {/* Header/Close Button */}
        <div className='sticky top-0 bg-white p-4 flex justify-between items-center border-b'>
          <h3 className='text-xl font-bold text-gray-900'>Size Chart</h3>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-800 p-1'
          >
            <X className='w-6 h-6' />
          </button>
        </div>

        {/* Body */}
        <div className='p-4 text-center'>
          <img
            src={sizechart}
            alt='Hoodie Size Chart'
            // Use object-contain to ensure the whole image is visible
            className='w-full h-auto object-contain mx-auto'
          />
          <img
            src={sizechart1}
            alt='Shirt Size Chart'
            // Use object-contain to ensure the whole image is visible
            className='w-full h-auto object-contain mx-auto'
          />
          <img
            src={sizechart2}
            alt='Sweater Size Chart'
            // Use object-contain to ensure the whole image is visible
            className='w-full h-auto object-contain mx-auto'
          />
        </div>
      </div>
    </div>
  );
};

export default SizeChartModal;
