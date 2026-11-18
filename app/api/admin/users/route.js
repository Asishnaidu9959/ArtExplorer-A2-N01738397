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

  if (!user)
    return Response.json(
      { message: "Login required" },
      { status: 401 }
    );

  if (user.role !== "admin")
    return Response.json(
      { message: "Forbidden" },
      { status: 403 }
    );

  const db = await getDb();

  const users = await db
    .collection("users")
    .find({}, { projection: { passwordHash: 0 } })
    .limit(50)
    .toArray();

  return Response.json({
    users: users.map((u) => ({
      id: String(u._id),
      email: u.email,
      displayName: u.displayName,
      status: u.status,
      role: u.role
    }))
  });
}
