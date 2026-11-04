# Equipment & Tech Knowledge Base — INDEX

_Agent 05 · Research date: 2026-11-04 · AUD · Greater Melbourne context_

## Files
| File | Contents |
|---|---|
| [machine-types.md](machine-types.md) | Snack, combo, drinks, coffee, food, AI/RFID smart fridges, micro-markets; capacity, price bands, power use, security, maintenance; recommendation by scenario |
| [suppliers-and-prices-au.md](suppliers-and-prices-au.md) | Melbourne & national suppliers, new/used/rental price tables, direct-import caveats, used-machine checklist, landed cost per placed machine |
| [payments-and-telemetry.md](payments-and-telemetry.md) | Nayax, Vendcell, CAS, Cantaloupe, smart-fridge payments, retail terminals; fee benchmarks; RBA surcharge ban; telemetry and the post-3G 4G requirement |
| [software-vms.md](software-vms.md) | Vending management software options, prices, selection criteria, phased path |
| [finance-and-leasing.md](finance-and-leasing.md) | Buy vs rent vs loan vs lease vs franchise; lending conditions; IAWO and GST |
| [../analysis/phase2-analysis.md](../analysis/phase2-analysis.md) | Phase 2: archetype scores, spec and capex per archetype, assumptions table, conflicts |
| [open-questions.md](open-questions.md) | Unverified items, founder actions, hand-offs to every agent |

## Top findings
1. **Capex per placed machine (ESTIMATE, ex GST; Phase 2 correction: bought reader is $1.4–2k, not $600):** used combo ~$6.3k (~$4.9k with rented reader); new combo ~$11.3k; AI smart fridge ~$11.5k (AU range $6k–15k+, VMA); smart fridge package ~$40.5k; franchise turnkey from ~$30k (AIPVend $29,970 + GST). New combos are listed at $5,500–$13,000 and used at $3,000–$5,500.
2. **Rent before you buy:** suppliers advertise rents of $25.87/wk (snack), $31.50 (combo), $59.17 (drinks) and $73.38 (food). Nayax rents its VPOS Media 4 reader for "<$1/day" with nothing upfront (launched Jul 2025). This lets the founder trial unproven sites cheaply.
3. **Cashless is mandatory, and card costs can't be passed on:** the RBA banned surcharges on eftpos, Visa and Mastercard from 1 Oct 2026 and cut interchange at the same time. Model processing at ~4% of sales on small vends (ESTIMATE) and build it into prices.
4. **MDB + 4G is the minimum spec.** Australia's 3G networks closed in 2024 and many old machines stopped taking cards. Any used machine needs an MDB controller plus a 4G reader and SIM.
5. **Smart fridges suit Melbourne workplaces,** with fewer moving parts and a wider product range. However, there's no published AU price, there's lock-in to the supplier's software and cloud, and they need trusted sites. The Vend Shop (HAHA) is the main AU channel.
6. **Melbourne supplier cluster in Sunshine North** (Vend Link/Allsorts, TCN Vending AU). National suppliers include The Vend Shop and Vending Machines Australia. Direct import from China is cheaper but brings compliance (RCM) and warranty risk, so it isn't advised for a first-time operator.
7. **Running costs (ESTIMATE):** electricity for a chilled machine ~$500–$1,150/yr (often paid by the site host); payments ~$30/machine/month plus % of sales; VMS $0–$50/month for a small fleet; repairs $300–$600/yr per used machine.
8. **Tax:** the $20k instant asset write-off (permanent from 1 Jul 2026 per the Budget, but legislation status is disputed) covers most single machines. GST is claimable if registered.
9. **Software:** with 1–5 machines the card-reader portal (Nayax Core/MoMa) is enough. Add a flat-rate VMS (~US$19–25/mo) at 5–20 machines.
10. **Data caveat:** most AU prices come from vendor marketing pages, and direct fetches were blocked. Every key figure needs a written quote (see open-questions.md).
