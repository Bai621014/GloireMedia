'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
// 🎯 HARMONISATION : Import depuis le dossier config
import supabase from '../../config/supabase' 

export default function LiveStreamPage() {
  const [isLiveActive, setIsLiveActive] = useState(false)

  useEffect(() => {
    // Agora SDK sera initialisé ici plus tard
    setIsLiveActive(false)
  }, [])

  return (
    <div className="p-4 bg-black text-white min-h-screen pb-24 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold tracking-wider text-yellow-400">🙏 GLOIRE-DIRECT</h1>
          <span className="bg-gray-900 border border-gray-800 text-[10px] text-gray-400 px-3 py-1 rounded-full">
            Agora Audio/Video SDK Enabled
          </span>
        </div>

        <div className="relative w-full aspect-video bg-gray-950 rounded-2xl overflow-hidden border border-gray-900 flex flex-col items-center justify-center p-6 text-center shadow-2xl">
          {isLiveActive ? (
            <div className="absolute top-3 left-3 bg-red-600 px-3 py-1 rounded-full text-[10px] font-bold animate-pulse uppercase tracking-widest">
              🔴 En Direct
            </div>
          ) : (
            <div>
              <span className="text-4xl block mb-3">✨</span>
              <h2 className="text-sm font-bold text-gray-200">Atmosphère de Prière & d'Édification</h2>
              <p className="text-xs text-gray-500 mt-2 max-w-xs mx-auto">
                Le flux en direct démarrera bientôt. Restez connecté !
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 bg-gray-950/50 p-4 rounded-xl border border-gray-900">
          <h3 className="text-xs font-bold text-yellow-500 flex items-center gap-2">
            🌟 Charte de GloireMedia
          </h3>
          <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">
            Pendant la diffusion, les interactions restent soumises à notre filtre de positivité.
          </p>
        </div>
      </div>

      <Link 
        href="/" 
        className="w-full bg-gray-900 hover:bg-gray-850 text-white border border-gray-800 font-bold text-xs py-3 rounded-xl text-center transition-transform active:scale-95 block"
      >
        ⬅ Retourner au Flux Principal
      </Link>
    </div>
  )
}
