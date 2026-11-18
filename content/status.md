---
title: Current Development Status
description: What exists today at Ovia Labs, with the evidence behind each status, as of 18 November 2026. Ovia Protect is live in public beta.
lead: An honest snapshot of what exists, what is being worked on and what is only an idea. Updated with every documentation release.
updated: 2026-11-18
related: [roadmap, protect/scope, resources/changelog]
---

## Summary

{{status-table}}

## Ovia Protect public beta {{status:beta}}

Ovia Protect went live as a **public beta on 18 November 2026** at [protect.ovialabs.xyz](https://protect.ovialabs.xyz). It is a non-custodial ERC-20 approval scanner for Ethereum Mainnet: you paste a public wallet address and see which apps can still spend which tokens.

| | In the beta |
|---|---|
| Network | Ethereum Mainnet |
| Approvals | ERC-20 `approve` allowances |
| Input | A 42-character `0x` address. ENS names are not supported yet. |
| Wallet connection, signatures, transactions | None |
| Accounts, cookies, stored scans | None. Scans run in your browser and are gone after a reload. |
| Revoking | Links to Revoke.cash and Etherscan. Ovia Protect does not revoke anything itself. |

How a scan works, what it does not cover and how data is handled are described in [Technical design](/protect/technical-design) and [Security & privacy](/protect/security).

> [!LIMITATION] What the beta label means
> Results describe one block and can be incomplete. The beta has not been independently reviewed or audited, and its coverage has not been published as a measured figure. An empty result never means a wallet is safe.

## How the beta was reached

The beta was built from a series of numbered product requirements (PRDs). The first of them were feasibility tests that checked whether the idea works with free, public infrastructure before any product code was written. The working constraints from that phase still define the beta:

- Zero additional cost, with no paid subscriptions.
- No API keys.
- No database or permanent storage of wallet scans.
- No wallet connections, private keys, signatures or transactions.
- **A wallet is never classified as safe on the basis of incomplete results.**

### PRD-010: approval discovery feasibility test {{status:completed}}

Completed on 17 November 2026. The test asked whether a free setup can **discover** which approvals a wallet has and **verify** each approval against the blockchain.

| Question | Result | What it means |
|---|---|---|
| Can a free public Ethereum RPC endpoint answer basic calls? | Pass | `eth_chainId` and `eth_blockNumber` responded correctly. |
| Can it read a known ERC-20 allowance? | Pass | `allowance(owner, spender)` read via `eth_call` matched known, publicly verifiable values at a recorded block. |
| Can that endpoint discover approvals by scanning event logs? | No | It limits `eth_getLogs` to a 100-block range, so scanning all of Ethereum’s history per wallet through it is not practical. |
| Is the free third-party approval API tested suitable for discovery? | No-go | It returned none of 10 ERC-20 allowances that were verifiably active on-chain across 7 wallets, and it publishes no terms of use. |
| Is an empty discovery result evidence that a wallet is safe? | No | The test confirmed empty results can be wrong. The product does not show “safe” on that basis. |

The beta follows the report’s recommendation: verification through public RPC, and discovery through a different public RPC gateway that supports historical event searches, not through the rejected API.

## What does not exist yet

- No revoking inside Ovia Protect. This is the next planned step.
- No support for NFT approvals, Permit2 sub-allowances, other networks or ENS names.
- No public API, SDK, smart contract or contract address.
- No Ovia Network specification, node software or verifiers.
- No OVIA Token, token sale, presale, airdrop or tokenomics.
- No completed security audit, partnership, investor or funding round.

If you see claims to the contrary anywhere, they did not come from Ovia Labs. See [Security Disclosures](/resources/security-disclosures) to report impersonation.
