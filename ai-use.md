# Generative AI assistance disclosure — ITE5425 Assignment 2

**Student:** Asish Anisetti  
**Student ID:** N01738397  
**Tool used:** OpenAI ChatGPT

## What I asked
I requested guided help with setting up MongoDB Atlas, debugging Next.js and Met Museum API errors, implementing the shared favourites count, reviewing the project against the assignment guide, and preparing a cleaned submission ZIP.

## Suggestions incorporated
The project includes AI-assisted troubleshooting and code changes involving the museum artwork search, a server-side artwork search route, favourites context/count, note-length validation, UI theme styling, and submission documentation. The supplied instructor code blocks were also used as the basis for backend features.

## Suggestions modified or rejected
A client-side approach that fetched many Met Museum objects caused artwork loading errors; the revised approach uses a Next.js server route with smaller batches and error handling. Unrelated images are not substituted for missing museum images.

## What I learned
AuthContext shares safe user information after a cookie-backed login; FavoritesContext refreshes MongoDB-backed favourites after mutations. The UI state is not the database, and the server must enforce authorization even when links are hidden in the Navbar.

## Code I can explain
`components/FavoritesProvider.jsx`: it fetches the current user's favourites, exposes the list and count, and refreshes the list after adding, removing or editing an item. The UI then rerenders without passing the count through intermediate components.

**Before submitting:** Review this disclosure and revise it to accurately describe your own use, understanding, and any further changes.
