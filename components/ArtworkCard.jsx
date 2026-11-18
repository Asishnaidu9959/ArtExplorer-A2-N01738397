/* ITE5425 — Mastery Assignment 2: My Art Explorer
 * Academic-integrity declaration: I affirm that this submission complies with
 * Humber Academic Policy, and I have disclosed generative-AI assistance in ai-use.md.
 * I have not copied or distributed another student's implementation.
 * Name: Asish Anisetti  Student ID: N01738397  Date: 2026-11-18
 */
import Link from 'next/link';
import FavoriteButton from './FavoriteButton';
export default function ArtworkCard({ artwork }) {
  return <article className="card">
    {(artwork.primaryImageSmall || artwork.primaryImage) ? <img className="artImage" src={artwork.primaryImageSmall || artwork.primaryImage} alt={artwork.title || 'Artwork'} /> : <div className="noImage">No image</div>}
    <h3>{artwork.title || 'Untitled'}</h3>
    <p className="muted">{artwork.artistDisplayName || 'Unknown artist'}</p>
    <Link href={`/artwork/${artwork.objectID}`}>View details</Link>
    <FavoriteButton artworkId={artwork.objectID} />
  </article>;
}
