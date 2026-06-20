'use client'
import { useState, useEffect } from 'react'
import supabase from '../../../lib/supabase' // Chemin d'importation corrigé à 3 niveaux

export default function Market() {
  const [ads, setAds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAds() {
      // Chargement des annonces et publicités actives de la communauté
      const { data, error } = await supabase
        .from('marketplace_ads')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
      
      if (!error && data) {
        setAds(data)
      }
      setLoading(false)
    }
    loadAds()
  }, [])

  return (
    <div className="p-4 bg-black text-white min-h-screen pb-24 max-w-md mx-auto">
      {/* En-tête de la boutique */}
      <h1 className="text-2xl font-bold text-yellow-400 mb-1">🛍️ Espace Publicitaire & Ventes</h1>
      <p className="text-xs text-gray-400 mb-6">Utilisez vos commissions accumulées comme carburant pour booster vos affaires ou acquérir des offres.</p>

      {/* Affichage des annonces en grille responsive mobile */}
      {loading ? (
        <div className="text-center text-gray-500 text-sm py-10">Mise à jour de la boutique...</div>
      ) : ads.length === 0 ? (
        <div className="text-center text-gray-500 text-sm py-10 px-4">
          Aucune publicité ou produit disponible actuellement. Revenez très bientôt !
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {ads.map((ad) => (
            <div key={ad.id} className="bg-gray-950 rounded-xl overflow-hidden p-3 border border-gray-900 flex flex-col justify-between">
              <div>
                <img 
                  src={ad.image_url || '/placeholder.png'} 
                  alt={ad.title} 
                  className="w-full aspect-square object-cover rounded-lg bg-gray-900"
                />
                <h3 className="font-bold mt-2 text-sm text-gray-200 truncate">{ad.title}</h3>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{ad.description}</p>
              </div>
              
              <div className="mt-3">
                <span className="text-xs text-green-400 font-bold block mb-2">
                  💰 {ad.price_tokens} Commissions V10
                </span>
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-xs py-2 rounded-lg transition-colors scale-activate">
                  Voir l'offre
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
        }
