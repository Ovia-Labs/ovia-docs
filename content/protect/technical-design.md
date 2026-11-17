---
title: Technical Design
description: The proposed Ovia Protect technical design, covering discovery versus verification, RPC methods, the PRD-010 findings and the open decisions.
status: prd
related: [whitepaper/technical-architecture, protect/scope, developers]
---

> [!PROPOSAL] Proposed design
> No Ovia Protect code is deployed. The full rationale is in [whitepaper chapter 5](/whitepaper/technical-architecture).

## Two steps: discover, then verify

| Step | Question | Method | Status |
|---|---|---|---|
| Discover | Which (token, spender) pairs might this address have approved? | Indexed `Approval` events from a source still to be selected | {{status:not-specified}} |
| Verify | Is the allowance for this pair non-zero right now? | `eth_call` to `allowance(owner, spender)` at a pinned block | {{status:completed}} feasibility tested |

Only verified, non-zero allowances are displayed. A discovery source can therefore cause missed approvals, but cannot cause a wrong allowance to be shown.

## PRD-010 findings

PRD-010 tested whether the constraints (free, no keys, no database, read-only) can be met.

- A free public Ethereum RPC endpoint returned correct `eth_call` allowance results and accepted batched requests.
- The same endpoint limits `eth_getLogs` to 100-block ranges, making full-history discovery impractical (on the order of 264,000 requests per wallet).
- A free approval-data API was compared with on-chain ground truth for 7 wallets with 10 known active allowances. It found none of them, and it publishes no terms of use. Result: rejected.
- Permit2 sub-allowances were not tested.

Vendors are not named in public documentation; the findings concern the specific endpoints tested at the time.

## Verification call

```text
eth_call {
  to:   <token address>,
  data: allowance(owner, spender)   // selector 0xdd62ed3e
} at block <N>
```

The result is a 256-bit unsigned integer. Zero means no active allowance. The maximum value (2²⁵⁶ − 1) is treated as unlimited.

## Handling untrusted token data

Names, symbols and decimals are read from token contracts and may be malformed or deliberately misleading. They are escaped, shown alongside the contract address, and never used to decide trust.

## Open design decisions

- Discovery source or combination.
- Browser-only execution or a thin stateless proxy.
- Permit2 sub-allowance support.
- Spender labelling source.

See [whitepaper chapter 5](/whitepaper/technical-architecture#open-architectural-decisions) for the options.
