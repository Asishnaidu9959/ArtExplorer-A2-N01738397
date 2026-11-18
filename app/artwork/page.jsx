/* ITE5425 — Mastery Assignment 2: My Art Explorer
 * Academic-integrity declaration: I affirm that this submission complies with
 * Humber Academic Policy, and I have disclosed generative-AI assistance in ai-use.md.
 * I have not copied or distributed another student's implementation.
 * Name: Asish Anisetti  Student ID: N01738397  Date: 2026-11-18
 */
import {Suspense} from 'react';
import ArtworkBrowser from '@/components/ArtworkBrowser';
export default function Artworks(){return <><h1>Browse artworks</h1><p className="muted">The Met Museum collection search is public. Sign in to save favourites to your account.</p><Suspense fallback={<p>Loading search...</p>}><ArtworkBrowser/></Suspense></>}
