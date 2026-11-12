# Datrix Blogs and Insights CMS

The CMS is part of the existing Datrix website. The public section remains at `#/blog`; the private dashboard is at `/admin`.

## Services required

1. **Neon PostgreSQL** for article records.
2. **Vercel Blob** for persistent featured-image uploads.
3. **Vercel environment variables** for credentials.

## Environment variables

Set these in Vercel → Project → Settings → Environment Variables for Production (and Preview if needed):

- `DATABASE_URL`: Neon pooled PostgreSQL connection string (hostname contains `-pooler`) for application queries.
- `DIRECT_URL`: Neon direct PostgreSQL connection string for Prisma schema push/migration commands. Include `sslmode=require` in both.
- `ADMIN_PASSWORD`: a long, unique password of at least 12 characters.
- `ADMIN_SESSION_SECRET`: a random secret of at least 32 characters.
- `BLOB_READ_WRITE_TOKEN`: create a Blob store under Vercel → Storage and copy its read/write token.

Existing Resend variables remain optional for the CMS:
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CONTACT_TO_EMAIL`

## Database setup

After setting `DATABASE_URL` locally:

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

For Vercel, install/build runs Prisma Client generation through the package postinstall hook if configured. If not, add `"postinstall": "prisma generate"` to `scripts` in `package.json`, then redeploy. Run `npx prisma db push` against the Neon database once from a trusted local environment to create the table.

## Use

- Visit `/admin` and sign in with `ADMIN_PASSWORD`.
- Create an article, enter a category, excerpt and content (Markdown-style headings and bullets are supported).
- Upload a featured image (JPG, PNG, WEBP or AVIF, maximum 5 MB).
- Save as draft or publish.
- Published articles appear in the existing public Blogs and Insights section.
- Drafts are only available in the admin dashboard.

## Security notes

The admin session is signed server-side and stored in an HTTP-only, secure-in-production, SameSite=Strict cookie. All create/update/delete/upload routes check the session on the server. Do not commit `.env` or share credentials in chat.

## Important

This ZIP contains the CMS implementation but does not contain live Neon or Vercel credentials. Configure the variables above before testing the dashboard against production. Resend domain verification is not required for this CMS.
