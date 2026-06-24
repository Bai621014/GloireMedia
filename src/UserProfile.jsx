import { useState } from 'react';

export default function UserProfile() {
  const [balance] = useState(500); // Valeur de test fixe

  return (
    <div style={{ 
      backgroundColor: '#0f172a', 
      color: 'white', 
      padding: '40px', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <h1>GloireMedia Dashboard</h1>
      <div style={{ background: '#1e293b', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
        <p>Solde actuel :</p>
        <h2 style={{ fontSize: '3em', color: '#4ade80' }}>{balance} GC</h2>
      </div>
    </div>
  );
}
