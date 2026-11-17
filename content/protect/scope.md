---
title: MVP Scope
description: What the first version of Ovia Protect includes and excludes, the constraints it is built under, and its current development status.
status: prd
related: [protect, protect/technical-design, roadmap]
---

## Working constraints

The first version is defined under these PRD constraints:

| Constraint | Meaning |
|---|---|
| Zero additional cost | Free public infrastructure only; no paid subscriptions |
| No API keys | Unless strictly optional |
| No database | No permanent storage of scans or addresses |
| Read-only | No wallet connection, private keys, signatures or transactions |
| Ethereum Mainnet | One network first |
| No safe verdicts | Never classify a wallet as safe, especially on incomplete results |

## In scope {{status:planned}}

- ERC-20 allowances for a single public address on Ethereum Mainnet.
- On-chain verification of every displayed allowance at a recorded block.
- Detection and labelling of unlimited allowances.
- Plain-language explanation of each result.
- A coverage notice on every result.

## Out of scope for the first version

- Other networks.
- NFT approvals (`setApprovalForAll` under ERC-721 and ERC-1155).
- Permit2 sub-allowances: untested so far and undecided for the MVP.
- Signed but unsubmitted permits (ERC-2612 or Permit2 signatures).
- EIP-7702 delegations.
- Revoking approvals from within Ovia Protect.
- Accounts, monitoring, alerts or history.
- Risk scores or contract safety ratings.

## MVP development status

| Item | Status | Evidence |
|---|---|---|
| Product definition (PRD) | {{status:in-progress}} | Internal PRD |
| PRD-010 data-source feasibility | {{status:completed}} | Internal test report, 17 November 2026 |
| Verification via free public RPC (`eth_call`) | {{status:completed}} | Tested: works, batches accepted |
| Discovery via free RPC log scan | {{status:completed}} | Tested: impractical (100-block range limit) |
| Discovery via tested free API | {{status:completed}} | Tested: rejected (0 of 10 known active allowances found; no published terms) |
| Discovery source selection | {{status:not-specified}} | Next PRD step |
| Permit2 coverage | {{status:not-specified}} | Untested |
| Application build | {{status:planned}} | Not started |

“Completed” for a test means the test was run, not that its approach was adopted.
