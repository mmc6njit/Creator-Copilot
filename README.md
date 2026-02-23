# Creator Copilot

Creator Copilot is a React + Vite app with Supabase authentication and project management.

## Project Structure

- `frontend/` — React application (routes, UI, auth, features)
- `backend/` — backend assets (Supabase SQL schema/policies)

## Prerequisites

- Node.js 18+
- npm 9+
- Supabase project (for auth + database)

## 1) Frontend Setup

From repo root:

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=YOUR_SUPABASE_ANON_KEY
```

You can also use `VITE_SUPABASE_ANON_KEY` instead of `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY`.

## 2) Backend (Supabase) Setup

Open your Supabase SQL Editor and run:

- `backend/supabase/projects.sql`

This creates the `projects` table with indexes and RLS policies.

## 3) Run the App

```bash
cd frontend
npm run dev
```

Vite will print the local URL (usually `http://localhost:5173`).

## Useful Commands

```bash
cd frontend
npm run lint
npm run build
npm run preview
```

## Troubleshooting

- If auth/project calls fail, verify Supabase env values in `frontend/.env`.
- If a port is already in use, Vite automatically chooses another port.
- If dependencies are missing, run `cd frontend && npm install` again.
