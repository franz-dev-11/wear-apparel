// src/supabaseClient.jsx - CRITICAL FIX

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const GUEST_ID_KEY = "guest_id";

// 1. Get the guest_id from local storage
const guestId = localStorage.getItem(GUEST_ID_KEY);

// 2. Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 3. FIX: If a guest_id exists, set a custom token for the session.
// This makes the 'guest_id' available to the RLS policy via `request.jwt.claims`.
if (guestId) {
  // Create a minimal JWT payload containing the guest_id
  const customGuestToken = {
    guest_id: guestId,
  };

  // This method tells Supabase to include the customGuestToken data in the request header.
  supabase.auth
    .signInWithIdToken({
      provider: "supabase",
      token: JSON.stringify(customGuestToken),
    })
    .then(({ error }) => {
      if (error) {
        console.error("Failed to set guest token for RLS:", error.message);
      } else {
        console.log("Guest ID successfully set for RLS enforcement.");
      }
    });
}
