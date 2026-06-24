import { useState } from 'react';
import { supabase } from './lib/supabase'; // Import de votre connexion Supabase

export default function UserProfile() {
  const [balance] = useState(500);
  const [isProcessing, setIsProcessing] = useState(false);
  const rate = 100;
  const phoneNumber = "+235 62 10 14 68";

  const handleWithdraw = async () => {
    setIsProcessing(true);
    const amountFCFA = balance * rate;
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('withdrawals')
        .insert([
          { 
            user_id: user?.id || 'guest_user', 
            amount: amountFCFA, 
            phone: phoneNumber, 
            status: 'pending' 
          }
        ]);

      if (error) throw error;
      
      alert(`Succès ! Retrait de ${amountFCFA.toLocaleString()} FCFA demandé au ${phoneNumber}.`);
    } catch (err) {
      alert("Erreur : " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#030712', color: '#ffffff', minHeight: '100vh', padding: '20px', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>GLOIRE<span style={{ color: '#3b82f6' }}>MEDIA</span></h1>

      <div style={{ background: 'linear-gradient(145deg, #1e293b, #0f172a)', padding: '2rem', borderRadius: '24px', width: '100%', maxWidth: '350px', textAlign: 'center', border: '1px solid #334155', marginBottom: '1rem' }}>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Solde actuel</p>
        <h2 style={{ fontSize: '2.5rem', margin: 0, color: '#22c55e' }}>{balance} GC</h2>
      </div>

      <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '20px', width: '100%', maxWidth: '350px', textAlign: 'center', marginBottom: '2rem' }}>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Valeur équivalente</p>
        <h3 style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>{(balance * rate).toLocaleString()} FCFA</h3>
      </div>

      <button 
        onClick={handleWithdraw}
        disabled={isProcessing}
        style={{ 
          width: '100%', maxWidth: '350px', padding: '1rem', 
          backgroundColor: isProcessing ? '#4b5563' : '#3b82f6', 
          color: 'white', border: 'none', borderRadius: '16px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer'
        }}
      >
        {isProcessing ? "Traitement..." : `Retrait Airtel ${phoneNumber}`}
      </button>
    </div>
  );
}
