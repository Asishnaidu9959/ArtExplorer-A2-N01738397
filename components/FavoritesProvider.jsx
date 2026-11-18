/* ITE5425 — Mastery Assignment 2: My Art Explorer
 * Academic-integrity declaration: I affirm that this submission complies with
 * Humber Academic Policy, and I have disclosed generative-AI assistance in ai-use.md.
 * I have not copied or distributed another student's implementation.
 * Name: Asish Anisetti  Student ID: N01738397  Date: 2026-11-18
 */
"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "@/components/AuthContext";
const FavoritesContext = createContext(null);
export function FavoritesProvider({ children }) {
  const { user, loading } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [busy, setBusy] = useState(false);
  const refreshFavorites = useCallback(async () => {
    if (!user) { setFavorites([]); return; }
    setBusy(true);
    try {
      const response = await fetch("/api/favorites", { cache: "no-store" });
      if (!response.ok) throw new Error("Could not load favourites");
      setFavorites((await response.json()).favorites || []);
    } finally { setBusy(false); }
  }, [user]);
  useEffect(() => { if (!loading) refreshFavorites().catch(() => setFavorites([])); }, [loading, refreshFavorites]);
  async function mutate(url, method, body) {
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || "Request failed");
    await refreshFavorites();
    return data;
  }
  return <FavoritesContext.Provider value={{ favorites, count: favorites.length, busy, refreshFavorites, addFavorite: id => mutate("/api/favorites", "POST", { artworkId: id }), removeFavorite: id => mutate(`/api/favorites/${id}`, "DELETE"), saveNote: (id, note) => mutate(`/api/favorites/${id}`, "PATCH", { note }) }}>{children}</FavoritesContext.Provider>;
}
export function useFavorites() {
  const value = useContext(FavoritesContext);
  if (!value) throw new Error("useFavorites requires FavoritesProvider");
  return value;
}
