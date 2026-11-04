# Inventory Management — Stock, Expiry, Spoilage, Refunds

*Agent 06 · Researched 4 Nov 2026 · AUD*

> **Jargon:** *SKU* = stock-keeping unit, one distinct product. *Planogram* = map of which SKU sits in which spiral/column. *Par level* = target quantity per column. *FIFO/FEFO* = first-in-first-out / first-expired-first-out. *Shrinkage* = stock lost to theft, damage, expiry or error. *PHF* = potentially hazardous food (needs temperature control).

## 1. Legal frame for date marking (Food Standards Code 1.2.5)

- **Use By:** it is **illegal to sell food past its use-by date**; a breach of the Code is a breach of each state's Food Act (Victoria: Food Act 1984). https://sprintlaw.com.au/articles/use-by-vs-best-before-dates-compliance-for-australian-businesses/ ; https://foodlegal.com.au/inhouse/document/the-date-debate-use-by-vs-best-before/799
- **Best Before:** no blanket ban on selling after the date if the food is still fit for consumption, but legal risk increases. https://foodlegal.com.au/inhouse/document/use-by-and-best-before-dates-on-food-what-do-they-really-mean/389
- Foods with a best-before ≥ 2 years need no date. https://www.legislation.gov.au/F2015L00401/2021-06-03/2021-06-03/text/original/pdf (2021 compilation — check current)
- **Operating policy (recommended):** pull any item within **14 days of best-before** for snacks; within **1 day of use-by** for fresh. Never sell past-dated stock from a machine — customers cannot inspect before paying, so complaints and refund costs outweigh the saving. ESTIMATE/policy judgement.

## 2. Victorian food registration affects what you can stock

- Victoria classes food vending by risk; registration/notification through **FoodTrader** (formerly Streatrader) via the principal council. https://ablis.business.gov.au/service/vic/registration-notification-of-a-food-vending-machine/31598 ; https://streatrader.health.vic.gov.au/public_site/resources/
  - **Class 4** — packaged low-risk (chocolate, lollies, chips, canned/bottled soft drinks): notification only, **no fee, no renewal**, valid statewide.
  - **Class 3** — e.g. pre-packaged sandwiches/pies: registration + Statement of Trade; fees e.g. Glen Eira $194 (2025–26).
  - **Class 2** — unpackaged PHF (e.g. fresh-squeezed juice): Glen Eira $258; Greater Dandenong $862/yr principal registration.
- **Implication:** a beginner can start Class 4 only (ambient packaged snacks/drinks) with almost zero food-regulatory overhead. Fresh food (Class 3) adds cold-chain, records and council fees. Full detail → Agent 08.

## 3. Cold chain (fresh food, smart fridges)

- Standard 3.2.2: PHF must be kept **at or below 5 °C** during transport, storage and display (or a validated alternative), and you must be able to **demonstrate** the cold chain. Ready-to-eat sandwiches are PHF. https://www.foodstandards.gov.au/business/food-safety/transporting-food-safely ; https://public-library.safetyculture.io/products/food-class-3-premises-assessment-city-of-monash-pre-packaged-only
- Practices: probe thermometer; log temperatures at pickup, at machine and on display; refrigerated van or insulated crates with ice bricks for short trips; machines with telemetry temperature alarms and auto-lockout if temp >5 °C for a set period (Agent 05 to confirm which machines support this).

## 4. Setting par levels and planograms

1. **Start:** 20–30 SKUs in a standard snack machine (typical 5–6 trays × 6–10 spirals) — ESTIMATE; Agent 05 to supply exact column counts per machine.
2. **Allocate columns by sales:** top sellers get 2+ columns; drop the bottom 10% of SKUs every 4–6 weeks and trial a replacement.
3. **Par level** = expected units sold between visits × 1.2–1.5 safety buffer, capped at column capacity. ESTIMATE.
4. **Fill to par, rotate FEFO:** new stock goes behind older stock in each spiral.
5. **Telemetry** (Nayax VMS etc.) shows column-level sales; enables pick lists and pre-kitting. https://www.nayax.com/blog/nayaxs-vending-inventory-management-system-allows-gecko-vending-to-more-efficiently-manage-their-business/

## 5. Storage-base stock

- Hold **2–4 weeks** of ambient stock for 1–10 machines (ESTIMATE): enough to buy on specials, not so much that dates run down.
- Use shelving organised by SKU with date labels on the outer carton; monthly stocktake.
- Heat: chocolate is the biggest summer risk; consider swapping chocolate for chips/biscuits in non-air-conditioned sites Dec–Mar. ESTIMATE.
- Pests: sealed tubs, off floor, no open cartons.

## 6. Shrinkage and spoilage — what to expect (ESTIMATE)

No reliable Australian benchmark was found (web search budget exhausted before a dedicated search). Planning assumptions:

| Format | Expected shrinkage (% of sales at cost) | Main causes |
|---|---|---|
| Spiral snack/drink machine (ambient) | 1–3% | Expiry of slow sellers, vend jams, damaged goods |
| Smart fridge (card-unlock, weight/vision AI) | 3–8% | Fresh expiry, mis-detection, swaps |
| Fresh-food machine | 5–15% | Short use-by, over-ordering |
| Open micro-market (honour/kiosk) | 2–5%+ | Theft at checkout, expiry |

Reasoning: ambient packaged goods have months of shelf life; fresh food sells within 2–5 days. Vendors claim AI vision fridges reduce losses but give no numbers. https://www.vendingmachinesaustralia.com.au/how-new-vending-machines-with-ai-vision-improve-product-accuracy-and-reduce-losses — Agent 07 should stress-test with the high end.

## 7. Refunds and customer complaints

- **Australian Consumer Law (ACL)** consumer guarantees apply to machine sales; faulty goods attract refund/repair/replace, scaled to major vs minor failure; change of mind is not covered. https://www.accc.gov.au/about-us/publications/refunds-and-returns ; https://business.vic.gov.au/business-information/marketing-and-sales/refund-and-payment-basics ; https://sprintlaw.com.au/articles/how-to-start-a-vending-machine-business-in-australia-legal-essentials/
- **"Paid but no product"** (vend failure): not directly addressed by sources found; treat as an obligation to refund promptly. Agent 08 to confirm.
- **Operational process (recommended):**
  1. Sticker on every machine: phone/SMS/QR → web form, machine ID.
  2. Cashless payments: refund via the payment provider portal (Nayax etc. can refund card transactions remotely) — fastest, cheapest. Agent 05 to confirm per provider.
  3. Cash: refund by bank transfer (PayID) or leave a voucher; log each.
  4. Target: acknowledge within 24 h, resolve within 48 h. Log refunds by machine — a spike indicates a mechanical fault (e.g. spiral misaligned, drop sensor failed).
  5. Many machines have **guaranteed-vend / drop sensors** that auto-retry or return credit if no product falls — strongly recommended. Agent 05.

## 8. Recordkeeping (minimum)

- Per visit: date, machine, units filled per SKU, items removed (expired/damaged), cash collected, faults, temperature (fresh).
- Per purchase: supplier invoice/receipt (tax invoice for GST credits).
- Monthly: stocktake, gross margin by machine, shrinkage %.
- Tools: telemetry VMS, or a spreadsheet/Google Form for 1–5 cash-only machines.
