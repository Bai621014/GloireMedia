import { createClient } from '@supabase/supabase-js';

// Récupération des clés sécurisées de ton projet Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("⚠️ Clés Supabase manquantes dans les variables d'environnement.");
}

// Création du client unique pour tout l'écosystème GloireMedia
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
