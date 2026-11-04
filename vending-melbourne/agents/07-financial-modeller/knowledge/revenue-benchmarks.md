# Revenue Benchmarks — Vending in Australia / Melbourne

**Owner:** 07 Financial Modeller · **Research date:** 4 Nov 2026 · **Currency:** AUD

> **Read this first.** Australia has **no published, audited industry benchmark** for revenue per vending machine. No ABS series, no industry association report. Every figure below comes from vendor marketing, broker listings or operator forums. Treat all of them as **indicative**. The model uses a **Low / Base / High** band rather than a single number.
>
> **Method note:** several source sites (bsale.com.au, realcommercial.com.au, nayax.com) were blocked from direct fetching in this research session. Figures marked "(search snippet)" were read from search-engine extracts of those pages, not from the full page. Re-verify them before relying on them.

## Jargon
- **Gross sales / turnover:** what customers pay, **including GST**.
- **Net revenue (ex-GST):** gross ÷ 1.1 for taxable goods. This is the revenue line in a P&L once you are GST-registered.
- **Per machine per week (PMPW):** the standard yardstick operators use.
- **SDE (seller's discretionary earnings):** profit before the owner's own wage. Brokers value routes on this.

---

## 1. Published Australian data points

| # | Data point | Implied PMPW (gross, incl GST) | Source (accessed 4 Nov 2026) | Reliability |
|---|---|---|---|---|
| 1 | "Most machines" make $50–$300/week depending on location and traffic | $50–$300 | https://vendingmachinesqld.pages.dev/blog/how-much-do-vending-machines-make-qld.html | Low (vendor blog) |
| 2 | Average gross sales ~$650–750/month, net profit ~$400–500/month | ~$150–175 | Search summary of AU vendor/forum sources, e.g. https://www.vendingmachinesaustralia.com.au/used-vending-machines-compare-costs-roi-free-machine-options | Low–Med |
| 3 | Seller quote: average **$715/month** gross | ~$165 | Same vendor family (vendingmachinesaustralia.com.au) | Low |
| 4 | Operator forum rule of thumb: **minimum $150–160/week** or the site is "not worth it" | $150–160 floor | Forum posts surfaced in search (not individually linkable) | Med (practitioner) |
| 5 | **Melbourne** listing: 45 machines turning over **$8,300/week** | **≈ $184** | https://www.seekbusiness.com.au/businesses-for-sale/between-0-2000000/within-accommodation-and-tourism-or-vending/in-melbourne-vic-3000?d=14 (search snippet) | Med (broker claim) |
| 6 | Sydney listing: 26 machines, sales >$80k in FY2024 | ≈ $59 | https://www.seekbusiness.com.au/business-listing/vending-machine-business-sydney/762242 (search snippet) | Med |
| 7 | **Melbourne** listing: 62 food vending machines, revenue "$95k+ per month", under offer | **≈ $350** (95,000 × 12 ÷ 52 ÷ 62) | https://bsale.com.au/listing/under-offer-expansive-vic-646352 (search snippet) | Med (broker claim, likely includes high-traffic sites) |
| 8 | Melbourne listing: 11 machines, $100k + GST, turnover not disclosed | n/a | https://bsale.com.au/listing/rare-opportunity-for-melbourne-vic-671667 (search snippet) | n/a |
| 9 | NSW listing: asking $82k + SAV against ~$40k adjusted net profit | n/a (≈2× profit) | https://bsale.com.au/listing/snack-drink-ven-nsw-661134 (search snippet) | Med |
| 10 | Independent guide: ~$7,350/yr "rough annual contribution" per machine after commission and running costs | Contribution, not sales | Search summary, https://www.vjmglobal.com/feeds/blog/start-vending-machine-business-australia | Low |

**Reading across the data:** in established fleets the realistic middle sits around **$150–$190 gross PMPW**. Top sites (major workplaces, hospitals, transport hubs, 24/7 sites) can reach $300+. Weak sites sit around $50–100. The spread between listings (#5 vs #6) shows that **site quality drives revenue far more than machine type**.

## 2. Benchmarks adopted for the model (ESTIMATE)

| Band | Gross PMPW (incl GST) | Annual gross | Annual ex-GST | Typical site (ESTIMATE) |
|---|---|---|---|---|
| **Low** | $100 | $5,200 | $4,727 | Small office (<40 staff), small gym, low-traffic apartment lobby |
| **Base** | $175 | $9,100 | $8,273 | Mid warehouse/factory (60–150 staff on shifts), TAFE wing, mid-size gym |
| **High** | $300 | $15,600 | $14,182 | Large shift-work site, hospital staff area, 24/7 transport/industrial, large student housing |

*Reasoning:* Base = mid-point of points #2–#5, rounded. Low = forum "not worth it" floor less ~35%. High = vendor upper range, consistent with the top of the #7 fleet average. New operators should **plan on Low–Base for year 1**. The good sites are already held by incumbents (see 02 Competitor Analyst).

### By format (ESTIMATE, gross PMPW)
| Format | Low | Base | High | Notes |
|---|---|---|---|---|
| Classic combo snack/drink | 100 | 175 | 300 | Average ticket ~$3.50–4.50 |
| Drink-only (cold) | 80 | 150 | 280 | Summer peak. Melbourne winters reduce cold-drink volume (ESTIMATE ±25% seasonality) |
| AI smart fridge (fresh + drinks) | 200 | 350 | 600 | Higher ticket ($6–12). Needs a closed/trusted site. **No AU figure verified.** |
| Micro-market (open shelves + kiosk) | 500 | 1,000 | 2,500 | Needs 150+ staff. Provender listings do not disclose turnover: https://www.seekbusiness.com.au/business-listing/21052-premium-micro-market-unattended-retail-franchise-business-hazelmere/766900 |
| Specialty/"interactive" franchise machine | 300 | 600 | 900 | Franchisor claims only (AIPVend, Just Now Vending). Unverified. |

## 3. Revenue drivers

| Driver | Effect (ESTIMATE) | Evidence |
|---|---|---|
| Foot traffic / headcount on site | Dominant. Roughly $1–2.50 gross/week per regular person on site with no nearby alternative | Operator rule of thumb (ESTIMATE) |
| Captive audience (no café/servo in 300 m) | ×1.5–2 | Practitioner consensus |
| 24/7 or shift work | +30–60% vs 9–5 office | ESTIMATE |
| Cashless acceptance | Essential. Only ~15% of all payments (by number) were cash in 2025, but cash is **~1 in 4 payments under $10** | RBA Bulletin Apr 2026: https://www.rba.gov.au/publications/bulletin/2026/apr/cash-use-in-australia-what-the-2025-consumer-payments-survey-tells-us.html |
| Price point | AU retail single 600 ml Coke is $4.20–$4.50 (Chemmart, BWS, Hastings), so vending at $4.50–$5.00 is defensible | https://bws.com.au/product/93167/coca-cola-bottle-600ml ; https://terrywhitechemmart.com.au/shop/product/coca-cola-coke-bottle-600ml |
| Seasonality (Melbourne) | Drinks drop in Jun–Aug; snacks steadier; uni/TAFE sites fall in semester breaks (−40–70% for 10–14 weeks/yr) | ESTIMATE |
| Ramp-up | New site takes ~6–12 weeks to reach steady state | ESTIMATE |

### Cash vs card mix used in the model
- Model assumption: **80% cashless / 20% cash** by value for vending (ESTIMATE).
- *Reasoning:* the RBA reports 19% of in-person payments by number were cash and ~25% of under-$10 payments were cash (2025 CPS). Vending tickets are small, so cash runs a little above the economy-wide 15%.
- Hand-off: 05 Equipment decides whether to fit a coin/note mech at all.

## 4. GST on revenue
- Most vending lines (soft drinks, confectionery, chips, energy drinks) are **taxable** at 10%. Some basic food lines are **GST-free**. **Plain bottled water** is generally GST-free, and some fresh food can be too.
- Model simplification: 100% taxable. A mix of ~10% GST-free lines lifts net revenue by ~1%. Hand-off to 08 Legal/Compliance and 04 Pricing to confirm the product classifications.

## 5. Revenue used in other files
- Per-machine P&L: `unit-economics-model.md` (Low/Base/High = $100/$175/$300 gross PMPW).
- Fleet scenarios: `scenarios-1-5-20.md`.

## Staleness flags
- Listing figures (#5–#9) are broker claims, dated 2024–2026, and some are already sold or under offer.
- No AU smart-fridge or micro-market revenue figure was found. Those bands are **ESTIMATE**.
