import React, { useState } from "react";
// REVISION: Import Link from react-router-dom
import { Link } from "react-router-dom";
// Import the requested Lucide icons
// REVISION: Added ChevronDown for the mobile dropdown
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import Logo from "/src/img/LOGO.jpg";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // NEW STATE: To control the visibility of the mobile "OUR PRODUCTS" dropdown
  const [isMobileProductsDropdownOpen, setIsMobileProductsDropdownOpen] =
    useState(false);
  // ✨ NEW STATE: To control the visibility of the mobile "HIVCONNECT" dropdown
  const [isMobileHivConnectDropdownOpen, setIsMobileHivConnectDropdownOpen] =
    useState(false);

  // 💥 REVISION: ABOUT is now a Link component pointing to a route
  const navItems = [
    { name: "HOME", to: "/", isLink: true },
    { name: "OUR PRODUCTS", dropdown: true, key: "products" },
    { name: "HIVCONNECT", dropdown: true, key: "hivconnect" },
    { name: "ABOUT", to: "/about", isLink: true }, // ⬅️ UPDATED: Added 'to' and 'isLink'
  ];

  // Define the dropdown items for "OUR PRODUCTS"
  const productDropdownItems = [
    // REVISION: Changed to 'to' and path for Link component
    { name: "AWARE Collection", to: "/aware-collection" },
    { name: "WWP Collection", to: "/wwp-collection" },
  ];

  // ✨ REVISED: Define the dropdown items for "HIVCONNECT" using full paths
  const hivConnectDropdownItems = [
    // Ensure these paths match the full paths defined in App.jsx
    { name: "Awareness Videos", to: "/hiv-connect/awareness-videos" },
    {
      name: "HIV & AIDS Continuum of Care",
      to: "/hiv-connect/continuum-of-care",
    },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    // When any link is clicked, close all product dropdowns
    setIsMobileProductsDropdownOpen(false);
    setIsMobileHivConnectDropdownOpen(false);
  };

  // NEW HANDLER: To toggle the product dropdown state
  const handleMobileProductsToggle = (e) => {
    if (e) e.preventDefault();
    setIsMobileProductsDropdownOpen(!isMobileProductsDropdownOpen);
  };

  // ✨ NEW HANDLER: To toggle the HIV Connect dropdown state
  const handleMobileHivConnectToggle = (e) => {
    if (e) e.preventDefault();
    setIsMobileHivConnectDropdownOpen(!isMobileHivConnectDropdownOpen);
  };

  // Helper function to get the correct dropdown items
  const getDropdownItems = (key) => {
    if (key === "products") return productDropdownItems;
    if (key === "hivconnect") return hivConnectDropdownItems;
    return [];
  };

  // Helper function to get the correct mobile dropdown state and toggle handler
  const getMobileDropdownProps = (key) => {
    if (key === "products") {
      return {
        isOpen: isMobileProductsDropdownOpen,
        toggleHandler: handleMobileProductsToggle,
      };
    }
    if (key === "hivconnect") {
      return {
        isOpen: isMobileHivConnectDropdownOpen,
        toggleHandler: handleMobileHivConnectToggle,
      };
    }
    return { isOpen: false, toggleHandler: () => {} };
  };

  return (
    <header className='fixed top-0 w-full z-30 bg-white shadow-md border-b border-gray-200'>
      <nav className='container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative'>
        {/* LEFT SIDE: Mobile Menu Toggle */}
        <div className='flex items-center lg:hidden absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 z-20'>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='text-gray-700 hover:text-black focus:outline-none p-2'
            aria-label='Toggle navigation'
          >
            {isMobileMenuOpen ? (
              <X className='w-6 h-6' />
            ) : (
              <Menu className='w-6 h-6' />
            )}
          </button>
        </div>

        {/* CENTER: Logo Section */}
        <div
          className='flex items-center 
                     absolute left-1/2 transform -translate-x-1/2 
                     lg:static lg:w-auto lg:translate-x-0 
                     lg:justify-start 
                     z-10'
        >
          <div className='flex items-center'>
            {/* Logo uses Link to navigate to root */}
            <Link to='/' className='flex-shrink-0'>
              <img className='h-12 w-auto' src={Logo} alt='Company Logo' />
            </Link>
          </div>
        </div>

        {/* MIDDLE: Desktop Navigation Links */}
        <div className='hidden lg:flex items-center space-x-10 text-sm font-medium text-gray-700 tracking-wider'>
          {navItems.map((item) => (
            <div key={item.name} className='group relative'>
              {/* Conditional rendering for routing vs. dropdown parents */}
              {item.isLink ? (
                // Use Link component for all routed items (HOME, ABOUT)
                <Link
                  to={item.to}
                  className='hover:text-red-600 transition duration-150 flex items-center'
                >
                  {item.name}
                </Link>
              ) : (
                // Dropdown parents (OUR PRODUCTS, HIVCONNECT)
                <a
                  // Prevent default navigation for dropdowns to keep the user on the page
                  href='#' // ⬅️ UPDATED: Used '#' instead of item.href as no item has href anymore
                  className='hover:text-red-600 transition duration-150 flex items-center'
                  onClick={(e) => e.preventDefault()} // Always prevent default for dropdown parents
                >
                  {item.name}
                  {/* Dropdown arrow */}
                  {item.dropdown && (
                    <svg
                      className='ml-1 h-4 w-4 transform group-hover:rotate-180 transition duration-300'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  )}
                </a>
              )}

              {/* Dropdown Menu */}
              {item.dropdown && (
                <div className='absolute top-full left-0 mt-0 w-48 shadow-lg bg-white overflow-hidden'>
                  <div className='max-h-0 group-hover:max-h-[200px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out pointer-events-none group-hover:pointer-events-auto'>
                    <div className='py-1'>
                      {/* Use helper function to render correct dropdown items */}
                      {getDropdownItems(item.key).map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.to}
                          onClick={handleLinkClick}
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 transition duration-150'
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT SIDE: Cart/Icon Section */}
        <div className='flex items-center sm:mt-0 md:mt-g0 lg:mt-10 lg:static absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 z-20'>
          <div className='relative p-2 cursor-pointer'>
            <ShoppingCart className='w-6 h-6 text-black' />
            <span className='absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 translate-y-1/4 bg-red-600 rounded-full'>
              0
            </span>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='lg:hidden bg-white border-b border-gray-200 shadow-lg absolute w-full z-20'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            {navItems.map((item) => {
              const { isOpen, toggleHandler } = getMobileDropdownProps(
                item.key
              );

              return (
                <div key={item.name}>
                  {/* Mobile Link Rendering Logic */}
                  {item.isLink ? (
                    // Use Link for mobile routed items (HOME, ABOUT)
                    <Link
                      to={item.to}
                      onClick={handleLinkClick}
                      className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 transition duration-150'
                    >
                      {item.name}
                    </Link>
                  ) : (
                    // Dropdown parent item for mobile (OUR PRODUCTS, HIVCONNECT)
                    <button
                      onClick={toggleHandler}
                      className='w-full text-left flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 transition duration-150 focus:outline-none'
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>
                  )}

                  {/* Mobile Dropdown Items - REVISED LOGIC: Only show if the mobile dropdown state is open */}
                  {item.dropdown && isOpen && (
                    <div className='pl-6 pt-1 pb-1 space-y-1'>
                      {getDropdownItems(item.key).map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.to}
                          onClick={handleLinkClick}
                          className='block px-3 py-1 rounded-md text-medium text-gray-600 hover:bg-gray-100 hover:text-red-600 transition duration-150'
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
