# Commonly — Services & Projects Marketplace

A polished React + Vite frontend concept for a global marketplace combining two workflows:

- **Services:** freelancers package ready-to-buy services.
- **Projects:** clients post a brief, budget and receive proposals.

## Included

- Responsive desktop/mobile UI
- Home / landing page
- Find Services
- Find Work / Projects
- Categories
- Service detail
- Project detail
- Professional profile
- Login / Signup demo flows
- Professional dashboard
- Mock marketplace data
- Responsive navigation
- GitHub Pages deployment workflow

## Run locally

Requirements: Node.js 18+ (20 recommended).

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Production build

```bash
npm run build
npm run preview
```

## GitHub Pages

1. Create a new GitHub repository.
2. Upload the project files to the repository root.
3. Use the `main` branch.
4. Go to **Settings → Pages**.
5. Under **Build and deployment**, select **GitHub Actions**.
6. Push the files. The included workflow builds the Vite app and deploys `dist` automatically.

The Vite config uses a relative base (`./`) so the static build works correctly when served from a GitHub Pages project URL.

## Notes

This is a frontend marketplace prototype. Authentication, payments, messaging persistence, proposals, database storage and real user accounts are intentionally represented with mock/demo interactions. A production backend can be connected later without replacing the overall UI architecture.

## Brand

The temporary working brand is **Commonly**. It can be renamed later by updating the visible brand text and document title.
