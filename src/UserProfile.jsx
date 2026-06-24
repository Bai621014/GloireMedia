import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

export default function UserProfile() {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const rate = 100; // Taux de change fixe 1GC = 100 FCFA

  useEffect(() => {
    async function initDashboard() {
      try {
        setLoading(true);
        // 1. Récupération de l'utilisateur connecté
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // 2. Récupération du solde réel dans Supabase
          const { data, error } = await supabase
            .from('profiles')
            .select('balance')
            .eq('id', user.id)
            .single();
          
          if (data) setBalance(data.balance);
          if (error) console.error("Erreur de récupération :", error);
        }
      } catch (err) {
        console.error("Erreur critique :", err);
      } finally {
        setLoading(false);
      }
    }
    initDashboard();
  }, []);

  return (
    <div className="p-6 bg-black text-white rounded-2xl shadow-2xl border border-gray-800 backdrop-blur-lg">
      <h2 className="text-2xl font-bold mb-6 tracking-tight">GloireMedia <span className="text-blue-500">Dashboard</span></h2>
      
      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-800 rounded"></div>
          <div className="h-20 bg-gray-800 rounded"></div>
        </div>
      ) : (
        <>
          <p className="text-gray-400">Solde actuel :</p>
          <p className="text-4xl font-black mb-6">{balance.toLocaleString()} <span className="text-xl font-medium text-gray-500">GC</span></p>
          
          <div className="p-5 bg-gradient-to-r from-gray-900 to-black rounded-xl border border-gray-800">
            <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Valeur en FCFA</p>
            <p className="text-4xl font-mono font-bold text-green-400">{(balance * rate).toLocaleString()} <span className="text-lg">FCFA</span></p>
          </div>
        </>
      )}

      <button className="mt-8 w-full py-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20">
        Retirer vers Airtel Money
      </button>
    </div>
  );
}
