---
title: Scope
description: What the Ovia Protect public beta covers and excludes, the constraints it is built under, and what is planned next.
status: beta
related: [protect, protect/technical-design, roadmap]
---

## Working constraints

The beta is built under these constraints from the product requirements:

| Constraint | Meaning |
|---|---|
| Zero additional cost | Free public infrastructure only; no paid subscriptions |
| No API keys | The beta uses keyless public endpoints |
| No database | No storage of scans or addresses; everything runs in the browser |
| Read-only | No wallet connection, private keys, signatures or transactions |
| Ethereum Mainnet | One network |
| No safe verdicts | Never classify a wallet as safe, especially on incomplete results |

## In the beta {{status:beta}}

- ERC-20 allowances for a single public address on Ethereum Mainnet.
- Every check fixed to one block, and every displayed allowance verified with `allowance()` at that block.
- Unlimited allowances marked.
- Recognized tokens from Ovia’s curated list shown separately from unrecognized ones.
- Known spenders named; others shown as unknown contracts with their address.
- Counts of inactive approvals and of token contracts that could not be read.
- Links to Revoke.cash and Etherscan.

## Not covered by the beta

- Other networks.
- ENS names as input.
- NFT approvals (`setApprovalForAll` under ERC-721 and ERC-1155).
- Permit2 sub-allowances.
- Unused `permit()` signatures (ERC-2612 or Permit2).
- Tokens that do not emit standard `Approval` events.
- EIP-7702 delegations.
- Accounts, monitoring, alerts or history.
- Risk scores or contract safety ratings.

## Development status

| Item | Status | Evidence |
|---|---|---|
| PRD-010 data-source feasibility | {{status:completed}} | Internal test report, 17 November 2026 |
| Discovery and verification approach | {{status:completed}} | Used in the beta: see [Technical design](/protect/technical-design) |
| Public beta | {{status:beta}} | Live at [protect.ovialabs.xyz](https://protect.ovialabs.xyz) since 18 November 2026 |
| Revoke from within Ovia Protect, with your own wallet | {{status:planned}} | Next step, being specified |
| Independent security review | {{status:planned}} | Not done yet |
| Measured, published coverage | {{status:not-specified}} | Not published yet |
| Permit2, NFT approvals, other networks | {{status:conditional}} | Depends on what the beta shows |

“Completed” for a test means the test was run, not that its approach was adopted.

## Next: revoking in the app {{status:planned}}

The next planned step is to let users remove approvals directly in Ovia Protect, using their own wallet. That changes one constraint above: Ovia Protect would then ask the user’s wallet to sign an `approve(spender, 0)` transaction. Ovia Labs would still never hold keys or send transactions on a user’s behalf. Scanning stays possible without connecting a wallet.
