# Vending Management Software (VMS)

_Research date: 2026-11-04 · Prices mostly USD from review aggregators — verify directly. AU availability noted where known._

## What a VMS does (jargon)
A **Vending Management System** is the operator's back office: it pulls sales from telemetry/card readers, tracks inventory per machine and per spiral ("planogram" = the map of which product sits in which slot), generates **pick lists** (what to load in the van before a route), schedules visits, tracks expiry dates, and reports gross margin per machine/location. Micro-markets use an **MMS** (micro-market management system), often the same vendor.

## When you need one
| Fleet size | Recommendation |
|---|---|
| 1–5 machines | Card-reader portal (Nayax Core/MoMa, Vendcell portal) + spreadsheet is enough |
| 5–25 machines | Low-cost cloud VMS (flat-rate) with pick lists and planograms |
| 25+ / micro-markets | Full VMS/MMS with route optimisation, warehouse inventory, DEX integration |

## Options and published prices

| Product | Pricing (as published) | Model | AU fit | Source |
|---|---|---|---|---|
| **Nayax Core + MoMa app** | Included/bundled with Nayax device fee (confirm AU) | Device-linked | **Best AU fit** — Nayax has AU office, most AU readers | [1][2] |
| **VendSoft** | from US$19.99/month flat (starter tier, capped machines); higher tiers add telemetry; Capterra also lists $31.1/user/mo | Flat tier | Cloud — usable from AU; no local support | [3][4] |
| **Roundkeep** | US$19/month flat for up to 25 machines | Flat | Cloud | [5] |
| **VendingMetrics** | from US$25/month | Flat | Cloud | [6] |
| **PayRange VendSights** | US$6.99/machine/mo (with PayRange) or $12.99 standalone | Per machine | PayRange is US-centric — AU support doubtful | [7] |
| **Wendor** | US$7.50/machine/mo annual; $9 monthly | Per machine | Unknown AU | [8] |
| **Vendron** | US$12–$16/machine/mo | Per machine | US | [9] |
| **Vendon** (Latvia) | Quote | Telemetry + cloud | Global; works with many readers; AU partners unverified | [10] |
| **Cantaloupe Seed** | Quote | Full VMS/MMS, NAMA VDI standard | US/EU focus; AU unconfirmed | [11] |
| **365 Retail Markets** | Quote (kiosk + software bundle) | MMS | In AU since 2018 via Vendpro | [12] |
| **Smart-fridge platforms** (HAHA, etc.) | Bundled, platform fee per fridge — quote | Closed ecosystem | Sold in AU by The Vend Shop | [13] |
| **VendVice** (beta) | $1.50–$1.80/machine/mo listed (beta free) | Per machine | Early-stage — risk | [14] |

ESTIMATE in AUD: flat-rate cloud VMS **$30–$50/month** for a small fleet; per-machine VMS **$10–$25/machine/month** (USD ×1.5 + GST).

## Selection criteria for a Melbourne start-up
1. **Integrates with the chosen card reader** (Nayax API, DEX). Avoid double data entry.
2. Supports AUD, GST-inclusive pricing, Australian time zones.
3. Mobile app for the driver (pick list, restock confirmation, photo of machine).
4. Expiry date tracking (food safety — Agent 08) and wastage reporting.
5. Per-location P&L including commission paid to site host (Agent 03/07).
6. Data export (CSV/API) — avoid lock-in, especially with smart-fridge ecosystems.
7. Month-to-month terms in year 1.

## Supporting tools (low cost)
- Accounting: Xero / MYOB / QuickBooks (AU GST/BAS support) — ESTIMATE $35–$80/mo. (Agent 07)
- Route planning: Google Maps multi-stop, Circuit, RouteXL — free to ~$30/mo (Agent 06).
- Dynamic pricing / promos: possible on Android-based readers (Nayax VPOS Media) and smart fridges.

## Recommended path (ESTIMATE-based)
- **Phase 1 (1–5 machines):** Nayax portal + Google Sheets template; $0 extra.
- **Phase 2 (5–20):** add a flat-rate VMS (VendSoft/Roundkeep-class) if Nayax tools prove insufficient — ~$30–$50/mo.
- **Phase 3 (20+ or micro-market):** evaluate Vendon / Cantaloupe Seed / 365 via demo; insist on AU references.

## Sources (accessed 2026-11-04)
1. Nayax – AU continues to transform unattended market https://www.nayax.com/news/nayax-au-increases-customer-satisfaction-transformations/
2. CFOtech – Nayax Android POS rental model AU https://cfotech.com.au/story/nayax-launches-android-pos-with-rental-model-in-australia
3. GetApp – VendSoft https://www.getapp.com/operations-management-software/a/vendsoft
4. Capterra – VendSoft https://www.capterra.com/p/132186/VendSoft/
5. Capterra – Roundkeep https://www.capterra.com/p/10048849/Roundkeep/
6. SpotSaaS – VendingMetrics pricing https://www.spotsaas.com/product/vendingmetrics/pricing
7. PayRange – pricing plans VMS https://payrange.com/payrange-pricing-plans-vms/
8. SourceForge – vending machine management (Wendor listing) https://www.sourceforge.net/software/vending-machine-management/free-version
9. Slashdot – Vendron https://slashdot.org/software/p/Vendron
10. Vendon – software https://vendon.net/de/software
11. Vending Market Watch – Seed Markets https://vendingmarketwatch.com/home/news/12188044/cantaloupe-systems-introduces-seed-marketstm-for-micro-markets
12. 365 Retail Markets – expands to Australia https://365retailmarkets.com/blog/365-retail-markets-expands-micromarket-technology-australia
13. The Vend Shop – HAHA smart fridges https://www.thevendshop.com.au/product/haha-vending-fridge/
14. VendVice landing page https://vendvice-landing-page.pages.dev/
