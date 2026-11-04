# Melbourne Vending — AI Agent Team

A 10-agent team set up to analyse starting a vending business in Melbourne from zero.
Each agent has a role file (`AGENT.md`), a researched knowledge base (`knowledge/`), and a
Claude Code agent definition (`.claude/agents/<name>.md`) that loads that knowledge before working.

Start with `BRIEF.md` (shared rules), then any agent's `knowledge/INDEX.md`.

## Structure
```
vending-melbourne/
├── BRIEF.md                         shared brief, ground rules, workflow
├── .claude/agents/                  10 invokable agent definitions
└── agents/
    ├── 00-lead-strategist/          coordinates; synthesises options
    │   └── knowledge/  business-model-archetypes · case-studies · decision-framework · synthesis-template
    ├── 01-market-analyst/
    │   └── knowledge/  industry-overview · melbourne-demographics · consumer-trends · segments
    ├── 02-competitor-analyst/
    │   └── knowledge/  national-operators · local-operators · smart-fridge-micromarket-players · routes-for-sale · gaps-and-positioning
    ├── 03-location-scout/
    │   └── knowledge/  location-types · melbourne-precincts · host-commission-norms · site-scoring-model · pitching-playbook
    ├── 04-product-pricing/
    │   └── knowledge/  bestsellers-australia · margins-by-category · pricing-strategy · healthy-choices-guidelines · niche-products
    ├── 05-equipment-tech/
    │   └── knowledge/  machine-types · suppliers-and-prices-au · payments-and-telemetry · software-vms · finance-and-leasing
    ├── 06-supply-operations/
    │   └── knowledge/  wholesale-suppliers-melbourne · route-planning · inventory-management · maintenance-and-security · scaling-operations
    ├── 07-financial-modeller/
    │   └── knowledge/  revenue-benchmarks · cost-structure · unit-economics-model · scenarios-1-5-20 · tax-and-finance
    ├── 08-legal-compliance/
    │   └── knowledge/  business-structure-registration · food-act-victoria · insurance · host-agreement-template · consumer-law-and-safety
    └── 09-devils-advocate/
        └── knowledge/  failure-modes · scams-and-red-flags · hidden-costs · risk-register · kill-criteria
```
Every knowledge folder also has `INDEX.md` and `open-questions.md` (unverified items + hand-offs).

## Workflow
1. Knowledge build — **complete** (Nov 2026).
2. Analysis — 01–05 in parallel; 06–08 build on them.
3. Challenge — 09 attacks draft options.
4. Synthesis — 00 presents business-model options.

## Research caveat
Web search was capped per session and many source sites (health.vic.gov.au, ato.gov.au, bsale,
realcommercial, nayax, etc.) were blocked by the network policy, so most figures come from search
snippets and are marked `ESTIMATE` or listed in `open-questions.md` for verification.
