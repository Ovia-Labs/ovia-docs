---
title: Current Development Status
description: What exists today at Ovia Labs, with the evidence behind each status, as of 17 November 2026.
lead: An honest snapshot of what exists, what is being worked on and what is only an idea. Updated with every documentation release.
updated: 2026-11-17
related: [roadmap, protect/scope, resources/changelog]
---

## Summary

{{status-table}}

## What “PRD Phase” means for Ovia Protect

Ovia Protect is being specified before it is built. The product requirements document (PRD) is written as numbered work items. Some of them are feasibility tests that check whether an idea can work with free, public infrastructure before any product code is written.

### Confirmed product definition

- Ovia Protect is a **non-custodial Ethereum ERC-20 approval scanner**.
- It targets **Ethereum Mainnet** first.

### Working constraints during validation

The feasibility work runs under these constraints. They reflect the intended character of the first version, but the PRD will confirm the final MVP requirements.

- Zero additional cost, with no paid subscriptions.
- No API keys unless they are optional.
- No database or permanent storage of wallet scans.
- No wallet connections, private keys, signatures or transactions.
- **A wallet is never classified as safe on the basis of incomplete results.**

## PRD-010: approval discovery feasibility test {{status:completed}}

Completed on 17 November 2026. The test asked whether a free setup can do two things: **discover** which approvals a wallet has, and **verify** each approval against the blockchain.

| Question | Result | What it means |
|---|---|---|
| Can a free public Ethereum RPC endpoint answer basic calls? | Pass | `eth_chainId` and `eth_blockNumber` responded correctly. |
| Can it read a known ERC-20 allowance? | Pass | `allowance(owner, spender)` read via `eth_call` matched known, publicly verifiable values at a recorded block. |
| Can that endpoint discover approvals by scanning event logs? | No | It limits `eth_getLogs` to a 100-block range, so scanning all of Ethereum’s history per wallet is not practical. |
| Is the free third-party approval API tested suitable for discovery? | No-go | It returned none of 10 ERC-20 allowances that were verifiably active on-chain across 7 wallets, and it publishes no terms of use. |
| Is an empty discovery result evidence that a wallet is safe? | No | The test confirmed empty results can be wrong. The product will not show “safe” or “no approvals” on that basis. |

**Recommendation from the report:** use public RPC for verification; do not use the tested API for discovery; evaluate other free discovery sources next.

> [!LIMITATION] Scope of the test
> The test used 11 wallets and short log windows. It is strong evidence against the rejected source, not a statistical coverage study. Permit2 sub-allowances were not tested.

## What does not exist yet

- No Ovia Protect release, beta, app or browser extension.
- No public API, SDK, smart contract or contract address.
- No Ovia Network specification, node software or verifiers.
- No OVIA Token, token sale, presale, airdrop or tokenomics.
- No completed security audit, partnership, investor or funding round.

If you see claims to the contrary anywhere, they did not come from Ovia Labs. See [Security Disclosures](/resources/security-disclosures) to report impersonation.
