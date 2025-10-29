import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./features/LandingPage/LandingPage";
import AWARECollection from "./features/OurProducts/AWARE-Collection";
import WWPCollection from "./features/OurProducts/WWP-Collection";

// 🚀 FIXED: Import the Header component from its own file
import Header from "./components/Header";
// Assuming you created a separate Footer.jsx file
import Footer from "./components/Footer";

function App() {
  return (
    // Wrap the entire application with the Header and Footer
    <BrowserRouter>
      {/* 1. Header is now correctly imported and rendered */}
      <Header />
      {/* 2. Main content area */}
      <Routes>
        {/* Route for the Home/Landing Page */}
        <Route path='/' element={<Home />} />

        {/* Route for the AWARE Collection Page (Triggers on /aware-collection) */}
        <Route path='/aware-collection' element={<AWARECollection />} />

        {/* Placeholder for the WWP Collection Page */}
        <Route path='/wwp-collection' element={<WWPCollection />} />
      </Routes>
      {/* 3. Footer is rendered on all pages */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
