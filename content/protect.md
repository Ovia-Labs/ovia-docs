---
title: Ovia Protect
description: Ovia Protect is a non-custodial Ethereum ERC-20 approval scanner that shows which apps can still spend a wallet’s tokens. Live in public beta.
status: beta
related: [protect/scope, protect/approvals, whitepaper/ovia-protect]
---

> [!STATUS] Public beta. Live since 18 November 2026
> Try it at [protect.ovialabs.xyz](https://protect.ovialabs.xyz). The beta covers ERC-20 approvals on Ethereum Mainnet. Nothing to connect, nothing to sign.

Ovia Protect is a **non-custodial Ethereum ERC-20 approval scanner**. You enter a public wallet address; it shows which contracts are currently allowed to spend which of that wallet’s tokens, marks unlimited approvals, and states clearly what it did not check.

## Problem definition

When you use a decentralised exchange, lending protocol or NFT marketplace, you usually first sign an **approval**: a permission for that application’s contract to move a token from your wallet. Many applications ask for an *unlimited* approval so you do not have to approve again.

These permissions do not expire. They stay active after you stop using the application, and if the contract is later exploited or turns out to be malicious, the approval can be used to take the approved tokens without any further action from you. Most users do not know which approvals they have granted, and the information, while public, is hard to read.

Ovia Protect makes that information understandable.

## What the beta does

- Accepts a **public address**. No wallet connection, no signature, no transaction.
- Fixes every check to **one block**, so all results describe the same moment.
- Finds candidate approvals from the wallet’s history and **verifies each one on-chain** with `allowance()` before showing it.
- Shows token, spender and allowance, and **marks unlimited approvals**.
- Marks tokens on Ovia’s curated list as recognized; for other tokens, the name shown is the one the contract reports about itself.
- Links to Revoke.cash and Etherscan to review or revoke an approval with your own wallet.

## What it does not do

- Hold, move or touch funds.
- Ask for private keys, seed phrases or signatures.
- Store your address or scan results.
- Calculate risk scores or declare a wallet or contract **safe**.

## In this section

| Page | Content |
|---|---|
| [User experience](/protect/user-experience) | The flow from address to explanation |
| [Scope](/protect/scope) | What the beta covers and excludes, and what comes next |
| [Token approvals](/protect/approvals) | How approvals, allowances and Permit2 work |
| [Technical design](/protect/technical-design) | How a scan works: pinned block, discovery, verification |
| [Security & privacy](/protect/security) | Principles, data handling and known limitations |
