/* ITE5425 — Mastery Assignment 2: My Art Explorer
 * Academic-integrity declaration: I affirm that this submission complies with
 * Humber Academic Policy, and I have disclosed generative-AI assistance in ai-use.md.
 * I have not copied or distributed another student's implementation.
 * Name: Asish Anisetti  Student ID: N01738397  Date: 2026-11-18
 */
import { currentUser } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
export const runtime = "nodejs";

async function identify(params) {
  const { id } = await params;
  const artworkId = Number(id);
  return Number.isSafeInteger(artworkId) && artworkId > 0 ? artworkId : null;
}
export async function PATCH(req, { params }) {
  const user = await currentUser();
  if (!user) return Response.json({ message: "Login required" }, { status: 401 });
  const artworkId = await identify(params);
  if (!artworkId) return Response.json({ message: "Invalid artwork ID" }, { status: 400 });
  const { note } = await req.json().catch(() => ({}));
  if (typeof note !== "string" || note.length > 250) return Response.json({ message: "Note must be at most 250 characters" }, { status: 400 });
  const db = await getDb();
  const result = await db.collection("favorites").updateOne({ userId: user.id, artworkId }, { $set: { note: note.trim(), updatedAt: new Date() } });
  if (!result.matchedCount) return Response.json({ message: "Favorite not found" }, { status: 404 });
  return Response.json({ artworkId, note: note.trim() });
}
export async function DELETE(_req, { params }) {
  const user = await currentUser();
  if (!user) return Response.json({ message: "Login required" }, { status: 401 });
  const artworkId = await identify(params);
  if (!artworkId) return Response.json({ message: "Invalid artwork ID" }, { status: 400 });
  const db = await getDb();
  const result = await db.collection("favorites").deleteOne({ userId: user.id, artworkId });
  if (!result.deletedCount) return Response.json({ message: "Favorite not found" }, { status: 404 });
  return Response.json({ deleted: true });
}
