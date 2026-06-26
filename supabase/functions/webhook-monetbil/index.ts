import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import * as crypto from "https://deno.land/std@0.168.0/crypto/mod.ts";

const MONETBIL_SECRET = Deno.env.get('MONETBIL_SECRET_KEY')!; // À mettre dans Supabase > Secrets

// Vérif HMAC SHA256 Monetbil
async function verifySignature(payload: string, signature: string): Promise<boolean> {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(MONETBIL_SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  const expected = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
  return expected === signature;
}

serve(async (req) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

  const rawBody = await req.text(); // CRITIQUE: text() avant json()
  const signature = req.headers.get('x-monetbil-signature');

  if (!signature || !(await verifySignature(rawBody, signature))) {
    console.error("Signature invalide");
    return new Response("Unauthorized", { status: 401 });
  }

  const body = JSON.parse(rawBody);
  console.log("Webhook:", body.transaction_id, body.status);

  if (body.status === 'success') {
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    
    // IDEMPOTENCE: ne update que si statut = pending
    const { data, error } = await supabase
      .from('retraits')
      .update({ 
        statut: 'paid', 
        paid_at: new Date().toISOString(),
        monetbil_response: body 
      })
      .eq('id', body.transaction_id)
      .eq('statut', 'pending') // ← EMPÊCHE DOUBLE PAIEMENT
      .select()
      .single();
    
    if (error || !data) {
      console.error("Retrait introuvable ou déjà payé:", error);
      return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    }

    console.log(`Retrait ${data.id} payé: ${data.montant_fcfa} FCFA`);
  }

  // Réponds 200 en <3s sinon Monetbil re-spam
  return new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Content-Type": "application/json" } });
})
