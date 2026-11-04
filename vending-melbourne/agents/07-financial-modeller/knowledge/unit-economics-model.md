# Unit Economics Model — Per Machine

**Owner:** 07 Financial Modeller · **Research date:** 4 Nov 2026 · AUD, ex-GST P&L
Inputs and sources are in `cost-structure.md` and `revenue-benchmarks.md`. Every output here is an **ESTIMATE** built from those inputs. Calculations were run in a Python script, with values rounded to the nearest dollar.

## Jargon
- **Contribution:** revenue minus all costs that belong to a machine. It is what the machine adds toward business overheads, the owner's time and paying back capex.
- **Payback:** capex ÷ annual contribution, in years.
- **Breakeven PMPW:** the gross weekly sales (incl GST) at which a target is just met.

---

## 1. Base assumptions (all ESTIMATE unless sourced in cost-structure.md)

| Parameter | Value |
|---|---|
| Revenue ex-GST | Gross × 52 ÷ 1.1 |
| COGS | 45% of ex-GST revenue |
| Commission | 10% of ex-GST revenue |
| Cashless share × card fee | 80% × 4% (= 3.2% of revenue) |
| Shrinkage/spoilage | 3% |
| Telemetry licence | $14.70/month = $176/yr |
| Vehicle | 52 visits × km per visit × $0.91 |
| Maintenance | $200/yr |
| Machine insurance share | $100/yr |
| Electricity | $0 (host pays) |
| Capex, new combo | $9,300 (machine $7,500 + reader $1,400 + install $400) |
| Capex, used combo | $5,000 |
| Owner labour | **Excluded** from contribution and shown separately in scenarios |

## 2. Per-machine P&L — classic combo

### 2a. A lone machine (25 km round trip per weekly visit)
| Line ($/yr) | Low $100/wk | **Base $175/wk** | High $300/wk |
|---|---|---|---|
| Gross sales incl GST | 5,200 | 9,100 | 15,600 |
| **Revenue ex-GST** | **4,727** | **8,273** | **14,182** |
| COGS 45% | 2,127 | 3,723 | 6,382 |
| Commission 10% | 473 | 827 | 1,418 |
| Card fees | 151 | 265 | 454 |
| Telemetry | 176 | 176 | 176 |
| Shrinkage 3% | 142 | 248 | 425 |
| Vehicle (25 km) | 1,183 | 1,183 | 1,183 |
| Maintenance | 200 | 200 | 200 |
| Insurance share | 100 | 100 | 100 |
| **Total costs** | 4,552 | 6,722 | 10,339 |
| **Contribution** | **175** | **1,550** | **3,843** |
| Contribution margin | 3.7% | 18.7% | 27.1% |
| Payback on $9,300 new | 53 yrs | 6.0 yrs | 2.4 yrs |

### 2b. A machine inside a clustered route (8 km per visit, typical at 15–20+ machines)
| Line ($/yr) | Low $100/wk | **Base $175/wk** | High $300/wk |
|---|---|---|---|
| Revenue ex-GST | 4,727 | 8,273 | 14,182 |
| Variable costs (COGS + commission + card + shrink) | 2,893 | 5,063 | 8,679 |
| Fixed machine costs (telemetry + vehicle $379 + maint + ins) | 855 | 855 | 855 |
| **Contribution** | **979** | **2,355** | **4,648** |
| Margin | 20.7% | 28.5% | 32.8% |
| Payback, new ($9,300) | 9.5 yrs | **3.9 yrs** | 2.0 yrs |
| Payback, used ($5,000) | 5.1 yrs | **2.1 yrs** | 1.1 yrs |

**Takeaway:** route density is worth about **$800/machine/year** at Base, the gap between 1,550 and 2,355. A lone machine 25 km from home barely pays for the driving.

## 3. Breakeven points (gross PMPW incl GST)

| Target | Lone machine | Dense route |
|---|---|---|
| Cash breakeven (contribution = $0) | **$90/wk** | **$47/wk** |
| Recover new capex in 3 years ($3,100/yr) | — | **$216/wk** |
| Recover capex in 3 yrs + $300/machine share of overheads | — | **$232/wk** |
| Recover **used** capex ($5,000) in 3 yrs + overheads | — | ≈ **$155/wk** (interpolated) |

So "**$150/week minimum**", the operator forum rule, roughly matches what a **used** machine on a dense route needs to pay itself back in 3 years. A **new** $9k+ machine needs a **$220+/week** site.

## 4. Financing overlay
- A $9,300 chattel mortgage at **9.5% p.a.** over 5 years = **$195/month ($2,344/yr)**, with total interest ≈ $2,419.
- Rate basis: prime SME equipment finance advertised from 7.49–7.95% up to 10.95%, with sub-prime and new-business borrowers higher. https://www.money.com.au/equipment-finance-interest-rates ; https://integratedfinancegroup.com.au/blog/equipment-finance-melbourne-sme-2026/ . A new ABN without trading history will probably sit at the upper end or above (ESTIMATE).
- **At Base on a dense route ($2,355 contribution), a fully financed new machine only just covers its repayments.** At Low it runs cash-negative by ~$1,365/yr. Financing new machines makes sense only for proven High sites.

## 5. Alternative formats (per unit, ESTIMATE)

### 5a. AI smart fridge (capex $10,000. 2 visits/wk × 15 km. COGS 50%. Shrink 6%. Platform/card 6% of revenue + $45/month software. Maint $300. Ins $150)
| $/yr | Low $200/wk | Base $350/wk | High $600/wk |
|---|---|---|---|
| Revenue ex-GST | 9,455 | 16,545 | 28,364 |
| COGS 50% | 4,727 | 8,273 | 14,182 |
| Commission 10% | 945 | 1,655 | 2,836 |
| Platform/card 6% | 567 | 993 | 1,702 |
| Software $45/month | 540 | 540 | 540 |
| Shrink 6% | 567 | 993 | 1,702 |
| Vehicle (104 × 15 km) | 1,420 | 1,420 | 1,420 |
| Maint + ins | 450 | 450 | 450 |
| **Contribution** | **238** | **2,223** | **5,532** |
| Payback ($10k) | 42 yrs | 4.5 yrs | 1.8 yrs |

Fresh food adds food-safety obligations and wastage. It needs twice-weekly visits.

### 5b. Franchise / "interactive" specialty machine (capex ~$30,000 incl package. COGS 35%. Commission 10%. 15 km visits)
| $/yr | $300/wk | $600/wk | $900/wk |
|---|---|---|---|
| Revenue ex-GST | 14,182 | 28,364 | 42,545 |
| Contribution | 5,735 | 12,655 | 19,576 |
| Payback on $30k | 5.2 yrs | 2.4 yrs | 1.5 yrs |
- Price basis: AIPVend "from AUD $29,970 + GST per machine" (Sept 2026 feature, https://businessfranchiseaustralia.com.au/news/aipvend). Just Now Vending "from $50,000" (https://www.business2sell.com.au/franchise-details/just-now-vending.php).
- **Revenue bands are franchisor-style claims and unverified.** No royalty was modelled; add any royalty the franchisor's disclosure document specifies. Hand-off to 09 Devil's Advocate.

### 5c. Buying an existing route (10 machines, $175/wk, 10 km visits, $2,500 fixed)
| Item | Value |
|---|---|
| Fleet contribution | $22,602 |
| Less fixed | −$2,500 |
| **Net profit before owner labour (≈SDE)** | **$20,102** |
| Price at 2× SDE (typical) | ≈ $40,000 |
| Payback if you pay $100k (e.g. Melbourne 11-machine ask of $100k + GST) | 5.0 yrs |
- Multiples: US vending routes trade at ~2–4× SDE, with a BizBuySell median ~2.15–2.27×: https://bizbuysell.com/learning-center/valuation-benchmarks/vending-machine-business . The NSW example of $82k ask vs ~$40k profit ≈ 2×.
- **Rule:** never pay more than ~2.5× verified SDE. Verify through machine telemetry exports and bank statements, not broker summaries. Site agreements must be assignable (hand-off to 08).

## 6. Per-machine sensitivity (Base, dense route; contribution $2,355)

| Change (one at a time) | Contribution | Δ vs base |
|---|---|---|
| Sales −30% ($122.50/wk) | 1,392 | −963 |
| Sales +30% ($227.50/wk) | 3,318 | +963 |
| COGS 40% | 2,768 | +414 |
| COGS 55% | 1,528 | −827 |
| Commission 0% | 3,182 | +827 |
| Commission 20% | 1,528 | −827 |
| Card fee 6% | 2,222 | −132 |
| Card fee 2.5% | 2,454 | +99 |
| Shrink 6% | 2,107 | −248 |
| 15 km per visit (sparser route) | 2,024 | −331 |
| 2 visits/week | 1,976 | −379 |
| Operator pays electricity ($1,000/yr) | 1,355 | −1,000 |

**Ranking of what matters:** (1) sales volume, i.e. the site. (2) COGS / purchasing. (3) Commission. (4) Who pays electricity. (5) Route density and visit frequency. Card fees and telemetry are second-order.

## 7. Model limitations
- Revenue is assumed flat year-round. Real Melbourne sites have seasonality and ramp-up (see revenue-benchmarks.md).
- No price inflation or CPI escalation is modelled.
- The 8-year life used for depreciation is an ESTIMATE (ATO effective life not verified). See tax-and-finance.md.
