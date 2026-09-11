import type { BlocId, CoalitionScenario, ModelConfig, PartyEstimate, Poll } from "@/engine/types";

/** The shape written to public/data by `npm run forecast`. */
export interface ForecastSnapshot {
  asOf: string;
  electionDate: string;
  daysToElection: number;
  parties: PartyEstimate[];
  blocs: { bloc: BlocId; meanSeats: number; low80: number; high80: number; pMajority: number }[];
  coalitions: CoalitionScenario[];
  pmProbability: { leader: string; partyId: string; probability: number }[];
  pDeadlock: number;
  pollsUsed: number;
  effectivePollCount: number;
  houseEffects: Record<string, Record<string, number>>;
  config: ModelConfig;
  socialEnabled: boolean;
  socialProvenance: string;
  centralShares: Record<string, number>;
}

export interface DailyReport {
  date: string;
  headline: string;
  sections: { title: string; body: string }[];
  bullets: string[];
}

export interface TrendPoint {
  date: string;
  seats: Record<string, number>;
  blocs: Record<string, number>;
}

/**
 * Snapshots are immutable once written, so they are safe to cache hard. The
 * `latest` pointers are not, hence the cache-busting query.
 */
async function getJson<T>(path: string, bustCache = false): Promise<T> {
  const url = bustCache ? `${path}?t=${Math.floor(Date.now() / 60000)}` : path;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${path}: ${res.status} ${res.statusText}`);
  return (await res.json()) as T;
}

export const fetchLatestForecast = () => getJson<ForecastSnapshot>("/data/latest.json", true);
export const fetchLatestReport = () => getJson<DailyReport>("/data/latest-report.json", true);
export const fetchTrend = () => getJson<TrendPoint[]>("/data/trend.json", true);
export const fetchPolls = () => getJson<Poll[]>("/data/polls.json", true);
export const fetchArchive = () =>
  getJson<{ date: string; headline: string }[]>("/data/index.json", true);
export const fetchReport = (date: string) => getJson<DailyReport>(`/data/report-${date}.json`);
export const fetchForecast = (date: string) =>
  getJson<ForecastSnapshot>(`/data/forecast-${date}.json`);
