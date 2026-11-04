# Phase 3 Challenge: Devil's Advocate (09)

**Date:** 4 Nov 2026 · AUD · Greater Melbourne
**Inputs:**
- The eight Phase 2 analyses (`agents/0{1..8}-*/analysis/phase2-analysis.md`) and `agents/07-financial-modeller/analysis/option-model.csv`.
- `agents/00-lead-strategist/knowledge/business-model-archetypes.md` and `decision-framework.md`.
- My own knowledge base: `failure-modes.md`, `hidden-costs.md`, `kill-criteria.md` and `risk-register.md`.
- 6 web searches run on 4 Nov 2026 (§11).

**Labels.** I use the option letters from 07's CSV, which match 00's labels: A, A+C, A+B-lite, A→D, D (route), E (franchise), F (package), G (locator). **My Phase 1 knowledge files use the older BRIEF order:** C = micro-market, D = niche, E = route, F = franchise. When you read `risk-register.md` or `kill-criteria.md`, convert as follows: my E is now D, my F is now E/F, and my D is now C.

**All figures marked ESTIMATE.** These are my own re-runs of 07's sensitivity table. I scaled linearly from its rows, for example "sales −30% → A year 3 $6.5k" gives about $470 of year-3 profit per 1% of sales for A. Interactions between the adjustments are ignored, so treat the results as directional.

---

## 0. Headline challenges (read this if nothing else)

1. **The $175/week base is too high for a beginner.** It is an average of established fleets, so it describes the sites that survived. A beginner gets the sites that are left. The evidence behind the figure is weak:
   - It rests on vendor blogs, one forum rule of thumb ("aim for a minimum of $160/week") and two broker snippets (07 `revenue-benchmarks.md` #2–#5).
   - The same table also lists a Sydney route at about **$59/week** (#6). A US survey (The Hustle, in 00's file) gives about US$309/month, which is roughly **A$110/week**.
   - 00's own rule 3 says to model the **25th-percentile site** (decision-framework Step 6). 07's own KB says "plan on Low–Base for year 1", yet the model ramps every site to Base by month 3.
   - A planning base of **$140–150/week** would be honest. At that level, A's year-3 profit falls from $20.7k to roughly **$7–9k** before depreciation.
2. **"Profit before labour, tax and depreciation" makes every machine-owning option look better than it is.**
   - The national minimum wage rose to **$26.44/h on 1 Jul 2026** (Fair Work, §11). Before depreciation, A's year-3 return is $24.9/h, which is **already below that**.
   - After depreciation over 8 years on 15 used machines (≈ $8.2k a year), A earns **≈ $15/h** and A→D earns **≈ $22/h**. Opportunity cost and tax come on top of that.
   - At the team's own Base, the vending options are a low-paid job with capital at risk. Year 3 is $17–23k for 11–20 h/week (07 §7).
3. **The favourite, A→D, depends on a route that the evidence says does not exist at that price.**
   - 07 buys 10 machines for $42.7k, which is **$4.3k per machine**. That is less than a used combo placed by the operator ($4.9k).
   - Melbourne asks are about **$9.1k per machine** (11 machines for $100k + GST). A single machine in Colac is listed at $9k + GST (§11).
   - 02 found no genuine Melbourne route listed in 2026.
   - So A→D is really **A plus an option that may never be exercisable**. Its year-3 lead over A is $1.0k, which is well inside the model's noise. It should be presented that way.

---

## 1. A: Classic DIY cluster (used combos), 8 → 15 machines

**Strongest case against.** At Base, A's unit test **fails the team's own hard gate**.
- 00's gate 6 requires more than **$150/month** contribution per machine.
- 07 shows **$109/month in year 1 and $144/month from year 3** (CSV `unit,used_combo`).
- In other words, the core option is below the hurdle the Lead set, even before overheads ($82/month after overheads).

**Assumptions most likely wrong**

| Assumption (07) | Why it is suspect | Year-3 effect (A base $20.7k) |
|---|---|---|
| $175/wk by month 3 | Survivor bias; 25th-percentile rule; beginner sites (§0.1) | At $150/wk (−14%): **≈ −$6.6k → $14.1k** |
| COGS glides from 50% to 45% by year 3 | Assumes buying improves while CPI runs at ~4% and the price ceiling is retail (04: $4.50 Coke) | Stuck at 50%: **$14.5k** (07 row COGS +5) |
| 10% commission | 03 tiers: 10–15% at 200+ staff sites and 15–30% when tendered. Better sites cost more | At 15%: ≈ −$6.2k; at 20%: **$8.4k** |
| Host pays electricity | 07 KB: $700–1,500/machine/yr if the host asks for it. Hosts are absorbing rising Victorian tariffs | At $1k × 15 machines: **≈ $5.7k** |
| Flat seasonality | 07 KB itself: winter drinks −25%, industrial Christmas shutdown, campus breaks −40–70% | About −5% of sales ≈ −$2.4k |
| No van or food-permitted storage at 15 machines | 06: about 225 kg/wk of stock; mainstream self-storage bans food; a used van costs about $25k | About −$3–5k a year |

**Plausible pessimist case (ESTIMATE).** $150/wk + COGS at 48% + 12% commission + seasonality + van/storage gives **≈ $1–3k** of year-3 profit before depreciation. That is **negative** after the ≈ $8k depreciation, and capital at risk is ~$28.6k.

**Hidden costs missed or understated**
- Lost revenue while a site is re-sited. 07 charges $350 per re-site, but it is unclear whether the 1–2 dark months and the new 60/85/100 ramp are applied. 07 should confirm.
- Cash handling. The CSV assumes 85% cashless, which implies cash mechs are fitted, but 05's spec is cashless-only. Either cash sales are lost (01: keep cash at blue-collar sites) or coin-mech repairs, banking and break-in risk are missing.
- Parking fines and loading-zone time at inner sites.
- Test and tag, labels and anti-tilt brackets (08: small).
- At 15 machines, 07's overhead line ($1,250 + $240 per machine = $4.85k) has to cover $20m PL ($1.5–3.5k, 08), accounting ($0.5–1.5k), software and storage. That is tight.

**90-day tripwires (A pilot, 2–3 machines)**
- Kill or re-site any machine below **$120/wk gross by weeks 5–8** after the ramp.
- **Tighten 00's gates, which are inconsistent with the model:**
  - 00's GO is "$600/month" ≈ $138/wk, which 07 maps to about $60/month contribution.
  - 00's STOP is "<$300/month" ≈ $69/wk, which is below 07's Low.
  - Replace them with **GO ≥ $175/wk on at least 2 of 3 machines; STOP if no machine exceeds $140/wk after one re-site.**
- Logged time above **1.5 h per machine per week** at day 90, excluding prospecting.
- Payment costs above 6% of gross.
- Fewer than **3 placements per 100 genuine walk-ins**. That is the bottom of 03's funnel, which is itself unverified.
- Any host asking for an electricity contribution, or more than 12% commission, at a site below $200/wk.

**Verdict: KEEP-WITH-CONDITIONS.** It is the cheapest way to buy real data, and every other surviving option depends on it. It must be presented to the founder as **a paid apprenticeship, not an income**, until telemetry shows sites at ≥ $175/wk.

---

## 2. A+C: Classic + Asian-snack niche (3 of 15 machines)

**Strongest case against.**
- The financial gain is **$0.9k/yr at Base** (07), which 07 itself says vanishes under a 12% seasonal dip.
- The niche sites are the most seasonal and the most exposed to policy: PBSA and campus. 01 reports international commencements down ~15% y/y and Dec–Feb dips.
- 04's 5/5 score rests on a **59% gross margin built from retail-derived trade-cost guesses**. Shin Cup trade cost of "$1.20–1.50" is an ESTIMATE from a sold-out retail listing.
- No Australian velocity data exists for any niche range (01 open question #11).

**Assumptions most likely wrong**
- **Volume held at classic Base.** The price premium is assumed to offset campus breaks. If niche volume runs 20% below classic, the niche loses money relative to a plain combo in the same slot.
- **Hot water at every noodle site.** 06 flags this as a planogram mistake if it is not agreed in writing.
- **Spoilage of 2–4%** with imported 6–9-month best-befores and slow turns. Not evidenced.

**Hidden costs.**
- An extra supplier relationship with unknown minimums (06).
- CDS-registered supply only (08).
- Korean banana milk may move the business up a food class.
- Chilled niche items need a refrigerated combo.

**90-day tripwires**
- **Test before buying a dedicated machine.** Swap 8–10 spirals in an existing combo to Asian lines.
- Kill if those spirals' sales per slot are **below the classic average by weeks 6–10**.
- Kill if month 3 is below **70%** of month 1 (00's novelty gate).
- Kill if waste is above 4%.

**Verdict: KEEP-WITH-CONDITIONS**, as a planogram layer inside A rather than a separate option. It should be scored as a site-winning differentiator (02), not as a margin lever.

---

## 3. A+B-lite: Combos + small smart fridges (11 combos + 4 fridges)

**Strongest case against.** There are three problems.
- **No Australian smart-fridge sales figure exists.** 07's $350/wk is an ESTIMATE. My search found only a European vendor's business case (Selfly: €1,500–2,500/month, a seller's model) and a 2016 Vending Times piece in which an Australian operator said late-night food vending at hospitals and industrial sites had historically underperformed.
- **Funded competitors place fridges free:** Morsl via Charter Hall estates, plus Nouri, Machines Vending and Coke&Go (02).
- **07's waste and basket assumptions contradict each other (§9 #5).** Here is how:
  - A **$9 basket** needs fresh food.
  - Fresh food means **12% waste** (06 base), not 7%.
  - Fresh food also means **Class 3 registration, possibly charged per machine** (08: Casey $175 each, Dandenong $307).
  - 06 recommends starting with long-life lines, but those carry a **~$5–6.50 basket**. At 39 transactions a week that is about **$220–250/wk**, not $350.

**Numbers if wrong (ESTIMATE).**
- Fresh waste at 12% instead of 7% costs about −$69/month per fridge.
- A Class 3 fee of $175–310 per machine costs about −$15–26/month.
- Together they cut the fridge unit from $198 to **about $105–115/month** on $11,150 of capex, so unit payback goes from about 56 months to about 100.
- A+B-lite's year 3 falls from $22.8k to **about $18–19k at 20 h/wk (≈ $18/h before depreciation)**, with $42.4k at risk and fridges that "resell poorly" (05).

**Hidden costs.**
- 2–3 visits a week per fresh fridge.
- Eskies and a commercial upright fridge at base ($1.5–3k, 06).
- Pre-authorisation disputes and chargebacks.
- Spoilage and recall insurance ($1.5–3.5k, 08).
- Camera privacy notice.
- **No small-volume Melbourne sandwich supplier was found** (06).

**Gate inconsistency.** 00's B test says **STOP below $400/wk** and GO at $800/wk. That would stop 07's Base fridge ($350) and treat 07's High ($600) as a failure. The Lead and the Modeller need one number.

**90-day tripwires (first fridge, added only once A has at least 3 machines at ≥ $175/wk)**
- Site has **≥ 60 staff per shift** and no café or servo within 300 m. The site manager signs a 12-month letter.
- Long-life phase: below **$220/wk ex GST by week 8** means kill or relocate.
- Before adding fresh food: shrink plus waste above **7%** for two consecutive months means stop fresh food.
- Fridge servicing above **2.5 h/wk** means stop.

**Verdict: KEEP-WITH-CONDITIONS**, but only as a year-2 add-on. It is not a starting option.

---

## 4. A→D: Learn on 5 machines, then buy a 10-machine route (current favourite)

**Strongest case against.**
- The route stage is priced at a level the market does not offer (§0.3). Either the route that can be bought at $4.3k per machine is a weak route, or a decent route will cost about twice the modelled price.
- On top of that, A→D receives the **most favourable assumptions in the model:**
  - 0.8 h per route machine against 1.0 h per own machine.
  - Route churn of **5%/yr after year 1**, against 12% on own-built sites and 10–20% from 02/03.
  - Route COGS at 45% from the day of purchase.
- Its advantage over A (+$1.0k year 3, +$5/h) comes from these choices, not from evidence.

**Numbers if wrong (ESTIMATE)**

| Change | Effect |
|---|---|
| Route bought at the Melbourne ask level (~$9k/machine = $90k) | Peak funding rises from $74.6k to **about $122k**. Cash payback moves from 57 months to **roughly 90+ months** |
| Route machines take 06's scattered **2.0–2.5 h/wk** instead of 0.8 | Hours go from 14 to about **26 h/wk**, so the rate falls from $29.8/h to **about $16/h** |
| Route churn at 12%/yr instead of 5% | Year-3 route profit falls by about $1–1.5k, plus re-site costs |
| Seller's sales 30% overstated | Year 3 is **$7.8k** (07 row) on about $75k invested |
| After depreciation (≈ $5.8k/yr) | ≈ **$22/h** at Base, which is below the minimum wage |

**Cross-check of the capital at risk.**
- 07's prose says "~$27k in stage 1 (only ~$17k beyond resale)", but the CSV says `capital_at_risk 44,600`. The score of 4 ("best risk-adjusted") uses the smaller figure.
- Comparing A→D's stage 1 with the full commitment of the other options flatters A→D.

**Hidden costs.**
- Legal and accounting due diligence of **$4–12k** (08), which is lost if the deal fails. It may need to be paid more than once.
- Retrofit at $1.75–2.8k on 3 of 10 machines, which is already modelled. At 06's warning about non-MDB or 3G fleets, retrofit could reach $17–28k.
- A one-off write-off of 5–10% of handover stock.
- Integration weeks running at +30–50% hours (06).

**Tripwires**
- **Day 90 (stage 1):** the A tripwires above.
- **Month 9:**
  - If no route at **≤ $5.5k per machine** with ≥ 12 months of telemetry has been found within 25 minutes of the cluster, **formally drop the D stage** and re-plan as A.
  - Pre-commit to that now, so that sunk cost does not push the founder into paying a 3× ask.
- **Pre-purchase:** my P4–P6 tripwires, plus 08 §3.
  - Host consent is a condition precedent for the top-revenue sites.
  - Earnings are written into the contract as warranties.
  - A 6–12-month clawback applies to lost sites.

**Verdict: KEEP-WITH-CONDITIONS.** Rename it **"A, with an option to buy"**. It must not be scored above A on the strength of a route stage that may never happen.

---

## 5. D: Buy a 12-machine route on day one

**Strongest case against.**
- The supply does not exist at the modelled price (02: no genuine Melbourne route in 2026; asks run at about 3–3.3× profit).
- A beginner cannot verify a seller's numbers. Brokers present gross margins of 65–69% that 04 rejects.
- One sick week leads to stock-outs and then site losses (06).
- The single biggest cheque is written with no operating knowledge.

**Numbers if wrong.**
- At the Melbourne ask level of about $9k per machine ($108k + stock) instead of $51.8k, the extra ~$56k costs about **$5.3k/yr** at 07's 9.5% loan rate. Year 3 goes from $17.4k to **about $12k**, and payback is **about 6–8 years**.
- If sales are overstated by 30%: **$6.5k** of year-3 profit.
- If site loss in year 1 is 20% (top of 03's range) instead of 15%: year-1 profit falls by about $1.5–2k.

**Hidden costs.**
- Due diligence of $4–12k.
- PPSR searches. Financed machines or rented readers may belong to a financier (08).
- Goodwill is not depreciable (07 §6).
- The age of any included van.
- Re-papering host agreements, which gives every host a moment to leave.

**Tripwires.**
- 00's D gate, with these additions:
  - Walk away above **2.5× verified SDE or above $6k per machine**.
  - Walk away if less than 70% of revenue is under written, assignable agreements.
  - Walk away if the seller will not allow 3+ host calls before signing.
- After settlement: losing more than 20% of revenue within 6 months, or actual net below 70% of the represented net, triggers the clawback.

**Verdict: KEEP-WITH-CONDITIONS.** It is opportunistic. Present it as "act only if a qualifying deal appears", not as a plan.

---

## 6. E: Franchise AI-fridge packages

**Strongest case against.**
- About $30k of each $40.5k package buys a site and training, not an asset (05).
- The model never pays back at **any** sales tier (07). Year 3 is $0.8k on $131.5k of peak funding, which works out to **$2.1/h**.
- The 6% royalty is the floor of an undisclosed range. At 12%, it is negative at Base.
- No instant asset write-off is available for assets above $20k (07 §6).

**Verdict: DROP.** It would be reconsidered only if a disclosure document showed **zero royalty, operator-owned merchant and telemetry accounts, sites held in the franchisee's name**, and ≥ 5 former franchisees reachable. Even then, the price would need to fall below about $15k per fridge.

---

## 7. F: Placement package (5 new combos + "secured" sites, $30k + GST)

**Strongest case against.**
- 07 shows **payback beyond 10 years at Base** and $8.8/h.
- The re-site guarantee lasts 180 days with an undisclosed takings threshold (03).
- Sites are on 12-month rolling terms, scattered from Cowes to Ballarat (02), and 03 estimates 30–50% need re-siting.
- This is the business-opportunity pattern the ACCC has pursued (Michigan Group, Global Pre Paid).

**Verdict: DROP.** Keep only the red-flag checklist in the synthesis, because the founder will be marketed these packages.

---

## 8. G: Placement-only (locator)

**Strongest case against.**
- The revenue line is invented: "$300/placement, 2/month". **No Australian fee is published** (07, 02).
- 01 scores the demand 1/5 because hosts already get free service and package sellers bundle locating.
- The CSV's COGS and commission sensitivity rows for G are placeholders that do not apply.
- A locator charging ongoing fees for a "system" may drift into franchise law (08).

**Verdict: DROP as a business.** **Keep its one good idea** as a step inside A: **sign letters of intent from 3–5 sites before buying any machine** (a "site-first" approach). That turns 03's unverified 3–6% conversion into a measured number at almost no capital cost.

---

## 9. Cross-agent inconsistencies (file + figure)

| # | Conflict | Where | Why it matters |
|---|---|---|---|
| 1 | Option letters differ | 09 KB (C micro-market, D niche, E route, F franchise) vs 00 and 07 CSV (B fridge, C niche, D route, E franchise); flagged by 01 §4.2 | Kill tables could be attached to the wrong option in the synthesis |
| 2 | A fails the Lead's unit gate | 00 decision-framework gate 6 (> $150/month) vs 07 CSV used_combo base $109 (yr 1) / $144 (yr 3) | The core option fails its own hurdle at Base |
| 3 | A 90-day gates are too loose | 00 Step 5A: GO $600/month (~$138/wk), STOP < $300/month (~$69/wk) vs 07 Low $100 / Base $175 | The gates would pass loss-making machines |
| 4 | Fridge gate would stop the model's Base case | 00 Step 5B: STOP < $400/wk vs 07 fridge Base $350/wk | Either the gate or the base is wrong |
| 5 | Fridge waste vs basket | 07 §1: 7% waste with a $9 basket vs 06 §3: 12% for fresh, and long-life first (lower basket); 04: 5–15% | B-lite profit is overstated by about $70/month per fridge |
| 6 | Fridge site size | 00: 100–300 staff; 02: 20–100; 03/06/07: 40–150; 01: 50–80 per shift | The target segment is undefined |
| 7 | Churn | 07: own sites 12%/yr, route 5% after year 1; 02: 10–20%; 03: 10–15% | Favours D and A→D without evidence |
| 8 | Cash share | 07 CSV 85% cashless; 07 KB 80/20; 05: cashless-only, 0–15% cash; 01: keep cash at blue-collar sites | Either lost cash sales or missing cash-handling costs |
| 9 | A→D capital at risk | 07 prose "~$27k / ~$17k beyond resale" vs CSV `capital_at_risk 44,600` | The "best risk-adjusted" score uses the smaller number |
| 10 | Per-machine profit | 07 KB `scenarios-1-5-20.md`: 20 machines ≈ $41k for ~15 h/wk (~$2.05k/machine) vs phase 2 A: 15 machines $20.7k (~$1.38k/machine) | The synthesis may quote the older, rosier figure |
| 11 | Minimum wage | 09 KB and 07 use ~$24.95–25; Fair Work NMW is **$26.44 from 1 Jul 2026** | Every "$/h" comparison falls below the minimum wage |
| 12 | Water GST provision | 04: reg 38-3.01 vs 08: probably 38-3.02 (2019 regulations) | Small, but cited as an upside |
| 13 | Package premium | 00: $1.5–3k; 02: $3–4.5k; 05: "fair value vs new" | F's case against stands either way |
| 14 | Route price per machine | 07: $4.3k/machine (A→D), $4.3k (D) vs listings ~$9k/machine (02, 07 KB #8, Colac $9k) | The favourite option's stage 2 is mispriced |

---

## 10. Where the team is collectively over-optimistic

1. **Sales base and ramp.** Every agent adopted $175/wk (01, 03, 07). Nobody modelled a beginner at the 25th percentile, which 00's rule 3 requires. The ramp reaches 100% in 3 months, while 07's own KB says 6–12 weeks to steady state and "plan Low–Base for year 1".
2. **Labour treated as free.** The "$/h" figures exclude depreciation, tax and the cost of capital, and they sit below the 2026 minimum wage.
3. **The COGS glide path.** About $6k of A's $20.7k in year 3 comes from assuming buying improves to 45%, while 4.3% CPI (secondary source) erodes it.
4. **Clustering and conversion.** The team assumes 15 sites in one 10–15 km cluster, at 3–6% conversion (03 ESTIMATE). That cluster is the most contested segment (02: SVA, Ausbox, Machines Vending, Morsl via Charter Hall).
5. **Route supply.** Two options (D, A→D) depend on a seller appearing at about 2.5× SDE. There is no closed-sale data for Australia. A US broker guide puts routes at 12–24 months of net profit (§11), but Melbourne asks imply about 5× the modelled SDE per machine.
6. **Groupthink on A→D.** Scores of 4, 4, 4.5, 4, 5, 4 and 4 across 01–08 reward its flexibility, and none tested whether stage 2 can be executed. Flexibility is real, but it is the flexibility of A.
7. **The goal mismatch is underplayed.** 07 §7: "No option makes a full-time income by year 3 at Base." That should be the first sentence of the synthesis, not a footnote.

## 11. Evidence-quality problem

- **Page fetches were blocked for all agents** on the key sources: bsale.com.au, realcommercial.com.au, seekbusiness.com.au, businessforsale.com.au, nayax.com, rba.gov.au and kenresearch.com (01, 02, 05, 07, 09 KB).
- Most Australian numbers are **search-engine summaries** of broker and vendor pages. Those summaries are machine-generated and can mis-state figures. This session's search returned a summary that turned "$400–500/month net" into "about $40 a week ROI".
- One key listing (11 machines, $100k) is labelled **"AI generated, contact seller to confirm"**.
- There is **no audited Australian per-machine revenue series**, no closed route-sale price, no Australian smart-fridge sales figure, no published locator fee, no franchise royalty and no Nayax Australia rate card. My searches today confirmed every one of these gaps.
- Many inputs are US or EU sources: shrink, fridge business cases, multiples and micro-market thresholds.
- **Consequence:** the Low/Base/High bands are opinion intervals, not measured distributions. The 90-day pilot is the first real evidence this project will have. Size it to buy information, not income.

### Searches run (4 Nov 2026)
- AU per-machine takings: only rules of thumb ($160/wk minimum target; $650–750/month), no measured data. https://www.realcommercial.com.au/news/sad-reality-of-teens-12k-side-hustle ; https://www.vendingmachinesaustralia.com.au/used-vending-machines-compare-costs-roi-free-machine-options
- National minimum wage: **$26.44/h from 1 Jul 2026**. https://www.fairwork.gov.au/pay-and-wages/minimum-wages
- Route multiples: no Victorian closed sales. US broker guide: 12–24 months of net profit. Colac: 1 machine at $9,000 + GST. https://vmfsusa.com/blogs/business/vending-machine-routes-for-sale-what-you-need-to-know-before-buying ; https://bsale.com.au/listing/rare-opportunity-for-colac-vic-642071 ; https://bsale.com.au/listing/rare-opportunity-for-melbourne-vic-671667
- Commission: 10% of gross, paid 6-monthly, is consistently seen in SVA package listings (childcare, schools, aged care, gyms). No warehouse data. https://bsale.com.au/listing/new-vending-business-melbourne-vic-687018
- Nayax Australia pricing: not public. US 5.95% blended or 2.5% + 10c with a US$9.99/month plan; Ireland €12/month + 3%. The 4% assumption is plausible but unverified. https://candymachines.com/nayax-credit-card-reader ; https://vending-machines.ie/product/vpos-touch/
- Smart-fridge sales: no Australian figure. Vendor model (EU) €1,500–2,500 per cabinet per month; 2016 Australian operator comment on underperforming late-night food vending. https://selflystore.com/thought-leadership/smart-vending-machine-business-case-example ; https://www.vendingtimes.com/blogs/smart-fridge-and-shelf-stable-meals-show-great-potential-in-australia/

## 12. Verdict summary

| Option | Verdict | Single condition that matters most |
|---|---|---|
| A Classic DIY cluster | **Keep-with-conditions** | Framed as an apprenticeship; tightened 90-day gates (GO ≥ $175/wk) |
| A+C niche | **Keep-with-conditions** | A planogram layer inside A, tested in spirals before buying a machine |
| A+B-lite | **Keep-with-conditions** | Year 2 only; long-life first; one agreed $/wk gate (not 00's $400 STOP) |
| A→D (favourite) | **Keep-with-conditions** | Renamed "A with an option to buy"; drop the D stage at month 9 if no route at ≤ $5.5k/machine |
| D buy route | **Keep-with-conditions** | Opportunistic only: ≤ 2.5× verified SDE and ≤ $6k/machine |
| E franchise | **Drop** | Never pays back at any tier |
| F placement package | **Drop** | Payback beyond 10 years; keep the red-flag checklist |
| G locator | **Drop** (as a business) | Keep "site-first letters of intent" as a step inside A |

Hand-off to 00: under decision-framework rule 5, each objection above needs a mitigation or a "risk accepted" line in the synthesis. **Hand-off to 07:**
- Rerun Base at $150/wk with a 6–12-week ramp, seasonality and depreciation.
- Report $/h against the $26.44 minimum wage.
- Price the A→D route stage at $6k and $9k per machine.
- Fix fridge waste at 12% for fresh lines.
- Reconcile the A→D capital-at-risk figure.
