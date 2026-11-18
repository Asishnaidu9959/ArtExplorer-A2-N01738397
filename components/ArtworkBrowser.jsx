/* ITE5425 — Mastery Assignment 2: My Art Explorer
 * Academic-integrity declaration: I affirm that this submission complies with
 * Humber Academic Policy, and I have disclosed generative-AI assistance in ai-use.md.
 * I have not copied or distributed another student's implementation.
 * Name: Asish Anisetti  Student ID: N01738397  Date: 2026-11-18
 */
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ArtworkList from "./ArtworkList";
import { studentConfig } from "@/student-config";

export default function ArtworkBrowser() {
  const params = useSearchParams();
  const initial = params.get("q") || studentConfig.initialSearch;
  const titleOnly = params.get("title") === "true";
  const [input, setInput] = useState(initial);
  const [query, setQuery] = useState(initial);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setInput(initial);
    setQuery(initial);
  }, [initial]);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError("");
      try {
        const qs = new URLSearchParams({ q: query });
        if (titleOnly) qs.set("title", "true");
        const response = await fetch(`/api/artworks/search?${qs}`, {
          signal: controller.signal,
          cache: "no-store",
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Museum search unavailable");
        setArtworks(data.artworks || []);
      } catch (err) {
        if (!controller.signal.aborted) {
          setArtworks([]);
          setError(err.message || "Could not load artwork. Try again.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    if (query.trim().length >= 2) load();
    else { setArtworks([]); setError("Enter at least 2 characters."); }
    return () => controller.abort();
  }, [query, titleOnly]);

  return <section className="panel">
    <form className="row" onSubmit={event => { event.preventDefault(); setQuery(input.trim()); }}>
      <input className="field" aria-label="Search artworks" value={input} onChange={event => setInput(event.target.value)} />
      <button className="button" type="submit">Search</button>
    </form>
    {loading && <p role="status">Finding artworks with available images...</p>}
    {error && <p role="alert" className="error">{error}</p>}
    {!loading && !error && <ArtworkList artworks={artworks} />}
  </section>;
}
