// monetbil.js
const SERVICE_KEY = import.meta.env.VITE_MONETBIL_SERVICE_KEY;
const PUBLIC_KEY = import.meta.env.VITE_MONETBIL_PUBLIC_KEY;

export const effectuerRetrait = async (amount, phone) => {
  try {
    const response = await fetch('https://api.monetbil.com/v1/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SERVICE_KEY}`
      },
      body: JSON.stringify({
        amount: amount,
        phone: phone,
        currency: 'XAF',
        public_key: PUBLIC_KEY,
        // Ajoutez ici les détails requis par la documentation Monetbil
      })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur API Monetbil:", error);
    throw error;
  }
};
