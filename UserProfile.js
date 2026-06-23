'use client'
import React, { useState, useMemo } from 'react';
import { translations } from './translations';
import { exchangeRates } from './exchangeRates';
import GloirePayButton from './GloirePayButton';
import TransactionHistory from './TransactionHistory';

// Prochaine étape : Remplacer ceci par un appel fetch vers Supabase
const mockTransactions = [
  { id: 'tx1', type: 'withdraw', amountGC: 5000, description: 'Retrait Airtel +235 62...', date: '23/06/2026', status: 'pending' },
  { id: 'tx2', type: 'deposit', amountGC: 1500, description: 'Commission fidélité', date: '21/06/2026', status: 'validated' },
];

export default function UserProfile({ userLanguage = 'fr', initialBalance = 1250 }) {
  const [lang, setLang] = useState(userLanguage);
  const [currency, setCurrency] = useState('XAF');
  
  const t = useMemo(() => translations[lang] || translations.fr, [lang]);

  const convertedBalance = useMemo(() => {
    const rate = exchangeRates[currency] || 1;
    return (initialBalance * rate).toLocaleString(undefined, { minimumFractionDigits: 2 });
  }, [initialBalance, currency]);

  const handleWithdrawRequest = async () => {
    if (initialBalance < 5000) {
      alert(`⚠️ ${t.minPayout} : 5000 GC`);
    } else {
      // Intégration Supabase/Web3 à venir ici
      console.log("Transmission blockchain GloirePay...");
      alert("✅ Retrait instantané traité et synchronisé ! 💰");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 font-sans selection:bg-amber-500 selection:text-black">
      {/* Header Profil */}
      <div className="flex flex-col items-center my-6 space-y-3">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 p-1 shadow-2xl">
          <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-3xl font-bold text-amber-500">N</div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold">Frère Norman</h2>
          <span className="text-[10px] bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-500/20">{t.status}</span>
        </div>
      </div>

      {/* Wallet Card */}
      <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800 shadow-2xl mb-6">
        <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">{t.balance}</p>
        <div className="flex items-baseline space-x-2 my-2">
          <span className="text-4xl font-black">{initialBalance.toLocaleString()}</span>
          <span className="text-amber-500 font-bold">GC</span>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-800">
          <span className="text-sm font-bold text-gray-300">{convertedBalance} {currency}</span>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="bg-black border border-gray-700 rounded-lg p-1 text-[10px]">
            {Object.keys(exchangeRates).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="mt-6 flex gap-3">
          <button onClick={handleWithdrawRequest} className="flex-1 bg-amber-500 text-black font-black py-3.5 rounded-xl active:scale-95 transition-all">{t.withdraw}</button>
        </div>
      </div>

      {/* Transaction History Module */}
      <TransactionHistory transactions={mockTransactions} currency={currency} />
      
      <p className="text-center text-[10px] text-gray-600 mt-8 italic">"L'Éternel est mon berger." - Psaume 23:1</p>
    </div>
  );
  }
