/* ITE5425 — Mastery Assignment 2: My Art Explorer
 * Academic-integrity declaration: I affirm that this submission complies with
 * Humber Academic Policy, and I have disclosed generative-AI assistance in ai-use.md.
 * I have not copied or distributed another student's implementation.
 * Name: Asish Anisetti  Student ID: N01738397  Date: 2026-11-18
 */
"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/components/AuthContext";
import { useFavorites } from "@/components/FavoritesProvider";
export default function FavoriteButton({ artworkId }) {
  const { user, loading } = useAuth();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const saved = favorites.some(f => f.artworkId === Number(artworkId));
  if (loading) return null;
  if (!user) return <Link href="/login">Sign in to save</Link>;
  async function toggle() {
    setSaving(true); setError("");
    try { if (saved) await removeFavorite(artworkId); else await addFavorite(artworkId); }
    catch (e) { setError(e.message); }
    finally { setSaving(false); }
  }
  return <div><button type="button" className="button secondary" disabled={saving} onClick={toggle}>{saving ? "Saving..." : saved ? "♥ Remove favourite" : "♡ Add to favourites"}</button>{error && <p role="alert" className="error">{error}</p>}</div>;
}
