# Submission checklist — Asish Anisetti, N01738397

## Included in this ZIP
- Complete source for the Next.js app, MongoDB-backed APIs and React Context providers
- `.env.example` with placeholders (no real credentials)
- `ai-use.md`, academic-integrity comments, `REFLECTIONS.md`, `DEMO_SCRIPT.md`
- `STUDENT_TEST_CHECKLIST.md` and setup documentation

## Must still be provided by the student
- GitHub repository URL (repository must actually contain the source)
- Public Vercel deployment URL with working Atlas configuration
- Real 5–7-minute narrated demonstration video
- Genuine Postman screenshots of login/cookie, student 403 vs admin 200, favourites POST and GET/DELETE, plus a redacted Atlas screenshot and short captions
- Confirmation of a successful `npm run build` and final live testing

## Environment
1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in private values
3. `node scripts/seed-users.mjs` (first setup)
4. `npm run dev` or `npm run build` followed by `npm start`

**Security:** Rotate exposed development credentials before deploying. Do not commit `.env.local`.

**Verification note:** The source has been reviewed and patched, but a full production build and live Atlas/API testing could not be completed in this isolated environment. Test the final package on your Windows machine.
