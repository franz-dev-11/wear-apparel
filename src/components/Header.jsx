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

  // REVISION: Added 'to' field for Link components, changed HOME to route to '/'
  const navItems = [
    { name: "HOME", to: "/", isLink: true },
    { name: "OUR PRODUCTS", href: "#products", dropdown: true }, // Not a route, stays as anchor link
    { name: "HIVCONNECT", href: "#connect" },
    { name: "ABOUT", href: "#about" },
  ];

  // Define the dropdown items for "OUR PRODUCTS"
  const productDropdownItems = [
    // REVISION: Changed to 'to' and path for Link component
    { name: "AWARE Collection", to: "/aware-collection" },
    { name: "WWP Collection", to: "/wwp-collection" },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    // When any link is clicked, close the product dropdown as well
    setIsMobileProductsDropdownOpen(false);
  };

  // NEW HANDLER: To toggle the product dropdown state
  const handleMobileProductsToggle = (e) => {
    // Prevent the default anchor link behavior if it's the anchor link
    if (e) e.preventDefault();
    setIsMobileProductsDropdownOpen(!isMobileProductsDropdownOpen);
  };

  return (
    <header className='fixed top-0 w-full z-30 bg-white shadow-md border-b border-gray-200'>
      <nav className='container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative'>
        {/* LEFT SIDE: Mobile Menu Toggle - REVISION: Added vertical centering classes */}
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

        {/* CENTER: Logo Section - Mobile Centering (Horizontal) */}
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
              {/* REVISION: Use Link component for HOME */}
              {item.isLink ? (
                <Link
                  to={item.to}
                  className='hover:text-black transition duration-150 flex items-center'
                >
                  {item.name}
                </Link>
              ) : (
                // Use standard <a> tag for anchor links or non-routed links
                <a
                  href={item.href}
                  className='hover:text-black transition duration-150 flex items-center'
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
                      {productDropdownItems.map((dropdownItem) => (
                        // REVISION: Using Link component for dropdown items
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.to}
                          onClick={handleLinkClick}
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition duration-150'
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

        {/* RIGHT SIDE: Cart/Icon Section - REVISION: Added absolute positioning and vertical centering for mobile */}
        <div className='flex items-center lg:static absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 z-20'>
          <div className='relative p-2 cursor-pointer'>
            <ShoppingCart className='w-6 h-6 text-black' />
            <span className='absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
              0
            </span>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='lg:hidden bg-white border-b border-gray-200 shadow-lg absolute w-full z-20'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            {navItems.map((item) => (
              <div key={item.name}>
                {/* REVISION: Use Link for mobile HOME item */}
                {item.isLink ? (
                  <Link
                    to={item.to}
                    onClick={handleLinkClick}
                    className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-black transition duration-150'
                  >
                    {item.name}
                  </Link>
                ) : item.dropdown ? (
                  // NEW LOGIC: Dropdown parent item for mobile
                  <button
                    onClick={handleMobileProductsToggle}
                    className='w-full text-left flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-black transition duration-150 focus:outline-none'
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${
                        isMobileProductsDropdownOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                ) : (
                  // Use standard <a> tag for other mobile items (HIVCONNECT, ABOUT)
                  <a
                    href={item.href}
                    onClick={handleLinkClick}
                    className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-black transition duration-150'
                  >
                    {item.name}
                  </a>
                )}

                {/* Mobile Dropdown Items - REVISED LOGIC: Only show if the mobile dropdown state is open */}
                {item.dropdown && isMobileProductsDropdownOpen && (
                  <div className='pl-6 pt-1 pb-1 space-y-1'>
                    {productDropdownItems.map((dropdownItem) => (
                      // REVISION: Using Link component for mobile dropdown items
                      <Link
                        key={dropdownItem.name}
                        to={dropdownItem.to}
                        onClick={handleLinkClick} // handleLinkClick closes the main menu and the product dropdown
                        className='block px-3 py-1 rounded-md text-medium text-gray-600 hover:bg-gray-100 hover:text-black transition duration-150'
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
