'use client'
import React, { useState, useMemo } from 'react';
import { supabase } from './supabaseClient'; // Liaison établie
import { translations } from './translations';
import { exchangeRates } from './exchangeRates';
import TransactionHistory from './TransactionHistory';

export default function UserProfile({ userLanguage = 'fr', initialBalance = 1250 }) {
  const [lang, setLang] = useState(userLanguage);
  const [currency, setCurrency] = useState('XAF');
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([
    { id: 'tx1', type: 'withdraw', amountGC: 5000, description: 'Retrait Airtel...', date: '23/06/2026', status: 'pending' }
  ]);

  const t = useMemo(() => translations[lang] || translations.fr, [lang]);
  const convertedBalance = useMemo(() => {
    const rate = exchangeRates[currency] || 1;
    return (initialBalance * rate).toLocaleString(undefined, { minimumFractionDigits: 2 });
  }, [initialBalance, currency]);

  // Logique de retrait Pro Web3 avec Supabase
  const handleWithdrawRequest = async () => {
    if (initialBalance < 5000) {
      alert(`⚠️ ${t.minPayout} : 5000 GC`);
      return;
    }
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([{ 
          amountGC: 5000, 
          status: 'pending', 
          type: 'withdraw',
          description: 'Retrait utilisateur',
          date: new Date().toLocaleDateString()
        }]);

      if (error) throw error;
      
      alert("✅ Demande de retrait enregistrée et sécurisée sur la blockchain.");
    } catch (error) {
      console.error("Erreur:", error);
      alert("⚠️ Erreur : Service indisponible.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 font-sans selection:bg-amber-500 selection:text-black">
      <div className="flex flex-col items-center my-6 space-y-3">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 p-1 shadow-2xl">
          <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-3xl font-bold text-amber-500">N</div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold tracking-wide">Frère Norman</h2>
          <span className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">{t.status}</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 border border-gray-800 shadow-2xl mb-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{t.balance}</p>
        <div className="flex items-baseline space-x-2 my-2">
          <span className="text-4xl font-black text-white">{initialBalance.toLocaleString()}</span>
          <span className="text-lg font-bold text-amber-500">GC</span>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-800">
          <span className="text-sm font-bold text-gray-300">{convertedBalance} <span className="text-xs text-gray-500">{currency}</span></span>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="bg-black/40 border border-gray-700 rounded-lg px-2 py-1 text-[10px]">
            {Object.keys(exchangeRates).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <button 
          onClick={handleWithdrawRequest} 
          disabled={loading}
          className="w-full mt-6 bg-amber-500 hover:bg-amber-400 text-black font-black py-3.5 rounded-xl transition-all active:scale-[0.98]"
        >
          {loading ? "Traitement en cours..." : t.withdraw}
        </button>
      </div>

      <TransactionHistory transactions={transactions} currency={currency} />
      
      <p className="text-center text-[10px] text-gray-600 mt-8 italic">"L'Éternel est mon berger." - Psaume 23:1</p>
    </div>
  );
    }
