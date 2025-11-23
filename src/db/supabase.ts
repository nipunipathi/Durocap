import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY");
  console.error("Current env:", {
    VITE_SUPABASE_URL: supabaseUrl ? "Set" : "Missing",
    VITE_SUPABASE_ANON_KEY: supabaseAnonKey ? "Set" : "Missing"
  });
}

// Create client with fallback values to prevent app from crashing
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key"
);
