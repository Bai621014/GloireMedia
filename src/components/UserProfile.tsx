'use client'
import React, { useState, useMemo } from 'react';

// ... (Garde tes objets translations et exchangeRates ici, ils sont parfaits)

export default function UserProfile({ userLanguage = 'fr', initialBalance = 1250 }) {
  const [lang, setLang] = useState(userLanguage);
  const [currency, setCurrency] = useState('XAF');
  
  const t = useMemo(() => translations[lang] || translations.fr, [lang]);

  // Calcul sécurisé avec useMemo pour la performance
  const convertedBalance = useMemo(() => {
    const rate = exchangeRates[currency] || 1;
    return (initialBalance * rate).toLocaleString(undefined, { minimumFractionDigits: 2 });
  }, [initialBalance, currency]);

  const handleWithdrawRequest = () => {
    if (initialBalance < 5000) {
      alert(`⚠️ ${t.minPayout} (Minimum: 5000 GloireCoins)`);
    } else {
      alert("✅ Demande de retrait cryptée et envoyée aux modérateurs pour validation.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 font-sans selection:bg-amber-500 selection:text-black">
      {/* Profil Header */}
      <div className="flex flex-col items-center my-6 space-y-3">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 p-1 shadow-xl">
          <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-3xl font-bold text-amber-500">
            N
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold tracking-wide">Frère Norman</h2>
          <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            ✨ {t.status}
          </span>
        </div>
      </div>

      {/* Carte Portefeuille */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 border border-gray-800 shadow-2xl relative overflow-hidden mb-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{t.balance}</p>
        <div className="flex items-baseline space-x-2">
          <span className="text-4xl font-black text-white">{initialBalance.toLocaleString()}</span>
          <span className="text-lg font-bold text-amber-500">GC</span>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-800/50 flex justify-between items-center">
          <p className="text-sm text-gray-300 font-bold">{convertedBalance} <span className="text-xs text-gray-500">{currency}</span></p>
          <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-black/40 border border-gray-700 rounded-lg px-2 py-1 text-[10px] text-gray-400 outline-none"
          >
            {Object.keys(exchangeRates).map(curr => <option key={curr} value={curr}>{curr}</option>)}
          </select>
        </div>

        <button
          onClick={handleWithdrawRequest}
          className="w-full mt-6 bg-amber-500 hover:bg-amber-400 text-black font-black py-3.5 rounded-xl transition-all active:scale-[0.98]"
        >
          {t.withdraw}
        </button>
      </div>

      {/* Reste du menu (Paramètres, etc...) inchangé car excellent */}
      {/* ... */}
      
      <div className="mt-8 text-center text-[10px] text-gray-600 italic px-6">
        "L'Éternel est mon berger : je ne manquerai de rien." - Psaume 23:1
      </div>
    </div>
  );
}
