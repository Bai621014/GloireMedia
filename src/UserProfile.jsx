import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialisation sécurisée avec les variables Vite
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || "", 
  import.meta.env.VITE_SUPABASE_ANON_KEY || ""
);

// Fonction sécurisée appelant l'Edge Function Supabase
export const effectuerRetrait = async (amount, phone) => {
  const { data, error } = await supabase.functions.invoke('effectuer-retrait', {
    body: { amount, phone }
  });
  
  if (error) throw error;
  return data;
};

export default function UserProfile() {
  const [balance] = useState(500);
  const [isLoading, setIsLoading] = useState(false);
  
  const rate = 100;
  const phoneNumber = "+235 62 10 14 68";
  const amountToWithdraw = 50000;

  const handleWithdraw = async () => {
    setIsLoading(true);
    try {
      // Appel de la fonction sécurisée
      const resultat = await effectuerRetrait(amountToWithdraw, phoneNumber);
      
      if (resultat && (resultat.status === 'success' || resultat.success)) {
        // Enregistrer la demande en base de données
        const { error } = await supabase.from('retraits').insert([{ 
          montant_fcfa: amountToWithdraw, 
          numero_mobile: phoneNumber, 
          statut: 'pending' // En attente du webhook Monetbil
        }]);
        
        if (error) throw new Error("Erreur base de données");
        alert("Demande transmise avec succès ! Validation en cours...");
      } else {
        alert("Échec : " + (resultat?.message || "Erreur lors de la transaction"));
      }
    } catch (err) {
      console.error("Erreur:", err);
      alert("Erreur critique lors de la communication. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#030712', 
      color: '#ffffff', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'sans-serif'
    }}>
      <h1>GLOIREMEDIA</h1>
      <h2 style={{ marginBottom: '30px' }}>Solde: {(balance * rate).toLocaleString()} FCFA</h2>
      
      <button 
        disabled={isLoading} 
        onClick={handleWithdraw} 
        style={{ 
          padding: '15px 30px', 
          backgroundColor: isLoading ? '#6b7280' : '#3b82f6', 
          color: 'white', 
          border: 'none', 
          borderRadius: '10px', 
          cursor: isLoading ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        {isLoading ? "Traitement en cours..." : `Retrait Airtel ${phoneNumber}`}
      </button>
    </div>
  );
  }
