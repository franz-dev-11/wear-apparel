import React from "react";
// Assuming Lucide icons are available for use
import { Eye, Rocket, Zap, Mail, MapPin, Share2 } from "lucide-react";

const About = () => {
  // Define common Tailwind classes
  const brandAccentColor = "text-red-600";
  const iconContainerStyle = "p-3 rounded-full bg-red-100/50 flex-shrink-0";
  const sectionHeading = "text-2xl font-extrabold text-gray-900 mb-2";

  return (
    // Outer Container: Min-height, light background, large padding
    <div className='about-page min-h-screen bg-gray-50 py-16 px-4'>
      {/* Main Content Card */}
      <div className='max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden'>
        {/* Hero Header/Title Section */}
        <div className='p-8 sm:p-12 bg-gray-900 text-white'>
          <p className='text-sm font-semibold uppercase tracking-wider opacity-75 mb-1'>
            Our Story
          </p>
          <h1 className='text-4xl sm:text-5xl font-extrabold mb-2'>
            About Wear Apparel
          </h1>
          <p className='text-lg font-light text-gray-300'>
            Combining advocacy, fashion, and technology to drive social change.
          </p>
        </div>
        {/* Core Content Grid */}
        <div className='p-8 sm:p-12 space-y-12'>
          {/* 1. ABOUT US - Interactive Apparel */}
          <section className='about-us flex flex-col md:flex-row gap-6 items-start pb-8 border-b border-gray-100'>
            <div className={iconContainerStyle}>
              <Eye className='w-6 h-6' style={{ color: "#dc2626" }} />{" "}
              {/* Eye for Vision/Augmented Reality */}
            </div>
            <div>
              <h2 className={`text-3xl font-bold text-gray-900 mb-3`}>
                ABOUT US
              </h2>
              <p className='text-base sm:text-lg leading-relaxed text-black'>
                <strong className={brandAccentColor}>Wear Apparel</strong> is a
                socially driven clothing company that combines advocacy,
                fashion, and technology. We create Augmented Reality (AR)
                integrated apparel where every piece is more than a style; it’s
                a statement and an interactive experience. By scanning through
                the stitched QR code patch integrated into each of our products,
                the wearers can access inspirational digital stories,
                educational content, and powerful messages tied to the advocacy
                of the moment.
              </p>
            </div>
          </section>

          {/* 2. VISION & MISSION - Side-by-Side Cards */}
          <div className='grid md:grid-cols-2 gap-8'>
            {/* VISION Card */}
            <div className='p-6 bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition duration-300'>
              <div className='flex items-center space-x-4 mb-4'>
                <div className={iconContainerStyle}>
                  <Rocket className='w-6 h-6' style={{ color: "#dc2626" }} />{" "}
                  {/* Rocket for Vision/Future */}
                </div>
                <h3 className={sectionHeading}>OUR VISION</h3>
              </div>
              <p className='text-base leading-relaxed text-black'>
                By 2030,{" "}
                <strong className={brandAccentColor}>Wear Apparel</strong>{" "}
                envisions to be the Philippines' leading streetwear brand,
                recognized not just for our style, but as the leading platform
                for youth advocacy and social change. We will redefine
                streetwear by making it a medium for meaningful expression,
                transforming every garment into a symbol of conscious fashion
                and collective empowerment. Our brand will be synonymous with a
                generation that wears its values on its sleeve.
              </p>
            </div>

            {/* MISSION Card */}
            <div className='p-6 bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition duration-300'>
              <div className='flex items-center space-x-4 mb-4'>
                <div className={iconContainerStyle}>
                  <Zap className='w-6 h-6' style={{ color: "#dc2626" }} />{" "}
                  {/* Zap for Action/Catalyst */}
                </div>
                <h3 className={sectionHeading}>OUR MISSION</h3>
              </div>
              <p className='text-base leading-relaxed text-black'>
                <strong className={brandAccentColor}>Wear Apparel</strong> aims
                to be the leading voice in the Philippines' movement for social
                and environmental change by transforming fashion into a powerful
                tool for advocacy. We will empower the community, especially the
                youth, to become active participants in building a better world.
                By integrating augmented reality stories and educational content
                into our apparel, we will raise awareness, foster empathy, and
                inspire a generation to visibly and vocally support a range of
                critical advocacies, making our brand a catalyst for a more
                compassionate, informed, and sustainable society.
              </p>
            </div>
          </div>

          {/* 3. CONTACT & FOLLOW US - Footer-style layout */}
          <div className='pt-8 border-t border-gray-200 grid md:grid-cols-2 gap-8'>
            {/* CONTACT Section */}
            <div>
              <h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center'>
                <Mail className='w-5 h-5 mr-2' />
                CONTACT
              </h3>
              <p className='mb-4'>
                Have questions or want to learn more about our advocacy? Get in
                touch with us:
              </p>
              <div className='space-y-2 text-base'>
                <div className='flex items-center space-x-2'>
                  <Mail className='w-4 h-4 text-red-600 flex-shrink-0' />
                  <a
                    href='mailto:wearapparelbrand.official@gmail.com'
                    className='text-gray-700 hover:text-red-600 transition duration-150 font-medium'
                  >
                    wearapparelbrand.official@gmail.com
                  </a>
                </div>
                <div className='flex items-center space-x-2'>
                  <MapPin className='w-4 h-4 text-red-600 flex-shrink-0' />
                  <span className='text-gray-700'>
                    QUEZON CITY, PHILIPPINES
                  </span>
                </div>
              </div>
            </div>

            {/* FOLLOW US Section */}
            <div>
              <h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center'>
                <Share2 className='w-5 h-5 mr-2' />
                FOLLOW US
              </h3>
              <p className='mb-4'>
                Stay connected with our community and be part of the movement
                for change. Follow us on social media for updates, stories, and
                inspiration:
              </p>
              {/* Social Links - use iconic links for modern feel */}
              <div className='flex space-x-6 text-base'>
                <a
                  href='#'
                  className='font-semibold text-gray-700 hover:text-red-600 transition duration-150'
                >
                  Facebook
                </a>
                <a
                  href='#'
                  className='font-semibold text-gray-700 hover:text-red-600 transition duration-150'
                >
                  X
                </a>
                <a
                  href='#'
                  className='font-semibold text-gray-700 hover:text-red-600 transition duration-150'
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* End Core Content Grid */}
      </div>{" "}
      {/* End Main Content Card */}
    </div>
  );
};

export default About;
