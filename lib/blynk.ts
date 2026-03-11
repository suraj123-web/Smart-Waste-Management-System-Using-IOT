export type DashboardTelemetry = {
  totalBins: number;
  collectionsCompleted: number;
  averageFillLevel: number;
  criticalAlerts: number;
  lastSync: string;
  source: "blynk" | "fallback";
};

const DEFAULT_PINS = {
  totalBins: "V0",
  collectionsCompleted: "V1",
  averageFillLevel: "V2",
  criticalAlerts: "V3",
};

function coerceNumber(value: string | null, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

async function readPinValue(token: string, pin: string): Promise<string | null> {
  const endpoint = `https://blynk.cloud/external/api/get?token=${encodeURIComponent(token)}&${encodeURIComponent(pin)}`;
  const response = await fetch(endpoint, { cache: "no-store" });

  if (!response.ok) {
    return null;
  }

  return response.text();
}

export async function getDashboardTelemetry(): Promise<DashboardTelemetry> {
  const token = process.env.BLYNK_AUTH_TOKEN;

  if (!token) {
    return {
      totalBins: 128,
      collectionsCompleted: 342,
      averageFillLevel: 64,
      criticalAlerts: 9,
      lastSync: new Date().toISOString(),
      source: "fallback",
    };
  }

  const pinMap = {
    totalBins: process.env.BLYNK_PIN_TOTAL_BINS ?? DEFAULT_PINS.totalBins,
    collectionsCompleted: process.env.BLYNK_PIN_COLLECTIONS ?? DEFAULT_PINS.collectionsCompleted,
    averageFillLevel: process.env.BLYNK_PIN_AVERAGE_FILL ?? DEFAULT_PINS.averageFillLevel,
    criticalAlerts: process.env.BLYNK_PIN_CRITICAL_ALERTS ?? DEFAULT_PINS.criticalAlerts,
  };

  const [totalBins, collectionsCompleted, averageFillLevel, criticalAlerts] = await Promise.all([
    readPinValue(token, pinMap.totalBins),
    readPinValue(token, pinMap.collectionsCompleted),
    readPinValue(token, pinMap.averageFillLevel),
    readPinValue(token, pinMap.criticalAlerts),
  ]);

  return {
    totalBins: coerceNumber(totalBins, 128),
    collectionsCompleted: coerceNumber(collectionsCompleted, 342),
    averageFillLevel: coerceNumber(averageFillLevel, 64),
    criticalAlerts: coerceNumber(criticalAlerts, 9),
    lastSync: new Date().toISOString(),
    source: "blynk",
  };
}
