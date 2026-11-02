---
title: Media Monitor – Privacy Policy
---

# Privacy Policy – Media Monitor

_Last updated: 2 November 2026_

Media Monitor ("the extension") is a Chrome extension that lets you categorize web pages and save them to a Google Spreadsheet in your own Google Drive.

**In short: the developer does not collect, store, sell, or share any of your data. The extension has no servers, no analytics, and no advertising.**

## What the extension accesses

| Data | Why | Where it goes |
|---|---|---|
| **Title and URL of the active tab** | Read only when you open the extension and choose to save the page, so it can be recorded under a category you selected. | Written to a spreadsheet in **your** Google Drive. |
| **Google account authorization (OAuth token)** | To let the extension create and write to spreadsheets on your behalf. The extension requests only the `drive.file` scope, which limits access to files the extension itself creates. | Held by Chrome; used only to call Google APIs directly from your browser. |
| **Projects and categories you define** | To remember your settings between sessions. | Stored locally in your browser (`chrome.storage`) and in your spreadsheet. |

## What we do not do

- We do not collect, transmit, or have access to your data. All data stays in your browser and in your own Google account.
- We do not use analytics, tracking, cookies, or advertising.
- We do not sell or transfer user data to third parties.
- We do not use or transfer user data for purposes unrelated to the extension's single purpose, or for creditworthiness or lending purposes.
- We do not run remotely hosted code.

## Third-party services

The extension communicates directly with Google APIs (Google Drive and Google Sheets) from your browser to store your data. Google's handling of that data is governed by the [Google Privacy Policy](https://policies.google.com/privacy). The extension's use of information received from Google APIs adheres to the [Chrome Web Store User Data Policy](https://developer.chrome.com/docs/webstore/program-policies/user-data-faq), including the Limited Use requirements.

## Permissions

- `activeTab` – read the title and URL of the current tab when you use the extension.
- `storage` – save your projects and categories locally.
- `identity` – sign in with your Google account to access your spreadsheet.

## Your control

You can delete the saved data at any time by removing the spreadsheet from your Google Drive, uninstalling the extension (which clears local storage), or revoking access at <https://myaccount.google.com/permissions>.

## Changes

If this policy changes, the updated version will be published at this address with a new date.

## Contact

Questions: mediamonitorapp@gmail.com
