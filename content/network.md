---
title: Ovia Network
description: Ovia Network is a future research concept for decentralised verification of Web3 security information. No protocol, code or network exists.
status: future
related: [whitepaper/ovia-network, token, roadmap]
---

> [!STATUS] Future concept. Research only
> There is no Ovia Network protocol, specification, code, testnet, verifier programme or launch plan. Nothing on this page should be read as a product.

## Long-term vision

Some security facts can be read from the chain by anyone. Many others, such as which application a contract belongs to or whether it has been linked to an incident, depend on someone’s judgement. Ovia Network explores whether such judgements could be **made by several independent parties and published so that anyone can see who claimed what, on what evidence, and when**.

## Proposed verification model

<figure class="diagram">
<svg viewBox="0 0 720 230" role="img" aria-labelledby="net-t net-d">
<title id="net-t">Conceptual verification model for Ovia Network</title>
<desc id="net-d">A claim about a contract is checked independently by several verifiers. Each publishes a signed attestation. A consumer application such as Ovia Protect reads the attestations and shows agreement or disagreement to the user.</desc>
<defs><marker id="net-ah" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto"><path d="M0,0 L8,4 L0,8z" class="arrowHead"/></marker></defs>
<rect x="10" y="75" width="150" height="70" rx="12" class="box"/><text x="26" y="104" class="t">Claim</text><text x="26" y="124" class="s">about a contract</text>
<rect x="250" y="10" width="190" height="56" rx="12" class="boxD"/><text x="266" y="44" class="t">Verifier A</text>
<rect x="250" y="82" width="190" height="56" rx="12" class="boxD"/><text x="266" y="116" class="t">Verifier B</text>
<rect x="250" y="154" width="190" height="56" rx="12" class="boxD"/><text x="266" y="188" class="t">Verifier C</text>
<rect x="540" y="75" width="170" height="70" rx="12" class="boxA"/><text x="556" y="104" class="t">Consumer app</text><text x="556" y="124" class="s">shows (dis)agreement</text>
<path d="M162 100 L246 40" class="lnD" marker-end="url(#net-ah)"/><path d="M162 110 H246" class="lnD" marker-end="url(#net-ah)"/><path d="M162 120 L246 180" class="lnD" marker-end="url(#net-ah)"/>
<path d="M442 40 L536 100" class="lnD" marker-end="url(#net-ah)"/><path d="M442 110 H536" class="lnD" marker-end="url(#net-ah)"/><path d="M442 180 L536 120" class="lnD" marker-end="url(#net-ah)"/>
<text x="460" y="226" class="tag">RESEARCH CONCEPT</text>
</svg>
<figcaption>{{status:research}} Conceptual only. Participants, trust model and incentives are undecided.</figcaption>
</figure>

Requirements any design would need: reproducible claims tied to chain data where possible, signed and attributable attestations, an immutable history, visible disagreement, and expiry of stale attestations.

## Research questions

1. Which security claims cannot be checked on-chain but are worth verifying collectively?
2. Who may act as a verifier, and how is independence shown?
3. Curated, stake-weighted, reputation-weighted or hybrid trust?
4. How can accuracy, rather than agreement, be rewarded?
5. Does the network need a token at all? See [OVIA Token](/token).

## Technical challenges

- **Sybil resistance:** preventing one actor from posing as many verifiers.
- **Collusion and bribery** among verifiers.
- **Data integrity:** reproducible inputs and tamper-evident history.
- **Censorship** of unwelcome attestations.
- **Key management** for verifiers.
- **Legal exposure** for attesting about third-party contracts.

## Development dependencies

Ovia Network research depends on Ovia Protect: real user needs, observed data failures and a first consumer. Research is [roadmap](/roadmap#ovia-network-research) Phase 04, and its output is a written feasibility assessment. Building anything is a separate, conditional decision.
