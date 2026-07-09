# La Forza — Member App Mockup

Interactive mobile app concept for **La Forza Gyms** ([@laforzagyms](https://www.instagram.com/laforzagyms/)), built as a client presentation prototype.

## Run the Demo

```bash
npm install
npm run dev
```

Open the URL shown in terminal (usually `http://localhost:5173`).

## Features Demonstrated

| Feature | Inspired By |
|---------|-------------|
| Membership dashboard (start/end dates) | [Anytime Fitness App](https://www.anytimefitness.com/apps/) |
| Freeze / unfreeze subscription | Anytime Fitness membership agreement |
| Two-tier plans (Essentials vs Elite + Sauna) | Planet Fitness Classic vs Black Card |
| Boxing & Personal Trainer add-ons | La Forza Instagram / gym services |
| Gym events (FIFA screenings, challenges) | La Forza community culture |
| Weekly workout planner (leg, back, push…) | Planet Fitness workout guides + AF personalized plans |
| Crowd meter & visit tracking | Anytime Fitness Busy Meter |
| Digital member card & profile | LA Fitness mobile check-in |

## App Screens

1. **Home** — Membership status, crowd meter, quick actions, upcoming events
2. **Plan** — Tier management, freeze, upgrade, add-ons, trainer assignment, billing
3. **Events** — Register for screenings, boxing nights, challenges, socials
4. **Workout** — Weekly split builder with drag-and-add workout sets
5. **Profile** — Member info, gym details, amenities, hours

## Brand Data (from @laforzagyms)

- Location: Sector F, Bahria Town, Lahore (near Winterland)
- Hours: Co-ed 6–10 AM & 3 PM–12 AM · Women-only 10 AM–3 PM
- Amenities: Premium equipment, capsule treadmills, sauna, boxing ring

## Tech Stack

React 19 · TypeScript · Vite · Tailwind CSS v3 · Lucide Icons

## Deploy to Vercel

This project is a static Vite SPA and deploys to Vercel with no extra setup.

### Option A — Vercel Dashboard (recommended)

1. Push the project to GitHub (create a repo and push `la-forza-app`).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects **Vite**. Confirm these settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Click **Deploy**. You get a live URL like `https://la-forza-app.vercel.app`.

### Option B — Vercel CLI (no GitHub needed)

```bash
cd la-forza-app
npx vercel
```

Follow the prompts (login, project name, confirm settings). Run `npx vercel --prod` for the production URL.

---

*This is a presentation mockup with simulated data — not connected to a live backend.*
