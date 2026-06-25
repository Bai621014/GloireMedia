const SERVICE_KEY = import.meta.env.VITE_MONETBIL_SERVICE_KEY;
const SECRET_KEY = import.meta.env.VITE_MONETBIL_SECRET;

export const effectuerRetrait = async (amount, phone) => {
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
      secret: SECRET_KEY
    })
  });
  return await response.json();
};
