import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// NOTE: We don't need to import 'supabase' or handle synchronization state here anymore.

import "leaflet/dist/leaflet.css";

// 2. Leaflet Control Geocoder plugin CSS
import "leaflet-control-geocoder/dist/Control.Geocoder.css";

// --- Existing Feature Imports ---
import Home from "./features/LandingPage/LandingPage";
import AWARECollection from "./features/OurProducts/AWARE-Collection";
import WWPCollection from "./features/OurProducts/WWP-Collection";
import HIVConnect from "./features/HIV-Connect/HIVCare";
import VideoSection from "./features/HIV-Connect/VideoSection";
import About from "./features/About/About";
import HIVCare from "./features/HIV-Connect/HIVCare";

// --- Component Imports ---
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./components/CartContext";

// --- E-COMMERCE PAGE IMPORTS ---
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <main className='flex-grow'>
          <Routes>
            {/* Existing Routes */}
            <Route path='/' element={<Home />} />
            <Route path='/aware-collection' element={<AWARECollection />} />
            <Route path='/wwp-collection' element={<WWPCollection />} />
            <Route path='/about' element={<About />} />
            <Route path='/hiv-connect' element={<HIVConnect />} />
            <Route
              path='/hiv-connect/awareness-videos'
              element={<VideoSection />}
            />
            <Route
              path='/hiv-connect/continuum-of-care'
              element={<HIVCare />}
            />

            {/* --- E-COMMERCE ROUTES --- */}
            <Route path='/cart' element={<CartPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route
              path='/order-confirmation/:orderId'
              element={<OrderConfirmationPage />}
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
