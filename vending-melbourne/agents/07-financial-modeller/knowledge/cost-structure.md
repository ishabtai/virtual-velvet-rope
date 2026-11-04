# Cost Structure — Vending in Melbourne

**Owner:** 07 Financial Modeller · **Research date:** 4 Nov 2026 · All P&L costs **ex-GST** unless stated (a GST-registered business claims GST credits on its inputs).

## Jargon
- **Capex:** one-off purchase of long-lived assets (machines, card readers).
- **COGS (cost of goods sold):** what you pay for the stock you sell.
- **Variable cost:** a cost that rises with sales (COGS, commission, card fees).
- **Fixed cost:** a cost per machine or per business that does not move with sales (telemetry, insurance, software).
- **Commission / site rebate:** the share of sales paid to the venue host.
- **Telemetry:** the SIM-connected device that reports sales and stock levels remotely, so you only visit when needed.

---

## A. Startup capital (capex) per machine

| Item | Low | Base | High | Source / reasoning |
|---|---|---|---|---|
| New combo snack/drink machine | $5,500 | $7,500 | $8,800–13,000 | AU supplier: small 3-wide combo from ~$5,500, larger to ~$8,800, "+ payment system". Other AU guides: $6k–9k and $7k–13k. https://www.vendingmachinesaustralia.com.au/buy-a-vending-machine-in-australia ; https://www.hospitalityhub.com.au/vending-machine-prices-and-buying-guide/f/26674 |
| Used/refurbished combo | $3,000 | $4,000 | $5,500 | https://www.vendingmachinesaustralia.com.au/second-hand-vending-machines-a-complete-buyer-s-guide-for-australians |
| AI smart fridge | $6,000 | $10,000 | $15,000+ | https://www.vendingmachinesaustralia.com.au/dispensing-machines-for-sale-in-australia-2026-buyers-guide-for-businesses-and-operators ; US comps US$5,950–7,940: https://vmfsusa.com/blogs/business/ai-vending-machines-the-complete-buyers-guide-2026 |
| Micro-market fit-out | $15,000 | $25,000 | $40,000 | US figures, converted only loosely. **ESTIMATE**. https://vmfsusa.com/blogs/business/ai-vending-machine-vs-micro-market |
| Card reader + telemetry (Nayax-type) | $700 | $1,400 | $2,200 incl GST | AU reseller lists Nayax Onyx at $2,200 incl GST for coffee machines; onboarding $130 + GST once per fleet. https://dipacci.com.au/products/nayax-onyx-contactless-card-reader-suitable-for-dr-coffee . Some used-machine sellers fit a reader free. Base = **ESTIMATE** |
| Delivery, install, stair-climb, levelling | $200 | $400 | $800 | **ESTIMATE**. Pallet-jack delivery inside Greater Melbourne |
| Opening stock (one full load) | $400 | $600 | $900 | **ESTIMATE**. 300–400 items × ~$1.60 average cost |
| **Total per new combo (base)** | | **$9,900** | | $7,500 + $1,400 + $400 + $600 stock. Capex excluding stock = **$9,300** |
| **Total per used combo (base)** | | **$5,600** | | $4,000 + $700 reader + $300 + $600 stock. Excluding stock = $5,000 |

### Business-level one-offs (ESTIMATE)
| Item | Cost | Note |
|---|---|---|
| ABN | $0 | ABR |
| Business name (ASIC) | ~$45–110 | 1- or 3-year registration. Hand-off to 08 to confirm the current fee |
| Pty Ltd company registration (optional) | ~$600 | Hand-off to 08 |
| Food business registration with council | $0–$500/yr | Varies by council and class. **08 to confirm** for each LGA |
| Trolley, pallet jack, tools, storage tubs | $500–1,000 | ESTIMATE |
| Storage (garage / self-storage) | $0–$250/month | Self-storage only at 10+ machines (ESTIMATE) |
| Accountant setup + bookkeeping software | $500–1,500 | Xero/MYOB plus first-year advice. ESTIMATE |

---

## B. Variable costs (% of ex-GST revenue)

| Cost | Low | **Base** | High | Source / reasoning |
|---|---|---|---|---|
| **COGS** | 40% | **45%** | 55% | Wholesale 600 ml Coke = $70.24 incl GST per 24 (Kelly's Distributors), i.e. $2.93 incl / **$2.66 ex-GST each**: https://kellysdistributors.com.au/product-category/carbonated-drinks/coca-cola-products/600ml-coca-cola . Sold at $5.00 incl ($4.55 ex), COGS ≈ **58%**. Snacks and confectionery typically run 30–45% (ESTIMATE). Supermarket/Costco specials can cut drink COGS a lot. Blended base 45% = **ESTIMATE** |
| **Site commission** | 0% | **10%** | 20%+ | AU listings show "10% rebate paid back to the site"; the range is 5–20%+ and negotiable. https://vendingexchange.com/vending-contracts/commissions-in-vending-contracts ; AU listing examples via bsale.com.au. Usually paid on sales ex-GST |
| **Card processing** (on cashless share) | 2.5% | **4%** | 6% | No public Nayax AU per-transaction rate was found. US small-ticket rate is 5.95% (≤$5). https://vmfsusa.com/blogs/business/nayax-vending-card-reader-guide . AU interchange is lower, so base 4% = **ESTIMATE** |
| Cashless share of sales | 70% | **80%** | 90% | RBA 2025 CPS (see revenue-benchmarks.md) |
| **Shrinkage / spoilage / vend failures / refunds** | 1% | **3%** | 6% | Snack/drink 2–3%. Fresh food in smart fridges 5–10%. ESTIMATE |
| Platform % fee (smart fridge / kiosk software) | — | 6% | 8% | Cantaloupe-type kiosk software ~5.4% of gross, card processing 5.5% (US): https://help.vendhubhq.com/en/articles/14779435-machine-fees . Applies to the smart fridge model only |

## C. Fixed costs per machine (per year, ex-GST)

| Cost | Base | Source / reasoning |
|---|---|---|
| Telemetry / card licence / SIM | **$176** ($14.70/month) | Dipacci AU reseller: $14.70 + GST per machine per month for licensing, support, telemetry and SIM, plus **$20 + GST per fleet per month** merchant account fee: https://dipacci.com.au/products/nayax-onyx-contactless-card-reader-suitable-for-dr-coffee . Nayax AU has also referred to a "$16 plan": https://www.nayax.com/news/nayax-au-increases-customer-satisfaction-transformations/ |
| Vehicle (restock visits) | **$1,183** (1 machine) → **$379** (dense route) | ATO cents-per-km rate 2026–27 = **91 c/km** (third-party reports; ATO page showed 88 c for 2025–26), used as a proxy for the full cost of running a car. https://www.driversnote.com.au/blog/ato-cents-per-km-rate-2026-2027 ; https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/work-related-deductions/cars-transport-and-travel/motor-vehicle-and-car-expenses/expenses-for-a-car-you-own-or-lease/cents-per-kilometre-method . Assumes 52 visits/yr × 25 km (lone machine) or × 8 km (machine inside a clustered route). ESTIMATE |
| Repairs & maintenance | **$200** | ~2% of capex. Coils, motors, refrigeration gas, glass. ESTIMATE |
| Machine damage/theft cover (share of policy) | **$100** | ESTIMATE |
| Electricity | **$0** (host pays) | Usual AU practice is that the host supplies power in exchange for commission (ESTIMATE). If you must pay: refrigerated machine 2,500–4,000 kWh/yr (https://vendingexchange.com/vending-faqs/how-much-electricity-does-a-vending-machine-use) × ~28–38 c/kWh Victorian small-business rates (ESC VDO 2026-27, AusNet peak $0.379/off-peak $0.195: https://www.esc.vic.gov.au/electricity-and-gas/prices-tariffs-and-benchmarks/victorian-default-offer) = **$700–1,500/yr**. That is enough to wipe out a Low-band machine's profit |

## D. Business-level fixed costs (per year, ex-GST, ESTIMATE)

| Cost | 1 machine | 5 machines | 20 machines | Source |
|---|---|---|---|---|
| Public & products liability ($20M) | $600 | $700 | $1,000 | AU small-business average ~$605/yr, typical $370–840 (Upcover, 2,000+ policies 2022–26): https://www.upcover.com/blog/public-liability-insurance-cost-australia . Many hosts require $20M cover. Products liability is usually bundled |
| Fleet merchant fee ($20/month) | $240 | $240 | $240 | Dipacci (above) |
| Accounting / BAS / tax return | $500 | $1,000 | $2,500 | ESTIMATE |
| Software (Xero etc.), phone, ABN admin | $160 | $360 | $600 | ESTIMATE |
| Storage, consumables, council registration | $0 | $200 | $1,660 | ESTIMATE (20 machines includes self-storage) |
| **Total fixed** | **$1,500** | **$2,500** | **$6,000** | Used in scenarios |

## E. Owner labour (the cost most beginners leave out)

| Fleet size | Hours/machine/week | Total hours/week | Value @ $35/h (ESTIMATE) |
|---|---|---|---|
| 1 | 1.5 | 1.5 | $2,730/yr |
| 5 | 1.0 | 5 | $9,100/yr |
| 20 | 0.75 | 15 | $27,300/yr |

Hours cover shopping, driving, restocking, cash counting, fault calls and admin (ESTIMATE). $35/h is roughly an adult casual retail/driver rate including on-costs (ESTIMATE). Hand-off to 08: casual award rates and super if you hire a restocker.

## F. Cost stack at Base (one machine on a dense route, $175 gross PMPW)

| Line | $/yr | % of ex-GST revenue |
|---|---|---|
| Revenue ex-GST | 8,273 | 100% |
| COGS | 3,723 | 45.0% |
| Commission | 827 | 10.0% |
| Card fees | 265 | 3.2% |
| Shrinkage | 248 | 3.0% |
| Telemetry | 176 | 2.1% |
| Vehicle | 379 | 4.6% |
| Maintenance + insurance share | 300 | 3.6% |
| **Machine contribution** | **2,355** | **28.5%** |

**Main point:** COGS plus commission take ~55% of revenue before any fixed cost is paid. Margins depend on buying stock well and negotiating commission.

## Staleness / verification flags
- Nayax AU per-transaction % was **not verified**. Get a quote.
- Machine prices are from supplier marketing. GST inclusion is often unclear.
- The 91 c/km 2026–27 rate was verified only through third parties.
