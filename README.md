# Media Monitor

Chrome extension (Manifest v3) for media analytics: categorize web pages into user-defined projects and categories. Each saved item (page title + URL) is stored in a Google Spreadsheet in the **user's own Google Drive** (`drive.file` scope, inside a "Media Monitor" folder). The developer operates no backend and collects no data.

Project settings are kept in `chrome.storage.local`; the spreadsheet is the data sink.

See [Privacy Policy](docs/privacy-policy.md). See `CLAUDE.md` for build/test commands and architecture.

## Privacy policy hosting

The privacy policy (required by the Chrome Web Store) is hosted on Cloudflare, account `undeclarede`, and is publicly available at:

https://media-monitor-policy.undeclarede.workers.dev

Source of truth: `docs/privacy-policy.md` (Markdown); the deployed static page is `docs/site/index.html`. Keep the two in sync and redeploy `docs/site/` to Cloudflare after any change. The same URL goes into the "Privacy policy" field on the Privacy tab of the Chrome Web Store Developer Dashboard.
