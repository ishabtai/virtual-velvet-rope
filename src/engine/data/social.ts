import type { SocialObservation } from "../types";

/**
 * Social-media signal.
 *
 * PROVENANCE — READ THIS BEFORE TRUSTING THE NUMBERS BELOW.
 *
 * The series in this file is a structurally realistic PLACEHOLDER, not measured
 * data. The environment this repository was built in has no outbound access to
 * the platform APIs (X/Twitter, Facebook, TikTok, YouTube, Telegram) and no API
 * credentials, so nothing here was actually sampled from a live platform.
 *
 * Because of that, `SOCIAL_PROVENANCE` is set to "placeholder" and the engine
 * ZEROES OUT the social adjustment in the headline forecast. The mechanism is
 * fully implemented and unit-tested; it activates the moment a verified feed is
 * connected via `src/engine/ingest/social.ts` and this flag flips to "verified".
 * The simulator page lets you switch it on manually to see what it would do.
 *
 * This is a deliberate design choice. Social-media volume is a notoriously
 * biased proxy for votes: platform populations skew young and secular, bot and
 * brigading activity is concentrated on the political extremes, and Israel's
 * Haredi electorate — roughly a seventh of the vote — is close to invisible on
 * the platforms tracked. A forecast that silently mixed unvalidated scraped
 * engagement into its headline number would be worse than one that ignored it.
 */
export const SOCIAL_PROVENANCE: "placeholder" | "verified" = "placeholder";

export const SOCIAL_PLATFORMS = ["X", "Facebook", "TikTok", "YouTube", "Telegram"];

export const SOCIAL_OBSERVATIONS: SocialObservation[] = buildPlaceholderSeries();

/**
 * Generates a plausible 30-day series so the pipeline, the charts and the tests
 * have something with the right shape to run against. Deterministic: the same
 * series every run, so a forecast is reproducible.
 */
function buildPlaceholderSeries(): SocialObservation[] {
  // Baseline conversation share and sentiment per party. Chosen to reflect the
  // well-documented structural skew: new and insurgent parties over-index on
  // social relative to their vote, Haredi parties under-index heavily.
  const baseline: Record<string, { vol: number; sent: number; eng: number }> = {
    likud: { vol: 0.22, sent: -0.08, eng: 0.2 },
    yashar: { vol: 0.2, sent: 0.14, eng: 0.22 },
    byachad: { vol: 0.11, sent: -0.02, eng: 0.1 },
    democrats: { vol: 0.09, sent: 0.05, eng: 0.1 },
    "yisrael-beiteinu": { vol: 0.06, sent: 0.01, eng: 0.06 },
    otzma: { vol: 0.12, sent: -0.05, eng: 0.13 },
    "religious-zionism": { vol: 0.05, sent: -0.12, eng: 0.05 },
    amcha: { vol: 0.06, sent: 0.09, eng: 0.06 },
    reservists: { vol: 0.03, sent: 0.06, eng: 0.03 },
    shas: { vol: 0.02, sent: -0.04, eng: 0.015 },
    utj: { vol: 0.015, sent: -0.06, eng: 0.01 },
    "hadash-taal": { vol: 0.02, sent: -0.01, eng: 0.02 },
    raam: { vol: 0.015, sent: 0.0, eng: 0.015 },
  };

  // Small deterministic drifts so the momentum term has something to detect.
  const drift: Record<string, number> = {
    yashar: 0.0012,
    amcha: 0.0009,
    likud: -0.0008,
    byachad: -0.0011,
    reservists: 0.0006,
  };

  const out: SocialObservation[] = [];
  const end = new Date("2026-09-11T00:00:00Z");
  for (let dayBack = 29; dayBack >= 0; dayBack--) {
    const d = new Date(end.getTime() - dayBack * 86400000);
    const date = d.toISOString().slice(0, 10);
    const t = 29 - dayBack;
    for (const [partyId, b] of Object.entries(baseline)) {
      const wobble = Math.sin((t + partyId.length) * 0.7) * 0.004;
      out.push({
        date,
        partyId,
        volumeShare: Math.max(0.001, b.vol + (drift[partyId] ?? 0) * t + wobble),
        sentiment: clamp(b.sent + Math.sin(t * 0.4 + partyId.length) * 0.03, -1, 1),
        engagementShare: Math.max(0.001, b.eng + (drift[partyId] ?? 0) * t * 0.8 + wobble),
        platforms: SOCIAL_PLATFORMS,
      });
    }
  }
  return out;
}

function clamp(x: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, x));
}
