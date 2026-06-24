import React from 'react';
import ReactDOM from 'react-dom/client';
import UserProfile from './UserProfile';
import './style.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      {/* On laisse UserProfile aller chercher ses données seul dans Supabase */}
      <UserProfile />
    </React.StrictMode>
  );
} else {
  console.error("Erreur critique : L'élément avec l'ID 'root' est introuvable dans le HTML.");
}
