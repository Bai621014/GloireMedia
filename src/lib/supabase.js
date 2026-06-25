import { createClient } from '@supabase/supabase-js';

// On utilise bien import.meta.env pour que Vite récupère les clés sur Render
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
