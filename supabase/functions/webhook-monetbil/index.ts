import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

serve(async (req) => {
  const body = await req.json()
  
  // Vérification de sécurité : Le paiement est-il validé par Monetbil ?
  if (body.status === 'success') {
    
    // 1. Mise à jour de la table retraits
    const { error } = await supabase
      .from('retraits')
      .update({ statut: 'paid', updated_at: new Date() })
      .eq('id', body.transaction_id)
      
    if (error) return new Response("Erreur DB", { status: 500 })

    return new Response(JSON.stringify({ status: "ok" }), { status: 200 })
  }

  return new Response("Webhook reçu", { status: 200 })
})
