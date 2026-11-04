# Fleet Scenarios — 1, 5 and 20 Machines

**Owner:** 07 Financial Modeller · **Research date:** 4 Nov 2026 · AUD, ex-GST, annual steady state unless stated. **All outputs are ESTIMATES** derived from `unit-economics-model.md` assumptions.

## Scenario design

| Parameter | 1 machine ("test") | 5 machines ("side hustle") | 20 machines ("part-time business") |
|---|---|---|---|
| km per restock visit (route density) | 25 | 15 | 8 |
| Owner hours/machine/week | 1.5 | 1.0 | 0.75 |
| Total owner hours/week | 1.5 | 5 | 15 |
| Business fixed costs/yr | $1,500 | $2,500 | $6,000 |
| Capex per new machine | $9,300 | $9,300 | $9,300 |
| Capex per used machine | $5,000 | $5,000 | $5,000 |
| Opening stock per machine | $600 | $600 | $600 |
| Business setup (one-off) | $2,000 | $2,000 | $2,000 |
| Owner labour value | $35/h | $35/h | $35/h |

Low / Base / High = **average** fleet gross sales of $100 / $175 / $300 per machine per week, incl GST.

---

## 1. Startup capital required

| Fleet | All new | All used | 50/50 mix |
|---|---|---|---|
| 1 machine | **$11,900** | $7,600 | — |
| 5 machines | **$51,500** | **$30,000** | ~$40,750 |
| 20 machines | **$200,000** | **$114,000** | ~$157,000 |

Capital = machines + readers + install + opening stock + $2,000 setup. Add a working-capital buffer of 2–3 months of fixed costs (ESTIMATE: $500 / $1,000 / $3,000).
**GST note:** the capital figures are ex-GST. If you are registered for GST you pay 10% more upfront (e.g. ~$20k on 20 new machines) and claim it back on your next BAS. Unregistered operators cannot claim it back (see tax-and-finance.md).

## 2. Annual P&L by scenario (new machines)

### 1 machine
| $/yr | Low | Base | High |
|---|---|---|---|
| Revenue ex-GST | 4,727 | 8,273 | 14,182 |
| Machine contribution | 175 | 1,550 | 3,843 |
| Less business fixed | −1,500 | −1,500 | −1,500 |
| **Profit before owner labour** | **−1,325** | **50** | **2,343** |
| Owner labour (78 h @ $35) | −2,730 | −2,730 | −2,730 |
| **Profit after labour** | −4,055 | −2,680 | −387 |
| Depreciation (8-yr straight line, accounting) | −1,162 | −1,162 | −1,162 |
| Simple payback on $11,900 | never | ~238 yrs | 5.1 yrs |

**Verdict:** one machine is a **learning exercise, not a business**. Fixed overheads (insurance, accounting, the fleet merchant fee) eat all of the contribution unless the site is High.

### 5 machines
| $/yr | Low | Base | High |
|---|---|---|---|
| Revenue ex-GST | 23,636 | 41,364 | 70,909 |
| Fleet contribution | 3,240 | 10,118 | 21,582 |
| Less business fixed | −2,500 | −2,500 | −2,500 |
| **Profit before owner labour** | **740** | **7,618** | **19,082** |
| Owner labour (260 h @ $35) | −9,100 | −9,100 | −9,100 |
| **Profit after labour** | −8,360 | −1,482 | 9,982 |
| Effective hourly rate to owner | $2.85 | **$29.30** | $73.40 |
| Payback, new ($51,500) | 70 yrs | **6.8 yrs** | 2.7 yrs |
| Payback, used ($30,000) | 41 yrs | **3.9 yrs** | 1.6 yrs |

### 20 machines
| $/yr | Low | Base | High |
|---|---|---|---|
| Revenue ex-GST | 94,545 | 165,455 | 283,636 |
| Fleet contribution | 19,584 | 47,097 | 92,952 |
| Less business fixed | −6,000 | −6,000 | −6,000 |
| **Profit before owner labour** | **13,584** | **41,097** | **86,952** |
| Owner labour (780 h @ $35) | −27,300 | −27,300 | −27,300 |
| **Profit after labour** | −13,716 | 13,797 | 59,652 |
| Effective hourly rate to owner | $17.40 | **$52.70** | $111.50 |
| Depreciation (accounting, 8 yrs) | −23,250 | −23,250 | −23,250 |
| Payback, new ($200,000) | 14.7 yrs | **4.9 yrs** | 2.3 yrs |
| Payback, used ($114,000) | 8.4 yrs | **2.8 yrs** | 1.3 yrs |

**Verdict:** at Base, 20 machines on a tight route gives roughly **$41k/yr for ~15 h/week**. That is a decent part-time income but not a full-time salary. Reaching ~$80k+ owner income needs either High-band sites or roughly 35–40 Base machines (ESTIMATE, linear extrapolation that ignores the need for a van and storage).

## 3. Year-1 monthly cash flow — 5 used machines, Base, one machine added per month

Assumptions: new sites ramp at 60% in month 1, 85% in month 2, 100% from month 3. 15 km visits. $2,000 setup paid in month 0. Each machine costs $5,600 cash (capex + stock) in the month it is placed.

| Month | Active machines | Revenue ex-GST | Operating cash | Capex out | Net cash | Cumulative |
|---|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 2,000 setup | −2,000 | −2,000 |
| 1 | 1 | 414 | −147 | 5,600 | −5,747 | −7,747 |
| 2 | 2 | 1,000 | −18 | 5,600 | −5,618 | −13,365 |
| 3 | 3 | 1,689 | 151 | 5,600 | −5,449 | −18,814 |
| 4 | 4 | 2,378 | 319 | 5,600 | −5,281 | −24,095 |
| 5 | 5 | 3,068 | 488 | 5,600 | −5,112 | −29,207 |
| 6 | 5 | 3,344 | 595 | 0 | 595 | −28,612 |
| 7–12 | 5 | 3,447/month | 635/month | 0 | 635/month | −24,802 at m12 |

- **Peak funding need ≈ $29,200** (month 5). After that the fleet returns ~$635/month, so cumulative cash turns positive around **month 51 (~4.3 years)**, consistent with the 3.9-yr steady-state payback plus ramp.
- Owner labour is unpaid in this table.

## 4. Suggested staged path (ESTIMATE)

| Stage | Machines | Cumulative capital (used-heavy) | Base profit before labour | Gate to proceed |
|---|---|---|---|---|
| A — prove it | 1–2 | $8–14k | ~$0–2k | One site sustaining ≥$175/wk for 3 months |
| B — side hustle | 5 | ~$30k | ~$7.6k | Average ≥$150/wk, COGS ≤45% |
| C — cluster | 10–12 | ~$60–70k | ~$18–22k | Sites within ~10 km of each other |
| D — scale | 20 | ~$114k | ~$41k | Consider a small van, storage and a casual restocker |

## 5. Scenario sensitivity — 20 machines, Base (profit before labour $41,097)

| Shock | Profit before labour | Δ |
|---|---|---|
| Average sales −30% | ~$21,800 | −19,260 |
| Average sales +30% | ~$60,400 | +19,260 |
| COGS 55% (poor buying) | ~$24,600 | −16,540 |
| Commission 20% | ~$24,600 | −16,540 |
| Operator pays electricity on all machines | ~$21,100 | −20,000 |
| 3 machines vandalised/removed (17 active) | ~$34,000 | −7,065 |
| Card fee 6% instead of 4% | ~$38,460 | −2,640 |

(Δ = per-machine deltas from unit-economics-model.md §6 × 20. Machine-loss row = 3 × $2,355.)

## 6. Comparison of business-model options (Base case, ESTIMATE)

| Option | Upfront capital | Profit before labour/yr | Owner h/wk | Payback | Main risk |
|---|---|---|---|---|---|
| 5 used combos (start-up) | ~$30k | ~$7.6k | 5 | ~4 yrs | Finding good sites |
| 20 used combos (built) | ~$114k | ~$41k | 15 | ~2.8 yrs | Time to build, plus site churn |
| Buy 10-machine route @ 2× SDE | ~$40–45k | ~$20k | 8 | ~2 yrs | Overstated sales, sites not assignable |
| Buy route at broker ask (~$100k/11 machines) | ~$100k + GST | ~$20–22k | 8 | ~5 yrs | Overpaying |
| 5 AI smart fridges | ~$55k | ~$11.1k − fixed ≈ $8.6k | 8–10 | ~6.4 yrs | Fresh-food waste, theft, few suitable sites |
| 1 franchise interactive machine | ~$30k + GST | ~$5.7–12.7k (claims) | 2–3 | 2.4–5.2 yrs | Unverified franchisor revenue claims |
