import { createClient } from "@supabase/supabase-js";

// Initialize Supabase with the Service Role Key
// Vercel automatically exposes environment variables set in the dashboard.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// This is the CRITICAL change: use the secret service key!
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a special client that has admin privileges
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  // 1. Check for POST request method
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // 2. Extract data sent from the frontend
  const { orderToInsert, orderItemsToInsert } = req.body;

  // 3. Start a protected transaction
  try {
    // --- ADMIN-LEVEL INSERTION (RLS Bypassed) ---

    // Insert into public.orders
    const { data: orderData, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert([orderToInsert])
      .select("id") // Only need the new ID
      .single();

    if (orderError) throw orderError;
    const orderId = orderData.id;

    // Attach the new orderId to the items
    const finalOrderItems = orderItemsToInsert.map((item) => ({
      ...item,
      order_id: orderId,
    }));

    // Insert into public.order_items
    const { error: itemsError } = await supabaseAdmin
      .from("order_items")
      .insert(finalOrderItems);

    if (itemsError) throw itemsError;

    // 4. Success Response
    res.status(200).json({
      success: true,
      orderId: orderId,
      message: "Order placed successfully.",
    });
  } catch (error) {
    console.error("API Checkout Failed:", error);
    // Return a generic error to the client for security
    res.status(500).json({
      success: false,
      message: "Order processing failed due to a server error.",
    });
  }
}
