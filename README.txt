FARVO Prompt - Website by FARVO Digital Company
https://farvodigital.netlify.app | +94 077 304 2864

RUN LOCALLY (without contact/reviews)
Open index.html in Chrome. Contact form and Reviews need the /api functions, so they only work when deployed (or with `npx vercel dev`).

DEPLOY ON VERCEL
1. Push this folder to GitHub, then Vercel > Add New Project > import it (no build settings needed).
   Or run `npx vercel` inside this folder.
2. Contact form emails: create a free account at resend.com, make an API key.
   In Vercel > Settings > Environment Variables add RESEND_API_KEY and CONTACT_TO (your email).
   Without your own domain, Resend only delivers to the email you signed up with - that is fine for receiving messages yourself.
3. Public reviews: Vercel > Storage > add "Upstash Redis" and connect it to the project.
   It adds KV_REST_API_URL and KV_REST_API_TOKEN automatically.
4. Redeploy once after adding variables.
Remove a bad review: open the Upstash console, key farvo:reviews (a list), delete the entry.

FILES
index.html, css/style.css, js/app.js (app), js/pages.js (extra pages, library, contact, reviews),
api/contact.js, api/reviews.js (Vercel functions), .env.example

NOTES
- Accounts, saved prompts and history are stored in the browser (localStorage) on that device only.
- Prompts come from a rule-based engine, not a live AI model.
- Review Privacy and Terms text before commercial use.
