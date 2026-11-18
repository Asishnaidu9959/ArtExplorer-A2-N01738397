/* ITE5425 — Mastery Assignment 2: My Art Explorer
 * Academic-integrity declaration: I affirm that this submission complies with
 * Humber Academic Policy, and I have disclosed generative-AI assistance in ai-use.md.
 * I have not copied or distributed another student's implementation.
 * Name: Asish Anisetti  Student ID: N01738397  Date: 2026-11-18
 */

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) throw new Error("Set MONGODB_URI in .env.local");

const globalCache = globalThis;

if (!globalCache._a2MongoClientPromise) {
  globalCache._a2MongoClientPromise = new MongoClient(uri).connect();
}

export async function getDb() {
  const client = await globalCache._a2MongoClientPromise;
  return client.db(process.env.MONGODB_DB || "art_explorer_demo");
}
