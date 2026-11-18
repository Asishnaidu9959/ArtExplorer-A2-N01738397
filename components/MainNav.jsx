/* ITE5425 — Mastery Assignment 2: My Art Explorer
 * Academic-integrity declaration: I affirm that this submission complies with
 * Humber Academic Policy, and I have disclosed generative-AI assistance in ai-use.md.
 * I have not copied or distributed another student's implementation.
 * Name: Asish Anisetti  Student ID: N01738397  Date: 2026-11-18
 */

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { useFavorites } from "@/components/FavoritesProvider";

export default function MainNav() {
  const { user, loading, logout } = useAuth();
  const { count } = useFavorites();
  const router = useRouter();

  async function handleLogout() {
    try {
      await logout();
      router.replace("/");
      router.refresh();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <nav className="nav">
      <Link className="brand" href="/">
        Art Explorer
      </Link>

      <Link href="/artwork">Artworks</Link>
      <Link href="/search">Advanced Search</Link>
      <Link href="/about">About</Link>
      <Link href="/favorites">My Favourites ({user ? count : 0})</Link>
      <Link href="/profile">Profile</Link>

      {loading ? (
        <span>Checking session...</span>
      ) : user ? (
        <>
          <span>Hello, {user.displayName}</span>

          {user.role === "admin" && (
            <Link href="/admin">Admin</Link>
          )}

          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </nav>
  );
}
