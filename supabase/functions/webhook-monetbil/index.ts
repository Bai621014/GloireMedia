import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Initialisation du client Supabase avec la clé de service
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

serve(async (req) => {
  try {
    const body = await req.json()

    // 1. Logique de validation : Vérification du statut 'success' de Monetbil
    if (body && body.status === 'success') {
      
      // 2. Mise à jour de la table 'retraits' dans Supabase
      const { error } = await supabase
        .from('retraits')
        .update({ 
          statut: 'paid', 
          updated_at: new Date().toISOString() 
        })
        .eq('id', body.transaction_id) // Assurez-vous que l'ID correspond
        
      if (error) {
        console.error("Erreur mise à jour BDD:", error)
        return new Response(JSON.stringify({ error: "Échec mise à jour base" }), { status: 500 })
      }

      return new Response(JSON.stringify({ message: "Transaction validée" }), { 
        status: 200,
        headers: { "Content-Type": "application/json" }
      })
    }

    return new Response(JSON.stringify({ message: "Statut non traité" }), { status: 200 })

  } catch (err) {
    console.error("Erreur serveur:", err)
    return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 })
  }
})
