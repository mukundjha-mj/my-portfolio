# Portfolio

A personal portfolio built with **Next.js 16 (App Router)**, **Tailwind CSS v4**,
**TypeScript**, **Prisma + Postgres**, and **Auth.js (NextAuth v5)**.

Pages: Home, About, Projects, Blog (MDX), and a Guestbook with GitHub/Google sign-in.

## Make it yours

All content lives in **one file** — edit [`content/profile.ts`](content/profile.ts):
name, tagline, socials, skills, experience, education, and projects.

- Replace the photo at [`public/me.svg`](public/me.svg) with your own image
  (any name works — update `profile.photo` to match).
- Add blog posts as `.mdx` files in [`content/blog/`](content/blog) with
  `title`, `date`, and `summary` frontmatter.
- Tech-chip icons are mapped in [`lib/skill-icons.tsx`](lib/skill-icons.tsx).

## Getting started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000). The whole site runs without
any configuration — only the Guestbook needs the setup below.

## Guestbook setup (database + auth)

1. Copy the env template and fill it in:

   ```bash
   cp .env.example .env
   ```

2. **Database** — create a free Postgres database
   ([Neon](https://neon.tech) or [Supabase](https://supabase.com)) and paste its
   connection string into `DATABASE_URL`.

3. **Auth secret**:

   ```bash
   bunx auth secret        # writes AUTH_SECRET
   ```

4. **GitHub OAuth** — https://github.com/settings/developers → *New OAuth App*
   - Homepage URL: `http://localhost:3000`
   - Callback URL: `http://localhost:3000/api/auth/callback/github`
   - Put the client ID/secret in `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET`.

5. **Google OAuth** — https://console.cloud.google.com/apis/credentials →
   *Create OAuth client ID* → Web application
   - Redirect URI: `http://localhost:3000/api/auth/callback/google`
   - Put the client ID/secret in `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET`.

6. Create the tables and generate the client:

   ```bash
   bunx prisma migrate dev --name init
   bunx prisma generate
   ```

7. Restart `bun dev`, open `/guestbook`, sign in, and post.

> In production, update the OAuth callback URLs to your deployed domain and set
> `AUTH_URL` (Vercel infers it automatically).

## Scripts

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `bun dev`        | Start the dev server               |
| `bun run build`  | Production build                   |
| `bun start`      | Serve the production build         |
| `bun run lint`   | Lint                               |

## Deploy

Deploy on [Vercel](https://vercel.com/new). Add the same environment variables
in the project settings, and run the Prisma migration against your production
database (`bunx prisma migrate deploy`).
