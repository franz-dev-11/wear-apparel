import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import Logo from "/src/img/LOGO.jpg";

// Import useCart hook
import { useCart } from "./CartContext";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [isMobileProductsDropdownOpen, setIsMobileProductsDropdownOpen] =
    useState(false);
  const [isMobileHivConnectDropdownOpen, setIsMobileHivConnectDropdownOpen] =
    useState(false);

  // Get cartItems (the array) and cartItemCount from context
  const { cartItems, cartItemCount } = useCart();

  // Function to toggle the cart dropdown
  const toggleCartDropdown = () => {
    setIsCartDropdownOpen((prev) => !prev);
  };

  // Helper function to handle link clicks and close the mobile menu/dropdown
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setIsCartDropdownOpen(false); // Close cart dropdown on navigation
  };

  const navItems = [
    { name: "HOME", to: "/", isLink: true },
    { name: "OUR PRODUCTS", dropdown: true, key: "products" },
    { name: "HIVCONNECT", dropdown: true, key: "hivconnect" },
    { name: "ABOUT", to: "/about", isLink: true },
  ];

  const productDropdownItems = [
    { name: "AWARE Collection", to: "/aware-collection" },
    // ... rest of productDropdownItems ...
    { name: "WWP Collection", to: "/wwp-collection" },
  ];

  const hivConnectDropdownItems = [
    { name: "HIV Awareness Videos", to: "/hiv-connect/awareness-videos" },
    { name: "HIV Continuum Of Care", to: "/hiv-connect/continuum-of-care" },

    // ... rest of hivConnectDropdownItems ...
  ];

  const getDropdownItems = (key) => {
    switch (key) {
      case "products":
        return productDropdownItems;
      case "hivconnect":
        return hivConnectDropdownItems;
      default:
        return [];
    }
  };

  const toggleHandler = (key) => {
    if (key === "products") {
      setIsMobileProductsDropdownOpen((prev) => !prev);
    } else if (key === "hivconnect") {
      setIsMobileHivConnectDropdownOpen((prev) => !prev);
    }
  };

  return (
    <header className='fixed top-0 left-0 w-full z-30 shadow-md bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <Link to='/' className='flex-shrink-0'>
            <img className='h-8 w-auto' src={Logo} alt='Logo' />
          </Link>

          {/* Navigation Links (Desktop) */}
          <nav className='hidden lg:block'>
            <div className='ml-10 flex items-baseline space-x-4'>
              {navItems.map((item) => (
                <div key={item.name} className='relative group'>
                  {item.isLink ? (
                    <Link
                      to={item.to}
                      className='text-gray-900 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150'
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <>
                      <button className='text-gray-900 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium inline-flex items-center transition duration-150'>
                        {item.name}
                        <ChevronDown className='ml-1 h-4 w-4 transform group-hover:rotate-180 transition-transform duration-300' />
                      </button>
                      {/* FIX APPLIED HERE: Replaced 'mt-2' with 'top-full' to close the hover gap */}
                      <div className='absolute left-0 top-full w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-10'>
                        <div className='py-1'>
                          {getDropdownItems(item.key).map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.to}
                              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600'
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </nav>

          <div className='flex items-center space-x-4'>
            {/* The Cart Icon and Dropdown Wrapper */}
            <div className='relative'>
              {" "}
              {/* <--- START: Relative container for dropdown positioning */}
              <button
                className='p-2 rounded-full hover:bg-gray-100 relative focus:outline-none'
                onClick={toggleCartDropdown} // <--- Toggle the dropdown
                aria-label='View shopping cart'
              >
                <ShoppingCart className='h-6 w-6 text-gray-800' />
                {/* Cart Item Count Badge */}
                {cartItemCount > 0 && (
                  <span className='absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-1 mt-2 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
                    {cartItemCount}
                  </span>
                )}
              </button>
              {/* Cart Dropdown Menu */}
              {isCartDropdownOpen && (
                <div
                  // --- FINAL FIX APPLIED HERE: Centering and width adjustment for mobile ---
                  className='absolute mt-3 max-h-96 overflow-y-auto origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-40
                           
                           // Mobile (Default/Small Screens): Center it, set width to 90% of screen, and limit max width
                           w-[90%] max-w-sm 
                           left-1/2 transform -translate-x-1/2 
                           
                           // Desktop (Large Screens): Revert to fixed width, right alignment, and disable transform
                           lg:w-80 lg:right-0 lg:left-auto lg:transform-none'
                  // --- END FINAL FIX ---
                  role='menu'
                  aria-orientation='vertical'
                  aria-labelledby='cart-button'
                >
                  <div className='px-4 py-3 bg-gray-50 border-b'>
                    <p className='text-sm font-medium text-gray-900'>
                      Your Cart ({cartItemCount}{" "}
                      {cartItemCount === 1 ? "item" : "items"})
                    </p>
                  </div>

                  {cartItemCount === 0 ? (
                    <div className='py-4 px-4 text-center'>
                      <p className='text-sm text-gray-500'>
                        Your cart is empty.
                      </p>
                    </div>
                  ) : (
                    <div className='py-1'>
                      {/* Map over cart items to display them */}
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className='flex items-center px-4 py-2 hover:bg-gray-50 transition duration-150'
                        >
                          <div className='flex-1 min-w-0'>
                            <p className='text-sm font-medium text-gray-900 truncate'>
                              {item.name}
                            </p>
                            <p className='text-xs text-gray-500'>
                              Size: {item.size}
                            </p>
                          </div>
                          {/* ✨ REVISED: Display Price and Quantity */}
                          <div className='ml-4 text-right'>
                            {/* Display Total Price (Unit Price * Quantity) */}
                            <p className='text-sm font-semibold text-gray-900'>
                              ₱{(item.price * item.quantity).toLocaleString()}
                            </p>
                            {/* Display Quantity */}
                            <p className='text-xs text-gray-500'>
                              Qty: {item.quantity}
                            </p>
                          </div>
                          {/* End REVISED */}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Checkout Link/Button */}
                  {cartItemCount > 0 && (
                    <div className='py-2 px-4 border-t'>
                      <Link
                        to='/cart' // Link to a dedicated cart/checkout page
                        onClick={handleLinkClick}
                        className='w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                      >
                        Proceed to Checkout ({cartItemCount})
                      </Link>
                    </div>
                  )}
                </div>
              )}{" "}
              {/* <--- END: Cart Dropdown Menu */}
            </div>{" "}
            {/* <--- END: Cart Dropdown Wrapper */}
            {/* Mobile Menu Button */}
            <button
              type='button'
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black lg:hidden'
              aria-controls='mobile-menu'
              aria-expanded='false'
              // FIX APPLIED HERE: Close cart dropdown when mobile menu is toggled
              onClick={() => {
                setIsMobileMenuOpen((prev) => !prev);
                setIsCartDropdownOpen(false);
              }}
            >
              <span className='sr-only'>Open main menu</span>
              {isMobileMenuOpen ? (
                <X className='block h-6 w-6' aria-hidden='true' />
              ) : (
                <Menu className='block h-6 w-6' aria-hidden='true' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isMobileMenuOpen && (
        <div className='lg:hidden' id='mobile-menu'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            {navItems.map((item) => {
              const isOpen =
                (item.key === "products" && isMobileProductsDropdownOpen) ||
                (item.key === "hivconnect" && isMobileHivConnectDropdownOpen);

              return (
                <div key={item.name}>
                  {item.isLink ? (
                    <Link
                      to={item.to}
                      onClick={handleLinkClick}
                      className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 transition duration-150'
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => toggleHandler(item.key)}
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
