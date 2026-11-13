# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Codex, etc.) when working with code in this repository.

## Project

ODOW ("One Day One Workout") — a Next.js 14 PWA (Pages Router, JavaScript/JSX) serving one workout per calendar date. Users authenticate, follow the daily workout with a timer-driven UI, and their per-exercise progress is persisted so an interrupted session can be resumed.

## Commands

```bash
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm start            # Serve production build

npx prisma generate   # Regenerate Prisma client after schema changes
npx prisma migrate dev --name <name>   # Create/apply a migration (MySQL)
```

There is no test suite or lint configuration. Required env vars live in `.env` (names listed in `.env-local`): `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_SECRET`, and `SMTP_*`/`EMAIL_FROM` for magic-link email auth.

Imports are absolute from the repo root (`jsconfig.json` sets `baseUrl: "."`), e.g. `import withAuth from "lib/withAuth"`.

## Architecture

### API layer (pages/api/wod/*)

Every API route is a plain handler wrapped in a composed higher-order-function chain — follow this pattern for new routes:

```js
export default allowedMethods(["GET"])(
  withAuth(withValidation(someSchema)(handler))
);
```

- `lib/allowedMethods.js` — rejects other HTTP methods.
- `lib/withAuth.js` — NextAuth `getServerSession`; puts the session on `req.session`, 401s otherwise.
- `lib/withValidation.js` — Joi validation; validated data lands on `req.validatedQuery` (GET) or `req.validatedBody` (POST/PUT/PATCH). Handlers read from these, never from raw `req.query`/`req.body`.
- Handlers catch errors and delegate to `lib/errorHandler.js`.

### Domain layer (lib/<domain>/)

Each domain (`lib/workout/`, `lib/user/`) has three files: `*Schemas.js` (Joi schemas used by `withValidation`), `*Service.js` (called by API handlers), and `*Model.js` (the only place Prisma queries live, using the `lib/prisma.js` singleton).

### Data model (prisma/schema.prisma, MySQL, relationMode "prisma")

Workout content: `Workouts` (one per `date`) → `WorkoutRounds` → `Rounds` → `RoundExercises` → `Exercises` (with `BodyParts` and `DifficultyLevels` lookups). User tracking: `UserWorkoutSessions` (one per user + workout, with start/end and `totalSecondsSpent`) → `UserWorkoutProgress` (one row per exercise attempt, `startedAt`/`completedAt`). NextAuth owns `User`/`Account`/`Session`/`VerificationToken`.

### Auth

NextAuth (`pages/api/auth/[...nextauth].js`) with the Prisma adapter, Google OAuth, and an Email provider using a custom sender (`lib/email.js`, nodemailer + react-email). `authOptions` is exported and reused by `withAuth`.

### Client state and data fetching

- Reads go through SWR hooks in `hooks/` (`useWorkoutDaily` fetches `/api/wod/daily?date=...` using `utils/fetcher.js`); mutations go through `hooks/useApiRequest.js`.
- Zustand stores in `stores/`: `useWorkoutSession` is the state machine driving the live workout (boolean flags `preStart`/`start`/`pause`/`rest`/`resumed`/`end`, plus `rounds[roundIndex][exercise]` progress); `useWorkoutDetailsStore` holds the fetched workout definition. `pages/app/workout.jsx` orchestrates both, including the resume-interrupted-session flow.

### UI

`pages/index.jsx` is the public landing page; the authenticated app lives under `pages/app/`. Components follow a folder-per-component convention: `components/<Name>/index.jsx` + `styles/<Name>.module.scss` (SCSS modules, shared variables in `styles/_variables.scss`), with nested subcomponents in a local `components/` folder (see `WorkoutInProgress` and `WorkoutPresentation`).
