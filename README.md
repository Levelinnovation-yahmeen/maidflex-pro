# MaidFlex Pro

MaidFlex Pro is a two-market cleaning operations website built around two distinct service lines:

- commercial cleaning for facilities in Richmond, Virginia;
- vacation-rental turnovers across supported Rocky Mountain markets.

It also includes a separate application funnel for independent cleaning professionals. The site is public, responsive, and connected to a database-backed form endpoint.

## Live site

- [MaidFlex Pro](https://maidflex-pro.yahmzar.chatgpt.site/)
- [Richmond commercial cleaning](https://maidflex-pro.yahmzar.chatgpt.site/commercial/richmond)
- [Rockies vacation-rental turnovers](https://maidflex-pro.yahmzar.chatgpt.site/vacation-rentals/rockies)
- [Cleaning professional application](https://maidflex-pro.yahmzar.chatgpt.site/cleaners/apply)

The intended public domain is `maidflexpro.com`. Domain connection and production verification remain launch tasks.

## What works today

- Separate customer funnels for Richmond commercial cleaning and Rockies vacation-rental turnovers
- A dedicated independent-cleaning-professional application
- Detailed intake forms with client-side states and server-side validation
- Honeypot spam protection and input-length limits
- Cloudflare D1 persistence through `/api/submissions`
- Unique `MFP-...` confirmation numbers after successful submissions
- Responsive desktop and mobile layouts
- Privacy, website terms, metadata, and social-sharing artwork
- A passing production build

Important: submissions are saved, but they are not yet routed into Housecall Pro or Airtable and do not currently trigger an owner notification. Treat CRM delivery and failure alerting as the first production integration work.

## Technology

- React 19 and TypeScript
- Vinext and Vite
- OpenAI Sites hosting on Cloudflare Workers
- Cloudflare D1
- Drizzle ORM
- Tailwind CSS 4 plus project-specific CSS
- Lucide icons
- pnpm

Node.js `22.13.0` or newer is required.

## Local development

```bash
pnpm install
pnpm dev
```

Before submitting a change:

```bash
pnpm run build
pnpm run lint
```

The build currently passes. Lint has known cleanup items documented in the developer handoff; do not treat the existing lint output as a new regression without comparing it to that list.

## Repository map

```text
app/
  api/submissions/route.ts       Form validation and D1 persistence
  commercial/richmond/           Richmond customer funnel
  vacation-rentals/rockies/      Rockies customer funnel
  cleaners/apply/                Cleaning-professional funnel
  request-form.tsx               Customer intake form
  professional-application.tsx  Professional application form
  site-shell.tsx                 Shared market-page navigation and footer
  globals.css                    Site-wide visual system
db/
  index.ts                       D1/Drizzle connection
  schema.ts                      Submission schema
drizzle/                         Database migration and metadata
public/brand/                    Approved branded imagery
.openai/hosting.json             Managed Sites project configuration
docs/DEVELOPER_HANDOFF.md        Architecture, priorities, and acceptance criteria
```

## Forms and data

Both public form types send JSON to `POST /api/submissions`:

- `kind: service` stores a Richmond or Rockies customer request;
- `kind: professional` stores a cleaning-professional application.

The endpoint validates required fields, sanitizes the additional payload, writes the record to the `submissions` D1 table, and returns a confirmation number. D1 is currently the system of record only for raw website submissions; it is not yet a usable sales or recruiting inbox.

Do not collect Social Security numbers, bank information, identification documents, W-9s, insurance files, or background-check documents through these public forms. Move approved applicants into a secure document workflow later in the recruiting process.

## Deployment and secrets

The live project is managed by OpenAI Sites. Keep `.openai/hosting.json`, the existing pnpm lockfile, and the current D1 binding intact unless the hosting architecture is intentionally being migrated.

Never commit Housecall Pro credentials, Zapier webhook secrets, email-service keys, or personal applicant documents. Store production credentials in the hosting environment.

## Developer handoff

Start with [docs/DEVELOPER_HANDOFF.md](docs/DEVELOPER_HANDOFF.md). It defines the current architecture, the recommended Housecall Pro and Airtable workflows, known technical debt, and a prioritized path from working MVP to launch-ready operating system.

## Ownership and licensing

This repository does not currently include an open-source license. Public visibility allows the code to be viewed; it does not grant permission to reuse or redistribute it. The owner should make an explicit licensing decision before accepting outside contributions beyond the authorized team.
