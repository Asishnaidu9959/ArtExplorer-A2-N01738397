/* ITE5425 — Mastery Assignment 2: My Art Explorer
 * Academic-integrity declaration: I affirm that this submission complies with
 * Humber Academic Policy, and I have disclosed generative-AI assistance in ai-use.md.
 * I have not copied or distributed another student's implementation.
 * Name: Asish Anisetti  Student ID: N01738397  Date: 2026-11-18
 */
const ROOT = "https://collectionapi.metmuseum.org/public/collection";

export async function getArtwork(id) {
  const number = Number(id);
  if (!Number.isSafeInteger(number) || number <= 0) return null;
  try {
    const res = await fetch(`${ROOT}/v1/objects/${number}`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(9000),
    });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

export async function searchArtworkIDs(keyword, { titleOnly = false, limit = 6 } = {}) {
  const q = String(keyword || "").trim();
  if (q.length < 2) return [];
  const params = new URLSearchParams({ q, hasImages: "true" });
  if (titleOnly) params.set("title", "true");
  // v1 is the documented stable endpoint. The museum may intermittently fail;
  // the caller handles that error and can show a retry message.
  let result;
  let lastError;
  for (const version of ["v1", "v1.1"]) {
    try {
      const res = await fetch(`${ROOT}/${version}/search?${params}`, {
        next: { revalidate: 300 },
        signal: AbortSignal.timeout(12000),
      });
      if (!res.ok) throw new Error(`Museum search returned HTTP ${res.status}`);
      result = await res.json();
      break;
    } catch (error) {
      lastError = error;
    }
  }
  if (!result) throw lastError || new Error("Museum search unavailable");
  return Array.isArray(result.objectIDs) ? result.objectIDs.slice(0, Math.max(limit * 7, 28)) : [];
}

export async function searchArtworks(keyword, options = {}) {
  const limit = Math.min(Math.max(Number(options.limit) || 6, 1), 12);
  const ids = await searchArtworkIDs(keyword, { ...options, limit });
  const found = [];
  // Small concurrent batches reduce museum API throttling.
  for (let i = 0; i < ids.length && found.length < limit; i += 4) {
    const results = await Promise.all(ids.slice(i, i + 4).map(getArtwork));
    for (const artwork of results) {
      if (artwork && (artwork.primaryImageSmall || artwork.primaryImage)) {
        found.push(artwork);
        if (found.length === limit) break;
      }
    }
  }
  return found;
}
