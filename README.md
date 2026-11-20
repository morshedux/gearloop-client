# GearLoop

**GearLoop** is an equipment rental marketplace. Owners list equipment, admins approve it, and customers book it for the dates they need and pay securely with Stripe.

- **Live site:** https://gearloop-client.vercel.app
- **Server repository:** https://github.com/morshedux/gearloop-server
- **Live API:** https://gearloop-server-chi.vercel.app

## Purpose
Connect equipment owners with customers through a transparent, secure rental marketplace with role-based dashboards (Customer, Owner, Admin).

## Key features
- Email/password and Google sign-in (Better Auth, MongoDB adapter) with JWT access tokens
- Role-based access control for Customer, Owner and Admin
- Home page with animated banner, featured equipment, categories, reviews and more (Framer Motion)
- All Equipment page with server-side search, filters, sorting and pagination
- Equipment details (private route), favorites, booking modal with live total calculation
- Stripe Checkout payments; booking and payment records created after successful payment
- Customer dashboard: My Rentals, Favorites, Profile
- Owner dashboard: Add/Update/Delete equipment, equipment rentals, analytics charts
- Admin dashboard: users and roles, equipment approval, all rentals, analytics charts
- Dark/light theme toggle saved in local storage, loading and error pages, fully responsive

## Tech stack
Next.js (App Router), Tailwind CSS, DaisyUI, Better Auth, MongoDB, Framer Motion, Recharts, Stripe

## npm packages
`next`, `react`, `react-dom`, `tailwindcss`, `daisyui`, `better-auth`, `mongodb`, `jsonwebtoken`, `framer-motion`, `recharts`, `react-hot-toast`, `sweetalert2`, `react-icons`

## Getting started
```bash
npm install
cp .env.example .env.local   # fill in your own values
npm run seed:users           # demo admin/owner/customer accounts
npm run dev
```

## Environment variables
See `.env.example`. Real keys live only in `.env.local` / Vercel project settings and are never committed.
