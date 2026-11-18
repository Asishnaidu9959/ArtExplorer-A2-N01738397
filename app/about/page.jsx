/* ITE5425 — Mastery Assignment 2: My Art Explorer
 * Academic-integrity declaration: I affirm that this submission complies with
 * Humber Academic Policy, and I have disclosed generative-AI assistance in ai-use.md.
 * I have not copied or distributed another student's implementation.
 * Name: Asish Anisetti  Student ID: N01738397  Date: 2026-11-18
 */
import {studentConfig} from '@/student-config';
export default function About(){return <section className="panel"><h1>About this collection</h1><p>{studentConfig.aboutLine}</p><p className="muted">Artwork metadata is provided by The Metropolitan Museum of Art Collection API.</p></section>}
