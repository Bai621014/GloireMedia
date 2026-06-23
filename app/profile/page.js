'use client'
import React from 'react';
import UserProfile from '../../components/UserProfile';

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-950 pb-20">
      {/* Le composant UserProfile est maintenant correctement lié.
        Assurez-vous que le fichier est bien situé dans components/UserProfile.js
      */}
      <UserProfile initialBalance={1250} />
      
      {/* Barre de navigation fixée en bas */}
      <nav className="fixed bottom-0 w-full bg-gray-900 border-t border-gray-800 p-4 flex justify-around text-white z-50">
        <a href="/" className="text-xs">Maison</a>
        <a href="/explore" className="text-xs">Découvrir</a>
        <a href="/messages" className="text-xs">Messages</a>
        <a href="/profile" className="text-xs text-amber-500 font-bold border-b border-amber-500">Moi</a>
      </nav>
    </main>
  );
}
