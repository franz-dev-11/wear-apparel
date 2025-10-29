import React, { useEffect } from "react";
// REMOVED: import Header from "../../components/Header";
// REMOVED: import Footer from "../../components/Footer";
import ImageCarousel from "./ImageCarousel";
import ARInfoSection from "./ARInfoSection";
import ShowcaseSection from "./ShowcaseSection";
import Explore from "./Explore";
import { ARinfo } from "./imageImports"; // Import AR image from utility file

const LandingPage = () => {
  const [hasMounted, setHasMounted] = React.useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    // The main container remains, but Header/Footer are now in App.jsx
    <div className='min-h-screen bg-gray-50'>
      {/* <Header /> -- REMOVED */}

      <ImageCarousel />

      <ARInfoSection arImage={ARinfo} />

      <ShowcaseSection />

      <Explore />

      {/* <Footer /> -- REMOVED */}
    </div>
  );
};

export default LandingPage;
