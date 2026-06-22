import '../app/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="no-scrollbar">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
