/* ITE5425 — Mastery Assignment 2: My Art Explorer
 * Academic-integrity declaration: I affirm that this submission complies with
 * Humber Academic Policy, and I have disclosed generative-AI assistance in ai-use.md.
 * I have not copied or distributed another student's implementation.
 * Name: Asish Anisetti  Student ID: N01738397  Date: 2026-11-18
 */

import "./globals.css";
import MainNav from "@/components/MainNav";
import { AuthProvider } from "@/components/AuthContext";
import { FavoritesProvider } from "@/components/FavoritesProvider";

export const metadata = {
  title: "Art Explorer | Assignment 2",
  description: "ITE5425 guided enhancement"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <FavoritesProvider>
          <MainNav />
          <main className="container">
            {children}
          </main>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

