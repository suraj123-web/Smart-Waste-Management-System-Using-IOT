# Smart Waste Management Dashboard

Next.js dashboard for Smart Waste Management with live telemetry support from **Blynk Cloud**.

## Run locally

```bash
npm install
npm run dev
```

The app runs on `http://localhost:9002` by default.

## Blynk Cloud integration

Create a `.env.local` file and configure:

```bash
BLYNK_AUTH_TOKEN=your-device-auth-token
BLYNK_PIN_TOTAL_BINS=V0
BLYNK_PIN_COLLECTIONS=V1
BLYNK_PIN_AVERAGE_FILL=V2
BLYNK_PIN_CRITICAL_ALERTS=V3
```

If `BLYNK_AUTH_TOKEN` is not set (or Blynk is unavailable), the dashboard falls back to demo values.

The dashboard reads telemetry through the server route:

- `GET /api/blynk/status`

So your Blynk token remains server-side.
