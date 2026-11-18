/* ITE5425 — Mastery Assignment 2: My Art Explorer
 * Academic-integrity declaration: I affirm that this submission complies with
 * Humber Academic Policy, and I have disclosed generative-AI assistance in ai-use.md.
 * I have not copied or distributed another student's implementation.
 * Name: Asish Anisetti  Student ID: N01738397  Date: 2026-11-18
 */
import Link from 'next/link';
import FavoriteButton from '@/components/FavoriteButton';
import {getArtwork} from '@/lib/metApi';
import {notFound} from 'next/navigation';
export default async function ArtworkDetailPage({params}){const {id}=await params;const artwork=await getArtwork(id);if(!artwork)notFound();return <section className="panel"><Link href="/artwork">← Back to artworks</Link><h1>{artwork.title||'Untitled'}</h1><p className="muted">{artwork.artistDisplayName||'Unknown artist'} · {artwork.objectDate||'Unknown date'}</p>{(artwork.primaryImageSmall||artwork.primaryImage)&&<img className="detailImage" src={artwork.primaryImageSmall||artwork.primaryImage} alt={artwork.title||'Artwork'}/>}<p>{artwork.medium}</p><FavoriteButton artworkId={artwork.objectID}/></section>}
