# Phase 2 analysis — product, price and margin lens on the 7 archetypes

Owner: Agent 04 (Product & Pricing) · Written 4 Nov 2026 · AUD, vend prices GST-inclusive, costs and margins ex-GST.
Inputs: `agents/00-lead-strategist/knowledge/business-model-archetypes.md` plus my knowledge base (`knowledge/*.md`). Eight web searches were used on my open questions (results in §7). Unless cited, numbers are **ESTIMATE** and the reasoning is given.

**Lens:** this scores only *what can be sold, at what price, at what gross margin, and how much control the operator has over the range*. Capital, time and risk are scored by other agents. Score key: 5 = excellent product/margin opportunity, 1 = poor or no product control.

Method for the weighted margins below: a planogram mix (unit share × GST-inclusive price × ex-GST cost) built from `knowledge/margins-by-category.md` §2 mid-range costs, with plain water treated as GST-free. The calculation ran in a scratch script and its outputs are quoted. These are **ESTIMATES**: the costs assume good buying (promo, Costco or cash-and-carry).

---

## 1. Scores at a glance

| # | Archetype | Score (1–5) | Gross margin before commission (ESTIMATE) | Avg vend / basket incl GST (ESTIMATE) | One-line reason |
|---|---|---|---|---|---|
| A | Classic DIY route | **3** | 50% year 1 → 55–57% with mature buying | $3.85–4.20 | Proven sellers, but the range is a commodity and prices are capped by the nearest convenience store |
| B | Smart fridge / micro-market | **4** (B-lite fridge 4; full micro-market 3) | 40–50% after 5–15% fresh waste; 55%+ on ambient lines | $8–12 | Biggest basket and real pricing tools (bundles, expiry discounts), but waste and theft eat the gain |
| C | Niche / specialty | **3** overall (Asian/noodles **4–5**; protein 3; PPE 3; chargers 2; hot food 2) | Asian mix ≈ 59% (calc.) | $4.00–4.50 | Novelty supports price; the risk is demand, not margin |
| D | Buy existing route | **4** | Inherited; seller claims 65–69% are likely overstated | Inherited | Comes with real SKU sales data, which is the largest gap in my knowledge base |
| E | Franchise / licence | **3** | Unknown: depends on mandated supply terms | As A or B | Possible buying power, but the range and suppliers may be locked in |
| F | Placement package | **2** | As A, often lower in practice | $3.50–4.00 | Sites you didn't choose: often low-traffic or health-restricted, with low price tolerance |
| G | Placement-only / asset-light | **1** | n/a: income is a 5–15% commission | n/a | No control over product or price |

Hybrids: **A + C 5** (best on my lens) · **A → D 4** · **B-lite 4** · **E as bootcamp 3**.

---

## 2. Archetype by archetype

### A. Classic snack/drink route (DIY) — score 3
- **Rationale.** Best sellers are known: cola, water, energy drinks, chips and chocolate (`knowledge/bestsellers-australia.md` §2). But the operator can't charge much above retail. A 600 ml Coke is $4.40–4.50 retail (BWS, TerryWhite Chemmart) and $3.50–4.50 in vending (OzBargain node/771242, undated). A Nov 2026 search found no evidence of a higher vending norm (see §7). Margin comes from **buying**, not from pricing. A 600 ml Coke from Kelly's costs $2.66 ex-GST (Agent 07's reading of https://kellysdistributors.com.au/product-category/carbonated-drinks/coca-cola-products/600ml-coca-cola), which is a 35% gross margin at $4.50. Cans and house-brand water carry the margin.
- **Weighted mix calculation:** average vend $3.86, net $3.54, **gross margin 56.5%** at good buying (ESTIMATE).
- **Year-1 reality:** about **50%**. A new operator buys at supermarket specials and Costco, not direct from bottlers, and slow sellers expire.
- **Starter mix (combo machine, ~40 selections):** 55% drinks / 45% snacks. Duplicate the top 3 SKUs. Use a refrigerated combo machine so chocolate survives Melbourne summers.

| SKU | Share of units | Budget site | Standard | Premium/captive |
|---|---|---|---|---|
| Water 600 ml (Costco house brand) | 10% | $2.50 | $3.00 | $3.50 |
| 375 ml can (Coke, Pepsi Max) | 10% | $2.50 | $3.00 | $3.50 |
| 600 ml cola / no-sugar | 14% | $4.00 | $4.50 | $5.00 |
| Red Bull 250 ml / Monster 500 ml | 13% | $4.00 / $4.50 | $4.50 / $5.00 | $5.00 / $5.50 |
| Powerade 600 ml | 5% | $4.00 | $4.50 | $5.00 |
| Iced coffee 500 ml (Farmers Union, Ice Break) | 6% | $4.50 | $5.00 | $5.50 |
| Chips 45 g | 14% | $2.50 | $3.00 | $3.50 |
| Chocolate 50 g | 12% | $3.00 | $3.50 | $4.00 |
| Lolly bag | 5% | $4.00 | $4.50 | $5.00 |
| Muesli bar / nuts | 7% | $2.50 | $3.00 | $3.50 |
| Protein bar | 4% | $4.50 | $5.50 | $6.00 |

### B. Smart fridge / micro-market — score 4 (B-lite fridge) / 3 (full micro-market)
- **Rationale.** This is the only format where the basket rises to **$8–12** (ESTIMATE, Agent 01 `consumer-trends.md` §2; no Australian figure was found, see §7). Meals at $9.50–14 and bundles ("drink + snack $7") lift spend. Smart-fridge software can discount stock near its use-by date. Margin on fresh food is 35–55% *before* waste of 5–15% of COGS (`margins-by-category.md` §2; Agent 06 `inventory-management.md` §6). After waste that is about 40–50%. A full micro-market adds open-shelf theft of 2–5%+, so it scores 3.
- **Healthy-site advantage.** Workplaces and hospitals want GREEN/AMBER ranges (`healthy-choices-guidelines.md`). My healthy drinks-and-snacks mix calculated at **62.5% gross margin**, because water is high-margin and GST-free (if confirmed). Healthy ranges don't have to mean lower margin. The risk is lower *volume*.
- **Starter mix (fridge, warehouse or office with 100–300 staff):** 40% long-life chilled items (Up&Go, yoghurt pouches, cheese and crackers, flavoured milk) · 30% drinks · 20% fresh with a 5–7-day life (MAP-packed sandwiches and wraps; MAP = modified-atmosphere packaging, which extends shelf life) · 10% ready meals. **Start with no short-life fresh food until you have 4 weeks of sales data.**

| SKU | Price |
|---|---|
| Sandwich / wrap | $9.50 (warehouse) – $11.00 (CBD office) |
| Salad / sushi | $11.00–12.50 |
| Microwave ready meal | $12.50–14.00 |
| Chobani 15 g protein pouch 150 g (retail $2.40–2.96, Grocerize, see §7) | $4.50 |
| Up&Go Protein 500 ml (retail $3.60) | $5.50 |
| Iced coffee 500 ml | $5.00–5.50 |
| Water / Coke No Sugar 600 ml | $3.00 / $4.50 |
| Meal deal: wrap + drink | $13.00 (about 10% off the separate prices) |

### C. Niche / specialty — score 3 overall (spread 2–5)
| Niche | Score | Margin and price (ESTIMATE unless cited) | Verdict |
|---|---|---|---|
| Asian snacks & drinks + cup noodles | **4–5** | Mix calc. **59% gross margin**, avg vend $4.04. Shin Cup retail ≈ $1.70–1.75 per cup in 6-packs ($10.19–10.49, Umall, see §7), so trade cost is about $1.20–1.50 (ESTIMATE) → $4.00 vend ≈ 63–70% GM | Best niche on my lens: campuses, student housing, Box Hill, Glen Waverley, Springvale, CBD |
| Protein / gym | 3 | RTD shakes have the lowest GM % (32–59%) but a high $ per unit | Good inside a gym machine; not a stand-alone business |
| PPE / site essentials | 3 | No public AU prices found. RSEA and Winc (Tambour TX750) already sell RFID-access PPE vending (see §7) | B2B controlled-issue: the employer pays. Competes with incumbents |
| Chargers / power banks | 2 | 50–70% GM, very low velocity. Rental networks (ChargeUP, Brick) place stations **free for the venue, with a revenue share** (see §7) | Use 2–4 slots only. Operators compete with free rental stations |
| Hot food / pizza | 2 | Always GST-taxable; high capex; novelty history (Pizza Gio closed) | Not a first venture |
| Gacha / capsule | 2 | Amusement margin, but regulatory and reputational concern (Vending Times, 16 Jun 2026, via 00) | Different business |

**Asian machine starter list:** Pocky $4.00 · Calbee chips $3.50 · Hello Panda $3.50 · Japanese KitKat $5.00 · Shin Cup $4.00 · Indomie cup $3.50 · Ramune $5.00 · Calpis / Pocari Sweat $4.50 · Korean banana milk $4.00 (needs refrigeration) · Lotte Milkis can $3.50 · water $3.00 · Red Bull $4.50. **Buy only from Australian importers that are CDS-registered and carry English labels.** Importing drinks yourself, or private-labelling water, makes you a CDS "first supplier" (Agent 08 `consumer-law-and-safety.md`).

### D. Buy an existing route — score 4
- **Rationale.** You inherit 1–3 years of telemetry: real velocity (units per slot per week), real prices and real supplier costs. That closes my biggest data gap (open question B8). You also get a working buying channel, sometimes direct bottler terms.
- **Watch-outs.** Seller claims of a "65–69% gross margin" (62-machine route, via 00) probably exclude commission, or are calculated on GST-inclusive takings. Rebuild GM from invoices: GM = (takings ÷ 1.1 − stock purchases) ÷ (takings ÷ 1.1). If it comes out above 60% on a classic combo route, ask why. Possible reasons: a lot of water, cans or coffee, or under-recorded purchases.
- **Product upside after purchase (ESTIMATE):** a planogram clean-up (cut the bottom 10% of SKUs, duplicate the winners), a +$0.20–0.50 price review on stale price cards, and switching to cashless pricing. Each typically adds 3–8% gross profit with no new sites.
- **Starter mix / price list:** keep the inherited mix for 8 weeks, then apply the A price card for that site's tier.

### E. Franchise / licence — score 3
- **Rationale.** A franchisor (e.g. Provender, Ausbox) may provide group buying and a ready planogram. That could lower COGS 2–5 points (ESTIMATE). It may also **mandate suppliers, set price cards and take a supply margin**. I found no public disclosure of Provender or Ausbox supply terms. Ask for the Franchise Disclosure Document (Agent 08): who sets prices? Is there a mandated supplier list? Is there any rebate to the franchisor?
- **Starter mix:** the franchisor's mix. Benchmark it against the A price card. If the franchise card is more than 10% under market, margin is being given away.

### F. Placement package — score 2
- **Rationale.** The product lens is neutral, but the *sites* decide prices. Package sites in listings (childcare, aged care, a school; Agent 03 `host-commission-norms.md`) mean lower traffic, healthy-food restrictions (schools and the RED-item rules) and price-sensitive users. The vendor's "standard" planogram is usually generic.
- **Rule:** before buying, ask for each site's headcount and a 2-week trial. Use the A budget price card and model gross margin at 45–50%.

### G. Placement-only / asset-light — score 1
- No range or price control. Income = host or locator commission on someone else's sales: 5–15% of net sales (Agent 03). At $700/month gross that is about $32–95 per machine per month (ESTIMATE). Useful only as a side income.

---

## 3. The three most important findings
1. **Buying beats pricing, and the year-1 margin is lower than the team's base case.** Prices are capped near retail ($4.50 for a 600 ml Coke). A first-year operator buying through Costco, supermarket specials and cash-and-carry should model **50% COGS in year 1 and 45% only once buying matures**. The 600 ml Coke from Kelly's alone carries 58% COGS (Agent 07 `cost-structure.md`). Planogram weighting toward cans, water and noodles is the main margin lever.
2. **The best product-margin play is A + C:** a classic combo route plus an Asian-snack/noodle machine at Melbourne campuses and Asian-heavy suburbs. The calculated mix gives about 59% GM at a $4.00+ average vend, and it is the most visibly differentiated range. Healthy-compliant ranges (62% GM calc.) are the second differentiator. They don't lower margin, but they may lower volume.
3. **Basket size is driven by format, not price.** Classic machines sell at about $3.85–4.20 per vend. Only smart fridges or micro-markets reach $8–12, and only once waste is controlled (it can wipe out a third of gross profit). Start a fridge with long-life chilled lines first, then add fresh food.

## 4. Assumptions other agents should use
| Item | Value | Status |
|---|---|---|
| Gross margin, classic combo (ex-GST, before commission) | **50% year 1** (low 45 / high 57) → 55% from year 2 | ESTIMATE (calc. 56.5% at good buying) |
| Gross margin, Asian/noodle machine | 55–59% | ESTIMATE |
| Gross margin, healthy drinks/snacks machine | 55–62% (lower volume: −10 to −25% units vs a mainstream machine) | ESTIMATE |
| Gross margin, smart fridge mixed range, after waste | 40–48% (07 uses COGS 50% + shrink 6% → consistent) | ESTIMATE |
| Gross margin, bean-to-cup coffee | 62–83% | ESTIMATE (`margins-by-category.md`) |
| Average transaction, classic machine | **$4.00 incl GST ($3.64 ex)**, range $3.85–4.20 | ESTIMATE (calc.) |
| Average transaction, smart fridge | **$9.00 incl GST**, range $8–12 | ESTIMATE (Agent 01) |
| Average transaction, Asian machine | $4.00–4.50 | ESTIMATE |
| Card + telemetry cost | Use **Agent 05's 4% of cashless sales** (supersedes my earlier 1.5–2% + 5–10c) | 05 ESTIMATE |
| Card surcharge | **Not allowed from 1 Oct 2026** (Agent 05 `payments-and-telemetry.md` §3). Build the cost into the price | Per 05 |
| Price inflation | +3–6% a year; review every 3–6 months in $0.20–0.50 steps | ESTIMATE |
| Plain still water | Model as GST-free but flag it (see §7) | Partly verified |

## 5. Conflicts with other agents' knowledge bases
1. **Kelly's carton GST status.** My KB said "GST status not stated". Agent 07 reads $70.24 as GST-inclusive ($2.66 ex). I adopt 07's more conservative reading (fixed in `margins-by-category.md`).
2. **COGS base.** 07 uses 45% COGS as the base case. I recommend a **50% year-1** base, with 45% as the year-2+ case. The 55% sensitivity case stays.
3. **Card fees.** My KB had 1.5–2% + 5–10c (about 3.5–4.5% on a $4 sale, so close in effect). Agent 05's 4% is adopted. My "+20c card surcharge" advice is now obsolete because of the 1 Oct 2026 ban.
4. **Gross margin claims.** Agents 00 and 02 cite the seller's 65–69% GM. On my lens this is not credible for a snack/drink combo route on an ex-GST, after-commission basis. 02's 60% assumption is the upper bound.
5. **Healthy-site food rule.** 00 writes "combo machines may carry no RED drinks" for hospitals. That is correct only for **public** health services (mandatory directive). Private hospitals and workplaces follow voluntary guidelines.

## 6. What I verified or changed (8 searches, 4 Nov 2026)
- **CDS Vic:** VicReturn held container prices steady at the review effective **1 Aug 2026**; the next review is Oct 2026 (outcome not found). https://www.alcircle.com/news/vicreturn-holds-pricing-steady-following-six-monthly-review-117885 → updated `pricing-strategy.md`.
- **Vending water GST:** the GST Regulations contain **reg 38-3.01 "GST-free beverages supplied from vending machines"** (https://www.legislation.gov.au/F2019L00417/2025-11-01/2025-11-01/text/original/pdf). The operative text was not read, but this supports treating plain water from a vending machine as GST-free. Agent 08 should confirm. → `margins-by-category.md`.
- **Vending price 2026:** no newer data. The $3.50–4.50 range for a 600 ml Coke stands; the CCEP VendSwift app offers app discounts (20% → $3.36). https://www.ozbargain.com.au/node/771242
- **Cup noodles:** Shin Cup 68 g × 6 at $10.19–10.49 retail (Umall; sold out, may be stale). https://www.umall.com.au/collections/lunar-new-year-2026/instant-noodles → `niche-products.md`.
- **Chilled protein:** Chobani 15 g protein pouch 150 g at $2.40 (90-day average $2.96); 190 g at $4.00. https://www.grocerize.com.au/product/7958355935315/chobani-15g-high-protein-greek-yogurt-vanilla-pouch-150g
- **PPE vending:** incumbents RSEA (RFID card access, low-stock alerts) and Winc Tambour TX750; no prices published. https://www.rsea.com.au/Documents/Pages/Catalogues/Full24_25/inc/html/341.html ; https://www.safetysolutions.net.au/content/personal-protection-equipment/product/staples-vending-solutions-tambour-tx75-vending-maching-for-ppe-361420968
- **Power-bank rental:** ChargeUP and Brick install stations at no cost to the venue, with a revenue share. https://chargeup-frontend.pages.dev/venues ; https://www.brick.tech/en-ae/venue/b2b
- **Smart-fridge basket:** no Australian figure found. The ESTIMATE stays.
- **Still open:** a real trade price sheet (Agent 06), the Oct 2026 CDS price, the operative text of reg 38-3.01, and velocity data.
