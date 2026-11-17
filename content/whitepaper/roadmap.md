---
title: 9. Roadmap
description: The phased development roadmap for Ovia Labs, with status, dependencies and the conditions for moving from one phase to the next.
status: in-progress
related: [roadmap, status, whitepaper/risks-open-questions]
---

> [!NOTE] No dates
> The roadmap is ordered by dependency, not by calendar. Ovia Labs does not publish target dates until the work that determines them is done. The interactive version with milestones is on the [Roadmap](/roadmap) page.

## How to read this roadmap

Each phase has a status from the documentation legend: {{status:completed}} {{status:in-progress}} {{status:planned}} {{status:research}} {{status:conditional}}. A phase starts when its dependencies are met, and a later phase can be cancelled or changed by what an earlier phase learns.

## Phase 01: Foundation and product definition {{status:in-progress}}

Establish the company’s direction and define the first product precisely.

- Brand identity and website repositioning around Web3 security.
- Documentation and this whitepaper.
- The Ovia Protect product requirements document (PRD), including feasibility tests.
- PRD-010 data-source feasibility test: completed. Free public RPC verification works; one tested free discovery API was rejected; full log scanning on the tested free RPC is impractical.

**Exit condition:** an approved PRD with a selected discovery approach whose coverage has been measured.

## Phase 02: Ovia Protect MVP development {{status:planned}}

Build the first version within the documented constraints: read-only, Ethereum Mainnet, ERC-20 allowances, no storage of scans.

**Depends on:** Phase 01 exit condition.
**Exit condition:** a working build that passes the accuracy and coverage tests defined in [chapter 6](/whitepaper/security-privacy-limitations#security-validation-requirements-before-release).

## Phase 03: Protect validation and product expansion {{status:planned}}

Test the MVP with real users, publish measured limitations, and arrange an independent review. Consider, based on evidence, extensions such as Permit2 allowances, NFT operator approvals, additional networks or clearer guidance on revocation.

**Depends on:** Phase 02.
**Exit condition:** a public release with documented coverage and an independent review completed.

## Phase 04: Ovia Network research {{status:research}}

Study whether a decentralised verification layer is useful and feasible, using what Ovia Protect revealed about real data needs. The output is a written feasibility assessment, not software.

**Depends on:** operating experience from Phase 03.
**Exit condition:** a published assessment with a recommendation to proceed, change direction or stop.

## Phase 05: Ecosystem expansion and token feasibility {{status:conditional}}

Only if Phase 04 recommends proceeding: design a network prototype and evaluate whether a token is necessary, under the conditions in [chapter 8](/whitepaper/ovia-token#conditions-before-any-token-design-or-launch).

**Depends on:** a positive Phase 04 assessment, plus legal review.

## What could change the roadmap

- A discovery approach that meets the constraints may not exist, which would change Ovia Protect’s scope or constraints.
- User testing may show that a different product is more useful.
- Network research may conclude that a network is not justified.
- Regulatory developments may rule out or reshape token work.

Each of these outcomes would be documented in the [Changelog](/resources/changelog).
