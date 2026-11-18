/* ITE5425 — Mastery Assignment 2: My Art Explorer
 * Academic-integrity declaration: I affirm that this submission complies with
 * Humber Academic Policy, and I have disclosed generative-AI assistance in ai-use.md.
 * I have not copied or distributed another student's implementation.
 * Name: Asish Anisetti  Student ID: N01738397  Date: 2026-11-18
 */

import { NextResponse } from "next/server";
import { sessionCookie, cookieOptions } from "@/lib/auth";

export async function POST() {
  const res = NextResponse.json({
    message: "Logged out"
  });

  res.cookies.set(sessionCookie, "", {
    ...cookieOptions,
    maxAge: 0
  });

  return res;
}
