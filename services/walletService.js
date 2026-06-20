// Taux de base fixe : 1 GloireCoin = 125 FCFA
const BASE_RATE_FCFA = 125;

// Table des taux de conversion par devise locale
const EXCHANGE_RATES = {
  XAF: BASE_RATE_FCFA,       // Franc CFA (Afrique Centrale)
  XOF: BASE_RATE_FCFA,       // Franc CFA (Afrique de l'Ouest)
  CDF: BASE_RATE_FCFA * 4.5, // Franc Congolais (Exemple)
  USD: BASE_RATE_FCFA / 650, // Dollar US
};

/**
 * Calcule le solde converti d'un utilisateur selon sa devise
 * @param {number} coinBalance - Le montant en GloireCoins
 * @param {string} currency - La devise locale (ex: XAF, XOF)
 */
export function calculateLocalBalance(coinBalance, currency = 'XAF') {
  const rate = EXCHANGE_RATES[currency] || BASE_RATE_FCFA;
  const localAmount = coinBalance * rate;

  return {
    gloireCoins: coinBalance,
    amount: localAmount,
    currency: currency,
    formattedString: `${localAmount.toLocaleString('fr-FR', { minimumFractionDigits: 0 })} ${currency}`
  };
}
