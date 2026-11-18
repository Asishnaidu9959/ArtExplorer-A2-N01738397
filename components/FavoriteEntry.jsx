/* ITE5425 — Mastery Assignment 2: My Art Explorer
 * Academic-integrity declaration: I affirm that this submission complies with
 * Humber Academic Policy, and I have disclosed generative-AI assistance in ai-use.md.
 * I have not copied or distributed another student's implementation.
 * Name: Asish Anisetti  Student ID: N01738397  Date: 2026-11-18
 */
"use client";
import { useState } from "react";
import Link from "next/link";
import { useFavorites } from "@/components/FavoritesProvider";
export default function FavoriteEntry({ favorite }) {
  const { saveNote, removeFavorite } = useFavorites();
  const [note, setNote] = useState(favorite.note || "");
  const [working, setWorking] = useState(false);
  const [message, setMessage] = useState("");
  async function act(fn, success) {
    setWorking(true); setMessage("");
    try { await fn(); setMessage(success); } catch (e) { setMessage(e.message); } finally { setWorking(false); }
  }
  return <article className="card"><h3>Artwork #{favorite.artworkId}</h3><Link href={`/artwork/${favorite.artworkId}`}>View artwork</Link><label htmlFor={`note-${favorite.artworkId}`}>Personal note</label><textarea id={`note-${favorite.artworkId}`} className="field" maxLength={250} value={note} onChange={e => setNote(e.target.value)} /><div className="row"><button className="button" disabled={working} onClick={() => act(() => saveNote(favorite.artworkId, note), "Note saved")}>Save note</button><button className="button secondary" disabled={working} onClick={() => act(() => removeFavorite(favorite.artworkId), "Removed")}>Remove</button></div>{message && <p aria-live="polite">{message}</p>}</article>;
}
