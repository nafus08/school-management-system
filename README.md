# School Management System

A full-stack school administration dashboard for managing school data across administrator, teacher, student, and parent roles.

## Live demo

[Open the Vercel deployment](https://school-management-system-ht4xxhwfd.vercel.app/). The deployment is active, but Vercel access protection currently requires authorization to view it.

## Tech stack

- Next.js 14 and React 18
- TypeScript
- Tailwind CSS
- MySQL with `mysql2`
- JWT-based sessions with `jose`
- React Hook Form and Zod
- Recharts and React Big Calendar

## Features

- Role-oriented dashboards for administrators, teachers, students, and parents
- Management pages for students, teachers, parents, classes, subjects, lessons, exams, assignments, results, events, and announcements
- Attendance, calendar, announcements, and chart components
- Form validation with React Hook Form and Zod
- MySQL data access and cookie-based session handling

## Run locally

### Requirements

- Node.js 18 or later
- MySQL

### Setup

```bash
git clone https://github.com/nafus08/school-management-system.git
cd school-management-system
npm ci
```

Create a local `.env` file with the database settings used by `src/lib/db.ts`:

```dotenv
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your-local-password
DB_NAME=school
DB_CONN_LIMIT=1
JWT_SECRET=replace-with-a-long-random-secret
```

Create and seed the database, then start the development server:

```bash
mysql -u root -p -e "CREATE DATABASE school;"
mysql -u root -p school < schema.sql
mysql -u root -p school < seed.sql
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Do not use the example database credentials or a placeholder JWT secret in a public deployment.
