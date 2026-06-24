import { useState } from 'react';
import { supabase } from './lib/supabase';

export default function UserProfile() {
  const [balance] = useState(500);
  const [loading, setLoading] = useState(false);
  const rate = 100;
  const phoneNumber = "+235 62 10 14 68";

  const handleWithdraw = async () => {
    setLoading(true);
    const amountFCFA = balance * rate;

    // Envoi de la demande vers la table 'withdrawals' que vous venez de créer
    const { error } = await supabase
      .from('withdrawals')
      .insert([
        { 
          user_id: 'user_test', // ID temporaire pour le test
          amount: amountFCFA, 
          phone: phoneNumber, 
          status: 'pending' 
        }
      ]);

    if (error) {
      alert("Erreur : " + error.message);
    } else {
      alert("Demande de retrait de " + amountFCFA.toLocaleString() + " FCFA envoyée au " + phoneNumber + " !");
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: '#030712', color: '#ffffff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ marginBottom: '2rem' }}>GLOIRE<span style={{ color: '#3b82f6' }}>MEDIA</span></h1>
      
      <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '20px', width: '100%', maxWidth: '300px', textAlign: 'center', marginBottom: '1rem' }}>
        <p style={{ color: '#94a3b8' }}>Solde actuel :</p>
        <h2 style={{ fontSize: '2.5rem', color: '#22c55e', margin: '10px 0' }}>{balance} GC</h2>
      </div>

      <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '20px', width: '100%', maxWidth: '300px', textAlign: 'center', marginBottom: '2rem' }}>
        <p style={{ color: '#94a3b8' }}>Valeur en FCFA :</p>
        <h3 style={{ fontSize: '1.5rem', margin: '10px 0' }}>{amountFCFA.toLocaleString()} FCFA</h3>
      </div>

      <button 
        onClick={handleWithdraw}
        disabled={loading}
        style={{ 
          width: '100%', maxWidth: '300px', padding: '1rem', 
          backgroundColor: loading ? '#475569' : '#3b82f6', 
          color: 'white', border: 'none', borderRadius: '15px', 
          fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' 
        }}
      >
        {loading ? "Envoi en cours..." : "Retrait Airtel " + phoneNumber}
      </button>
    </div>
  );
}
