// app/layout.js
import './../style.css'; // Assurez-vous que le chemin vers votre CSS est correct

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-gray-950 text-white min-h-screen">
        {children}
        {/* Navigation globale */}
        <nav className="fixed bottom-0 w-full bg-gray-900 border-t border-gray-800 p-4 flex justify-around z-50">
          <a href="/" className="text-xs text-gray-400">Maison</a>
          <a href="/explore" className="text-xs text-gray-400">Découvrir</a>
          <a href="/messages" className="text-xs text-gray-400">Messages</a>
          <a href="/profile" className="text-xs text-amber-500 font-bold">Moi</a>
        </nav>
      </body>
    </html>
  );
          }
