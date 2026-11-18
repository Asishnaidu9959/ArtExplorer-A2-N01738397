/* ITE5425 — Mastery Assignment 2: My Art Explorer
 * Academic-integrity declaration: I affirm that this submission complies with
 * Humber Academic Policy, and I have disclosed generative-AI assistance in ai-use.md.
 * I have not copied or distributed another student's implementation.
 * Name: Asish Anisetti  Student ID: N01738397  Date: 2026-11-18
 */
import Link from 'next/link';
import {studentConfig} from '@/student-config';
export default function Home(){return <section className="hero"><p className="eyebrow">ITE5425 · Assignment 2</p><h1>{studentConfig.collectionName}</h1><p>Explore artwork from The Metropolitan Museum of Art. Sign in to build your own collection.</p><Link className="button" href="/artwork">Explore artworks</Link><p className="muted">Chosen search theme: {studentConfig.initialSearch}</p></section>}
