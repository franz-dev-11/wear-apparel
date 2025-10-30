import React from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

// The component is now completely static and ignores data fetching errors.
const OrderConfirmationPage = () => {
  // We still use useParams to grab the orderId from the URL, but don't use it to fetch data.
  const { orderId } = useParams();

  // Define static data for display purposes
  const customerEmail = "guest.checkout@example.com"; // Placeholder email
  const shippingName = "Valued Customer"; // Placeholder name

  return (
    <div className='min-h-screen pt-24 pb-12 bg-gray-50'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header Confirmation */}
        <div className='text-center bg-white p-8 rounded-lg shadow-xl mb-10'>
          <CheckCircle className='w-16 h-16 mx-auto text-green-500 mb-4' />
          <h1 className='text-4xl font-extrabold text-gray-900 mb-2'>
            Order Successful! 🎉
          </h1>
          <p className='text-lg text-gray-600'>
            Thank you, {shippingName}! Your order has been placed.
          </p>
          <p className='mt-4 text-sm text-gray-500'>
            Your order ID is:{" "}
            <span className='font-semibold text-gray-700 break-all'>
              {orderId || "N/A"}
            </span>
          </p>
        </div>

        {/* Static Message Block */}
        <div className='bg-white p-6 rounded-lg shadow-md mb-10'>
          <h2 className='text-xl font-bold text-gray-900 mb-4'>
            What Happens Next?
          </h2>
          <ul className='list-disc list-inside text-gray-600 space-y-2'>
            <li>We've successfully received your order</li>
            <li>
              You will receive a shipping confirmation email with tracking
              details as soon as you send us the payment reference number (Gcash
              or Maya) via text for confirmation. Our contact number is
              09**********.
            </li>
            <li>Gcash: 09**********</li>
            <li>Maya: 09**********</li>
            <li>For any issues, please contact support.</li>
          </ul>
        </div>

        {/* Footer Navigation */}
        <div className='mt-10 text-center'>
          <Link
            to='/'
            className='text-base font-medium text-red-600 hover:text-red-500'
          >
            <span aria-hidden='true'>&larr;</span> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
