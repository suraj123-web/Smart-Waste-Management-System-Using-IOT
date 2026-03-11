import { NextResponse } from "next/server";
import { getDashboardTelemetry } from "../../../../lib/blynk";

export const dynamic = "force-dynamic";

export async function GET() {
  const telemetry = await getDashboardTelemetry();
  return NextResponse.json(telemetry, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
