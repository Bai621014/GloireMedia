import React from 'react';
import ReactDOM from 'react-dom/client';
import UserProfile from './UserProfile';
// Note: nous importerons le CSS ici une fois créé
import './style.css'; 

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <UserProfile initialBalance={1250} />
    </React.StrictMode>
  );
} else {
  console.error("L'élément root est introuvable !");
}
