import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { v4 as uuidv4 } from "uuid";
import { supabase, GUEST_ID_KEY } from "../supabaseClient";

// Utility function for Philippine Peso formatting
const formatCurrency = (amount) => {
  return amount.toLocaleString("en-PH", { style: "currency", currency: "PHP" });
};

// 📦 J&T Express Discounted Rate Logic (70% OFF Applied)
// Rates are 30% of the original prices.
const JNT_RATES = {
  "METRO MANILA": {
    "0-0.5kg": 25.5, // 85.0 * 0.3
    "0.5-1kg": 34.5, // 115.0 * 0.3
    "1-3kg": 46.5, // 155.0 * 0.3
    "3-4kg": 67.5, // 225.0 * 0.3
    "4-5kg": 91.5, // 305.0 * 0.3
  },
  LUZON: {
    "0-0.5kg": 28.5, // 95.0 * 0.3
    "0.5-1kg": 49.5, // 165.0 * 0.3
    "1-3kg": 57.0, // 190.0 * 0.3
    "3-4kg": 78.0, // 260.0 * 0.3
    "4-5kg": 105.0, // 350.0 * 0.3
  },
  "VISAYAS / MINDANAO": {
    "0-0.5kg": 33.0, // 110.0 * 0.3
    "0.5-1kg": 60.0, // 200.0 * 0.3
    "1-3kg": 69.0, // 230.0 * 0.3
    "3-4kg": 96.0, // 320.0 * 0.3
    "4-5kg": 135.0, // 450.0 * 0.3
  },
};

// =================================================================
// 🚀 UPDATED: Location to Region Mapping for Shipping Fee Calculation
// Uses a combined list of common Cities and Provinces (normalized to UPPERCASE).
// =================================================================
const LOCATION_TO_REGION_MAP = {
  // METRO MANILA (NCR)
  MANILA: "METRO MANILA",
  "QUEZON CITY": "METRO MANILA",
  MAKATI: "METRO MANILA",
  PASIG: "METRO MANILA",
  CALOOCAN: "METRO MANILA",
  "LAS PIÑAS": "METRO MANILA",
  TAGUIG: "METRO MANILA",
  PASAY: "METRO MANILA",
  MUNTINLUPA: "METRO MANILA",
  MANDALUYONG: "METRO MANILA",
  MARIKINA: "METRO MANILA",
  NAVOTAS: "METRO MANILA",

  // LUZON Provinces/Cities (Provincial)
  BATAAN: "LUZON",
  PAMPANGA: "LUZON",
  BULACAN: "LUZON",
  RIZAL: "LUZON",
  LAGUNA: "LUZON",
  BATANGAS: "LUZON",
  CAVITE: "LUZON",
  PANGASINAN: "LUZON",
  ANGELES: "LUZON",
  "SAN FERNANDO": "LUZON",
  OLONGAPO: "LUZON",
  BAGUIO: "LUZON",
  LIPA: "LUZON",
  NAGA: "LUZON",

  // VISAYAS / MINDANAO
  "CEBU CITY": "VISAYAS / MINDANAO",
  "DAVAO CITY": "VISAYAS / MINDANAO",
  "ZAMBOANGA CITY": "VISAYAS / MINDANAO",
  BACOLOD: "VISAYAS / MINDANAO",
  "ILOILO CITY": "VISAYAS / MINDANAO",
  "CAGAYAN DE ORO": "VISAYAS / MINDANAO",
  "GENERAL SANTOS": "VISAYAS / MINDANAO",
  TACLOBAN: "VISAYAS / MINDANAO",
};

const DUMMY_PRODUCT_WEIGHT_KG = 0.5; // Example weight per product

/**
 * Calculates the shipping fee based on the destination city/province.
 * @param {string} location - The city or province entered by the user.
 * @param {number} totalWeightKg - The total weight of the order in kg.
 * @returns {number} The discounted shipping fee for the region.
 */
const getShippingFee = (location, totalWeightKg) => {
  if (!location) return 0;

  // 1. Determine Region based on Location (Case-insensitive)
  const normalizedLocation = location.toUpperCase().trim();
  // Default to METRO MANILA if location is not found in the map
  let region = LOCATION_TO_REGION_MAP[normalizedLocation] || "METRO MANILA";

  // 2. Determine weight tier (logic remains the same)
  let weightTier = "0-0.5kg";
  if (totalWeightKg > 0.5 && totalWeightKg <= 1) weightTier = "0.5-1kg";
  else if (totalWeightKg > 1 && totalWeightKg <= 3) weightTier = "1-3kg";
  else if (totalWeightKg > 3 && totalWeightKg <= 4) weightTier = "3-4kg";
  else if (totalWeightKg > 4 && totalWeightKg <= 5) weightTier = "4-5kg";
  else if (totalWeightKg > 5) return 135.0; // Max out (450.0 * 0.3)

  return JNT_RATES[region]?.[weightTier] || 0;
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartItemCount, getCartTotal, clearCart } = useCart();
  const cartSubtotal = getCartTotal();
  const totalWeightKg = cartItemCount * DUMMY_PRODUCT_WEIGHT_KG;

  const [currentGuestId, setCurrentGuestId] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    contactNumber: "",
    addressLine1: "",
    // 💥 UPDATED FIELD: Consolidate city/province for calculation
    cityOrProvince: "",
    zipCode: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // ✨ CRITICAL FIX: Calculate shipping fee based on the new cityOrProvince field
  const shippingFee = getShippingFee(formData.cityOrProvince, totalWeightKg);
  const orderTotal = cartSubtotal + shippingFee;

  // 1. Initial Guest ID Setup
  useEffect(() => {
    // We only retrieve the ID, no waiting for auth required
    const guestId = localStorage.getItem(GUEST_ID_KEY);
    setCurrentGuestId(guestId);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!currentGuestId || cartItemCount === 0) {
      console.warn("Cannot checkout: Missing Guest ID or empty cart.");
      navigate("/");
      return;
    }

    setIsProcessing(true);

    try {
      // 2. Prepare Data for Orders Table
      const productNameSummary = cartItems.map((item) => item.name).join(", ");

      const shippingAddress = {
        fullName: formData.fullName,
        addressLine1: formData.addressLine1,
        // Save the combined field into both city and province for database compatibility/completeness
        city: formData.cityOrProvince,
        province: formData.cityOrProvince,
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
            contact_number: formData.contactNumber,
            total_amount: orderTotal,
            payment_status: "Paid", // Placeholder
            delivery_status: "Pending", // Added in previous step
            shipping_address: shippingAddress,
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
                {/* Contact Number */}
                <div>
                  <label
                    htmlFor='contactNumber'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Contact Number
                  </label>
                  <input
                    type='tel'
                    id='contactNumber'
                    name='contactNumber'
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    required
                    className='mt-1 block w-full text-black ring ring-black border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500'
                    placeholder='e.g., 09xxxxxxxxx'
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
                    className='mt-1 block w-full text-black ring ring-black border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500'
                  />
                </div>
                {/* City/Province, Zip */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {/* 💥 UPDATED INPUT: Combined City / Province Field */}
                  <div>
                    <label
                      htmlFor='cityOrProvince'
                      className='block text-sm font-medium text-gray-700'
                    >
                      City / Province (eg. Quezon City)
                    </label>
                    <input
                      type='text'
                      id='cityOrProvince'
                      name='cityOrProvince'
                      value={formData.cityOrProvince}
                      onChange={handleInputChange}
                      required
                      className='mt-1 block w-full text-black ring ring-black border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500'
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
                      className='mt-1 block w-full text-black ring ring-black border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500'
                    />
                  </div>
                </div>

                <div className='pt-6 border-t border-gray-200'>
                  <h2 className='text-xl font-bold text-gray-900 mb-4'>
                    Payment Method
                  </h2>
                  <div className='p-4 border-2 border-dashed border-gray-300 rounded-lg text-center'>
                    <p className='text-gray-600'>
                      [Payment Gateway UI Placeholder - e.g., Stripe Elements]
                    </p>
                    <p className='text-xs mt-2'>
                      * Payment is set to "Paid" for demonstration.
                    </p>
                  </div>
                </div>
              </div>

              <div className='mt-8'>
                <button
                  type='submit'
                  disabled={isProcessing || cartItemCount === 0}
                  className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white transition ${
                    isProcessing || cartItemCount === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {isProcessing
                    ? "Processing..."
                    : `Pay ${formatCurrency(orderTotal)}`}
                </button>
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
                    : "Enter City / Province"}
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
