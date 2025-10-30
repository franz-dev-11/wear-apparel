import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { v4 as uuidv4 } from "uuid";
// 🛑 isAuthReady removed
import { supabase, GUEST_ID_KEY } from "../supabaseClient";

// Utility function for Philippine Peso formatting
const formatCurrency = (amount) => {
  return amount.toLocaleString("en-PH", { style: "currency", currency: "PHP" });
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartItemCount, getCartTotal, clearCart } = useCart();
  const orderTotal = getCartTotal();

  const [currentGuestId, setCurrentGuestId] = useState(null);
  // 🛑 isRLSReady state removed

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    addressLine1: "",
    city: "",
    province: "",
    zipCode: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

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

    // Only basic checks remain
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
        city: formData.city,
        province: formData.province,
        zipCode: formData.zipCode,
      };

      // 3. Insert into public.orders
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            // 🚨 CRITICAL CHANGE: The client MUST send the ID explicitly now
            customer_guest_id: currentGuestId,
            customer_name: formData.fullName,
            product_names_summary: productNameSummary,
            customer_email: formData.email,
            total_amount: orderTotal,
            payment_status: "Pending", // Placeholder
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
                  disabled={isProcessing || cartItemCount === 0}
                  className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white transition ${
                    isProcessing || cartItemCount === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {isProcessing ? "Processing..." : `Checkout`}
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
                  {formatCurrency(orderTotal)}
                </dd>
              </div>
              <div className='flex items-center justify-between'>
                <dt className='text-sm text-gray-600'>Shipping</dt>
                <dd className='text-sm font-medium text-gray-900'>FREE</dd>
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
