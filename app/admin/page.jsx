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
export default function AdminPage() {
  const { user, loading } = useAuth();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (loading || user?.role !== "admin") return;
    let active = true;
    fetch("/api/admin/users", { cache: "no-store" }).then(async res => { const data = await res.json(); if (!res.ok) throw new Error(data.message || "Access denied"); return data; }).then(data => { if (active) setUsers(data.users || []); }).catch(e => { if (active) setMessage(e.message); });
    return () => { active = false; };
  }, [user, loading]);
  if (loading) return <p>Checking session...</p>;
  if (!user) return <p>Please <Link href="/login">log in</Link>.</p>;
  if (user.role !== "admin") return <section className="panel"><h1>Access denied</h1><p>Admin role required.</p></section>;
  return <section className="panel"><h1>Admin dashboard</h1><p>Read-only account overview (authorized by the backend).</p>{message && <p role="alert" className="error">{message}</p>}<table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th></tr></thead><tbody>{users.map(u => <tr key={u.id}><td>{u.displayName}</td><td>{u.email}</td><td>{u.role}</td><td>{u.status}</td></tr>)}</tbody></table></section>;
}
