# Cashless Payments & Telemetry

_Research date: 2026-11-04 · AUD unless stated · Search extracts of cited pages (page fetches blocked in-session). **No provider publishes a full current Australian vending price list — all must be quoted.**_

## 1. Why cashless is non-negotiable
- Australian consumers carry little cash; vending sites without card/phone-wallet acceptance lose sales (common industry claim; VMA, The Vend Shop) [1][2].
- Cashless-only also removes cash collection, coin-mech jams and break-in motive.
- Modern unattended readers accept Visa/Mastercard/eftpos/Amex + Apple Pay/Google Pay; Nayax Australia added eftpos, Amex and JCB from Aug 2020 (initially VPOS Touch only) [3][4].
- Most readers double as **telemetry** (they report every sale over 4G), so one device = payments + sales data.

## 2. Provider options in Australia

| Provider | Device(s) | Hardware cost | Monthly fee | Transaction fee | AU status / notes |
|---|---|---|---|---|---|
| **Nayax** (Israeli, AU office; processing via First Data/Fiserv) | VPOS Touch, Onyx, VPOS Media 4 (Android) | US resellers: ~US$300–$500; Ireland €750 ex VAT [5]. **AU rental: VPOS Media 4 "less than AUD $1/day, no upfront hardware cost" (launched Jul 2025)** [6] | US: $7.95–$9.99/device; Canada: flat $80/mo bundle [5][7] | US: 5.95% (≤$5 sales) or 2.5%+10c; Canada: 2.5%+10c [5][7] | Largest AU unattended player; First Data deal pitched as lowering AU fees [8]. Software: Nayax Core + MoMa app. |
| **Vendcell U2000** (sold by VMA) | MDB card reader + Vendcell Remote Monitoring | Quote only | Quote only | Quote only | Accepts Visa/MC/Amex/Apple/Google Pay [9] |
| **Card Access Services (CAS)** | Gateway/processor; certified OTI Trio/Uno readers (via Vend Access) | Quote | Quote | Quote | AU since 1987; partnerships dated 2016–18, currency unverified [10][11] |
| **Cantaloupe** (ex USA Technologies; ePort, Seed software) | ePort/Engage | – | – | – | Historic AU EMV solution with ADVAM; **no current AU presence confirmed** [12] |
| **Smart-fridge native payments** (HAHA etc.) | Built-in card/QR/wallet | Included in fridge | Platform fee — quote | Quote | Card, mobile wallet, QR supported [13] |
| **Generic retail terminals** (Square, SumUp, Tyro, Zeller) | Handheld EFTPOS | SumUp: one-off device; Tyro rent ~$29/mo | SumUp $0; Pocket Pay $23+GST | SumUp 1.40%; Square ~1.9%; Tyro ~1.4% (early 2025) [14][15] | **Not MDB/unattended** — fine for honesty-box/micro-market kiosks, not inside a spiral machine |

### Reality-check estimate for Agent 07 (ESTIMATE)
For a Nayax-class reader on an Australian vending machine in late 2026:
- Hardware: **$0 upfront on rental (~$25–$30/mo)** or **~$500–$800 purchase + ~$10–$20/mo service** (converted from US/IE pricing + GST).
- Processing: **ESTIMATE 3.0%–5.0% of cashless sales** on small tickets (avg vend $3–$5), because fixed per-transaction cents dominate. Use **4%** as model default; 2.5–3% for smart fridges with larger baskets.
- Reasoning: US pricing 5.95% at ≤$5; Canada 2.5%+10c → $4 sale = 5%; AU interchange caps lowered Oct 2026 (below) should pull AU toward the lower end.

## 3. Regulatory change: RBA surcharge ban (critical, new)
- **From 1 October 2026 surcharging on eftpos, Visa and Mastercard is banned**; interchange caps lowered at the same time (domestic cards 1 Oct 2026; foreign cards 1 Apr 2027) [16][17][18].
- RBA estimates wholesale cost cuts ~$1.2 bn/yr, largest for small merchants; ~90% of small merchants better off [16][17].
- **Implication:** an operator **cannot add a "card fee"** on a vend — processing costs must be built into shelf price (Agent 04) and margin (Agent 07). Ask providers whether they are passing on the interchange cut. Some fintech terminal providers may exit [17] — prefer established unattended specialists.
- Amex and some others are excluded from the ban per ACCC commentary [16]. (Legal detail → Agent 08.)

## 4. Telemetry — what it gives you
- Real-time sales by item, stock-level estimate, fault/temperature alerts, cash-less settlement report, remote price changes (on supported machines).
- **Route efficiency:** only visit machines that need restocking; pre-pick exactly what's needed (big saving in time/fuel; Agent 06).
- Usually delivered via the card reader (Nayax, Vendcell) or a separate DEX/MDB telemeter (Vendon, Televend).
- Connectivity: **4G (LTE-M/Cat-M1) only.** Australia's 3G networks closed in 2024; many vending machines stopped taking cards [19]. 3G-era SIMs don't work in 4G devices [20]. When buying used: assume telemetry must be replaced.
- SIM/data: generally bundled in the provider's monthly fee (confirm).

### Telemetry-only pricing benchmarks (not AU-specific)
| Product | Price | Source |
|---|---|---|
| SENVEND (EU) | €10/device/month | [21] |
| Vendron (route platform) | US$12–$16/machine/month | [22] |
| Historic forum quote | $375 setup + $12/mo per machine (2013) | [23] |
| Vendon | quote only | [24] |
ESTIMATE AU telemetry-only cost: **$15–$25/machine/month**, often unnecessary if the card reader already reports sales.

## 5. Recommended stack for a beginner (ESTIMATE-based)
1. **Machines ≤ 5:** Nayax (rental model, no upfront) on each MDB machine → Nayax Core/MoMa for sales + stock. Cost ~$30/machine/month + ~4% of sales.
2. **Smart fridges:** use supplier's built-in payment + cloud; confirm per-transaction % and platform fee; confirm you own your data and can switch processors.
3. **Micro-market:** kiosk vendor's own payments (365, Nayax UniPay-style) or a cheap terminal (Square/SumUp) for a pilot.
4. Keep a coin/note acceptor only where cash demand is proven (schools, some trades sites) — Agent 03/04 to confirm.

## 6. Questions to ask every payments provider
- Hardware: buy price vs rental; contract length; early-exit fees.
- Monthly fee per device incl. SIM/data and software.
- Processing rate on a $3.50 sale (ask for the effective %), eftpos vs credit, international cards.
- Settlement timing (daily?), chargeback handling, pre-authorisation holds (smart fridges pre-auth $1–$20 — customer-experience issue).
- Post-Oct-2026 interchange pass-through.
- Data export/API; integration with chosen VMS.

## Sources (accessed 2026-11-04)
1. VMA – cashless payments vending machines Australia https://www.vendingmachinesaustralia.com.au/cashless-payments-vending-machines-australia
2. The Vend Shop – why cashless vending is the future https://www.thevendshop.com.au/why-cashless-vending-is-the-future-benefits-for-operators-and-users/
3. Nayax – AU to accept eftpos, Amex and JCB https://www.nayax.com/news/nayax-australia-to-accept-eftpos-american-express-and-jcb-payment-schemes
4. Vending Market Watch – Nayax AU eftpos https://www.vendingmarketwatch.com/technology/mobile-payment-systems/news/21144531/nayax-australia-to-begin-accepting-eftpos-american-express-and-jcb-in-august
5. CandyMachines – Nayax VPOS Touch; vending-machines.ie VPOS Touch https://candymachines.com/Nayax-VPOS-Touch-Cashless-Credit-Card-Reader-P7276.aspx ; https://vending-machines.ie/product/vpos-touch/
6. CFOtech Australia – Nayax launches Android POS with rental model in Australia https://cfotech.com.au/story/nayax-launches-android-pos-with-rental-model-in-australia
7. Nayax shop FAQ (Canada) https://shop.nayax.com/ca_en/faq
8. Nayax – AU to work with First Data https://www.nayax.com/nayax-australia-to-work-with-first-data-for-all-customer-transactions/
9. VMA – buy vending machine credit card readers https://www.vendingmachinesaustralia.com.au/buy-vending-machine-credit-card-readers
10. Card Access Services – cashless vending https://www.cardaccess.com.au/cashless-vending/
11. Vending Times – OTI partners with Vend Access/CAS https://www.vendingtimes.com/news/oti-partners-with-vend-access-card-access-services-to-provide-cashless-payments-in-australia/
12. Vending Times – USAT and ADVAM EMV for Australia https://www.vendingtimes.com/news/usat-and-advam-launch-emv-payment-solution-for-australian-vending-market/
13. The Vend Shop – HAHA smart fridges https://www.thevendshop.com.au/product/haha-vending-fridge/
14. SumUp AU pricing https://www.sumup.com/en-au/payment-processing-pricing/
15. Mobile Transaction AU – Tyro vs Square https://www.mobiletransaction.org/aus/cm-au
16. Reckon – RBA card surcharge ban https://www.reckon.com/au/blog/rba-surcharge-ban/
17. Banking Day – surcharging banned, interchange lowered https://www.bankingday.com/surcharging-banned-interchange-lowered-in-rba-payments-overhaul
18. Prospa – the end of credit card surcharges https://www.prospa.com/blog/the-end-of-credit-card-surcharges-what-does-this-change-actually-mean
19. Vending Times – AU vending machines breaking down from 3G shutdown (May 2024) https://www.vendingtimes.com/news/australian-vending-machines-breaking-down-as-result-of-3g-shutdown/
20. Access Comms – 3G shutdown https://www.accesscomms.com.au/australia-s-3g-network-shutdown-what-you-need-to-know/
21. SENVEND – packages EU https://www.senvend.com/en/pakete-eu
22. Slashdot – Vendron https://slashdot.org/software/p/Vendron
23. VenDiscuss forum – wireless inventory monitoring https://vendiscuss.net/topic/18337-wireless-inventory-monitoring/
24. Vendon – what operators want to know https://vendon.net/blog/what-operators-want-to-know-before-connecting-their-machines/
