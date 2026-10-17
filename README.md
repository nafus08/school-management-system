# School Management System

A full-stack school administration dashboard for managing school data across administrator, teacher, student, and parent roles.

## Live demo

[Open the Vercel deployment](https://school-management-system-ht4xxhwfd.vercel.app/).

## Tech stack

- Next.js 14 and React 18
- TypeScript
- Tailwind CSS
- Supabase PostgreSQL with `pg`
- JWT-based sessions with `jose`
- React Hook Form and Zod
- Recharts and React Big Calendar

## Features

- Role-oriented dashboards for administrators, teachers, students, and parents
- Management pages for students, teachers, parents, classes, subjects, lessons, exams, assignments, results, events, and announcements
- Attendance, calendar, announcements, and chart components
- Form validation with React Hook Form and Zod
- PostgreSQL data access and cookie-based session handling

## Run locally

### Requirements

- Node.js 18 or later
- A Supabase project with PostgreSQL enabled

### Setup

```bash
git clone https://github.com/nafus08/school-management-system.git
cd school-management-system
npm ci
```

In the Supabase SQL Editor, run `supabase/schema.sql` first and then `supabase/seed.sql` to create and populate the demo tables.

Create a `.env.local` file with the Supabase PostgreSQL connection string and a private session secret:

```dotenv
DATABASE_URL=postgresql://postgres.[project-ref]:[password]@[host]:6543/postgres?sslmode=require
JWT_SECRET=replace-with-a-long-random-secret
```

Use the transaction pooler connection string shown in **Supabase → Connect**. The app prefers `DATABASE_URL` and falls back to `POSTGRES_URL`, which may be provided by a Vercel integration. Add `DATABASE_URL` and `JWT_SECRET` to the Vercel environments you deploy (Production and Preview), then redeploy. Never commit database credentials or use a placeholder JWT secret in a public deployment.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
