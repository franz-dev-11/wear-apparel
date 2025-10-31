import React from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

// Import useCart hook (Path assumes components is at ../components/CartContext)
import { useCart } from "../components/CartContext";

// --- START: Product Image Imports (from imageImports-AWARE & imageImports-WWP) ---

// AWARE Collection (Corresponds to showcase1a, showcase2a, showcase3a)
import awareHoodieFront from "/src/img/AWARE-WHITE-COLLECTION/white-hoodie-front.png";
import awareShirtFront from "/src/img/AWARE-WHITE-COLLECTION/white-shirt-front.png";
import awareSweaterFront from "/src/img/AWARE-WHITE-COLLECTION/white-sweater-front.png";

// WWP Collection (Corresponds to showcase4a-6a, i.e., the front views)
import wwpHoodieFront from "/src/img/WWP-BLACK-COLLECTION/wwp-hoodie-front.png";
import wwpShirtFront from "/src/img/WWP-BLACK-COLLECTION/wwp-shirt-front.png";
import wwpSweaterFront from "/src/img/WWP-BLACK-COLLECTION/wwp-sweater-front.png";

// --- END: Product Image Imports ---

// --- START: Image Mapping Logic ---
// Map product names to their imported image source
const PRODUCT_IMAGES = {
  // AWARE Collection - Use product names that match your cart item's 'name' property
  "AWARE Hoodie White": awareHoodieFront,
  "AWARE Shirt White": awareShirtFront,
  "AWARE Sweater White": awareSweaterFront,
  // WWP Collection - Use product names that match your cart item's 'name' property
  "WWP Hoodie Black": wwpHoodieFront,
  "WWP Shirt Black": wwpShirtFront,
  "WWP Sweater Black": wwpSweaterFront,
};

// Function to get image source. Returns null if no match is found, allowing a default placeholder to render.
const getProductImage = (itemName) => {
  return PRODUCT_IMAGES[itemName] || null;
};
// --- END: Image Mapping Logic ---

// Utility function for Philippine Peso formatting
const formatCurrency = (amount) => {
  return amount.toLocaleString("en-PH", { style: "currency", currency: "PHP" });
};

const CartPage = () => {
  // Destructure the necessary state and functions from the context
  const {
    cartItems,
    cartItemCount,
    removeFromCart,
    updateItemQuantity,
    getCartTotal,
  } = useCart();
  const cartTotal = getCartTotal();

  // --- Empty Cart State ---
  if (cartItemCount === 0) {
    return (
      <div className='min-h-screen pt-24 pb-12 flex flex-col items-center justify-center bg-gray-50'>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>
          Your Cart is Empty
        </h1>
        <p className='text-gray-600 mb-6'>
          It looks like you haven't added anything to your cart yet.
        </p>
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
          Shopping Cart ({cartItemCount}{" "}
          {cartItemCount === 1 ? "Item" : "Items"})
        </h1>

        <div className='lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16'>
          {/* --- Cart Items List (Column 1) --- */}
          <section
            aria-labelledby='cart-heading'
            className='lg:col-span-8 bg-white p-6 rounded-lg shadow-md'
          >
            <ul role='list' className='divide-y divide-gray-200'>
              {cartItems.map((item) => {
                // Get the product image source based on the item name
                const itemImageSrc = getProductImage(item.name);

                return (
                  <li key={item.id} className='flex py-6'>
                    <div className='flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden'>
                      {/* Dynamic Product Image. Renders a generic div if no image source is found. */}
                      {itemImageSrc ? (
                        <img
                          src={itemImageSrc}
                          alt={item.name}
                          className='w-full h-full object-cover object-center'
                        />
                      ) : (
                        <div className='w-full h-full bg-gray-300 flex items-center justify-center text-xs text-gray-700 text-center p-1'>
                          Image Not Found
                        </div>
                      )}
                    </div>

                    <div className='ml-4 flex-1 flex flex-col'>
                      <div>
                        {/* Item Name and Total Price */}
                        <div className='flex justify-between text-base font-medium text-gray-900'>
                          <h3>{item.name}</h3>
                          <p className='ml-4'>
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                        <p className='mt-1 text-sm text-gray-500'>
                          Size: {item.size}
                        </p>
                        {/* Unit Price */}
                        <p className='text-sm font-medium text-red-600'>
                          Unit Price: {formatCurrency(item.price)}
                        </p>
                      </div>

                      <div className='flex-1 flex items-end justify-between text-sm mt-3'>
                        <div className='flex items-center space-x-2'>
                          <label
                            htmlFor={`quantity-${item.id}`}
                            className='text-gray-500'
                          >
                            Qty
                          </label>
                          {/* Quantity Input with Update Function */}
                          <input
                            id={`quantity-${item.id}`}
                            type='number'
                            value={item.quantity}
                            min='1'
                            // Update quantity when input changes
                            onChange={(e) =>
                              updateItemQuantity(
                                item.id,
                                parseInt(e.target.value, 10) || 1
                              )
                            }
                            className='w-16 border border-gray-300 rounded-md shadow-sm py-1.5 text-base font-medium text-gray-700 text-center focus:outline-none focus:ring-red-500 focus:border-red-500'
                          />
                        </div>

                        <div className='flex'>
                          {/* Remove Button */}
                          <button
                            type='button'
                            onClick={() => removeFromCart(item.id)}
                            className='font-medium text-red-600 hover:text-red-500 flex items-center space-x-1'
                          >
                            <Trash2 className='h-4 w-4' />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* --- Order Summary (Column 2) --- */}
          <section
            aria-labelledby='summary-heading'
            className='mt-10 lg:mt-0 lg:col-span-4 sticky top-20 h-fit bg-white p-6 rounded-lg shadow-md'
          >
            <h2
              id='summary-heading'
              className='text-lg font-medium text-gray-900 pb-4 border-b'
            >
              Order Summary
            </h2>

            <dl className='mt-6 space-y-4'>
              <div className='flex items-center justify-between'>
                <dt className='text-sm text-gray-600'>
                  Subtotal ({cartItemCount}{" "}
                  {cartItemCount === 1 ? "item" : "items"})
                </dt>
                <dd className='text-sm font-medium text-gray-900'>
                  {formatCurrency(cartTotal)}
                </dd>
              </div>
              <div className='flex items-center justify-between'>
                <dt className='text-sm text-gray-600'>Shipping</dt>
                <dd className='text-sm font-medium text-gray-900'>FREE</dd>
              </div>
              <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                <dt className='text-base font-bold text-gray-900'>
                  Order Total
                </dt>
                <dd className='text-base font-bold text-gray-900'>
                  {formatCurrency(cartTotal)}
                </dd>
              </div>
            </dl>

            <div className='mt-6'>
              <Link
                to='/checkout'
                className='w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-red-700'
              >
                Proceed to Checkout
              </Link>
            </div>
            <div className='mt-6 flex justify-center text-center text-sm'>
              <p>
                or{" "}
                <Link
                  to='/'
                  className='font-medium text-red-600 hover:text-red-500'
                >
                  Continue Shopping <span aria-hidden='true'> &rarr;</span>
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
