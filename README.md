# ServerBeacon

ServerBeacon is a curated Minecraft Server Directory built with Next.js (App Router), Tailwind CSS, and Supabase. It is designed to be highly SEO and GEO-optimised.

## Local Development Setup

### Prerequisites

Ensure you have Node.js and npm installed. The Vercel and Supabase CLIs are installed as local dependencies.

### 1. Install Dependencies

```bash
npm install
```

### 2. Vercel & Supabase CLI Setup

The CLIs are installed locally in this project (`package.json`), meaning they are scoped directly to this directory and version-controlled. Use `npx` to execute them.

**Link Vercel:**
1. Run `npx vercel login` and follow the authentication steps in your browser.
2. Run `npx vercel link` to connect this local directory to your existing Vercel project (where Upstash Redis and Supabase integrations are configured).
3. Run `npx vercel env pull .env.local` to securely pull your environment variables down to your machine.

**Link Supabase:**
1. Run `npx supabase login` and generate/provide your access token.
2. Run `npx supabase link --project-ref your-project-ref` (replace `your-project-ref` with your Supabase project ID).
3. Ensure the database schema is applied. You can run the schema found in `database/schema.sql` via the Supabase dashboard's SQL Editor, or use the Supabase CLI if you have migrations set up.

### 3. Start the Development Server

Run the development server natively on Windows:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture

- **`app/`**: Next.js App Router containing static and dynamic SEO pages (`/category`, `/location`, `/server`).
- **`components/`**: Reusable React components styled with strict Tailwind rules (flat colours, hard borders).
- **`database/`**: Contains the SQL schema for Supabase (`servers` and `submissions` tables).
