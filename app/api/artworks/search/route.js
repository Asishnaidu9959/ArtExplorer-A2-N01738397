/* ITE5425 — Mastery Assignment 2: My Art Explorer
 * Academic-integrity declaration: I affirm that this submission complies with
 * Humber Academic Policy, and I have disclosed generative-AI assistance in ai-use.md.
 * I have not copied or distributed another student's implementation.
 * Name: Asish Anisetti  Student ID: N01738397  Date: 2026-11-18
 */
import { searchArtworks } from "@/lib/metApi";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim();
  if (q.length < 2 || q.length > 100) {
    return Response.json({ message: "Enter a search of 2–100 characters." }, { status: 400 });
  }
  try {
    const artworks = await searchArtworks(q, {
      titleOnly: searchParams.get("title") === "true",
      limit: 6,
    });
    return Response.json({ artworks });
  } catch (error) {
    console.error("Met artwork search failed:", error);
    return Response.json({ message: "Museum search is temporarily unavailable. Please retry." }, { status: 503 });
  }
}
