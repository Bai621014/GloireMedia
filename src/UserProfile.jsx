import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

export default function UserProfile() {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const rate = 100;

  useEffect(() => {
    async function initDashboard() {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('balance')
            .eq('id', user.id)
            .single();
          if (data) setBalance(data.balance);
        }
      } catch (err) {
        console.error("Erreur :", err);
      } finally {
        setLoading(false);
      }
    }
    initDashboard();
  }, []);

  return (
    <div style={{ padding: '20px', color: 'white', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>GloireMedia Dashboard</h1>
      {loading ? (
        <p>Chargement du solde...</p>
      ) : (
        <>
          <p>Solde actuel : <strong>{balance.toLocaleString()} GC</strong></p>
          <div style={{ background: '#1e293b', padding: '20px', borderRadius: '15px', marginTop: '10px' }}>
            <p style={{ color: '#94a3b8' }}>Valeur en FCFA :</p>
            <h2 style={{ color: '#4ade80', fontSize: '2em' }}>{(balance * rate).toLocaleString()} FCFA</h2>
          </div>
          <button style={{ marginTop: '20px', padding: '15px 30px', background: '#2563eb', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 'bold' }}>
            Retirer vers Airtel Money
          </button>
        </>
      )}
    </div>
  );
}
