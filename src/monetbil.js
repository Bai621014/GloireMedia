// Remplacez votre ancien fichier par celui-ci
import { supabase } from './supabaseClient'; // Assurez-vous d'avoir ce fichier

export const effectuerRetrait = async (amount, phone) => {
  // On appelle l'Edge Function côté serveur.
  // Les clés secrètes Monetbil sont stockées en sécurité sur Supabase, 
  // jamais ici dans votre navigateur.
  const { data, error } = await supabase.functions.invoke('effectuer-retrait', {
    body: { amount, phone }
  });
  
  if (error) throw error;
  return data;
};
