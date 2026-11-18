---
title: Ecosystem Overview
description: How Ovia Protect, Ovia Network and the proposed OVIA Token relate, and which parts exist today.
lead: The Ovia Labs ecosystem is a sequence, not a bundle. Each layer only makes sense if the one before it works.
related: [whitepaper/ecosystem, roadmap, status]
---

## Three components, one direction

<figure class="diagram">
<svg viewBox="0 0 720 220" role="img" aria-labelledby="eco-d-t eco-d-d">
<title id="eco-d-t">Ovia Labs ecosystem layers</title>
<desc id="eco-d-d">Ovia Protect, in public beta, comes first. Ovia Network, a future concept, may build on experience from Protect. The OVIA Token, a proposal, would only be considered if the network needs it.</desc>
<defs><marker id="eco-ah" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto"><path d="M0,0 L8,4 L0,8z" class="arrowHead"/></marker></defs>
<rect x="10" y="40" width="200" height="120" rx="14" class="boxA"/>
<text x="30" y="72" class="tag">PUBLIC BETA</text><text x="30" y="98" class="t">Ovia Protect</text>
<text x="30" y="120" class="s">Read-only approval</text><text x="30" y="137" class="s">visibility for users</text>
<rect x="260" y="40" width="200" height="120" rx="14" class="boxD"/>
<text x="280" y="72" class="tag">FUTURE CONCEPT</text><text x="280" y="98" class="t">Ovia Network</text>
<text x="280" y="120" class="s">Independently verified</text><text x="280" y="137" class="s">security information</text>
<rect x="510" y="40" width="200" height="120" rx="14" class="boxD"/>
<text x="530" y="72" class="tag">PROPOSED</text><text x="530" y="98" class="t">OVIA Token</text>
<text x="530" y="120" class="s">Possible incentives,</text><text x="530" y="137" class="s">only if justified</text>
<path d="M212 100 H256" class="lnD" marker-end="url(#eco-ah)"/>
<path d="M462 100 H506" class="lnD" marker-end="url(#eco-ah)"/>
<text x="10" y="196" class="s">Solid outline: live in beta. Dashed outline: conceptual. Arrows: “may lead to”, not a commitment.</text>
</svg>
<figcaption>{{status:proposed}} Conceptual relationship between components. Not an architecture diagram.</figcaption>
</figure>

### Ovia Protect {{status:beta}}

The first component, live in public beta at [protect.ovialabs.xyz](https://protect.ovialabs.xyz), and the only one in active development. It is a **non-custodial Ethereum ERC-20 approval scanner**: you enter a public wallet address and see which smart contracts can still spend which tokens, and how much. It is read-only and needs no wallet connection. See [Ovia Protect](/protect).

### Ovia Network {{status:future}}

A long-term research direction. Today, most risk information about contracts and approvals comes from a single provider that users have to trust. Ovia Network explores whether several independent parties could check the same data and publish results that anyone can verify. There is no design, code or verifier set. See [Ovia Network](/network).

### OVIA Token {{status:proposed}}

An exploratory idea. If Ovia Network were ever built as an open system, a token might be one way to coordinate and reward independent verifiers. That is a hypothesis, not a plan: no token exists, and the outcome of a feasibility review may be that no token is needed. See [OVIA Token](/token).

## Why this order

1. **Protect creates real value without anything else.** A clear view of your approvals is useful today, using public blockchain data.
2. **Protect produces the experience that Network research needs.** Building a scanner shows where public data is incomplete, where providers disagree and where verification actually matters.
3. **A token only enters the discussion if Network needs it.** Introducing a token before there is a working system to coordinate would put speculation ahead of usefulness.

> [!WARNING] No dependencies run backwards
> Ovia Protect does not depend on Ovia Network or on a token, and never will for its core function. If research concludes that Network or the token should not be built, Ovia Protect continues on its own.
