# Risk Register

Owner: 09 Devil's Advocate · Researched: 4 Nov 2026 · Greater Melbourne

Scoring (ESTIMATE, judgement for a first-year operator with 1–10 machines):
- **L** likelihood 1–5 (5 = almost certain within 12 months)
- **I** impact 1–5 (5 = threatens the business / >$5k loss)
- **Score** = L × I. ≥15 red, 8–14 amber, ≤7 green.

Options: A classic, B smart fridge, C micro-market, D niche, E buy route, F franchise/package.

| ID | Risk | Options most exposed | L | I | Score | Mitigation | Trigger / KPI | Evidence |
|---|---|---|---|---|---|---|---|---|
| R01 | Placed in a low-traffic site; sales below break-even | A, D | 4 | 4 | **16** | Site audit (foot-traffic count, headcount for workplaces); trial with month-to-month agreement; move fast | <$100/wk gross after 8 wks | Location primacy: vendingmachinesaustralia.com.au (vendor); $160/wk rule of thumb (RealCommercial) |
| R02 | Host terminates / venue closes | A, B, E, F | 3 | 4 | **12** | Written agreement with 30–90 day notice; diversify across ≥5 hosts; relationship with decision-maker | Manager change; tender notice | $20k site shut before $16k earned (RealCommercial); 8 machines pulled in 30 days (vendiscuss 14920) |
| R03 | Buy overpriced package or outright scam | F, A, D | 3 | 5 | **15** | Red-flag checklist (scams-and-red-flags.md §5); independent pricing; call venues directly | ≥3 red flags | ACCC Michigan Group (accc.gov.au/node/14733); SDNY 2015 |
| R04 | Bought route's contracts don't transfer | E | 3 | 5 | **15** | Assignment clauses; holdback/earn-out; meet every host pre-settlement | Host won't confirm in writing | vendiscuss 14920; vmfsusa route guide |
| R05 | Net margin overestimated (GST, commission, fees, time ignored) | All | 5 | 3 | **15** | Use hidden-costs.md P&L template | Hourly rate < min wage | hidden-costs.md §3 |
| R06 | Break-in / vandalism | A, D (public, 24/7) | 2–3 | 4 | **8–12** | Indoor, staffed or CCTV sites; cashless-only; reinforced cabinets; insurance | Any incident; 2nd incident = relocate | Sydney station break-ins (theleader.com.au 5095049); Dubbo RVM vandalism |
| R07 | Shrink in open formats | C, B | 4 | 3 | **12** | Smart fridge locks, cameras, start in small closed workplaces, weekly reconciliation | Shrink >5% for 2 months | 4–6% typical, 12% outlier (US trade/vendor sources) |
| R08 | Payment-cost creep; can't surcharge | All | 4 | 2 | **8** | Negotiate provider rates; price at round GST-inclusive points; bundle; review annually | Payment costs >6% of sales | RBA ban from 1 Oct 2026 (rba.gov.au mr-26-10); 17c/tx forum |
| R09 | Wholesale inflation outpaces price rises | A, B | 4 | 2 | **8** | Quarterly price review; product mix toward higher-margin lines | Gross margin falls >5 pts | CPI 4.3% Sep 2026 (secondary, verify ABS) |
| R10 | Incumbent operator undercuts commission / wins tender | A, B, C | 3 | 3 | **9** | Target sites too small for incumbents; service quality; local relationships | Host asks you to match offer | Commission driven by traffic/demand (vendingexchange.com) |
| R11 | Machine breakdown, long downtime | A (used) | 3 | 2 | **6** | Buy common models with local parts (hand-off 05); telemetry alerts; spare parts kit | >48h downtime | Operator forums (qualitative) |
| R12 | Fresh-food safety incident / Food Act non-compliance | B, C | 2 | 5 | **10** | Correct FoodTrader class; temperature logging; supplier with food-safety program | Temp alarm; council inspection | ablis.business.gov.au council listings |
| R13 | Operator burnout / time overrun | All | 4 | 3 | **12** | Cluster sites geographically; telemetry-driven restocking; cap sites per hour of travel | >1.5 h/machine/week sustained | hidden-costs.md §2 |
| R14 | Office-site demand weakened by hybrid work | B, C (CBD offices) | 3 | 3 | **9** | Prefer sites with 5-day rosters (manufacturing, warehouses, hospitals, trades) | Badge-in data / host headcount | Not verified (search budget exhausted) — hand-off 01/03 |
| R15 | Cash use decline strands coin-only machines | A (used) | 4 | 2 | **8** | Cashless reader on every machine from day 1 | Cash share of sales <20% | Qualitative; RBA data not retrieved — hand-off 01 |
| R16 | Payment-tech obsolescence (network/firmware sunset) | All | 2 | 3 | **6** | Buy current-gen 4G/LTE readers; avoid old-modem stock | Vendor end-of-life notice | Precedent: 3G shutdown in Australia (2024) — from general knowledge, verify |
| R17 | Insurance gap — PL lapses or theft not covered | All | 2 | 4 | **8** | $10m PL (host requirement); read theft exclusions | Renewal date | upcover.com; bizcover.com.au |
| R18 | Unfair / one-sided site, locator or franchise contract | E, F | 3 | 4 | **12** | Legal review; unfair contract terms protections | Penalty clauses, auto-renewal | Hand-off 08 |
| R19 | Product liability (allergen labelling, recall) | B, C, D | 2 | 4 | **8** | Use only properly labelled, compliant products; recall monitoring (FSANZ) | Recall notice | Hand-off 08 |
| R20 | Capital concentration — single machine/site is whole business | All (small start) | 4 | 3 | **12** | Start with 2–3 lower-cost machines across different host types rather than one expensive unit | — | Judgement |

## Heat map (by score)

- **Red (≥15):** R01 bad location · R03 scam/overpriced package · R04 route non-transfer · R05 margin overestimate
- **Amber (8–14):** R02, R06, R07, R08, R09, R10, R12, R13, R14, R15, R17, R18, R19, R20
- **Green (≤7):** R11, R16

## Option-level risk profile (ESTIMATE)

| Option | Dominant risks | Overall risk for a zero-base beginner |
|---|---|---|
| A Classic snack/drink | R01, R02, R05, R06 | Medium — cheap to test, cheap to fail |
| B Smart fridge | R05 (capex), R07, R12, R14 | Medium-High — higher capex, needs captive workplace |
| C Micro-market | R07, R12, R14, needs large sites | High for a beginner — sites scarce, held by incumbents |
| D Niche/specialty | R01, R03 (novelty packages), novelty decay | High — unproven demand |
| E Buy existing route | R04, R05, R02 | Medium-High — fastest income, biggest single-cheque loss if contracts fail |
| F Franchise/package | R03, R18 | High — fees embedded; scam-adjacent market |
