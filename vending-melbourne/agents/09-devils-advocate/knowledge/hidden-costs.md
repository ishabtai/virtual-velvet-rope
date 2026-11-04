# Hidden Costs and Time Drains

Owner: 09 Devil's Advocate · Researched: 4 Nov 2026 · AUD, Greater Melbourne

Purpose: list the costs a beginner leaves out of the "machine price + stock = profit" picture, and stress-test a typical single-machine P&L. Hand this to 07-financial-modeller as a checklist of lines that must appear in every scenario.

---

## 1. Cost checklist (what sellers rarely mention)

| # | Cost line | Typical basis | Evidence / note |
|---|---|---|---|
| 1 | **GST on sales** | 1/11 of GST-inclusive takings once registered (compulsory at $75k turnover; optional below). Most vending lines (confectionery, soft drinks, bottled water) are taxable | ATO GST rules; hand-off to 08/07 to confirm item-level treatment |
| 2 | **Host commission** | % of gross (often quoted ~10% in AU examples), flat rent, or hybrid; inc/ex GST basis matters | 10% venue commission example: https://www.vjmglobal.com/feeds/blog/start-vending-machine-business-australia ; flat-rent alternatives: https://vendingexchange.com/vending-faqs/how-do-vending-machine-commissions-work |
| 3 | **Card reader hardware** | ~$400+ per reader (AU forum) | https://vendiscuss.net/topic/36024-any-australians-upgraded-to-card-readers/ (anecdotal) |
| 4 | **Per-device monthly fee** | ~$15+/month (AU forum, Nayax) | same |
| 5 | **Per-transaction fee** | ~17c per sale (AU forum) or % + fixed (US: 3.5% + US$0.20) | same; https://vmfsusa.com/nayax-vending-card-reader-guide/ |
| 6 | **No surcharging from 1 Oct 2026** | Card costs can't be passed on as a surcharge on eftpos/Mastercard/Visa | https://rba.gov.au/media-releases/2026/mr-26-10.html |
| 7 | **Shrink, expiry, damaged stock** | 3–6% in micro-markets (US data); expiry significant for fresh food | https://www.cantaloupe.com/articles/best-practices-for-securing-your-micro-market/ |
| 8 | **Vehicle** | Fuel, wear, rego, insurance; ATO cents/km rate was 88c/km for 2024-25 (verify 2026-27 rate) as a proxy for full running cost | ATO cents-per-km method — ESTIMATE use |
| 9 | **Parking / tolls** | Inner Melbourne servicing often requires paid parking or loading-zone time; parking fines are a real line | ESTIMATE — no source found |
| 10 | **Repairs and parts** | Spiral motors, coin mech, note validator, compressor, screen | ESTIMATE $200–600/machine/yr; higher for used |
| 11 | **Moving a machine** | Removalist/tail-lift + 2 people whenever a site is lost | ESTIMATE $250–600 per move within Melbourne |
| 12 | **Storage** | When a site is lost, the machine needs somewhere to live | ESTIMATE $150–300/month for a small storage unit |
| 13 | **Public liability insurance** | Usually $10m cover demanded by hosts; small-business PL ~$400–1,500/yr for $5–10m | https://www.upcover.com/blog/public-liability-insurance-cost-australia ; $10m most common limit: https://www.bizcover.com.au/how-much-public-liability-insurance-do-i-need/ |
| 14 | **Machine/contents insurance** | Theft & vandalism cover often excluded or high-excess for machines in public places | ESTIMATE; get broker quote |
| 15 | **Food Act registration** | Class 4 (pre-packaged, shelf-stable) notification = $0; class 2/3 vending fees e.g. Banyule $133 / $107; Maribyrnong renewals $215 / $175 — **per council** | https://ablis.business.gov.au/service/vic/registration-notification-of-a-food-vending-machine-banyule-city-council/31633 ; https://ablis.business.gov.au/service/vic/registration-notification-of-a-food-vending-machine-maribyrnong-city-council/31766 |
| 16 | **Electricity** | Usually host-paid, but refrigerated machines can use ~2,000–3,000 kWh/yr — hosts increasingly ask for a contribution or deduct it from commission | ESTIMATE; hand-off to 05 for real kWh specs |
| 17 | **Cash handling** | Coin counting, bank deposit fees, float, cash-in-transit risk | ESTIMATE; shrinking as cash use falls |
| 18 | **Software / accounting** | Bookkeeping app, BAS preparation, accountant at year-end | ESTIMATE $500–1,500/yr total business |
| 19 | **Locator fees** | Some services charge a fee per placed site | Not verified for AU — open question |
| 20 | **Depreciation / obsolescence** | Machine life ~7–10 yrs; payment tech refresh (3G shutdown precedent) faster | ESTIMATE |
| 21 | **Opportunity cost of capital** | Money tied up in machines could earn ~4–5% in a savings account | ESTIMATE |
| 22 | **Your time** | See §2 | — |

---

## 2. Time drains (per week, ESTIMATE)

| Task | Per machine | Notes |
|---|---|---|
| Driving & parking | 20–40 min | Melbourne traffic; depends heavily on site clustering |
| Restock, rotate, check expiry | 15–25 min | Longer for smart fridges with fresh food |
| Clean, jams, test card reader | 5–10 min | |
| Wholesale buying (Costco/Campbells/Metcash cash-and-carry, online) | 5–10 min (amortised) | Hand-off to 06 |
| Refunds, customer complaints, host messages | 5 min | |
| Bookkeeping, BAS, telemetry review | 5 min | |
| Prospecting for new sites | Unbounded at start | 20–50 cold approaches per signed site is plausible — ESTIMATE, no source |
| **Total realistic** | **~1–1.5 h/machine/week** | vs "1 hour per week for 11 machines" claim in a listing (https://www.businessforsale.com.au/australia/JBS5-386412/) |

Time scales sub-linearly once sites are clustered and telemetry lets you skip visits, but a beginner with 1–5 scattered machines sits at the top of the range.

---

## 3. Worked single-machine P&L stress test (ESTIMATE)

Assumptions (all ESTIMATE, chosen to be middle-of-the-road and to match the published AU rule of thumb of $160/week minimum per machine, RealCommercial):

- Gross takings **$160/week** GST-inclusive → $8,320/yr → $7,564 ex GST (operator assumed GST-registered).
- Avg sale $3.50 inc GST → ~2,380 sales/yr; 85% cashless.
- Cost of goods 45% of ex-GST sales.
- Commission 10% of ex-GST sales.
- Payment: 17c + 1.5% per card sale + $15/month.
- Machine + reader $5,000 depreciated over 7 years.
- Vehicle allocation: 10 km/visit × 52 × ~$0.88/km.

| Line | $/yr |
|---|---|
| Sales ex GST | 7,564 |
| Cost of goods | −3,404 |
| Host commission | −756 |
| Card fees + monthly device fee | −600 |
| Shrink/expiry/damage | −150 |
| Vehicle | −500 |
| Parking | −150 |
| Repairs | −300 |
| Insurance allocation | −120 |
| Accounting/software allocation | −100 |
| **Net before depreciation & labour** | **≈ 1,484** |
| Depreciation | −714 |
| **Net after depreciation** | **≈ 770** |
| Hours/yr (1.25 h × 52) | 65 |
| **Effective hourly rate** | **~$23/h before depreciation, ~$12/h after** |
| Simple payback on $5,000 (pre-labour) | ~3.4 years |

**Sensitivity (same assumptions):**

| Gross/week (inc GST) | Net before dep & labour | Net after dep | Read |
|---|---|---|---|
| $100 | ≈ $400 | ≈ −$310 | Loses money once the machine wears out |
| $160 | ≈ $1,480 | ≈ $770 | Pays less than minimum wage |
| $250 | ≈ $3,040 | ≈ $2,320 | Workable at scale |
| $400 | ≈ $5,500 (ESTIMATE, scaled) | ≈ $4,800 | Good site — rare and contested |

Compare: the national minimum wage was $24.95/h from 1 July 2025 (2026-27 rate to verify). **A $160/week machine, honestly costed, pays roughly half the minimum wage.** This matches the AU media benchmark of ~$400–500/month net quoted without costs of labour/vehicle (RealCommercial "sad reality" article) only if vehicle, depreciation and time are ignored.

**Takeaways for 07-financial-modeller:**
1. Model at the *ex-GST, after-commission, after-payment-fees* level.
2. Include vehicle, depreciation and the owner's time at a shadow wage.
3. Run a "site lost at month 9" scenario: add move + storage + 2 months zero revenue.
4. Break-even weekly gross per machine should be an explicit output.

---

## 4. Costs specific to each model option

| Option | Extra hidden costs |
|---|---|
| A Classic snack/drink | Coin/note mech maintenance, cash handling, vandalism repairs |
| B Smart fridge | Higher capex; fresh-food expiry write-offs; pre-auth disputes/chargebacks; Food Act class 2/3 fees and inspections if perishable; higher electricity |
| C Micro-market | Shrink 3–6%+; kiosk software subscription; fixtures; more frequent visits; needs 50–100+ staff site (hand-off 03) |
| D Niche/specialty | Novelty decay; inventory risk on slow-moving SKUs (e.g. footwear priced $25–$120+, per RealCommercial "sad reality"); custom machine parts |
| E Buy a route | Broker fee, legal due diligence, stamp duty not normally applicable to goodwill in Vic (verify, hand-off 08), seller hand-over costs, re-signing contracts, immediate repairs on aged fleet |
| F Franchise/package | Franchise/licence fees, mandated suppliers with mark-ups, territory fees, ongoing royalties, exit restrictions |
