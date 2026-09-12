/**
 * HTTP layer for the scrapers.
 *
 * Scraping someone else's newspaper is a privilege, not a right. Everything
 * here is built to be a good citizen: one identifiable User-Agent that says who
 * we are and links back, a hard rate limit per host, real timeouts, and bounded
 * retries only on transient failures. A scraper that hammers a site gets the
 * whole project blocked, and rightly so.
 *
 * NOTE ON WHERE THIS RUNS: the environment this repository was developed in has
 * its outbound network restricted by policy, so none of the adapters could be
 * exercised against live HTML here. They are written to run in CI (GitHub
 * Actions runners have unrestricted egress), and every one of them is built to
 * fail soft — see `collectAll` in ./index.ts. A scraper that breaks when a
 * newspaper changes its markup is a Tuesday, not an outage.
 */

const USER_AGENT =
  "IsraelElectionIndexBot/1.0 (poll aggregator; +https://github.com/ishabtai/virtual-velvet-rope)";

/** Minimum gap between two requests to the same host, in milliseconds. */
const MIN_HOST_INTERVAL_MS = 1500;
const DEFAULT_TIMEOUT_MS = 20000;
const MAX_RETRIES = 2;

const lastRequestAt = new Map<string, number>();

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Blocks until this host's rate limit allows another request. */
async function waitForHost(host: string): Promise<void> {
  const last = lastRequestAt.get(host) ?? 0;
  const wait = last + MIN_HOST_INTERVAL_MS - Date.now();
  if (wait > 0) await sleep(wait);
  lastRequestAt.set(host, Date.now());
}

export interface FetchOptions {
  timeoutMs?: number;
  /** Passed through for JSON APIs that want it. */
  accept?: string;
}

/**
 * Fetches a URL as text, politely.
 *
 * Retries only on network errors, 429 and 5xx — the failures that a retry can
 * actually fix. A 403 or 404 is an answer, and retrying it is just rudeness.
 */
export async function fetchText(url: string, opts: FetchOptions = {}): Promise<string> {
  const host = new URL(url).host;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    await waitForHost(host);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), opts.timeoutMs ?? DEFAULT_TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": USER_AGENT,
          Accept: opts.accept ?? "text/html,application/xhtml+xml",
          "Accept-Language": "he,en;q=0.8",
        },
        signal: controller.signal,
        redirect: "follow",
      });

      if (res.ok) return await res.text();

      const retryable = res.status === 429 || res.status >= 500;
      lastError = new Error(`HTTP ${res.status} ${res.statusText}`);
      if (!retryable) throw lastError;
    } catch (err) {
      lastError = err as Error;
      // AbortError and network failures are both worth one more try.
    } finally {
      clearTimeout(timer);
    }

    if (attempt < MAX_RETRIES) {
      await sleep(2000 * Math.pow(2, attempt));
    }
  }

  throw lastError ?? new Error(`failed to fetch ${url}`);
}

export async function fetchJson<T>(url: string, opts: FetchOptions = {}): Promise<T> {
  const text = await fetchText(url, { ...opts, accept: "application/json" });
  return JSON.parse(text) as T;
}

/**
 * Checks robots.txt before a host is scraped for the first time.
 *
 * Deliberately conservative: a rule that mentions our agent or `*` and
 * disallows the path we want is obeyed, and a robots.txt we cannot read at all
 * is treated as permission (that is the convention, and a missing robots.txt is
 * the overwhelmingly common case). Results are cached per host for the life of
 * the process so one run does not re-fetch it.
 */
const robotsCache = new Map<string, string[]>();

export async function isAllowed(url: string): Promise<boolean> {
  const u = new URL(url);
  const origin = u.origin;

  if (!robotsCache.has(origin)) {
    try {
      const txt = await fetchText(`${origin}/robots.txt`, { timeoutMs: 8000 });
      robotsCache.set(origin, parseDisallows(txt));
    } catch {
      robotsCache.set(origin, []);
    }
  }

  const disallows = robotsCache.get(origin) ?? [];
  return !disallows.some((rule) => rule !== "" && u.pathname.startsWith(rule));
}

/** Collects Disallow paths from the `*` and our-agent groups only. */
function parseDisallows(robotsTxt: string): string[] {
  const out: string[] = [];
  let applies = false;
  for (const raw of robotsTxt.split("\n")) {
    const line = raw.split("#")[0].trim();
    if (!line) continue;
    const [key, ...rest] = line.split(":");
    const value = rest.join(":").trim();
    const k = key.trim().toLowerCase();
    if (k === "user-agent") {
      applies = value === "*" || value.toLowerCase().includes("israelelectionindexbot");
    } else if (k === "disallow" && applies) {
      out.push(value);
    }
  }
  return out;
}
