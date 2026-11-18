---
title: 11. Risks and Open Questions
description: Technical, product, security, regulatory, adoption, data, economic and decentralisation risks, and the questions Ovia Labs has not yet answered.
status: draft
related: [whitepaper/security-privacy-limitations, whitepaper/roadmap, resources/disclaimers]
---

> [!LIMITATION] Read this chapter before relying on any other
> This chapter lists what could go wrong and what is unknown. It is part of the whitepaper by design, not an afterthought.

## Risk register

| Area | Risk | Likelihood today | Response |
|---|---|---|---|
| Technical | No free discovery source meets the coverage needed | Material: one tested source failed | Evaluate further sources; consider known-pairs probing; revisit constraints |
| Technical | Public RPC endpoints change limits or stop service | Possible | Support several endpoints; degrade visibly |
| Product | Users read “no approvals found” as “safe” | High without design care | Never show a safe verdict; coverage notice on every result |
| Product | Users do not find approval information useful enough to act | Unknown | Validate with users in Phase 03 |
| Security | Phishing sites imitate Ovia Protect | Likely once known | Never ask for signatures or seed phrases; publish official domains |
| Security | Malicious token metadata misleads users | Possible | Treat metadata as untrusted |
| Regulatory | Token or network activity is regulated in ways that prevent it | Unknown | Legal review before any design; token is conditional |
| Adoption | Established tools already serve the need | Real | Differentiate on explanation and transparency, or narrow scope |
| Data | Indexed sources are incomplete or inconsistent | Observed in PRD-010 | Verify on-chain; measure and publish coverage |
| Economic | No sustainable funding model | Unknown | Keep costs near zero; test options in chapter 10 |
| Decentralisation | A network ends up controlled by a few parties | Common in practice | Research trust models before building |

## Open questions

**Ovia Protect**

1. Does the beta’s discovery source give adequate coverage? It is in use; its coverage has not been measured yet.
2. What coverage is “adequate”, and how is it measured and shown?
3. ~~Should the first version run in the browser or through a stateless proxy?~~ Answered: the beta runs entirely in the browser.
4. ~~Should Permit2 allowances be in the first version?~~ Answered: not in the beta. Whether to add them later is open.
5. Where should spender labels come from, and how are they kept honest?
6. ~~Should the product link to revocation tools or offer revocation itself?~~ Answered: the beta links to Revoke.cash; revoking through the user’s own wallet inside Ovia Protect is planned next.

**Ovia Network**

7. Which security claims cannot be checked on-chain but are worth verifying collectively?
8. Which trust model fits those claims?
9. How can a network reward accuracy rather than agreement?

**OVIA Token**

10. Is a token necessary at all, or are fees, grants or curated membership enough?
11. Which jurisdictions’ rules would apply, and what would they require?

**Organisation**

12. What legal entity will operate the products, and in which jurisdiction? {{status:not-specified}}

Answers will be recorded in the PRD, this documentation and the [Changelog](/resources/changelog) as they are reached.
