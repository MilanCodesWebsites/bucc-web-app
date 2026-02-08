# bucc web app

a mobile-first web application for the babcock university computer club. built with next.js 15, tailwind css, and framer motion.

## features

- onboarding flow with personalized questions
- daily streak tracking with shareable cards
- announcements feed with detailed modal views
- events listing with individual event pages
- learning materials and resources section
- responsive bottom navigation

## getting started

install dependencies:

```bash
pnpm install
```

run the development server:

```bash
pnpm dev
```

build for production:

```bash
pnpm build
```

## tech stack

- next.js 15 with app router
- typescript
- tailwind css
- framer motion
- shadcn/ui components
- heroicons
- date-fns
- html-to-image for share cards

## project structure

```
app/
  dashboard/       main home page
  announcements/   all announcements
  events/          events listing
  events/[id]/     event details
  resources/       learning materials
  profile/         user profile

components/
  streak-calendar  weekly streak display
  streak-modal     streak details and sharing
  onboarding-*     onboarding flow components
  bottom-nav       navigation bar
  ui/              shadcn components

lib/
  streak-utils     streak logic and storage
  dummy-data       sample content
```

## local storage

the app uses local storage for:

- `onboarding_complete` - tracks if user completed onboarding
- `user_data` - stores user profile from onboarding
- `bucc_streak_data` - streak tracking data
