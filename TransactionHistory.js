import React from 'react';
import { exchangeRates } from './exchangeRates';

export default function TransactionHistory({ transactions, currency = 'XAF' }) {
  const rate = exchangeRates[currency] || 1;

  // Icônes Web3 pour les types de transactions
  const getTypeIcon = (type) => {
    switch (type) {
      case 'deposit': return '💎'; // Dépôt
      case 'withdraw': return '🚀'; // Retrait
      default: return '✨';
    }
  };

  return (
    <div className="mt-8 bg-gray-900 rounded-3xl p-6 border border-gray-800 shadow-2xl">
      <h3 className="text-xl font-bold tracking-wide text-white mb-6">
        Historique GloireMedia
      </h3>

      <div className="space-y-4">
        {transactions.map((tx) => {
          const convertedAmount = (tx.amountGC * rate).toLocaleString(undefined, { minimumFractionDigits: 2 });
          const isWithdraw = tx.type === 'withdraw';
          
          return (
            <div key={tx.id} className="flex justify-between items-center p-4 bg-gray-800/50 rounded-xl border border-gray-800">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getTypeIcon(tx.type)}</span>
                <div>
                  <p className="text-sm font-bold text-gray-100">
                    {tx.description}
                  </p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                    {tx.date}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className={`font-black ${isWithdraw ? 'text-amber-500' : 'text-emerald-400'}`}>
                  {isWithdraw ? '-' : '+'}{convertedAmount} <span className="text-[10px] text-gray-500">{currency}</span>
                </p>
                <p className={`text-[10px] px-2 py-0.5 rounded-full inline-block ${tx.status === 'validated' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-gray-700 text-gray-400'}`}>
                  {tx.status === 'validated' ? '✅ Validé' : '⌛ En attente'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
    }
