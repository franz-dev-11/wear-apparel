// App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./features/LandingPage/LandingPage";
import AWARECollection from "./features/OurProducts/AWARE-Collection";
import WWPCollection from "./features/OurProducts/WWP-Collection";
import HIVConnect from "./features/HIV-Connect/HIVCare";
import VideoSection from "./features/HIV-Connect/VideoSection";

// ✨ NEW: Import the About component
import About from "./features/About/About"; // ⬅️ NEW IMPORT

// NEW: Import the HIVCare component
import HIVCare from "./features/HIV-Connect/HIVCare";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/aware-collection' element={<AWARECollection />} />
        <Route path='/wwp-collection' element={<WWPCollection />} />

        {/* 💥 NEW ROUTE: For the About page */}
        <Route path='/about' element={<About />} />

        <Route path='/hiv-connect' element={<HIVConnect />} />

        <Route
          path='/hiv-connect/awareness-videos'
          element={<VideoSection />}
        />

        {/* 🎗️ REVISED: Update the route to use the HIVCare component */}
        <Route path='/hiv-connect/continuum-of-care' element={<HIVCare />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
