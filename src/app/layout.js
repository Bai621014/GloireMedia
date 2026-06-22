import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
