# Phase 2b Analysis: Financial Model for Each Business-Model Option

**Agent:** 07 Financial Modeller · **Date:** 4 Nov 2026 · AUD, P&L **ex-GST** (assumes the business registers for GST from day one, so capex is shown ex-GST).
**Inputs:** wave-1 analyses from 01–05 (`agents/0{1..5}-*/analysis/phase2-analysis.md`), `agents/00-lead-strategist/knowledge/business-model-archetypes.md`, and my knowledge base (`knowledge/*.md`).
**Method:** a 120-month cash simulation for each option (Python; the script output is exported as `analysis/option-model.csv`). Sites ramp 60% / 85% / 100% over the first three months. **Every output is an ESTIMATE** built on the cited inputs. "Profit" means operating profit **before owner labour, tax and depreciation**.

**Jargon used once:** *SDE* = profit for one owner-operator before paying themselves. *Payback (cash)* = the month in which cumulative cash, including every machine purchase, first turns positive. *Capital at risk* = peak cash invested minus what the hardware would fetch in a forced sale. Goodwill and franchise fees are assumed to be worth $0.

---

## 1. Reconciled base-case assumptions

| Input | Base (low / high) | Source / reconciliation |
|---|---|---|
| Weekly gross per classic machine (incl GST) | **$175** ($100 / $300) | 07 KB. Adopted by 01 and 03 (03 now treats its $250–800 as top-decile upside) |
| Weekly gross per smart fridge | **$350** ($200 / $600) | 07 KB ESTIMATE. That is ~39 baskets of **$9** per week (01/04 basket $8–12) |
| Revenue ex-GST | gross × 52 ÷ 1.1 | All lines treated as taxable. Water may be GST-free (04: reg 38-3.01), a small upside |
| COGS, classic combo | **50% in yr 1 → 47.5% in yr 2 → 45% from yr 3** | **Changed** from a flat 45%, per 04 (a beginner buys at Costco/specials) |
| COGS, Asian-snack niche machine | 47% yr 1 → **41%** from yr 3 (59% gross margin) | 04 mix calculation. Volume held at classic Base: the price premium offsets campus-break dips (ESTIMATE) |
| COGS + waste, smart fridge | 50% + **7% fresh waste/theft** | 04: gross margin 40–48% after waste, so this sits at 43% |
| Host commission | **10%** of ex-GST sales (0% / 20%) | 01, 02, 03 agree. 04's 15% is a conservative case |
| Card cost, classic | **4% of cashless sales**, 85% cashless → 3.4% of revenue | 05. Surcharging banned from **1 Oct 2026**, so the cost cannot be passed on. Interchange is only ~1c; the cost is the provider's margin |
| Fridge platform + card | **6%** of sales + **$70/month** software | 05 range is 5–8% plus $50–90/month |
| Card reader (DIY) | **Rented, ~$30/month, $0 upfront** | 05: renting beats buying (Nayax $1,400–2,000 + $14.70/month) for 1–5 machines. Over 6–8 years the two cost about the same |
| Card reader (packages, routes) | Bought: $14.70/month licence | Dipacci, via 05 |
| Used combo placed | **$4,350** + $550 stock | 05 ($4,000 + $350 install) |
| Smart fridge placed | **$10,350** + $800 stock | 05 (VMA $6–15k) |
| Placement package | **$6,000/machine incl. site** ($30k + GST for 5) | 00, 02, 05 |
| Franchise AI-fridge package | **$40,500** each + 6% royalty | 05 (Royal Vending listing). Royalty uses the floor of 02's 6–12% downside range, because no AU disclosure document was found |
| Vehicle | $0.91/km × visits × km per visit (cluster 8–12 km, scattered 20 km) | 07 KB (ATO 2026–27 rate via a third-party source) |
| Repairs | $400/yr used, $150 new under warranty, $450 aged route machine | 05 |
| Site churn | 12% a year × $350 re-site cost. **15% of sites lost in the first year after buying a route** (5% after that) | 02/03: rolling 12-month terms, 10–20% churn |
| Business overheads | $1,250 + $240 per machine per year (insurance, accounting, software, merchant fee, storage) | 07 KB (gives ~$2.5k at 5 machines and ~$6k at 20) |
| Route purchase | **2.5× verified SDE** + $300 stock per machine, plus a $2,300 retrofit on 3 of 10 machines | 07 walk-away rule. 02: Australian asks run ~3–3.3× (also modelled at 3.1×). 05: retrofit costs $1,750–2,800 |
| Owner time | 1.0 h/wk per used combo; 0.8 per route machine; 2.0 per fridge; plus 3 h/wk prospecting while building | 07 KB, 03 funnel (3–6 placements per 100 walk-ins) |
| Electricity | Host pays | If the operator pays, deduct ~$500–1,150 per machine per year (05) |

### Conflicts and how they were resolved
| Conflict | Resolution |
|---|---|
| COGS: 07 used 45%, 04 says 50% in year 1 | Glide path from 50% to 45% over three years. Monthly-net figures in §2 use the **year-1 (50%)** rate, so they are conservative |
| Industrial-site sales: 03 $250–800/wk, 01 $200–500, 07 $175 | $175 Base. Industrial sites sit in the **High ($300)** band until telemetry data proves more (01's recommendation) |
| Reader cost: old 05 figure $600, 07 $1,400 | 05 corrected to $1,400–2,000 bought. DIY options **rent** (<$1/day) |
| Card fee: 04 had 1.5–2% + 5–10c; 05 says 4% | 4% (05). Little difference at a $4 ticket |
| Fridge site size: 00 says 100–300 staff; 02 and 03 say 20–150 | B-lite modelled at **40–150-staff** sites, at $350/wk. That is 39 baskets/week, plausible at ~60–100 staff (ESTIMATE). Larger sheds are Morsl, Coke&Go or Machines Vending territory |
| Route value: 07 said ~2× SDE; 02 says asks are 3–3.3× | Walk-away stays at **≤2.5× verified SDE**. Ask-level pricing is shown as a separate row (D@3.1×) |
| Seller "65–69% gross margin" (62-machine route) | Rejected (04). Routes are modelled at 55% gross margin |
| Franchise ongoing fees | 02: do not model zero. 6% royalty used as the base |

---

## 2. Unit economics: monthly net per machine (Base, year-1 COGS)

| Unit | Capex + stock | Low | **Base** | High | Base from yr 3 (COGS 45%) |
|---|---|---|---|---|---|
| Used combo, DIY cluster | $4,900 | $10 | **$109** | $275 | $144 |
| Asian-snack combo (niche) | $4,950 | $20 | **$126** | $304 | $168 |
| Smart fridge, own (B-lite) | $11,150 | $39 | **$198** | $464 | $198 |
| Franchise fridge package (+6% royalty) | $41,300 | −$48 | **$76** | $283 | $76 |
| Bought-route machine (COGS 45%) | (in price) | $49 | **$163** | $353 | $163 |
| Placement-package combo (scattered sites, $145/wk base) | $6,600 | $6 | **$66** | $205 | $94 |

These figures are **before business overheads and owner time**. The option tables in §3 report net per machine **after** each machine's share of overheads.

---

## 3. Option tables (Base case unless shown; low/base/high = sales tier)

Realistic scale = what one part-time founder could plausibly reach. Year-1 and year-3 profits are full-year operating profits before labour.

### A. Classic DIY cluster (used combos)
| Metric | Value |
|---|---|
| Scale | 8 machines by month 12 → 15 by month 26 |
| Startup capital (first 12 months) / peak funding over 36 months | **$39.5k / $58.6k** |
| Net per machine per month (low / base / high) | −$17 / **$82** / $248 |
| Owner hours/week (yr 3) | 16 |
| Payback, cash (base / high) | **60 months** / 31; never at Low |
| Year-1 profit (low / base / high) | −$2.3k / **$2.7k** / $10.9k |
| Year-3 profit (low / base / high) | $0.4k / **$20.7k** / $54.6k (**~$25/h**) |
| Capital at risk | ~$28.6k |

### A+C. Classic + Asian-snack niche (3 of 15 machines)
| Metric | Value |
|---|---|
| Scale | As A; machines #3, #9 and #13 carry the Asian range at PBSA/campus/Box Hill sites |
| Startup capital / peak | **$39.4k / $58.0k** |
| Net per machine per month | −$15 / **$86** / $254 |
| Owner hours/week | 16.3 |
| Payback (base / high) | **58 months** / 31 |
| Year-1 profit | −$2.2k / **$2.8k** / $11.2k |
| Year-3 profit | $0.9k / **$21.6k** / $56.1k (~$25/h) |
| Capital at risk | ~$28.0k |
The niche adds only **~$0.9k/yr** at Base. Its value is as a site-winning differentiator (02, 04), not as a financial lever. If the niche machines' volume falls 12% to campus seasonality, the gain is gone.

### A+B-lite. Combos + small smart fridges
| Metric | Value |
|---|---|
| Scale | 7 used combos + 1 fridge (month 9) by yr 1 → 11 combos + 4 fridges by month 27 |
| Startup capital / peak | **$47.6k / $80.4k** |
| Net per machine per month | −$9 / **$106** / $298 |
| Owner hours/week | 20 |
| Payback (base / high) | **68 months** / 35 |
| Year-1 profit | −$2.2k / **$3.2k** / $12.2k |
| Year-3 profit | $0.7k / **$22.8k** / $59.7k (~$22/h) |
| Capital at risk | ~$42.4k (fridges resell poorly; 05) |
The highest year-3 dollar profit, but it needs ~$22k more capital and about 4 more hours a week. Each fridge earns ~1.8× a combo but costs 2.3× as much. The fridge case only works on owned kit at a captive 40–150-staff site with waste kept ≤7%.

### A→D. Learn on 5 machines, then buy a 10-machine route (month 13)
| Metric | Value |
|---|---|
| Scale | 5 own machines in yr 1 → +10 bought (SDE ~$15.9k, paid at 2.5× = **$42.7k**) |
| Startup capital (stage 1) / peak incl. route | **$27.3k / $74.6k** |
| Net per machine per month | $9 / **$118** / $300 |
| Owner hours/week | 14 |
| Payback (base / high) | **57 months** / 29 |
| Year-1 profit | −$2.0k / **$2.2k** / $9.2k |
| Year-3 profit | $1.8k / **$21.7k** / $54.8k (**~$30/h**) |
| Capital at risk | ~$27k in stage 1 (only ~$17k beyond resale). The route stage is committed only after 12 months of real data |
Same profit as A for fewer hours. The second, larger cheque is written by someone who can read telemetry and price a route.

### D. Buy a 12-machine route on day one
| Metric | @ 2.5× verified SDE | @ 3.1× (typical ask) |
|---|---|---|
| Purchase price (SDE ~$19.3k) | **$51.8k** | $63.4k |
| Startup capital = peak | **$62.7k** | $74.2k |
| Net per machine per month | $20 / **$134** / $324 | same |
| Owner hours/week | ~11 | ~11 |
| Payback (base / high) | **48 months** / 20 | 56 / 23 |
| Year-1 profit (15% site loss) | −$1.0k / **$12.9k** / $36.2k | same |
| Year-3 profit | $1.8k / **$17.4k** / $43.4k (~$31/h) | same |
| Capital at risk | ~$38.7k | ~$50.2k |
The only option with real year-1 income, and the best $/hour. The risk sits entirely in **verification**. If the seller's sales are 30% overstated, year-3 profit drops to $6.5k on a $63k outlay. 02 found no genuine Melbourne route listed in 2026, so supply is the binding constraint.

### E. Franchise AI-fridge packages (2 in yr 1, 3rd in month 19)
| Metric | Value |
|---|---|
| Startup capital / peak | **$90.2k / $131.5k** |
| Net per unit per month | −$103 / **$22** / $228 |
| Owner hours/week | 7 |
| Payback | **Never within 10 years** at any tier |
| Year-1 profit | −$2.7k / **−$0.6k** / $2.9k |
| Year-3 profit | −$3.7k / **$0.8k** / $8.2k |
| Capital at risk | ~$120k |
About $30k of each $40.5k package buys a site and training, not an asset (05). Even at High sales and 0% royalty the package takes ~6 years to pay back. A $29,970 AIPVend machine needs ≥$300/wk even at the franchisor-style 35% COGS to repay in ~5 years (KB §5b).

### F. Placement package (5 new combos + "secured" sites, $30k + GST)
| Metric | Value |
|---|---|
| Startup capital = peak | **$36.3k** |
| Net per machine per month | −$35 / **$25** / $164 |
| Owner hours/week | 7 (scattered, 20 km/visit) |
| Payback (base / high) | **>120 months** / 39 |
| Year-1 profit | −$2.4k / **$1.0k** / $8.9k |
| Year-3 profit | −$0.9k / **$3.2k** / $12.8k (~$9/h) |
| Capital at risk | ~$21.3k |
Base revenue is $145/wk, a blend of 40% weak sites at $100 and 60% at $175 (03: 30–50% of package sites need re-siting). Scattered sites and the ~$1.7k-per-machine premium over used DIY kit ($6,600 vs $4,900 placed) sink it.

### G. Placement-only (locator)
| Metric | Value |
|---|---|
| Startup capital | ~$1.5k |
| Model | $300 per placement (low $150 / high $500; **no AU fee is published**, ESTIMATE), 2 placements a month, $2.8k/yr driving and admin |
| Net per month | $67 / **$367** / $767 |
| Owner hours/week | ~5 |
| Payback | ~4 months |
| Year-1 / year-3 profit | **$4.4k / $6.2k** (~$24/h) |
| Capital at risk | ~$1.5k |
01 and 02 found almost no paying demand, because package sellers bundle locating. Income is capped by hours, and the business builds no asset.

---

## 4. Sensitivity: year-3 profit (Base = 100%)

| Option | Base | Sales −30% | Sales +30% | COGS −5 pts | COGS +5 pts | Commission 0% | Commission 20% |
|---|---|---|---|---|---|---|---|
| A | 20.7k | 6.5k | 34.9k | 26.8k | 14.5k | 33.0k | 8.4k |
| A+C | 21.6k | 7.1k | 36.1k | 27.7k | 15.4k | 33.9k | 9.3k |
| A+B-lite | 22.8k | 7.3k | 38.3k | 30.4k | 15.2k | 38.0k | 7.5k |
| A→D | 21.7k | 7.8k | 35.6k | 27.7k | 15.7k | 33.7k | 9.7k |
| D @2.5× | 17.4k | 6.5k | 28.3k | 22.1k | 12.7k | 26.8k | 7.9k |
| E | 0.8k | −2.4k | 3.9k | 3.3k | −1.7k | 5.7k | −4.2k |
| F | 3.2k | −0.8k | 7.2k | 4.9k | 1.5k | 6.6k | −0.2k |
| G | 6.2k | 3.5k* | 8.9k* | n/a | n/a | n/a | n/a |
*For G, ±30% applies to the number of placements.

Per used combo (base, yr 1): $109/month → $40 (sales −30%), $179 (+30%), $144 / $75 (COGS ∓5 pts), $178 / $40 (commission 0 / 20%).

**Reading:** for every machine-owning option, **a 30% sales miss or a 20% commission cuts profit by about two-thirds**. Commission is as powerful a lever as site volume, so host negotiation is a financial skill. COGS ±5 pts moves profit by about ±30%. Payback is >10 years at Low sales for every option. **Site quality is the investment.**

---

## 5. Scores: financial attractiveness (1–5)

| Option | Score | Headline (Base) | Why |
|---|---|---|---|
| A | **3** | $39.5k start; yr 3 $20.7k; ~$25/h; payback ~5 yrs | Cheap staged entry, capital mostly recoverable, but thin $/h |
| A+C | **3** | ≈A + $0.9k/yr | Financially near-identical to A. Choose it for strategic reasons |
| A+B-lite | **3** | yr 3 $22.8k on $80k peak; ~$22/h | Most profit dollars, but more capital, hours and waste risk |
| **A→D** | **4** | $27k stage 1; yr 3 $21.7k; **~$30/h** | Best risk-adjusted: small first cheque, the big cheque is informed by real data, and fewer hours |
| D | **3** (4 if ≤2.5× verified SDE) | $62.7k; yr 1 $12.9k; payback 48 months | Fastest income and best $/h; failure modes are overpaying and thin supply |
| E | **1** | $90k+; ~breakeven; never pays back | The package premium cannot be recovered at plausible sales |
| F | **1** | $36k; yr 3 $3.2k; >10-yr payback | Scattered, weak sites at new-kit prices |
| G | **2** | $1.5k; ~$6k/yr | No capital at risk, but small, unverified demand and no asset |

---

## 6. Tax and finance overlay (checked 4 Nov 2026; 5 web searches)

| Item | Status | Effect on options |
|---|---|---|
| Non-commercial loss rules | **Verified (ATO):** adjusted taxable income under $250k **and** one of 4 tests (income ≥$20k, profits in 3 of 5 years, real property ≥$500k, other assets ≥$100k excl. cars). https://www.ato.gov.au/businesses-and-organisations/income-deductions-and-concessions/losses/non-commercial-losses/offset-or-defer-the-loss-individuals-or-sole-traders | Pilots of 1–3 machines (<$20k sales) **fail**, so their write-off loss is deferred. A, A+C and A+B-lite (~$35–40k yr-1 sales) and A→D stage 1 (~$27k) probably pass the ≥$20k income test, but only just, so keep records. D (~$84k yr-1 sales) passes. The ATO flagged NCL claims as a focus area in Feb 2026 |
| Personal rates 2026–27 | **Verified (secondary):** 15% on $18,201–45,000, then 30% / 37% / 45%, plus 2% Medicare. https://www.wagecalculator.com.au/tax-rates/2026-27 | A side-business profit of $20k is taxed at a 32% marginal rate for most salaried founders |
| Company rate | **Verified (ATO):** 25% for a base-rate entity (turnover <$50M, passive income ≤80%). https://www.ato.gov.au/tax-rates-and-codes/company-tax-rate-changes | Pty Ltd caps the rate at 25% and keeps losses inside the company. Worth considering from ~10 machines |
| Small-business pool | **Verified (ATO):** assets ≥ the IAWO threshold go into the pool at 15% in year 1, then 30%. https://www.ato.gov.au/business/depreciation-and-capital-expenses-and-allowances/simpler-depreciation-for-small-business/ | **E's $40.5k packages are over $20k**, so they get no instant write-off (another negative for E). Combos and fridges (<$20k) are written off immediately |
| Voluntary GST registration | **Verified (ATO):** generally must stay registered ≥12 months. https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/registering-for-gst | Registering recovers 10% of capex; recommended for every option except G |
| GST cash basis for turnover <$10M | Secondary sources only; [BK] remains | Cash basis suits every option |
| Route purchase | [BK] not checked: GST-free "going concern" treatment; goodwill is not depreciable | In D, only the machine value (each <$20k) is deductible. Goodwill (~50–70% of the price) is not, so the purchase should split out each machine's value |

**Finance:** don't borrow for A or F. Equipment loans at ~9.5% absorb most of a Base machine's contribution (KB). For D, a loan only makes sense against telemetry-verified SDE: $50k over 5 years ≈ $1,050/month against ~$1,450/month of base profit.

## 7. Top messages for 00 / 09
1. **No option makes a full-time income by year 3 at Base sales.** The best options give ~$17–23k/yr for 11–20 h/wk ($22–31/h before tax). Reaching $50k+ needs High-band sites, or 30+ machines and a van.
2. **A→D is the best financial path**, with D a close second if a genuine route can be bought at ≤2.5× verified SDE. A+C and A+B-lite are A plus strategy, not better finances.
3. **E and F destroy value at plausible sales**, because the buyer pays new-kit or package prices for sites they cannot verify.
4. **Commission and site volume dominate.** A 20% commission or a 30% sales miss removes ~60–70% of profit, so the "free full service at 0–10%" norm is load-bearing.

Open items for 09: verify the $350/wk fridge assumption, a real locator fee for G, and actual franchise royalties for E.
