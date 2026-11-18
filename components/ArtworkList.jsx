/* ITE5425 — Mastery Assignment 2: My Art Explorer
 * Academic-integrity declaration: I affirm that this submission complies with
 * Humber Academic Policy, and I have disclosed generative-AI assistance in ai-use.md.
 * I have not copied or distributed another student's implementation.
 * Name: Asish Anisetti  Student ID: N01738397  Date: 2026-11-18
 */
import ArtworkCard from './ArtworkCard';
export default function ArtworkList({artworks}){if(artworks.length===0)return <p className="muted">No artworks found. Try another search.</p>;return <div className="grid">{artworks.map(a=><ArtworkCard key={a.objectID} artwork={a}/>)}</div>}
