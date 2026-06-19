# Imotive Learn Dashboard

A modern, responsive learning dashboard built with Next.js App Router, Tailwind CSS v4, Framer Motion, and Supabase.

## Architecture & Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS for utility-first styling with a custom dark theme and glowing gradients.
- **Animations**: Framer Motion for performant, physics-based UI animations.
- **Database**: Supabase (PostgreSQL) integrated with `@supabase/ssr` for secure server-side fetching.
- **Icons**: Lucide React.

## Architectural Choices & Component Split

The application strictly follows the React Server Components (RSC) paradigm to ensure maximum performance and SEO capabilities:

1. **Server Components (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`)**
   - By default, pages are server-rendered.
   - The main `page.tsx` is an async Server Component that securely fetches data directly from Supabase without exposing API keys to the client. It handles database connections and passes down the serialized `Course` payload as props.
   - `loading.tsx` uses Next.js Suspense to automatically display a pulsing skeleton placeholder matching the exact bento grid layout before the server data resolves.
   - `error.tsx` catches exceptions during Server Component rendering or data fetching and displays a graceful fallback UI.

2. **Client Components (`DashboardClient.tsx`, `CourseCard.tsx`, `Sidebar.tsx`)**
   - Components requiring interactivity (`useState`, `useEffect`) or animations (`framer-motion`) are marked with `"use client"`.
   - `DashboardClient` handles the staggered entrance animations and responsive bento grid mapping.
   - `Sidebar` implements a togglable state using purely CSS media queries to ensure responsive UI breakpoints render instantly on the server without hydration flashing.

## Responsive Design

- **Mobile (<768px)**: The sidebar transforms into a fixed bottom navigation bar to maximize vertical screen real estate. The bento grid stacks vertically (`grid-cols-1`).
- **Tablet (768px - 1024px)**: The sidebar collapses into an icon-only side navigation bar. The bento grid shifts to a 2-column layout (`md:grid-cols-2`).
- **Desktop (>1024px)**: Full expanded sidebar is visible alongside a rich 4-column bento grid layout (`lg:grid-cols-4`).

## Challenges Faced & Solutions

1. **Animation Layout Shifts**: Implementing border glows and card elevations often causes sibling elements to shift. **Solution**: Used CSS `box-shadow` for glows and `transform: translateY` for elevation, avoiding margin/border changes entirely.
2. **Responsive Navigation State Hydration Flashes**: Initially, toggling a sidebar in a server-rendered layout caused flashes because it relied on `window.innerWidth`. **Solution**: Extracted the sidebar responsive logic into pure CSS media queries (e.g. `hidden md:flex`, `w-20 lg:w-64`) that render flawlessly on SSR while still allowing manual toggle state overrides via React.
3. **Complex Bento Grid Alignment**: Getting the bento grid to align perfectly across three distinct device widths required intricate span definitions. **Solution**: Configured the grid with `auto-rows` and used `col-span-1 md:col-span-2 lg:col-span-2` exclusively on hero tiles to ensure they wrap gracefully.

## Getting Started

1. Copy `.env.example` to `.env.local` and add your Supabase credentials.
2. Run the SQL migration located in `supabase/migrations/20260619000000_create_courses.sql` in your Supabase SQL Editor.
3. Install dependencies: `npm install`
4. Start the dev server: `npm run dev`

## Vercel Deployment

This project is fully ready for zero-config Vercel deployment:
1. Push the code to a GitHub repository.
2. Import the project in your Vercel dashboard.
3. Add the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as Environment Variables in the Vercel project settings.
4. Deploy! Next.js will automatically optimize the server chunks and edge functions.
