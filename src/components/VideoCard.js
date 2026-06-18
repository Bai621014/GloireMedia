'use client'
import { useRef, useState, useEffect } from 'react'
import CommentSection from './CommentSection'

export default function VideoCard({ video, user }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showComments, setShowComments] = useState(false)

  // Lecture ou pause automatique au clic sur la vidéo
  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  // Déclencher l'incrémentation de la vue au démarrage de la vidéo
  const handlePlayStarted = async () => {
    setIsPlaying(true)
    try {
      // Appel à ta procédure Supabase RPC configurée plus tôt
      await supabase.rpc('increment_views', { target_video_id: video.id })
    } catch (err) {
      console.error("Erreur de vue:", err.message)
    }
  }

  return (
    <div className="relative w-full h-full max-w-md mx-auto bg-black flex flex-col justify-center items-center">
      {/* Élément vidéo (Optimisé pour l'affichage vertical plein écran) */}
      <video
        ref={videoRef}
        onClick={handleVideoClick}
        onPlay={handlePlayStarted}
        onPause={() => setIsPlaying(false)}
        src={video.video_url}
        className="w-full h-[calc(100vh-130px)] object-cover rounded-xl"
        loop
        playsInline
      />

      {/* Informations de la vidéo affichées en bas à gauche */}
      <div className="absolute bottom-6 left-4 z-10 text-white right-16">
        <p className="font-bold text-sm text-yellow-400">@{video.profiles?.username || 'Créateur'}</p>
        <p className="text-xs mt-1 drop-shadow-md">{video.title}</p>
        <div className="flex items-center space-x-1 mt-2 text-[10px] text-gray-300 bg-black/40 px-2 py-1 rounded-full w-max">
          <span>👁️</span> <span>{video.views || 0} vues</span>
        </div>
      </div>

      {/* Actions à droite (Commentaires) */}
      <div className="absolute bottom-10 right-4 z-10 flex flex-col items-center space-y-6">
        <button 
          onClick={() => setShowComments(!showComments)}
          className="bg-gray-900/80 p-3 rounded-full border border-gray-800 text-xl active:scale-90 transition-transform"
        >
          💬
        </button>
      </div>

      {/* Tiroir coulissant des commentaires positifs */}
      {showComments && (
        <div className="absolute bottom-0 left-0 right-0 z-20 animate-slide-up">
          <div className="flex justify-end pr-4 bg-gray-950 pt-2">
            <button 
              onClick={() => setShowComments(false)}
              className="text-gray-400 text-xs font-bold bg-gray-900 px-3 py-1 rounded-full"
            >
              Fermer ✖
            </button>
          </div>
          <CommentSection videoId={video.id} user={user} />
        </div>
      )}
    </div>
  )
          }
