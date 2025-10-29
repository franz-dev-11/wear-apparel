// Explore.jsx
import React from "react";
// Change useNavigate to Link and/or NavLink for better UX
import { Link } from "react-router-dom";

const Explore = () => {
  // navigate hook would only be needed if you had conditional logic
  // const navigate = useNavigate();

  // No need for handleNavigation function if using Link

  return (
    // ...
    <div className='flex flex-col items-center space-y-6'>
      {/* Title of the Section */}
      <h2 className='text-1xl sm:text-3xl font-extrabold text-gray-900 text-center'>
        EXPLORE OUR COLLECTIONS
      </h2>

      {/* Container for the buttons */}
      <div className='flex justify-center space-x-6 space-y-8'>
        <Link to='/collections/aware'>
          <button className='px-4 md:px-16 py-4 text-sm font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out border border-black bg-white text-black hover:bg-black hover:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50'>
            Aware Collection
          </button>
        </Link>
        <Link to='/collections/aware'>
          <button className='px-4 md:px-16 py-4 text-sm font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out border border-black-100 bg-white text-black hover:bg-black hover:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50'>
            WWP Collection
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Explore;
