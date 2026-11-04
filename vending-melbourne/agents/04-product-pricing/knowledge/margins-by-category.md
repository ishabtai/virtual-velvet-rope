# Wholesale cost vs vend price — gross margin by category

Research date: 4 Nov 2026. All prices AUD.

> **Data quality warning.** No Australian wholesaler price list was publicly accessible (several wholesaler sites were blocked from this research session, and most trade prices are behind account log-ins). Unit costs below combine a few real Australian price points (cited) with ESTIMATES. Agent 06 (Supply Chain) must replace these with real quotes from Campus/Metcash, Costco Business, Coca-Cola Europacific Partners (CCEP), Asahi/Schweppes, PFD, and Asian wholesalers before Agent 07 finalises the model.

## 0. Definitions (read once)
- **Cost of goods (COGS)** = what you pay per unit, landed at your storage, **ex-GST**.
- **Vend price** = the price on the machine, **GST-inclusive** (Australian consumer prices must show GST-inclusive).
- **Net revenue per unit** = vend price ÷ 1.1 for taxable items (if you are GST-registered — mandatory once turnover ≥ $75k/yr; see Agent 08). For GST-free items (e.g. plain still water — see §4) net revenue = vend price.
- **Gross margin %** = (net revenue − COGS) ÷ net revenue.
- **Markup** = vend price ÷ cost. "2x markup" ≈ 50% gross margin. Don't confuse the two.
- **Contribution margin** = gross margin minus per-sale variable costs: site commission, card/payment fees, telemetry per-transaction fee, spoilage. This is what really pays for the van, fuel and your time.

---

## 1. Real Australian price points found

| Item | Price | Channel | Source (accessed 4 Nov 2026) |
|---|---|---|---|
| Coca-Cola Classic 600 ml ×24 | $70.24 / carton (≈ $2.93/unit; read as GST-incl → **$2.66 ex-GST**, per Agent 07 — adopted 4 Nov 2026 as the conservative reading) | Trade distributor (Kelly's Distributors) | https://kellysdistributors.com.au/product-category/carbonated-drinks/coca-cola-products/600ml-coca-cola (search snippet) |
| Coca-Cola Classic 600 ml single | $4.50 | BWS retail | https://bws.com.au/product/93167/coca-cola-bottle-600ml |
| Coca-Cola 600 ml single | $4.40 | TerryWhite Chemmart retail | https://terrywhitechemmart.com.au/shop/product/coca-cola-coke-bottle-600ml |
| Mount Franklin still water 600 ml | $2.45 (Coles & Woolworths) | Supermarket | https://www.grocerize.com.au/product/7942941376595/mount-franklin-spring-water-bottle-600ml |
| Kirkland spring water 30 × 600 ml | $8.99 (≈ $0.30/unit) — date unclear | Costco in-store | https://www.ozbargain.com.au/tag/water |
| Red Bull 250 ml ×4 | $6.50 (≈ $1.63/can), 13 May 2026 | Coles | https://buywisely.com.au/product/red-bull-energy-drink-4-pack-250ml |
| Red Bull Sugar Free Berry 250 ml | 2 for $5.70 promo; 90-day avg $3.20 single | Woolworths | https://www.grocerize.com.au/product/7925659140179/red-bull-berry-edition-sugar-free-250ml |
| Up&Go Protein Energize 12 × 250 ml | $19.50 (≈ $1.63/unit) | Coles/Woolworths | https://www.grocerize.com.au/product/7799863410771/up-go-protein-energize-strawberry-fridgepack-12x250ml-3l |
| Up&Go Protein Energize 500 ml | $3.60 (range to $4.50) | Retail comparison | https://buywisely.com.au/product/up-go-protein-energize-vanilla-500ml |
| Pepsi Max/Solo 24 × 375 ml cans | $22.50 on 40%-off promo (≈ $0.94/can) — expired deal | Supermarket | https://www.ozbargain.com.au/product/pepsi?page=8 |
| Mars bar 50 × 47 g | AU$129.99 (≈ $2.60/bar) | eBay consumer listing (not trade) | https://www.ebay.com/itm/255745496670 |
| Snickers Funsize 300 g | $10.70 | Officeworks retail | https://officeworks.com.au/shop/officeworks/p/snickers-funsize-bag-300g-td55180 |
| Vending 600 ml Coke observed | $3.50 (workplace), ~$4.20 (CCEP machine list), $4.50 (+20c card) | OzBargain user reports, undated | https://www.ozbargain.com.au/node/771242 |
| Vending Coke at train platform | $4.50 | Forum anecdote, undated | https://lemmy.dbzer0.com/post/10625225/6048871 |

**Reading this table:** buying at supermarket single price kills margin (a $4.40 retail Coke has zero room). Operators must buy cartons/multipacks on promotion, via Costco, or through a direct bottler account. Grocery promotions (half-price weeks on Coke/Pepsi cans, Red Bull) are a real procurement strategy for small operators — ESTIMATE, common practice.

---

## 2. Unit economics by category (ESTIMATE)

Assumptions: GST-registered operator; costs are ex-GST landed; vend prices typical Melbourne 2026 (see pricing-strategy.md). "Low/High" = range of plausible cost depending on buying channel.

| Category / example SKU | Unit cost ex-GST (low–high) | Typical vend price incl. GST | Net rev ex-GST | Gross margin % (range) |
|---|---|---|---|---|
| Still water 600 ml (house/Costco brand) | $0.30–0.80 | $3.00 | $3.00 (GST-free if plain still water — verify) | **73–90%** |
| Still water 600 ml (Mount Franklin) | $0.90–1.40 | $3.50 | $3.50 (GST-free, verify) | 60–74% |
| Soft drink 375 ml can (Coke/Pepsi) | $0.85–1.30 | $3.00 | $2.73 | 52–69% |
| Soft drink 600 ml PET (Coke/Pepsi) | $1.70–2.70 | $4.50 | $4.09 | 34–58% |
| Energy drink 250 ml (Red Bull) | $1.50–2.20 | $4.50 | $4.09 | 46–63% |
| Energy drink 500 ml (Monster/V) | $1.90–2.80 | $5.00 | $4.55 | 38–58% |
| Sports drink 600 ml (Powerade) | $1.40–2.20 | $4.50 | $4.09 | 46–66% |
| Iced coffee / flavoured milk 500 ml (chilled) | $2.00–2.80 | $5.00–5.50 | $4.55–5.00 | 38–60% |
| Chips 45 g single (Smith's) | $0.90–1.40 | $3.00 | $2.73 | 49–67% |
| Chocolate bar 50 g (Mars/Cadbury) | $1.10–1.80 | $3.50 | $3.18 | 43–65% |
| Lolly bag 150–200 g | $1.50–2.50 | $4.50 | $4.09 | 39–63% |
| Muesli/health bar | $0.80–1.50 | $3.00 | $2.73 (some GST-free — check) | 45–71% |
| Protein bar 45–60 g | $2.00–3.20 | $5.50–6.00 | $5.00–5.45 | 36–63% |
| RTD protein shake 350–500 ml | $2.80–4.00 | $6.50–7.50 | $5.91–6.82 | 32–59% |
| Cup noodle (Nissin/Indomie/Shin cup; Shin Cup retail ≈ $1.70–1.75/cup in 6-packs, Umall https://www.umall.com.au/collections/lunar-new-year-2026/instant-noodles, 4 Nov 2026) | $0.90–1.80 | $3.50–4.00 | $3.18–3.64 | 43–75% |
| Sandwich / wrap (fresh, bought-in) | $4.00–6.50 | $9.00–11.00 | $8.18–10.00 (GST status varies — see §4) | 35–55% **before** waste |
| Ready meal (chilled, microwave) | $6.00–9.00 | $12.00–15.00 | $10.90–13.60 | 34–56% before waste |
| Bean-to-cup coffee (beans + milk + cup + lid) | $0.70–1.20 | $3.50–4.50 | $3.18–4.09 | **62–83%** |
| Phone charging cable / power bank | $3–15 | $15–45 | — | 50–70% |

**Weighted average gross margin, standard snack/drink combo machine: ESTIMATE 45–58%** (before commissions). Consistent with:
- US supplier guides: snacks ~50–62% gross margin; drinks 64–86%, packaged snacks 45–76% — https://vmfsusa.com/blogs/business/vending-machine-margin-per-item-machine (US, accessed 4 Nov 2026).
- "2x rule" (retail ≈ 2× wholesale → 40–50% GM) — https://lovable.dev/guides/vending-machine-business-plan-that-works (Feb 2026).
- A Melbourne snack/drink route listed for sale advertises **65–69% gross profit margin** — https://bsale.com.au/listing/under-offer-expansive-vic-646352 (seller claim; likely excludes GST and/or commission — treat sceptically).
- A dealer site quotes IBISWorld (2019) average vending **profit** margin in Australia ≈ 20% (likely net) — https://vendingmachinesaustralia.com.au/vending-machine-business-australia (stale).

---

## 3. From gross margin to contribution margin (ESTIMATE)

Example: Coke 600 ml, vend $4.50 incl GST.

| Line | $ per unit |
|---|---|
| Vend price incl GST | 4.50 |
| less GST (1/11) | −0.41 |
| Net revenue | 4.09 |
| COGS (direct bottler / promo buying) | −2.10 |
| **Gross profit** | **1.99 (49%)** |
| Site commission 15% of net sales (ESTIMATE; range 0–25%) | −0.61 |
| Card/payment fee + telemetry (Agent 05 Phase 1: model 4% of cashless sales) | −0.16 |
| Shrink/expiry/damage 2% | −0.08 |
| **Contribution per unit** | **≈ 1.15 (28%)** |

Net margin per machine after van, fuel, labour, machine finance and insurance is typically 15–30% (US benchmark: https://vmfsusa.com/blogs/business/vending-machine-margin-per-item-machine). Agent 07 should model this.

---

## 4. GST — which items are taxable? (summary; Agent 08 to confirm)

From ATO food guidance (accessed 4 Nov 2026):
- **Taxable (10% GST):** confectionery (chocolate, lollies, chewing gum), savoury snacks (chips, crackers, pretzels), soft drinks, flavoured/carbonated water, sports drinks, flavoured milk, ice cream, **hot food** and food sold for consumption on the premises — https://ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/in-detail/your-industry/gst-and-food/taxable-food
- **GST-free:** natural non-carbonated water without additives; juice ≥90% fruit/vegetable; many basic foods (plain yoghurt, fruit, some bars/biscuits differ) — https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/in-detail/your-industry/gst-and-food/gst-free-food
- **Watch-out:** ATO example says bottled water sold at an event for consumption at the event is taxable ("consumed on premises" rule). Whether a vending machine in an office/gym counts as "premises" for a GST-free item is **unverified** — hand-off to Agent 08 / an accountant. The model should conservatively treat everything as taxable except plain still water, flagged.
- **Update 4 Nov 2026 (Phase 2):** the GST Regulations contain reg **38-3.01 "GST-free beverages supplied from vending machines"** — https://www.legislation.gov.au/F2019L00417/2025-11-01/2025-11-01/text/original/pdf (heading seen in search; operative text not read). This supports treating plain water from a vending machine as GST-free; Agent 08 to confirm the wording.
- Use the ATO detailed food list for each SKU.

## 5. CDS Vic effect on drink costs
Victoria's Container Deposit Scheme (from 1 Nov 2023) adds a supplier "container price" to every eligible drink, which is baked into the wholesale price you pay — average 14.7c ex-GST per container from 1 Feb 2025 (up from 11.18c). See pricing-strategy.md §4. **Operators do not collect or pay the 10c refund directly** unless they become a "first supplier" (e.g. importing Asian drinks themselves) — then they must register and pay the container price. Hand-off to Agent 08.

## 6. Key takeaways
1. Drinks: highest volume; cans and water give the best margin %, 600 ml PET Coke the worst — unless bought on promo or direct.
2. Coffee is the highest gross-margin product (60–80%+) but needs expensive equipment, milk handling and cleaning (Agent 05/06).
3. Fresh food margin looks good on paper but waste of 5–15% of COGS can erase a third of gross profit (ESTIMATE).
4. Buying channel matters more than price: the gap between supermarket shelf price and promo/Costco/direct is 30–60% of unit cost.
