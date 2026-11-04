# Tax and Finance for a Small Victorian Vending Business

**Owner:** 07 Financial Modeller · **Research date:** 4 Nov 2026
**Not tax advice.** This is a modelling summary for planning. The founder should confirm structure, GST and depreciation choices with a registered tax agent. Items marked **[BK]** come from the modeller's background knowledge and **could not be re-verified in this session** because the web-search budget ran out. Verify them on ato.gov.au. Hand-off: 08 Legal & Compliance owns entity setup and registrations.

## Jargon
- **ABN:** Australian Business Number. Free, and needed to trade.
- **GST:** Goods and Services Tax, 10%.
- **BAS:** Business Activity Statement, the form used to report GST to the ATO.
- **IAWO:** Instant asset write-off. Deduct the full cost of an asset in the year it is first used.
- **Small business entity (SBE):** a business with aggregated turnover under $10M. Unlocks the concessions below.
- **Chattel mortgage:** a loan where you own the equipment from day one and the lender holds security over it.

---

## 1. GST

| Rule | Detail | Source |
|---|---|---|
| Registration threshold | **$75,000** GST turnover (ex-GST). Register within 21 days of reaching it or expecting to reach it in the next 12 months | https://atotaxrates.info/businesses/tax-invoices-and-gst/gst-thresholds/ ; https://thriday.com.au/blog-posts/should-you-register-your-small-business-for-gst |
| Voluntary registration | Allowed below $75k. If you register you generally must stay registered for 12 months (verified 4 Nov 2026: https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/registering-for-gst) | same |
| BAS frequency | Quarterly, due 28 days after quarter end. Voluntary registrants under $75k can usually report annually | https://accounts-os.com/blog/quarterly-bas-gst-pty-ltd-guide.md ; https://www.hrblock.com.au/tax-academy/beginners-guide-to-gst |
| Cash vs accrual GST | SBEs can account for GST on a cash basis [BK] | — |
| GST-free lines | Plain water and some basic foods are GST-free. Soft drinks, confectionery and chips are taxable [BK]. Hand-off to 04 and 08 | — |

### When each fleet crosses the threshold (Base $175/wk)
| Fleet | Ex-GST turnover | Must register? |
|---|---|---|
| 1 | $8,273 | No |
| 5 | $41,364 | No (5 High-band machines at ~$70.9k sit close to the line) |
| 9 | ~$74,500 | At the line |
| 20 | $165,455 | **Yes** |

### Should a small start-up register voluntarily? Worked example (ESTIMATE)
Shelf prices stay the same either way, because customers will not pay $5.50 instead of $5.00.
- **Registered:** you remit 1/11 of sales and claim back GST on taxable inputs (stock, machines, fuel, commission invoices from registered hosts).
- **Not registered:** you keep 100% of the till but cannot claim any GST on inputs.
- Annual difference ≈ 10% × (ex-GST revenue − taxable costs) ≈ **10% of your margin**. Registering costs you roughly that amount each year.
- One-off: registering recovers **10% of capex**.

| 5-machine Base fleet | New machines | Used machines |
|---|---|---|
| GST claimable on capex if registered | ≈ $4,650 | ≈ $2,500 |
| Extra annual GST cost of being registered (10% × ~$7.6k margin) | ≈ $760/yr | ≈ $760/yr |
| Years until registering stops being worth it | ~6 yrs | ~3.3 yrs |

**Conclusion (ESTIMATE):** for a founder buying machines now and planning to grow past $75k, **registering from day one is usually worth it**. It also suits corporate hosts that want tax invoices. A founder staying at 1–3 machines with used gear may do slightly better unregistered. Confirm with a tax agent.

## 2. Income tax structures

| Structure | Tax rate | Pros | Cons |
|---|---|---|---|
| Sole trader | Personal marginal rates. Tax-free threshold $18,200. Bracket $18,201–45,000 at 15% from 1 Jul 2026, plus 2% Medicare levy (verified via secondary source 4 Nov 2026: https://www.wagecalculator.com.au/tax-rates/2026-27; 30% to $135k, 37% to $190k, 45% above) | Cheap and simple. Losses can offset salary **if** non-commercial loss (NCL) rules are met | Unlimited personal liability |
| Pty Ltd company | **25%** base-rate-entity rate (passive income ≤80%, turnover under $50M; verified 4 Nov 2026: https://www.ato.gov.au/tax-rates-and-codes/company-tax-rate-changes) | Limited liability. Losses carried forward. Hosts may prefer dealing with a company | ~$600 setup plus ASIC annual fee. Accountant cost of $1.5–3k/yr more (ESTIMATE) |
| Trust | Distributed | Flexibility | Overkill at this scale |

### Non-commercial loss (NCL) rules — relevant in year 1 (verified 4 Nov 2026: https://www.ato.gov.au/businesses-and-organisations/income-deductions-and-concessions/losses/non-commercial-losses/offset-or-defer-the-loss-individuals-or-sole-traders ; ATO lists NCL claims as a Feb 2026 focus area)
A sole trader can offset a business loss against wage income only if adjusted taxable income is **under $250k** and the business passes **one** of these tests:
1. Assessable business income ≥ $20,000.
2. Profit in 3 of the last 5 years.
3. Real property used in the business ≥ $500k.
4. **Other assets used in the business ≥ $100,000.** A 20-machine fleet bought new can pass this test.

Otherwise the loss is deferred until the business makes a profit. This matters because the IAWO (below) typically **creates** a year-1 loss.

## 3. Depreciation and the instant asset write-off

| Rule | Detail | Source |
|---|---|---|
| IAWO threshold | **$20,000 per asset, made permanent from 1 Jul 2026** (2026–27 Budget, 12 May 2026). Reported as passed by Parliament in Aug 2026. **Royal Assent not independently confirmed.** Check the ATO page | https://www.ato.gov.au/businesses-and-organisations/small-business-newsroom/20000-instant-asset-writeoff-iawo-here-to-stay ; https://dynamicbusiness.com/news/the-ato-just-locked-in-the-20-000-write-off-for-good ; https://www.boxas.com.au/news/instant-asset-write-off-2026/ |
| Eligibility | Aggregated turnover under $10M. Applies per asset, so many machines each under $20k can all be written off. Business-use portion only. Asset must be first used or installed ready for use in the year | same, plus https://aspireapp.com/en-au/blog/instant-asset-write-off-rules |
| Assets ≥ $20k | Go into the **small business pool**: 15% in year 1, 30% a year after that (verified 4 Nov 2026: https://www.ato.gov.au/business/depreciation-and-capital-expenses-and-allowances/simpler-depreciation-for-small-business/). Note: a $40.5k franchise fridge package falls here, not in the IAWO. Example: a franchise machine package over $20k, or a micro-market fit-out if it is one asset | — |
| Effective life (non-SBE, or accounting) | **Not verified.** TR 2022/1 was withdrawn 31 Oct 2025 and replaced by the Effective Life Determination 2025. The vending-machine figure was not found. The model uses **8 years** for accounting (ESTIMATE) | https://www.legislation.gov.au/F2025N00859/asmade/2025-10-30/text/original/pdf |

**Every vending option under ~$20k per unit (new combo $9.3k, used $5k, smart fridge $6–15k) is immediately deductible.** The IAWO is a **timing** benefit: it brings deductions forward. It does not make an unprofitable machine profitable.

### Worked example — 20 used machines bought in FY2026–27 by a sole trader (ESTIMATE)
| Item | $ |
|---|---|
| Operating profit before labour (Base, full year) | 41,097 |
| IAWO deduction (20 × $5,000) | −100,000 |
| **Tax result for the year** | **−58,903 (loss)** |
| NCL "other assets ≥ $100k" test | Borderline (exactly $100k). Get advice |
| If the loss can be offset at a 32% marginal rate (30% + 2% Medicare) | ~$18,850 tax saved this year |
| If the loss is deferred | Carried forward against future vending profit |

A company would instead carry the $58.9k loss forward and use it against future profits at 25%.

## 4. Vehicle expenses
- **Cents per km:** **91 c/km for 2026–27** (88 c for 2025–26), capped at **5,000 business km per car**. https://www.driversnote.com.au/blog/ato-cents-per-km-rate-2026-2027 . The ATO page itself confirmed 88 c to 2025–26.
- A 20-machine route at 8 km × 52 visits per machine ≈ **8,300 km/yr**. That exceeds the cap, so use the **logbook method** (12-week logbook) [BK].
- Restock trips to Costco/wholesalers count as business travel. Home to first site may count if the business is run from home [BK]. Confirm with a tax agent.

## 5. Finance options

| Option | Indicative cost | Fit | Source |
|---|---|---|---|
| Owner cash / savings | Opportunity cost | Best for stages A–B (≤ $30k) | — |
| Chattel mortgage / equipment loan | Advertised from **7.49–7.95% p.a.** for prime, **up to 10.95%+**. New ABNs usually pay more | Stage C–D, proven sites only | https://www.money.com.au/equipment-finance-interest-rates ; https://www.savvy.com.au/finance/equipment-finance ; https://integratedfinancegroup.com.au/blog/equipment-finance-melbourne-sme-2026/ |
| Supplier/vendor finance or rent-to-own | Often higher effective rate. **Get the APR in writing** | Convenience only | ESTIMATE |
| Unsecured business loan | 14.99%–44.5% | **Avoid** | https://www.money.com.au/equipment-finance-interest-rates |
| Equipment lease | Rental is deductible and no IAWO applies. GST is on each payment | Rarely better than a chattel mortgage at this scale | [BK] |

- RBA cash rate reported at **4.35%** after the 11 Aug 2026 meeting (third-party source, not confirmed from the RBA). https://integratedfinancegroup.com.au/blog/equipment-finance-melbourne-sme-2026/
- **Loan maths:** $9,300 at 9.5% over 5 years = $195/month. That roughly equals a Base-site machine's entire contribution (see unit-economics-model.md §4).
- Many lenders want 2+ years of ABN history or a deposit for "start-up" equipment loans (ESTIMATE [BK]). A new founder may only get personal-loan rates.

## 6. Other obligations to budget for [BK — hand-off to 08]
- **Employees:** Super Guarantee is 12% of ordinary earnings (from 1 Jul 2025). Payday super timing changes are proposed or legislated from 1 Jul 2026, so verify. You also need WorkCover (WorkSafe Victoria) once you employ anyone.
- **PAYG instalments:** the ATO may enter you into quarterly instalments once you have business income.
- **Victorian payroll tax:** not relevant at this scale (threshold ~$1M of wages).
- **Records:** keep them for 5 years. Telemetry sales exports double as GST records.

## 7. Key financial-planning takeaways
1. Register for GST from day one if you are buying machines and plan to grow. It recovers 10% of capex.
2. The IAWO makes every standard machine deductible immediately, but plan for the year-1 loss and the NCL rules (or use a company).
3. Do not borrow for unproven sites. Finance repayments roughly equal a Base machine's contribution.
4. Use a logbook for the vehicle once the route passes ~5,000 km/yr.
5. Pick the structure early. A company makes sense from about 10+ machines or when hosts ask for one (ESTIMATE).
