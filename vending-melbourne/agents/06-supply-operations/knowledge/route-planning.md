# Route Planning — Restocking in Greater Melbourne

*Agent 06 · Researched 4 Nov 2026 · AUD*

> **Jargon:** *Route* = the ordered list of machines a driver services in one run. *Pre-kitting* = packing each machine's refill into its own labelled crate at the storage base, using telemetry data, before leaving. *Telemetry* = the machine reports sales/stock levels over the mobile network. *Pick list* = the list of items needed per machine, generated from telemetry.

## 1. Benchmarks for time per machine and machines per day

| Metric | Figure | Source |
|---|---|---|
| On-site restock time | ~30 min average; 20–30 min with pre-kitting; a basic restock ~15 min | https://www.upperinc.com/success-stories/vendmax-services/ ; https://grafana.zeorouteplanner.com/?p=14120 |
| Machines/day per driver | 12–14 (average); 20–25 with pre-kitting vs 10–12 manual loading | same + https://vmfsusa.com/blogs/business/when-to-bring-on-help-a-second-person-for-restocking-the-complete-vending-route-scale-blueprint |
| Density effect | 15 machines in one hospital complex ≈ 3 h; 15 spread over 40 miles (~64 km) ≈ 8 h | https://vmfsusa.com/blogs/business/when-to-bring-on-help-a-second-person-for-restocking-the-complete-vending-route-scale-blueprint |
| Part-time workload | 1–5 machines ≈ 3–10 h/week; 10–15 locations ≈ 15–20 h/week | vmfsusa / zeorouteplanner (US sources) |

All benchmarks are US-derived. Melbourne traffic and parking (CBD loading zones, shopping-centre docks) likely add time. ESTIMATE: add 10–15 min per stop for parking/access/sign-in at Melbourne commercial sites.

## 2. Visit frequency by machine type

| Type | Typical frequency | Driver |
|---|---|---|
| Snack/drink at low-volume site (small office, gym) | Every 1–2 weeks | Stock-outs vs fuel/time |
| Snack/drink at high-volume site (factory, hospital, train station) | 1–3 × per week | Sell-out of top lines |
| Fresh food / smart fridge (sandwiches, salads) | Daily or every 2nd day | Short use-by dates |
| Micro-market (open-shelf kiosk) | 2–5 × per week | Fresh + presentation |

Sources: UK guide — snack machines "every few days or weekly", fresh "often daily checks" https://connectvending.co.uk/blog/vending-machine-restocking-schedule/ ; https://vendingexchange.com/vending-faqs/how-often-are-vending-machines-refilled

**Rule of thumb (ESTIMATE):** schedule a visit when the *fullest-selling* column is ~50–60% empty, or a fixed weekly visit if no telemetry. Telemetry lets you skip visits where sales are low (a "dynamic route").

## 3. Melbourne geography and clustering

- Greater Melbourne is ~10,000 km² of sprawl; cross-town drives can be 60–90 min at peak. ESTIMATE.
- **Cluster strategy:** pick one or two corridors near home/storage and only accept sites within ~20–25 min. Examples (illustrative, Agent 03 to validate):
  - **West/North-west industrial**: Laverton North, Truganina, Derrimut, Sunshine, Tullamarine — warehouses, factories, shift workers; near Costco Ardeer.
  - **South-east industrial**: Dandenong South, Clayton, Moorabbin, Braeside — near Costco Moorabbin and Campbells Clayton.
  - **North**: Epping, Thomastown, Campbellfield — near Costco Epping.
  - **Inner city**: offices, uni, apartments — high density, but parking/loading costs and building access delays.
- Avoid peak traffic: schedule stocking 9:30–15:00 and fetch wholesale stock early morning. ESTIMATE.

## 4. Worked example — 10-machine weekly route (ESTIMATE)

Assumptions: 10 machines in a south-east cluster; average 8 km between stops; 25 min/stop incl. access; storage base 15 km from first stop.

| Item | Calc | Result |
|---|---|---|
| Driving | (10 × 8 km + 30 km return) = 110 km at ~35 km/h urban | ~3.1 h |
| On-site | 10 × 25 min | ~4.2 h |
| Pre-kitting at storage | 10 × 8 min | ~1.3 h |
| Wholesale run (weekly) | Costco/Campbells trip | ~1.5–2 h |
| Cash count, admin, telemetry review | | ~1 h |
| **Total** | | **~11–12 h/week**, one long day or two half days |
| Vehicle cost | 110 km + ~40 km wholesale = 150 km × $0.88/km (ATO rate as proxy) | **~$132/week** |

Vehicle cost proxy: ATO cents-per-km rate is 88c/km for 2025–26 (covers fuel, rego, insurance, depreciation, maintenance); third-party sites report 91c/km for 2026–27 (not confirmed on ATO). https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/work-related-deductions/cars-transport-and-travel/motor-vehicle-and-car-expenses/expenses-for-a-car-you-own-or-lease/cents-per-kilometre-method ; https://www.driversnote.com.au/blog/ato-cents-per-km-rate-2026-2027

Fuel context: Melbourne ULP91 city average ~205 c/L (mid-Sept 2026, FuelRadar estimate) — high relative to 2024–25. https://fuelradar.com.au/fuel-prices/vic/melbourne

## 5. Vehicle options

| Option | Cost | Fits | Notes |
|---|---|---|---|
| Own car / SUV / wagon | Already owned | 1–8 snack/drink machines | Drinks are heavy: a 24-can slab ≈ 9.5 kg. 20 slabs ≈ 190 kg. ESTIMATE |
| Used small van (e.g. older HiAce) | 2017 HiAce LWB diesel listed at $24,950 (191k km) | 8–30 machines | https://www.grabacar.au/used-cars-for-sale/toyota/hiace/listing/1729507 |
| New HiAce van | $51,880–63,190 MLRP; $57,393–69,042 drive-away; 7.5–8.4 L/100km | 20+ machines, fresh food | https://www.carexpert.com.au/toyota/hiace/pricing |
| Refrigerated van or esky + ice packs/portable fridge | Unknown | Fresh food/smart fridges | Cold chain ≤5 °C required for potentially hazardous food (see inventory-management.md) |
| Hand trolley / folding cart | ~$100–300 ESTIMATE | All | Essential: stairs, lifts, long corridors |

## 6. Storage base

- Home garage is cheapest for 1–10 machines (check council rules on home business and storage of food — hand-off to Agent 08).
- Self-storage in Melbourne: ~9 m³ unit $200/mo (National Storage Brooklyn, Melbourne Mini Storage Brunswick East) to $321/mo (Kennards Port Melbourne); outer suburbs (Werribee, Frankston, Altona) small units ~$80–150/mo; Kennards Craigieburn $185, Preston $344 (Sept 2025, prices change daily). https://hollowayremovals.com.au/blog/melbourne-storage-unit-cost-2025/ ; https://www.kss.com.au/news-and-updates/Storage-Prices-in-Melbourne-s-Northern-Suburbs
- Self-storage is usually **not temperature-controlled**. Chocolate melts above ~25–28 °C — a Melbourne summer problem. ESTIMATE; choose climate-controlled units or keep chocolate stock at home.
- Food-safety: self-storage leases often prohibit food storage (pest risk). Check each contract. ESTIMATE/verify.

## 7. Route software

- Telemetry + vending management systems (Nayax/VendSys, Cantaloupe Seed, etc.) generate pick lists and suggest which machines need visits. Nayax US list prices: ~US$7.95–14.95 per device per month depending on plan; transaction fees e.g. 5.95% under $5 (US). No AUD pricing found. https://us.fitgap.com/products/006949/nayax ; https://vmfsusa.com/payment-system/ ; https://www.nayax.com/au-cashless-and-telemtry-vending-solutions — hand-off to Agent 05.
- Generic route optimisers (Google Maps multi-stop, Circuit, Upper, Zeo) suit 5–30 stops.

## 8. Route design rules (summary)

1. Cluster first: a dense route beats a high-volume but scattered one.
2. Pre-kit from telemetry; never "load the van and guess".
3. Fixed day per cluster (e.g. Tuesday = south-east) so site hosts know when you'll come.
4. Keep a small "emergency kit" of top 10 SKUs and a spare coin mech/note float in the vehicle.
5. Review route quarterly: drop or relocate machines below a profit-per-visit threshold (Agent 07 to set, e.g. gross profit per visit < 1 hour of labour + vehicle cost).
