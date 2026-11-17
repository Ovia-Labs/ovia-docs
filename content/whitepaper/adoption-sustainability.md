---
title: 10. Adoption and Sustainability
description: Target users, education-first adoption, possible partnerships and possible business models for Ovia Labs, all presented as hypotheses.
status: draft
related: [whitepaper/roadmap, whitepaper/risks-open-questions]
---

> [!PROPOSAL] Hypotheses, not results
> Ovia Labs has no users, revenue, partners or integrations yet. This chapter sets out who the products are meant for and how the work could be sustained. Each item is a hypothesis to test.

## Target users

| Group | Need | First touchpoint |
|---|---|---|
| Self-custody users | Understand and clean up what their wallet has approved | Ovia Protect |
| Newer Web3 users | Learn what approvals and signatures mean before something goes wrong | Educational content |
| Community moderators and educators | Point people to a neutral, explainable check after an incident | Ovia Protect, documentation |
| Wallets and applications | Show users approval information without building it themselves | Possible future integration |

## Education first

Most approval risk comes from users not knowing what they granted. Ovia Labs therefore plans to lead with explanation: what an approval is, why unlimited allowances exist, and how to revoke them. The website’s “See what you’re signing” demo is an example of this approach. Education is useful even before the product exists, and it builds the vocabulary the product relies on.

## Building trust before scale

Security tools are only useful if people trust them, and trust in security tools is earned slowly. The plan is to:

- publish limitations alongside features;
- make every result reproducible from on-chain data;
- avoid growth tactics that conflict with security, such as asking users to connect wallets for rewards;
- seek independent review before claiming maturity.

## Partnerships {{status:not-specified}}

Ovia Labs has no partnerships. Partnerships with wallets, educators or security teams may become relevant after Ovia Protect is validated. Any partnership will be announced only when agreed, and never implied in advance.

## Possible business models {{status:proposed}}

The core Ovia Protect check is intended to remain free for individuals. Options for sustaining the work, none of which has been decided:

| Option | Description | Tension |
|---|---|---|
| Grants | Public-goods funding for open security tooling | Unpredictable, time-limited |
| Integration services | Paid support for applications embedding approval information | Requires a stable interface first |
| Advanced features | Optional monitoring or reporting for power users or teams | Must not weaken the free core |
| Network fees | If a network exists, fees for attestations | Conditional on Phase 04 and 05 |

Advertising and selling user data are excluded: they conflict with the privacy principles in chapter 6.

## Measures of success

Proposed measures focus on usefulness, not attention: measured coverage and accuracy, the share of checks that end in an informed action (such as a revocation or a decision not to act), and published, resolved issue reports. Vanity metrics such as raw visits are not treated as success.
