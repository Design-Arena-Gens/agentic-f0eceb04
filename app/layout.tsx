import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Annuaire RGE ? Trouvez un professionnel certifi?",
  description: "Annuaire des entreprises RGE bas? sur les donn?es ADEME",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <header className="bg-gradient-to-r from-primary-900 to-primary-700">
          <div className="container-max py-6">
            <div className="flex items-center justify-between">
              <a href="/" className="text-white font-semibold text-lg">Annuaire RGE</a>
              <nav className="text-white/80 text-sm space-x-6">
                <a className="hover:text-white" href="/">Recherche</a>
                <a className="hover:text-white" href="https://data.ademe.fr/datasets/liste-des-entreprises-rge-2" target="_blank" rel="noreferrer">Source ADEME</a>
              </nav>
            </div>
          </div>
        </header>
        <main className="container-max py-8">{children}</main>
        <footer className="border-t border-white/10 mt-10">
          <div className="container-max py-6 text-sm text-white/70">
            Donn?es ? ADEME ? Ce site n'est pas affili? ? l'?tat. D?ploy? sur Vercel.
          </div>
        </footer>
      </body>
    </html>
  );
}
