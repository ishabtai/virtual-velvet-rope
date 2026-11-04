# INDEX — 07 Financial Modeller Knowledge Base

**Research date:** 4 Nov 2026 · AUD · P&L ex-GST · Estimates are marked `ESTIMATE`. Tax items not re-verified are marked `[BK]`.

## Files
| File | Contents |
|---|---|
| `revenue-benchmarks.md` | AU/Melbourne revenue data points (listings, vendor and forum figures), Low/Base/High bands by format, revenue drivers, cash/card mix (RBA 2025) |
| `cost-structure.md` | Capex per machine type, variable costs (COGS, commission, card, shrink), fixed costs (telemetry, vehicle, insurance, electricity), owner labour, Base cost stack |
| `unit-economics-model.md` | Per-machine P&L (lone vs clustered), breakevens, finance overlay, smart fridge, franchise and route-purchase variants, sensitivity |
| `scenarios-1-5-20.md` | Capital, P&L, payback and owner hourly rate at 1/5/20 machines, year-1 monthly cash flow, staged growth path, option comparison |
| `tax-and-finance.md` | GST threshold and voluntary-registration maths, sole trader vs company, NCL rules, $20k IAWO, vehicle claims, equipment finance rates |
| `../analysis/phase2-analysis.md` | Phase 2b option model (A, A+C, A+B-lite, A→D, D, E, F, G) with reconciled assumptions, sensitivity and scores; data in `../analysis/option-model.csv` |
| `open-questions.md` | Unverified inputs ranked by impact; hand-offs to agents 00–09 |

## Top findings (all ESTIMATE unless sourced)
1. **Revenue benchmark:** a typical established AU machine grosses **~$150–190/week**. A Melbourne 45-machine listing implies ~$184/wk. Operators call <$150/wk "not worth it". The model's Base is **$175/wk ($8.3k ex-GST/yr)**.
2. **Margin structure:** COGS (~45%) + commission (~10%) take **~55% of revenue**. A Base machine on a dense route contributes **~$2,355/yr (28%)**. A lone machine 25 km away contributes only ~$1,550.
3. **Breakeven:** a new machine (~$9.3k ex-GST incl reader) needs **≥$220/wk** to repay in 3 years. A used machine (~$5k) needs **≥$155/wk**. **Used machines + clustered sites** is the strongest DIY path.
4. **Scale:** 1 machine loses money after overheads. 5 machines ≈ **$7.6k/yr** before labour (~$29/h). 20 machines ≈ **$41k/yr** for ~15 h/week, on $114k (used) to $200k (new) capital. Payback 2.8–4.9 yrs.
5. **Sensitivity:** profit swings most with site sales (±30% → ±$19k at 20 machines), COGS, commission, and **who pays electricity** (~$1k/machine/yr). Card fees and telemetry are second-order.
6. **Finance:** equipment loans are advertised from 7.49% up to ~11%+. A 5-year loan on a new machine (~$195/month) **consumes almost all of a Base machine's contribution**. Do not finance unproven sites.
7. **Route purchase:** routes trade at **~2–2.5× SDE** (NSW listing ≈ 2×; US median ~2.2×). A 10-machine Base route earns ~$20k SDE, so it is worth ~$40–50k. Broker asks around $100k for 11 machines need verified telemetry data.
8. **Tax:** the **$20k instant asset write-off (permanent from 1 Jul 2026)** makes every standard machine immediately deductible. Expect a year-1 tax loss and check the non-commercial loss rules. Registering for GST from day one recovers 10% of capex and is usually worth it for a growing fleet.
9. **Cash still matters a little:** ~1 in 4 payments under $10 are cash (RBA 2025 CPS). The model assumes 80% cashless.
10. **Data gap:** there is no audited AU industry benchmark, and smart-fridge, micro-market and franchise revenue figures are unverified marketing claims. See open-questions.md.
