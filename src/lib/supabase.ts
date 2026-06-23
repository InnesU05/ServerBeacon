import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

// Create a single supabase client for interacting with your database
// This will throw at runtime if actually used without valid keys, but allows build to succeed
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
