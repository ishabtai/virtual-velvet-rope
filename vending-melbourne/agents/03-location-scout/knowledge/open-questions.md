# Open Questions and Hand-offs (03 Location Scout)

Accessed 2026-11-04.

## Research limitations this session
- The web-search budget (shared across agents) ran out after 13 searches.
- WebFetch was blocked for: health.vic.gov.au, heas.health.vic.gov.au, bsale.com.au, vendingmachinesaustralia.com.au, realcommercial.com.au. Facts from these domains rely on **search-result snippets only**. They need re-verification once those domains are added to the session's network allow-list.

## Unverified / unknown
1. **Australian commission norms beyond "10% rebate".** We found no industry survey (e.g. from the Australian Vending Association). Talk to 3–5 Melbourne operators or brokers.
2. **Real per-machine sales by location type in Melbourne.** The only AU benchmark is a derived ~$350 per machine per week from a 62-machine listing (unverified). Ask brokers for audited takings.
3. **Laverton North / Truganina job count.** Get ABS Census 2021 place-of-work by SA2 (or the Wyndham/Hobsons Bay economic profiles on .id).
4. **Current Melbourne Airport precinct employment.** The 14,000 figure is from 2013.
5. **Exact Healthy Choices vending targets** (the % green / % amber split) in the January 2025 directive. The fetch was blocked.
6. ~~Whether private hospitals, aged care and community health are bound by Healthy Choices~~ **RESOLVED 2026-11-04:** the directive is mandatory for public health services only, including PSRACS and integrated community health. Private providers adopt it voluntarily (heas.health.vic.gov.au, search summary).
7. **Who controls vending at Metro Trains stations** and council leisure centres. Still unknown after a search on 2026-11-04. Metro's franchise ends in late 2027 and is being re-tendered, so station retail arrangements may change.
8. **University vending contracts:** current incumbents and renewal dates at Monash, UniMelb, RMIT, Deakin Burwood, La Trobe, VU. Only the Melbourne Polytechnic tender was found.
9. **Incumbent operator density** in each precinct (hand-off to 02).
10. **Hybrid-work office occupancy** in Melbourne in 2026 (affects the office ranking).
11. **Scoring-model weights** are uncalibrated. They need real sales data.

## Hand-offs
| To | Item |
|---|---|
| 01 Market Analyst | Validate headcount figures per precinct and get ABS place-of-work data. Check the 2026 office occupancy trend |
| 02 Competitor Analyst | Map incumbents (national operators, Fitness Vending in gyms, any campus/hospital contract holders) in the Dandenong South, West and Tullamarine clusters |
| 04 Product & Pricing | Product mix per location type: night-shift DC, gym (protein/sports), Healthy Choices-compliant hospital range, laundromat/car-wash non-food. Average-ticket assumption of $3.50–$4.50 |
| 05 Equipment & Tech | kWh per day for the pitch. Smart fridge vs spiral machine threshold (~80 staff?). 4G telemetry. Cashless commission reporting (Nayax etc.). Machine dimensions vs 900mm doors |
| 06 Supply & Ops | Route density: choose one cluster. Depot/storage location. Restock frequency per site tier |
| 07 Financial Modeller | Use commission tiers 0% / 5–10% / 10–15% / 15–30% tender. Weekly gross ranges per type from location-types.md (ESTIMATEs). Calculate commission ex GST |
| 08 Legal & Compliance | Placement agreement template (term, removal, liability, power). Public liability level. GST on commission base. Healthy Choices applicability. School policy. Airport-land and station retail controls |
| 09 Devil's Advocate | Challenge: are industrial sites already saturated by incumbents? Is the ~$350/week benchmark realistic for a newcomer's sites? Risk of buying "turnkey" packages with unsecured locations |

## Added in Phase 2 (2026-11-04)
- Placement-package re-site terms: Royal Vending gives a 180-day re-site option below an **undisclosed** weekly takings threshold. Ask for it in writing.
- Site churn and post-acquisition site-loss rates (see `../analysis/phase2-analysis.md` §4) are ESTIMATEs. Ask brokers and operators for evidence.
- Truganina/Laverton North current job count is still unverified. Council projects 10,000–15,000 planned jobs.
