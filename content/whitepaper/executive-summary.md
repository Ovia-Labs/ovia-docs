---
title: 1. Executive Summary
description: The problem Ovia Labs addresses, why Ovia Protect comes first, and why Ovia Network and the OVIA Token remain exploratory.
status: draft
related: [whitepaper/problem, whitepaper/ecosystem, status]
---

## The problem

Self-custody gives people direct control over their assets, and with it, direct responsibility for every permission they grant. On Ethereum and similar networks, interacting with an application usually means allowing a smart contract to move tokens on your behalf. These permissions are public and permanent until changed, yet the tools people use every day rarely show them clearly.

The result is a gap between what users have authorised and what they believe they have authorised. Unlimited token approvals granted years ago, permissions given to contracts that have since been exploited, and signatures that silently grant spending rights are a recurring source of loss. The underlying data is open; what is missing is clarity.

## Our purpose

Ovia Labs builds software that makes this information understandable. Our guiding principle is that users should not need to become security experts to answer basic questions about their own wallet: *which contracts can move my tokens, how much, and since when?*

## Why Ovia Protect comes first

Ovia Protect is the first product and the only component in active development. It is defined as a **non-custodial Ethereum ERC-20 approval scanner**: a read-only tool that takes a public wallet address and shows its active token approvals, verified against the blockchain.

We start here for three reasons:

1. **It is useful on its own.** Approval visibility helps users today, without any network effects, partners or token.
2. **It is tractable.** ERC-20 approvals follow a well-defined standard, and their current state can be read directly from the chain.
3. **It teaches us what verification needs.** Building a scanner exposes exactly where public data is incomplete or where data sources disagree. That knowledge is the foundation for any later verification research.

Ovia Protect is in the product requirements (PRD) phase. A first feasibility test, PRD-010, was completed on 17 November 2026. It confirmed that a free public Ethereum RPC endpoint can verify individual allowances, and that the free third-party discovery API tested was not reliable enough to use. Choosing a discovery approach is the next step.

## The possible role of Ovia Network

In the longer term, Ovia Labs is researching **Ovia Network**: an infrastructure in which several independent parties check the same security-relevant data and publish results that anyone can verify. The aim is to reduce reliance on any single provider of risk information, including Ovia Labs itself. Ovia Network is a future concept. There is no design, implementation or schedule, and research may conclude that it should not be built.

## Why the OVIA Token remains exploratory

An open verification network could need a way to coordinate and reward independent participants. A token is one possible mechanism, which is why the **OVIA Token** appears in this paper. It is an exploratory concept only. No token exists, no tokenomics have been defined, and no token will be considered until a working network demonstrates a real need and the legal and economic questions are answered. A conclusion that no token is needed is an acceptable outcome.

## Current stage

| Component | Status |
|---|---|
| Ovia Labs (brand, website, documentation) | {{status:in-progress}} Prepared, not yet deployed |
| Ovia Protect | {{status:prd}} Requirements and feasibility testing |
| Ovia Network | {{status:future}} Research direction |
| OVIA Token | {{status:proposed}} Exploratory concept |

The rest of this paper explains the problem in technical detail (Chapter 2), the ecosystem and its sequencing (Chapter 3), Ovia Protect’s product vision, architecture and limitations (Chapters 4 to 6), the Network and Token research directions (Chapters 7 and 8), the roadmap (Chapter 9), sustainability (Chapter 10) and risks (Chapter 11).
