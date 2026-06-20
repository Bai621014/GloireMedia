import { calculateLocalBalance } from '../../../services/walletService';
import { sendSmsNotification } from '../../../services/infobip';

export default async function handler(req, res) {
  // 1. Restriction stricte de la méthode HTTP
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée. Utilisez POST.' });
  }

  const { userId, phoneNumber, coinsToWithdraw, userCurrency } = req.body;

  // 2. Sécurité : Vérification que les données essentielles sont bien présentes et valides
  if (!userId || !phoneNumber || !coinsToWithdraw) {
    return res.status(400).json({ error: 'Données manquantes (userId, phoneNumber ou montant requis).' });
  }

  if (isNaN(coinsToWithdraw) || coinsToWithdraw <= 0) {
    return res.status(400).json({ error: 'Le montant de GloireCoins à retirer doit être supérieur à 0.' });
  }

  try {
    // Simulation du solde actuel de l'utilisateur (À lier avec Supabase ou votre BDD par la suite)
    const currentCoins = 1000; 

    // 3. Contrôle du solde
    if (coinsToWithdraw > currentCoins) {
      return res.status(400).json({ error: 'Solde de GloireCoins insuffisant pour effectuer ce retrait.' });
    }

    // 4. Calcul automatique de la conversion (Sécurité : repli sur XAF par défaut)
    const targetCurrency = userCurrency || 'XAF';
    const conversion = calculateLocalBalance(coinsToWithdraw, targetCurrency);

    // [Ici viendra votre logique Supabase pour déduire les pièces du solde utilisateur]
    // exemple: await supabase.rpc('deduct_balance', { user_id: userId, amount: coinsToWithdraw })

    // 5. Formulation et Envoi du SMS de succès via Infobip
    const smsMessage = `GloireMedia : Votre retrait de ${coinsToWithdraw} GloireCoins a été validé. Un montant de ${conversion.formattedString} a été transféré sur votre compte Mobile Money. Merci d'inspirer la communauté !`;
    
    await sendSmsNotification(phoneNumber, smsMessage);

    // 6. Réponse positive au client
    return res.status(200).json({
      success: true,
      message: 'Retrait validé et converti avec succès',
      data: conversion
    });

  } catch (error) {
    console.error('Erreur interne lors du retrait:', error);
    return res.status(500).json({ error: 'Une erreur interne est survenue lors de la conversion.' });
  }
  }
