import React from "react";
import {
  BarChart2,
  Quote,
  Video,
  MapPin,
  Orbit,
  ShoppingCart,
} from "./lucideImports";

// Helper component for the feature list
const FeatureCard = ({ IconComponent, title, description }) => (
  <div className='flex items-start p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-100'>
    <div className='p-3 mr-4 text-red-600 bg-red-100 rounded-full flex-shrink-0'>
      {/* Renders the Lucide icon component */}
      <IconComponent className='w-6 h-6' />
    </div>
    <div>
      <h3 className='text-lg font-semibold text-gray-800 mb-1'>{title}</h3>
      <p className='text-sm text-gray-600'>{description}</p>
    </div>
  </div>
);

// Data for AR Features
const features = [
  {
    IconComponent: BarChart2,
    title: "HIV Count Display",
    description:
      "Display the HIV count in the Philippines, providing current statistical awareness.",
  },
  {
    IconComponent: Quote,
    title: "Inspirational Quotes",
    description:
      "Inspirational texts and quotes for People living with HIV (PLHIV) to foster positivity.",
  },
  {
    IconComponent: Video,
    title: "Informational Videos",
    description:
      "Access informational videos on HIV provided by Love Yourself Inc.",
  },
  {
    IconComponent: MapPin,
    title: "Testing Hub Locator",
    description:
      "Showcase of Love Yourself Inc. HIV Testing Hub Locations in the Philippines.",
  },
  {
    IconComponent: Orbit,
    title: "3D Animation Display",
    description:
      "Display of 3D Animation (may vary depending on the shirt design).",
  },
  {
    IconComponent: ShoppingCart,
    title: "Store Access",
    description: "Direct access to the official wear.apparel online store.",
  },
];

const ARInfoSection = ({ arImage }) => {
  return (
    <section className='bg-gray-100 py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-xl font-semibold text-red-600 uppercase tracking-wider'>
            Beyond Clothing
          </h2>
          <p className='mt-2 text-4xl sm:text-3xl font-extrabold text-gray-900'>
            EXPERIENCE AUGMENTED REALITY!
          </p>
        </div>

        {/* This container now enforces stacking and centers content on desktop */}
        <div className='max-w-4xl mx-auto'>
          {/* Top Section: Main Text and Image */}
          <div className='mb-10 lg:mb-16'>
            <p className='text-gray-700 text-lg leading-relaxed mb-6 border-l-4 border-red-500 pl-4 bg-white p-4 shadow-lg rounded-lg'>
              Every shirt you buy from our{" "}
              <span className='font-bold'>Wear Apparel</span> collection is more
              than just clothing — it's an innovation. Each apparel includes a{" "}
              <span className='font-bold text-red-600'>QR code</span> printed on
              it. Once scanned, it reveals an{" "}
              <span className='font-bold text-red-600'>
                Augmented Reality (AR) experience
              </span>{" "}
              that brings awareness to life with HIV. Learn, engage, and
              advocate — all through your shirt!
            </p>

            {/* Direct image display */}
            <div className='mt-8 text-center'>
              <img
                src={arImage}
                alt='Augmented Reality Features Diagram'
                className='mx-auto w-full max-w-md '
              />
            </div>
          </div>

          {/* Horizontal Rule to visually separate the sections */}
          <hr className='my-10 border-red-200' />

          {/* Bottom Section: AR Features Grid (Stacked below the text) */}
          <div>
            {/* Title for AR features */}
            <h3 className='text-3xl font-extrabold text-gray-900 mb-8 text-center'>
              AR Features
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  IconComponent={feature.IconComponent}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ARInfoSection;
