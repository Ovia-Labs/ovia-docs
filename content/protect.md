---
title: Ovia Protect
description: Ovia Protect is a planned, non-custodial Ethereum ERC-20 approval scanner that explains what a wallet has approved. It is in its PRD phase.
status: prd
related: [protect/scope, protect/approvals, whitepaper/ovia-protect]
---

> [!STATUS] PRD phase. Not available yet
> Ovia Protect is being specified. There is no public app, beta or waitlist. This section documents what is planned, what has been tested, and what is still open.

Ovia Protect is a planned **non-custodial Ethereum ERC-20 approval scanner**. You enter a public wallet address; it shows which contracts are currently allowed to spend which of that wallet’s tokens, explains what each permission means, and states clearly what it could not check.

## Problem definition

When you use a decentralised exchange, lending protocol or NFT marketplace, you usually first sign an **approval**: a permission for that application’s contract to move a token from your wallet. Many applications ask for an *unlimited* approval so you do not have to approve again.

These permissions do not expire. They stay active after you stop using the application, and if the contract is later exploited or turns out to be malicious, the approval can be used to take the approved tokens without any further action from you. Most users do not know which approvals they have granted, and the information, while public, is hard to read.

Ovia Protect aims to make that information understandable.

## What it is designed to do

- Accept a **public address**. No wallet connection, no signature, no transaction.
- Find candidate approvals and **verify each one on-chain** before showing it.
- Show token, spender, allowance and whether it is unlimited, with the **block number** the check used.
- Explain each result in plain language.
- Say what was not covered.

## What it is designed not to do

- Hold, move or touch funds.
- Ask for private keys, seed phrases or signatures.
- Store your address or scan results.
- Declare a wallet or contract **safe**.

## In this section

| Page | Content |
|---|---|
| [User experience](/protect/user-experience) | The planned flow from address to explanation |
| [MVP scope](/protect/scope) | What is in and out of the first version, and development status |
| [Token approvals](/protect/approvals) | How approvals, allowances and Permit2 work |
| [Technical design](/protect/technical-design) | Data sources, verification and normalisation |
| [Security & privacy](/protect/security) | Principles, data handling and known limitations |
