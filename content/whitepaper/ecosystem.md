---
title: 3. The Ovia Labs Ecosystem
description: How Ovia Protect, Ovia Network and the OVIA Token relate, and which parts are designed versus conceptual.
status: draft
related: [ecosystem, whitepaper/ovia-network, whitepaper/ovia-token]
---

## A sequence, not a bundle

The Ovia Labs ecosystem consists of three components with very different levels of maturity. They are presented together because they share a direction, not because they will ship together.

| Component | Role | Maturity | Classification |
|---|---|---|---|
| Ovia Protect | User-facing approval visibility | Requirements and feasibility testing | Confirmed decision (definition), technical proposal (design) |
| Ovia Network | Independent verification of security data | No design | Future vision |
| OVIA Token | Possible coordination and incentive mechanism | No design | Future vision, conditional |

## From product to infrastructure

The intended progression is:

1. **Build a useful product.** Ovia Protect gives users a clear, verified view of their approvals.
2. **Learn where trust is required.** Running a scanner reveals which information can be verified directly on-chain, and which depends on external judgement: whether a spender is a known application, whether a contract is upgradeable, whether it has been involved in an incident.
3. **Research independent verification.** For information that cannot be read directly from the chain, explore whether several independent parties can check and attest to it, so that users do not depend on one provider.
4. **Consider incentives only if needed.** If an open network of independent verifiers proves feasible and valuable, evaluate whether it needs an economic mechanism, which may or may not be a token.

Each step depends on evidence from the previous one. None is guaranteed.

## What is being designed, and what is conceptual

**Being designed: Ovia Protect.** Its product definition, an Ethereum ERC-20 approval scanner, is confirmed. Its working constraints for validation are documented: zero additional cost, no API keys, no stored scans, no wallet connection, Ethereum Mainnet only. Its architecture is a proposal informed by the first feasibility test.

**Conceptual: Ovia Network.** It is a research question, not a protocol. Participants, trust model, data formats and incentives are all open.

**Conceptual and conditional: OVIA Token.** It would only be considered after Ovia Network research produces a positive feasibility result. It has no supply, allocation, contract or launch plan.

## Design principles across the ecosystem

- **Independence of value.** Ovia Protect must remain useful even if Network and Token are never built.
- **Verifiability over assertion.** Where a claim can be checked against public data, show how. Where it cannot, say so.
- **No custody, minimal data.** The ecosystem is designed around reading public information, not holding user funds or private data.
- **Openness to a negative result.** Research phases can end with a decision not to build.

> [!NOTE] Brand and naming
> “Ovia Labs” is the organisation. “Ovia Protect” and “Ovia Network” are product and research names. “OVIA” in capitals refers only to the proposed token. Using these names does not imply that a product or token exists; see [Current Development Status](/status).
