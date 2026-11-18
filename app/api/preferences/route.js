/* ITE5425 — Mastery Assignment 2: My Art Explorer
 * Academic-integrity declaration: I affirm that this submission complies with
 * Humber Academic Policy, and I have disclosed generative-AI assistance in ai-use.md.
 * I have not copied or distributed another student's implementation.
 * Name: Asish Anisetti  Student ID: N01738397  Date: 2026-11-18
 */
import { currentUser } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
export const runtime = "nodejs";
export async function GET() {
  const user = await currentUser();
  if (!user) return Response.json({ message: "Login required" }, { status: 401 });
  return Response.json({ preferences: user.preferences });
}
export async function PATCH(req) {
  const user = await currentUser();
  if (!user) return Response.json({ message: "Login required" }, { status: 401 });
  const { theme } = await req.json().catch(() => ({}));
  if (!["light", "dark"].includes(theme)) return Response.json({ message: "Theme must be light or dark" }, { status: 400 });
  const db = await getDb();
  await db.collection("users").updateOne({ _id: new ObjectId(user.id), status: "active" }, { $set: { "preferences.theme": theme } });
  return Response.json({ preferences: { ...user.preferences, theme } });
}
