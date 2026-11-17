---
title: "7. Ovia Network: Verification Infrastructure"
description: The research vision for Ovia Network, covering participants, trust models, data integrity, decentralisation, Sybil resistance, incentives and dependencies.
status: future
related: [network, whitepaper/ovia-token, whitepaper/risks-open-questions]
---

> [!STATUS] Future concept
> Ovia Network is a research direction. There is no protocol specification, code, test network, verifier set or launch plan. Mechanisms described here are options to study, not designs.

## The vision

Some security information can be checked by anyone: the current allowance of a spender is a fact on-chain. Much of what users need to decide is not: whether a spender belongs to a legitimate application, whether a contract is upgradeable and who controls it, whether it has been linked to an incident. Today that information comes from individual providers, and users have to trust them.

Ovia Network explores whether such information could be **checked by several independent parties and published in a way that anyone can verify**: who attested to what, using which evidence, and when. The goal is to make security information more transparent and less dependent on any single provider, including Ovia Labs.

## Potential verification participants

| Role | Possible responsibility | Open issue |
|---|---|---|
| Verifiers | Independently check a claim and sign an attestation | Who may verify, and how independence is shown |
| Data providers | Supply raw inputs such as indexed events or contract metadata | How inputs are made reproducible |
| Consumers | Applications such as Ovia Protect that read attestations | How conflicts are presented to users |
| Reviewers | Audit attestations after the fact | Whether review is rewarded or voluntary |

## Possible trust models

1. **Curated set.** A known group of reviewed organisations attests. Simple and accountable, but centralised in its admission process.
2. **Open, stake-weighted.** Anyone can verify by putting something at risk. Permissionless, but invites capital-weighted influence and requires incentive design.
3. **Reputation-weighted.** Weight grows with a track record of attestations that later prove correct. Resistant to new attackers, but slow to bootstrap and hard to measure.
4. **Hybrid.** A curated base with open participation added later.

No model has been chosen. The choice depends on what kind of claims the network would verify, which depends on experience from Ovia Protect.

## Data integrity requirements

Any design would need to meet at least these requirements:

- **Reproducibility.** Claims that can be checked against chain state must reference the chain, block and method used.
- **Attribution.** Every attestation is signed and attributable to a verifier.
- **Immutability of history.** Past attestations cannot be silently changed, including incorrect ones.
- **Explicit disagreement.** When verifiers disagree, consumers see the disagreement rather than a forced consensus.
- **Expiry.** Security facts change, so attestations need validity periods.

## Decentralisation considerations

Decentralisation is a means, not a goal. It is only worth its cost where a single point of trust is a real problem. Some claims, such as reading an allowance, do not need a network at all. Others, such as “this spender belongs to application X”, may benefit from independent confirmation. Research will separate the two before any architecture is proposed.

## Sybil resistance challenges

In an open system, one actor can pretend to be many verifiers. Sybil resistance options include stake requirements, identity or attestation-based admission, reputation and rate limits. Each has costs: stake favours capital, identity requirements reduce openness and raise privacy and legal questions, and reputation systems can be gamed. This is a central open question.

## Verification incentives as a research topic

Verifying claims takes work. If verifiers are not rewarded, participation may stay small; if they are rewarded per attestation, they may be rewarded for volume over accuracy. Research questions include how to reward accuracy rather than agreement, how to penalise provably wrong attestations without discouraging honest disagreement, and whether non-token mechanisms (fees, grants, reputation) are sufficient. Chapter 8 discusses why a token appears in this context, and why it remains conditional.

## Protocol-level security considerations

- Collusion among verifiers to attest false claims.
- Bribery or coercion of verifiers by parties with an interest in a claim.
- Censorship of unfavourable attestations.
- Key compromise of verifiers.
- Economic attacks if stake or rewards are involved.
- Liability and legal exposure for attesting about third-party contracts.

## Dependencies on earlier development

Ovia Network research depends on Ovia Protect for:

1. **Real data needs.** Which claims users actually need and which cannot be verified on-chain.
2. **Observed failure modes.** Where data sources disagree or are wrong in practice.
3. **A first consumer.** A network without a consumer has nothing to verify for.

Phase 04 of the [roadmap](/roadmap) is a research phase with a written feasibility assessment as its output. Building anything is a separate, conditional decision in Phase 05.
