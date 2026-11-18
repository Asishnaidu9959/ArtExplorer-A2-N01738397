# My Art Explorer — Mastery Assignment 2

**Asish Anisetti | N01738397 | ITE5425**

A Next.js App Router project extending the instructor's public Art Explorer starter with MongoDB Atlas-backed login, favourites, personal notes, theme preference and an administrator-only directory.

## Setup

1. Install Node.js and run `npm install`.
2. Copy `.env.example` to `.env.local`; set your own `MONGODB_URI`, `MONGODB_DB` and a fresh random `JWT_SECRET` (32+ characters).
3. In MongoDB Atlas, permit the development machine's IP address and create a database user.
4. Run `node scripts/seed-users.mjs` to create disposable demo accounts, then `npm run dev`.
5. Visit `http://localhost:3000` and `http://localhost:3000/api/health`.
6. Run `npm run build` before deployment.

## Main features

- Public Home, About, Advanced Search, Artworks, artwork detail pages.
- Museum API searches are made through `/api/artworks/search`, filtering results to artwork records with an image URL. The museum may return fewer results or experience outages; remote images are not guaranteed to load.
- HttpOnly JWT cookie, bcrypt password verification, login/logout, shared AuthContext and session restoration.
- User-specific favourites in MongoDB, shared count and buttons via FavoritesProvider, note editing (maximum 250 characters).
- Saved light/dark theme and administrator-only account directory; server API verifies the role.

## Deployment and evidence

- Push the cleaned source to a Git repository. Never upload `.env.local`, `node_modules` or `.next`.
- Import the repository in Vercel; configure the same three environment variables for the deployment.
- Check Atlas network access, `/api/health`, login, favourites, notes, preferences and role restrictions on the deployed URL.
- Submit the public deployment URL, GitHub URL, 5–7-minute narrated demo, Postman and Atlas screenshots with explanations, and `ai-use.md`.
- The application is not automatically deployed or tested against your private Atlas credentials by this ZIP.

## Security

The classroom demonstration accounts are not appropriate for a public production login. Rotate the previously exposed Atlas password and JWT secret before deployment. A real production authentication system requires additional session and CSRF protections.

See `SUBMISSION_README.md`, `STUDENT_TEST_CHECKLIST.md`, `REFLECTIONS.md`, and `DEMO_SCRIPT.md`.
