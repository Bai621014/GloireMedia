import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

export default function UserProfile() {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const rate = 100;

  useEffect(() => {
    async function fetchBalance() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('balance')
            .eq('id', user.id)
            .single();
          
          if (data) setBalance(data.balance);
        }
      } catch (error) {
        console.error("Erreur de récupération :", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBalance();
  }, []);

  if (loading) return <div style={{color: 'white', padding: '20px'}}>Chargement du solde...</div>;

  return (
    <div style={{ padding: '20px', color: 'white', fontFamily: 'sans-serif' }}>
      <h1>GloireMedia Dashboard</h1>
      <p>Solde actuel : <strong>{balance} GC</strong></p>
      <div style={{ background: '#333', padding: '15px', borderRadius: '10px' }}>
        <p>Valeur en FCFA :</p>
        <h2 style={{ color: '#4ade80' }}>{(balance * rate).toLocaleString()} FCFA</h2>
      </div>
      <button style={{ marginTop: '20px', padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '5px' }}>
        Retirer vers Airtel Money
      </button>
    </div>
  );
}
