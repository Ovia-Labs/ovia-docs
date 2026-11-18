---
title: Technical Design
description: How an Ovia Protect beta scan works, covering the pinned block, discovery via Approval events, verification with allowance(), labels and data sources.
status: beta
related: [whitepaper/technical-architecture, protect/scope, developers]
---

> [!STATUS] Describes the public beta
> The background and the options considered are in [whitepaper chapter 5](/whitepaper/technical-architecture).

## Runs in the browser

The beta is a static web app. A scan runs entirely in the user’s browser, which talks directly to public Ethereum RPC providers. Ovia Labs does not operate a server for scans and stores nothing.

## Four steps

| Step | What happens | Method |
|---|---|---|
| 1. Pin a block | Read the latest block number and fix every check to that block, so all results describe the same moment | `eth_blockNumber` |
| 2. Find candidates | Search Ethereum’s history for `Approval` events where the address is the owner. These only show that an approval was given at some point | `eth_getLogs` on the ERC-20 `Approval` event, filtered by owner |
| 3. Verify every one | For each token and spender, read the current allowance on the token contract at the pinned block. Only a non-zero answer is shown as active | `eth_call` to `allowance(owner, spender)` |
| 4. Label facts | Tokens on Ovia’s curated list are shown as recognized; known spenders are named. Everything else is unrecognized, and token names are self-reported by the contract | Curated lists in the app |

A discovery source can therefore cause missed approvals, but cannot cause a wrong allowance to be shown: every displayed value comes from the token contract itself at a block the user can see.

## Data sources

| Purpose | Provider | Fallback |
|---|---|---|
| Historical `Approval` event search | Tenderly public Ethereum gateway | MEV Blocker RPC |
| Current allowances, token details, contract code | Alchemy public Ethereum endpoint | None |

All are keyless public endpoints. Requests contain the wallet address being scanned and, like any web request, the user’s IP address. See [Security & privacy](/protect/security).

## Verification call

```text
eth_call {
  to:   <token address>,
  data: allowance(owner, spender)   // selector 0xdd62ed3e
} at block <N>
```

The result is a 256-bit unsigned integer. Zero means no active allowance. The maximum value (2²⁵⁶ − 1) is shown as unlimited.

## What is counted, not hidden

- **Inactive approvals:** an `Approval` event was found but the current allowance is zero (used up, reset or revoked).
- **Unreadable contracts:** the token contract did not return a valid ERC-20 allowance.

## PRD-010 findings

PRD-010 tested whether the constraints (free, no keys, no database, read-only) can be met.

- A free public Ethereum RPC endpoint returned correct `eth_call` allowance results and accepted batched requests.
- The same endpoint limits `eth_getLogs` to 100-block ranges, making full-history discovery through it impractical. The beta uses a different public gateway for event searches.
- A free approval-data API was compared with on-chain ground truth for 7 wallets with 10 known active allowances. It found none of them, and it publishes no terms of use. Result: rejected.
- Permit2 sub-allowances were not tested.

## Handling untrusted token data

Names, symbols and decimals are read from token contracts and may be malformed or deliberately misleading. They are escaped, shown alongside the contract address, and never used to decide trust. Tokens not on the curated list are grouped separately and labelled as self-reported.
