import { useState } from 'react';

export default function UserProfile() {
  const [balance] = useState(500);
  const rate = 100;
  const targetNumber = "62 10 14 68";

  const handleWithdraw = () => {
    alert(`Demande de retrait de ${(balance * rate).toLocaleString()} FCFA envoyée au ${targetNumber} via Airtel Money.`);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', color: 'white', padding: '40px 20px', minHeight: '100vh', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: '30px' }}>GloireMedia Dashboard</h1>
      
      <div style={{ background: '#1e293b', padding: '20px', borderRadius: '20px', marginBottom: '20px' }}>
        <p style={{ color: '#94a3b8' }}>Solde actuel :</p>
        <h2 style={{ fontSize: '2.5em', color: '#4ade80' }}>{balance} GC</h2>
      </div>

      <div style={{ background: '#1e293b', padding: '20px', borderRadius: '20px', marginBottom: '30px' }}>
        <p style={{ color: '#94a3b8' }}>Valeur en FCFA :</p>
        <h2 style={{ fontSize: '2em', color: '#ffffff' }}>{(balance * rate).toLocaleString()} FCFA</h2>
      </div>

      <button 
        onClick={handleWithdraw}
        style={{ 
          padding: '15px 30px', 
          backgroundColor: '#e11d48', 
          color: 'white', 
          border: 'none', 
          borderRadius: '10px', 
          fontSize: '18px', 
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Retirer au {targetNumber}
      </button>
    </div>
  );
}
