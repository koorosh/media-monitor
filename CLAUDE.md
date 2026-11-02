# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Media Monitor is a Chrome extension (Manifest v3) built with React 18, MobX (decorators) and Material-UI v4, bundled by webpack + Babel. Users define "projects" with categories; the extension saves items (pages) into a Google Spreadsheet stored in the user's Google Drive.

## Commands

Uses Yarn (`yarn.lock`) and Node via `mise.toml` (loads `.env`).

- `yarn build-dev` / `yarn build` — webpack build into `dist/` (the unpacked extension; `CleanWebpackPlugin` wipes it each build). `NODE_ENV=development` picks `secret/manifest-dev.json`, otherwise `secret/manifest-prod.json`; it is copied to `dist/manifest.json`.
- `yarn start` — webpack-dev-server on port 3000 (`PORT` overrides).
- `yarn test-units` — mocha + ts-node + jsdom-global, loading `src/fake-chrome.ts` (stubs the `chrome` API). Specs are `src/**/*.spec.ts`. Single file: `TS_NODE_FILES=true TS_NODE_PROJECT=tsconfig.test.json npx mocha -r ts-node/register -r jsdom-global/register -r src/fake-chrome.ts src/contexts/project-context.spec.ts`
- `yarn test-ui` — jest (config in `config/jest/`; `package.json` has no jest config block, so check before relying on it).

## Secrets / required local files

`webpack.config.js` requires `secret/keys.json` (`GOOGLE_API_KEY`, injected via `EnvironmentPlugin` as `process.env.GOOGLE_API_KEY`) and `secret/manifest-{dev,prod}.json`. `secret/` and `.env` are gitignored; builds fail without them.

## Architecture

Two webpack entry points, each with its own HTML template:
- `src/main.tsx` → `index.html` (extension popup): `AuthGuard` wraps `containers/Main`.
- `src/options.tsx` → `options.html` (options page): `containers/Options` for managing projects/categories.

Layers:
- `src/models/` — `Project`, `Category`, `Item`, `Option`. `Project.fromSheetRecord` rehydrates projects from stored data.
- `src/contexts/` — MobX stores (`project-context`, `auth-context`, `main-context`). `ProjectContext` orchestrates project creation: ensure the "Media Monitor" Drive folder exists (`config.projectDirName`) → create spreadsheet → move it into the folder → persist to chrome storage → set active project.
- `src/core/` — I/O. `google-drive.ts` and `spreadsheet.ts` call Google REST APIs through `request.ts` (axios) using the API key plus the OAuth token; `chrome-plugin-api/` wraps `chrome.identity` (`authentificate`), `chrome.storage` (`storage`) and messaging. Project state of record lives in `chrome.storage`, with the spreadsheet as the data sink.
- `google-analytics.ts` / `secret/analytics.js` — analytics was removed because it violates Manifest v3 rules (remote code); don't reintroduce remote scripts.

## Notes

- Decorators and class properties come from Babel plugins (`babel.config.json`); webpack's babel-loader also sets presets inline.
- Code runs inside the extension context; anything touching `chrome.*` must be stubbed in tests via `src/fake-chrome.ts`.
- `dist/` and `dist.zip` are build outputs.
