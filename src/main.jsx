import React from 'react';
import ReactDOM from 'react-dom/client';
import UserProfile from './UserProfile'; // Chemin corrigé : le "./" signifie "dans le dossier actuel"
import './style.css';

// Rendu de l'application dans la div avec l'id "root" qui se trouve dans index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProfile initialBalance={1250} />
  </React.StrictMode>
);
