# Phase 2 Analysis: Equipment & Tech Lens on the 7 Archetypes

_Agent 05 · 2026-11-04 · AUD ex GST unless stated · Builds on `knowledge/` and `agents/00-lead-strategist/knowledge/business-model-archetypes.md`_

**Scope.** This file covers my lens only: equipment cost, technical fit, reliability, and payment setup. It does not judge site quality, demand or profit; those belong to agents 03, 01 and 07.
**Method.** I ran 8 web searches in Phase 2. Direct page fetches still fail for seekbusiness.com.au, nayax.com and rba.gov.au, so the figures below come from search-result extracts. **ESTIMATE** marks my own reasoning.

## 1. Scores (1 = poor, 5 = strong, on equipment and tech grounds only)

| # | Archetype | Score | One-line reason |
|---|---|---|---|
| A | Classic DIY route | **5** | Cheapest, most proven kit. Standard MDB + 4G Nayax setup, parts in Melbourne, and a rent-before-buy option. |
| B | Smart fridge / micro-market | **3** (B-lite fridge 4, full micro-market 2) | Good fit for workplaces, but there's no AU list price, a platform fee of ~5–8% of sales, vendor lock-in, and the micro-market kiosk is quote-only. |
| C | Niche / specialty | **2** | Kit varies most here: gacha is cheap, frozen is mid-priced, hot food is $30k–100k+. Thin AU service and parts support. Only lift-equipped combos and smart fridges suit niche goods at low risk. |
| D | Buy existing route | **3** | You get machines at a discount, but often aged, non-MDB or 3G-dead fleets. Budget for retrofit. Telemetry exports make due diligence possible. |
| E | Franchise / licence | **2** | Kit is new with 24-month warranties, but costs 3–4× the bare price per machine (AIPVend $29,970; Royal Vending fridge ~$40.5k). Platform is locked to the franchisor. |
| F | Placement package | **3** | Kit is usually a new Chinese-OEM combo with Nayax at ~$6k–10k per machine, which is close to buying new yourself. The risk is in the sites, not the equipment. |
| G | Placement-only / asset-light | **4** (lens barely applies) | Almost no capex. A rental hybrid ($31.50/wk combo + <$1/day reader) is the lowest-capex way to trial a site. |

Hybrids: **A→D 5** (you learn MDB and Nayax on 3–5 machines, then can value and retrofit a route) · **A+C 4** (only if the niche machine is a standard combo or fridge) · **B-lite 4** · **E-as-bootcamp 2** (you pay the premium on the kit and learn the franchisor's platform, not a portable one).

## 2. Archetype detail: spec, capex per machine, rationale

### A. Classic DIY route (score 5)
- **Spec:** a dealer-refurbished MDB combo (snacks above, chilled drinks below, glass front, lift if the budget allows). Used Sanden/Crane/TCN/SVA-type machines with AU parts support. Nayax VPOS Touch, Onyx or Media 4 reader on 4G. Cashless-only. Bolt it down at semi-public sites.
- **Capex per machine (ESTIMATE, ex GST, excl. stock):**
  - Used + rented reader: machine $4,000 + delivery/install $350 = **~$4,350**, plus ~$30/mo for the reader.
  - Used + bought reader: $4,000 + reader $1,400–2,000 + $350 = **~$5,750–6,350**.
  - New combo + bought reader: $7,500–8,500 + $1,400–2,000 + $350–400 = **~$9,300–10,900**.
  - Opening stock: $500–600 on top.
- **Evidence:** used combos $3,000–5,500 and new combos $5,500–13,000 (VMA, knowledge/suppliers-and-prices-au.md). Nayax Onyx at $2,200 incl GST from Dipacci, an AU reseller (https://dipacci.com.au/products/nayax-onyx-contactless-card-reader-suitable-for-dr-coffee, accessed 2026-11-04). Nayax AU rents the Media 4 for "<AUD $1/day, no upfront hardware" (CFOtech, Jul 2025, https://cfotech.com.au/story/nayax-launches-android-pos-with-rental-model-in-australia, reconfirmed 2026-11-04).
- **Reliability:** spirals, motors and compressors are well understood, with repair contractors in Sunshine North. Budget $300–600 a year in repairs per used machine (ESTIMATE).

### B. Smart fridge / micro-market (score 3)
- **B-lite spec:** an AI-vision smart fridge (HAHA via The Vend Shop, or similar) with built-in card, wallet and QR payments and 4G or site Wi-Fi. A single-door unit for 30–150 staff; a dual-door unit for 150+.
- **Capex per fridge:** **$6,000–15,000+**, now cited (VMA 2026 buyer's guide: https://www.vendingmachinesaustralia.com.au/dispensing-machines-for-sale-in-australia-2026-buyers-guide-for-businesses-and-operators, accessed 2026-11-04). Use a **base of $10,000 incl. payments, plus $350 install** (ESTIMATE midpoint). The Vend Shop still gives prices on quote only.
- **Running tech cost:** the platform plus processing is typically a monthly software fee and a %. US benchmark: Micromart charges US$60/mo per unit plus 4% + US$0.10 per transaction, with a lease option at US$230/mo over 36 months (https://www.micromart.com/pricing/smart-fridge, accessed 2026-11-04). EU benchmark: €199/mo SLA plus 2.75% + €0.25. **AU ESTIMATE: $50–90 a month plus 4–6% of sales.**
- **Full micro-market (score 2):** a 365 MM6 kiosk lists at ~US$5,450 (vending.com, currency not stated, https://www.vending.com/products/self-checkout-kiosks/365-retail-markets-mm6-mini-micro-market-kiosk/). That's **~AU$9,000–10,000 landed (ESTIMATE)**. Add 2–3 coolers at $3–5k each, shelving at $2–4k, and CCTV at ~$1k: a **full fit-out of ~$25,000–40,000 (ESTIMATE)**. There's no AU price list, and the only route in is 365 via its partner Vendpro (2018).
- **Risks:** you're locked in to the vendor's cloud and software, the camera recognition accuracy is only the vendor's claim ("99%"), the resale market is thin, and the software licence may not be transferable. Pre-authorisation holds of $1–20 annoy customers.

### C. Niche / specialty (score 2)
- **Spec by niche (ESTIMATE):** capsule/gacha machines $500–2,000 each, mechanical, and needing a separate cashless retrofit. Frozen (−18 °C) units or a HAHA "Frozen" fridge $12,000–20,000, with higher power use. Hot food (pizza or chips robots) $30,000–100,000+ (consistent with agent 04's ESTIMATE), plus daily cleaning and food-safety registration. PPE and tools: a standard combo or locker with Nayax at ~$6–11k.
- **Rationale:** the specialist machines carry most of the risk. They have a thin AU dealer and parts base and novelty demand, and the expensive ones have very few owners to buy them back. Put the niche into **standard hardware** (a lift combo or smart fridge) so the machine can be repurposed if the niche fails.

### D. Buy an existing route (score 3)
- **Tech due diligence:** check that every machine is MDB, the reader model and contract (owned or rented, any early-exit fee), 4G and not 3G (3G closed in 2024), refrigeration test results, machine age and brand, and whether there's a Nayax or Cantaloupe export covering 12–24 months.
- **Retrofit budget per non-cashless machine (ESTIMATE):** reader $1,400–2,000 (or rental) plus harness or MDB board $200–500 plus a technician at $150–300. That's **~$1,750–2,800 per machine**. On a 10-machine route that can be **$17k–28k**, so knock it off the offer price.
- **Upside:** a fleet already on Nayax gives verifiable machine-level sales, which is the best defence against inflated takings.

### E. Franchise / licence (score 2)
- AIPVend sells a turnkey machine **from $29,970 + GST** (knowledge, Business Franchise Australia). Royal Vending sells AI smart fridge packages (new fridge, cashless, placement, 24-month warranty, 180-day re-site) listed at **$40,497** each in Craigieburn VIC and Robina QLD (SEEK Business search extracts, accessed 2026-11-04; the listing pages themselves could not be fetched).
- Against a bare fridge at ~$10k, about **$30k of each package pays for the site, training and margin**. The kit itself is fine. Check who owns the payment merchant account and the data, and whether the fridge works if you leave the franchise.

### F. Placement package (score 3)
- Typical kit is 2–5 new SVA2000/SVA5000-type combos with Nayax, at **$6k per machine** ($30k + GST for 5) up to $9–11k per machine (agent 02, routes-for-sale.md).
- At $6k per machine incl. reader, the **equipment alone is fair value** (new combo DIY ≈ $9.3–10.9k). At $10–11k there's a premium of up to ~$1–2k per machine. Ask for the model, warranty (24 months is claimed), and who holds the Nayax contract. The real risk is site quality (agents 03/09).

### G. Placement-only / asset-light (score 4)
- Locator or host roles need almost no kit. The **rent-to-trial hybrid** is the useful equipment variant: VMA rents a combo for $31.50/wk (~$1,638/yr) and Nayax rents a reader for <$1/day (~$30/mo). So a site can be trialled for **<$1,000 upfront** (delivery plus stock, ESTIMATE). Rental terms (length, buyout, maintenance) are still unverified.

## 3. Three most important findings
1. **Card fees are a provider-margin problem, not an interchange problem.** The RBA's final decision (Conclusions Paper, Mar 2026) banned surcharging on eftpos, Visa and Mastercard from **1 Oct 2026**. It cut debit interchange to **0.16% / max 8c** and consumer credit to **0.30%**; foreign cards go to 1.0% from 1 Apr 2027, and Amex is excluded (Mozo; National Law Review; RBA summary, accessed via search 2026-11-04). On a $4 vend, interchange is now only ~1c. The ~4% effective cost comes from the unattended provider's own pricing (US Nayax 5.95% for sales of $5 or less). **Negotiate with the provider; you can't pass the cost to customers.** The new rule that large acquirers must publish their fees should help comparison.
2. **The reader costs more than I first assumed.** An AU reseller prices a bought Nayax Onyx at $2,200 incl GST + $130 onboarding, then $14.70 + GST per machine per month + $20 + GST per fleet per month (Dipacci). I've corrected my earlier $600 reader estimate to **$1,400–2,000 ex GST**. For 1–5 machines, **renting (<$1/day) beats buying** on cash flow.
3. **Smart fridges cost about the same as a new combo, but their tech costs are recurring.** AU price $6k–15k+ (VMA), so it's not cheaper than a spiral machine. Platform plus card fees are ~5–8% of sales, against ~4% for a Nayax combo, and franchised fridge packages are ~4× the bare price. B-lite works if you buy the fridge yourself and the basket is $8–12; buying a fridge as a package does not.

## 4. Assumptions for other agents (ex GST)

| Item | Value | Status |
|---|---|---|
| Used combo, refurbished | $4,000 (range $3,000–5,500) | Vendor-cited range; midpoint is an ESTIMATE |
| New combo | $8,000 (range $5,500–13,000; agent 07's $7,500 is fine) | Vendor-cited |
| AI smart fridge (bare, incl. payments) | $10,000 (range $6,000–15,000+) | VMA-cited range; base is an ESTIMATE |
| Micro-market full fit-out | $25,000–40,000 | ESTIMATE |
| Franchise machine / fridge package | $29,970 / ~$40,500 | Listed prices |
| Nayax reader, bought | $1,400–2,000 + $118 onboarding (once per fleet) | AU reseller; ESTIMATE range |
| Nayax reader, rented | ~$30/mo, $0 upfront | Nayax AU headline |
| Telemetry/licence if reader is bought | $14.70/mo per machine + $20/mo per fleet | AU reseller |
| Card processing, classic machine ($3–5 vend) | **4%** of cashless sales (range 3–6%) | ESTIMATE |
| Smart fridge platform + card | **6%** of sales + $50–90/mo (range 4–8%) | ESTIMATE from US/EU pricing |
| Cash share | 0–15% (cashless-only is the default) | ESTIMATE |
| Delivery and install | $350 per move ($200–500) | ESTIMATE |
| Repairs | $300–600/yr per used machine; ~$150/yr new under warranty | ESTIMATE |
| Retrofit of a non-cashless route machine | $1,750–2,800 | ESTIMATE |
| Electricity, chilled machine | $500–1,150/yr (often paid by the host) | ESTIMATE |
| Warranty | 12 months new (dealer); 24 months claimed by package sellers | Partly cited |

## 5. Conflicts with other agents' knowledge bases
- **04 Product & Pricing** assumes card fees of 1.5–2% + 5–10c. That's retail-terminal pricing. Unattended Nayax-class providers charge more; use 4%. On a $4 vend, 04's formula gives ~3.6%, so the gap is small at $4 but larger on $2–3 items.
- **01 Market** suggests smart fridges might have "lower capital cost than a spiral machine". **Not supported**: AU fridges cost $6k–15k+, against $5.5k–13k for new combos and $3k–5.5k for used.
- **07 Financial:** I now **agree** with its $1,400 reader and $14.70/mo licence; my old $600/$30 pairing was too low on purchase. Its smart fridge "platform/card 6% + $45/mo" sits at the low end of my $50–90/mo; keep it for now.
- **00 Lead:** "$8k–25k per fridge" overstates a bare fridge, though it's a fair range if packaged. Archetype C's "hot-food robots tens of thousands" is consistent with 04's $30k–100k+.
- **02 Competitor:** packages at "$9–10k per machine incl. site" are close to the cost of a **new** bare combo with a bought reader ($9.3–10.9k). So the site premium is small against new kit and large (~$4–5k) against used DIY.

## 6. What I verified or changed this phase
- **Confirmed:** the surcharge ban from 1 Oct 2026, and the new caps (debit 0.16%/8c, consumer credit 0.30%, foreign cards 1.0% from 1 Apr 2027, Amex excluded). Also the Nayax AU rental at <$1/day. Both are now updated in payments-and-telemetry.md.
- **Changed:** reader purchase cost raised from $600 to $1,400–2,000, which updates the landed-cost table in suppliers-and-prices-au.md. The smart fridge AU range is now cited (VMA), not only an ESTIMATE. Added franchise fridge package prices of $40,497 (Royal Vending).
- **Still unverified:** Nayax AU's direct % rate, HAHA fridge price, any AU micro-market kiosk price, and VMA rental terms. All of these need written quotes. Pages on seekbusiness.com.au, nayax.com and rba.gov.au can't be fetched in this session.
