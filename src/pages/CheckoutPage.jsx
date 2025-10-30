import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { v4 as uuidv4 } from "uuid";
import { supabase, GUEST_ID_KEY } from "../supabaseClient";

// Utility function for Philippine Peso formatting
const formatCurrency = (amount) => {
  return amount.toLocaleString("en-PH", { style: "currency", currency: "PHP" });
};

// 📦 J&T Express Dummy Rate Logic
// DUMMY STORE LOCATION: QUEZON CITY (METRO MANILA)
// Rates based on "J&T Express Shipping Rates from Metro Manila" (approx. 2023 rates)
const JNT_RATES = {
  // Destination: Metro Manila (from Quezon City)
  "METRO MANILA": {
    "0-0.5kg": 85.0,
    "0.5-1kg": 115.0,
    "1-3kg": 155.0,
    "3-4kg": 225.0,
    "4-5kg": 305.0,
  },
  // Destination: Luzon (Provincial)
  LUZON: {
    "0-0.5kg": 95.0,
    "0.5-1kg": 165.0,
    "1-3kg": 190.0,
    "3-4kg": 280.0,
    "4-5kg": 370.0,
  },
  // Destination: Visayas
  VISAYAS: {
    "0-0.5kg": 100.0,
    "0.5-1kg": 180.0,
    "1-3kg": 200.0,
    "3-4kg": 300.0,
    "4-5kg": 400.0,
  },
  // Destination: Mindanao
  MINDANAO: {
    "0-0.5kg": 105.0,
    "0.5-1kg": 195.0,
    "1-3kg": 220.0,
    "3-4kg": 330.0,
    "4-5kg": 440.0,
  },
  // Destination: Island (For remote areas not covered by major Visayas/Mindanao hubs)
  ISLAND: {
    "0-0.5kg": 115.0,
    "0.5-1kg": 205.0,
    "1-3kg": 230.0,
    "3-4kg": 340.0,
    "4-5kg": 450.0,
  },
};

// List of all Metro Manila cities/municipalities for robust checking
const METRO_MANILA_LOCATIONS = [
  "CALOOCAN",
  "MALABON",
  "MANDALUYONG",
  "MANILA",
  "MAKATI",
  "MUNTINLUPA",
  "NAVOTAS",
  "PARAÑAQUE",
  "PASAY",
  "PASIG",
  "PATEROS",
  "QUEZON",
  "SAN JUAN",
  "TAGUIG",
  "VALENZUELA",
  "MARIKINA",
  "LAS PIÑAS",
  "NCR",
  "METRO MANILA",
];

// Helper to determine the region from the province/city
const getRegionFromProvince = (provinceOrCity) => {
  const upperLocation = provinceOrCity.toUpperCase().trim();

  // Check for Metro Manila locations
  if (METRO_MANILA_LOCATIONS.some((city) => upperLocation.includes(city))) {
    return "METRO MANILA";
  }

  // Simple, non-exhaustive mapping for other regions
  // Check for common Luzon provinces
  if (
    upperLocation.includes("LAGUNA") ||
    upperLocation.includes("CAVITE") ||
    upperLocation.includes("BULACAN") ||
    upperLocation.includes("PAMPANGA") ||
    upperLocation.includes("BATANGAS") ||
    upperLocation.includes("TARLAC") ||
    upperLocation.includes("NUEVA ECIJA") ||
    upperLocation.includes("PANGASINAN")
  ) {
    return "LUZON";
  }
  // Check for common Visayas provinces
  if (
    upperLocation.includes("CEBU") ||
    upperLocation.includes("ILOILO") ||
    upperLocation.includes("BOHOL") ||
    upperLocation.includes("LEYTE")
  ) {
    return "VISAYAS";
  }
  // Check for common Mindanao provinces
  if (
    upperLocation.includes("DAVAO") ||
    upperLocation.includes("CAGAYAN DE ORO") ||
    upperLocation.includes("ZAMBOANGA") ||
    upperLocation.includes("GENERAL SANTOS")
  ) {
    return "MINDANAO";
  }
  // Default to a higher-tier Luzon rate for unlisted provinces
  return "LUZON";
};

// 💡 DEMO ASSUMPTION: Total package weight for this order
const DUMMY_PACKAGE_WEIGHT_KG = 1.5;

const calculateShippingFee = (province, totalWeightKg) => {
  const region = getRegionFromProvince(province);
  const rates = JNT_RATES[region];

  if (!rates) return 0;

  // Determine the weight bracket
  let weightBracket;
  if (totalWeightKg <= 0.5) {
    weightBracket = "0-0.5kg";
  } else if (totalWeightKg <= 1.0) {
    weightBracket = "0.5-1kg";
  } else if (totalWeightKg <= 3.0) {
    weightBracket = "1-3kg";
  } else if (totalWeightKg <= 4.0) {
    weightBracket = "3-4kg";
  } else if (totalWeightKg <= 5.0) {
    weightBracket = "4-5kg";
  } else {
    // For packages over 5kg, provide a high default or a max tier
    return rates["4-5kg"] * 1.5; // Simple scaling for demo
  }

  const originalFee = rates[weightBracket];
  // Apply 70% cut (i.e., charge 30% of the original fee)
  const discountedFee = originalFee * 0.3;
  return discountedFee;
};
const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartItemCount, getCartTotal, clearCart } = useCart();
  const cartSubtotal = getCartTotal();

  const [shippingFee, setShippingFee] = useState(0);
  const orderTotal = cartSubtotal + shippingFee;

  const [currentGuestId, setCurrentGuestId] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    addressLine1: "",
    city: "",
    province: "",
    zipCode: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Use useCallback to memoize the function for useEffect dependency
  const updateShippingFee = useCallback(() => {
    // Combine city and province for a more accurate region check
    const checkLocation = formData.city + " " + formData.province;
    if (checkLocation.trim()) {
      const fee = calculateShippingFee(checkLocation, DUMMY_PACKAGE_WEIGHT_KG);
      setShippingFee(fee);
    } else {
      setShippingFee(0);
    }
  }, [formData.city, formData.province]);

  // 1. Initial Guest ID Setup
  useEffect(() => {
    const guestId = localStorage.getItem(GUEST_ID_KEY);
    setCurrentGuestId(guestId);
  }, []);

  // 2. Update Shipping Fee whenever the city or province changes
  useEffect(() => {
    updateShippingFee();
  }, [updateShippingFee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!currentGuestId || cartItemCount === 0 || shippingFee <= 0) {
      console.warn(
        "Cannot checkout: Missing Guest ID, empty cart, or missing shipping fee."
      );
      if (shippingFee <= 0 && cartItemCount > 0) {
        alert("Please enter a valid shipping address to calculate the fee.");
      }
      return;
    }

    setIsProcessing(true);

    try {
      // 2. Prepare Data for Orders Table
      const productNameSummary = cartItems.map((item) => item.name).join(", ");

      const shippingAddress = {
        fullName: formData.fullName,
        addressLine1: formData.addressLine1,
        city: formData.city,
        province: formData.province,
        zipCode: formData.zipCode,
      };

      // 3. Insert into public.orders
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            customer_guest_id: currentGuestId,
            customer_name: formData.fullName,
            product_names_summary: productNameSummary,
            customer_email: formData.email,
            total_amount: orderTotal,
            shipping_fee: shippingFee,
            payment_status: "Pending",
            shipping_address: shippingAddress,
            delivery_status: "Pending",
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;
      const orderId = orderData.id;

      // 4. Prepare and Insert into public.order_items
      const orderItemsToInsert = cartItems.map((item) => ({
        order_id: orderId,
        product_id: item.productId,
        product_name: item.name,
        quantity: item.quantity,
        price_at_purchase: item.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItemsToInsert);

      if (itemsError) throw itemsError;

      // 5. Finalize
      clearCart();
      navigate(`/order-confirmation/${orderId}`);
    } catch (error) {
      console.error("Checkout failed:", error);
      alert(
        `There was an error processing your order: ${error.message}. Please check console.`
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // --- Simplified Conditional Rendering ---
  if (cartItemCount === 0 || !currentGuestId) {
    return (
      <div className='min-h-screen pt-24 pb-12 flex flex-col items-center justify-center bg-gray-50'>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>
          Your Cart is Empty
        </h1>
        <Link
          to='/'
          className='px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 transition duration-150'
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  // --- Main Checkout Form ---
  return (
    <div className='min-h-screen pt-24 pb-12 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4'>
          Checkout
        </h1>

        <div className='lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16'>
          <section className='lg:col-span-7 bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-xl font-bold text-gray-900 mb-6'>
              Shipping Information
            </h2>
            <form onSubmit={handleCheckout}>
              <div className='space-y-4'>
                {/* Email */}
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Email Address
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className='mt-1 block w-full text-black ring ring-black border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500'
                  />
                </div>
                {/* Full Name */}
                <div>
                  <label
                    htmlFor='fullName'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Full Name
                  </label>
                  <input
                    type='text'
                    id='fullName'
                    name='fullName'
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className='mt-1 block w-full text-black ring ring-black border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500'
                  />
                </div>
                {/* Address Line 1 */}
                <div>
                  <label
                    htmlFor='addressLine1'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Street Address
                  </label>
                  <input
                    type='text'
                    id='addressLine1'
                    name='addressLine1'
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    required
                    className='mt-1 block w-full text-black ring ring-black border  border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500'
                  />
                </div>
                {/* City, Province, Zip */}
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                  <div>
                    <label
                      htmlFor='city'
                      className='block text-sm font-medium text-gray-700'
                    >
                      City
                    </label>
                    <input
                      type='text'
                      id='city'
                      name='city'
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className='mt-1 block w-full text-black ring ring-black border  border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='province'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Province
                    </label>
                    <input
                      type='text'
                      id='province'
                      name='province'
                      value={formData.province}
                      onChange={handleInputChange}
                      required
                      className='mt-1 block w-full text-black ring ring-black border  border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='zipCode'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Zip Code
                    </label>
                    <input
                      type='text'
                      id='zipCode'
                      name='zipCode'
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className='mt-1 block w-full text-black ring ring-black border  border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500'
                    />
                  </div>
                </div>

                <div className='pt-6 border-t border-gray-200'>
                  <h2 className='text-xl font-bold text-gray-900 mb-4'>
                    Payment Method
                  </h2>
                  <div className='p-4 border-2 border-dashed border-gray-300 rounded-lg text-center'>
                    <p className='text-gray-600'>
                      Follow Instructions After Checkout!
                    </p>
                  </div>
                </div>
              </div>

              <div className='mt-8'>
                <button
                  type='submit'
                  disabled={
                    isProcessing || cartItemCount === 0 || shippingFee <= 0
                  }
                  className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white transition ${
                    isProcessing || cartItemCount === 0 || shippingFee <= 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {isProcessing ? "Processing..." : `Checkout`}
                </button>
                {shippingFee <= 0 && (
                  <p className='mt-2 text-sm text-red-600 text-center'>
                    Please enter a valid City and Province to calculate shipping
                    fee.
                  </p>
                )}
              </div>
            </form>
          </section>

          <section
            aria-labelledby='summary-heading'
            className='mt-10 lg:mt-0 lg:col-span-5 sticky top-20 h-fit bg-white p-6 rounded-lg shadow-md'
          >
            <h2
              id='summary-heading'
              className='text-lg font-medium text-gray-900 pb-4 border-b'
            >
              Order Summary
            </h2>

            <ul role='list' className='divide-y divide-gray-200'>
              {cartItems.map((item) => (
                <li key={item.id} className='py-4 flex justify-between'>
                  <div className='flex flex-col'>
                    <p className='text-sm font-medium text-gray-900'>
                      {item.name} (x{item.quantity})
                    </p>
                    <p className='text-xs text-gray-500'>Size: {item.size}</p>
                  </div>
                  <p className='text-sm font-medium text-gray-900'>
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <dl className='mt-4 space-y-4 border-t border-gray-200 pt-4'>
              <div className='flex items-center justify-between'>
                <dt className='text-sm text-gray-600'>Subtotal</dt>
                <dd className='text-sm font-medium text-gray-900'>
                  {formatCurrency(cartSubtotal)}
                </dd>
              </div>
              <div className='flex items-center justify-between'>
                <dt className='text-sm text-gray-600'>
                  Shipping (J&T Express)
                </dt>
                <dd className='text-sm font-medium text-gray-900'>
                  {shippingFee > 0
                    ? formatCurrency(shippingFee)
                    : "Enter Address"}
                </dd>
              </div>
              <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                <dt className='text-lg font-bold text-gray-900'>Total</dt>
                <dd className='text-lg font-bold text-gray-900'>
                  {formatCurrency(orderTotal)}
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
