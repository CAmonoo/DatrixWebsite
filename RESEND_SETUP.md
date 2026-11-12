# Configure Resend for the Datrix contact form

The contact page posts to `POST /api/contact`. The route sends two messages through the Resend HTTP API:

1. An enquiry notification to `CONTACT_TO_EMAIL` (defaults to `info@datrixtechsolutions.com`). Replies to this notification go to the visitor's email address.
2. A receipt confirmation to the visitor. The form reports success once the business notification has been accepted by Resend; a failed visitor confirmation does not cause the visitor's enquiry to be submitted twice.

## Required environment variables

Copy `.env.example` to `.env.local` for local development and configure these values in your production hosting provider as well:

- `RESEND_API_KEY`: an API key created in your Resend account.
- `RESEND_FROM_EMAIL`: a sender identity on a domain verified in Resend, for example `Datrix Website <website@datrixtechsolutions.com>`.
- `CONTACT_TO_EMAIL`: optional destination inbox; defaults to `info@datrixtechsolutions.com`.

Do not prefix the API key with `NEXT_PUBLIC_`, commit it to Git, or expose it in client-side code.

## Resend and DNS setup

1. Sign in to Resend and add the domain you intend to send from.
2. Publish the exact DNS records Resend displays at your DNS host.
3. Wait for Resend to verify the domain.
4. Create an API key with permission to send email.
5. Set the three environment variables above in your deployment platform.
6. Redeploy the site, then submit a real test enquiry and verify both the business notification and visitor acknowledgement.

The sender domain must be verified before production sending. Do not use a visitor's address as the `from` address; it is used as `reply_to` instead.

## Operational notes

- The API key is read only on the server.
- The API validates submitted fields and escapes user content before placing it in the HTML email.
- A hidden honeypot field filters simple automated submissions.
- Add hosting-provider or edge-level rate limiting/WAF rules to `/api/contact` before a high-traffic launch. In-memory rate limiting is intentionally not used because it is unreliable across serverless instances.
- Resend accepting a message means it has accepted the send request; it is not a guarantee that the recipient's mailbox will accept or display it. Monitor Resend delivery events/logs after launch.
