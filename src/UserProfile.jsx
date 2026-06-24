export default function UserProfile() {
  return (
    <div style={{ 
      backgroundColor: '#1e293b', 
      color: '#ffffff', 
      padding: '40px', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontSize: '24px' 
    }}>
      <h1>GloireMedia Dashboard</h1>
      <p style={{ color: '#4ade80' }}>Si vous voyez ce texte, le dashboard est actif !</p>
    </div>
  );
}
