/* ITE5425 — Mastery Assignment 2: My Art Explorer
 * Academic-integrity declaration: I affirm that this submission complies with
 * Humber Academic Policy, and I have disclosed generative-AI assistance in ai-use.md.
 * I have not copied or distributed another student's implementation.
 * Name: Asish Anisetti  Student ID: N01738397  Date: 2026-11-18
 */
"use client";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import { useFavorites } from "@/components/FavoritesProvider";
import FavoriteEntry from "@/components/FavoriteEntry";
export default function FavoritesPage() {
  const { user, loading } = useAuth();
  const { favorites, busy } = useFavorites();
  if (loading) return <p>Checking session...</p>;
  if (!user) return <section className="panel"><h1>My favourites</h1><p>Please <Link href="/login">log in</Link> to see your saved artworks.</p></section>;
  return <section className="panel"><h1>My favourites ({favorites.length})</h1><p className="muted">Saved artworks and personal notes are stored in MongoDB.</p>{busy && <p>Refreshing...</p>}{favorites.length ? <div className="grid">{favorites.map(f => <FavoriteEntry key={f.artworkId} favorite={f}/>)}</div> : !busy && <p>No favourites yet. <Link href="/artwork">Browse artworks</Link>.</p>}</section>;
}
