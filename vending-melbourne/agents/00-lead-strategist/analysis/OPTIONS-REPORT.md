# Melbourne Vending Business: Options Report (Phase 4 Synthesis)

**Owner:** 00 Lead Strategist · **Date:** 4 Nov 2026 · AUD, P&L ex-GST · Greater Melbourne
**Inputs:** Phase 2 analyses of 01–08 (`agents/0{1..8}-*/analysis/phase2-analysis.md`), 07's model (`agents/07-financial-modeller/analysis/option-model.csv`), 09's challenge (`agents/09-devils-advocate/analysis/phase3-challenge.md`), and my knowledge base (`knowledge/decision-framework.md`, `synthesis-template.md`). I ran no new web searches in this phase.

**How to read the numbers.**
- Every financial figure is an **ESTIMATE**. I either took it directly from 07's CSV (tag `07`) or recomputed it from 07's figures with the arithmetic shown (tag `00 calc`).
- "Profit" follows 07's definition: operating profit **before owner labour, tax and depreciation**, unless a line says "after depreciation".
- Option letters follow 07's CSV and 00's archetype file: A = classic DIY, B = smart fridge, C = niche, D = buy a route, E = franchise, F = placement package, G = locator.
- **Not advice.** This is general information. Get a registered tax agent, a Victorian solicitor and an insurance broker before committing money (08).

---

## 0. Executive summary

**Bottom line.**
- At realistic beginner sales, **small-scale vending in Melbourne is side income, not a job.**
- At a beginner-realistic **$150 per machine per week**, no option pays the **$26.44/h national minimum wage** (Fair Work, from 1 Jul 2026, cited by 09) once machine depreciation is counted. The same holds by year 3.
- The best options make **about $14–15k a year by year 3**, for 10–20 hours a week, with $27–80k of capital in play.
- The economics only work with sites that average **about $180–230 per machine per week** (the exact figure depends on the option; see §4). Some sites will reach that level, but the founder can't know which ones until machines are in place and trading.
- So the right first move under **every** budget is the same: a **small, cheap pilot that buys real sales data**, framed as a **paid apprenticeship**. Treat it as tuition, not income.

**Options kept (all "keep with conditions"; none is a default answer):**

| # | Option | Capital (first 12 m / peak) | Owner h/wk (yr 3) | Yr-3 profit at $150 / $175 / $220 per wk | Risk |
|---|---|---|---|---|---|
| 1 | **A: Classic DIY cluster**, site-first (8 → 15 used combos) | $39.5k / $58.6k | 16 | **$13.9k** / $20.7k / $32.9k | Medium |
| 2 | **A+C: A with an Asian-snack planogram layer** | $39.4k / $58.0k | 16.3 | **$14.7k** / $21.6k / $34.0k | Medium |
| 3 | **A+B-lite: A, plus smart fridges from year 2** | $47.6k / $80.4k | 20 | **$15.4k** / $22.8k / $36.1k (≈ −$4k if fresh-led) | Medium–High |
| 4 | **A with an option to buy** (replaces "A→D") | $27.3k stage 1; $75k if the route is bought at the gate price, **$122k at Melbourne asks** | 14 | **$15.1k** / $21.7k / $33.6k at the gate price; **$10.6k** / $17.2k / $29.1k at asks | Low (stage 1) → High (stage 2) |
| 5 | **D: Buy a route (opportunistic only)** | $62.7k at 2.5× SDE; ~$119k at asks | 10.6 | **$12.2k** / $17.4k / $26.8k at 2.5×; ~$12.1k base at asks | High (verification) |

Sources: 07 CSV. The $150 and $220 columns are interpolated by 00 calc (§2.2).

**Dropped:**
- **E (franchise):** it never pays back at any sales tier.
- **F (placement package):** payback is more than 10 years.
- **G (locator):** no paying demand. Its one good idea, **"sign sites before buying machines"**, is folded into A.

**Evidence caveat.**
- Page fetches were blocked for every agent on the key Australian sources (bsale, seekbusiness, nayax, RBA and others; 09 §11).
- Most Australian figures are search-engine summaries of broker and vendor pages.
- None of the following exists:
  - an audited Australian per-machine sales series
  - a closed route-sale price
  - an Australian smart-fridge sales figure
  - a published locator fee or franchise royalty
- The low/base/high bands are therefore **informed opinion, not measured distributions**. The 90-day pilot will be the first real evidence.

**The biggest unknown that could change the recommendation:** what a beginner's machines actually sell per week in the chosen cluster.
- Below about $140/wk, every machine-owning option is marginal.
- Above about $220/wk, A and its variants become a reasonable part-time business.

**Next action this week:**
1. Pick one cluster. The default is the **South-East: Moorabbin–Braeside–Dandenong South** (§8, conflict 3).
2. Walk in to 30–40 sites to get **letters of intent from 3–5 hosts before buying any machine.**

---

## 1. Context recap

- **Starting point:** zero machines, sites and supplier accounts, in Greater Melbourne. Budget, hours and niche are not fixed.
- **Market (01):**
  - The market is mature: ~3–4% nominal growth, Victoria ~A$250–750m a year (ESTIMATE). Returns come from site selection and route density, not from market tailwind.
  - Growth is in formats (smart fridges and micro-markets), not in volume.
  - Melbourne CBD office vacancy is 18.9% (Jul 2026), which keeps CBD offices weak.
- **Competition (02, 03):**
  - Every operator offers hosts a free machine and free service, at 0–10% commission, on 12-month rolling terms. Sites are easy to win and easy to lose.
  - The funded fridge and micro-market players (Morsl via Charter Hall, Nouri, Machines Vending, Coke&Go) own the large sites.
  - The beginner's gap is **closed workplaces of 40–150 staff**, where one site manager decides.
  - No genuine Melbourne route came up for sale in 2026.
- **Operations (06):**
  - Density is the main lever: 20 machines take about 20 h/wk if clustered and about 30 h/wk if scattered.
  - Ambient stock (packaged snacks and drinks) needs only a car and a garage up to about 10 machines.
  - Ordinary self-storage bans food.
- **Regulatory must-dos (08):**
  - ABN.
  - Voluntary GST registration, recommended so the 10% GST on machines can be recovered (07).
  - FoodTrader **Class 4 notification** ($0) for packaged stock. Fresh food lifts the **whole business to Class 3**, and some councils charge per machine (Casey $175 each).
  - $20m public and products liability insurance: $0.7–3.5k a year.
  - A written licence agreement with each host.
  - No card surcharging (ban from 1 Oct 2026, 05).
  - Healthy Choices rules are mandatory at **public** health services only (03, 04).
  - Franchising Code: 14 days' disclosure before signing, then a 14-day cooling-off period.
  - The ACL covers placement packages.
- **Tax (07):**
  - Non-commercial loss rules: a 1–3-machine pilot with less than $20k of sales will usually have its losses **deferred**, not offset against salary.
  - Machines under $20k can be written off instantly. The permanent $20k threshold is reported as passed, but Royal Assent is not confirmed (08).

---

## 2. Base case, rebased, and how the headline numbers were recomputed

### 2.1 Key assumptions (07's base, with 00's changes in bold)

| Assumption | Base | Low | High | Source |
|---|---|---|---|---|
| Weekly gross per classic machine (incl GST) | **$150 (planning base, ~25th percentile)** · $175 = target · $220 = strong | $100 | $300 | 07; rebased per 09 §0.1 and decision-framework rule 3 |
| Weekly gross per smart fridge (incl GST) | $350 at 07's base; ~$300 at the $150-equivalent tier; **long-life-only ~$220–250** | $200 | $600 | 07; 09 §3 |
| COGS, classic | 50% yr 1 → 47.5% yr 2 → 45% yr 3+ (**sensitivity: stuck at 50% = −$6.2k on A yr 3**) | | | 04, 07 |
| Host commission (% of ex-GST sales) | 10% | 0% | 20% | 01, 02, 03, 07 |
| Card / telemetry | 4% of cashless sales (~3.4% of revenue); reader rented at ~$30/mo | 3% | 6% | 05 |
| Used combo, placed | $4,350 + $550 stock | $3,000 | $5,500 | 05 |
| New combo + bought reader | $9,300–10,900 | | | 05 |
| Smart fridge, placed | $10,350 + $800 stock | $6,000 | $15,000+ | 05 |
| Service time | 1.0–1.1 h per machine per week clustered; 2.0–2.5 h scattered; +3 h/wk prospecting while building | | | 06, 07 |
| Vehicle | $0.88–0.91/km (≈ $8–12 per machine per week clustered) | | | 06, 07 |
| Insurance ($20m PL + products) | $0.7–1.5k (1–3 machines); $1.5–3.5k (5–15) | | | 08 |
| Route valuation | Walk-away at **the lower of 2.5× verified SDE and $5.5–6k per machine**; Melbourne asks ≈ $9k per machine | | | 07, 09, 02 |
| Shrink and waste | Classic 2%; Asian niche 3%; fridge long-life 4%; **fridge fresh 12%** | | | 06 |
| Depreciation (for $/h after depreciation) | Machines over 8 years: A ≈ $8.2k/yr at 15 machines; A+B-lite ≈ $11.2k; A-with-option ≈ $5.8k; D ≈ $3.8k (machine share of the price only) | | | 09; 00 calc |
| Minimum-wage benchmark | **$26.44/h** | | | Fair Work via 09 |

### 2.2 Recalculation method (transparent, linear, ESTIMATE)

07's CSV reports year-1 and year-3 profit at three sales tiers: Low $100, Base $175, High $300 per week. I did not re-run the simulation. I **interpolated linearly between 07's own tiers**:

- **$150/wk** lies 2/3 of the way from Low to Base: profit = Low + (2/3) × (Base − Low).
- **$220/wk** lies 0.36 of the way from Base to High (45 ÷ 125): profit = Base + 0.36 × (High − Base).

Worked example, A year 3:
- $150/wk: 0.4 + (2/3) × (20.7 − 0.4) = **$13.9k**.
- $220/wk: 20.7 + 0.36 × (54.6 − 20.7) = **$32.9k**.
- Cross-check: 07's "sales −30%" row ($6.5k) implies about $473 of profit per 1% of sales. $150 is 14.3% below the base, so 20.7 − 14.3 × 0.473 = $13.9k. Same answer.

Per machine (used combo, year 1): 07 gives $109 a month at $175 and $40 at −30%, i.e. $2.30 per month per 1% of sales.
- At $150: 109 − 14.3 × 2.30 = **$76/month**.
- At $220: 109 + 25.7 × 2.30 = **$168/month**.

From year 3 (COGS 45%), the contribution margin rises to ~41.6% of ex-GST sales ($689/month), so $2.87 per 1%. That gives **$103 / $144 / $218 per month** at $150 / $175 / $220.

**$/h** = year-3 profit ÷ (07's year-3 hours/week × 52). After depreciation = (profit − depreciation) ÷ hours.

**Weekly sales needed to pay the minimum wage** ("wage-breakeven") = the sales tier at which year-3 profit, after depreciation, equals hours × 52 × $26.44. I solved this on the Base–High slope.
- Example for A: 16 × 52 × 26.44 = $22.0k, plus $8.2k depreciation = $30.2k needed.
- The Base–High slope is $33.9k per $125/wk, so 175 + (30.2 − 20.7) ÷ 0.271 ≈ **$210/wk**.

**Limits.**
- Linear interpolation ignores the interactions 09 flagged: ramp speed, seasonality, re-site downtime, electricity and van costs.
- 09's **stacked pessimist case** for A ($150/wk, COGS 48%, 12% commission, seasonality, van and storage) is **≈ $1–3k in year 3 before depreciation, so negative after it**. It is shown as a stress line on each card.
- Payback and capital-at-risk at $150/$220 are directional extrapolations from 07's tiers, not re-simulated.

### 2.3 Headline results: the rebased comparison (year 3, before tax)

| Option | Hours/wk | Yr-3 profit $150 / $175 / $220 | $/h before dep. $150 / $175 / $220 | $/h after dep. $150 / $175 / $220 | Wage-breakeven sales |
|---|---|---|---|---|---|
| A | 16 | 13.9k / 20.7k / 32.9k | 16.7 / 24.9 / 39.5 | **6.9 / 15.0 / 29.7** | **~$210/wk** |
| A+C | 16.3 | 14.7k / 21.6k / 34.0k | 17.3 / 25.5 / 40.1 | **7.7 / 15.8 / 30.4** | ~$208/wk |
| A+B-lite | 20 | 15.4k / 22.8k / 36.1k | 14.8 / 21.9 / 34.7 | **4.0 / 11.2 / 23.9** | ~$229/wk |
| A-with-option, route at gate price | 14 | 15.1k / 21.7k / 33.6k | 20.7 / 29.8 / 46.2 | **12.8 / 21.8 / 38.2** | ~$188/wk |
| A-with-option, route at Melbourne ask (~$9k/machine) | 14 | 10.6k / 17.2k / 29.1k | 14.6 / 23.6 / 40.0 | **6.6 / 15.7 / 32.0** | ~$205/wk |
| D at 2.5× SDE | 10.6 | 12.2k / 17.4k / 26.8k | 22.1 / 31.6 / 48.6 | **15.3 / 24.8 / 41.8** | ~$179/wk equivalent |
| D at Melbourne ask | 10.6 | ~6.9k / 12.1k / 21.5k | 12.5 / 22.0 / 39.0 | **5.7 / 15.2 / 32.2** | ~$205/wk equivalent |
| *Minimum wage* | | | **26.44** | **26.44** | |

**Reading the table.**
- At $150/wk, everything earns **$4–15/h after depreciation**.
- At 07's $175, **every option is below the minimum wage** once depreciation is counted. D at the gate price comes closest, at $24.8/h.
- Only at about **$190–230/wk** do the options pay a minimum wage, and that is before tax and before any return on capital.

**How the A-with-option and D rows were adjusted.**
- *Asks.* The extra capital is costed at 07's 9.5% loan rate:
  - A-with-option: (90.0 − 42.7)k × 9.5% ≈ **$4.5k/yr**.
  - D: (108 − 51.8)k × 9.5% ≈ **$5.3k/yr**, as 09 calculated.
- *D's sales columns* mean "route sales come in 14% below / at / 26% above what you paid for". A bought route's sales are inherited, not built.

---

## 3. Option cards

### Option 1: A. Classic DIY cluster, site-first (8 → 15 used combos)

- **Who it suits:**
  - $15–60k of capital, 8–20 h/wk, a car and a garage.
  - Can afford to lose about $10–30k.
  - Comfortable cold-calling site managers.
- **What you'd do:**
  - Choose one cluster, the South-East by default (Moorabbin–Braeside–Dandenong South; 02, 06).
  - **Sign 3–5 host letters of intent before buying machines** (G folded in).
  - Buy dealer-refurbished MDB combos and rent Nayax 4G readers. Pilot 2–3 machines, then scale to 8 by month 12 and to 15 by about month 26, but only through the gates below.
  - **Framed as a paid apprenticeship, not an income**, until telemetry shows sites at ≥$175/wk (09).
- **Start-up capital:**
  - Pilot of 2–3 machines: **~$11–16k**. That is 2–3 × ($4,350 placed + $550 stock), plus ~$1–2k for insurance, ABN/name, labels, test and tag, anti-tilt brackets, a solicitor's template review and a spares kit (05, 08).
  - Full 15: **$39.5k in the first 12 months and $58.6k peak over 36 months** (07).
- **Ongoing monthly costs (at 15 machines, ESTIMATE):**
  - Reader rental ~$450 (15 × $30).
  - Overheads ~$400 ($4.85k/yr).
  - Vehicle ~$500–650 (06).
  - Repairs ~$500.
  - Card fees (3.4% of sales), commission (10%) and COGS (45–50%) move with sales.
- **Projection (07; $150 and $220 by 00 calc):**

| | $150/wk (planning base) | $175/wk (target) | $220/wk (strong) | 09 stress case |
|---|---|---|---|---|
| Net per machine per month, yr 1 / yr 3 | $76 / $103 | $109 / $144 | $168 / $218 | — |
| Year-1 profit | **$1.0k** | $2.7k | $5.7k | negative |
| Year-3 profit | **$13.9k** | $20.7k | $32.9k | $1–3k |
| Owner hours/week, yr 3 | 16 | 16 | 16 | 16+ |
| $/h before / after depreciation | $16.7 / $6.9 | $24.9 / $15.0 | $39.5 / $29.7 | ~$2 / negative |
| Cash payback | ~7–9+ yrs (extrapolated) | 60 months | ~50 months | never |
| Capital at risk (07) | ~$28.6k | ~$28.6k | ~$28.6k | ~$28.6k |

- **Best-fit sites (03):** closed workplaces with 25–200 staff (25+ on rotating 24/7 shifts, 40+ on day shift), at 0–10% commission. Gyms, PBSA and dealerships are fillers.
- **Product and price (04):** 55% drinks / 45% snacks. Refrigerated combo. Duplicate the top 3 SKUs. 600 ml Coke at $4.50, cans and water at $3.00. Margin comes from buying (Campbells, free for ABN holders; Costco ~$65/yr), not from pricing.
- **Equipment (05):** used MDB combo at ~$4,000; Nayax reader rented (<$1/day); cashless-first, but **keep a cash mech at blue-collar sites** (01; 09 conflict 8). Bolt machines down at semi-public sites.
- **Operations (06):** weekly visits; about 1 h per machine per week clustered; garage storage up to about 10–15 machines; a used van (~$25k) and food-permitted storage at about 15–20 machines (not in 07's model, so a −$3–5k/yr risk).
- **Compliance (08):** FoodTrader Class 4, $20m PL and products cover, host licence agreement, labels, test and tag, no surcharge, RCM-marked machines from an Australian supplier, no tobacco, vapes or alcohol.
- **Devil's advocate challenges and responses:**

| Challenge (09) | Response | Residual risk |
|---|---|---|
| $175/wk base is survivor-biased | **Accepted.** Planning base rebased to $150; $175 is now the GO gate, not the assumption | Medium. Real sales unknown until the pilot |
| A fails gate 6 (>$150/month contribution) | **Gate reconciled.** $150/month needs ≈ $175–180/wk at yr-3 COGS, so gate 6 and the GO gate are now the same test | Accepted: A is unproven until it passes |
| Labour treated as free | $/h after depreciation shown against $26.44. At $150 it is ~$7/h | **Risk accepted and disclosed.** It is an apprenticeship |
| COGS glide to 45% | Shown as a sensitivity (stuck at 50% = −$6.2k on yr 3). Founder tracks COGS monthly | Medium |
| Commission creep to 15–20% | Walk-away rule: ≤10% at sites under $200/wk; 20% would cut yr 3 to $8.4k (07) | Medium |
| Host asks for electricity | Pre-agree "host pays" in the licence; ~$1k per machine per year if not | Medium |
| Seasonality, van, storage omitted | Stress line shown; van and storage decisions sit at the 10–15-machine gate | Accepted |
| Cash vs cashless inconsistency | Cash mech at blue-collar sites; cash banking in the ops routine | Low |

- **90-day test plan (pilot of 2–3 machines):**

| Days | Actions | Metric |
|---|---|---|
| 0–14 | ABN, GST decision, business name, insurance, FoodTrader Class 4; Campbells and Costco accounts; walk in to 30–40 sites | ≥3 signed letters of intent at ≤10% commission, host pays power |
| 15–30 | Buy 2–3 used combos (≤$4.5k each, MDB, 4G); rent readers; place them | Placed by day 30 |
| 31–90 | Weekly service; rotate the slowest 20% of SKUs; log time, km and COGS | Sales/machine/week; h/machine; COGS % |
| **Gate, day 90** | **GO** (scale toward 8): ≥$175/wk on at least 2 of 3 machines. **PIVOT:** re-site any machine under $120/wk by weeks 5–8. **STOP:** no machine above $140/wk after one re-site | |

- **Kill criteria (any one):**
  - No machine above $140/wk after a re-site.
  - Logged time above 1.5 h per machine per week, excluding prospecting.
  - Payment costs above 6% of gross.
  - Fewer than 3 placements per 100 genuine walk-ins.
  - A host demanding more than 12% commission or electricity at a site under $200/wk. Decline that site.
- **Score (decision-framework weights, rebased):** capital 5, time-to-profit 3, hours/$ 2, downside 4, scale 3, defensibility 2, evidence 3 = **3.35 / 5**. The draft was 3.50; time-to-profit drops from 4 to 3 because year 1 is ~$1k at $150.

---

### Option 2: A+C. Classic route with an Asian-snack and noodle planogram layer

- **Who it suits:** the same founder as A, with campus, PBSA, Box Hill, Glen Waverley or Springvale sites inside or next to the cluster.
- **What you'd do:**
  - Run A.
  - **First swap 8–10 spirals in existing combos** to Asian lines bought from Clayton South or Dandenong importers (Wang Distribution, Chen Foods, Golden Sun; 06).
  - Only if those spirals beat the classic average, put the range into 3 of the 15 machines (07 models #3, #9, #13).
  - Use standard combo hardware so a machine can revert to classic stock (05).
  - It is a **site-winning differentiator** (02), not a margin lever.
- **Capital:** as A. $39.4k in the first 12 months / $58.0k peak (07). The spiral test costs ~$0.
- **Projection (07; 00 calc):**

| | $150/wk | $175/wk | $220/wk |
|---|---|---|---|
| Year-1 profit | $1.1k | $2.8k | $5.8k |
| Year-3 profit | $14.7k | $21.6k | $34.0k |
| $/h before / after depreciation (16.3 h) | $17.3 / $7.7 | $25.5 / $15.8 | $40.1 / $30.4 |
| Cash payback | ~7–9+ yrs | 58 months | ~49 months |
| Capital at risk | ~$28.0k | | |

  The gain over A is only ~$0.9k/yr at base (07). It disappears if niche volume falls 12% to campus seasonality.
- **Compliance (08):** Class 4 only if every item is packaged and shelf-stable. Buy only from Australian importers that are **CDS-registered** and carry English labels. Check the food class for Korean banana milk (refrigerated dairy) with the EHO.
- **09 challenges and responses:**

| Challenge | Response | Residual |
|---|---|---|
| 59% GM rests on retail-derived trade-cost guesses | Get a real price sheet from 2 importers before the switch | Medium |
| No Australian niche velocity data | Spiral test gives it for ~$0 | Low once tested |
| Hot water needed for cup noodles | Written into the host agreement, or drop noodles at that site | Low |
| Campus seasonality: international commencements down ~15%, Dec–Feb dips | Niche sites stay a minority (≤3 of 15) | Accepted |

- **90-day test:** runs inside A's pilot from week 5. **Kill if:**
  - Asian spirals sell below the classic average per slot by weeks 6–10.
  - Month 3 sales are below 70% of month 1.
  - Waste is above 4%.
- **Score:** 5, 3, 2, 4, 3, **3** (differentiation), **2** (evidence) = **3.40 / 5**. It is effectively equal to A because it *is* A with a range choice.

---

### Option 3: A+B-lite. Classic route, plus small smart fridges from year 2

- **Who it suits:**
  - $50–80k of capital and up to 20 h/wk.
  - Willing to handle chilled stock and, later, fresh food.
  - Already has A sites with 40–150 staff and no café or servo within 300 m.
- **What you'd do:**
  - **Not a starting option.** Add the first fridge only after A has at least 3 machines at ≥$175/wk.
  - Buy the fridge yourself (~$10k). Never buy a $40k franchise package (05).
  - Stock long-life chilled lines first. Add sandwiches only after 4 weeks of data and only if waste stays under 7%.
  - 07 models 11 combos and 4 fridges by month 27.
- **Capital:** $47.6k in the first 12 months / **$80.4k peak** (07). About $11.2k per fridge with stock.
- **Projection (07; 00 calc; fridge tiers scale with the classic tier):**

| | $150/wk (fridge ~$300) | $175/wk (fridge $350) | $220/wk (fridge ~$440) |
|---|---|---|---|
| Year-1 profit | $1.4k | $3.2k | $6.4k |
| Year-3 profit | $15.4k | $22.8k | $36.1k |
| Same, if fresh-led (12% waste + Class 3 per-machine fees ≈ −$90 per fridge-month × 4 × 12 ≈ −$4.3k) | ~$11.1k | ~$18.5k | ~$31.8k |
| $/h before / after depreciation (20 h; depreciation $11.2k) | $14.8 / $4.0 | $21.9 / $11.2 | $34.7 / $23.9 |
| Cash payback | >8 yrs | 68 months | ~55 months |
| Capital at risk | **~$42.4k** (fridges resell poorly, 05) | | |

- **Compliance (08):** one sandwich line lifts the **whole business to Class 3**: annual registration, Statements of Trade for every machine location, ≤5°C logs, temperature alarms and lockout, recall procedure, camera notice with no facial recognition. Add spoilage and recall cover ($1.5–3.5k).
- **Operations (06):**
  - +0.6 h/wk per long-life fridge and +1.2–1.5 h per fresh fridge.
  - Each fridge needs **at least $130/wk ex GST just to cover two visits a week.**
  - **No small-volume Melbourne sandwich supplier was found.**
- **09 challenges and responses:**

| Challenge | Response | Residual |
|---|---|---|
| No Australian fridge sales figure; $350/wk is a guess | Year-2 add-on only, with its own gate | **High. Accepted** |
| Basket vs waste contradiction ($9 basket needs fresh food, which means 12% waste) | Fresh-led row shown (−$4.3k); long-life first at a ~$220–250/wk basis | Medium |
| Funded rivals place fridges free | Target 40–150-staff sites; avoid Charter Hall and Morsl estates (02) | Medium |
| 00's $400/$800 gate contradicts the model | **Gate replaced** (below) | Resolved |

- **90-day test (per fridge), with new gates:**
  - **GO** (add a 2nd fridge): at least $350/wk incl GST.
  - **PIVOT** (relocate or re-range): $220–350/wk.
  - **STOP:** under $220/wk ex GST by week 8. Also stop fresh food if shrink plus waste is above 7% for two months running, or if servicing exceeds 2.5 h/wk per fridge.
  - Site entry condition: ≥60 staff per shift and a 12-month letter signed by the site manager.
- **Score:** capital 3, time-to-profit 3, hours/$ 2, downside 2, scale 4, defensibility 3, evidence 1 = **2.70 / 5**.

---

### Option 4: A with an option to buy (replaces "A→D")

09 showed that 07 priced the route stage at $4.3k per machine. That is below the cost of placing your own used machine ($4.9k) and about half of Melbourne asks (~$9.1k per machine; Colac at $9k + GST). 02 also found no genuine Melbourne route listed in 2026. **I accept the challenge.** The option is reframed as A plus a pre-committed right to buy, **not** a plan that assumes a purchase.

- **Who it suits:**
  - $25–30k now, with access to a further $50–100k (cash or finance) later.
  - 6–14 h/wk.
  - Wants to scale faster than organic site-winning allows.
- **What you'd do:**
  - **Stage 1 (months 0–12):** run A at 3–5 machines in one cluster. Build the price book, SOPs and a KPI sheet, and learn to read telemetry.
  - In parallel, screen listings **and** approach distressed placement-package owners in the cluster (02 points to SVA's claimed 6,000+ machines sold on rolling terms).
  - **Stage 2 (only if a qualifying deal appears):** buy a 10–15-machine route **within 25 minutes of the cluster**.
  - **Pre-commitment:** if there is no route at the lower of **2.5× verified SDE and $5.5k per machine**, with ≥12 months of telemetry, by month 9, **formally drop stage 2** and continue as A.
- **Capital:**
  - Stage 1: **$27.3k** (07).
  - If exercised at the gate price ($42.7k for 10 machines): peak $74.6k (07).
  - At the Melbourne ask (~$90k): peak ≈ **$121.9k** (74.6 + 47.3; 00 calc, matches 09).
  - Add $4–12k of due diligence (08) per attempted deal.
- **Projection (07; 00 calc):**

| | $150/wk | $175/wk | $220/wk |
|---|---|---|---|
| Year-1 profit (stage 1, 5 machines) | $0.8k | $2.2k | $4.7k |
| If no route is bought: 5 machines, yr 3 (00 calc: 5 × unit × 12 − $2.45k overheads) | $3.7k | $6.2k | $10.6k |
| Year 3, route at gate price | $15.1k | $21.7k | $33.6k |
| Year 3, route at Melbourne ask (−$4.5k/yr interest) | $10.6k | $17.2k | $29.1k |
| $/h after depreciation, gate / ask (14 h) | $12.8 / $6.6 | $21.8 / $15.7 | $38.2 / $32.0 |
| Cash payback, gate / ask | ~7+ yrs / 10+ yrs | 57 months / ~85–95 months | ~46 months / ~70 months |
| Capital at risk (07 CSV) | **$44.6k** once exercised; ~$17k beyond resale in stage 1 | | |

- **09 challenges and responses:**

| Challenge | Response | Residual |
|---|---|---|
| Route stage priced below the market | **Accepted.** Gate price and ask price both shown; month-9 drop rule | Route may never be bought: **accepted** (it falls back to A) |
| Favourable assumptions: 0.8 h per route machine, 5% churn, COGS 45% from day one | The 14 h/wk only holds for a clustered route. A scattered route ≈ 26 h/wk, about $16/h, so reject routes more than 25 min out. Budget 15% site loss in year 1 plus a clawback | Medium |
| Capital-at-risk inconsistency ($17k prose vs $44.6k CSV) | **Resolved:** report $44.6k for the full option, $17k for stage 1 only | — |
| Groupthink: scored above A | **Score set equal to A** (below) | Resolved |
| Due-diligence costs can be lost | Cap at 2 full due-diligence attempts (~$8–24k); use the cheap screens first (telemetry, BAS and host calls before lawyers) | Medium |

- **90-day test:** A's plan and gates. Plus by day 90: screen ≥5 listings or package owners, and get ≥1 telemetry export.
- **Kill criteria:**
  - A's kill criteria apply to stage 1.
  - Drop stage 2 if there is no qualifying route by month 9.
  - Walk away from any deal if the seller won't allow 3+ host calls, if less than 70% of revenue is under written, assignable agreements, or if the PPSR shows financed machines.
- **Score:** **3.35 / 5, the same as A by construction.** Exercising the option improves hours/$ and scale (+0.4) but lowers the capital score (−0.4), so it nets to about zero. Its real value is *flexibility*, which A already has.

---

### Option 5: D. Buy an existing route (opportunistic only)

- **Who it suits:**
  - $60–120k+ of capital and about 11 h/wk, rising to 22–30 h/wk in the first 2 months (06).
  - Wants income in year 1.
  - Can pay an accountant and a solicitor for due diligence.
- **What you'd do:**
  - Act **only if a qualifying deal appears**. It is not a plan to execute on a timetable.
  - Buy a 10–15-machine **clustered** route with 12–24 months of Nayax/Cantaloupe telemetry that reconciles to bank deposits and BAS.
  - Earnings go into the contract as warranties, with a 6–12-month clawback for lost sites (08).
- **Capital:**
  - At 2.5× verified SDE (~$19.3k SDE): $51.8k purchase, **$62.7k total** (07).
  - At 3.1×: $74.2k (07).
  - At the Melbourne ask (~$9k per machine × 12 = $108k): **≈ $119k** (00 calc: 108 + ~$11k stock, fees and retrofit).
  - Plus due diligence of $4–12k (08).
- **Projection (07; 00 calc; columns = route sales vs what you paid for):**

| | −14% (≈ $150) | As represented ($175) | +26% (≈ $220) | Seller overstated by 30% |
|---|---|---|---|---|
| Year-1 profit (15% site loss) | $8.3k | $12.9k | $21.3k | ≈ $2–3k |
| Year-3 profit at 2.5× | $12.2k | $17.4k | $26.8k | $6.5k (07) |
| Year-3 profit at ask (−$5.3k/yr interest) | $6.9k | $12.1k | $21.5k | ~$1k |
| $/h after depreciation, 2.5× / ask (10.6 h) | $15.3 / $5.7 | $24.8 / $15.2 | $41.8 / $32.2 | negative |
| Cash payback, 2.5× / ask | ~6 yrs / 10+ yrs | 48 months / ~6–8 yrs | ~35 months / ~5 yrs | never |
| Capital at risk | $38.7k (2.5×) / $50.2k (3.1×) / ~$90k+ at ask (goodwill counted as $0) | | | |

- **Paid-restocker check ("passive investor"):**
  - 10.6 h × $32/h × 52 ≈ **$17.6k a year**, which absorbs the whole base profit (06 restocker rate $28–35/h).
  - At 12 machines a route is **not passive**. A driver only makes sense at ~20+ machines (06 hire trigger).
- **09 challenges and responses:**

| Challenge | Response | Residual |
|---|---|---|
| Supply doesn't exist at the modelled price | Labelled "opportunistic". Ask-price row shown | **High. Accepted** |
| A beginner can't verify the seller's numbers | Telemetry, bank deposits and BAS reconciliation; reject claimed 65–69% GM (04 says rebuild GM from invoices); accountant review | Medium |
| One sick week leads to stock-outs and site loss | Line up a $50/visit contractor as backup before settlement (06) | Medium |
| Goodwill not depreciable; financed machines | Split the purchase price per machine; PPSR search on every serial | Low |

- **90-day test:**
  - **Days 0–30:** screen 5+ listings and get NDAs.
  - **Days 31–60:** ride-alongs, 3+ host calls, machine inspection (MDB, 4G).
  - **Days 61–90:** negotiate, or walk away.
- **Walk-away gate:**
  - Price above **2.5× verified SDE** or above **$6k per machine**.
  - Less than 70% of revenue under written, assignable agreements.
  - Any site more than 25 min from the core.
  - After settlement: losing more than 20% of revenue in 6 months, or net below 70% of the represented figure, triggers the clawback.
- **Score:** capital 1, time-to-profit 5, hours/$ 4, downside 2, scale 4, defensibility 3, evidence 2 = **2.95 / 5** at the gate price; **≈ 2.65** at the ask (time-to-profit 4, hours/$ 3).

---

### Dropped options (brief)

| Option | Why dropped (07, 09, 02, 03, 08) | What survives |
|---|---|---|
| **E: Franchise AI-fridge packages** (~$40.5k each) | Year 3 is $0.8k on $131.5k of peak funding ($2.1/h). It **never pays back at any sales tier**. About $30k of each package buys a site and training, not an asset. The royalty is undisclosed (6% floor). No instant write-off for assets over $20k. Score ≈ 1.6 | Reconsider only with zero royalty, merchant and telemetry accounts in the operator's name, sites in the franchisee's name, 5+ reachable former franchisees, and a price under ~$15k per fridge |
| **F: Placement package** (5 new combos + "secured" sites, $30k + GST) | Year 3 is $3.2k ($8.8/h). Payback is more than 10 years at base. Sites are on 12-month rolling terms, scattered (Cowes to Ballarat), and 30–50% need re-siting. The re-site guarantee lasts 180 days with an undisclosed threshold. This is the ACCC "business opportunity" pattern. Score ≈ 1.95 | The **red-flag checklist** (08 §4), because the founder *will* be marketed these packages |
| **G: Locator / placement-only** | The $300-per-placement fee is invented (no Australian fee is published). 01 scores demand 1/5 because hosts already get free service and package sellers bundle locating. It builds no asset. It scores 3.2 only because almost nothing is at risk | **"Sign sites before buying machines"** is now step 1 of A. It turns 03's unverified 3–6% conversion into a measured number at ~$0 capital |

---

## 4. Side-by-side comparison

| | A | A+C | A+B-lite | A with option to buy | D (opportunistic) |
|---|---|---|---|---|---|
| Capital: entry / peak | $11–16k pilot; $39.5k / $58.6k | same as A | $47.6k / $80.4k | $27.3k; $74.6k (gate) – $122k (ask) | $62.7k (2.5×) – ~$119k (ask) |
| Hours/week, yr 3 | 16 | 16.3 | 20 | 14 (26 if scattered) | 10.6 (22–30 in first 2 months) |
| Year-1 profit $150 / $175 / $220 | 1.0 / 2.7 / 5.7k | 1.1 / 2.8 / 5.8k | 1.4 / 3.2 / 6.4k | 0.8 / 2.2 / 4.7k | 8.3 / 12.9 / 21.3k |
| Year-3 profit $150 / $175 / $220 | 13.9 / 20.7 / 32.9k | 14.7 / 21.6 / 34.0k | 15.4 / 22.8 / 36.1k | 15.1 / 21.7 / 33.6k (gate); 10.6 / 17.2 / 29.1k (ask) | 12.2 / 17.4 / 26.8k (2.5×); 6.9 / 12.1 / 21.5k (ask) |
| $/h after depreciation at $150 / $175 | 6.9 / 15.0 | 7.7 / 15.8 | 4.0 / 11.2 | 12.8 / 21.8 (gate) | 15.3 / 24.8 (2.5×) |
| Sales needed for min wage after depreciation | ~$210/wk | ~$208/wk | ~$229/wk | ~$188 (gate) / ~$205 (ask) | ~$179 (2.5×) / ~$205 (ask) equivalent |
| Downside if it fails | ~$28.6k at risk; pilot ~$5–8k | ~$28.0k | ~$42.4k | ~$17k stage 1; $44.6k+ if exercised | $38.7k–$90k+ (goodwill = $0) |
| Scale ceiling | 40–50 machines per person (case studies) | same | Higher $/site, more hours | Fastest to 15–20 | Bounded by deal supply |
| Defensibility | Low (service only) | Low–medium (range) | Medium (fridges sticky) | Medium | Medium (inherited sites, 10–20% loss) |
| Evidence strength | Medium–low | Low | Very low | Low (route supply) | Low (no AU closed sales) |
| **Weighted score (rebased)** | **3.35** | **3.40** | **2.70** | **3.35** | **2.95** (2.65 at ask) |

---

## 5. Recommendation by founder profile (options, not one answer)

| Founder profile | Recommended path(s) | Expected outcome (ESTIMATE) | Why | First 3 actions |
|---|---|---|---|---|
| **Side hustle, < $15k, < 8 h/wk** | **A pilot (2–3 used machines, site-first)**, with A+C as a spiral test. Hold there unless the gates pass | ~$0–4k a year (3 machines at $150–220/wk: 3 × $76–168 × 12 − ~$2k overheads); 4–7 h/wk. Losses probably deferred under non-commercial loss rules | Cheapest real data; machines keep ~50% resale value; a stake of ~$5–8k at risk | 1. Pick the cluster and walk in to 30 sites. 2. Get 3 letters of intent. 3. Get insurance and machine quotes |
| **Serious part-time, $30–60k, 10–20 h/wk** | **A** (or **A+C**) to 8–15 machines through the gates, holding the **option to buy** if a qualifying route appears. Consider **B-lite** in year 2 only after 3+ machines at ≥$175/wk | Yr 3 ~$14k at $150, ~$21k at $175, ~$33k at $220; $7–30/h after depreciation | Builds the only asset that matters (sites) at lowest risk; scaling is staged on evidence | As above, plus a written Nayax quote and a Campbells price sheet for the top 15 SKUs |
| **$100k+ buy-in, wants income sooner** | **D only if a deal passes the walk-away gate** (≤2.5× verified SDE, ≤$6k per machine, clustered, telemetry). Otherwise **A with an option to buy**, run fast (5 machines in 60 days) while searching. **Never E or F** | D at gate: yr 1 ~$13k, yr 3 ~$17k for ~11 h/wk. At the Melbourne ask: yr 3 ~$12k, payback 6–8 yrs | Year-1 income only comes from buying sites. Overpaying is the main way to lose money | 1. Engage an accountant for route due diligence. 2. Screen 5+ listings and request telemetry. 3. Start an A pilot in parallel so the founder can read what they're buying |
| **Low-hours investor** | No good fit at small scale. D with a paid restocker consumes the profit at 12 machines (~$17.6k labour vs $17.4k profit) | ~$0 net | A driver is only viable at ~20+ machines (06) | Revisit at $250k+ capital for a 20–40-machine route, or don't do vending |
| **Wants a full-time income ($60–70k)** | **No option delivers this by year 3 at base** (07 §7). Realistic path: A with an option to buy → **30 machines at $220/wk or ~45–50 at $175/wk**, plus a van and storage, over 3–5 years, with 30–40 h/wk. **Keep the day job** until 12+ months of telemetry show ≥$200/wk averages | At $175: ~$1.4k per machine per year, so ~48 machines for $66k before depreciation. At $220: ~$2.2k, so ~30 machines | Matches the case-study rule of thumb (50+ machines for a living; Andres Vending 46) | Same as the part-time profile; set a month-12 review against the $200/wk average |

---

## 6. First 30 days: common to every option

1. **Decide the founder dials** in writing: maximum cash at risk, hours per week, fresh food yes or no, vehicle (decision-framework Step 1).
2. **Pick one cluster.** Default: **Moorabbin–Braeside–Dandenong South**. It has the supply base (Costco Moorabbin, Campbells Clayton, the Clayton South and Dandenong Asian wholesalers), avoids the most contested western sheds, and the South-East leads 2026 new industrial completions (02, 03, 06).
3. **Register:** ABN, business name ($47), accountant consultation on GST registration and sole trader vs Pty Ltd (07 §6), FoodTrader Class 4 notification.
4. **Get a $20m public and products liability quote** (08: ~$0.7–1.5k for 1–3 machines).
5. **Walk in to 30–40 sites** with 25–200 staff. Target **3–5 signed letters of intent** at ≤10% commission, with the host paying electricity. Use a reviewed licence-agreement template ($500–1,500 solicitor). Log conversions (03 funnel).
6. **Get quotes, not search snippets:** 2 used-machine dealers (MDB, 4G, warranty), a written Nayax AU rent-vs-buy and % rate, a Campbells and Costco price sheet for the top 15 SKUs.
7. **Ask 2–3 local operators** (e.g. VENHAR, Allsorts) for a paid ride-along and any per-machine sales benchmarks. This replaces US time benchmarks (06).
8. **Set up the KPI sheet** (sales per machine per week, COGS %, h per machine, km) and a simple cash-flow tracker.
9. **If D is in scope:** request telemetry, BAS and site agreements from every listing, and run PPSR searches on any short-listed route.
10. **Don't buy** a placement package, a franchise, a new machine or a van in the first 30 days.

---

## 7. Top 10 facts to verify before spending money

| # | Fact | Why it matters | How |
|---|---|---|---|
| 1 | **Real weekly sales** at comparable Melbourne sites | Moves every option by ±$7–12k a year (§2.3) | Operator ride-along; route telemetry; a rented 4–8-week trial ($31.50/wk combo, 05) |
| 2 | **Host terms** at target sites (commission, electricity, notice) | 20% commission cuts A yr 3 to $8.4k (07) | Signed letters of intent before buying |
| 3 | **Card provider cost** (Nayax AU rate, rental terms) | The 4% assumption is unverified; no surcharge is allowed | Written quote |
| 4 | **Used machine condition and price** (MDB, 4G, refrigeration, warranty) | Repairs and retrofit at $1.75–2.8k per machine | 2+ dealer quotes, inspection |
| 5 | **Actual trade prices** for the top 15 SKUs | COGS 50% vs 45% = ±$6k a year | Campbells and Costco shelf check; importer price lists for A+C |
| 6 | **Insurance premium** ($20m PL and products; machine theft at third-party premises) | $0.7–3.5k a year | Broker quote |
| 7 | **Council food class and fees** (Class 4 vs 3; per-machine fees) | Fresh food lifts the whole business to Class 3; Casey charges $175 per machine | Principal council EHO and FoodTrader |
| 8 | **Storage and vehicle** (garage capacity; food-permitted storage) | Self-storage bans food; van needed at ~15 machines | Measure the garage; ask Wilson and others |
| 9 | **Route claims** (telemetry ↔ bank ↔ BAS; assignable agreements; PPSR) | 30% overstatement cuts D yr 3 to $6.5k | Accountant and solicitor due diligence ($4–12k) |
| 10 | **Tax position** (GST registration; non-commercial loss tests; $20k instant write-off Royal Assent; water GST reg 38-3.02) | Decides whether early losses offset salary and whether capex is deductible now | Registered tax agent |

---

## 8. Cross-agent conflicts and how I resolved them

Rules applied (decision-framework Step 6): local beats global; verified beats claimed; conservative case first; show both values when agents differ by more than 30%; every 09 objection gets a mitigation or a "risk accepted".

| # | Topic | Agent X says | Agent Y says | Lead's call and reason |
|---|---|---|---|---|
| 1 | Planning sales per machine | 01/03/07: $175/wk base | 09: $140–150 for a beginner (25th percentile; Sydney ~$59/wk; US ~A$110) | **$150 planning base, $175 GO gate, $220 strong**. Rule 3 (conservative first). 03's $250–800 is treated as top-decile upside only |
| 2 | Unit gate vs model | 00 gate 6: >$150/month contribution | 07: $109 yr 1 / $144 yr 3 at $175 | Gate kept; equivalent to ≈ $175–180/wk at yr-3 COGS. Merged with the A GO gate (≥$175/wk on 2 of 3 machines) |
| 3 | Cluster choice | 01/03: West or SE industrial belts | 02: avoid the contested West and Dandenong sheds; 06: SE has the supply base | **Moorabbin–Braeside–Dandenong South**. It satisfies 02 (less contested), 03 (2026 completions are SE-led) and 06 (supply within 15–20 min) |
| 4 | A 90-day gates | 00: GO $600/month (~$138/wk), STOP <$300/month | 09: GO ≥$175/wk on 2 of 3; STOP if none >$140/wk after a re-site | **09's gates adopted.** 00's would pass loss-making machines |
| 5 | Fridge gate | 00: STOP <$400/wk, GO $800 | 07 base $350, high $600; 09: STOP <$220 ex GST by week 8 | **GO ≥$350 incl GST; PIVOT $220–350; STOP <$220 ex GST** |
| 6 | Fridge waste vs basket | 07: 7% waste with a $9 basket | 06: fresh 12%, long-life first; 04: 5–15% | Long-life first (~$220–250/wk). A fresh-led row at −$4.3k a year is shown on the card |
| 7 | Fridge site size | 00: 100–300 staff; 01: 50–80 per shift | 02: 20–100; 03/06/07: 40–150 | **40–150 staff, ≥60 per shift for a fridge.** 06 visit-cost floor; 02 competition |
| 8 | Route price | 07: $4.3k per machine (2.5× SDE) | 02/09: asks ~$9k per machine; ~3–3.3× profit | Both shown. **Walk-away at the lower of 2.5× verified SDE and $5.5–6k per machine.** A→D reframed |
| 9 | A→D capital at risk | 07 prose: ~$27k / ~$17k beyond resale | 07 CSV: $44.6k | $17k is stage 1 only; **$44.6k is the exercised option**. Both reported |
| 10 | Route assumptions | 07: route churn 5% after yr 1, 0.8 h per machine | 02: 10–20% churn; 03: 10–20% yr-1 loss; 06: 2–2.5 h scattered | Risk accepted with conditions: clustered routes only (≤25 min), 15% yr-1 loss, clawback |
| 11 | Commission | 01/02/03/07: 10% | 04: 15% conservative; 03: 15–30% tendered | 10% base for direct sites; 20% sensitivity shown. Tendered sites excluded in year 1 |
| 12 | Cash share | 07 CSV: 85% cashless; 05: cashless-only | 01: keep cash at blue-collar sites | Cashless default, **cash mech at blue-collar sites**; cash handling in the ops routine |
| 13 | Minimum wage | 07/09 KB: ~$24.95–25 | Fair Work: **$26.44 from 1 Jul 2026** | $26.44 used throughout |
| 14 | Per-machine profit | 07 KB older scenario: ~$2.05k per machine per year at 20 machines | 07 phase 2: ~$1.38k per machine (15 machines) | **Phase 2 figure only.** The older scenario is superseded |
| 15 | COGS | 07 old: 45% flat | 04: 50% yr 1 | 07's glide path, plus a "stuck at 50%" sensitivity |
| 16 | Package premium | 00: $1.5–3k | 02: $3–4.5k vs used DIY; 05: fair vs new | Moot: F is dropped either way. Quote "$3–4.5k premium vs used DIY" in the red-flag list |
| 17 | Water GST provision | 04: reg 38-3.01 | 08: probably 38-3.02 (2019 Regulations) | Treated as a small, unconfirmed upside; tax agent to confirm |
| 18 | Option letters | 09 KB: C = micro-market, D = niche, E = route | 00/07: B fridge, C niche, D route | **00/07 letters used throughout this report** |
| 19 | Hours per machine | 00 archetype: 1–2 h | 06: ~1 h clustered, 2–2.5 h scattered | 1.0–1.1 h clustered is the base; scattered is a reason to reject a site or route |

---

## 9. Risk register

| # | Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| 1 | Sites sell below $150/wk | High | High | Site-first letters of intent; GO/STOP gates; re-site once, then stop | Founder |
| 2 | Theft or vandalism | Medium | Medium | Closed workplaces only; bolt-down; insurance at third-party premises | Founder |
| 3 | Route or package seller misrepresentation | Medium | High | Telemetry, bank and BAS reconciliation; warranties; clawback; PPSR; never F | Accountant, solicitor |
| 4 | COGS inflation (CPI ~4%) | High | Medium | Price review every 3–6 months in $0.20–0.50 steps; Campbells; cans and water mix | Founder |
| 5 | Loss of a key site (rolling 12 months) | Medium | Medium | Service reliability; telemetry restocking; no single site above 20% of revenue | Founder |
| 6 | Regulatory: fresh food (Class 3), Healthy Choices, gacha and children, CDS | Medium | Medium | Ambient only in year 1; public health sites excluded; buy from CDS-registered importers; no gacha | Founder, EHO |
| 7 | Founder burnout or time overrun | High | Medium | Log hours; kill above 1.5 h per machine; cap the build at 3 h/wk prospecting | Founder |
| 8 | Host demands electricity or higher commission | Medium | Medium | Written in the licence; walk away at sites under $200/wk | Founder |
| 9 | Overpaying for a route (sunk-cost pressure) | Medium | High | Month-9 drop rule pre-committed; walk-away price fixed in advance | Founder |
| 10 | Evidence error (search-summary figures wrong) | High | Medium–High | Pilot sized to buy information; top-10 verification list (§7) | Lead / founder |

---

## 10. Staged roadmap (common spine for A, A+C, A-with-option)

- **Stage 0 (weeks 0–4):** §6 list. Gate: ≥3 signed letters of intent at ≤10% commission.
- **Stage 1 (months 1–3):** 2–3 machines. Gate: ≥$175/wk on 2 of 3 machines; ≤1.5 h per machine.
- **Stage 2 (months 4–12):** scale to 5–8 machines; spiral test for A+C; screen routes. Gate: fleet average ≥$175/wk; COGS ≤50%.
- **Stage 3 (months 9–24):** month 9 is the route-purchase decision (buy at ≤ the gate price, or drop stage 2). By month 12–15, decide on the first fridge (B-lite), if ≥3 machines are at ≥$175/wk and a 60+-per-shift site is signed. At 10–15 machines, decide on the van and storage, and on Pty Ltd.
- **Exit options:** sell the route (asks run ~3× profit; buyers should pay ≤2.5×), keep it with a part-time restocker at 20+ machines, or sell the machines (used combos retain about $2–4k each).

---

## 11. What we still don't know (ranked by impact on the decision)

1. Beginner per-machine sales in the chosen cluster. No Australian measured series exists (01, 07, 09).
2. Closed route-sale prices in Victoria, and whether any qualifying route exists (02, 07).
3. Australian smart-fridge weekly sales and a small-volume fresh-food supplier (01, 05, 06).
4. Nayax AU rate card and rental terms (05).
5. Real trade price sheets and importer minimums (04, 06).
6. Commission norms at warehouse sites (03: only a 10% listing benchmark).
7. Coke Vending's commission and minimum site, i.e. how often an independent is outbid (02).
8. Franchise royalties and disclosure terms (02, 08). Low priority now that E is dropped.
9. Tax items: $20k instant write-off Royal Assent; water GST provision; Victorian duty on a business purchase (07, 08).
10. Melbourne time per stop, from a ride-along (06).

## Appendices (pointers)

- A. Sources: see each agent's `analysis/phase2-analysis.md` and `knowledge/INDEX.md`. 09 §11 lists the 4 Nov 2026 searches (Fair Work minimum wage, Colac and Melbourne listings, Nayax pricing).
- B. Financial model: `agents/07-financial-modeller/analysis/option-model.csv` and `phase2-analysis.md`.
- C. Site types and precincts: `agents/03-location-scout/analysis/phase2-analysis.md`.
- D. Suppliers: `agents/06-supply-operations/analysis/phase2-analysis.md` §2.1–2.2, §6.
- E. Compliance checklist, route due diligence and red flags: `agents/08-legal-compliance/analysis/phase2-analysis.md` §2–4.
- F. Devil's advocate report: `agents/09-devils-advocate/analysis/phase3-challenge.md`.
