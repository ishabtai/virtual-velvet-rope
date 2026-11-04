# Open Questions and Hand-offs — 07 Financial Modeller

**Research date:** 4 Nov 2026

## Research limitations in this session
- The web-search budget ran out after ~20 searches. Some planned checks (2026–27 personal tax rates, smart-fridge AU revenue, spoilage benchmarks) were not done. Items marked **[BK]** in tax-and-finance.md come from background knowledge.
- Direct page fetches were blocked for **bsale.com.au, realcommercial.com.au and nayax.com**. Figures from those sites come from search snippets only. Ask the operator to allow these domains if a follow-up session should verify them.

## A. Unverified numbers that drive the model (highest impact first)

| # | Unknown | Model value | Why it matters | How to resolve |
|---|---|---|---|---|
| 1 | Real gross sales PMPW for Melbourne sites available to a **new** entrant | $100/$175/$300 | Largest driver. ±30% sales = ±$19k/yr on 20 machines | 03 Location Scout: get headcount and hours for target sites. 02: incumbent data. Ask brokers for telemetry exports |
| 2 | Blended COGS achievable (wholesaler vs Costco vs specials) | 45% | ±$16.5k/yr at 20 machines | 06 Supply Chain: build a 30-SKU price sheet from Costco Docklands/Ringwood, Campbells/Metcash, Kelly's, Coca-Cola Europacific direct |
| 3 | Typical site commission in Melbourne, and whether hosts pay electricity | 10%, host pays | Electricity alone is ~$1k/machine/yr | 03 + 08: survey sample host agreements |
| 4 | Nayax / Cantaloupe AU per-transaction % and current device price | 4%, $1,400, $14.70/month | Second-order but certain to apply | 05 Equipment: get written AU quotes (Nayax AU, Vendon, Cantaloupe AU partners) |
| 5 | Prices of new and used machines, incl or ex GST | $7.5k new, $4k used | Payback | 05: three quotes each, stating GST |
| 6 | Smart fridge and micro-market revenue in AU | Estimated only | Option viability | 01/02: interview operators. Ask franchisors (Provender) for disclosure documents |
| 7 | Franchise royalties and real franchisee results (AIPVend, Just Now Vending, Provender, SVA) | No royalty modelled | Franchise option could be far worse | 09 + 08: obtain Franchise Disclosure Documents and call existing franchisees (Franchising Code entitles you to the contacts) |
| 8 | Public/products liability quote for vending specifically, $20M cover | $600–1,000/yr | Minor | 08: broker quote |
| 9 | ATO effective life of vending machines (2025 Determination) | 8 yrs (ESTIMATE) | Accounting only (IAWO covers tax) | 08 or tax agent |
| 10 | IAWO $20k: Royal Assent and the exact start date | Assumed law from 1 Jul 2026 | Year-1 tax timing | Check ato.gov.au before purchase |
| 11 | Seasonality and ramp-up curve for Melbourne sites | Flat; 60/85/100% ramp | Cash-flow timing | 01 Market Analyst; operator interviews |
| 12 | Theft/vandalism frequency and repair costs | $200 maint + $100 ins | Tail risk | 05 + 08 |
| 13 | Equipment finance availability for a brand-new ABN | 9.5% | Funding route | Broker pre-qualification |

## B. Hand-offs to other agents

- **00 Lead Strategist:** the model says the viable paths are (a) build slowly with **used** machines on a **tight geographic cluster**, or (b) buy a route at **≤2–2.5× verified SDE**. New machines on finance at Base sites barely break even on cash. The 1-machine option is a learning exercise only. Use scenarios-1-5-20.md §6 for the option comparison table.
- **01 Market Analyst:** need a Melbourne-specific weekly-sales distribution, even a rough one, and seasonality.
- **02 Competitor Analyst:** what commission do incumbents (e.g. large Melbourne operators) offer? That sets the price you need to beat to win a site.
- **03 Location Scout:** use the **breakeven thresholds**: a new machine needs ≥ **$220/wk** gross to repay in 3 years; a used machine needs ≥ **$155/wk**. A rough screen is ~$1–2.50/week per regular person on site (ESTIMATE). Prioritise sites within ~10 km of each other.
- **04 Product & Pricing:** the model assumes a $4.50–5.00 price for 600 ml drinks. Confirm a price ladder that keeps blended COGS ≤45%, and flag GST-free lines.
- **05 Equipment & Tech:** needs AU quotes for reader and telemetry (upfront plus monthly plus %), refrigerated energy use (kWh/yr), and a used-machine refurbishment checklist.
- **06 Supply & Operations:** restock frequency (model: weekly for combos, twice weekly for fresh), route km, and the point at which a van or storage becomes necessary (~20 machines).
- **08 Legal & Compliance:** GST registration decision, sole trader vs Pty Ltd, NCL rules, council food registration fees by LGA, host agreement terms (commission, electricity, assignability on sale, termination notice), franchise code.
- **09 Devil's Advocate:** stress-test (i) the **Base $175/wk** assumption for a newcomer who has no access to prime sites; (ii) franchisor revenue claims; (iii) the effective hourly rate (5 machines ≈ $29/h before tax at Base, at or below a casual retail wage).

## C. Model improvements for Phase 2
- Build a spreadsheet version that lets agents vary inputs by machine.
- Add a monthly 36-month cash flow for the 20-machine path, including a van purchase and a casual restocker.
- Add CPI/price escalation and a mid-life refurbishment ($800–1,500 per machine at year 4–5, ESTIMATE).
