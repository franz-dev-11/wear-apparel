import React from "react";
// Import the core FontAwesome component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import all necessary brand icons from the Font Awesome library
import {
  faFacebook,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  // Define text and background classes to match the image's dark theme with white/light text
  const bgColor = "bg-black";
  const textColor = "text-gray-300";
  const iconColor = "text-white";

  // Use Tailwind text size classes to control icon size (Font Awesome scales well with these)
  const mobileIconSize = "text-xl"; // Roughly equivalent to w-6 h-6
  const pcIconSize = "text-lg"; // Roughly equivalent to w-5 h-5

  return (
    // Outer Container: Dark background, fixed padding
    <footer className={`${bgColor} py-6 px-4 sm:px-6`}>
      <div className='max-w-7xl mx-auto'>
        {/* Main Content Container: Responsive layout logic */}
        <div className='flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:space-y-0'>
          {/* 1. SOCIAL ICONS (Appears FIRST on Mobile - order-1) */}

          {/* Mobile View Icons (Visible on mobile, hidden on PC) */}
          <div className='order-1 flex items-center space-x-6 sm:hidden'>
            <a href='#' aria-label='Facebook'>
              <FontAwesomeIcon
                icon={faFacebook}
                className={`${mobileIconSize} ${iconColor}`}
              />
            </a>
            <a href='#' aria-label='Instagram'>
              <FontAwesomeIcon
                icon={faInstagram}
                className={`${mobileIconSize} ${iconColor}`}
              />
            </a>
            {/* X Icon (Mobile) */}
            <a href='#' aria-label='X'>
              <FontAwesomeIcon
                icon={faXTwitter}
                className={`${mobileIconSize} ${iconColor}`}
              />
            </a>
          </div>

          {/* 2. COPYRIGHT (Appears SECOND on Mobile - order-2, Aligned Left on PC) */}
          <div className='order-2 text-center sm:text-left'>
            <p className={`text-sm ${textColor}`}>
              © {new Date().getFullYear()} Wear Apparel. All rights reserved.
            </p>
          </div>

          {/* 3. PC View Icons (Visible on PC, hidden on mobile) */}
          <div className='hidden sm:flex items-center space-x-4'>
            <a href='#' aria-label='Facebook'>
              <FontAwesomeIcon
                icon={faFacebook}
                className={`${pcIconSize} ${iconColor}`}
              />
            </a>
            <a href='#' aria-label='Instagram'>
              <FontAwesomeIcon
                icon={faInstagram}
                className={`${pcIconSize} ${iconColor}`}
              />
            </a>
            {/* X Icon (PC) */}
            <a href='#' aria-label='X'>
              <FontAwesomeIcon
                icon={faXTwitter}
                className={`${pcIconSize} ${iconColor}`}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
