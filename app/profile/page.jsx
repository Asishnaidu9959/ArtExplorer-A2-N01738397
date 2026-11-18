/* ITE5425 — Mastery Assignment 2: My Art Explorer
 * Academic-integrity declaration: I affirm that this submission complies with
 * Humber Academic Policy, and I have disclosed generative-AI assistance in ai-use.md.
 * I have not copied or distributed another student's implementation.
 * Name: Asish Anisetti  Student ID: N01738397  Date: 2026-11-18
 */
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthContext";
export default function ProfilePage() {
  const { user, loading, refreshUser } = useAuth();
  const [theme, setTheme] = useState("light");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(() => { if (user) setTheme(user.preferences?.theme || "light"); }, [user]);
  if (loading) return <p>Checking session...</p>;
  if (!user) return <p>Please <Link href="/login">log in</Link> to view your profile.</p>;
  async function save(e) {
    e.preventDefault(); setSaving(true); setMessage("");
    try {
      const res = await fetch("/api/preferences", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ theme }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Could not save preference");
      await refreshUser(); setMessage("Preference saved to MongoDB");
    } catch (e) { setMessage(e.message); } finally { setSaving(false); }
  }
  return <section className="panel narrow"><h1>My profile</h1><p><strong>Name:</strong> {user.displayName}</p><p><strong>Email:</strong> {user.email}</p><p><strong>Role:</strong> {user.role}</p><form onSubmit={save}><label htmlFor="theme">Theme preference</label><select className="field" id="theme" value={theme} onChange={e => setTheme(e.target.value)}><option value="light">Light</option><option value="dark">Dark</option></select><button className="button" disabled={saving}>{saving ? "Saving..." : "Save preference"}</button></form><p aria-live="polite">{message}</p></section>;
}
