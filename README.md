# Spine Recovery App — تطبيق تأهيل العمود الفقري

Bilingual (Arabic RTL default + English) spine-rehab and fitness tracker, built as an installable
PWA from the Claude Design handoff in [`project/`](project/) (`Spine Recovery App.dc.html`).

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Deploy (free) and install on iPhone

1. Push to `main` on GitHub, then in the repo go to **Settings → Pages → Source: GitHub Actions**.
   `.github/workflows/deploy.yml` builds and publishes on every push, so the installed app always gets the latest version.
2. Open the Pages URL in **Safari** on the iPhone → Share → **Add to Home Screen**.
   It opens full-screen like a native app and keeps working offline (service worker in `public/sw.js`).

## Structure

| Path | What |
| --- | --- |
| `src/data/spine-data.js` | All exercises, meals, supplements, icons and exercise animations (verbatim from the design) |
| `src/styles/theme.css` | Design stylesheet (verbatim); `app.css` holds small fixes on top |
| `src/config.js` | The design's "Tweaks": app name, brand colors, default language, rest seconds, XP per level, water goal |
| `src/App.jsx` | App state and behavior (checklist, counters, timers, focus mode, reminders, backup, photos…) |
| `src/components/` | UI sections: dashboard, day panels, progress, coach, sheets, focus overlay, bottom nav |
| `src/lib/` | Storage, sounds/haptics, progress/streak math, coach rules, printable report |

All data stays on the device in `localStorage`, using the **same keys as the prototype**, so existing data
and backup files from the design version import unchanged.

## Claude coach

The Coach tab has a chat with Claude (`claude-opus-5`, server-side refusal fallback enabled), grounded in a snapshot of the
user's tracked data (`src/lib/claude.js`). The user pastes their own Anthropic API key in Settings; it is stored only in
that device's `localStorage` (`claudeApiKey`), excluded from backup export/import, and sent only to `api.anthropic.com`.
Usage is billed to the user's Anthropic account. The SDK is lazy-loaded so it doesn't slow app start-up.

## Apple Health

- **Send**: a Shortcut named `Log Spine Recovery` receives today's water/sleep/weight.
- **Import**: a Shortcut named `Get Spine Health` copies one line of JSON to the clipboard:
  `{"source":"spine-health","steps":N,"weight_kg":N,"sleep_hours":N,"water_ml":N}` (any value may be empty;
  Arabic digits, thousands separators and sleep in minutes/seconds are handled).
- **Automatic**: with "Auto-import" on in Settings and a daily Shortcuts automation running `Get Spine Health`,
  the first touch in the app each day imports the data (iOS requires a user gesture and shows a Paste prompt).

## Platform limits (iOS)

- Reminders fire only while the app is open — iOS doesn't allow scheduled local notifications from web apps.
- "Send to Apple Health" opens a Shortcut named `Log Spine Recovery` that you create once in the Shortcuts app;
  web apps can't write to HealthKit directly.
