# Site Scoring Model (v1)

Purpose: give the founder a repeatable 100-point score so they can triage leads and decide whether to place, trial or decline. The weights are **ESTIMATE**s based on the core principle (captive headcount × access hours × lack of alternatives) plus operating costs. Recalibrate once 10+ live sites have real sales data.

## Scorecard

| # | Criterion | Weight | 0 points | Half points | Full points |
|---|---|---|---|---|---|
| 1 | **Captive headcount** (staff + regular users on site per day) | 25 | <15 | 40–80 | 150+ |
| 2 | **Access hours** | 15 | Business hours, 5 days | Extended / 6 days | 24/7 or multi-shift |
| 3 | **Food alternatives** within a 5-minute walk | 15 | Café/servo on site or next door | One option, 5–10 min walk | Nothing within 10+ min, or breaks too short to leave |
| 4 | **Route fit**: drive time from depot/home and to other sites | 10 | >40 min, isolated | 20–40 min | <20 min and inside a cluster |
| 5 | **Host terms** (commission, contract) | 10 | >15% or fixed rent | 5–10% | 0% / staff-amenity deal |
| 6 | **Demographic fit** with product range | 5 | Mismatch (e.g. health-restricted) | Mixed | Strong (shift workers, students, gym users) |
| 7 | **Physical install**: power point, floor, access path, doors ≥ 900mm, ground floor or lift | 5 | Needs electrician / stairs | Minor work | Plug-and-play |
| 8 | **Security / vandalism risk** | 5 | Public, unsupervised, outdoor | Semi-public | Inside a staff-only area / CCTV |
| 9 | **Incumbent competition** | 5 | Incumbent with contract | Old incumbent machine, unhappy host | No machine |
| 10 | **Regulatory constraints** (Healthy Choices, school policy, tender rules) | 5 | Heavy restriction | Partial | None |

**Total: 100.**

### Decision rules (ESTIMATE)
- **≥ 70: Place** a full machine (or a smart fridge if headcount is 80+ and the site is closed/secure).
- **55–69: Trial** with a used or lower-capex machine for 8–12 weeks, with a removal clause.
- **40–54: Waitlist.** Revisit if headcount grows or a cluster forms nearby.
- **< 40: Decline.**

## Quick revenue sanity check (ESTIMATE)
Weekly gross per machine ≈ captive headcount × purchase rate × average ticket.
- Purchase rate: 0.10–0.20 transactions per person per day for 5-day office sites, and 0.20–0.40 for 24/7 shift sites with no alternative (ESTIMATE, consistent with US rules of thumb).
- Average ticket: $3.50–$4.50 incl. GST (ESTIMATE; hand-off to 04 for Melbourne pricing).
- Example: a DC with 120 staff across shifts, 0.25 × 7 days × $4.00 ≈ **$840 per week**. Discount 30–40% for real-world friction gives about **$500–$600 per week**.
- Example: a 30-person workshop, 0.15 × 5 × $3.80 ≈ **$85 per week**. That is a starter or test site only.

## Field checklist (use on the site visit)
1. Count cars in the staff car park at two shift changes. This is a proxy for headcount.
2. Lunchroom: is there a fridge or microwave? Is there an existing machine (brand, age, payment type, empty spirals)?
3. Ask: "Where do people get food on night shift?"
4. Check the power point within 1.5 m, mobile signal for telemetry (Telstra/Optus 4G), and the delivery path (door widths, steps, lift).
5. Check for nearby servos, cafés and food trucks (Google Maps walk-time).
6. Identify the decision-maker: site manager, HR, or facilities/property manager. Note any landlord approval needed.
7. Note shift times. Restocking must avoid peak break times.

## Worked example (illustrative only)

| Criterion | Dandenong South food DC, 160 staff, 24/7 | Score |
|---|---|---|
| Headcount | 160 | 25 |
| Hours | 24/7 | 15 |
| Alternatives | Servo 12 min drive | 14 |
| Route fit | 15 min from depot | 10 |
| Host terms | Wants 10% | 6 |
| Demographic | Shift workers | 5 |
| Install | Lunchroom, ground floor | 5 |
| Security | Staff-only | 5 |
| Incumbent | Old cash-only machine, host unhappy | 3 |
| Regulation | None | 5 |
| **Total** | | **93: Place** |

## Spreadsheet template columns
`site_id, name, address, suburb, cluster, type, headcount, hours, alt_score, drive_min, commission_pct, demo, install, security, incumbent, regulation, total, decision, contact, decision_maker, date_visited, status, notes`
