'use client'
import React, { useState } from 'react'; 
import VideoFeed from './VideoFeed';      
import UserProfile from './UserProfile';
import OTPVerification from './OTPVerification';

export default function MainNavigation() {
  const [currentTab, setCurrentTab] = useState('play');
  
  // Utilise une constante pour le numéro pour éviter les rendus inutiles
  const userPhone = '+23560000000'; 
  const [isVerified, setIsVerified] = useState(false);

  // Optimisation : On utilise un objet de configuration au lieu d'un switch 
  // si la logique devient plus complexe, mais ton switch est très bien ici.
  const renderContent = () => {
    switch (currentTab) {
      case 'play':
        return <VideoFeed />;
      case 'search':
        return (
          <div className="h-full w-full flex items-center justify-center text-gray-500">
            <p>Barre de recherche et découvertes à venir...</p>
          </div>
        );
      case 'create':
        return (
          <div className="h-full w-full flex flex-col items-center justify-center text-gray-400 space-y-4">
            <p className="text-xl">📸 Caméra GloireMedia</p>
            <p className="text-xs text-gray-500 text-center px-6">Préparez vos vidéos et photos pour édifier la communauté</p>
          </div>
        );
      case 'profile':
        return !isVerified ? (
          <div className="h-full w-full flex items-center justify-center p-4">
            <OTPVerification 
              numeroTelephone={userPhone} 
              onVerificationSuccess={() => setIsVerified(true)} 
            />
          </div>
        ) : (
          <UserProfile userLanguage="fr" initialBalance={2500} />
        );
      default:
        return <VideoFeed />;
    }
  };

  return (
    <div className="h-screen w-full relative bg-black overflow-hidden flex flex-col">
      {/* Contenu principal : h-full avec flex pour bien occuper l'espace */}
      <div className="flex-1 w-full overflow-hidden">
        {renderContent()}
      </div>

      {/* Barre de navigation inférieure */}
      <nav className="h-16 w-full bg-black/95 backdrop-blur-md border-t border-gray-800 flex justify-around items-center text-white z-50">
        
        <NavButton active={currentTab === 'play'} onClick={() => setCurrentTab('play')} icon="▶️" label="Play" />
        <NavButton active={currentTab === 'search'} onClick={() => setCurrentTab('search')} icon="🔍" label="Découvrir" />
        
        <button 
          onClick={() => setCurrentTab('create')} 
          className="bg-gradient-to-r from-amber-500 to-yellow-500 p-3 rounded-full -mt-8 border-4 border-black shadow-xl active:scale-90 transition-transform"
        >
          <span className="text-2xl block">📸</span>
        </button>

        <NavButton active={currentTab === 'profile'} onClick={() => setCurrentTab('profile')} icon="👤" label="Profil" />
      </nav>
    </div>
  );
}

// Petit composant utilitaire pour alléger ton JSX principal
function NavButton({ active, onClick, icon, label }) {
  return (
    <button 
      onClick={onClick} 
      className={`flex flex-col items-center transition-colors ${active ? 'text-amber-500' : 'text-gray-400'}`}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-[10px] font-semibold mt-0.5">{label}</span>
    </button>
  );
}
