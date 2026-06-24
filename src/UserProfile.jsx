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
        // On récupère l'utilisateur connecté
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // On récupère le solde dans la table profiles
          const { data, error } = await supabase
            .from('profiles')
            .select('balance')
            .eq('id', user.id)
            .single();
          
          if (data) setBalance(data.balance);
        }
      } catch (err) {
        console.error("Erreur de connexion :", err);
      } finally {
        setLoading(false);
      }
    }
    initDashboard();
  }, []);

  return (
    <div style={{ padding: '40px', color: 'white', backgroundColor: '#1e293b', minHeight: '100vh', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '30px' }}>GloireMedia Dashboard</h1>
      
      {loading ? (
        <p>Chargement des données sécurisées...</p>
      ) : (
        <>
          <div style={{ marginBottom: '20px' }}>
            <p>Solde actuel :</p>
            <h2 style={{ fontSize: '3em', margin: '10px 0' }}>{balance.toLocaleString()} GC</h2>
          </div>
          
          <div style={{ background: '#0f172a', padding: '20px', borderRadius: '15px' }}>
            <p style={{ color: '#94a3b8' }}>Valeur en FCFA :</p>
            <h2 style={{ color: '#4ade80', fontSize: '2.5em' }}>{(balance * rate).toLocaleString()} FCFA</h2>
          </div>

          <button style={{ marginTop: '30px', padding: '15px 40px', background: '#2563eb', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer' }}>
            Retirer vers Airtel Money
          </button>
        </>
      )}
    </div>
  );
}
