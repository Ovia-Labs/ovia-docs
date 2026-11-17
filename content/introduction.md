---
title: Introduction to Ovia Labs
description: Who Ovia Labs is, what problem it works on and how it approaches building in an early stage.
lead: Ovia Labs builds tools that explain what is happening with your crypto before you agree to it. This page covers who we are, what we work on and how we decide what to build.
related: [ecosystem, status, whitepaper/executive-summary]
---

## Who we are

Ovia Labs is an independent, early-stage technology initiative. We focus on one practical question that most crypto users face every week: *what am I about to agree to, and what have I already agreed to?*

We do not operate a live product yet. Our first product, **Ovia Protect**, is in the requirements (PRD) phase. Everything else in our ecosystem is research or a proposal. We publish these docs early so that our reasoning, our constraints and our progress can be checked.

## The problem we work on

Using decentralised applications means granting permissions. When you swap a token, deposit into a protocol or list an NFT, you usually approve a smart contract to move assets on your behalf. These permissions are recorded on the blockchain, often stay active indefinitely, and are rarely explained in plain language at the moment you grant them.

The information is public, but it is technical and scattered. Most people cannot easily answer simple questions such as "which apps can still spend my USDC?" or "is that permission limited?". [Understanding Web3 Security](/web3-security) explains the mechanics in more detail.

## What we are building

| Component | What it is | Status |
|---|---|---|
| Ovia Protect | A read-only tool that shows active token approvals for a wallet address, starting with ERC-20 tokens on Ethereum Mainnet | {{status:prd}} |
| Ovia Network | A research direction: security information checked by several independent parties and published so anyone can verify it | {{status:future}} |
| OVIA Token | An exploratory idea for a token that might support Ovia Network, if the network is ever built | {{status:proposed}} |

[Ecosystem Overview](/ecosystem) explains how these relate.

## How we work

- **Start with something useful.** Ovia Protect has to be valuable on its own, without a network or a token.
- **Read-only by design.** The first version works from a public address. It does not ask you to connect a wallet, sign a message or send a transaction.
- **Verify, then show.** Results are meant to be checked against the blockchain itself before they are displayed. An empty or incomplete result is never presented as "safe".
- **Zero additional cost while we validate.** Early work avoids paid services, API keys and databases, which keeps the product honest about what free, public infrastructure can do.
- **Say what is missing.** Limitations, risks and open questions are documented next to the plans.

> [!STATUS] Where things stand
> As of 17 November 2026, Ovia Labs has a brand identity, a new website and this documentation prepared for launch, and has completed one feasibility test for Ovia Protect. No product, network or token is live.
