import axios from 'axios';

// Création d'une instance avec configuration persistante pour gagner en performance
const infobipClient = axios.create({
  baseURL: process.env.INFOBIP_URL || "https://jrwjyk.api.infobip.com",
  timeout: 5000, // Timeout de 5 secondes pour ne pas bloquer votre app
  headers: {
    'Authorization': `App ${process.env.INFOBIP_API_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

/**
 * Envoie un SMS via Infobip de manière synchrone.
 */
export async function sendSmsNotification(phoneNumber, message) {
  // 1. Validation rapide des entrées
  if (!process.env.INFOBIP_API_KEY) {
    throw new Error("Configuration SMS manquante : API Key absente.");
  }
  if (!phoneNumber || !message) {
    throw new Error("Paramètres invalides : numéro ou message manquant.");
  }

  try {
    // 2. Appel API avec l'instance optimisée
    const response = await infobipClient.post('/sms/2/text/advanced', {
      messages: [
        {
          destinations: [{ to: phoneNumber }],
          from: process.env.INFOBIP_SENDER || "GloireMedia",
          text: message,
        },
      ],
    });

    return response.data;
  } catch (error) {
    // 3. Gestion d'erreur détaillée pour le diagnostic
    const errorMessage = error.response?.data?.requestError?.serviceException?.text || error.message;
    console.error(`Erreur lors de l'envoi du SMS à ${phoneNumber}:`, errorMessage);
    
    // On propage l'erreur pour que l'appelant puisse décider de la suite
    throw new Error(`Échec envoi SMS: ${errorMessage}`);
  }
}
