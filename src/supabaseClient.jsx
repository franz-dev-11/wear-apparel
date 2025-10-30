import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Export the key for local storage
export const GUEST_ID_KEY = "guest_id";

// Retrieve or Generate the Guest ID
let guestId = localStorage.getItem(GUEST_ID_KEY);

if (!guestId) {
  guestId = uuidv4();
  localStorage.setItem(GUEST_ID_KEY, guestId);
}

// Initialize the standard Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ----------------------------------------------------
// 🛑 RLS Synchronization logic removed 🛑
// export const isAuthReady is no longer needed
// ----------------------------------------------------
