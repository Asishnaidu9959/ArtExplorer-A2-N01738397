/* ITE5425 — Mastery Assignment 2: My Art Explorer
 * Academic-integrity declaration: I affirm that this submission complies with
 * Humber Academic Policy, and I have disclosed generative-AI assistance in ai-use.md.
 * I have not copied or distributed another student's implementation.
 * Name: Asish Anisetti  Student ID: N01738397  Date: 2026-11-18
 */
import { currentUser } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET() {
  const user = await currentUser();
  if (!user) return Response.json({ message: "Login required" }, { status: 401 });
  const db = await getDb();
  const favorites = await db.collection("favorites").find({ userId: user.id }).sort({ createdAt: -1 }).toArray();
  return Response.json({ favorites: favorites.map(f => ({ id: String(f._id), artworkId: f.artworkId, note: f.note || "", createdAt: f.createdAt })) });
}

export async function POST(req) {
  const user = await currentUser();
  if (!user) return Response.json({ message: "Login required" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const artworkId = Number(body.artworkId);
  if (!Number.isSafeInteger(artworkId) || artworkId <= 0) return Response.json({ message: "Invalid artwork ID" }, { status: 400 });
  const db = await getDb();
  const result = await db.collection("favorites").updateOne({ userId: user.id, artworkId }, { $setOnInsert: { userId: user.id, artworkId, note: "", createdAt: new Date() } }, { upsert: true });
  return Response.json({ artworkId, created: result.upsertedCount === 1 }, { status: result.upsertedCount ? 201 : 200 });
}
