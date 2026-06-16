# RoomRevamp

RoomRevamp is a production-ready MVP web app for generating practical room makeover plans from uploaded room photos, a decor theme, budget, room type, and improvement goals.

The MVP uses deterministic mock report generation, local AI-generated makeover imagery, and curated local product data. It is structured so real OpenAI image generation, Stripe Checkout, Supabase, and Amazon Product Advertising API integrations can be added later.

## Features

- Landing page with a clean interior-design style
- Upload flow for JPG, PNG, and WebP room photos
- Room type, theme, budget, goal, and custom prompt inputs
- Free teaser result with score, main issue, and quick tip
- One-question-at-a-time trial flow
- Animated orange aurora generating screen
- Pricing page with demo plan selection before unlocking results
- Full report with style diagnosis, fixes, layout, palette, lighting, products, share card, and mock download
- Analyzing step between upload and locked results
- Room leaderboard with scores and before/after room photos
- Local curated product recommendations with placeholder Amazon affiliate links
- Affiliate disclosure, privacy, terms, examples, and about pages
- Vercel-friendly App Router structure

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

To verify a production build:

```bash
npm run build
npm start
```

## Environment variables

Create `.env.local` when you are ready to configure real services.

```bash
NEXT_PUBLIC_AMAZON_AFFILIATE_TAG=yourtag-20
```

Do not put server-only keys in client code. Future Stripe and OpenAI keys should use server-only environment variables, for example:

```bash
STRIPE_SECRET_KEY=
OPENAI_API_KEY=
```

## Replace mock AI image generation

The adapter lives in `lib/generateRoomPreview.ts`.

Current behavior:

- Accepts the uploaded room image, selected theme, room type, budget, goals, custom prompt, and suggested products
- Returns a local AI-generated preview image
- Returns the generated prompt for developer testing

Future behavior:

- Move real image generation into a server route
- Send only the required image and prompt data
- Return a hosted or signed preview image URL
- Keep the same return shape: `previewImageUrl`, `generationPrompt`, and `status`

## Generated graphic assets

The UI includes local blended graphic assets in `public/images/`, including the
orange aurora graphic, before/after makeover rooms, and locked-report preview
used across the homepage, leaderboard, pricing, and results flows. The imagegen
skill CLI requires `OPENAI_API_KEY` for future live generation or replacement
assets.

## Replace mock checkout with Stripe

The placeholder route is `app/api/create-checkout-session/route.ts`.

Current behavior:

- Returns a mock unlocked response
- Requires no API keys

Future behavior:

- Add Stripe server SDK usage inside the route
- Read `STRIPE_SECRET_KEY` from server-only environment variables
- Create a Checkout Session
- Return the Checkout URL to the client
- Unlock the report only after payment confirmation or a verified webhook

## Update affiliate links

Product data lives in `lib/products.ts`. Each product includes:

- `id`
- `name`
- `category`
- `priceRange`
- `imageUrl`
- `affiliateUrl`
- `reason`
- `themes`
- `roomTypes`
- `priority`
- `budgetTier`

The helper in `lib/affiliateLinks.ts` appends `NEXT_PUBLIC_AMAZON_AFFILIATE_TAG` to Amazon URLs.

Before production launch, replace placeholder product links with approved affiliate links or a compliant Amazon Product Advertising API integration. Do not scrape Amazon or imply live pricing unless your integration supports it.

## Important disclosure reminder

Display this disclosure near product recommendations and on the disclosure page:

> As an Amazon Associate I earn from qualifying purchases. Some links on this page may be affiliate links.

Also keep these trust notes visible where appropriate:

- Product prices and availability may change
- Recommendations are suggestions only
- Users should check measurements before buying
- Amazon does not officially endorse RoomRevamp
