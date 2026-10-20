# School Management System

A full-stack school administration dashboard for managing school data across administrator, teacher, student, and parent roles.

## Live demo

[Open the Vercel deployment](https://school-management-system-ht4xxhwfd.vercel.app/).

## Tech stack

- Next.js 14 and React 18
- TypeScript
- Tailwind CSS
- Prisma Client with PostgreSQL (currently hosted on Supabase)
- JWT-based sessions with `jose`
- React Hook Form and Zod
- Recharts and React Big Calendar

## Features

- Role-oriented dashboards for administrators, teachers, students, and parents
- Management pages for students, teachers, parents, classes, subjects, lessons, exams, assignments, results, events, and announcements
- Attendance, calendar, announcements, and chart components
- Form validation with React Hook Form and Zod
- PostgreSQL data access through Prisma Client and cookie-based session handling

The shared query adapter uses Prisma's parameterized raw-query APIs to preserve existing dashboard behavior, and `prisma/schema.prisma` describes the database models.

## Run locally

### Requirements

- Node.js 18 or later
- A PostgreSQL database; Supabase PostgreSQL is supported

### Setup

```bash
git clone https://github.com/nafus08/school-management-system.git
cd school-management-system
npm ci
```

In the Supabase SQL Editor, run `supabase/schema.sql` first and then `supabase/seed.sql` to create and populate the demo tables. The SQL schema remains the source for database setup so its gender and weekday checks are preserved. Prisma Client is generated during install.

For an existing database, first run `supabase/migrations/20261020_add_password_hashes.sql` to add the password-hash columns. To set a password for a seeded account, run this command from an interactive terminal; it prompts for a password and confirmation without echoing the input:

```bash
npm run user:set-password -- --role admin --username admin1
```

The role must be `admin`, `teacher`, `student`, or `parent`, and passwords must be 12–72 UTF-8 bytes. Repeat for each account that should be able to sign in. No default or shared demo password is created.

Create a `.env.local` file with PostgreSQL connection strings and a private session secret:

```dotenv
DATABASE_URL=postgresql://postgres.[project-ref]:[password]@[pooler-host]:6543/postgres
JWT_SECRET=replace-with-a-long-random-secret
```

Use the Supabase transaction pooler URL for `DATABASE_URL`. The app also accepts `POSTGRES_URL` as a runtime fallback for `DATABASE_URL`. Runtime database TLS is verified using the Supabase CA certificate at `supabase/prod-ca-2021.crt`. Add `DATABASE_URL` and `JWT_SECRET` to the Vercel environments you deploy (Production and Preview), then redeploy. Apply the password-hash migration and set passwords against the same database used by the deployment. Never commit database credentials or use a placeholder JWT secret in a public deployment.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
