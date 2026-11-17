---
title: References
description: Standards, specifications and external tools referenced in the Ovia Labs documentation, with links to their primary sources.
status: draft
related: [developers, protect/approvals, resources/glossary]
---

Ovia Labs is not affiliated with the projects listed here. Links point to primary sources where available.

## Ethereum standards

| Reference | Topic | Source |
|---|---|---|
| EIP-20 | ERC-20 token standard: `approve`, `allowance`, `transferFrom`, `Approval` event | [eips.ethereum.org/EIPS/eip-20](https://eips.ethereum.org/EIPS/eip-20) |
| ERC-2612 | Permit: allowances set by signature | [eips.ethereum.org/EIPS/eip-2612](https://eips.ethereum.org/EIPS/eip-2612) |
| EIP-712 | Typed structured data hashing and signing | [eips.ethereum.org/EIPS/eip-712](https://eips.ethereum.org/EIPS/eip-712) |
| EIP-721 | Non-fungible token standard, including `setApprovalForAll` | [eips.ethereum.org/EIPS/eip-721](https://eips.ethereum.org/EIPS/eip-721) |
| EIP-1155 | Multi-token standard, including `setApprovalForAll` | [eips.ethereum.org/EIPS/eip-1155](https://eips.ethereum.org/EIPS/eip-1155) |
| EIP-191 | Signed data standard | [eips.ethereum.org/EIPS/eip-191](https://eips.ethereum.org/EIPS/eip-191) |
| EIP-7702 | Account code delegation for externally owned accounts | [eips.ethereum.org/EIPS/eip-7702](https://eips.ethereum.org/EIPS/eip-7702) |

## Infrastructure

| Reference | Topic | Source |
|---|---|---|
| Ethereum JSON-RPC API | `eth_call`, `eth_getLogs` and other node methods | [ethereum.org](https://ethereum.org/en/developers/docs/apis/json-rpc/) |
| Permit2 | Signature-based approval management; Mainnet address `0x000000000022D473030F116dDEE9F6B43aC78BA3` | [Uniswap docs](https://docs.uniswap.org/contracts/permit2/overview) |

## Existing approval tools

| Tool | Description | Source |
|---|---|---|
| Etherscan Token Approval Checker | View and revoke approvals | [etherscan.io/tokenapprovalchecker](https://etherscan.io/tokenapprovalchecker) |
| Revoke.cash | View and revoke approvals across networks | [revoke.cash](https://revoke.cash) |

These are listed for context so readers can act today. Their inclusion is not an endorsement or partnership.

## Internal documents

| Document | Status | Availability |
|---|---|---|
| Ovia Protect PRD | {{status:in-progress}} | Internal |
| PRD-010 data-source feasibility test | {{status:completed}} | Internal; findings summarised in [Technical design](/protect/technical-design#prd-010-findings) |
