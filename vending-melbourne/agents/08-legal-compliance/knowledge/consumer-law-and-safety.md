# Australian Consumer Law, Pricing, Electrical Safety, CDS Vic, Council Permits and Privacy

> General information only, not legal advice. Research date: Nov 2026. Official ACCC and ESV pages could not be fetched directly in this session. The facts come from search extracts of official pages and secondary legal sources, as cited.

## 1. Australian Consumer Law (ACL): refunds and guarantees
The ACL (Schedule 2, Competition and Consumer Act 2010) applies to every vending sale.

- **Consumer guarantees:** goods must be of acceptable quality, fit for purpose and match their description. A stale, damaged or expired product, or a machine that takes the money but dispenses nothing, fails the guarantee.
- **Remedies:** for a major problem, the consumer chooses a **refund or replacement**. A refund must be the **full amount paid**. Source: ACCC https://www.accc.gov.au/business/problem-with-a-product-or-service-you-sold/repair-replace-refund-cancel
- **You cannot contract out of these remedies.** Signs such as "No refunds" are unlawful. Source: ACCC https://www.accc.gov.au/about-us/publications/refunds-and-returns
- **Change of mind:** there is no legal duty to refund (for example the customer picked the wrong snack).
- **What this means for vending:**
  - Display a **refund contact** on every machine: phone, SMS or QR form. This also meets the Food Standards Code supplier-name-and-address label rule (see `food-act-victoria.md`).
  - Machines with **drop sensors** (guaranteed-vend, which retries or refunds automatically if nothing falls) reduce disputes. Cashless payment allows automatic refunds (hand-off to agent 05).
  - Keep a simple refund log. Losses from failed vends cost a margin line of roughly 0.5–2% of sales (ESTIMATE).
- **Misleading or deceptive conduct (s18 ACL):** product pictures, "healthy" claims and "fresh" claims on machine wraps must be accurate.

## 2. Price display
- **Single price rule:** consumer prices must be shown as a **single, total, GST-inclusive figure**. A GST-exclusive figure can appear but must not be more prominent. Sources: ACCC price displays https://www.accc.gov.au/business/pricing/price-displays ; https://sprintlaw.com.au/articles/gst-included-or-not-how-to-display-prices-in-australia/
- **Every selection must show its price.** If the displayed price differs from the price charged, a consumer is generally entitled to the lower displayed price (background knowledge of the ACL "multiple pricing" rule, verify). Update the price labels whenever you change prices in telemetry.
- **Unit pricing:** the Grocery Unit Pricing Code applies to large grocery retailers (background knowledge), **not** to vending.
- **Dynamic pricing** (e.g. time-of-day prices on smart screens) is lawful if it is accurately displayed before purchase.

### Card surcharges (important change on 1 Oct 2026)
- The RBA lifted its ban on "no-surcharge" rules. **From 1 October 2026, Visa, Mastercard and eftpos can prohibit merchants from surcharging** debit, credit and prepaid cards through merchant agreements. Interchange caps also fell (credit 0.8% → 0.3%, debit 0.2% → 0.16%, as reported). Sources: ACCC https://www.accc.gov.au/about-us/publications/card-surcharges-only-charge-what-it-costs-you ; InvestSMART summary https://www.investsmart.com.au/investment-news/the-hidden-catch-in-australias-card-surcharge-ban/155336
- Calling a card-only fee by a different name is still a surcharge (the ACCC treats this as drip pricing).
- **Implication:** **build card fees into the shelf price. Do not add a card surcharge** (e.g. "+$0.20 card fee") on new machines. Check the payment provider's merchant terms (hand-off to agent 05/07).
- Where surcharging is still permitted (e.g. Amex), the surcharge must not exceed the cost of acceptance (ACCC).

## 3. Electrical safety

### 3a. Machine compliance (RCM / EESS), critical if importing
- Under the national **Electrical Equipment Safety System (EESS)**, administered in Victoria by **Energy Safe Victoria (ESV)**, in-scope electrical equipment must bear the **Regulatory Compliance Mark (RCM)**. Level 2 and 3 equipment must be **registered on the EESS database** by an Australian-based **Responsible Supplier**. Sources: ESV https://www.energysafe.vic.gov.au/industry-guidance/electrical/frequently-asked-questions/electrical-equipment-safety-and-efficiency ; https://energysafe.vic.gov.au/industry-guidance/electrical/appliances-equipment-and-manufacurers/selling-appliances-and-equipment
- Overseas entities cannot be Responsible Suppliers, so **if the founder imports machines directly (e.g. from China via Alibaba), the founder becomes the importer** and may need to register as a Responsible Supplier, register in-scope equipment, and keep a **compliance folder** to give ESV within 10 days on request. Source (importer guide): https://energysafe.vic.gov.au/industry-guidance/gas-and-pipelines/gas-appliances-equipment-and-manufacturers/online-marketplace-importers-guide ; secondary: https://www.accesscomms.com.au/product-compliance/
- Whether a commercial refrigerated vending machine is "in-scope", and at which level, was **not confirmed**. Refrigerated vending machines may also be subject to **GEMS (energy efficiency / MEPS) registration** for refrigerated display cabinets (background knowledge, **verify**). Hand-off to agent 05: **buy from Australian distributors who supply RCM-marked, compliant machines**, or budget for compliance testing (ESTIMATE $2k–$10k per model).
- The importer may also carry ACL "manufacturer" liability for defective goods.

### 3b. Test and tag (AS/NZS 3760)
- **AS/NZS 3760** (current edition 2022) sets out in-service inspection and testing of plug-in electrical equipment. Testing must be done by a **competent person**. Tags must show at least "tested to AS/NZS 3760" and the test date (secondary sources).
- In Victoria, the legal driver is the **Occupational Health and Safety Act 2004 (Vic)** duty to provide safe plant and workplaces. WorkSafe Victoria is reported to be enforcing minimum testing programs consistent with AS/NZS 3760. Source: https://www.ohsrep.org.au/electrical_equipment
- Typical intervals (commercial guides, not verified against the standard): **12 months** for retail and office environments, 6 months for factories and warehouses, 3 months for construction. Host sites often require proof of a current tag at installation (ESTIMATE, based on typical facility rules).
- Cost ESTIMATE: $5–$15 per item for a test-and-tag contractor, or train yourself (~$300–$500 course) and buy a tester (~$1,000–$3,000).
- Also: a **residual current device (RCD)** protected outlet is recommended. Do not use power boards or extension leads, which are a fire and trip hazard.

### 3c. Physical safety
- Tipping is a known cause of death and serious injury when people rock vending machines (background knowledge). **Anchor or anti-tilt** tall machines, and add warning stickers.
- Keep exits, fire equipment and accessible paths clear (the host's building and fire-safety obligations).

## 4. Container Deposit Scheme Victoria (CDS Vic)
- Started **1 November 2023** under the *Circular Economy (Waste Reduction and Recycling) Act 2021*. There is a **10c refund** on eligible containers: most 150 mL–3 L glass, plastic, aluminium or steel drink containers. Plain milk, wine and spirits bottles, and casks of 1 L or more are excluded. Sources: https://cdsvic.org.au/eligible-containers ; EPA guide https://www.epa.vic.gov.au/sites/default/files/2026-06/CDS-eligible-container-guide.pdf
- **"First suppliers"** (the party that first supplies the beverage in Victoria, usually the manufacturer or importer) must sign a supply agreement with the Scheme Coordinator, report and pay scheme costs. A **retailer becomes a first supplier if it has private-label drinks bottled for it, or imports drinks directly**. Sources: https://www.epa.vic.gov.au/first-supplier-determination-instrument-victorian-container-deposit-scheme ; https://cornwalls.com.au/?p=17149
- **For a normal vending operator buying from Australian wholesalers (Coca-Cola Europacific Partners, Asahi, distributors, Costco and so on):** the CDS cost is **already built into the wholesale price**. No separate registration was found for retailers. The research found no Victorian obligation for retailers to display CDS signage or to collect containers. **Unverified; confirm with CDS Vic.**
- **Watch-outs:**
  1. **Direct imports** of drinks (e.g. Japanese or Korean specialty drinks, a popular niche vending theme) **make you a first supplier**, with registration, reporting and contribution payments. Containers must also carry the refund marking. Use a local importer that is already registered unless you are prepared to take this on.
  2. **Private-label water or drinks** for your brand also make you a first supplier.
- Opportunity: placing a collection bin beside machines suits hosts (a sustainability story). Becoming a refund point requires an agreement with a CDS Vic network operator; not researched.

## 5. Council permits for outdoor / public placement
- A machine **on public land** (footpath, council reserve, road reserve, council car park) generally requires a **council local-law permit** (e.g. "Permit to Place or Display Goods in a Public Place" or "Trading in a Public Place"). These are issued under each council's local law. Sources: ABLIS listings e.g. Merri-bek (General Local Law 2018, $380 application fee, $10m PL minimum) https://ablis.business.gov.au/service/vic/permit-to-place-or-display-goods-in-a-public-place-merri-bek-city-council/40884 ; Darebin footpath trading $35–$309 https://ablis.business.gov.au/service/vic/permit-to-conduct-trading-in-a-public-place-darebin-city-council/40753 ; Cardinia ($20m PL minimum) https://ablis.business.gov.au/service/vic/permit-to-place-or-display-goods-in-a-public-place-cardinia-shire-council/40838
- None of the results addressed vending machines specifically. Councils may refuse outright, so ask before buying a machine for an outdoor site.
- **Private land visible from the street** (e.g. a 24/7 machine at a service-station forecourt or a shopfront): possible **planning** issues (signage/advertising under the Victoria Planning Provisions Clause 52.05, illuminated signs) and **building** issues. Background knowledge; confirm with the council planning department. Usually low risk for a single machine inside private premises.
- Outdoor machines need IP-rated, weatherproof equipment and outdoor power installed by a licensed electrician, which needs an electrical **Certificate of Electrical Safety** in Victoria (background knowledge, verify).
- **Public transport (Metro/PTV) and other State land:** handled through the relevant authority's commercial or tender process, not council.

## 6. Privacy
- Smart fridges and AI vending often use **cameras** (product recognition and theft deterrence), and apps collect **personal data** (email, phone, card tokens, purchase history).
- The **Privacy Act 1988 (Cth)** small-business exemption (turnover under $3m) still existed as of the research date, but the government has agreed in principle to remove it, and **facial recognition / biometrics are likely to be carved out first**. OAIC found Kmart breached privacy with facial recognition (Sept 2025). A tribunal partly upheld the findings against Bunnings (Feb 2026). Sources: https://cm.twobirds.com/en/insights/2026/australia/facial-recognition-and-the-privacy-act-a-clearer-(but-stricter)-line-for-businesses ; https://www.claytonutz.com/insights/2024/january/the-australian-governments-response-to-the-privacy-act-review-the-use-of-facial-recognition-technology
- **Recommendations:** do **not** use facial recognition. Display a camera notice on camera-equipped fridges. Publish a short privacy policy. Collect the minimum data. Choose platforms that store data securely. Note that the exemption does not apply to some businesses even below $3m (e.g. those trading in personal information, background knowledge).
- **Surveillance Devices Act 1999 (Vic):** optical surveillance in private areas is restricted. Cameras pointed at the product area of a machine in a public lobby are generally lower risk, but avoid audio recording (background knowledge, verify).

## 7. Other compliance notes
- **Spam Act / marketing:** if you run a loyalty app or send SMS or email promos, get consent and include an unsubscribe option (background knowledge).
- **Accessibility:** consider the reach height of payment terminals and selection buttons (Disability Discrimination Act 1992 risk; no specific vending standard was researched).
- **Scams around "turnkey vending" opportunities:** "business opportunity" sellers that promise locations and guaranteed income have drawn ACCC attention in the past (background knowledge). If a franchise is involved, the **Franchising Code of Conduct** requires a disclosure document at least 14 days before signing (background knowledge, verify). Hand-off to agents 02 and 09.
