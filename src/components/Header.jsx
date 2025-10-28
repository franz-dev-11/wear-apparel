import React, { useState } from "react";
// Import the requested Lucide icons
import { ShoppingCart, Menu, X } from "lucide-react";
import Logo from "/src/img/LOGO.jpg";
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "HOME", href: "#home" },
    { name: "OUR PRODUCTS", href: "#products", dropdown: true },
    { name: "HIVCONNECT", href: "#connect" },
    { name: "ABOUT", href: "#about" },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className='bg-white shadow-sm border-b border-gray-200'>
      {/* Modified nav class: 
        - Default: flex (for mobile)
        - Justify-between is replaced with a container div setup to center the logo.
      */}
      <nav className='container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative'>
        {/* LEFT SIDE: Mobile Menu Toggle (Hamburger/X Icon) - Stays left on small screens */}
        <div className='flex items-center lg:hidden absolute left-4 sm:left-6'>
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

        {/* CENTER: Logo Section - Centered on small screens, left-aligned on large screens */}
        <div className='flex items-center w-full justify-center lg:justify-start lg:w-auto'>
          {/* Logo element is hidden on mobile, shown on desktop. */}
          <div className='hidden lg:flex items-center'>
            <a href='#home' className='flex-shrink-0'>
              <img className='h-12 w-auto' src={Logo} alt='Company Logo' />
            </a>
          </div>

          {/* Logo element is shown on mobile, hidden on desktop (This placeholder is now centered) */}
          <div className='lg:hidden flex items-center'>
            <a href='#home' className='flex-shrink-0'>
              <img className='h-12 w-auto' src={Logo} alt='Company Logo' />
            </a>
          </div>
        </div>

        {/* MIDDLE: Desktop Navigation Links - Hidden on small screens */}
        <div className='hidden lg:flex items-center space-x-10 text-sm font-medium text-gray-700 tracking-wider'>
          {navItems.map((item) => (
            <div key={item.name} className='group relative'>
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
            </div>
          ))}
        </div>

        {/* RIGHT SIDE: Cart/Icon Section - Stays right on all screens */}
        <div className='flex items-center'>
          {/* Cart Icon and Count */}
          <div className='relative p-2 cursor-pointer'>
            {/* The Lucide ShoppingCart Icon */}
            <ShoppingCart className='w-6 h-6 text-black' />

            {/* The Red '0' Badge */}
            <span className='absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
              0
            </span>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Conditionally rendered below the header on small screens */}
      {isMobileMenuOpen && (
        <div className='lg:hidden bg-white border-b border-gray-200 shadow-lg absolute w-full z-20'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-black transition duration-150'
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
